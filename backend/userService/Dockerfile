# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install 

# Copy app source code
COPY . .

# Expose default port
EXPOSE 5001

# Define environment mode
ENV NODE_ENV=production

# Run the application
CMD ["node", "index.js"]
