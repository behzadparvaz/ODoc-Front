# stage 0 : base
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS base

# stage 1 : builder
FROM base AS builder
WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy package files
COPY package*.json .npmrc ./

# Install dependencies with specific flags for production
RUN npm ci --force --verbose

# Copy source code
COPY . .

# Set environment variables
ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

# Copy environment file
COPY .env.staging .env
RUN rm -f .env.* 

# Build application with production optimization
RUN npm run build

# stage 2 : runner
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# Create non-root user with specific UID/GID
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next/cache && \
    chown -R nextjs:nodejs .

# Copy built application with specific ownership
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set strict permissions
RUN chmod -R 550 /app && \
    chmod -R 770 .next/cache && \
    chown -R nextjs:nodejs .

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE $PORT

# Start the application
CMD ["node", "server.js"]
