var thunkify = require('thunkify'),
    co = require('co'),
    fs = require('fs'),
    readFile = thunkify(fs.readFile),
    readDir = require('./src/read-dir'),
    getModule = require('./src/get-module'),
    path = require('path');

var I18N_PATH = path.join(__dirname, 'src');

readDir(function(filesPaths) {
    fs.open(path.join(I18N_PATH, "i18n.js"), "w", 0644, function(e, fd) {
        if (e) throw e;

        concatStr(filesPaths, fd);
    });
});

function concatStr(filesPaths, fd) {
    var mapStr = 'var map = {',
        i18nStr = 'var i18n = {',
        last = 'function _(locale) {\n' +
        '    var r = i18n[map[locale] || \'en-us\'];\n' +
        '    r._ = _;\n' +
        '    return r;\n' +
        '}\n' +
        'try {\n' +
        '   var locale = seajs.data.vars.locale;\n' +
        '} catch (e) {\n' +
        '   var locale = \'en-us\';\n' +
        '}\n\n' +
        'module.exports = _(locale);',
        filesPathObjs = filesPaths.map(function(file) {
            return path.parse(file);
        });

    var readFileFunc = function(filename) {
        return function(callback) {
            readFile(filename, 'utf8')(callback);
        };
    };

    co(function*() {
        var maps = [],
            i18ns = [],
            i = 0,
            len = filesPathObjs.length,
            isLast, fileObj, fileStr;

        for (; i < len; i++) {
            isLast = i === len - 1;
            fileObj = filesPathObjs[i];
            fileStr = filesPaths[i];
            maps[maps.length] = '\n"' + fileObj.name + '": "' + fileObj.name + '"' + (isLast ? '\r};' : ',');
            i18ns[i18ns.length] = yield readFileFunc(fileStr);
        }

        return {
            maps: maps,
            i18ns: i18ns.map(function(str, index) {
                isLast = index === i18ns.length - 1;

                return '\n"' + filesPathObjs[index].name + '": ' + getModule(str) + (isLast ? '\r};' : ',');
            })
        }
    }).then(function(data) {
        var content = (mapStr + data.maps.join('') + '\r\r' + i18nStr + data.i18ns.join('')).replace(/\n/g, '\n    ') + '\n\n' + last;

        fs.write(fd, content, function(e) {
            if (e) throw e;
            fs.closeSync(fd);
        });
    }, function(err) {
        console.error(err.stack);
    });
}