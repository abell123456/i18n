module.exports = function(jsStr){
    var pattern = /.*module.exports\s*=\s*(\{(.|\n|\r|\n\r)+\});*(.|\n|\r|\n\r)*/;

    return jsStr.match(pattern)[1];
};