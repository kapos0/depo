FROM node:20-alpine

ENV AUTH_SECRET=p0eUJuhDR+35stAsCnAxYr9hPT0U30yAeu4LKybhR9A=
ENV AUTH_GITHUB_ID=Ov23liFEB4xFmKA1zv7r
ENV AUTH_GITHUB_SECRET=cbf07cba2348bf5694dbf45ab41758a10cdbbdf4
ENV AUTH_TRUST_HOST=true

ENV MONGODB_URI=mongodb+srv://dalinnx1:ImjATx4D7zIgVXmy@cluster0.0bk7b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
ENV PUBLIC_URL=http://localhost:3000/
ENV SMTP_HOST=smtp.yandex.com
ENV SMTP_USER=nova.turhan@yandex.com
ENV SMTP_PASS=dqxvgcesrmvpthop
ENV MAIL_TO=dalinnx1@gmail.com

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./
COPY next.config.ts ./
COPY tsconfig.json ./
COPY postcss.config.mjs ./
COPY tailwind.config.ts ./
COPY .eslintrc.json ./

USER root

RUN chown -R app:app .

USER app

RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev

# docker build -t ticketapp .
# docker run -p 3000:3000 -v "$(pwd):/app" -v /app/node_modules/ ticketapp 