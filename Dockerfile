FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /server
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /server
COPY --from=deps /server/node_modules ./node_modules
COPY . .

RUN npm run build

FROM node:16-alpine AS runner
WORKDIR /server

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 user

COPY --from=builder /server/node_modules ./node_modules
COPY --from=builder /server/build ./build
COPY --from=builder /server/package.json ./package.json

COPY --from=builder --chown=user:nodejs /server/build ./

USER user

EXPOSE 4000

ENV PORT 4000

CMD ["node", "server.js"]