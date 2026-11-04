# 1단계: 정적 파일 빌드
FROM node:24-alpine AS build
WORKDIR /app
ENV HUSKY=0
RUN npm install --global --force yarn@1.22.22
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
# Vite는 VITE_* 값을 빌드 시점에 코드에 넣는다.
# API 주소는 빈 값 → axios가 /api/... 상대경로로 호출 (nginx가 Gateway로 프록시). 이미지 하나로 dev/prod 공용.
# 구글 Client ID는 공개값이라 build-arg로 받는다.
ARG VITE_API_BASE_URL=""
ARG VITE_GOOGLE_CLIENT_ID=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL \
    VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
RUN yarn build

# 2단계: nginx로 서빙 (root가 아닌 사용자, 8080 포트)
FROM nginxinc/nginx-unprivileged:stable-alpine
# 같은 namespace의 api-gateway Service. 로컬 테스트 때는 docker run -e API_UPSTREAM=... 로 바꾼다.
ENV API_UPSTREAM=http://api-gateway:8080
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
