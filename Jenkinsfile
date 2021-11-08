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
                stage('Run docker over SSH'){
                   steps {
                       sshagent(['ssul-ssh-key']){
                           sh "ssh -p 4781 -o StrictHostKeyChecking=no root@106.10.34.157 'docker pull whoishu/ssul-front'"
                           sh "ssh -p 4781 -o StrictHostKeyChecking=no root@106.10.34.157 'docker pull whoishu/ssul-api'"
                           sh "ssh -p 4781 -o StrictHostKeyChecking=no root@106.10.34.157 'cd /root/web32-SSUL && docker-compose up -d'"
                       }
                   }
                }
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