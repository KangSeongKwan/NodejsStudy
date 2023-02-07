var number = [1,400,12,34];
var i = 0;
var total = 0;
// 배열은 반복이랑 쓰기 너무좋음. length로 길이를 뽑을 수 있기 때문
while(i < number.length)
{
    console.log(number[i]);
    total = total + number[i];
    i = i + 1;
}

console.log(`total : ${total}`);