pipeline {
    agent any
    tools {
        nodejs 'yarn'
    }

    stages {
        stage('checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/bpa4mu/ciCdPlayground.git'

                script {
                    currentBuild.displayName = "Toller Name"
                    currentBuild.description = "Tests run on this branch"
                    // you can also set display name:
                    // currentBuild.displayName = "#${env.BUILD_NUMBER} - ${env.BRANCH_NAME}"
                }
            }
        }
        stage('install') {
            steps {
                sh 'yarn'
            }
        }

        stage('unit test') {
            steps {
                sh 'yarn test'
            }
        }

        stage('build') {
            steps {
                sh 'yarn build'
            }
        }

        stage('integration test') {
            steps {
                sh 'yarn test:e2e'
            }
            post {
                always {
                    // Publish JUnit results even if build fails
                    junit '**/reports/**/*.xml'

                }
            }
        }

        stage('deploy') {
            steps {
                s3Upload consoleLogLevel: 'INFO', 
                  dontSetBuildResultOnFailure: false, 
                  dontWaitForConcurrentBuildCompletion: false, 
                  entries: [[
                      bucket: "cicd-workshop-playground/${env.GIT_URL.split('/')[3]}", 
                      excludedFile: '',
                      flatten: false, 
                      gzipFiles: false, 
                      keepForever: false, 
                      managedArtifacts: false, 
                      noUploadOnFailure: false, 
                      selectedRegion: 'eu-central-1', 
                      showDirectlyInBrowser: false, 
                      sourceFile: 'public/**/*.*', 
                      storageClass: 'STANDARD', 
                      uploadFromSlave: false, 
                      useServerSideEncryption: false
                    ]], 
                    pluginFailureResultConstraint: 'FAILURE', 
                    profileName: 'role-based-access', 
                    userMetadata: []
            }
        }
    }
}
