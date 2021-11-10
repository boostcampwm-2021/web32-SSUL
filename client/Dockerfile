FROM mhart/alpine-node:16 as builder
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install --silent
COPY . ./
# default는 개발용 env. Jenkins에선 배포용으로 override
ARG REACT_APP_GITHUB_CI=a7b05aaf851c4824fc7b
ARG REACT_APP_GITHUB_CALLBACK_PATH=http://localhost/auth/callback

ENV REACT_APP_GITHUB_CI $REACT_APP_GITHUB_CI
ENV REACT_APP_GITHUB_CALLBACK_PATH $REACT_APP_GITHUB_CALLBACK_PATH

RUN npm run build

FROM nginx
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]