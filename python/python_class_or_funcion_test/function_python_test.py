# 데이터 가져오기
from data import hong
# # os, sys 가져오기
import os
import sys

# 현재파일 절대경로 지정
path_abs = os.path.abspath(__file__)
# 현재 절대경로에서 부모경로까지 지정
path_parent = os.path.dirname(path_abs)
# 부모경로의 부모경로까지 지정
path_grandparent = os.path.dirname(path_parent)

# path_grandparent 경로 시스템에 추가(path_grandparent 경로도 찾게 하기 위함)
sys.path.append(path_grandparent)


# funciton_python 불러옴
from python_class_or_funcion.function_python import function_python


# 데이터 가져옴
# hong 데이터 가져오기
name = hong["name"]
age = hong["age"]
gender = hong["gender"]


# 함수 적용
person = function_python(name, age, gender)


# 결과
print(person[0])