export function changeRange(dom, sel) {
    const l = dom.lastChild;
    setTimeout(() => {
        const range = new Range();
        range.setStart(l, 1);
        range.setEnd(l, 1);

        sel = sel || getSelection();
        if (sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }, 100);
}

export const hexToRgb = (str) => str.replace(/^#(\w{2})(\w{2})(\w{2})$/g, (i, r, g, b) => `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`);

export function isParentNode(pNode, cNode) {
    let { parentNode } = cNode;
    while (parentNode) {
        if (parentNode === pNode) {
            return true;
        }
        if (parentNode !== null) {
            parentNode = parentNode.parentNode;
        }
    }
    return false;
}

export function selectionInEditor(node, range) {
    const rangeContainer = range.commonAncestorContainer;
    return node === rangeContainer || isParentNode(node, rangeContainer);
}

export function isLastChild(node) {
    // 有时候会出现一个空文本节点的情况
    node.parentElement?.normalize();
    return node.parentElement?.lastChild === node;
}

export function isEmpty(editor, blockTag = 'div') {
    return editor.innerHTML === ''
        || editor.innerHTML === '<br>'
        || editor.innerHTML === `<${blockTag}><br></${blockTag}>`;
}

/**
 * 
 * @returns 返回一个用来显示placeholder文字的节点
 */
export function createOutterPlaceholder(placeholderText = '请输入...', blockTag = 'div') {
    const placeholderNode = document.createElement(blockTag);
    placeholderNode.style.cssText = `position: absolute;
                                    left: 20px;
                                    top: 20px;
                                    color: gray;
                                    pointer-events: none;
                                    position: absolute;`;
    placeholderNode.appendChild(document.createTextNode(placeholderText));
    return placeholderNode;
}

export function showPop(event) {
    console.log(event);
}

export const colorList = [
    '#222222',
    '#505050',
    '#666666',
    '#999999',
    '#cacaca',
    '#d8d8d8',
    '#e8e8e8',
    '#f2f2f2',
    '#f8f8f8',
    '#ffffff',
    '#f04142',
    '#eb28bd',
    '#8f2bff',
    '#1a74ff',
    '#00abab',
    '#00aa54',
    '#70b500',
    '#ffba12',
    '#ff7528',
    '#996d39',
    '#ffd1d1',
    '#ffbaef',
    '#e0c4ff',
    '#c1e1f7',
    '#c7f2f2',
    '#c2edd8',
    '#def7b5',
    '#ffebba',
    '#ffd8c2',
    '#f5d8b6',
    '#ff8585',
    '#ff87e3',
    '#c087ff',
    '#599aff',
    '#5ed1d1',
    '#69cf9c',
    '#acde5b',
    '#ffd05e',
    '#ffa775',
    '#c79254',
    '#ff5e5e',
    '#f54ccd',
    '#ae66ff',
    '#3d89ff',
    '#39c4c4',
    '#3bbf7d',
    '#8ecc29',
    '#ffc740',
    '#ff8e4f',
    '#c0833b',
    '#b83232',
    '#b31e90',
    '#641eb3',
    '#1356bd',
    '#008585',
    '#008542',
    '#508200',
    '#cc950e',
    '#b3521c',
    '#815a2c',
    '#7a2122',
    '#75145e',
    '#4b1785',
    '#0e408c',
    '#005c5c',
    '#005e2f',
    '#314f00',
    '#856109',
    '#662f10',
    '#634119',
];