var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

// 템플릿 변수를 함수화 한것
function templateHtml(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">Create</a>
    ${body}
  </body>
  </html>
  `;
  /* ${body} 대체 전 코드
  <h2>${title}</h2>
    <p>${description}</p>
  */
}

// 파일 리스트에 대한 템플릿 함수
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while (i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}


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

          var list = templateList(filelist);

          // template 변수에 html 코드가 아닌 함수를 넣으면 코드 간소화 가능
          var template = templateHtml(title, list, `<h2>${title}</h2>
          <p>${description}</p>`);
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
 
          var list = templateList(filelist);

          fs.readFile(`D:/D드라이브 고유파일/Nodejs/data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var template = templateHtml(title, list, `<h2>${title}</h2>
            <p>${description}</p>`);
            response.writeHead(200);
            //여기서 localhost:3000?id=[id값]을 입력할 때 id값에 따라 출력이 결정됨
            response.end(template);
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
          var list = templateList(filelist);
          var template = templateHtml(title, list, `
            <form action="https://localhost:3000/create_process" method="post">
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
          response.end(template);
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
    else {
      response.writeHead(404);
      response.end('Not Found');
    }
});
app.listen(3000);