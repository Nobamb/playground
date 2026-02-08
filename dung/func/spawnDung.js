// func/spawnDung.js
// 똥(장애물) 생성을 담당하는 모듈
// 일정 간격으로 똥을 생성하고 화면 위에서 아래로 떨어뜨립니다.

/**
 * 똥 생성 컨트롤러를 초기화합니다.
 * main.js에서 호출되어 똥 생성 기능을 설정합니다.
 *
 * @param {HTMLElement} gameScreenElement - 게임 화면 DOM 요소
 * @returns {Object} 똥 생성 컨트롤러 객체 (start, stop, clearAll 메서드 포함)
 */
export function spawnDung(gameScreenElement) {
  // === 상수 정의 ===
  const SPAWN_INTERVAL = 500; // 똥 생성 간격 (밀리초, 0.5초)
  const FALL_DURATION = 3000; // 똥이 떨어지는 시간 (밀리초, 3초)
  const DUNG_WIDTH = 50; // 똥의 너비 (CSS와 일치해야 함)

  // === 모듈 상태 변수 ===
  let spawnIntervalId = null; // 생성 인터벌 ID
  let dungTimeouts = []; // 똥 제거 타임아웃 ID 배열
  let isSpawning = false; // 생성 활성화 상태

  // 게임 화면 크기 가져오기
  const gameScreenWidth = gameScreenElement.clientWidth || 1000;
  const gameScreenHeight = gameScreenElement.clientHeight || 600;

  /**
   * 똥 하나를 생성하고 화면에 추가합니다.
   * 똥은 화면 상단에서 시작하여 아래로 떨어집니다.
   */
  function createDung() {
    // 생성이 비활성화 상태면 무시
    if (!isSpawning) return;

    // 새 똥 요소 생성
    const dung = document.createElement("div");
    dung.classList.add("item"); // CSS 스타일 적용을 위한 클래스

    // 랜덤 X 위치 계산 (화면 범위 내)
    const randomX = Math.random() * (gameScreenWidth - DUNG_WIDTH);

    // 초기 스타일 설정
    dung.style.position = "absolute";
    dung.style.left = `${randomX}px`;
    dung.style.top = "-50px"; // 화면 바깥에서 시작

    // 게임 화면에 추가
    gameScreenElement.appendChild(dung);

    // 강제 리플로우: transition이 즉시 적용되도록
    // (브라우저가 초기 상태를 인식한 후 변경을 적용하기 위함)
    void dung.offsetHeight;

    // 떨어지는 애니메이션 시작 (CSS transition 사용)
    dung.style.top = `${gameScreenHeight + 50}px`;

    // 화면 아래로 사라진 후 DOM에서 제거
    const timeoutId = setTimeout(() => {
      // 요소가 아직 DOM에 있으면 제거
      if (dung.parentNode) {
        dung.remove();
      }
      // 타임아웃 ID 배열에서 제거
      dungTimeouts = dungTimeouts.filter((id) => id !== timeoutId);
    }, FALL_DURATION + 100); // 약간의 여유 시간 추가

    // 타임아웃 ID 저장 (나중에 정리하기 위해)
    dungTimeouts.push(timeoutId);
  }

  /**
   * 똥 생성을 시작합니다.
   * 게임 시작 시 호출됩니다.
   */
  function start() {
    // 이미 생성 중이면 무시
    if (spawnIntervalId !== null) return;

    isSpawning = true;

    // 일정 간격으로 똥 생성
    spawnIntervalId = setInterval(createDung, SPAWN_INTERVAL);
  }

  /**
   * 똥 생성을 중지합니다.
   * 게임 오버 시 호출됩니다.
   * 주의: 이미 생성된 똥은 제거하지 않습니다.
   */
  function stop() {
    isSpawning = false;

    // 생성 인터벌 중지
    if (spawnIntervalId !== null) {
      clearInterval(spawnIntervalId);
      spawnIntervalId = null;
    }

    // 대기 중인 모든 타임아웃 취소
    dungTimeouts.forEach((id) => clearTimeout(id));
    dungTimeouts = [];
  }

  /**
   * 모든 똥을 제거하고 생성을 중지합니다.
   * 게임 재시작 시 호출됩니다.
   */
  function clearAll() {
    // 생성 중지
    stop();

    // 화면에 있는 모든 똥 요소 제거
    const dungElements = gameScreenElement.querySelectorAll(".item");
    dungElements.forEach((dung) => dung.remove());
  }

  // 컨트롤러 객체 반환
  return {
    start,
    stop,
    clearAll,
  };
}
