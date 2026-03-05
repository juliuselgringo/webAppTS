# docker build -t webapp_ts .
# docker run -d -p 3001:3001 --name webapp_ts_container webapp_ts

FROM node:22-slim

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

CMD ["npm", "start"]