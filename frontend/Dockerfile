# Use the official Node.js image from the Docker Hub
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Serve the built application using a simple HTTP server
RUN npm install -g serve
CMD ["serve", "-s", "dist"]