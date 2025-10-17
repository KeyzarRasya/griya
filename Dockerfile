# --- Build Stage ---
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# --- Runtime Stage ---
FROM node:22-alpine AS runner
WORKDIR /app

# Copy only what's necessary
COPY package*.json ./
COPY --from=builder /app/build ./build

# Install only production dependencies
RUN npm ci --omit=dev

# The Node adapter runs on port 3000 by default
EXPOSE 3000

CMD ["node", "build"]
