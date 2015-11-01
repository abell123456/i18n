// 更改实现方案后该文件不再有用
module.exports = function(jsStr) {
	var pattern = /.*module.exports\s*=\s*(\{(.|\n|\r|\n\r)+\});*(.|\n|\r|\n\r)*/;

	return jsStr.match(pattern)[1];
};