// func/gameOver.js
// 게임 오버 처리를 담당하는 모듈
// 충돌 감지 시 게임을 멈추고 UI를 업데이트합니다.

// === 모듈 상태 변수 ===
let isGameOver = false; // 게임 오버 상태 플래그 (중복 호출 방지)

/**
 * 게임 오버 상태를 처리합니다.
 * 모든 게임 프로세스를 중지하고 게임 오버 UI를 표시합니다.
 *
 * @param {HTMLElement} gameScreen - 게임 화면 요소 (똥 요소들을 멈추기 위해 사용)
 * @param {HTMLElement} player - 플레이어 요소 (현재 미사용, 확장성을 위해 유지)
 * @param {HTMLElement} gameOverText - 게임 오버 텍스트 요소
 * @param {HTMLElement} reStartButton - 재시작 버튼 요소
 * @param {Object} scoreManager - 점수 관리 컨트롤러 (stop 메서드 필요)
 * @param {Object} dungSpawner - 똥 생성 컨트롤러 (stop 메서드 필요)
 * @param {Object} playerController - 플레이어 컨트롤러 (stop 메서드 필요)
 */
export function handleGameOver(
  gameScreen,
  player,
  gameOverText,
  reStartButton,
  scoreManager,
  dungSpawner,
  playerController,
) {
  // 이미 게임 오버 상태면 중복 처리 방지
  if (isGameOver) return;
  isGameOver = true;

  // === 1. 모든 게임 프로세스 중지 ===

  // 점수 증가 중지
  if (scoreManager && typeof scoreManager.stop === "function") {
    scoreManager.stop();
  }

  // 똥 생성 중지 (새로운 똥이 더 이상 생성되지 않음)
  // 주의: stop()은 기존 똥을 제거하지 않고 생성만 멈춤
  if (dungSpawner && typeof dungSpawner.stop === "function") {
    dungSpawner.stop();
  }

  // 플레이어 이동 비활성화
  if (playerController && typeof playerController.stop === "function") {
    playerController.stop();
  }

  // === 2. 현재 화면의 똥들 멈추기 (CSS transition 일시정지) ===
  if (gameScreen) {
    const dungElements = gameScreen.querySelectorAll(".item");
    dungElements.forEach((dung) => {
      // 현재 위치에서 멈추도록 computed style에서 현재 top 값을 가져와 고정
      const computedStyle = window.getComputedStyle(dung);
      const currentTop = computedStyle.top;

      // transition 제거하고 현재 위치에 고정
      dung.style.transition = "none";
      dung.style.top = currentTop;
    });
  }

  // === 3. 게임 오버 UI 표시 ===

  // "Game Over" 텍스트 표시
  if (gameOverText) {
    gameOverText.style.display = "block";
  }

  // 재시작 버튼 표시
  if (reStartButton) {
    reStartButton.style.display = "block";
  }
}

/**
 * 게임 오버 상태를 리셋합니다.
 * 새 게임 시작 전에 호출되어야 합니다.
 */
export function resetGameOverState() {
  isGameOver = false;
}
