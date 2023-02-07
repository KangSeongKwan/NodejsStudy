console.log('A');
console.log('B');
/* 무한반복 쓰면 CPU나 메모리가 열이 나면서 ㅈ된다
while(true){
    console.log('C1');
    console.log('C2');
}
의도한 것이 아니라면 버그라고 취급해야함.
*/

var i = 0;
while(i < 100)
{
    console.log('C1');
    console.log('C2');
    i = i + 1;
}
console.log('D');