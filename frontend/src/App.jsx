// ./frontend/src/App.jsx
import { useState, useEffect } from 'react';

function App() {
  // 백엔드로부터 받은 메시지를 저장할 state
  const [message, setMessage] = useState('Loading...');
  // DB 연결 상태 메시지를 저장할 state
  const [dbStatus, setDbStatus] = useState('Checking DB status...');

  // 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
  useEffect(() => {
    // 백엔드 API 서버에 메시지를 요청합니다.
    // vite.config.js의 프록시 설정 덕분에 '/api' 경로로 바로 요청할 수 있습니다.
    fetch('/api')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage('Failed to fetch from backend.'));

    // 백엔드 API 서버에 DB 연결 상태를 요청합니다.
    fetch('/api/db-check')
      .then((res) => res.json())
      .then((data) => setDbStatus(`DB Status: ${data.message}`))
      .catch(() => setDbStatus('Failed to check DB status.'));
  }, []);

  return (
    <div>
      <h1>웹 애플리케이션 기본 뼈대</h1>
      <hr />
      <h2>1. 프론트엔드-백엔드 통신 확인</h2>
      <p>
        <strong>결과:</strong> {message}
      </p>
      <p>
        (이 메시지가 'Hello from Backend' 이면 성공입니다.)
      </p>
      <hr />
      <h2>2. 백엔드-데이터베이스 통신 확인</h2>
      <p>
        <strong>결과:</strong> {dbStatus}
      </p>
      <p>
        (이 메시지에 'successful'이 포함되어 있으면 성공입니다.)
      </p>
      <hr />

      {/* TODO: [사용자 구현] 이곳에 UI 컴포넌트들을 만들어보세요. */}
      {/* 예: 로그인 폼, 게시글 목록, 글쓰기 버튼 등 */}
      <p>
        여기에 당신의 애플리케이션을 만들어나가세요!
      </p>

    </div>
  );
}

export default App;
