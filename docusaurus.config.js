// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AI Foundation Services Documentation',
  //tagline: 'create-tsi',
  favicon: 'img/favicon_180x180.png',

  // Set the production url of your site here
  url: 'https://telekom.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  trailingSlash: false,
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'telekom', // Usually your GitHub org/user name.
  projectName: 'aifoundation-docs', // Usually your repo name.

  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'warn',
  
    // Other configurations...
  
  i18n: {
      defaultLocale: 'en',
      locales: ['en'],
      localeConfigs: {
          en: { label: 'English' },
      },
  },

  scripts: [
    {
      src: '/setDefaultMode.js',
      async: true
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  clientModules: [
    require.resolve('./src/theme/Navbar/switchMode.js'),
],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        docsRouteBasePath: "/",
        indexBlog: false,
        
        highlightSearchTermsOnTargetPage: true,
      },
    ],     
  ],
  
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: "light", // Set the default mode to light
        respectPrefersColorScheme: false, // Ignore the user's system preferences
      },
      prism: {
        darkTheme: prismThemes.dracula,
      },
    }),

};


export default config;
