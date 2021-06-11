#!/usr/bin/env groovy
@Library(['piper-lib-os']) _

node() {
  stage('prepare') {
    checkout scm
    setupCommonPipelineEnvironment script:this
    whitesourceExecuteScan script: this
  }
}
