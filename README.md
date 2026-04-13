# Access the Docs

[https://docs.llmhub.t-systems.net/](https://docs.llmhub.t-systems.net/)

## Website

This website is built using [Astro Starlight](https://starlight.astro.build/), a documentation framework built on [Astro](https://astro.build/).

## Installation

### Requirements

- **Bun** - A fast JavaScript runtime and package manager. Install from [bun.sh](https://bun.sh).

```text
bun install
```

### Local Development

```text
bun run dev
```

This command starts a local development server. Most changes are reflected live without having to restart the server.

### Build

```text
bun run build
```

This command generates static content into the `dist` directory and can be served using any static contents hosting service.

```text
bun run preview
```

This command is used to preview the production build locally.

### Deployment

The deployment to GitHub Pages is automated using GitHub Actions.
