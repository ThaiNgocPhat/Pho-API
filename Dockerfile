# Use Node.js as base image
FROM node:18

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Run the application
CMD ["pnpm", "start:prod"]
