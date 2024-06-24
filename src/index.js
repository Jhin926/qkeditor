import QKToolbar from './toolbar';
import QkContent from './content';
import './css/index.less';

export default class QkEditor {
    toolbar;
    editor;
    constructor(domId1, config={}) {
        if (domId1) {
            const instanceDom = typeof domId1 === 'string' ? document.getElementById(domId1) : domId1;
            if (instanceDom) {
                instanceDom.className = 'qk-editor';
                const toolbarDom = document.createElement('header');
                toolbarDom.className = 'qk-editor-toolbar';
                const editorDom = document.createElement('div');
                instanceDom.appendChild(toolbarDom);
                instanceDom.appendChild(editorDom);
                this.editor = new QkContent(editorDom, config.editor);
                this.toolbar = new QKToolbar(toolbarDom, {
                    editor: this.editor,
                    ...config.toolbar
                });
            } else {
                console.log('没有找到dom');
            }
        } else {
            console.error('缺少必须参数');
            return;
        }
    }
}