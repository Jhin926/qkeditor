export function changeRange(dom: HTMLElement, sel: Selection|null = null) {
    const l = dom.lastChild as Text;
    setTimeout(() => {
        const range = new Range();
        range.setStart(l, 1);
        range.setEnd(l, 1);

        sel = sel || getSelection();
        if(sel) {
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }, 100);
}

export const hexToRgb = (str: string) => str.replace(/^#(\w{2})(\w{2})(\w{2})$/g, (i, r, g, b) => `rgb(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)})`);

export function isParentNode(pNode: HTMLElement, cNode: Node) {
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

export function isLastChild(node: Node) {
    // 有时候会出现一个空文本节点的情况
    node.parentElement?.normalize();
    return node.parentElement?.lastChild === node;
}

export function isEmpty(editor: HTMLElement, blockTag='div') {
    return editor.innerHTML === ''
           || editor.innerHTML === '<br>'
           || editor.innerHTML === `<${blockTag}><br></${blockTag}>`;
}

/**
 * 
 * @returns 返回一个用来显示placeholder文字的节点
 */
export function createOutterPlaceholder(placeholderText='请输入...', blockTag='div') {
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