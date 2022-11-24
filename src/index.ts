import {
    changeRange,
    hexToRgb,
    isParentNode,
    isLastChild,
    selectionInEditor,
    isEmpty,
    createOutterPlaceholder,
} from './util';

interface EditorRange {
    root: HTMLElement;
    range: Range;
    startNode: Node;
    endNode: Node;
    commonNode: Node;
}

interface EditorConfig {
    autoFocus?: boolean;
    blockTag?: string;
    placeholderText?: string;
    onChange?: (str: string) => (void);
}

const insertTagType = ['img', 'hr', 'table'];

const  placeholderMark = '\uFEFF';

function isPlaceholder(editor: HTMLElement, blockTag='div') {
    return editor.innerHTML === `<${blockTag}>${placeholderMark}</${blockTag}>`;
}

/**
 * 
 * @returns 返回一个用来接收输入的，隐藏的节点
 */
function createInnerPlaceholder(blockTag='div') {
    const placeholderElement = document.createElement(blockTag);
    const placeholderTextNode = document.createTextNode(placeholderMark);
    placeholderElement.appendChild(placeholderTextNode);

    return placeholderElement;
}

function togglePlaceholder(placeholder: HTMLElement, editor: HTMLElement, blockTag='div') {
    if (isEmpty(editor, blockTag)) {
        placeholder.style.display = 'block';
        editor.firstChild && editor.firstChild.remove();

        const placeholderContent = createInnerPlaceholder(blockTag);
        editor.appendChild(placeholderContent);
        changeRange(placeholderContent);
    } else if(!isPlaceholder(editor, blockTag)) {
        placeholder.style.display = 'none';
    }
}
const defaultConfig = {
    autoFocus: false,
    blockTag: 'div',
    placeholderText: '请输入...',
};
export default class QkEditor {
    blockTag='div';

    historyRange: Range[] = [];

    markTag!: string;

    markTagAttr?: {
        [key: string]: string;
    };

    markTagStyle?: {
        [key: string]: string;
    };

    placeholder!: HTMLElement;

    root!: HTMLElement;

    // tempNodeList: (HTMLElement|Text)[] = [];

    constructor(dom: string|HTMLElement, config: EditorConfig) {
        const option = Object.assign({}, defaultConfig, config);
        this.blockTag = option.blockTag;
        const instanceDom = typeof dom === 'string' ? document.getElementById(dom):dom;
        if (instanceDom) {
            instanceDom.style.position = 'relative';

            const editor = document.createElement('div');
            editor.contentEditable = 'true';
            editor.style.cssText = `
                                    height: 100%;
                                    outline: none;
                                    overflow-y: auto;
                                    padding: 20px;`;
            instanceDom.appendChild(editor);

            this.root = editor;
            const placeholderText = createOutterPlaceholder(option.placeholderText, option.blockTag);
            editor.after(placeholderText);
            this.placeholder = placeholderText;

            const placeholderContent = createInnerPlaceholder(this.blockTag);
            editor.appendChild(placeholderContent);
            if (option.autoFocus) {
                changeRange(placeholderContent);
            }

            // const { tempNodeList } = this;
            /* this.root.addEventListener('input', () => {
                togglePlaceholder(this.placeholder, this.root);
                const changeCallback = option.onChange;
                if (changeCallback && typeof changeCallback === 'function') {
                    changeCallback(editor.innerHTML);
                }
            }); */

            /**
             * 观察编辑区域的子节点的改变，返回结果
             */
            const observerOptions = {
                childList: true,  // 观察目标子节点的变化，是否有添加或者删除
                attributes: true, // 观察属性变动
                subtree: true,     // 观察后代节点，默认为 false
                characterData: true, // 监听所有字符的变化
            };
              
            const observer = new MutationObserver(() => {
                togglePlaceholder(this.placeholder, editor, option.blockTag);
                const changeCallback = option.onChange;
                if (changeCallback && typeof changeCallback === 'function') {
                    const res = isPlaceholder(editor, this.blockTag) ? '' : editor.innerHTML;
                    changeCallback(res);
                }
            });
            observer.observe(editor, observerOptions);

            this.root.addEventListener('keydown', (e) => {
                if(e.key === 'Enter') {
                    const sel = getSelection()!;
                    const rg = sel.getRangeAt(0);
                    if (rg.commonAncestorContainer === this.root) {
                        e.preventDefault();
                        const currentNode = this.root.childNodes[rg.startOffset];
                        // 如果是在img，hr，或者table等之类的元素后面，就新添加一个placeholderContent，并且将光标定位其上
                        const placeholderContent = createInnerPlaceholder(option.blockTag);
                        this.root.insertBefore(placeholderContent, currentNode);
                        changeRange(placeholderContent, sel);
                    }
                }
            });
            document.addEventListener('selectionchange', () => {
                const sel = getSelection();
                if (sel && sel.type !== 'None') {
                    const rg = sel.getRangeAt(0);
                    if (selectionInEditor(this.root, rg)) {
                        if (this.historyRange.length > 20) {
                            this.historyRange.shift();
                        }
                        this.historyRange.push(rg);
                    }
          
                    // 此处应该考虑如果是 在placeholderText左或者右 ,那么应该选中之(这种情况是刚插入的空的block节点，然后鼠标光标定位，然后输入)
                    //if(rg.startContainer === rg.endContainer && rg.startContainer.textContent === placeholderMark) {
                    //     rg.setStart(rg.startContainer, 0);
                    //     rg.setEnd(rg.startContainer, 1);
                    //     editor.focus();
                    //     return;
                    // }
                    // 不是因为插入空标签，触发的slectionchange
                    /* if (
                        !(rg.startContainer === rg.endContainer
                        && (rg.startContainer as Text).textContent === placeholderMark)
                        && rg.endOffset === 1
                        && rg.startOffset === 1
                        && tempNodeList.length > 0) 
                    {
                        if (
                            rg.commonAncestorContainer !== tempNodeList.at(-1)
                            && !isParentNode(tempNodeList.at(-1) as HTMLElement, rg.commonAncestorContainer)
                        ) {
                            tempNodeList.forEach((i) => {
                                i.remove();
                            });
                        }
                        tempNodeList.length = 0;
                        this.root.normalize();
                    } */
                }
            });
        } else {
            console.error('dom不存在！');
        }
    }

    // 判断当前节点是否active状态
    isActive(node: Node) {
        const { markTag, markTagStyle, markTagAttr } = this;
        if (node.nodeType === 3) {
            return false;
        }
        if (node instanceof HTMLElement && node.tagName.toLowerCase() === markTag) {
            if (markTagStyle) {
                for (const k in markTagStyle) {
                    if (
                        node.style[k] !== markTagStyle[k]
                        && !(markTagStyle[k].indexOf('#') > -1
                        && node.style[k] === hexToRgb(markTagStyle[k]))
                    ) {
                        return false;
                    }
                }
            }
            if (markTagAttr) {
                for (const k in markTagAttr) {
                    if (node[k] !== markTagAttr[k]) {
                        return false;
                    }
                }
            }

            return true;
        }
        return false;
    }

    hasActive(node: Node) {
        let pNode = node;
        while (!this.isActive(pNode) && pNode !== this.root) {
            pNode = pNode.parentElement!;
        }
        if (pNode !== this.root) {
            return true;
        }
        return false;
    }

    getActiveNode(node: Node) {
        let pNode = node.parentElement!;
        while (!this.isActive(pNode)) {
            pNode = pNode.parentElement!;
        }
        return pNode;
    }

    createMarkTag() {
        const { markTag, markTagStyle, markTagAttr } = this;
        const tag = document.createElement(markTag);
        if (markTagStyle) {
            for (const k in markTagStyle) {
                if (Object.prototype.hasOwnProperty.call(markTagStyle, k)) {
                    tag.style[k] = markTagStyle[k];
                }
            }
        }
        if (markTagAttr) {
            for (const k in markTagAttr) {
                if (Object.prototype.hasOwnProperty.call(markTagAttr, k)) {
                    tag[k] = markTagAttr[k];
                }
            }
        }
        return tag;
    }

    // 清除左边或者右边的active标签(此时node不是active状态)
    removeSiblingsMark(pNode: HTMLElement, node: HTMLElement|Text, direction = 'left') {
        let firstNode = direction === 'left' ? pNode.firstChild : pNode.lastChild;
        while (
            firstNode
            && firstNode !== node
            && !isParentNode(firstNode as HTMLElement, node)
        ) {
            const tempNode = direction === 'left' ? firstNode.nextSibling : firstNode.previousSibling;
            this.removeAllMark(firstNode as HTMLElement);
            firstNode = tempNode;
        }
        // 如果存在firstNode，并且是startNode的祖先节点
        if (firstNode && isParentNode(firstNode as HTMLElement, node)) {
            this.removeSiblingsMark(firstNode as HTMLElement, node, direction);
        }
    }

    addStartMark(node: HTMLElement| Text, startNode: Text) {
    // 移除startNode右侧的所有b标签
        if (node === startNode) { // 开始节点是文本节点
            const markDom = this.createMarkTag();
            startNode.after(markDom);
            markDom.appendChild(startNode);
        } else {
            this.removeSiblingsMark(node as HTMLElement, startNode, 'right');
            this.addRightMark(node as HTMLElement, startNode, true);
        }
    }

    addEndMark(node: HTMLElement|Text, endNode: Text) {
        if (node === endNode) { // 此时node是一个文本节点
            const bDom = this.createMarkTag();
            endNode.after(bDom);
            bDom.appendChild(endNode);
        } else {
            this.removeSiblingsMark(node as HTMLElement, endNode);
            this.addLeftMark(node as HTMLElement, endNode, true);
        }
    }

    addMark(node: HTMLElement) {
        if (node.nodeType === 3) {
            const markDom = this.createMarkTag();
            node.after(markDom);
            markDom.appendChild(node);
        } else if (!this.isActive(node)) {
            // 排除掉选中的hr，img，table等块级节点
            if(insertTagType.indexOf(node.tagName.toLocaleLowerCase()) > -1) {
                return;
            }
            this.removeAllMark(node);
            const markDom = this.createMarkTag();
            while (node.firstChild) {
                markDom.appendChild(node.firstChild);
            }
            node.appendChild(markDom);
        }
    }

    addLeftMark(pNode: HTMLElement, node: Text, isContain = false) {
        const bDom = this.createMarkTag();
        while (
            pNode.firstChild
            && pNode.firstChild !== node
            && !isParentNode(pNode.firstChild as HTMLElement, node)
        ) {
            bDom.appendChild(pNode.firstChild);
        }
        if (pNode.firstChild !== node) { // 此时firstChild是node的祖先节点
            this.addLeftMark(pNode.firstChild as HTMLElement, node, isContain);
        } else if (isContain) {
            bDom.appendChild(node);
        }
        if (bDom.firstChild) {
            pNode.prepend(bDom);
        }
    }

    addRightMark(pNode: HTMLElement, node: Text, isContain = false) {
        const bDom = this.createMarkTag();
        while (
            pNode.lastChild
            && pNode.lastChild !== node
            && !isParentNode(pNode.lastChild as HTMLElement, node)
        ) {
            bDom.prepend(pNode.lastChild!);
        }
        if (pNode.lastChild !== node) { // 此时lastChild是node的祖先节点
            this.addRightMark(pNode.lastChild as HTMLElement, node, isContain);
        } else if (isContain) {
            bDom.prepend(node);
        }
        if (bDom.firstChild) {
            pNode.appendChild(bDom);
        }
    }

    // 取消分割节点右侧的所有的节点的mark状态
    removeRightMark(activeNode: HTMLElement, cutNode: Text) {
        while (
            activeNode.lastChild
            && activeNode.lastChild !== cutNode
            && !isParentNode(activeNode.lastChild as HTMLElement, cutNode)
        ) {
            activeNode.after(activeNode.lastChild);
        }
        // 把开始节点及其b标签下面的祖先节点移出b标签
        if (activeNode.lastChild !== cutNode) {
            this.addLeftMark(activeNode.lastChild as HTMLElement, cutNode);
        }
        activeNode.after(activeNode.lastChild!);
        if (!activeNode.firstChild) { // 如果pBdom是空的，就移除
            activeNode.remove();
        }
    }

    // 取消分割节点左侧的所有的节点的mark状态
    removeLeftMark(activeNode: HTMLElement, cutNode: Text) {
        while (
            activeNode.firstChild
            && activeNode.firstChild !== cutNode
            && !isParentNode(activeNode.firstChild as HTMLElement, cutNode)
        ) {
            activeNode.before(activeNode.firstChild!);
        }
        if (activeNode.firstChild !== cutNode) {
            this.addRightMark(activeNode.firstChild as HTMLElement, cutNode);
        }

        activeNode.before(activeNode.firstChild!);// 把开始节点及其b下面的祖先节点移出b标签
        if (!activeNode.firstChild) { // 如果pBdom是空的，就移除
            activeNode.remove();
        }
    }

    removeSelectedMark(activeNode: HTMLElement, startNode: Text, endNode: Text) {
        const bDom = this.createMarkTag();

        // 最后一个节点如果不是startNode或者它的祖先节点，就添加进新的activeNode
        while (
            activeNode.lastChild
            && activeNode.lastChild !== endNode
            && !isParentNode(activeNode.lastChild as HTMLElement, endNode)
        ) {
            bDom.prepend(activeNode.lastChild);
        }
        if (bDom.firstChild) {
            activeNode.after(bDom);
        }
        // b节点的最后一个子节点是endNode的祖先节点
        if (activeNode.lastChild !== endNode) {
            this.addRightMark(activeNode.lastChild as HTMLElement, endNode);
        }
        // 最后一个节点如果不是startNode或者它的祖先节点，就移出activeNode
        while (
            activeNode.lastChild
            && activeNode.lastChild !== startNode
            && !isParentNode(activeNode.lastChild as HTMLElement, startNode)
        ) {
            activeNode.after(activeNode.lastChild!);
        }
        if (activeNode.lastChild !== startNode) { // b节点的最后一个子节点是startNode的祖先节点
            this.addLeftMark(activeNode.lastChild as HTMLElement, startNode);
        }
        activeNode.after(activeNode.lastChild!);
        if (!activeNode.firstChild) {
            activeNode.remove();
        }
    }

    // 移除自身或者子节点的mark状态
    removeAllMark(node: HTMLElement) {
        if (node.nodeType === 3) {
            return;
        }
        if (this.isActive(node)) { // 如果是mark，则移出所有子节点并删除当前mark节点
            while (node.lastChild) {
                node.after(node.lastChild);
            }
            node.remove();
        } else if (node.childNodes.length > 0) {
            for (const i of Array.from(node.childNodes)) {
                this.removeAllMark(i as HTMLElement);
            }
        }
    }

    copyRightNode(pNode: HTMLElement, splitNode: Node, isContain = false) {
        const { markTagStyle, markTagAttr } = this;
        const cPNode = document.createElement(pNode.tagName);
        if (markTagStyle) {
            for (const k in markTagStyle) {
                if (Object.prototype.hasOwnProperty.call(markTagStyle, k) && pNode.style[k]) {
                    cPNode.style[k] = pNode.style[k];
                }
            }
        }
        if (markTagAttr) {
            for (const k in markTagAttr) {
                if (Object.prototype.hasOwnProperty.call(markTagAttr, k) && pNode.style[k]) {
                    cPNode[k] = pNode[k];
                }
            }
        }
        while (
            pNode.lastChild
            && pNode.lastChild !== splitNode
            && !isParentNode(pNode.lastChild as HTMLElement, splitNode)
        ) {
            cPNode.prepend(pNode.lastChild);
        }
        if (isContain && pNode.lastChild === splitNode) {
            cPNode.prepend(splitNode);
        } else if (isParentNode(pNode.lastChild as HTMLElement, splitNode)) {
            cPNode.prepend(this.copyRightNode(pNode.lastChild as HTMLElement, splitNode, isContain) || '');
        }

        return cPNode.firstChild ? cPNode : null;
    }

    setRange() {
        let range;
        if(this.historyRange.length > 0) {
            range = this.historyRange.at(-1)!;
        } else {
            this.root.focus();
            range = getSelection()!.getRangeAt(0);
        }
        return range;
    }

    getRange() {
        const selection = getSelection()!;
        let range;
        // 没有选中页面上的任何节点
        if (selection.type === 'None') {
            range=this.setRange();
        } else {
            range =  selection.getRangeAt(0);
            // 光标不在当前editor
            if (!selectionInEditor(this.root, range)) {
                range=this.setRange();
            }
        }
        const res: EditorRange = {
            root: this.root,
            range,
            startNode: range.startContainer,
            endNode: range.endContainer,
            commonNode: range.commonAncestorContainer
        };

        return res;
    }

    setTextStyle(tagName: string, tagStyle?, tagAttr?) {
        // const { tempNodeList } = this;
        this.markTag = tagName;
        this.markTagStyle = tagStyle;
        this.markTagAttr = tagAttr;

        const res = this.getRange();
        const { root, range, commonNode } = res;
        let { startNode, endNode } = res;

        const { childNodes } = commonNode; // 最深的共同祖先的子节点
        const { startOffset, endOffset } = range;
        let startNodeIdx = 0;
        let endNodeIdx = 0;
        if (startNode.nodeType !== 3) {
            return;
        }
        
        // 选区重合(没有选中任何文本)
        if (range.collapsed) {
            const placeNode = document.createTextNode(placeholderMark);
            // active状态
            if (this.hasActive(startNode)) {
                const activeNode = this.getActiveNode(startNode);
                // 光标在文本节点的结束位置
                if (startOffset === (startNode as Text).length) {
                    let deferNode: Text|HTMLElement = startNode as Text;
                    while (isLastChild(deferNode) && deferNode !== activeNode) {
                        deferNode = deferNode.parentElement!;
                    }
                    if (deferNode !== activeNode) {
                        activeNode.after(this.copyRightNode(activeNode, deferNode.nextSibling!, true) || '');
                    }

                    // 已经加了某个状态，没有输入，直接取消的时候
                    /* const tempActiveNode=tempNodeList.find((i) => i instanceof HTMLElement && i.tagName.toLowerCase() === tagName);
                    if (
                        startNode.textContent === placeholderMark
                        && tempNodeList.length > 0
                        && tempActiveNode
                    ) {
                        tempActiveNode?.remove(); // 已有的mark状态删除
                        tempNodeList.push(placeNode);
                        return;
                    } */
                    activeNode.after(placeNode);
                } else if (startOffset === 0) { // 光标在一个文本节点的开始位置， 这种情况在chrome不存在（其他浏览器没有试过）
                    activeNode.before(placeNode);
                } else {
                    startNode = (startNode as Text).splitText(startOffset);
                    activeNode.after(this.copyRightNode(activeNode, startNode, true)!);
                    activeNode.after(placeNode);
                }

                // tempNodeList.push(placeNode);
            } else {
                const markDom = this.createMarkTag();
                startNode = (startNode as Text).splitText(startOffset);
                startNode.previousSibling!.after(markDom);

                markDom.appendChild(placeNode);
                // tempNodeList.push(markDom);
            }

            range.setStart(placeNode, 1);
            range.setEnd(placeNode, 1);
            root.focus();
            return;
        }

        // 选中的是同一个文本节点
        if (startNode === endNode) {
            if (endOffset < (endNode as Text).length) {
                (endNode as Text).splitText(endOffset);
            }
            if (startOffset > 0) {
                startNode = (startNode as Text).splitText(startOffset);
            }

            // 此处可以用hasActive优化
            let isMarked = false;
            let pNode = startNode.parentElement!;
            while (pNode !== root) {
                if (this.isActive(pNode)) {
                    isMarked = true;
                    break;
                }
                pNode = pNode.parentElement!;
            }
            if (isMarked) {
                // 此时pNode是b标签
                const bDom = this.createMarkTag();
                while (
                    pNode.lastChild
                    && pNode.lastChild !== startNode
                    && !isParentNode(pNode.lastChild! as HTMLElement, startNode)
                ) {
                    bDom.prepend(pNode.lastChild);
                }
                if (bDom.firstChild) {
                    pNode.after(bDom);
                }
                // pNode的最后一个节点是startNode的祖先节点
                if (pNode.lastChild !== startNode) {
                    this.addRightMark(pNode.lastChild as HTMLElement, startNode as Text);
                }
                pNode.after(pNode.lastChild!);
                if (!pNode.firstChild) {
                    pNode.remove();
                }
            } else {
                const bDom = this.createMarkTag();
                (startNode as HTMLElement).after(bDom);
                bDom.appendChild(startNode);
            }
            range.setStart(startNode, 0);
            range.setEnd(startNode, (startNode as Text).length);
            startNode.parentElement?.normalize();
            root.focus();
            return;
        }
        // 分割开始和结束的文本节点
        if (endOffset < (endNode as Text).length) {
            endNode = (endNode as Text).splitText(endOffset).previousSibling as Text;
        }
        if (startOffset > 0) {
            startNode = (startNode as Text).splitText(startOffset);
        }

        for (let i = 0; i < childNodes.length; i++) {
            if (
                childNodes[i] === startNode
                || isParentNode(childNodes[i] as HTMLElement, startNode)
            ) {
                startNodeIdx = i;
            }
            if (
                childNodes[i] === endNode
                || isParentNode(childNodes[i] as HTMLElement, endNode)
            ) {
                endNodeIdx = i;
                break;
            }
        }
        const handleNodeList = Array.from(childNodes).slice(startNodeIdx, endNodeIdx + 1);

        let isStartActive = false;
        let isEndActive = false;

        let startActiveNode = startNode.parentElement!;
        while (startActiveNode !== root) {
            if (this.isActive(startActiveNode)) {
                isStartActive = true;
                break;
            }
            startActiveNode = startActiveNode.parentElement!;
        }
        let endActiveNode = endNode.parentElement!;
        while (endActiveNode !== root) {
            if (this.isActive(endActiveNode)) {
                isEndActive = true;
                break;
            }
            endActiveNode = endActiveNode.parentElement!;
        }
        // 开始node和结束node只要有一个active状态，就判定为active状态
        if (isStartActive || isEndActive) {
            if (startActiveNode === endActiveNode) { // 都是同一个active标签的子节点
                this.removeSelectedMark(startActiveNode, startNode as Text, endNode as Text);
            } else {
                const firstHandleNode = handleNodeList.shift() as HTMLElement;
                // 开始节点是active状态
                if (isStartActive) {
                    this.removeSiblingsMark(firstHandleNode, startActiveNode, 'right');
                    this.removeRightMark(startActiveNode, startNode as Text);
                } else {
                    this.removeSiblingsMark(firstHandleNode, startNode as Text, 'right');
                }
                const lastHandleNode = handleNodeList.pop() as HTMLElement;
                // 结束节点是加粗状态
                if (isEndActive) {
                    this.removeSiblingsMark(lastHandleNode, endActiveNode);
                    this.removeLeftMark(endActiveNode, endNode as Text);
                } else {
                    this.removeSiblingsMark(lastHandleNode, endNode as Text);
                }
                for (const i of handleNodeList) {
                    this.removeAllMark(i as HTMLElement);
                }
            }
        } else {
            this.addStartMark(handleNodeList.shift() as HTMLElement, startNode as Text);
            this.addEndMark(handleNodeList.pop() as HTMLElement, endNode as Text);
            for (const i of handleNodeList) {
                this.addMark(i as HTMLElement);
            }
        }
        range.setStart(startNode, 0);
        range.setEnd(endNode, (endNode as Text).length);
        root.normalize();
        root.focus();
    }

    setParagraphStyle(pStyleName:string, pStyleValue: string) {
        const res = this.getRange();
        const {
            root, commonNode, startNode, endNode,
        } = res;

        const { childNodes } = commonNode; // 最深的共同祖先的子节点

        let startNodeIdx = 0;
        let endNodeIdx = 0;

        if (commonNode === root) {
            for (let i = 0; i < childNodes.length; i++) {
                if (
                    childNodes[i] === startNode
                    || isParentNode(childNodes[i] as HTMLElement, startNode)
                ) {
                    startNodeIdx = i;
                }
                if (
                    childNodes[i] === endNode
                    || isParentNode(childNodes[i] as HTMLElement, endNode)
                ) {
                    endNodeIdx = i;
                    break;
                }
            }
            for (let i = startNodeIdx; i <= endNodeIdx; i++) {
                (childNodes[i] as HTMLElement).style[pStyleName] = pStyleValue;
            }
        } else {
            let handleNode = commonNode;
            while (handleNode.parentElement !== root) {
                handleNode = handleNode.parentElement!;
            }
            (handleNode as HTMLElement).style[pStyleName] = pStyleValue;
        }
        root.focus();
    }

    insertElement(node: string|HTMLElement, attr = {}, style = {}) {
        const res = this.getRange();
        const {
            root, range, startNode, endNode, commonNode,
        } = res;

        const { startOffset, endOffset } = range;

        let dom:HTMLElement;
        if (typeof node === 'string') {
            dom = document.createElement(node);
        } else {
            dom = node;
        }
        Object.keys(attr).forEach((k) => {
            dom.setAttribute(k, attr[k]);
        });
        // dom.setAttribute('contenteditable', 'false');
        Object.keys(style).forEach((k) => {
            dom.style[k] = style[k];
        });

        if (range.collapsed) {
            let pNode = startNode;
            // 该方法假定 插入的时候光标在文本节点左右或者中间。应该考虑非文本节点的情况
            
            if (startOffset === 0) { // 光标在文本节点的开始位置(此时两种情况，1.没有任何输入 2.换行之后此时考虑上一行带下来的样式)
                while (pNode!== root && pNode.parentElement !== root) {
                    pNode = pNode.parentElement!;
                }
            } else if (startOffset === (startNode as Text).length) { // 光标在文本节点的结束位置
                while (isLastChild(pNode) && pNode!== root && pNode.parentElement !== root) {
                    pNode = pNode.parentElement!;
                }
                if (pNode.parentElement !== root) {
                    const referNode = pNode;
                    pNode = pNode.parentElement!;
                    while (pNode.parentElement !== root) {
                        pNode = pNode.parentElement!;
                    }
                    (pNode as HTMLElement).after(this.copyRightNode((pNode as HTMLElement), referNode) || '');
                }
            } else { // 光标在文本节点的中间位置
                while (pNode!== root && pNode.parentElement !== root) {
                    pNode = pNode.parentElement!;
                }
                let splitNode;
                if (startNode === endNode) {
                    (endNode as Text).splitText(endOffset);
                    splitNode = (startNode as Text).splitText(startOffset);
                } else {
                    splitNode = (endNode as Text).splitText(endOffset).previousSibling as Text;
                }

                (pNode as HTMLElement).after(this.copyRightNode(pNode as HTMLElement, splitNode) || '');
            }
            (pNode as HTMLElement).after(dom);
        } else {
            // 共同节点是root
            if (commonNode === root) {
                range.deleteContents();
                range.insertNode(dom);
            } else {
                let pNode = startNode as (Text|HTMLElement);
                while (pNode.parentElement !== root) {
                    pNode = pNode.parentElement!;
                }
                let splitNode;
                if (startNode === endNode) {
                    (endNode as Text).splitText(endOffset);
                    splitNode = (startNode as Text).splitText(startOffset);
                } else {
                    splitNode = (endNode as Text).splitText(endOffset).previousSibling as Text;
                }

                range.deleteContents();
                pNode.after(this.copyRightNode(pNode as HTMLElement, splitNode) || '');
                pNode.after(dom);
            }
        }
        // 如果当前插入的节点是最后一个子节点
        if (dom.parentNode && dom.nextSibling === null) {
            const placeElement = document.createElement(this.blockTag);
            placeElement.appendChild(document.createTextNode(placeholderMark));
            dom.after(placeElement);
        }
        // togglePlaceholder(this.placeholder, root);
        root.focus();
    }

    setEditorContent(val) {
        this.root.innerHTML = val;
    }

    clear() {
        this.root.innerHTML = '';
        // togglePlaceholder(this.placeholder, this.root);
        this.root.focus();
    }
}
