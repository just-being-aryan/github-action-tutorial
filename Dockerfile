# Use Node.js LTS as base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the app
COPY . .

# Expose port (same as in your server.js / index.js, e.g., 5000)
EXPOSE 5000

# Start the app
CMD ["npm", "start"]
