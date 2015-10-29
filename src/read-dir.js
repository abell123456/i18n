var fs = require('fs');

module.exports = function(path, cb){
    var allFiles = [];

    if(typeof path === 'function'){
        cb = path;
        path = __dirname+'/i18n';
    }

    explorer(path);

    function explorer(path){
        fs.readdir(path, function(err, files){
            //err 为错误 , files 文件名列表包含文件夹与文件
            if(err){
                console.log('read direct error:\n' + err);
                return;
            }

            // 文件列表
            files.forEach(function(file, index){
                var filePath = path + '/' + file;

                fs.stat(filePath, function(err, stat){
                    if(err){
                        console.log('Read file path "'+filePath+'" error:', err);
                        return;
                    }
                    if(stat.isDirectory()){
                        // 如果是文件夹抛出错误
                        throw new Error('i18n下不要再包含文件夹!');
                        // explorer(filePath);
                    }else {
                        // 读出所有的文件
                        allFiles[allFiles.length] = filePath;

                        if(index === files.length-1){
                            typeof cb === 'function' && cb(allFiles);
                        }
                    }
                });
            });
        });
    }
};