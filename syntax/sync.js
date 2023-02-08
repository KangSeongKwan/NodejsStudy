var fs = require('fs');


/* readFileSync는 동기처리
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf8');
console.log(result);
console.log('C');
*/

// readFile은 비동기처리에 사용
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', function(err, result){
    console.log(result);
});
console.log('C');

// readFile 함수가 처리되기 전에 console.log('C')를 먼저 출력하게 되는 것
