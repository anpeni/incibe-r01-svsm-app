# [Backstage](https://backstage.io)
>>>
## Docs
  https://backstage.io/docs
  https://demo.backstage.io/docs/default/component/backstage
  
  
## Prerequisites
  https://backstage.io/docs/getting-started/

- Node.js
  - nvm v16.13.0
      https://github.com/nvm-sh/nvm#install--update-script
      https://nodejs.org/en/download/package-manager/#nvm
```
      Comands
        nvm list
        nvm install v16.13.0
        nvm use v16.13.0
```

  - binary
      https://nodejs.org/en/download/
  - pagake manager
      https://nodejs.org/en/download/package-manager/

- yarn 
    https://classic.yarnpkg.com/en/docs/install
- docker
    https://docs.docker.com/engine/install/
- git
    https://github.com/git-guides/install-git

## Bump package verions

```sh
  $ npx backstage-cli versions:check --fix
  $ npx backstage-cli versions:bump
```

## Environment Variable Substitution
  https://backstage.io/docs/conf
# Doc
  https://backstage.io/docs/conf/writing#environment-variable-substitution

# Variables
```
  GRAFANA_TOKEN_ACCESS
  BITBUCKETCI_TOKEN_ACCESS
  BITBUCKET_CLOUD_USERNAME
  BITBUCKET_CLOUD_APP_PASSWORD
  SONARQUBE_APIKEY
  AWS_K8S_URL
  AWS_K8S_CADATA
  URL_GRAFANA
  URL_GRAFANA_DOMAIN
  URL_PROMETHEUS
  POSTGRES_HOST
  POSTGRES_PORT
  POSTGRES_USER
  POSTGRES_PASSWORD
  APP_BASE_URL
  BACKEND_BASE_URL
  URL_JENKINS
  JENKINS_APIKEY
  JENKINS_USERNAME
``` 

## Run local
  https://demo.backstage.io/docs/default/component/backstage/getting-started/running-backstage-locally/

```sh
$ kill `lsof -t -i:3000`
$ kill `lsof -t -i:7007`
$ yarn install
$ yarn dev

# Open  url to test
http://localhost:3000
```