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
var http = require('http');
var fs = require('fs');
var url = require('url');
 
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){
      title = 'Welcome'
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    fs.readFile(`D:/D드라이브 고유파일/Nodejs/data/${queryData.id}`, 'utf-8', function(err, description){
      var template =`
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ul>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ul>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      //여기서 localhost:3000?id=[id값]을 입력할 때 id값에 따라 출력이 결정됨
      response.end(template);
    })
    // li의 a href부분에 /?id=[id값]을 넣으면 id값에 따라 title값이 바뀌는 것을 볼 수 있음.
    // response.end(fs.readFileSync(__dirname + url));

});
app.listen(3000);