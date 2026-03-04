# algorithmA => n(n+1)/2
# algorithmB => 1 + 2 + ... + n
# algorithmB => 1 + (1 + 1) + (1 + 1 + 1)




# algorithmA는 값이 들어오면 n에 n+1을 곱하고 2를 나누는 식

def algorithmA(n):
    result = n * (n + 1)
    result_half = int(result / 2)
    return result_half

# algorithmB는 값이 들어오면 들어온 값부터 1씩 감소하여 더하는 식

def algorithmB(n):
    # 더할 값 지정
    total = 0
    # 0부터 n-1까지 지정 
    for i in range(n):
        # 더할 값 지정(1로 지정, 1부터 n까지라)
        add_value = i + 1
        # 1부터 n까지 더함 
        total += add_value
    # 다 더하면
    # 바로 반환
    return total


# algorithmC는 n번 반복하여 기존 값에 1씩 더하는 식

def algorithmC(n):
    # 더할 값 지정
    total = 0
    # 초기 더할 값 지정
    add_value = 0
    # 0부터 n-1까지 지정
    for _ in range(n):
        # 먼저 add_value에 1씩 더함
        add_value += 1
        # 1더한만큼 total에 더함
        total += add_value
    
    # total 반환
    return total





# 값을 넣을 변수 지정
value = int(input("값을 넣어주세요"))

# 10000이상 100000 이하

print(algorithmA(value))

print(algorithmB(value))

print(algorithmC(value))
