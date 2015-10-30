var fs = require('fs'),
    readDir = require('./src/read-dir'),
    path = require('path');

var I18N_PATH = __dirname + '/src';

readDir(function(filesPaths) {
    fs.open(I18N_PATH + "/i18n.js", "w", 0644, function(e, fd) {
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
            i18nStr = i18nStrPrev + formatJson(i18nStr, {
                    newlineAfterColonIfBeforeBraceOrBracket: false
                }) + ';';
            fs.write(fd, mapStr.replace(/\n/g, '\n    ') + '\n\n' + i18nStr + '\n\n' + last, function(e) {
                if (e) throw e;
                fs.closeSync(fd);
            });
        }
    });
}

function formatJson(json, options) {
    var formatted = '',
        pad = 0,
        PADDING = '    ', // one can also use '\t' or a different number of spaces
        reg;

    // optional settings
    options = options || {};
    // remove newline where '{' or '[' follows ':'
    options.newlineAfterColonIfBeforeBraceOrBracket = (options.newlineAfterColonIfBeforeBraceOrBracket === true) ? true : false;
    // use a space after a colon
    options.spaceAfterColon = (options.spaceAfterColon === false) ? false : true;

    // begin formatting...
    if (typeof json !== 'string') {
        // make sure we start with the JSON as a string
        json = JSON.stringify(json);
    } else {
        // is already a string, so parse and re-stringify in order to remove extra whitespace
        json = JSON.parse(json);
        json = JSON.stringify(json);
    }

    // add newline before and after curly braces
    reg = /([\{}])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline before and after square brackets
    reg = /([\[\]])/g;
    json = json.replace(reg, '\r\n$1\r\n');

    // add newline after comma
    reg = /(,)/g;
    json = json.replace(reg, '$1\r\n');

    // remove multiple newlines
    reg = /(\r\n\r\n)/g;
    json = json.replace(reg, '\r\n');

    // remove newlines before commas
    reg = /\r\n,/g;
    json = json.replace(reg, ',');

    // optional formatting...
    if (!options.newlineAfterColonIfBeforeBraceOrBracket) {
        reg = /:\r\n\{/g;
        json = json.replace(reg, ':{');
        reg = /:\r\n\[/g;
        json = json.replace(reg, ':[');
    }
    if (options.spaceAfterColon) {
        reg = /:/g;
        json = json.replace(reg, ': ');
    }

    json.split('\r\n').forEach(function(node) {
        var indent = 0,
            padding = '',
            i;

        if (node.match(/\{$/) || node.match(/\[$/)) {
            indent = 1;
        } else if (node.match(/}/) || node.match(/]/)) {
            if (pad !== 0) {
                pad -= 1;
            }
        } else {
            indent = 0;
        }

        for (i = 0; i < pad; i++) {
            padding += PADDING;
        }

        formatted += padding + node + '\r\n';
        pad += indent;
    });

    return formatted.replace(/^[\r|\r\n|\n]+\{/, '{').replace(/}[\r|\r\n|\n]+$/, '}');
}