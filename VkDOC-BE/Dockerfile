# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /src/

# Copy package.json and package-lock.json
COPY src/package.json ./  
COPY src/package-lock.json ./ 

# Install the dependencies
RUN npm install

# Copy the rest of your application files
# Copy the rest of the application code
COPY src/. .

# Expose the port your app runs on
EXPOSE 2000 8080

# Start the application
CMD ["node", "src/index.js"]
