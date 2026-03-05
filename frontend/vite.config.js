// ./frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Docker 컨테이너 환경에서 외부 요청을 받기 위해 host를 '0.0.0.0'으로 설정
    host: '0.0.0.0', 
    port: 5173,
    proxy: {
      // '/api'로 시작하는 요청에 대한 프록시 설정
      '/api': {
        // 실제 요청을 보낼 백엔드 서버 주소
        target: 'http://backend:8000',
        // 출처(origin)를 백엔드 서버의 주소로 변경
        changeOrigin: true,
      },
    },
  },
})
