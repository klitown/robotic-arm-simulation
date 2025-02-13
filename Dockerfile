FROM node:20.18.3-slim

WORKDIR /ws

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"] 