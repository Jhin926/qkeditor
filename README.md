# qkeditor

#### 介绍
quick editor。一个简单灵活的富文本编辑工具。

[在线地址](https://jhin926.github.io/qkeditor)

#### 安装教程

`npm i qkeditor -S`

`<script src="qkeditor.common.js"></script>`

#### 使用说明

```javascript
// new QkEditor('qk-editor') , 参数是作为富文本的节点的id
// React
import QkEditor from 'qkeditor';

const [editorInstance, setEditorInstance] = useState(null);
useEffect(() => {
  setEditorInstance(new QkEditor('qk-editor'));
}, []);

// Vue
import QkEditor from 'qkeditor';
this.editorInstance = new QkEditor('qk-editor');

// html 
const editorInstance = new QkEditor('qk-editor');
```
## API
```javascript
/**
 * 设置编辑器内容
 * 参数为富文本字符串
 */
const htmlStr="<div>默认文本</div>";
editorInstance.setEditorContent(htmlStr);
```
