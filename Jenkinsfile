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

    stage('yarn-builder') {
      steps {
        container('install-dependencies') {
          script {
            sh """
              yarn build:backend --config ../../app-config.yaml
            """
          }
        }
      }
    }
    
    stage('trivy-scanner') {
      steps {
        container('trivy-scanner') {
          script {
            sh """
              #!/usr/bin/env sh
                cmd="trivy ${*} "
                echo "Running trivy task with command below"
                echo "$cmd"
                eval "$cmd"
            """
          }
        }
      }
    }

   
  }
}