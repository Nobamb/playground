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

# 부모 경로
# # classmethod 가져오기
from python_class_or_funcion.ClassMethod import ClassMethod


# hong 데이터 가져오기
name = hong["name"]
age = hong["age"]
gender = hong["gender"]


# 클래스에 hong 데이터 가져오기
person = ClassMethod(name, age,gender)

# age_plus 메소드 실행(실행값 저장)
new_age = person.age_plus()

# call_name_gender 메소드 실행(실행값 저장)
i_am_hong = person.call_name_gender()

# 출력
print(new_age)
print(i_am_hong)