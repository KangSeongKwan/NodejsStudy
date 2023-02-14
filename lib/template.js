// 코드를 더 효율적으로 바꾸는 것을 리팩토링이라고 부름
// 함수화한 템플릿 변수를 객체에 담는 과정
var template = {
    // 템플릿 변수를 함수화 한것
    html:function templateHtml(title, list, body, control){
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
        ${control}
        ${body}
      </body>
      </html>
      `;
      /* ${body} 대체 전 코드
      <h2>${title}</h2>
        <p>${description}</p>
      */
    },
    // 파일 리스트에 대한 템플릿 함수
    list:function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while (i < filelist.length){
      list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i = i + 1;
    }
    list = list + '</ul>';
    return list;
    }
  }

  module.exports = template;