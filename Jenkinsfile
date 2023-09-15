pipeline{
  agent {
    kubernetes{
      yaml """
      apiVersion: v1
      kind: Pod
      metadata:
        labels:
          job: backstage.angular
      spec:
        containers:
        - name: git-node
          image: timbru31/node-alpine-git:16
          command: ["cat"]
          tty: true
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
          image: 061496817474.dkr.ecr.eu-west-1.amazonaws.com/node-chrome:1.0.0
          command:
          - cat
          tty: true
          securityContext: 
            priviledged: true
          resources:
            requests:
              cpu: "200m"
              memory: "128Mi"
        - name: trivy
          image: docker.io/aquasec/trivy
          command:
          - cat
          tty: true
          securityContext:
            privileged: true
          resources:
            requests:
              cpu: "200m"
              memory: "128Mi"
        - name: sonar-scanner
          image: sonarsource/sonar-scanner-cli:4
          command: ["cat"]
          tty: true
          resources:
            requests:
              cpu: "200m"
              memory: "128Mi"            
        - name: kaniko
          image: gcr.io/kaniko-project/executor:debug
          imagePullPolicy: Always
          command:
          - /busybox/cat
          tty: true
          resources:
            requests:
              cpu: "200m"
              memory: "128Mi"            
          volumeMounts:
          - name: jenkins-docker-cfg
            mountPath: /kaniko/.docker/
        volumes:
        - name: jenkins-docker-cfg
          configMap:
            name: jenkins-docker-cfg
        """.stripIndent()
    }
  }

  stages{
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
            if (env.branch != 'master') {
              env.revision += "-${branch}"
            }
            sh "echo Building revision: ${revision}"
          }
        }
      }
    }
    stage('dependencies') {
      steps {
        container('npm') {
          script {
            sh "npm install"
          }
        }
      }
    }

    stage('npm-build') {
      steps {
        container('npm') {
          script {
            sh "npm run build"
          }
        }
      }
    }

    stage('npm-tests') {
      steps {
        container('npm-tests') {
          script {
            sh "npm run test"
          }
        }
      }
    }


  }
}