# algorithmA => n(n+1)/2
# algorithmB => 1 + 2 + ... + n
# algorithmB => 1 + (1 + 1) + (1 + 1 + 1)




# algorithmA는 값이 들어오면 n에 n+1을 곱하고 2를 나누는 식

def algorithmA(n):
    result = n * (n + 1)
    result_half = result / 2
    return result_half





# 값을 넣을 변수 지정
value = int(input("값을 넣어주세요"))

# 10000이상 100000 이하

print(algorithmA(value))