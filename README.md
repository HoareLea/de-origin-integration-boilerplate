# de-origin-integration-boilerplate
MFE project seed files for when embedding a new feature into the [Origin Federated Host platform](https://github.com/HoareLea/de-origin).

**Resources:**
- [Module Federation](https://webpack.js.org/concepts/module-federation/)

## Getting started

_Install_ all dependencies and _build_ to generate Graph API typings and download/extract remote module typings:

```
yarn install
yarn build
```

Run locally:

```
yarn start
```

## Generate Origin/Schema remote types

```
yarn generate
```

## Federated App - Consumed Micro front-end (MFE) 
The releasable App must adhere to the `exposes` ModuleFederationPlugin configuration within the [webpack.production](./build-utils/webpack.production.js) build file.

The externally exposed component is `App.view.tsx`

## Independent App - Deployed to domain
Any features or code that are independent of the Origin host app can be configured to the outermost container app `App.container.tsx`