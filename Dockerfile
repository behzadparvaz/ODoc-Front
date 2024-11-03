# Stage 1: Build
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Declare build arguments with a default value
ARG ENV_MODE=production

# Print the value of ENV_MODE (for debugging purposes)
RUN echo "The value of ENV_MODE is: ${ENV_MODE}"

# Copy only package.json and package-lock.json to install dependencies
COPY package.json package-lock.json .npmrc ./

# Remove package-lock.json file if ENV_MODE is not staging
RUN if [ "$ENV_MODE" != "staging" ]; then echo "Removing package-lock.json"; rm package-lock.json; fi

# Remove .npmrc file if ENV_MODE is not staging
RUN if [ "$ENV_MODE" != "staging" ]; then echo "Removing .npmrc"; rm .npmrc; fi


# Install dependencies using npm ci for better performance in production
RUN npm install --legacy-peer-deps

# Copy the rest of your application code
COPY . .

# Copy the appropriate .env file based on ENV_MODE
RUN if [ "$ENV_MODE" = "staging" ]; then \
    cp .env.staging .env; \
    else \
    cp .env.production .env; \
    fi

# Attempt to remove all .env.* files
RUN echo "Attempting to remove all .env.* files" && \
    rm -f .env.* && \
    echo ".env.* files removed successfully" || echo "No .env.* files to remove"

# Build the Next.js application
RUN npm run build

# Stage 2: Production
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine

# Set the working directory in the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app ./

# Set environment variable for the port
ENV PORT 3000

# Expose port 3000 for the application
EXPOSE $PORT

# Start the Next.js application
CMD ["sh", "-c", "npm run start"]