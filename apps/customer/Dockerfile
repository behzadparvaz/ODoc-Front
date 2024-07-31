FROM node:20.14.0-alpine
WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . /app

RUN npm run build

ENV PORT 5000
EXPOSE $PORT

# Start the Next.js application
CMD ["sh", "-c", "PORT=$PORT npm run start"]
