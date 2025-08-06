pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = credentials('sutarriddhesh22')
        DOCKER_HUB_PASS = credentials('admin@123')
        FRONTEND_IMAGE = "riddheshsutar/devtrack-frontend"
        BACKEND_IMAGE = "riddheshsutar/devtrack-backend"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:riddheshsutar/DevTrack.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t $FRONTEND_IMAGE:latest ./frontend"
                sh "docker build -t $BACKEND_IMAGE:latest ./backend"
            }
        }

        stage('Docker Login') {
            steps {
                sh "echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin"
            }
        }

        stage('Push Docker Images') {
            steps {
                sh "docker push $FRONTEND_IMAGE:latest"
                sh "docker push $BACKEND_IMAGE:latest"
            }
        }

        stage('Deploy to Server') {
            steps {
                sh '''
                ssh user@your-server << EOF
                docker pull $FRONTEND_IMAGE:latest
                docker pull $BACKEND_IMAGE:latest
                docker stop devtrack-frontend || true
                docker stop devtrack-backend || true
                docker rm devtrack-frontend || true
                docker rm devtrack-backend || true
                docker run -d --name devtrack-backend -p 5001:5000 $BACKEND_IMAGE:latest
                docker run -d --name devtrack-frontend -p 3000:80 $FRONTEND_IMAGE:latest
                EOF
                '''
            }
        }
    }
}
