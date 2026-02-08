// main.js
// 똥피하기 게임의 메인 진입점
// 모든 DOM 요소를 가져오고, 각 모듈의 함수를 연결하여 게임을 구동합니다.

// === 모듈 불러오기 ===
// func 폴더 내의 각 기능 모듈을 ES6 import 문법으로 가져옵니다.
import { setupPlayerMovement } from "./func/movePlayer.js";
import { spawnDung } from "./func/spawnDung.js";
import { scoreUp } from "./func/scoreUp.js";
import { setupRestartButtonListeners } from "./func/reStart.js";
import { handleGameOver, resetGameOverState } from "./func/gameOver.js";

// === DOM 요소 참조 ===
// HTML에서 필요한 요소들을 ID로 가져옵니다.
const gameScreen = document.getElementById("gameScreen"); // 게임 화면 컨테이너
const player = document.getElementById("player"); // 플레이어 캐릭터
const scoreNum = document.getElementById("scoreNum"); // 점수 표시 숫자
const startButton = document.getElementById("startButton"); // 시작 버튼
const reStartButton = document.getElementById("reStartButton"); // 재시작 버튼
const gameOverText = document.getElementById("gameOverText"); // 게임 오버 텍스트

// === 게임 상태 변수 ===
let isGameActive = false; // 게임 진행 중 여부
let collisionCheckLoopId = null; // 충돌 감지 루프 ID (requestAnimationFrame)

// === 컨트롤러 초기화 ===
// 각 모듈의 팩토리 함수를 호출하여 컨트롤러 객체를 생성합니다.
// 컨트롤러는 start(), stop(), reset() 등의 메서드를 가집니다.

// 플레이어 이동 컨트롤러: 키보드 입력으로 플레이어 좌우 이동
const playerController = setupPlayerMovement(player, gameScreen);

// 똥 생성 컨트롤러: 일정 간격으로 똥을 생성하고 떨어뜨림
const dungSpawner = spawnDung(gameScreen);

// 점수 관리 컨트롤러: 1초마다 점수를 1씩 증가
const scoreManager = scoreUp(scoreNum);

// === 게임 오버 처리 함수 ===
/**
 * 게임 오버 상태를 처리합니다.
 * 모든 게임 프로세스를 중지하고 UI를 업데이트합니다.
 */
function performGameOver() {
  // 게임 비활성화
  isGameActive = false;

  // gameOver.js의 함수 호출하여 게임 오버 처리
  handleGameOver(
    gameScreen,
    player,
    gameOverText,
    reStartButton,
    scoreManager,
    dungSpawner,
    playerController,
  );

  // 충돌 감지 루프 중지
  if (collisionCheckLoopId) {
    cancelAnimationFrame(collisionCheckLoopId);
    collisionCheckLoopId = null;
  }
}

// === 충돌 감지 루프 ===
/**
 * 플레이어와 똥의 충돌을 확인합니다.
 * requestAnimationFrame을 사용하여 매 프레임마다 검사합니다.
 */
function checkCollisions() {
  // 게임이 비활성화 상태면 검사 중지
  if (!isGameActive) return;

  // 플레이어의 경계 박스 가져오기
  const playerRect = player.getBoundingClientRect();

  // 현재 화면에 있는 모든 똥 요소 가져오기
  const dungElements = gameScreen.querySelectorAll(".item");

  // 각 똥과 충돌 검사 (AABB: Axis-Aligned Bounding Box)
  for (const dung of dungElements) {
    const dungRect = dung.getBoundingClientRect();

    // 두 박스가 겹치는지 확인
    // 겹치는 조건: 서로의 모든 변이 교차하는 경우
    const isColliding =
      playerRect.left < dungRect.right &&
      playerRect.right > dungRect.left &&
      playerRect.top < dungRect.bottom &&
      playerRect.bottom > dungRect.top;

    if (isColliding) {
      // 충돌 발생! 게임 오버 처리
      performGameOver();
      return; // 더 이상 검사할 필요 없음
    }
  }

  // 충돌이 없으면 다음 프레임에 다시 검사
  collisionCheckLoopId = requestAnimationFrame(checkCollisions);
}

// === 게임 시작 함수 ===
/**
 * 게임을 시작합니다.
 * 시작 버튼 클릭 시 호출됩니다.
 */
function startGame() {
  // 이미 게임이 진행 중이면 무시
  if (isGameActive) return;

  // 게임 상태 활성화
  isGameActive = true;

  // 게임 오버 상태 리셋 (gameOver.js)
  resetGameOverState();

  // === UI 업데이트 ===
  startButton.style.display = "none"; // 시작 버튼 숨김
  gameOverText.style.display = "none"; // 게임 오버 텍스트 숨김
  reStartButton.style.display = "none"; // 재시작 버튼 숨김

  // === 게임 컴포넌트 시작 ===
  playerController.start(); // 플레이어 이동 활성화
  scoreManager.start(); // 점수 증가 시작
  dungSpawner.start(); // 똥 생성 시작

  // 충돌 감지 루프 시작
  checkCollisions();
}

// === 초기 UI 설정 ===
/**
 * 페이지 로드 시 초기 상태를 설정합니다.
 */
function initializeGameUI() {
  // 모든 컨트롤러 중지 및 초기화
  playerController.stop();
  playerController.reset();
  scoreManager.reset();
  dungSpawner.clearAll();

  // 게임 오버 상태 리셋
  resetGameOverState();

  // UI 초기 상태 설정
  startButton.style.display = "block"; // 시작 버튼 표시
  reStartButton.style.display = "none"; // 재시작 버튼 숨김
  gameOverText.style.display = "none"; // 게임 오버 텍스트 숨김
}

// === 이벤트 리스너 설정 ===

// 초기 UI 설정 실행
initializeGameUI();

// 재시작 버튼 리스너 설정 (reStart.js)
setupRestartButtonListeners(
  startButton,
  reStartButton,
  scoreManager,
  dungSpawner,
  playerController,
  startGame,
  performGameOver,
);

// 시작 버튼 클릭 이벤트
startButton.addEventListener("click", startGame);
