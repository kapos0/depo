FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
#docker build -t express_learning .
#docker run -p 8000:8000 -v "$(pwd):/usr/src/app" -v /usr/src/app/node_modules express_learning 
