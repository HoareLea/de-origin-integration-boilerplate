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


## Local deployment with Docker

Build Docker image
```shell
docker build --tag <docker ID>/<image-name>:<image-tag> .
```
Test Docker image locally
```shell
docker run <docker ID>/<image-name>:<image-tag>
```
Push Docker image to hub
```shell
docker push  <docker ID>/<image name>:<tag>
```

## Continuous integration deployment with Terraform

CI/CD yml azure pipeline which builds a Docker image and deploys it to azure through Terraform.
The pipeline automatically builds the following branches:
- `main`
- `dev`
- `staging`
- `feature` branches
- `chore` branches


If you do not wish to automatically deploy your branch:
```yml
trigger:
    - none
```

### Deployment with Terraform

Requirements:
- Build and push your image to dockerhub
- Update your .env with the image name and tag
  
Navigate to Terraform directory
```bash
cd terraform
```
Populate .env based on sample.env and load environment variables
```bash
. .env
```
Initialise Terraform
```bash
terraform init
```
Validate configuration
```bash
terraform validate
```
Calculate Terraform plan
```bash
terraform plan
```
Apply Terraform configuration
```bash
terraform apply
```
