var fs = require('fs'),
    readDir = require('./src/read-dir'),
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
        i18nStrPrev = 'var i18n = ',
        i18nStr = '{',
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
        'module.exports = _(locale);';

    filesPaths.map(function(file) {
        return path.parse(file);
    }).forEach(function(file, index) {
        var isLast = index === filesPaths.length - 1;

        mapStr += '\n"' + file.name + '": "' + file.name + '"' + (isLast ? '\r};' : ',');

        i18nStr +=
            '\n"' + file.name + '": ' +
            JSON.stringify(require(filesPaths[index])) + (isLast ? '\r}' : ',');

        if (isLast) {
            i18nStr = i18nStrPrev + formatJson(i18nStr) + ';';
            fs.write(fd, mapStr.replace(/\n/g, '\n    ') + '\n\n' + i18nStr + '\n\n' + last, function(e) {
                if (e) throw e;
                fs.closeSync(fd);
            });
        }
    });
}

// 简化实现
function formatJson(json) {
    if (typeof json === 'object') {
        return JSON.stringify(json, null, '    ');
    } else if (typeof json === 'string') {
        return JSON.stringify(JSON.parse(json), null, '    ');
    } else {
        return json;
    }
}