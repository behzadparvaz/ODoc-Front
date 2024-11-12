# Stage : Build
FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json to install dependencies
COPY package.json package-lock.json .npmrc ./

RUN npm install --legacy-peer-deps

COPY . .

COPY .env.staging .env

RUN rm -f .env.* 

RUN npm run build

FROM jfrog.tapsi.doctor/containers/node:20.14.0-alpine

WORKDIR /app

COPY --from=builder /app ./

ENV PORT 3000

EXPOSE $PORT

CMD ["sh", "-c", "npm run start"]
