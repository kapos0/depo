FROM node
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
#docker build -t tagismi . 
#docker run -p 5173:5173 -v "$(pwd):/app" -v /app/node_modules tagismi
#vite için dev yanına boşluk ile --host koymayı unutma bunu image build den önce yapmalısın