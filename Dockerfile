# Stage 0: Base
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS base

# Stage 1: Dependencies
FROM base AS deps
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN apk add --no-cache git
RUN npm install --legacy-peer-deps

# Stage 2: Builder
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

COPY .env.staging .env
RUN rm -f .env.* 

# Add a step to clean up npm cache if needed
# RUN npm cache clean --force

RUN npm run build --no-audit

# Stage 3: Runner
FROM base AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT=3000

EXPOSE $PORT

CMD ["node", "server.js"]
