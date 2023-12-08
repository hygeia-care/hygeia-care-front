FROM node:14 as dev

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx:alpine
# Copy the nginx.conf to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=dev /src/build /usr/share/nginx/html
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]