To run docker for this, CMD + SHIFT + P then 'Docker Image: ...'

Also, may be better just to run 'apt-get update' and 'apt-get upgrade -y' in Ubuntu than running it everytime you build an image
Here is the command to Build 
`docker build -f "backend/Dockerfile" -t 2023fallteam06syllabot:latest "backend"`
Based off of "docker run -p <HostPort:containerport> imagename:tag"
`docker run --name "backend-sb" -p 80:80 2023fallteam06syllabot:latest` 
