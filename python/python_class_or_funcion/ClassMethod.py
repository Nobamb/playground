# 메소드가 포함된 클래스
class ClassMethod:
    # 생성자
    # 이름, 나이, 성별을 받음
    def __init__(self,name, age, gender):
        self.name = name
        self.age = age
        self.gender = gender
        
    # 메소드 생성
    # 메소드1. 나이 1살 추가하여 출력
    def age_plus(self):
        self.age += 1
        return self.age
    # 메소드2. 이름, 성별을 부르도록 출력("나야 홍길동 남자")
    def call_name_gender(self):
        return f"나야 {self.name} {self.gender}"