# import 기반으로 가져오기

import test_module.test_module1
import test_module.test_module2



# test_module1 파일에 있는 test_module1 함수 가져오기

import_function = test_module.test_module1.test_module1

# test_module2 파일에 있는 test_module2 사전 가져오기

import_dictionary = test_module.test_module2.test_module2

# 가져온 함수, 사전을 토대로 실행
result = import_function(import_dictionary["name"])

# 실행
print(result)