# i18n
多语言文案解决方案

# 思路
在src文件夹下，设置所有需要的多语言文案文件，并以js文件中module.exports导出一个对象的形式写入。  
运行：  
`
node run index.js
`  
或者：  
`
node run index-co.js
`  
项目就会在src文件夹下生成一个i18n.js。  
在你的前端js文件中，引入该js文件，实际导入的就是一个对应于某个多语言js配置文件导出的多语言配置的对象。  

# 注意
在生成的i18n.js文件中，有如下代码：
``` javascript
var locale = seajs.data.vars.locale;
```
这里需要你在引入seajs的时候在script标签处指定当前语种，然后将该语种值赋值到对应的变量以供此处获取，或类似方案解决即可。可自行修改想要生成的i18n.js文件内容。
