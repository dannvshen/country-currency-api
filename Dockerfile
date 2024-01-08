# Usa a base image with Node.js version 14-alpine
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the working directory
COPY . .

# Expose the port this application will run on
EXPOSE 3000 9229

# Command to run this application
CMD [ "npm", "run", "start:dev" ]