
pipeline{
  agent {
    kubernetes {
      cloud 'dev'
      yamlFile 'JenkinsKubernetesPod.yaml'
    }
  }  
    
  stages{
    stage('Build'){
      steps{
        script{
         sh 'echo Building the app' 
        }
      }
    }

    stage('Test'){
      steps{
        script{
          container('git-node'){
            sh 'git status'
          }
         
        }
      }
    }

  }
}