// func/scoreUp.js
// 점수 관리를 담당하는 모듈
// 1초마다 점수를 1씩 증가시키고 화면에 표시합니다.

/**
 * 점수를 보기 좋은 형식으로 변환합니다.
 * 1000 이상의 점수는 'k' 단위로 표시합니다.
 * 예: 1000 → "1k", 1500 → "1.5k", 999 → "999"
 *
 * @param {number} score - 숫자 점수
 * @returns {string} 형식화된 점수 문자열
 */
function formatScore(score) {
  if (score >= 1000) {
    // 1000으로 나누고 소수점 첫째 자리까지 표시
    const formatted = (score / 1000).toFixed(1);

    // ".0"으로 끝나면 제거 (예: "2.0k" → "2k")
    if (formatted.endsWith(".0")) {
      return formatted.slice(0, -2) + "k";
    }
    return formatted + "k";
  }
  // 1000 미만은 그대로 표시
  return score.toString();
}

/**
 * 점수 관리 컨트롤러를 초기화합니다.
 * main.js에서 호출되어 점수 관리 기능을 설정합니다.
 *
 * @param {HTMLElement} scoreNumElement - 점수를 표시할 DOM 요소 (예: <span id="scoreNum">)
 * @returns {Object} 점수 컨트롤러 객체 (start, stop, reset 메서드 포함)
 */
export function scoreUp(scoreNumElement) {
  // === 상수 정의 ===
  const SCORE_INCREMENT = 1; // 증가량 (초당 1점)
  const SCORE_INTERVAL = 1000; // 점수 증가 간격 (밀리초, 1초)

  // === 모듈 상태 변수 ===
  let scoreIntervalId = null; // 점수 증가 인터벌 ID
  let currentScore = 0; // 현재 점수
  let isScoring = false; // 점수 증가 활성화 상태

  /**
   * 점수를 1 증가시키고 화면에 반영합니다.
   * setInterval 콜백으로 호출됩니다.
   */
  function incrementScore() {
    // 점수 증가가 비활성화 상태면 무시
    if (!isScoring) return;

    // 점수 증가
    currentScore += SCORE_INCREMENT;

    // 화면에 반영 (형식화된 점수 표시)
    if (scoreNumElement) {
      scoreNumElement.textContent = formatScore(currentScore);
    }
  }

  /**
   * 점수 증가를 시작합니다.
   * 게임 시작 시 호출됩니다.
   */
  function start() {
    // 이미 실행 중이면 무시
    if (scoreIntervalId !== null) return;

    isScoring = true;

    // 1초마다 점수 증가
    scoreIntervalId = setInterval(incrementScore, SCORE_INTERVAL);
  }

  /**
   * 점수 증가를 중지합니다.
   * 게임 오버 시 호출됩니다.
   */
  function stop() {
    isScoring = false;

    // 인터벌 중지
    if (scoreIntervalId !== null) {
      clearInterval(scoreIntervalId);
      scoreIntervalId = null;
    }
  }

  /**
   * 점수를 0으로 초기화합니다.
   * 게임 재시작 시 호출됩니다.
   */
  function reset() {
    // 먼저 중지
    stop();

    // 점수 초기화
    currentScore = 0;

    // 화면에 반영
    if (scoreNumElement) {
      scoreNumElement.textContent = formatScore(currentScore);
    }
  }

  // 컨트롤러 객체 반환
  return {
    start,
    stop,
    reset,
  };
}
