pipeline {
    environment {
        serverImageName = 'whoishu/ssul-api'
        frontImageName = 'whoishu/ssul-front'
        registryCredential = 'dockerhub-whoishu'
    }
    agent any
    stages {
        stage("deploy for dev") {
            when {
                branch "develop"
            }
            stages {
                stage('Build docker image'){
                    steps {
                        echo 'Build BE image'
                        sh 'docker build -t $serverImageName:latest ./server/'
                        echo 'Build FE image'
                        sh 'docker build -t $frontImageName:latest ./client/'
                    }
                }
                stage('Push docker images'){
                    steps {
                        withDockerRegistry([credentialsId: registryCredential, url: ""]){
                            sh 'docker push $serverImageName:latest'
                            sh 'docker push $frontImageName:latest'
                        }
                    }
                }
                stage('Clean docker image'){
                    steps {
                        sh 'docker rmi $serverImageName'
                        sh 'docker rmi $frontImageName'
                    }
                }
                // TODO: ssh docker pull
            }
            
        }
        stage("deploy for main") {
            when {
                branch "main"
            }
            steps {
                echo "do deploy"
            }
        }
        stage("ci test for PR"){
            when {
                branch "PR-*"
            }
            steps {
                echo "just fine."
            }
        }
    }
}