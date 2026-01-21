# test_module3(변수)와 test_module1(함수)가져오기

from test_module.test_module1 import test_module1
from test_module.test_module3 import test_module3

# test_module1에 test_module3대입
result = test_module1(test_module3)

# result 출력
print(result)