FROM node:16.17.0-bullseye-slim
WORKDIR /app
COPY package.json .
COPY yarn.lock .
COPY .env .
COPY prisma ./prisma
COPY dist ./dist
RUN yarn install --production
RUN npx prisma generate
RUN npx prisma db push
EXPOSE 3435
CMD ["yarn", "start"]