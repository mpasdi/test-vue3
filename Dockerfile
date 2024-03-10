FROM node as build
MAINTAINER lsm;
WORKDIR /app
COPY . ./


RUN npm config set registry https://registry.npmmirror.com && \
    npm install && \
    npm run build

RUN echo " 编 译 成 功 "

FROM nginx as publish

COPY --from=build /app/dist /usr/share/nginx/html/dist
COPY --from=build /app/nginx.conf  /etc/nginx/nginx.conf

CMD nginx -g "daemon off;"

EXPOSE 9991

RUN echo " 发 布 成 功 "
