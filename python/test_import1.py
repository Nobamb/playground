# from import 기반으로 데이터를 가져온다.
# test_module1 함수
from test_module.test_module1 import test_module1
# test_module2 사전
from test_module.test_module2 import test_module2


# test_module2로 가져온 name을 test_module1에 대입
result = test_module1(test_module2["name"])

# 결과 반환
print(result)