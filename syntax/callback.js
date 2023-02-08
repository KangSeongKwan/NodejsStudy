/*
function a()
{
    console.log('A');
}
*/
// 이름이 없는 함수를 익명 함수라고 부름
// 자바스크립트에서 가능한 문법으로, 익명함수의 결과값을 변수로 사용할 수 있음
var a = function (){
    console.log('A');
}

// callback 파라미터는 함수의 실행이 끝나면 그 다음 작업을 수행하게 하는 파라미터임
function slowFunc(callback)
{
    callback();
}

slowFunc(a);