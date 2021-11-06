pipeline {
    agent any
    stages {
        stage('Init') {
            steps {
                ehco 'init'
            }
        }
        stage('deploy for dev') {
            when {
                branch "develop"
            }
            steps {
                echo 'do deploy'
            }
        }
        stage('deploy for main') {
            when {
                branch "main"
            }
            steps {
                echo 'do deploy'
            }
        }
        stage('ci test for PR'){
            when {
                branch 'PR-*'
            }
            steps {
                echo 'just fine.'
            }
        }
    }
}