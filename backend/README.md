To run docker for this, CMD + SHIFT + P then 'Docker Image: ...'

1. Run `npm init` in terminal in the `backend` directory
2. Run `npm install express` in terminal in the `backend` directory

Also, may be better just to run 'apt-get update' and 'apt-get upgrade -y' in Ubuntu than running it everytime you build an image
Here is the command to Build 
`docker build -f "backend/Dockerfile" -t 2023fallteam06syllabot:latest "backend"`
Based off of "docker run -p <HostPort:containerport> imagename:tag"
`docker run --name "backend-sb" -p 3000:3000 2023fallteam06syllabot:latest` 

Note:
    When using request body, must pass the form information through x-www-formurlencoded
