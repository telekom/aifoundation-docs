# Access the Docs: 

[https://docs.llmhub.t-systems.net/](https://docs.llmhub.t-systems.net/)


# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

#### Requirements
Node.js version 18.0 or above (which can be checked by running node -v). You can use nvm for managing multiple Node versions on a single machine installed.

Run the following code to install docusaurus

```
$ npm init docusaurus

```
#### Installing Telekom Design Dependencies

From  [Telekom Guidelines](https://telekom.github.io/scale/?path=/docs/setup-info-getting-started-for-developers--page), run these commands to install dependencies.

```
$ npm install @telekom/scale-components@next
```

```
$ npm install @telekom/scale-components-react@next
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ npm build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

```
$ npm run serve
```

This command is used to test the build locally.

### Deployment

The deployment to Github Pages is automated using Github actions.
