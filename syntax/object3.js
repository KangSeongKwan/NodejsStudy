/*
var v1 = 'v1';
var v2 = 'v2';
...
변수가 이대로 많이 생긴다면 공통점이 없으므로 메모리만 잡아먹힘
또한
var v1 = 'v1';
v1 = 'kangsk'; 같은 식으로 작성하면 버그가 발생하는 상황이 생김
*/

// 디스크는 하나에 모든 파일을 꽂아넣는 느낌이라면
// 객체는 주제별로 폴더를 만들어 정리한듯한 느낌을 줌
var p = {
    v1 : 'v1',
    v2 : 'v2',
    f1 : function(){
        // this 키워드를 사용하면 객체 변수명에 상관없이 객체 변수 참조 가능
        console.log(this.v1);
    },
    f2 : function(){
        console.log(this.v2);
    }
}

p.f1();
p.f2();

/* 여기서 f1()이라는 함수가 하나 더 생기면, 이전의 f1 함수는
   삭제된 것이나 다름없도록 동작함
function f1(){
    console.log(o.v1);
}

function f2(){
    console.log(o.v2);
}

f1();
f2();
*/