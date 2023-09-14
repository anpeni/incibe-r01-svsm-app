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

  stages {
    stage ('test'){
      steps {
        sh 'echo "It\'s working"'
      }
    }
  }
}
  // stages {
  //   stage('environment') {
  //     steps {
  //       container('git-node') {
  //         script {
  //           sh """
  //               git config --global --add safe.directory ${WORKSPACE}
  //               git config --global user.email "jenkins@neoris.com"
  //               git config --global user.name "jenkins"
  //             """
  //           env.revision = sh(script: 'git log -1 --format=\'%h.%ad\' --date=format:%Y%m%d-%H%M | cat', returnStdout: true).trim()
  //           env.branch = env.BRANCH_NAME.take(20).replaceAll('/', '_')
  //           if (env.branch != 'master') {
  //             env.revision += "-${branch}"
  //           }
  //           sh "echo Building revision: ${revision}"
  //         }
  //       }
  //     }
  //   }

  //   stage('dependencies') {
  //     steps {
  //       container('npm') {
  //         script {
  //           sh "npm install"
  //         }
  //       }
  //     }
  //   }

  //   stage('npm-build') {
  //     steps {
  //       container('npm') {
  //         script {
  //           sh "npm run build"
  //         }
  //       }
  //     }
  //   }

  //   stage('unit test') {
  //     steps {
  //       container('npm-tests') {
  //         sh "npm run test-headless"
  //       }
  //     }
  //     post {
  //       always {
  //         junit allowEmptyResults: true, testResults: 'test-results.xml'
  //       }
  //     }
  //   }

  //   stage('sonarqube') {
  //     when {
  //       not {
  //         changeRequest()
  //       }
  //     }
  //     steps {
  //       container('sonar-scanner') {
  //         withSonarQubeEnv('sonarcloud') {
  //           sh "sonar-scanner \
  //                 -Dsonar.branch.name=${BRANCH_NAME}"
  //         }
  //         // timeout(time: 1, unit: 'HOURS') {
  //         //   waitForQualityGate abortPipeline: true
  //         // }
  //       }
  //     }
  //   }

  //   stage('sonarqube pr') {
  //     when {
  //       changeRequest()
  //     }
  //     steps {
  //       container('sonar-scanner') {
  //         withSonarQubeEnv('sonarcloud') {
  //           script {
  //             sh "sonar-scanner \
  //                   -Dsonar.pullrequest.bitbucketcloud.owner={aa927ef2-7f73-41ca-9b03-3a4817d85ca9} \
  //                   -Dsonar.pullrequest.bitbucketcloud.repository=dso.aws.nodejs \
  //                   -Dsonar.pullrequest.base=${CHANGE_TARGET} \
  //                   -Dsonar.pullrequest.key=${CHANGE_ID} \
  //                   -Dsonar.pullrequest.branch=${CHANGE_BRANCH}"
  //           }
  //         }
  //         // timeout(time: 1, unit: 'HOURS') {
  //         //   waitForQualityGate abortPipeline: true
  //         // }
  //       }
  //     }
  //   }

  //   stage ('validate dockerfile') {
  //     steps {
  //       container('trivy') {
  //         script {
  //           sh """
  //             trivy config ${WORKSPACE}/Dockerfile
  //           """
  //           sh """
  //             trivy config --exit-code 1 --severity CRITICAL ${WORKSPACE}/Dockerfile
  //           """
  //         }
  //       }
  //     }
  //   }

  //   stage ('build image') {
  //     steps {
  //       container('kaniko') {
  //         script {
  //           sh "mkdir -p ${WORKSPACE}/image"
  //           sh "/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --no-push --tarPath=${WORKSPACE}/image.tar --destination=061496817474.dkr.ecr.eu-west-1.amazonaws.com/cicd/backstage:${revision}"
  //         }
  //       }
  //     }
  //   }
  //   stage ('analysis image') {
  //     steps {
  //       container('trivy') {
  //         script {
  //           sh """
  //             trivy image --input ${WORKSPACE}/image.tar
  //           """
  //           sh """
  //             trivy image --input ${WORKSPACE}/image.tar --severity CRITICAL
  //           """
  //         }
  //       }
  //     }
  //   }

  //   stage ('push image'){
  //     steps {
  //       container('kaniko') {
  //         script {
  //           sh '/kaniko/executor -f `pwd`/Dockerfile -c `pwd` --cache=true --destination=061496817474.dkr.ecr.eu-west-1.amazonaws.com/cicd/backstage:${revision} --build-arg=REVISION=${revision}'
  //         }
  //       }
  //     }
  //   }

  //   stage('deploy artifact') {
  //     when {
  //       not {
  //         changeRequest()
  //       }
  //     }
  //     steps {
  //       container('git-node') {
  //         script {
  //           def imageValue = "061496817474.dkr.ecr.eu-west-1.amazonaws.com/cicd/backstage:${revision}"
  //           checkout changelog: false, poll: false, scm: [$class: 'GitSCM', branches: [[name: '*/master-config']], 
  //                   doGenerateSubmoduleConfigurations: false, extensions: [[$class: 'RelativeTargetDirectory', relativeTargetDir: 'gitops']], submoduleCfg: [], 
  //                   userRemoteConfigs: [[credentialsId: 'bitbucket-bot-neoris-devsecops-http', url: 'https://neoris-devsecops@bitbucket.org/neoris-global/dso.backstage.git']]]
  //           dir('gitops') {
  //             sh """
  //               sed -i "s|image:.*|image: $imageValue|g" ./base/application/deployment.yaml
  //             """
  //             sh """
  //               git config --global --add safe.directory ${WORKSPACE}/gitops
  //               git config --global user.email "ddcglobal.practices@neoris.com"
  //               git config --global user.name "neoris-devsecops"
  //               git add ./base/application/deployment.yaml
  //               git commit -m "neoris-devsecops: deployed new version for petclinic-angular:${imageValue}"
  //             """
  //             withCredentials([usernamePassword(credentialsId: 'bitbucket-bot-neoris-devsecops-http', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
  //                 sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@bitbucket.org/neoris-global/dso.backstage.git HEAD:master-config')
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
