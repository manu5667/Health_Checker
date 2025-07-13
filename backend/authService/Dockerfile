# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install 

# Copy app source
COPY . .

# Expose the port
EXPOSE 5000

# Set environment variables file (optional, can override in Kubernetes)
ENV NODE_ENV=production

# Start the app
CMD ["node", "index.js"]
