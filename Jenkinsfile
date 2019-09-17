pipeline {
   agent {
        node {
            label 'node'
        }
    }
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/SudeshSharma/NodeServer.git'
      }
    }
        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Test') {
      steps {
         sh 'npm test'
      }
    }      
  }
}
