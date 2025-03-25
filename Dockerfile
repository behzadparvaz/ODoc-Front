# stage 0 : base
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS base

FROM base AS builder
WORKDIR /app

RUN apk add --no-cache git

COPY package*.json .npmrc ./

RUN npm ci --force

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production

COPY .env.staging .env
RUN rm -f .env.* 

RUN npm run build

# stage 2 : runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs && \
    mkdir -p .next/cache && \
    chown -R nextjs:nodejs .

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

RUN chmod -R 550 /app && \
    chmod -R 770 .next/cache && \
    chown -R nextjs:nodejs .

USER nextjs

EXPOSE $PORT

CMD ["node", "server.js"]
