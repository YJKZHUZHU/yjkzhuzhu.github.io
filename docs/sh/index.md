<!--
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2022-03-17 14:28:15
 * @LastEditTime: 2022-03-17 14:31:11
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description:
 * @FilePath: /yjkzhuzhu.github.io/docs/sh/index.md
-->

## 一些脚本

### [面试教程](http://interview.poetries.top/)

```
(function free() {
	var ele = $('.content__default')
	ele.childNodes.forEach((item) => {
		if(item.setAttribute) {
			item.setAttribute('style','display:block')
		}
	})
}
)()
```
