#!/usr/bin/env groovy
@Library(['piper-lib-os']) _

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
            setupCommonPipelineEnvironment script: this
            whitesourceExecuteScan script: this
          } finally {
            deleteDir()
          }
        }
      }
    }
  }
}
