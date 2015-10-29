var thunkify = require('thunkify'),
    fs = require('fs'),
    readFile = thunkify(fs.readFile),
    readDir = require('./src/read-dir'),
    getModule = require('./src/get-module'),
    path = require('path');

var I18N_PATH = __dirname + '/src';

readDir(function(filesPaths){
    fs.open(I18N_PATH+"/i18n.js", "w", 0644, function(e,fd){
        if(e)throw e;

        concatStr(filesPaths, fd);// 英语（美国）
        module.exports = {
            sideBarTitle: 'Premium Related Products',
            bottomBarTitle: 'Premium Related Products',
            goldSupplier: {
                showText: 'Gold Supplier',
                tipText: 'What is Gold Supplier?'
            },
            atmTexts: {
                showText: ['Chat Now!', 'Leave Messages', 'Chat Now!', 'Chat Now!'],
                tipText: ['Chat with the supplier on TradeManager', 'Please Leave a Message', 'Chat with the supplier on TradeManager', 'Chat with the supplier on TradeManager']
            }
        };

    });
});

function concatStr(filesPaths, fd){
    var mapStr = 'var map = {',
        i18nStr = 'var i18n = {',
        last = 'function _(locale) {\n'+
                '    var r = i18n[map[locale] || \'en-us\'];\n'+
                '    r._ = _;\n'+
                '    return r;\n'+
                '}\n'+
                'try {\n'+
                '   var locale = seajs.data.vars.locale;\n'+
                '} catch (e) {\n'+
                '   var locale = \'en-us\';\n'+
                '}\n\n'+
                'module.exports = _(locale);';

    filesPaths.map(function(file){
        return path.parse(file);
    }).forEach(function(file, index){
        var isLast = index === filesPaths.length-1;

        mapStr += '\n"'+file.name+'": "'+file.name + '"' + (isLast?'\r};':',');

        readFile(filesPaths[index], 'utf-8')(function(err, data){
            if(err){
                throw err;
            }
            i18nStr += '\n"'+file.name+'": '+getModule(data)+(isLast?'\r};':',');

            if(isLast){
                fs.write(fd, mapStr.replace(/\n/g, '\n    ') + '\n\n' +i18nStr.replace(/\n/g, '\n    ') + '\n\n' + last, function(e){
                    if(e)throw e;
                    fs.closeSync(fd);
                });
            }
        });
    });
}
