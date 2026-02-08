// func/movePlayer.js
// 플레이어(캐릭터) 이동을 담당하는 모듈
// 좌우 방향키 입력을 받아 플레이어를 이동시킵니다.

// === 상수 정의 ===
const MOVEMENT_SPEED = 20; // 키 입력당 이동 거리 (픽셀)

// === 모듈 상태 변수 ===
let playerElement = null; // 플레이어 DOM 요소 참조
let gameScreenElement = null; // 게임 화면 DOM 요소 참조
let playerXPosition = 0; // 플레이어의 현재 X 좌표
let keydownHandler = null; // 키보드 이벤트 핸들러 참조 (제거용)
let isMovementEnabled = false; // 이동 활성화 상태 플래그

// === 게임 영역 크기 (동적으로 계산) ===
let gameScreenWidth = 1000; // 기본값, 실제로는 DOM에서 가져옴
let playerWidth = 100; // 기본값, 실제로는 DOM에서 가져옴

/**
 * 키보드 입력 이벤트 핸들러
 * 좌우 방향키 입력을 처리하여 플레이어를 이동시킵니다.
 *
 * @param {KeyboardEvent} event - 키보드 이벤트 객체
 */
function handleKeyDown(event) {
  // 이동이 비활성화 상태이면 무시
  if (!isMovementEnabled) return;

  // 플레이어 요소가 없으면 무시
  if (!playerElement) return;

  // 방향키가 아니면 무시
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

  // 기본 브라우저 동작 방지 (페이지 스크롤 등)
  event.preventDefault();

  // 방향에 따라 위치 업데이트
  if (event.key === "ArrowLeft") {
    playerXPosition -= MOVEMENT_SPEED;
  } else if (event.key === "ArrowRight") {
    playerXPosition += MOVEMENT_SPEED;
  }

  // 경계 체크: 게임 화면 밖으로 나가지 않도록 제한
  // 최소값: 0 (왼쪽 경계)
  // 최대값: 게임화면 너비 - 플레이어 너비 (오른쪽 경계)
  playerXPosition = Math.max(0, playerXPosition);
  playerXPosition = Math.min(gameScreenWidth - playerWidth, playerXPosition);

  // DOM에 위치 반영
  playerElement.style.left = `${playerXPosition}px`;
}

/**
 * 플레이어 이동 컨트롤러를 초기화합니다.
 * main.js에서 호출되어 플레이어 이동 기능을 설정합니다.
 *
 * @param {HTMLElement} player - 플레이어 DOM 요소
 * @param {HTMLElement} gameScreen - 게임 화면 DOM 요소
 * @returns {Object} 플레이어 컨트롤러 객체 (start, stop, reset 메서드 포함)
 */
export function setupPlayerMovement(player, gameScreen) {
  // 요소 참조 저장
  playerElement = player;
  gameScreenElement = gameScreen;

  // 게임 화면과 플레이어 크기 동적으로 가져오기
  if (gameScreen) {
    gameScreenWidth = gameScreen.clientWidth || 1000;
  }
  if (player) {
    playerWidth = player.offsetWidth || 100;
  }

  // 이벤트 핸들러 참조 저장
  keydownHandler = handleKeyDown;

  // 키보드 이벤트 리스너 등록
  window.addEventListener("keydown", keydownHandler);

  /**
   * 플레이어 이동을 활성화합니다.
   */
  function start() {
    isMovementEnabled = true;
  }

  /**
   * 플레이어 이동을 비활성화합니다.
   * 게임 오버 시 호출됩니다.
   */
  function stop() {
    isMovementEnabled = false;
  }

  /**
   * 플레이어 위치를 화면 중앙으로 초기화합니다.
   * 게임 재시작 시 호출됩니다.
   */
  function reset() {
    // 플레이어를 중앙으로 이동
    playerXPosition = (gameScreenWidth - playerWidth) / 2;

    if (playerElement) {
      playerElement.style.left = `${playerXPosition}px`;
      playerElement.style.transform = "none"; // CSS의 translateX 제거
    }
  }

  // 컨트롤러 객체 반환
  return {
    start,
    stop,
    reset,
  };
}
