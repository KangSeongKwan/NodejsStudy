var testFolder = './data/';
var fs = require('fs');

// readdir을 통해 data폴더 내의 파일이름을 배열로 반환할 수 있음
fs.readdir(testFolder, function(error, filelist){
    console.log(filelist.length);
});
