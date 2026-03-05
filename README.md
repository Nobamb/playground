# 웹 애플리케이션 프로젝트 템플릿

이 프로젝트는 현대적인 웹 애플리케이션 개발을 위한 기본 뼈대(Boilerplate)입니다. React(프론트엔드), FastAPI(백엔드), PostgreSQL(데이터베이스), Nginx(리버스 프록시)가 Docker Compose를 통해 유기적으로 구성되어 있습니다.

## 1. 아키텍처

이 프로젝트는 다음과 같은 서비스 컨테이너들로 구성됩니다.

```mermaid
graph TD
    subgraph "사용자 환경"
        User[<font size=5>👨‍💻</font><br>사용자<br>(웹 브라우저)]
    end

    subgraph "인터넷"
        direction LR
        🌐
    end

    subgraph "우리 서버 (Docker 환경)"
        direction LR
        subgraph "Nginx (Proxy)"
            NGINX[<font size=5>🚦</font><br>Nginx]
        end

        subgraph "Frontend"
            REACT[<font size=5>⚛️</font><br>React.js<br>(Client)]
        end

        subgraph "Backend"
            FASTAPI[<font size=5>🐍</font><br>FastAPI<br>(App)]
        end
        
        subgraph "Database"
            POSTGRES[<font size=5>🐘</font><br>PostgreSQL<br>(DB)]
        end

        subgraph "Storage"
            STORAGE[<font size=5>🖼️</font><br>File Storage<br>(Volume)]
        end
    end

    User -- "http://localhost" --> NGINX
    NGINX -- "/ 요청" --> REACT
    User -- "http://localhost/api/*" --> NGINX
    NGINX -- "/api/ 요청" --> FASTAPI

    FASTAPI <--> POSTGRES
    FASTAPI <--> STORAGE
```

- **Nginx**: 모든 요청을 받는 입구 역할. 요청 경로에 따라 프론트엔드 또는 백엔드 서비스로 요청을 전달합니다.
- **React (Frontend)**: 사용자에게 보여지는 UI. Vite 기반으로 빠른 개발 환경을 제공합니다.
- **FastAPI (Backend)**: 핵심 비즈니스 로직 및 API를 제공합니다.
- **PostgreSQL (DB)**: 데이터를 영구적으로 저장합니다.

## 2. 시작하기

### 사전 요구사항
- [Docker](https://www.docker.com/get-started) 및 Docker Compose가 설치되어 있어야 합니다.

### 실행 방법

1.  프로젝트의 최상위 폴더에서 터미널을 엽니다.
2.  아래 명령어를 실행하여 모든 서비스를 빌드하고 실행합니다.

    ```bash
    docker-compose up --build
    ```
    
    > **참고**: 처음 실행 시 의존성 패키지들을 다운로드하므로 시간이 다소 걸릴 수 있습니다.

3.  웹 브라우저에서 `http://localhost` 로 접속합니다.

4.  애플리케이션을 중지하려면 터미널에서 `Ctrl + C` 를 누르고, 아래 명령어로 컨테이너와 네트워크를 완전히 삭제할 수 있습니다.
    ```bash
    docker-compose down
    ```

## 3. 폴더 구조

```
.
├── backend/          # FastAPI 백엔드 서버
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env          # DB 접속 정보 등 (Git 관리 대상 아님)
│   └── main.py       # # TODO: 핵심 로직 구현 시작점
├── frontend/         # React 프론트엔드 서버
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       └── App.jsx   # # TODO: UI 구현 시작점
├── nginx/            # Nginx 리버스 프록시
│   ├── Dockerfile
│   └── nginx.conf
├── storage/          # 업로드된 파일 저장소 (Git 관리 대상 아님)
├── .gitignore
├── docker-compose.yml # 전체 서비스 오케스트레이션
└── README.md
```

## 4. Git 브랜치 전략 제안

협업 및 기능 관리를 위해 간단한 Git 브랜치 전략을 사용하는 것을 권장합니다.

- **`main`**: 항상 안정적이고 배포 가능한 상태를 유지하는 메인 브랜치.
- **`develop`**: 다음 배포 버전을 개발하는 브랜치. 평소에는 이 브랜치를 기준으로 작업합니다.
- **`feature/<기능이름>`**: 새로운 기능 개발을 위한 브랜치. (예: `feature/user-login`)
  - `develop` 브랜치에서 생성하며, 개발 완료 후 `develop`으로 병합(Merge)합니다.
- **`fix/<수정내용>`**: 버그 수정을 위한 브랜치. (예: `fix/login-error`)
  - `develop` 브랜치에서 생성하며, 수정 완료 후 `develop`으로 병합합니다.

### 작업 흐름 예시
1. `git checkout develop`
2. `git pull origin develop` (최신 코드로 업데이트)
3. `git checkout -b feature/awesome-feature` (새 기능 브랜치 생성)
4. 기능 개발 및 커밋
5. 개발 완료 후 `git push origin feature/awesome-feature`
6. (GitHub/GitLab 등에서) `develop` 브랜치로 Pull Request(Merge Request) 생성

## 5. 다음 단계 (Next Steps)

이제 모든 기본 뼈대가 준비되었습니다. 아래 `TODO` 주석이 달린 파일을 중심으로 실제 애플리케이션 개발을 시작할 수 있습니다.

- **백엔드 API 개발**: `backend/main.py` 파일에 필요한 API 엔드포인트(사용자 인증, CRUD 등)를 추가하세요.
- **프론트엔드 UI 개발**: `frontend/src/App.jsx` 파일을 시작으로 다양한 UI 컴포넌트들을 만들어나가세요.

성공적인 개발이 되기를 바랍니다!
