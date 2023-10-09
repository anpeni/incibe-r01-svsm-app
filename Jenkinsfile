pipeline {
  agent { 
    kubernetes {
      yaml """
        apiVersion: v1
        kind: Pod
        metadata:
          labels:
            job: backstage.angular
        spec:
          containers:
          - name: git-node
            image: timbru31/node-alpine-git:18
            command: ["cat"]
            tty: true
            resources:
              requests:
                cpu: "200m"
                memory: "128Mi"  
          - name: install-dependencies
            image: nikolaik/python-nodejs:python3.11-nodejs16-bullseye
            command:
            - cat
            tty: true
            securityContext: 
              priviledged: true
            resources:
              requests:
                cpu: "200m"
                memory: "128Mi" 
          - name: trivy-scanner
            image: public.ecr.aws/aquasecurity/trivy:latest
            command:
            - cat
            tty: true
            securityContext: 
              priviledged: true
            resources:
              requests:
                cpu: "200m"
                memory: "128Mi"
          - name:kaniko
            image: gcr.io/kaniko-project/executor:v1.15.0-debug
            command:
            - cat
            tty: true
            securityContext: 
              priviledged: true
            resources:
              requests:
                cpu: "200m"
                memory: "128Mi"      
          - name: npm
            image: node:12-alpine
            command:
            - cat
            tty: true
            securityContext: 
              priviledged: true
            resources:
              requests:
                cpu: "200m"
                memory: "128Mi"
          volumes:
          - name: jenkins-docker-cfg
            configMap:
              name: jenkins-docker-cfg
        """.stripIndent()
    }
  }

  stages {
    stage('environment') {
      steps {
        container('git-node') {
          script {
            sh """
                git config --global --add safe.directory ${WORKSPACE}
                git config --global user.email "jenkins@neoris.com"
                git config --global user.name "jenkins"
              """
            env.revision = sh(script: 'git log -1 --format=\'%h.%ad\' --date=format:%Y%m%d-%H%M | cat', returnStdout: true).trim()
            env.branch = env.BRANCH_NAME.take(20).replaceAll('/', '_')
            if (env.branch != 'develop') {
              env.revision += "-${branch}"
            }
            sh "echo Building revision: ${revision}"
          }
        }
      }
    }

    stage('install-dependencies') {
      steps {
        container('install-dependencies') {
          script {
            sh """
              yarn install --frozen-lockfile
            """
          }
        }
      }
    }

    stage('yarn-tsc') {
      steps {
        container('install-dependencies') {
          script {
            sh """
              yarn tsc
            """
          }
        }
      }
    }

   
    
    stage('validate-dockerfile') {
      steps {
        container('trivy-scanner') {
          script {
            sh """
              #!/usr/bin/env sh
                cmd="trivy config --severity CRITICAL ./packages/backend/Dockerfile"
                echo "Running trivy task with command below"
                echo "\$cmd"
                eval "\$cmd"
            """
          }
        }
      }
    }

    stage('build-and-push') {
  steps {
    container('kaniko') {
      withCredentials([string(credentialsId: 'creds-aws-ecr', variable: 'DOCKER_AUTH_CONFIG')]) {
        script {
          sh """
            #!/busybox/sh
            cd ./source
            if [[ -s changes.txt ]]; then
              while IFS= read -r p
              do  
                echo "Building $p image using Kaniko"
                if [[ \${params.push} ]]; then
                  echo a
                  cmd="/kaniko/executor --context $p/. --dockerfile $p/Dockerfile --destination \$(params.image-registry)/$p:\$(params.image-tag)" 
                else
                  echo b
                  cmd="/kaniko/executor --context $p/. --dockerfile $p/Dockerfile --destination \$(params.image-registry)/$p:\$(params.image-tag) --no-push --tarPath=$p.tar" 
                fi 
                eval \$cmd
                if [[ \$? -eq 1 ]]; then
                    variable=`echo \$p | cut -d'/' -f3`
                    sed -i "s/\$variable//g" changes.txt
                else 
                    variable=`echo \$p | cut -d'/' -f3`
                fi
              done < changes.txt         
            else
              echo "Error: No changes detected in last commit"
              exit 1
            fi
          """
        }
      }
    }
  }
}
   
  }
}