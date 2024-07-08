import { colorList } from './util';
import boldIcon from './icon/bold.svg';
import delIcon from './icon/del.svg';
import underIcon from './icon/underline.svg';
import italicIcon from './icon/italic.svg';
import splitLineIcon from './icon/line.svg';
import alignCenterIcon from './icon/center.svg';
import alignLeftIcon from './icon/left.svg';
import alignRightIcon from './icon/right.svg';
import indentRightIcon from './icon/indent1.svg';
import indentLeftIcon from './icon/indent2.svg';
import indentImageIcon from './icon/image.svg';
import fontSizeIcon from './icon/fontsize.svg';
import linkIcon from './icon/url.svg';
import fontColorIcon from './icon/color.svg';
import bgColorIcon from './icon/background.svg';
import tableIcon from './icon/table.svg';

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
    editor.setParagraphStyle('text-indent', '0');
};
const showImage = (editor, toolbarItem) => {
    const toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    toolbarPop.innerHTML = `
        <div class="qk-pop-item qk-pop-image">本地上传</div>
        <div class="qk-pop-item qk-pop-image">网络图片</div>
    `;
    toolbarPop.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.innerHTML === '网络图片') {
            const imgInputContainer = document.createElement('div');
            imgInputContainer.className = 'qk-editor-modal';
            imgInputContainer.innerHTML = `
                <div class="qk-modal-input">
                    <label>图片地址</label>
                    <input type='text' id="qkEditorImgPath" placeholder="请输入图片地址" />
                </div>
                <div class="qk-modal-input">
                    <label>图片描述</label>
                    <input type='text' id="qkEditorImgAlt" placeholder="请输入图片描述" />
                </div>
                <div>
                    <button class="qk-button-primary">确定</button>
                    <button>取消</button>
                </div>
            `;
            // 新建弹框
            editor.root.after(imgInputContainer);
            imgInputContainer.onclick = (event) => {
                if (event.target.tagName.toUpperCase() === 'BUTTON') {
                    editor.insertImg(imgInputContainer.querySelector('#qkEditorImgPath').value, {}, {
                        alt: imgInputContainer.querySelector('#qkEditorImgAlt').value
                    });

                    // 移除弹框
                    const p = imgInputContainer.parentNode;
                    if (p) {
                        p.removeChild(imgInputContainer);
                    }
                }
            }
        } else {
            const imgInput = document.createElement('input');
            imgInput.type = 'file';
            imgInput.accept = 'image/*';
            imgInput.click();
            imgInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                editor.insertImg(file);
            });
        }
    }
    toolbarItem.appendChild(toolbarPop);
}
const showFontsize = (editor, toolbarItem) => {
    const toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    toolbarPop.innerHTML = `
        <div class="qk-pop-item qk-pop-fontsize">12px</div>
        <div class="qk-pop-item qk-pop-fontsize">14px</div>
        <div class="qk-pop-item qk-pop-fontsize">16px</div>
        <div class="qk-pop-item qk-pop-fontsize">18px</div>
        <div class="qk-pop-item qk-pop-fontsize">22px</div>
        <div class="qk-pop-item qk-pop-fontsize">26px</div>
        <div class="qk-pop-item qk-pop-fontsize">30px</div>
    `;
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        editor.setTextStyle('span', { fontSize: e.target.innerHTML });
    })
}
const showLink = (editor, toolbarItem) => {
    const toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    toolbarPop.innerHTML = `
        <div class="qk-pop-item qk-pop-input">
            <input class="qk-editor-input qk-editor-input-link" type="text" placeholder="请输入链接地址" />
            <button class="qk-button-primary">确定</button>
        </div>
    `;
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.tagName.toUpperCase() === 'BUTTON') {
            const ipt = toolbarPop.querySelector('input');
            editor.setTextStyle('a', null, { href: ipt.value, target: '_blank' });
        }
    });
}
const showFontColor = (editor, toolbarItem) => {
    const toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    // toolbarPop.style.display = 'block';
    const colorListDom = colorList.map((i) => `
        <li class="qk-colorpicker-item">
            <span class="qk-colorpicker-span" data-color="${i}" style="background:${i}"/>
        </li>`).join('');
    toolbarPop.innerHTML = `
        <div class="qk-colorpicker">
            <div class="qk-colorpicker-inner">
                <h3 class="qk-colorpicker-title">全部颜色</h3>
                <ul class="qk-colorpicker-list">
                    ${colorListDom}
                </ul>
                <p class="qk-colorpicker-line" />
                <div class="qk-colorpicker-footer">
                    <p class="active-color" id="qk-colorpicker-selected">
                        <span class="qk-colorpicker-span" />
                    </p>
                    <div class="qk-colorpicker-input">
                        <input id="qk-colorpicker-value" type="text" />
                    </div>
                    <div class="qk-colorpicker-btn" onclick="console.log(111)">
                        确定
                    </div>
                </div>
            </div>
        </div>
    `;
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tg = e.target;
        if (tg.className === 'qk-colorpicker-span') {
            const currentColor = tg.getAttribute('data-color');
            editor.setTextStyle('span', { color: currentColor });
            toolbarItem.querySelector('#qk-colorpicker-selected').style.background = currentColor;
            toolbarItem.querySelector('#qk-colorpicker-value').value = currentColor;
        }
        if (tg.className === 'qk-colorpicker-btn') {
            const currentColor = toolbarItem.querySelector('#qk-colorpicker-value').value;
            editor.setTextStyle('span', { color: currentColor });
            toolbarItem.querySelector('#qk-colorpicker-selected').style.background = currentColor;
        }
    });
}
const showBgColor = (editor, toolbarItem) => {
    const toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    // toolbarPop.style.display = 'block';
    const colorListDom = colorList.map((i) => `
        <li class="qk-colorpicker-item">
            <span class="qk-colorpicker-span" data-color="${i}" style="background:${i}"/>
        </li>`).join('');
    toolbarPop.innerHTML = `
        <div class="qk-colorpicker">
            <div class="qk-colorpicker-inner">
                <h3 class="qk-colorpicker-title">全部颜色</h3>
                <ul class="qk-colorpicker-list">
                    ${colorListDom}
                </ul>
                <p class="qk-colorpicker-line" />
                <div class="qk-colorpicker-footer">
                    <p class="active-color" id="qk-colorpicker-selected">
                        <span class="qk-colorpicker-span" />
                    </p>
                    <div class="qk-colorpicker-input">
                        <input id="qk-colorpicker-value" type="text" />
                    </div>
                    <div class="qk-colorpicker-btn">
                        确定
                    </div>
                </div>
            </div>
        </div>
    `;
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const tg = e.target;
        if (tg.className === 'qk-colorpicker-span') {
            const currentColor = tg.getAttribute('data-color');
            editor.setTextStyle('span', { background: currentColor });
            toolbarItem.querySelector('#qk-colorpicker-selected').style.background = currentColor;
            toolbarItem.querySelector('#qk-colorpicker-value').value = currentColor;
        }
        if (tg.className === 'qk-colorpicker-btn') {
            const currentColor = toolbarItem.querySelector('#qk-colorpicker-value').value;
            editor.setTextStyle('span', { background: currentColor });
            toolbarItem.querySelector('#qk-colorpicker-selected').style.background = currentColor;
        }
    });
}
const showTable = (editor, toolbarItem) => {
    const toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    let innerHtml = '';
    for (let i = 0; i < 100; i++) {
        innerHtml += `<div class="qk-table-cell" data-index="${i}"></div>`;
    }
    toolbarPop.innerHTML = `
        <div class="qk-pop-item">
            <div class="qk-toolbar-table">
                ${innerHtml}
            </div>
        </div>
    `;
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const {target} = e;
        if (target.tagName.toUpperCase() === 'BUTTON') {
            const ipt = toolbarPop.querySelector('input');
            editor.setTextStyle('a', null, { href: ipt.value, target: '_blank' });
        }
        if(target.className === 'qk-table-cell') {
            const idx = Number(target.dataset.index);
            const tIdx = parseInt(idx / 10);
            const uIdx = idx % 10;

            editor.insertTable({row: tIdx, col: uIdx});
        }
    });
    toolbarPop.addEventListener('mouseover', (e) => {
        const { target } = e;
        if (target.className === 'qk-table-cell') {
            const idx = Number(target.dataset.index);
            const tIdx = parseInt(idx / 10);
            const uIdx = idx % 10;
            const slibings = target.parentElement.children;
            for (let sib of slibings) {
                const sIdx = Number(sib.dataset.index);
                const sTIdx = parseInt(sIdx / 10);
                const sUIdx = sIdx % 10;

                if (tIdx >= sTIdx && uIdx >= sUIdx) {
                    sib.style.backgroundColor = "#f6f6f6";
                }
            }
        }
    });
    toolbarPop.addEventListener('mouseout', (e) => {
        const { target } = e;
        if (target.className === 'qk-table-cell') {
            const idx = Number(target.dataset.index);
            const tIdx = parseInt(idx / 10);
            const uIdx = idx % 10;
            const slibings = target.parentElement.children;
            for (let sib of slibings) {
                const sIdx = Number(sib.dataset.index);
                const sTIdx = parseInt(sIdx / 10);
                const sUIdx = sIdx % 10;

                if (tIdx >= sTIdx && uIdx >= sUIdx) {
                    sib.style.backgroundColor = "#fff";
                }
            }
        }
    });
}

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
        'fontColor',
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
        'indentRight',
        'indentLeft',
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
        indentLeft: {
            icon: indentLeftIcon,
            fn: setIndentLeft
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
        image: {
            icon: indentImageIcon,
            fn: showImage
        },
        fontSize: {
            icon: fontSizeIcon,
            fn: showFontsize
        },
        link: {
            icon: linkIcon,
            fn: showLink
        },
        fontColor: {
            icon: fontColorIcon,
            fn: showFontColor
        },
        backColor: {
            icon: bgColorIcon,
            fn: showBgColor
        },
        table: {
            icon: tableIcon,
            fn: showTable
        }
    }
    editor;
    constructor(dom, config) {
        const toolbarItems = config.menus || this.menus;
        this.editor = config.editor;
        if (!this.editor) {
            console.log('toolbar找不到editor');
        }
        const instanceDom = typeof dom === 'string' ? document.getElementById(dom) : dom;
        if (instanceDom) {
            for (const i of toolbarItems) {
                if (this.configMap[i]) {
                    const toolbarItem = document.createElement('div');
                    toolbarItem.className = 'qk-toolbar-menu';
                    const toolbarImg = document.createElement('img');
                    toolbarImg.src = this.configMap[i].icon;
                    toolbarItem.appendChild(toolbarImg);
                    // 插入图片相关处理
                    if (i === 'image') {
                        this.configMap[i].fn(this.editor, toolbarItem);
                    }
                    else if (i === 'fontSize') {
                        this.configMap[i].fn(this.editor, toolbarItem);
                    }
                    else if (i === 'link') {
                        this.configMap[i].fn(this.editor, toolbarItem);
                    }
                    else if (i === 'fontColor') {
                        this.configMap[i].fn(this.editor, toolbarItem);
                    }
                    else if (i === 'backColor') {
                        this.configMap[i].fn(this.editor, toolbarItem);
                    } else if (i === 'table') {
                        this.configMap[i].fn(this.editor, toolbarItem);
                    }
                    else {
                        toolbarItem.onclick = () => {
                            this.configMap[i].fn(this.editor)
                        };
                    }
                    instanceDom.appendChild(toolbarItem);
                }
            }
        }
    }
}