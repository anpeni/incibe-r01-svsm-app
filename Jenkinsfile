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
          - name: npm-tests
            image: 061496817474.dkr.ecr.eu-west-1.amazonaws.com/mirror/selenium/node-chrome:4.11.0-20230801
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
    

   
  }
}