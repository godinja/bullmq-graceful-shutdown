FROM node

ENV NODE_ENV=production
COPY . .
RUN yarn install
RUN npx tsc

CMD ["node", "./build/server.js"]