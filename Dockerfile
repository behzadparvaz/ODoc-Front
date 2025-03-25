# stage 0 : base
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app

RUN apk add --no-cache git

# Copy package files for better caching
COPY package.json ./

# Install npm dependencies
RUN npm install --legacy-peer-deps

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

# Set build-time environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max_old_space_size=4096"

# Create necessary directories
RUN mkdir -p .next

COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.staging .env
RUN rm -f .env.* 

# Build the application
RUN npm run build

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p .next/cache && \
    chown -R nextjs:nodejs .

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chmod -R 550 /app && \
    chmod -R 770 .next/cache && \
    chown -R nextjs:nodejs .

USER nextjs

ENV PORT=3000

EXPOSE $PORT

CMD ["node", "server.js"]
