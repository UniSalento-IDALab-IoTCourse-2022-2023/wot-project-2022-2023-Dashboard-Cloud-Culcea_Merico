# Use the official Node.js base image
FROM node:14

WORKDIR /dashboardApp

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
