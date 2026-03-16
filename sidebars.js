// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    { type: 'doc', id: 'overview', label: 'Overview' },
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quickstart',
        'getting-started/authentication',
        'getting-started/models',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/chat-completions',
        'guides/streaming',
        'guides/embeddings',
        'guides/multimodal',
        'guides/audio',
        'guides/function-calling',
        'guides/image-generation',
        'guides/reasoning',
        'guides/fine-tuning',
        'guides/visual-rag',
        'guides/asynchronous-requests',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/langchain',
        'integrations/llama-index',
      ],
    },
    {
      type: 'category',
      label: 'SmartChat RAG',
      items: [
        'smartchat/smartchat-overview',
        'smartchat/smartchat-api-reference',
        'smartchat/local-chat',
        'smartchat/global-chat',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/api-endpoints',
        'reference/error-codes',
        'reference/rate-limits',
      ],
    },
    { type: 'doc', id: 'plans-page', label: 'Plans & Pricing' },
    { type: 'doc', id: 'faq', label: 'FAQ' },
  ],
};

export default sidebars;
