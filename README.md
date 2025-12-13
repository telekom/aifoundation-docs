# Access the Docs

[https://docs.llmhub.t-systems.net/](https://docs.llmhub.t-systems.net/)

## Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

### Requirements

Node.js version 18.0 or above (which can be checked by running node -v). You can use nvm for managing multiple Node versions on a single machine installed.

Run the following code to initialize the repository

```text
$ npm install
```

This will install all dependencies including the Telekom Scale Design System components. The Telekom Scale components are configured according to the [Telekom Guidelines](https://telekom.github.io/scale/?path=/docs/setup-info-getting-started-for-developers--page).

### Local Development

```text
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```text
$ npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

```text
$ npm run serve
```

This command is used to test the final production build locally.

### Deployment

The deployment to Github Pages is automated using Github actions.
