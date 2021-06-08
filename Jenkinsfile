#!/usr/bin/env groovy
@Library(['piper-lib']) _

pipeline {
  agent none
  options {
    skipDefaultCheckout()
    timestamps()
  }
  stages {
    stage('WhiteSource Scan') {
      agent any
      steps {
        script {
          try {
            checkout scm
            setupPipelineEnvironment script: this
            whitesourceExecuteScan script: this
          } finally {
            deleteDir()
          }
        }
      }
    }
  }
}