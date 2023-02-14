/* 자바스크립트는 if, while, for문은 값이 아님
var i = if(true){console.log(1)};
*/

// 함수는 처리 방법에 대한 구문을 담고 있으면서 그 자체로 값이 될 수 있음
// 서로 연관된 데이터를 그룹핑하는 객체가 될 수 있음
var f = function(){
    console.log(1+1);
    console.log(1+2);
}
console.log(f);
f();

// 함수를 배열에 담는 방식
var a = [f];
a[0]();

// 함수를 객체로 사용하는 방식(많이 차용하는 방식)
var o = {
    func:f
}
o.func();