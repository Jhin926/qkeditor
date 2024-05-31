import boldIcon from './icon/bold.svg';
import delIcon from './icon/del.svg';
import underIcon from './icon/underline.svg';
import italicIcon from './icon/italic.svg';
import splitLineIcon from './icon/line.svg';
import alignCenterIcon from './icon/center.svg';
import alignLeftIcon from './icon/left.svg';
import alignRightIcon from './icon/right.svg';
import indentRightIcon from './icon/indent1.svg';

import QkContent from './content';

const setBold = (editor) => {
    editor.setTextStyle('b');
};
const setStrike = (editor) => {
    editor.setTextStyle('span', { textDecoration: 'line-through' });
};
const setUnderline = (editor) => {
    editor.setTextStyle('u');
};
const setItalic = (editor) => {
    editor.setTextStyle('i');
};
const setSplitLine = (editor) => {
    editor.insertElement('hr', {}, { margin: '10px 0' });
};
const setAlignCenter = (editor) => {
    editor.setParagraphStyle('text-align', 'center');
};
const setAlignLeft = (editor) => {
    editor.setParagraphStyle('text-align', 'left');
};
const setAlignRight = (editor) => {
    editor.setParagraphStyle('text-align', 'right');
};
const setIndentRight = (editor) => {
    editor.setParagraphStyle('text-indent', '1em');
};
const setIndentLeft = (editor) => {
    editor.setParagraphStyle('text-align', 'right');
};

export default class QKToolbar {
    menus = [
        'bold',
        'head',
        'fontSize',
        'fontName',
        'italic',
        'underline',
        'strike',
        'indent',
        'lineHeight',
        'foreColor',
        'backColor',
        'link',
        'list',
        'todo',
        'justify',
        'quote',
        'emoticon',
        'image',
        'video',
        'table',
        'code',
        'splitLine',
        'undo',
        'redo',
        'alignCenter',
        'alignLeft',
        'alignRight',
        'indentRight'
    ];
    configMap = {
        alignCenter: {
            icon: alignCenterIcon,
            fn: setAlignCenter
        },
        alignLeft: {
            icon: alignLeftIcon,
            fn: setAlignLeft
        },
        alignRight: {
            icon: alignRightIcon,
            fn: setAlignRight
        },
        bold: {
            icon: boldIcon,
            fn: setBold
        },
        italic: {
            icon: italicIcon,
            fn: setItalic
        },
        indentRight: {
            icon: indentRightIcon,
            fn: setIndentRight
        },
        splitLine: {
            icon: splitLineIcon,
            fn: setSplitLine
        },
        strike: {
            icon: delIcon,
            fn: setStrike
        },
        underline: {
            icon: underIcon,
            fn: setUnderline
        },
    }
    editor;
    constructor(dom, config) {
        const cfg = config.option || this.menus;
        this.editor = config.editor;
        if (!this.editor) {
            console.log('toolbar找不到editor');
        }
        const instanceDom = typeof dom === 'string' ? document.getElementById(dom) : dom;
        if (instanceDom) {
            for (const i of cfg) {
                if (this.configMap[i]) {
                    const toolbarItem = document.createElement('div');
                    toolbarItem.className = 'qk-toolbar-menu';
                    toolbarItem.onclick = () => {
                        this.configMap[i].fn(this.editor)
                    };
                    const toolbarImg = document.createElement('img');
                    toolbarImg.src = this.configMap[i].icon;
                    toolbarItem.appendChild(toolbarImg);
                    instanceDom.appendChild(toolbarItem);
                }
            }
        }
    }
}