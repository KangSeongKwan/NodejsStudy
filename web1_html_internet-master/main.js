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
    var pathname = url.parse(_url, true).pathname;
    console.log(queryData.id);
    
    // 사용자가 입력한 url 정보를 url.parse를 통해 제공받음.
    console.log(url.parse(_url, true).pathname);
    /*
    if(_url == '/'){
      title = 'Welcome'
    }
    if(_url == '/favicon.ico'){
      return response.writeHead(404);
    }
    */

    // localhost:3000/ 로 접속하면 정상적 웹페이지 표시
    // <ul></ul>부분 때문에 일일히 수정해야 한다면 아주 고통스러운 일이 될 것.
    if(pathname === '/'){
      // 최상위 웹사이트에서는 queryData의 id값이 undefined이므로 초기 웹페이지를 부여하는 것
      if(queryData.id === undefined) {
        //fs.readFile은 외부의 파일을 읽으므로 필요가 없음. title이랑 decscription을 직접 선언하므로
        fs.readdir('D:/D드라이브 고유파일/Nodejs/data/', function(error, filelist){
          var title = 'Welcome';
          var description = 'Hello, Node.js';
          /*
          var list = `<ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>`;
          */

          var list = '<ul>';
          var i = 0;
          while (i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';

          var template =`
          <!doctype html>
          <html>
          <head>
            <title>WEB1 - ${title}</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1><a href="/">WEB</a></h1>
            ${list}
            <h2>${title}</h2>
            <p>${description}</p>
          </body>
          </html>
          `;
          response.writeHead(200);
          //여기서 localhost:3000?id=[id값]을 입력할 때 id값에 따라 출력이 결정됨
          response.end(template);
        });

        
      }
      else{
        fs.readdir('D:/D드라이브 고유파일/Nodejs/data/', function(error, filelist){
          /*
          var list = `<ul>
              <li><a href="/?id=HTML">HTML</a></li>
              <li><a href="/?id=CSS">CSS</a></li>
              <li><a href="/?id=JavaScript">JavaScript</a></li>
            </ul>`;
          */
          var list = '<ul>';
          var i = 0;
          while (i < filelist.length) {
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
            i = i + 1;
          }
          list = list + '</ul>';
          fs.readFile(`D:/D드라이브 고유파일/Nodejs/data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var template =`
            <!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>
            `;
            response.writeHead(200);
            //여기서 localhost:3000?id=[id값]을 입력할 때 id값에 따라 출력이 결정됨
            response.end(template);
          });
        });
      }
      
    }
    // li의 a href부분에 /?id=[id값]을 넣으면 id값에 따라 title값이 바뀌는 것을 볼 수 있음.
    // response.end(fs.readFileSync(__dirname + url));
    else {
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);