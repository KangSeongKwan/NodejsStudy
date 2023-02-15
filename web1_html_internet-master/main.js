var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// template 객체를 모듈화 하여 require로 포함
var template = require('../lib/template.js');
var path = require('path');
var sanitizeHTML = require('sanitize-html');

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

          var list = template.list(filelist);
          // template 변수에 html 코드가 아닌 함수를 넣으면 코드 간소화 가능
          var html = template.html(title, list, `<h2>${title}</h2>
          <p>${description}</p>`, `
          <a href="/create">Create</a>`);
          response.writeHead(200);
          //여기서 localhost:3000?id=[id값]을 입력할 때 id값에 따라 출력이 결정됨
          response.end(html);
        });
      }
      else{
        fs.readdir('D:/D드라이브 고유파일/Nodejs/data/', function(error, filelist){
          // 파일의 경로탐색에 대해 Password 등의 정보 유출을 막기 위한 처리
          // sanitize 기법이라고 부름
          var filterId = path.parse(queryData.id).base;
          var list = template.list(filelist);
          fs.readFile(`D:/D드라이브 고유파일/Nodejs/data/${filterId}`, 'utf-8', function(err, description){
            var title = queryData.id;
            // 태그는 없애지만 내용은 살리는 기능을 갖고있음
            var sanitizedTitle =  sanitizeHTML(title);
            var sanitizedDescription = sanitizeHTML(description, {
              allowedTags:['h1']
            });
            
            var html = template.html(title, list, `<h2>${sanitizedTitle}</h2>
            <p>${sanitizedDescription}</p>`,
            `
            <a href= "/create">Create</a> 
            <a href = "/update?id=${sanitizedTitle}">Update</a>    
            <form action="delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}">
              <input type="submit" value="delete">
            </form>`);
            // QueryString을 사용하는 것은 Get 방식
            /* 삭제 버튼을 Link로 구현하는 것은 대단히 잘못된일(소스를 조작할 수 있기 때문)
            <a href = "/delete?id=${title}">Delete</a> 
            */
            response.writeHead(200);
            //여기서 localhost:3000?id=[id값]을 입력할 때 id값에 따라 출력이 결정됨
            response.end(html);
          });
        });
      }
      
    }
    // li의 a href부분에 /?id=[id값]을 넣으면 id값에 따라 title값이 바뀌는 것을 볼 수 있음.
    // response.end(fs.readFileSync(__dirname + url));

    else if(pathname === '/create')
    {
      if(queryData.id === undefined) {
        fs.readdir('D:/D드라이브 고유파일/Nodejs/data', function(error, filelist){
          var title = 'WEB-Create';
          var list = template.list(filelist);
          var html = template.html(title, list, `
            <form action="http://localhost:3000/create_process" method="post">
            <p><input type="text" name="title" 
            placeholder="title"></p>
            <p>
                <textarea name="description" 
                placeholder="description"></textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
          `);
          response.writeHead(200);
          response.end(html);
        });
      }
    }
    else if(pathname === '/create_process') {
      var body = '';
      // POST방식 데이터가 많을 경우를 대비해서 데이터에 대한 처리 방법 제공
      // 서버쪽에서 요청을 수신할 때 마다 콜백함수 호출하도록 약속되어 있음
      request.on('data', function(data){
        body += data;

        // 주는 데이터 용량이 너무 크면 접속을 끊어버리는 코드
        /*
        if (body.length > 1e6){
          request.connection.destroy();
        }
        */
      });
      request.on('end', function(){
        // 저장된 body값을 입력값으로 주면 post에 데이터가 들어갈 것
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`D:/D드라이브 고유파일/Nodejs/data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
      });
    }
    else if (pathname === '/update') {
      var filterId = path.parse(queryData.id).base;
      fs.readdir('D:/D드라이브 고유파일/Nodejs/data/', function(error, filelist){
        fs.readFile(`D:/D드라이브 고유파일/Nodejs/data/${filterId}`, 'utf-8', function(err, description){
          var title = queryData.id;
          var list = template.list(filelist);
          var html = template.html(title, list, `
            <form action="http://localhost:3000/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" 
            placeholder="title" value="${title}"></p>
            <p>
                <textarea name="description" 
                placeholder="description">${description}</textarea>
            </p>
            <p>
                <input type="submit">
            </p>
            </form>
          `,
          `
          <a href="/create">Create</a> 
          <a href = "/update?id=${title}">Update</a>`);
          response.writeHead(200);
          response.end(html);
        });
      });
    }

    else if(pathname === '/update_process') {
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filterId = path.parse(id).base;
        var title = post.title;
        var description = post.description;
          fs.rename(`D:/D드라이브 고유파일/Nodejs/data/${filterId}`, `D:/D드라이브 고유파일/Nodejs/data/${title}`, function(error){
            fs.writeFile(`D:/D드라이브 고유파일/Nodejs/data/${title}`, description, 'utf8', function(err){
              response.writeHead(302, {Location: `/?id=${title}`});
              response.end();
          });
        });
        /*fs.writeFile(`D:/D드라이브 고유파일/Nodejs/data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
        */
      });
    }
    else if(pathname === '/delete_process') {
      var body = '';
      request.on('data', function(data){
        body += data;
      });
      request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var filterId = path.parse(id).base;
        fs.unlink(`D:/D드라이브 고유파일/Nodejs/data/${filterId}`, function(error){
          response.writeHead(302, {Location: '/'});
          response.end();
        });
      });
    }
    else {
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);