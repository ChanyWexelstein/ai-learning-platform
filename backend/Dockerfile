FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]
