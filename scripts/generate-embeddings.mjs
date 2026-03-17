#!/usr/bin/env node
/**
 * Build-time script: chunks all .mdx docs and generates embeddings
 * via the AIFS API, then writes a static search index JSON.
 *
 * Usage:
 *   AIFS_API_KEY=gen-xxx node scripts/generate-embeddings.mjs
 *
 * Output: static/search-index.json
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const OUTPUT = path.join(ROOT, 'static', 'search-index.json');

const API_BASE = process.env.AIFS_API_BASE || 'https://llm-server.llmhub.t-systems.net/v2';
const API_KEY = process.env.AIFS_API_KEY;
const EMBED_MODEL = process.env.AIFS_EMBED_MODEL || 'text-embedding-bge-m3';
const CHUNK_SIZE = 800;   // chars per chunk (roughly ~200 tokens)
const CHUNK_OVERLAP = 100;
const BATCH_SIZE = 20;    // embeddings per API call

if (!API_KEY) {
  console.error('Error: AIFS_API_KEY environment variable is required');
  process.exit(1);
}

// ── Collect .mdx files ──────────────────────────────────────────────
function collectMdxFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectMdxFiles(full, files);
    else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) files.push(full);
  }
  return files;
}

// ── Parse MDX into title + clean text ───────────────────────────────
function parseMdx(filePath) {
  let raw = fs.readFileSync(filePath, 'utf-8');

  // Extract frontmatter title
  let title = '';
  const fm = raw.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const titleMatch = fm[1].match(/title:\s*["']?(.+?)["']?\s*$/m);
    if (titleMatch) title = titleMatch[1];
    raw = raw.slice(fm[0].length);
  }
  if (!title) {
    const h1 = raw.match(/^#\s+(.+)$/m);
    if (h1) title = h1[1];
  }

  // Strip imports, JSX components, code fences metadata, HTML tags
  let text = raw
    .replace(/^import\s+.*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/```[\s\S]*?```/g, '[code block]')
    .replace(/\{[^}]*\}/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')  // images
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')  // links → text
    .replace(/[#*_~`>|]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const slug = path.relative(DOCS_DIR, filePath).replace(/\.(mdx|md)$/, '').replace(/\/index$/, '');

  return { title, text, slug, filePath: path.relative(ROOT, filePath) };
}

// ── Chunk text with overlap ─────────────────────────────────────────
function chunkText(text, title, slug, filePath) {
  const chunks = [];
  // Split by paragraphs first
  const paragraphs = text.split(/\n\n+/);
  let current = '';

  for (const para of paragraphs) {
    if ((current + '\n\n' + para).length > CHUNK_SIZE && current.length > 0) {
      chunks.push({
        text: `${title}\n\n${current.trim()}`,
        slug,
        title,
        filePath,
      });
      // Overlap: keep last bit of current chunk
      const words = current.split(/\s+/);
      current = words.slice(-Math.floor(CHUNK_OVERLAP / 5)).join(' ') + '\n\n' + para;
    } else {
      current = current ? current + '\n\n' + para : para;
    }
  }
  if (current.trim()) {
    chunks.push({
      text: `${title}\n\n${current.trim()}`,
      slug,
      title,
      filePath,
    });
  }
  return chunks;
}

// ── Call embeddings API ─────────────────────────────────────────────
async function embedBatch(texts) {
  const resp = await fetch(`${API_BASE}/embeddings`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ model: EMBED_MODEL, input: texts }),
  });
  if (!resp.ok) {
    throw new Error(`Embeddings API error ${resp.status}: ${await resp.text()}`);
  }
  const data = await resp.json();
  return data.data.map(d => d.embedding);
}

// ── Main ────────────────────────────────────────────────────────────
async function main() {
  console.log('Collecting .mdx files from', DOCS_DIR);
  const files = collectMdxFiles(DOCS_DIR);
  console.log(`Found ${files.length} files`);

  // Parse and chunk
  const allChunks = [];
  for (const f of files) {
    const { title, text, slug, filePath } = parseMdx(f);
    if (!text.trim()) continue;
    const chunks = chunkText(text, title, slug, filePath);
    allChunks.push(...chunks);
  }
  console.log(`Created ${allChunks.length} chunks`);

  // Generate embeddings in batches
  const allEmbeddings = [];
  for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
    const batch = allChunks.slice(i, i + BATCH_SIZE);
    const texts = batch.map(c => c.text);
    console.log(`  Embedding batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allChunks.length / BATCH_SIZE)} (${texts.length} chunks)`);
    const embeddings = await embedBatch(texts);
    allEmbeddings.push(...embeddings);
  }

  // Build index
  const index = {
    model: EMBED_MODEL,
    dimensions: allEmbeddings[0].length,
    generatedAt: new Date().toISOString(),
    chunks: allChunks.map((chunk, i) => ({
      text: chunk.text,
      title: chunk.title,
      slug: chunk.slug,
      embedding: allEmbeddings[i],
    })),
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(index));
  const sizeMB = (fs.statSync(OUTPUT).size / 1024 / 1024).toFixed(2);
  console.log(`\nWritten ${OUTPUT} (${sizeMB} MB, ${index.chunks.length} chunks, ${index.dimensions} dims)`);
}

main().catch(err => { console.error(err); process.exit(1); });
