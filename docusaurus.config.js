// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'AI Foundation Services',
  //tagline: 'create-tsi',
  favicon: 'img/favicon_180x180.png',

  // Set the production url of your site here
  url: 'https://docs.llmhub.t-systems.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'T-Systems', // Usually your GitHub org/user name.
  projectName: 'AI Foundation Services', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

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
  plugins: [
    require.resolve("docusaurus-plugin-search-local"),
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      navbar: {
      },
      footer: {
      },
      prism: {
      },
      //themes: [
        //[
          /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
         // ({
          //  hashed: true,
           // highlightSearchTermsOnTargetPage: true,
           // explicitSearchResultPath: true,
           // docsRouteBasePath: '/docs',
           // searchRoute: '/search'
         // }),
        //],
      //],
    }),
    
};

export default config;
