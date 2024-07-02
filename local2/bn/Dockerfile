FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm install  # Install Node.js dependencies in the container

EXPOSE 80

CMD ["node", "server.js"]
