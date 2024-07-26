#stage 1 node 
FROM node:22.4-alpine as node
WORKDIR /src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

#Stage 2 Deployment on reverse proxy server
FROM nginx:1.27.0-alpine as nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=node /src/app/dist/learnapp.client/browser /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
