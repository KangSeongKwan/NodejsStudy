// 조건문 기본 형식은 다음과 같다.

/*
console.log('A');
console.log('B');
if(false)
{
    console.log('C1');
}
else 
{
    console.log('C2');
}
console.log('D');
*/
// if문의 조건이 참이면 실행하고, 아니면 else로 넘어간다.
// 다른 언어와 동일함.

var args = process.argv;
console.log(args[2]);
console.log('A');
console.log('B');
if(args[2] === '1')
{
    console.log('C1');
}
else 
{
    console.log('C2');
}
console.log('D');