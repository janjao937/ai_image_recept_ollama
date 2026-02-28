FROM node:22-slim
RUN apt-get update && apt-get install -y libvips-dev && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npx", "ts-node", "--esm", "server.ts"]