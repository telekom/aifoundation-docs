# Access the Docs

[https://docs.llmhub.t-systems.net/](https://docs.llmhub.t-systems.net/)

## Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

### Requirements

Choose either

- **Bun** (recommended) - A fast JavaScript runtime and package manager. Install from [bun.sh](https://bun.sh) for significantly faster package installation and script execution.
- **Node.js** version 18.0 or above (which can be checked by running `node -v`). You can use nvm for managing multiple Node versions on a single machine installed.

⚠️ **Package Manager Note**: Choose either npm or bun and stick with it throughout your development session. Do not mix usage to avoid undesired behavior. So even if the command outputs recommend to run `npm something` just run `bun something` instead if you have chosen to use `bun`.

```text
bun install  # or: npm install
```

This will install all dependencies including the Telekom Scale Design System components. The Telekom Scale components are configured according to the [Telekom Guidelines](https://telekom.github.io/scale/?path=/docs/setup-info-getting-started-for-developers--page).

### Local Development

```text
bun run start  # or: npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```text
bun run build  # or: np run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

```text
bun run serve  # or: npm run serve
```

This command is used to test the final production build locally.

### Deployment

The deployment to Github Pages is automated using Github actions.
