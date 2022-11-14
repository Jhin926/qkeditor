# qkeditor

#### 介绍
quick editor。一个简单灵活的富文本编辑工具。

[在线地址](https://jhin926.github.io/qkeditor)

#### 安装教程

`npm i qkeditor -S`

`<script src="qkeditor.common.js"></script>`

#### 使用说明

```javascript
// new QkEditor('y-editor') , 参数是作为富文本的节点的id
// React
import QkEditor from 'qkeditor';

const [editorInstance, setEditorInstance] = useState(null);
useEffect(() => {
  setEditorInstance(new QkEditor('y-editor'));
}, []);

// Vue
import QkEditor from 'qkeditor';
this.editorInstance = new QkEditor('y-editor');

// html 
const editorInstance = new QkEditor('y-editor');
```
## API
```javascript
// 通过QkEditor实例来调用QkEditor方法;
// 设置文本节点的样式。 
editorInstance.setTextStyle('span', {'color': 'red'});
// 设置超文本链接
editorInstance.setTextStyle('a', null, { href, target: '_blank' });

// 设置块级节点的样式。
editorInstance.setParagraphStyle('text-align', 'center');

/**
 * 插入dom节点。
 */
// 1.传节点tagName, 属性, 样式。
editorInstance.insertElement('img', { src: 'http://xxx.com/xxx.jpg' }, { margin: '20px 0' });
editorInstance.insertElement('hr', {}, { margin: '10px 0' });

// 2.亦可直接插入dom节点
const line = document.createElement('hr');
editorInstance.insertElement(line, {}, { margin: '10px 0' });

/**
 * 清除富文本内容
 */
editorInstance.clear();

/**
 * 设置编辑器内容
 * 参数为富文本字符串
 */
const htmlStr="<div>默认文本</div>";
editorInstance.setEditorContent(htmlStr);
```
