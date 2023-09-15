pipeline{
    agent {label "linux"}
    options{
        skipStagesAfterUnstable()
    }
    stages{
        stage('Build'){
            steps{
                echo 'Building the app'
            }
        }
        stage('Test'){
            steps{
                echo 'Testing the app'
            }
        }
        stage('Deploy'){
            steps{
                echo 'Deploying the app'
            }
        }
    }
}