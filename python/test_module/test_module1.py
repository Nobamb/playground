# 테스트 모듈1
# 함수 형태
# 일단 문자열의 형태로 전달하는 함수
# 입력 : 홍길동
# 처리 : 입력을 받아서 "안녕" 뒤에 추가
# 결과 : "안녕 홍길동"


def test_module1(name):
    # 안녕 뒤에 name을 붙임
    result = f"안녕 {name}"
    # 출력
    return result