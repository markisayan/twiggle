FROM node:16 as build-deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:1.12-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-deps /usr/src/app/build .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]