# ./backend/Dockerfile
# FastAPI 애플리케이션을 위한 Docker 이미지를 빌드하는 방법을 정의합니다.

# 1. 베이스 이미지 선택 (Python 3.9)
FROM python:3.9-slim

# 2. 작업 디렉토리 설정
WORKDIR /app

# 3. 의존성 파일 복사
COPY requirements.txt .

# 4. 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# 5. 애플리케이션 소스 코드 복사
COPY . .

# 6. 애플리케이션 실행 명령어
# uvicorn을 사용하여 main.py 파일의 app 객체를 실행합니다.
# --host 0.0.0.0 옵션은 컨테이너 외부에서 접근을 허용하기 위해 필요합니다.
# --reload 옵션은 개발 중 코드 변경 시 서버를 자동으로 재시작해주는 기능입니다.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
