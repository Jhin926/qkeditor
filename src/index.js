import QKToolbar from './toolbar';
import QkContent from './content';
import './css/index.less';

export default class QkEditor {
    constructor(domId1, domId2) {
        if (domId1) {
            const instanceDom = typeof domId1 === 'string' ? document.getElementById(domId1) : domId1;
            if (instanceDom) {
                instanceDom.className = 'qk-editor';
                const toolbarDom = document.createElement('header');
                toolbarDom.className = 'qk-editor-toolbar';
                const editorDom = document.createElement('div');
                instanceDom.appendChild(toolbarDom);
                instanceDom.appendChild(editorDom);
                const QkCont = new QkContent(editorDom);
                new QKToolbar(toolbarDom, {
                    editor: QkCont,
                });
            } else {
                console.log('没有找到dom');
            }
        } else {
            console.error('至少绑定一个节点');
            return;
        }
        if (domId2) {
            new QKToolbar(domId2);
            new QkContent(domId1);
        }
    }
}