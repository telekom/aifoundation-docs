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
			customCss: ['flag-icons/css/flag-icons.min.css', './src/styles/custom.css'],
			expressiveCode: {
				themes: ['dracula'],
			},
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			sidebar: [
				{ label: 'Overview', slug: 'index' },
				{
					label: 'Getting Started',
					items: [
						{ label: 'Quickstart', slug: 'getting-started/quickstart' },
						{ label: 'Authentication', slug: 'getting-started/authentication' },
						{ label: 'Models', slug: 'getting-started/models' },
					],
				},
				{
					label: 'Guides',
					items: [
						{ label: 'Chat Completions', slug: 'guides/chat-completions' },
						{ label: 'Streaming', slug: 'guides/streaming' },
						{ label: 'Embeddings', slug: 'guides/embeddings' },
						{ label: 'Multimodal', slug: 'guides/multimodal' },
						{ label: 'Audio', slug: 'guides/audio' },
						{ label: 'Function Calling', slug: 'guides/function-calling' },
						{ label: 'Image Generation', slug: 'guides/image-generation' },
						{ label: 'Reasoning', slug: 'guides/reasoning' },
						{ label: 'Fine-Tuning', slug: 'guides/fine-tuning' },
						{ label: 'Visual RAG', slug: 'guides/visual-rag' },
						{ label: 'Asynchronous Requests', slug: 'guides/asynchronous-requests' },
					],
				},
				{
					label: 'Integrations',
					items: [
						{ label: 'LangChain', slug: 'integrations/langchain' },
						{ label: 'Llama Index', slug: 'integrations/llama-index' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'API Endpoints', slug: 'reference/api-endpoints' },
						{ label: 'Error Codes', slug: 'reference/error-codes' },
						{ label: 'Rate Limits', slug: 'reference/rate-limits' },
					],
				},
				{
					label: 'SmartChat',
					items: [
						{ label: 'SmartChat Overview', slug: 'smartchat/overview' },
						{ label: 'RAG API Reference', slug: 'smartchat/api-reference' },
						{ label: 'Local Chat', slug: 'smartchat/local-chat' },
						{ label: 'Global Chat', slug: 'smartchat/global-chat' },
					],
				},
				{ label: 'Plans & Pricing', slug: 'plans' },
				{ label: 'FAQ', slug: 'faq' },
				{
					label: 'Links',
					items: [
						{ label: 'SmartChat ↗', link: 'https://public.oweb-chat.llmhub.t-systems.net/', attrs: { target: '_blank' } },
						{ label: 'LLM Playground ↗', link: 'https://playground.llmhub.t-systems.net/', attrs: { target: '_blank' } },
						{ label: 'Model Status ↗', link: 'https://uptime.llmhub.t-systems.net/status/health', attrs: { target: '_blank' } },
						{ label: 'Service Description (PDF) ↗', link: '/files/Leistungsbeschreibung-LLM-Serving-Service.pdf', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
