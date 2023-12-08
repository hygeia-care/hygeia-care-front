FROM node:14 as dev

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=dev /src/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf  
EXPOSE 80