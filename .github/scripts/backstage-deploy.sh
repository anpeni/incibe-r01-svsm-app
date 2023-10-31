#!/bin/bash

# Definir la versión de la imagen y el token en variables
IMAGE_VERSION=$1
GITHUB_TOKEN=$2
HOST_ECR=$3

ls -la
git branch -a
git fetch origin
git show-ref --verify --quiet refs/remotes/origin/feature/release-cicd/backstage-$IMAGE_VERSION && (git checkout feature/release-cicd/backstage-$IMAGE_VERSION && git pull origin feature/release-cicd/backstage-$IMAGE_VERSION) || git checkout -b feature/release-cicd/backstage-$IMAGE_VERSION
# Verificar la rama actual y asignar la ruta del archivo de despliegue correspondiente
if [[ $GITHUB_REF == refs/heads/release-* || $GITHUB_REF == refs/heads/stable-* ]]; then
  DEPLOYMENT_PATH="tools/base/backstage/backstage-prod/app/deployment.yaml"
else
  DEPLOYMENT_PATH="tools/base/backstage/backstage-stg/app/deployment.yaml"
fi

sed -i "s|image:.*|image: ${HOST_ECR}/${IMAGE_VERSION}|g" $DEPLOYMENT_PATH

# Mostrar el contenido del archivo para verificar
cat $DEPLOYMENT_PATH
git config --global user.email "ddcglobal.practices@neoris.com"  
git config --global user.name "neoris-devsecops"
# Agregar, comprometer y empujar los cambios
git add $DEPLOYMENT_PATH
git commit -m "Actualización de la versión de la imagen a $IMAGE_VERSION"
git push --set-upstream origin feature/release-cicd/backstage-$IMAGE_VERSION

# Crear un Pull Request usando la API de GitHub
curl -X POST "https://api.github.com/repos/DDC-NEORIS/devtools-k8s/pulls" -H "Authorization: token $GITHUB_TOKEN" -d "{\"title\": \"Actualización de la imagen a $IMAGE_VERSION\", \"head\": \"feature/release-cicd/backstage-$IMAGE_VERSION\", \"base\": \"main\", \"body\": \"AUTO PR\"}"

        #    ls -la
        #    git branch -a
        #    git fetch origin
        #    git show-ref --verify --quiet refs/remotes/origin/feature/release-cicd/backstage-$IMAGE_VERSION && (git checkout feature/release-cicd/backstage-$IMAGE_VERSION && git pull origin feature/release-cicd/backstage-$IMAGE_VERSION) || git checkout -b feature/release-cicd/backstage-$IMAGE_VERSION
        #    sed -i "s|image:.*|image: 061496817474.dkr.ecr.eu-west-1.amazonaws.com/${{ github.event.inputs.image_version }}|g" tools/base/backstage/backstage-stg/app/deployment.yaml
        #    cat tools/base/backstage/backstage-stg/app/deployment.yaml
        #    git config --global user.email "ddcglobal.practices@neoris.com"  
        #    git config --global user.name "neoris-devsecops"
        #    git add tools/base/backstage/backstage-stg/app/deployment.yaml
        #    git commit -m "Descripción de tus cambios aquí"
        #    git push --set-upstream origin feature/release-cicd/backstage-$IMAGE_VERSION
        #    curl -X POST "https://api.github.com/repos/DDC-NEORIS/devtools-k8s/pulls" -H "Authorization: token ${{ steps.generate-token-clone.outputs.token }}" -d '{"title": "Título de tu Pull Request", "head": "feature/release-cicd/backstage-$IMAGE_VERSION", "base": "main", "body": "test AUTO PR"}'      



