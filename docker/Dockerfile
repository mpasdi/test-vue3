FROM nginx:1.25.3

MAINTAINER lsm

COPY ./dist /usr/share/nginx/html/dist
COPY ./nginx.conf /etc/nginx/nginx.conf

CMD nginx -g "daemon off;"

EXPOSE 9991

RUN echo '架 设 成 功'

