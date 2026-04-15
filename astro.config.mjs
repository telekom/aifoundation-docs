// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightVersions from 'starlight-versions';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.llmhub.t-systems.net',
	base: '/',
	redirects: {
		'/Quickstart': '/getting-started/quickstart',
		'/Introduction': '/',
		'/Model Serving/langchain': '/integrations/langchain',
		'/Services and Pricing': '/plans',
	},
	integrations: [
		starlight({
			title: 'AI Foundation Services',
			components: {
				Footer: './src/components/Footer.astro',
			},
			logo: {
				src: './src/assets/favicon_180x180.png',
			},
			favicon: '/img/favicon_180x180.png',
			customCss: ['flag-icons/css/flag-icons.min.css', './src/styles/custom.css'],
			expressiveCode: {
				themes: ['dracula'],
			},
			plugins: [
				starlightVersions({
					versions: [
						{ slug: 'v1', label: 'v1.0.0' },
					],
				}),
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				de: { label: 'Deutsch', lang: 'de' },
			},
			sidebar: [
				{ label: 'Overview', translations: { de: 'Überblick' }, slug: 'index' },
				{
					label: 'Getting Started',
					translations: { de: 'Erste Schritte' },
					items: [
						{ label: 'Quickstart', translations: { de: 'Schnellstart' }, slug: 'getting-started/quickstart' },
						{ label: 'Authentication', translations: { de: 'Authentifizierung' }, slug: 'getting-started/authentication' },
						{ label: 'Models', translations: { de: 'Verfügbare Modelle' }, slug: 'getting-started/models' },
					],
				},
				{
					label: 'Guides',
					translations: { de: 'Anleitungen' },
					items: [
						{ label: 'Chat Completions', translations: { de: 'Chat-Vervollständigungen' }, slug: 'guides/chat-completions' },
						{ label: 'Streaming', translations: { de: 'Streaming' }, slug: 'guides/streaming' },
						{ label: 'Embeddings', translations: { de: 'Embeddings' }, slug: 'guides/embeddings' },
						{ label: 'Multimodal', translations: { de: 'Multimodal (Vision)' }, slug: 'guides/multimodal' },
						{ label: 'Audio', translations: { de: 'Audio (Sprache-zu-Text)' }, slug: 'guides/audio' },
						{ label: 'Function Calling', translations: { de: 'Funktionsaufrufe' }, slug: 'guides/function-calling' },
						{ label: 'Image Generation', translations: { de: 'Bildgenerierung' }, slug: 'guides/image-generation' },
						{ label: 'Reasoning', translations: { de: 'Reasoning-Steuerung' }, slug: 'guides/reasoning' },
						{ label: 'Fine-Tuning', translations: { de: 'Feinabstimmung' }, slug: 'guides/fine-tuning' },
						{ label: 'Visual RAG', translations: { de: 'Visual RAG' }, slug: 'guides/visual-rag' },
						{ label: 'Asynchronous Requests', translations: { de: 'Asynchrone Anfragen (Queue API)' }, slug: 'guides/asynchronous-requests' },
					],
				},
				{
					label: 'Integrations',
					translations: { de: 'Integrationen' },
					items: [
						{ label: 'LangChain', translations: { de: 'LangChain-Integration' }, slug: 'integrations/langchain' },
						{ label: 'Llama Index', translations: { de: 'LlamaIndex-Integration' }, slug: 'integrations/llama-index' },
					],
				},
				{
					label: 'Reference',
					translations: { de: 'Referenz' },
					items: [
						{ label: 'API Endpoints', translations: { de: 'API-Endpunkte' }, slug: 'reference/api-endpoints' },
						{ label: 'Error Codes', translations: { de: 'Fehlercodes' }, slug: 'reference/error-codes' },
						{ label: 'Rate Limits', translations: { de: 'Rate-Limits' }, slug: 'reference/rate-limits' },
					],
				},
				{
					label: 'SmartChat',
					translations: { de: 'SmartChat' },
					items: [
						{ label: 'SmartChat Overview', translations: { de: 'SmartChat RAG' }, slug: 'smartchat/overview' },
						{ label: 'RAG API Reference', translations: { de: 'RAG API Reference' }, slug: 'smartchat/api-reference' },
						{ label: 'Local Chat', translations: { de: 'Lokale Wissensbasis-Anleitung' }, slug: 'smartchat/local-chat' },
						{ label: 'Global Chat', translations: { de: 'Globale Wissensbasis-Anleitung' }, slug: 'smartchat/global-chat' },
					],
				},
				{
					label: 'Plans & Pricing',
					translations: { de: 'Tarife & Preise' },
					items: [
						{ label: 'Plans Overview', translations: { de: 'Tarifübersicht' }, slug: 'plans' },
						{ label: 'Basic', translations: { de: 'Tarif Basic' }, slug: 'plans/basic' },
						{ label: 'Standard 1000', translations: { de: 'Tarif Standard 1000' }, slug: 'plans/standard-1000' },
						{ label: 'Standard 2000', translations: { de: 'Tarif Standard 2000' }, slug: 'plans/standard-2000' },
						{ label: 'Standard 3000', translations: { de: 'Tarif Standard 3000' }, slug: 'plans/standard-3000' },
						{ label: 'Standard 4000', translations: { de: 'Tarif Standard 4000' }, slug: 'plans/standard-4000' },
					],
				},
				{ label: 'FAQ', translations: { de: 'FAQ' }, slug: 'faq' },
				{
					label: 'Links',
					translations: { de: 'Links' },
					items: [
						{ label: 'SmartChat ↗', translations: { de: 'SmartChat ↗' }, link: 'https://public.oweb-chat.llmhub.t-systems.net/', attrs: { target: '_blank' } },
						{ label: 'LLM Playground ↗', translations: { de: 'LLM Playground ↗' }, link: 'https://playground.llmhub.t-systems.net/', attrs: { target: '_blank' } },
						{ label: 'Model Status ↗', translations: { de: 'Modell-Status ↗' }, link: 'https://uptime.llmhub.t-systems.net/status/health', attrs: { target: '_blank' } },
						{ label: 'Service Description (PDF) ↗', translations: { de: 'Leistungsbeschreibung (PDF) ↗' }, link: '/files/Leistungsbeschreibung-LLM-Serving-Service.pdf', attrs: { target: '_blank' } },
					],
				},
			],
		}),
	],
});
