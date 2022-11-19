FROM node:16.17.0

WORKDIR /mybankApi

COPY . .

RUN npm install

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.8.0/wait /wait
RUN chmod +x /wait

EXPOSE 3000

CMD /wait && npm run dev