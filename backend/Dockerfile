FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

RUN npx prisma generate

EXPOSE 3000

CMD sh -c "npx prisma migrate deploy && npx prisma db seed && npm run dev"
