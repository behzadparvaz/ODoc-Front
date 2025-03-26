# Stage 1: Base
FROM jfrog.tapsi.doctor/containers/node:20.14.0-slim AS base

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Configure DNS (if needed for your network)
#RUN echo "nameserver 4.2.2.4" > /etc/resolv.conf

# Install required system dependencies
RUN apt-get update && \
    apt-get install -y ca-certificates git && \
    rm -rf /var/lib/apt/lists/*

COPY package.json ./

RUN npm install --force

# Copy source code
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

COPY .env.staging .env
RUN rm -f .env.* 

RUN npm run build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set proper permissions
RUN chown -R nextjs:nodejs /app

USER nextjs

ENV PORT=3000

EXPOSE $PORT

CMD ["node", "server.js"]
