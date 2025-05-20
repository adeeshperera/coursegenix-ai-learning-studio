# Install dependencies only when needed
FROM node:18-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
COPY .env .env
COPY .env .env.local
COPY .env .env.production
# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG STRIPE_API_KEY
ENV STRIPE_API_KEY=$STRIPE_API_KEY

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

ARG NEXTAUTH_SECRET
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET

ARG GOOGLE_CLIENT_ID
ENV GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID

ARG GOOGLE_CLIENT_SECRET
ENV GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET

ARG OPENAI_API_KEY
ENV OPENAI_API_KEY=$OPENAI_API_KEY

ARG UNSPLASH_API_KEY
ENV UNSPLASH_API_KEY=$UNSPLASH_API_KEY

ARG YOUTUBE_API_KEY
ENV YOUTUBE_API_KEY=$YOUTUBE_API_KEY

ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=$NEXTAUTH_URL

ARG STRIPE_WEBHOOK_SECRET
ENV STRIPE_WEBHOOK_SECRET=$STRIPE_WEBHOOK_SECRET

ARG _GITHUB_CLIENT_ID
ENV _GITHUB_CLIENT_ID=$_GITHUB_CLIENT_ID

ARG _GITHUB_CLIENT_SECRET
ENV _GITHUB_CLIENT_SECRET=$_GITHUB_CLIENT_SECRET

RUN npx prisma generate

RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image, copy all the files and run next
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY .env .env
COPY .env .env.local
COPY .env .env.production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"] 