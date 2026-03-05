# ./backend/main.py
import os
from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.orm import sessionmaker

# --- FastAPI 애플리케이션 생성 ---
app = FastAPI()

# --- 데이터베이스 설정 ---
# .env 파일에서 데이터베이스 URL을 읽어옵니다.
DATABASE_URL = os.getenv("DATABASE_URL")

# 데이터베이스 엔진을 생성합니다.
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- API 엔드포인트 정의 ---

@app.get("/api")
def read_root():
    """
    가장 기본적인 API 엔드포인트입니다.
    {"message": "Hello from Backend"} 메시지를 반환합니다.
    """
    return {"message": "Hello from Backend"}

@app.get("/api/db-check")
def db_check():
    """
    데이터베이스 연결 상태를 확인하는 엔드포인트입니다.
    """
    try:
        # 데이터베이스에 연결을 시도합니다.
        db = SessionLocal()
        db.connection()
        return {"status": "success", "message": "Database connection successful."}
    except OperationalError as e:
        # **헷갈리기 쉬운 부분**: 
        # 처음 실행 시, db 컨테이너가 완전히 준비되지 않아서 연결에 실패할 수 있습니다.
        # 몇 초 후 다시 시도해보세요.
        return {"status": "error", "message": f"Database connection failed: {e}"}
    finally:
        db.close()

# TODO: [사용자 구현] 사용자 인증(로그인)을 위한 API 엔드포인트를 만들어보세요.
# 예: @app.post("/api/users/login")

# TODO: [사용자 구현] 게시글 CRUD(생성, 읽기, 수정, 삭제)를 위한 API 엔드포인트를 만들어보세요.
# 예: @app.post("/api/posts"), @app.get("/api/posts/{post_id}")

# TODO: [사용자 구현] 이미지, 파일 업로드를 위한 API 엔드포인트를 만들어보세요.
# 업로드된 파일은 /app/storage 폴더에 저장됩니다.
# 예: @app.post("/api/files/upload")
