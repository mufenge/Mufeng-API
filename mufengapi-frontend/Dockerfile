FROM node:16
WORKDIR /app
COPY /dist /app
RUN npm install
RUN npm run build
ENTRYPOINT ["npm", "start"]
