# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /api

# Copy package.json and package-lock.json
COPY backend/package.json backend/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the shared directory
COPY shared ./shared

# Copy the rest of the application code
COPY backend ./backend

WORKDIR /api/backend

# Build the TypeScript code
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "start"]