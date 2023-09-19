# latest version of node
#FROM httpd:latest
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# install node modules
COPY ./package*.json .

RUN apt-get update 
RUN apt-get upgrade -y 
RUN apt-get install -y nodejs 
RUN apt-get install -y npm

# RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - 
# RUN apt-get install -y nodejs

RUN npm install

ENV PORT 80

# Copy all files from current directory to working dir in image
COPY . .  

EXPOSE 80
CMD [ "npm", "start"]