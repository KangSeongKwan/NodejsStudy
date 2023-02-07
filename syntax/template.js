var name = 'k8805';
// String literals
// 줄바꿈 시 특수문자 \n을 부여하면 됨
var letter = 'Dear '+name+'\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '+name+' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa egoing qui officia deserunt mollit anim id est laborum. '+name;
 
// Template literals
/* `은 Template literal의 시작과 끝을 나타내는 문자임
템플릿 리터럴을 사용하면 보통 문자열에 \n을 부여하는 번거로움 없이 
엔터만으로 줄바꿈 가능하고 ${변수명}으로 변수의 값을 넣을 수도 있다.*/

var letter = `Dear ${name}
 
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ${name} Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ${1+1} Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa egoing qui officia deserunt mollit anim id est laborum. ${name}`;
 
console.log(letter);