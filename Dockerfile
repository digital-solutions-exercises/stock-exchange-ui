# Use Node.js 18 as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon in Docker container
RUN npm install -g nodemon

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the ReactJS application will run
EXPOSE 3000

# Command to run the ReactJS application
CMD ["npm", "run", "start"]
