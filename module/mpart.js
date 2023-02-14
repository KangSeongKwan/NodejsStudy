var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }
}
// mpart.js의 M이 가리키는 객체를 밖에서 사용할 수 있도록 exports하는 코드
module.exports = M;

