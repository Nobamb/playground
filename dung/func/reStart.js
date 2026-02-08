// func/reStart.js
// 게임 재시작 기능을 담당하는 모듈
// 시작 버튼과 재시작 버튼의 이벤트 리스너를 설정하고
// 게임 상태를 초기화하는 기능을 제공합니다.

/**
 * 재시작 버튼과 시작 버튼에 이벤트 리스너를 설정합니다.
 * main.js에서 호출되어 게임의 시작/재시작 로직을 연결합니다.
 *
 * @param {HTMLElement} startButton - 시작 버튼 요소
 * @param {HTMLElement} reStartButton - 재시작 버튼 요소
 * @param {Object} scoreManager - 점수 관리 객체 (start, stop, reset 메서드 포함)
 * @param {Object} dungSpawner - 똥 생성 관리 객체 (start, stop, clearAll 메서드 포함)
 * @param {Object} playerController - 플레이어 컨트롤러 객체 (start, stop, reset 메서드 포함)
 * @param {Function} startGameCallback - 게임 시작 시 호출할 콜백 함수
 * @param {Function} gameOverCallback - 게임 오버 시 호출할 콜백 함수 (현재 미사용, 확장성을 위해 유지)
 */
export function setupRestartButtonListeners(
  startButton,
  reStartButton,
  scoreManager,
  dungSpawner,
  playerController,
  startGameCallback,
  gameOverCallback,
) {
  // 유효성 검사: 필수 요소와 함수가 전달되었는지 확인
  if (!startButton || !reStartButton) {
    console.error(
      "setupRestartButtonListeners: 버튼 요소가 제공되지 않았습니다.",
    );
    return;
  }

  if (!scoreManager || !dungSpawner || !playerController) {
    console.error(
      "setupRestartButtonListeners: 게임 컨트롤러가 제공되지 않았습니다.",
    );
    return;
  }

  if (typeof startGameCallback !== "function") {
    console.error(
      "setupRestartButtonListeners: startGameCallback이 함수가 아닙니다.",
    );
    return;
  }

  /**
   * 게임 상태를 완전히 초기화합니다.
   * 재시작 버튼 클릭 시 호출됩니다.
   */
  function resetGameState() {
    // 1. 모든 게임 프로세스 중지
    scoreManager.stop();
    dungSpawner.stop();
    playerController.stop();

    // 2. 게임 상태 초기화
    scoreManager.reset(); // 점수를 0으로 리셋
    dungSpawner.clearAll(); // 화면의 모든 똥 제거
    playerController.reset(); // 플레이어 위치 초기화
  }

  /**
   * 재시작 버튼 클릭 이벤트 핸들러
   * 게임을 초기화하고 다시 시작합니다.
   */
  function handleRestart() {
    // 게임 상태 초기화
    resetGameState();

    // 재시작 버튼 숨기기 (게임 시작 시 다시 숨김 처리됨)
    reStartButton.style.display = "none";

    // 게임 시작 콜백 호출
    startGameCallback();
  }

  // 재시작 버튼에 클릭 이벤트 리스너 등록
  // (시작 버튼은 main.js에서 직접 처리)
  reStartButton.addEventListener("click", handleRestart);
}
