# 클로저의 형태로 전달

# 함수명 function_python
def function_python(name, age, gender):
    
    # 클로저
    # 값 출력
    def name_return(value):
        return value
    
    # 배열 형태로 저장
    # 이름
    name_result = (name_return(name))
    # 나이
    age_result = (name_return(age))
    # 성별
    gender_result = (name_return(gender))
    
    # 총 값들을 저장
    result = [name_result, age_result, gender_result]
    
    # 값 전달
    return result