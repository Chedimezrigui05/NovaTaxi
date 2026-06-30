FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent || true

# Copy source
COPY . /app
EXPOSE 3000

CMD ["npm", "run", "dev"]
