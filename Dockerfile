# Use the official Node.js image as the base image
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of your application code
COPY . .

# Build the Next.js application
RUN npm run build

# Set environment variable for the port
ENV PORT 3000

# Expose port 3000 for the application
EXPOSE $PORT

# Start the Next.js application
CMD ["sh", "-c", "npm run start"]