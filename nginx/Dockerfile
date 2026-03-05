# ./nginx/Dockerfile
# Nginx 리버스 프록시를 위한 Docker 이미지를 빌드하는 방법을 정의합니다.

# 1. 베이스 이미지 선택 (Nginx)
FROM nginx:stable-alpine

# 2. 로컬의 nginx.conf 파일을 컨테이너의 설정 파일 경로로 복사합니다.
# 이 한 줄의 명령으로 Nginx의 기본 설정을 우리가 만든 설정으로 덮어쓰게 됩니다.
COPY nginx.conf /etc/nginx/nginx.conf
