// 배열은 순서가 존재하도록 데이터를 갖지만
// 객체는 순서 상관없이 데이터를 가지고 있을 수 있음
// 객체는 데이터에 고유한 값을 넣는 형태를 지님

var members = ['kangsk', 'k8805', 'hoya']
console.log(members[1]);
var i = 0;
while(i < members.length)
{
    console.log(members[i]);
    i += 1;
}
var roles = {
    'programmer':'kangsk',
    'designer':'k8805',
    'manager':'hoya'}
console.log(roles.designer);

for(var name in roles) {
    console.log('object =>', name, 'value =>', roles[name]);
}