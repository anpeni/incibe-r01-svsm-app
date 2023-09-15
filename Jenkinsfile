
pipeline{
  agent {
    kubernetes {
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
  }

}