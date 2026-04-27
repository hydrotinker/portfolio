FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

# ─── Production image ──────────────────────────────────────────────────────────
FROM node:22-alpine AS prod
WORKDIR /app

COPY --from=build /app/.output ./

ENV HOST=0.0.0.0 PORT=3000 NODE_ENV=production
EXPOSE 3000

CMD ["node", "server/index.mjs"]
