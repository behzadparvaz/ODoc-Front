# stage 0 : base
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app


# Copy package files for better caching
COPY package*.json ./

# Install npm dependencies
RUN npm install --force

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

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

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir -p build/cache && \
    chown -R nextjs:nodejs .

COPY --from=builder /app/public ./public
COPY --from=builder /app/build/standalone ./
COPY --from=builder /app/build/static ./build/static

RUN chmod -R 550 /app && \
    chmod -R 770 build/cache && \
    chown -R nextjs:nodejs .

USER nextjs

ENV PORT=3000

EXPOSE $PORT

CMD ["node", "server.js"]
