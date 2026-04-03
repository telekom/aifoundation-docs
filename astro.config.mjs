// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://telekom.github.io',
	base: '/',
	integrations: [
		starlight({
			title: 'AI Foundation Services',
			logo: {
				src: './src/assets/favicon_180x180.png',
			},
			favicon: '/img/favicon_180x180.png',
			customCss: ['./src/styles/custom.css'],
			expressiveCode: {
				themes: ['dracula'],
			},
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			sidebar: [
				{ label: 'Overview', slug: 'index' },
				{ label: 'Introduction', slug: 'introduction' },
				{ label: 'Quickstart', slug: 'quickstart' },
				{
					label: 'Model Serving',
					items: [
						{ label: 'API Usage Guide', slug: 'model-serving/api-usage-guide' },
						{ label: 'Fine-Tuning API', slug: 'model-serving/fine-tuning-api' },
						{ label: 'LangChain Integration', slug: 'model-serving/langchain-migration' },
						{ label: 'Llama-Index Integration', slug: 'model-serving/llama-index-integration' },
						{ label: 'Visual RAG API', slug: 'model-serving/visual-rag-api' },
					],
				},
				{
					label: 'SmartChat RAG API',
					items: [
						{ label: 'API Reference', slug: 'smartchat-rag-api/api-reference' },
						{ label: 'How to Chat (Global KB)', slug: 'smartchat-rag-api/how-to-chat-global' },
						{ label: 'How to Chat (Local KB)', slug: 'smartchat-rag-api/how-to-chat-local' },
					],
				},
				{ label: 'Services & Pricing', slug: 'services-and-pricing' },
			{ label: 'FAQ', slug: 'faq' },
			{
				label: 'Links',
				items: [
					{ label: 'SmartChat ↗', link: 'https://public.oweb-chat.llmhub.t-systems.net/', attrs: { target: '_blank' } },
					{ label: 'LLM Playground ↗', link: 'https://playground.llmhub.t-systems.net/', attrs: { target: '_blank' } },
					{ label: 'Model Status ↗', link: 'https://uptime.llmhub.t-systems.net/status/health', attrs: { target: '_blank' } },
				],
			},
			],
		}),
	],
});
