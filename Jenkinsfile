pipeline {

    agent {
        docker {
          image 'vuejs/ci'
        }
    }

    stages {

        stage('Build') {
          steps {
            sh 'echo "VUE_APP_API_PATH=http://d.stickheinz.com:8087" > .env'
            sh 'echo "VUE_APP_API_VERSION=v1" >> .env'
            sh 'npm install'
            sh 'npm run build:client'
            sh 'npm run build:server'
          }
        }

        stage('Deploy to development server') {

            when {
                branch 'dev'
            }

            steps {

                sh 'mkdir -p dist/dist'
                sh 'mkdir -p dist/dist/client'
                sh 'mkdir -p dist/dist/server'
                sh 'cp -R dist/client/* dist/dist/client'
                sh 'rm -R dist/client/'
                sh 'cp -R dist/server/* dist/dist/server'
                sh 'rm -R dist/server/'
                sh 'cp server.js dist/server.js'
                sh 'tar -zcvf node_modules.tar.gz node_modules'
                sh 'mv node_modules.tar.gz dist/node_modules.tar.gz'
                sh 'tar -xzf dist/node_modules.tar.gz -C dist'
                sh 'rm dist/node_modules.tar.gz'
                sh 'rm -R node_modules'
                sh 'tar -zcvf stickheinz-frontend.tar.gz dist'

                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: 'stickheinz.com',
                            verbose: true,
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            sshRetry: [
                                    retries: 2,
                                    retryDelay: 5000
                            ],
                            transfers: [
                                sshTransfer(
                                    excludes: '',
                                    execCommand: '',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: 'frontend',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: 'stickheinz-frontend.tar.gz'
                                ),
                                sshTransfer(
                                    excludes: '',
                                    execCommand: 'kill -9 `lsof -t -i:3000` || true',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                ),
                                sshTransfer(
                                    excludes: '',
                                    execCommand: 'rm -rf dist || rm server.js || true',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: 'frontend',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                ),
                                sshTransfer(
                                    excludes: '',
                                    execCommand: 'tar -xzf /home/terraform/frontend/stickheinz-frontend.tar.gz -C /home/terraform/frontend',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                ),
                                sshTransfer(
                                    excludes: '',
                                    execCommand: 'chown -R terraform:terraform /home/terraform/frontend',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                ),
                                sshTransfer(
                                    excludes: '',
                                    execCommand: 'rm /home/terraform/frontend/stickheinz-frontend.tar.gz',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: '',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                ),
                                sshTransfer(
                                    excludes: '',
                                    execCommand: 'cd /home/terraform/frontend/dist && nohup node server.js > /dev/null 2>&1 &',
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: 'frontend',
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: ''
                                )
                            ]
                        )
                    ]
                )

            }
        }
    }
}