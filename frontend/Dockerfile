# ./frontend/Dockerfile
# React 애플리케이션(Vite 기반)을 위한 Docker 이미지를 빌드하는 방법을 정의합니다.

# 1. 베이스 이미지 선택 (Node.js 18)
FROM node:18-alpine

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사
COPY package*.json ./

# 4. 의존성 설치
# --frozen-lockfile 은 package-lock.json과 일치하는 의존성만 설치하여 일관성을 보장합니다.
RUN npm install --frozen-lockfile

# 5. 애플리케이션 소스 코드 복사
COPY . .

# 6. Vite가 사용하는 포트 5173번을 노출합니다.
EXPOSE 5173

# 7. 개발 서버 실행 명령어
# --host 옵션은 컨테이너 외부에서의 접근을 허용하기 위해 필요합니다.
CMD ["npm", "run", "dev", "--", "--host"]
