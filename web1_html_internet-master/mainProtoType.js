/*
var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
  //localhost 접속시 포트번호 생략하면 기본 80번포트를 사용함
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    console.log(__dirname + url);*/
    /*fs.readFileSync는 (__dirname 키워드 + url) 에 저장된 파일 경로를 읽은 후
    실행하는데, 이는 동기 처리를 해야할 때 사용하게 됨
    */
   /*
    response.end(fs.readFileSync(__dirname + url));
 
});
app.listen(3000);
*/