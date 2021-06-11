#!/usr/bin/env groovy
@Library(['piper-lib-os']) _

node() {
  stage('Whitesource Scan') {
    checkout scm
    setupCommonPipelineEnvironment script: this
    whitesourceExecuteScan script: this
  }
}
