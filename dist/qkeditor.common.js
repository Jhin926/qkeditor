(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.QkEditor = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  function changeRange(dom) {
    var sel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var l = dom.lastChild;
    setTimeout(function () {
      var range = new Range();
      range.setStart(l, 1);
      range.setEnd(l, 1);
      sel = sel || getSelection();

      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 100);
  }
  var hexToRgb = function hexToRgb(str) {
    return str.replace(/^#(\w{2})(\w{2})(\w{2})$/g, function (i, r, g, b) {
      return "rgb(".concat(parseInt(r, 16), ", ").concat(parseInt(g, 16), ", ").concat(parseInt(b, 16), ")");
    });
  };
  function isParentNode(pNode, cNode) {
    var parentNode = cNode.parentNode;

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
  function selectionInEditor(node, range) {
    var rangeContainer = range.commonAncestorContainer;
    return node === rangeContainer || isParentNode(node, rangeContainer);
  }
  function isLastChild(node) {
    var _node$parentElement, _node$parentElement2;

    // ????????????????????????????????????????????????
    (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.normalize();
    return ((_node$parentElement2 = node.parentElement) === null || _node$parentElement2 === void 0 ? void 0 : _node$parentElement2.lastChild) === node;
  }
  function isEmpty(editor) {
    var blockTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    return editor.innerHTML === '' || editor.innerHTML === '<br>' || editor.innerHTML === "<".concat(blockTag, "><br></").concat(blockTag, ">");
  }
  /**
   * 
   * @returns ????????????????????????placeholder???????????????
   */

  function createOutterPlaceholder() {
    var placeholderText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '?????????...';
    var blockTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var placeholderNode = document.createElement(blockTag);
    placeholderNode.style.cssText = "position: absolute;\n                                    left: 20px;\n                                    top: 20px;\n                                    color: gray;\n                                    pointer-events: none;\n                                    position: absolute;";
    placeholderNode.appendChild(document.createTextNode(placeholderText));
    return placeholderNode;
  }

  var insertTagType = ['img', 'hr', 'table'];
  var placeholderMark = "\uFEFF";

  function isPlaceholder(editor) {
    var blockTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    return editor.innerHTML === "<".concat(blockTag, ">").concat(placeholderMark, "</").concat(blockTag, ">");
  }
  /**
   * 
   * @returns ???????????????????????????????????????????????????
   */


  function createInnerPlaceholder() {
    var blockTag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    var placeholderElement = document.createElement(blockTag);
    var placeholderTextNode = document.createTextNode(placeholderMark);
    placeholderElement.appendChild(placeholderTextNode);
    return placeholderElement;
  }

  function togglePlaceholder(placeholder, editor) {
    var blockTag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'div';

    if (isEmpty(editor, blockTag)) {
      placeholder.style.display = 'block';
      editor.firstChild && editor.firstChild.remove();
      var placeholderContent = createInnerPlaceholder(blockTag);
      editor.appendChild(placeholderContent);
      changeRange(placeholderContent);
    } else if (!isPlaceholder(editor, blockTag)) {
      placeholder.style.display = 'none';
    }
  }

  var defaultConfig = {
    autoFocus: false,
    blockTag: 'div',
    placeholderText: '?????????...'
  };

  var QkEditor = /*#__PURE__*/function () {
    // tempNodeList: (HTMLElement|Text)[] = [];
    function QkEditor(dom, config) {
      var _this = this;

      _classCallCheck(this, QkEditor);

      _defineProperty(this, "blockTag", 'div');

      _defineProperty(this, "historyRange", []);

      var option = Object.assign({}, defaultConfig, config);
      this.blockTag = option.blockTag;
      var instanceDom = typeof dom === 'string' ? document.getElementById(dom) : dom;

      if (instanceDom) {
        instanceDom.style.position = 'relative';
        var editor = document.createElement('div');
        editor.contentEditable = 'true';
        editor.style.cssText = "\n                                    height: 100%;\n                                    outline: none;\n                                    overflow-y: auto;\n                                    padding: 20px;";
        instanceDom.appendChild(editor);
        this.root = editor;
        var placeholderText = createOutterPlaceholder(option.placeholderText, option.blockTag);
        editor.after(placeholderText);
        this.placeholder = placeholderText;
        var placeholderContent = createInnerPlaceholder(this.blockTag);
        editor.appendChild(placeholderContent);

        if (option.autoFocus) {
          changeRange(placeholderContent);
        } // const { tempNodeList } = this;

        /* this.root.addEventListener('input', () => {
            togglePlaceholder(this.placeholder, this.root);
            const changeCallback = option.onChange;
            if (changeCallback && typeof changeCallback === 'function') {
                changeCallback(editor.innerHTML);
            }
        }); */

        /**
         * ??????????????????????????????????????????????????????
         */


        var observerOptions = {
          childList: true,
          // ????????????????????????????????????????????????????????????
          attributes: true,
          // ??????????????????
          subtree: true,
          // ?????????????????????????????? false
          characterData: true // ???????????????????????????

        };
        var observer = new MutationObserver(function () {
          togglePlaceholder(_this.placeholder, editor, option.blockTag);
          var changeCallback = option.onChange;

          if (changeCallback && typeof changeCallback === 'function') {
            var res = isPlaceholder(editor, _this.blockTag) ? '' : editor.innerHTML;
            changeCallback(res);
          }
        });
        observer.observe(editor, observerOptions);
        this.root.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') {
            var sel = getSelection();
            var rg = sel.getRangeAt(0);

            if (rg.commonAncestorContainer === _this.root) {
              e.preventDefault();
              var currentNode = _this.root.childNodes[rg.startOffset]; // ????????????img???hr?????????table?????????????????????????????????????????????placeholderContent??????????????????????????????

              var _placeholderContent = createInnerPlaceholder(option.blockTag);

              _this.root.insertBefore(_placeholderContent, currentNode);

              changeRange(_placeholderContent, sel);
            }
          }
        });
        document.addEventListener('selectionchange', function () {
          var sel = getSelection();

          if (sel && sel.type !== 'None') {
            var rg = sel.getRangeAt(0);

            if (selectionInEditor(_this.root, rg)) {
              if (_this.historyRange.length > 20) {
                _this.historyRange.shift();
              }

              _this.historyRange.push(rg);
            } // ??????????????????????????? ???placeholderText???????????? ,?????????????????????(?????????????????????????????????block????????????????????????????????????????????????)
            //if(rg.startContainer === rg.endContainer && rg.startContainer.textContent === placeholderMark) {
            //     rg.setStart(rg.startContainer, 0);
            //     rg.setEnd(rg.startContainer, 1);
            //     editor.focus();
            //     return;
            // }
            // ???????????????????????????????????????slectionchange

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
        console.error('dom????????????');
      }
    } // ????????????????????????active??????


    _createClass(QkEditor, [{
      key: "isActive",
      value: function isActive(node) {
        var markTag = this.markTag,
            markTagStyle = this.markTagStyle,
            markTagAttr = this.markTagAttr;

        if (node.nodeType === 3) {
          return false;
        }

        if (node instanceof HTMLElement && node.tagName.toLowerCase() === markTag) {
          if (markTagStyle) {
            for (var k in markTagStyle) {
              if (node.style[k] !== markTagStyle[k] && !(markTagStyle[k].indexOf('#') > -1 && node.style[k] === hexToRgb(markTagStyle[k]))) {
                return false;
              }
            }
          }

          if (markTagAttr) {
            for (var _k in markTagAttr) {
              if (node[_k] !== markTagAttr[_k]) {
                return false;
              }
            }
          }

          return true;
        }

        return false;
      }
    }, {
      key: "hasActive",
      value: function hasActive(node) {
        var pNode = node;

        while (!this.isActive(pNode) && pNode !== this.root) {
          pNode = pNode.parentElement;
        }

        if (pNode !== this.root) {
          return true;
        }

        return false;
      }
    }, {
      key: "getActiveNode",
      value: function getActiveNode(node) {
        var pNode = node.parentElement;

        while (!this.isActive(pNode)) {
          pNode = pNode.parentElement;
        }

        return pNode;
      }
    }, {
      key: "createMarkTag",
      value: function createMarkTag() {
        var markTag = this.markTag,
            markTagStyle = this.markTagStyle,
            markTagAttr = this.markTagAttr;
        var tag = document.createElement(markTag);

        if (markTagStyle) {
          for (var k in markTagStyle) {
            if (Object.prototype.hasOwnProperty.call(markTagStyle, k)) {
              tag.style[k] = markTagStyle[k];
            }
          }
        }

        if (markTagAttr) {
          for (var _k2 in markTagAttr) {
            if (Object.prototype.hasOwnProperty.call(markTagAttr, _k2)) {
              tag[_k2] = markTagAttr[_k2];
            }
          }
        }

        return tag;
      } // ???????????????????????????active??????(??????node??????active??????)

    }, {
      key: "removeSiblingsMark",
      value: function removeSiblingsMark(pNode, node) {
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
        var firstNode = direction === 'left' ? pNode.firstChild : pNode.lastChild;

        while (firstNode && firstNode !== node && !isParentNode(firstNode, node)) {
          var tempNode = direction === 'left' ? firstNode.nextSibling : firstNode.previousSibling;
          this.removeAllMark(firstNode);
          firstNode = tempNode;
        } // ????????????firstNode????????????startNode???????????????


        if (firstNode && isParentNode(firstNode, node)) {
          this.removeSiblingsMark(firstNode, node, direction);
        }
      }
    }, {
      key: "addStartMark",
      value: function addStartMark(node, startNode) {
        // ??????startNode???????????????b??????
        if (node === startNode) {
          // ???????????????????????????
          var markDom = this.createMarkTag();
          startNode.after(markDom);
          markDom.appendChild(startNode);
        } else {
          this.removeSiblingsMark(node, startNode, 'right');
          this.addRightMark(node, startNode, true);
        }
      }
    }, {
      key: "addEndMark",
      value: function addEndMark(node, endNode) {
        if (node === endNode) {
          // ??????node?????????????????????
          var bDom = this.createMarkTag();
          endNode.after(bDom);
          bDom.appendChild(endNode);
        } else {
          this.removeSiblingsMark(node, endNode);
          this.addLeftMark(node, endNode, true);
        }
      }
    }, {
      key: "addMark",
      value: function addMark(node) {
        if (node.nodeType === 3) {
          var markDom = this.createMarkTag();
          node.after(markDom);
          markDom.appendChild(node);
        } else if (!this.isActive(node)) {
          // ??????????????????hr???img???table???????????????
          if (insertTagType.indexOf(node.tagName.toLocaleLowerCase()) > -1) {
            return;
          }

          this.removeAllMark(node);

          var _markDom = this.createMarkTag();

          while (node.firstChild) {
            _markDom.appendChild(node.firstChild);
          }

          node.appendChild(_markDom);
        }
      }
    }, {
      key: "addLeftMark",
      value: function addLeftMark(pNode, node) {
        var isContain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var bDom = this.createMarkTag();

        while (pNode.firstChild && pNode.firstChild !== node && !isParentNode(pNode.firstChild, node)) {
          bDom.appendChild(pNode.firstChild);
        }

        if (pNode.firstChild !== node) {
          // ??????firstChild???node???????????????
          this.addLeftMark(pNode.firstChild, node, isContain);
        } else if (isContain) {
          bDom.appendChild(node);
        }

        if (bDom.firstChild) {
          pNode.prepend(bDom);
        }
      }
    }, {
      key: "addRightMark",
      value: function addRightMark(pNode, node) {
        var isContain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var bDom = this.createMarkTag();

        while (pNode.lastChild && pNode.lastChild !== node && !isParentNode(pNode.lastChild, node)) {
          bDom.prepend(pNode.lastChild);
        }

        if (pNode.lastChild !== node) {
          // ??????lastChild???node???????????????
          this.addRightMark(pNode.lastChild, node, isContain);
        } else if (isContain) {
          bDom.prepend(node);
        }

        if (bDom.firstChild) {
          pNode.appendChild(bDom);
        }
      } // ?????????????????????????????????????????????mark??????

    }, {
      key: "removeRightMark",
      value: function removeRightMark(activeNode, cutNode) {
        while (activeNode.lastChild && activeNode.lastChild !== cutNode && !isParentNode(activeNode.lastChild, cutNode)) {
          activeNode.after(activeNode.lastChild);
        } // ?????????????????????b?????????????????????????????????b??????


        if (activeNode.lastChild !== cutNode) {
          this.addLeftMark(activeNode.lastChild, cutNode);
        }

        activeNode.after(activeNode.lastChild);

        if (!activeNode.firstChild) {
          // ??????pBdom?????????????????????
          activeNode.remove();
        }
      } // ?????????????????????????????????????????????mark??????

    }, {
      key: "removeLeftMark",
      value: function removeLeftMark(activeNode, cutNode) {
        while (activeNode.firstChild && activeNode.firstChild !== cutNode && !isParentNode(activeNode.firstChild, cutNode)) {
          activeNode.before(activeNode.firstChild);
        }

        if (activeNode.firstChild !== cutNode) {
          this.addRightMark(activeNode.firstChild, cutNode);
        }

        activeNode.before(activeNode.firstChild); // ?????????????????????b???????????????????????????b??????

        if (!activeNode.firstChild) {
          // ??????pBdom?????????????????????
          activeNode.remove();
        }
      }
    }, {
      key: "removeSelectedMark",
      value: function removeSelectedMark(activeNode, startNode, endNode) {
        var bDom = this.createMarkTag(); // ??????????????????????????????startNode?????????????????????????????????????????????activeNode

        while (activeNode.lastChild && activeNode.lastChild !== endNode && !isParentNode(activeNode.lastChild, endNode)) {
          bDom.prepend(activeNode.lastChild);
        }

        if (bDom.firstChild) {
          activeNode.after(bDom);
        } // b?????????????????????????????????endNode???????????????


        if (activeNode.lastChild !== endNode) {
          this.addRightMark(activeNode.lastChild, endNode);
        } // ??????????????????????????????startNode????????????????????????????????????activeNode


        while (activeNode.lastChild && activeNode.lastChild !== startNode && !isParentNode(activeNode.lastChild, startNode)) {
          activeNode.after(activeNode.lastChild);
        }

        if (activeNode.lastChild !== startNode) {
          // b?????????????????????????????????startNode???????????????
          this.addLeftMark(activeNode.lastChild, startNode);
        }

        activeNode.after(activeNode.lastChild);

        if (!activeNode.firstChild) {
          activeNode.remove();
        }
      } // ??????????????????????????????mark??????

    }, {
      key: "removeAllMark",
      value: function removeAllMark(node) {
        if (node.nodeType === 3) {
          return;
        }

        if (this.isActive(node)) {
          // ?????????mark??????????????????????????????????????????mark??????
          while (node.lastChild) {
            node.after(node.lastChild);
          }

          node.remove();
        } else if (node.childNodes.length > 0) {
          for (var _i = 0, _Array$from = Array.from(node.childNodes); _i < _Array$from.length; _i++) {
            var i = _Array$from[_i];
            this.removeAllMark(i);
          }
        }
      }
    }, {
      key: "copyRightNode",
      value: function copyRightNode(pNode, splitNode) {
        var isContain = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var markTagStyle = this.markTagStyle,
            markTagAttr = this.markTagAttr;
        var cPNode = document.createElement(pNode.tagName);

        if (markTagStyle) {
          for (var k in markTagStyle) {
            if (Object.prototype.hasOwnProperty.call(markTagStyle, k) && pNode.style[k]) {
              cPNode.style[k] = pNode.style[k];
            }
          }
        }

        if (markTagAttr) {
          for (var _k3 in markTagAttr) {
            if (Object.prototype.hasOwnProperty.call(markTagAttr, _k3) && pNode.style[_k3]) {
              cPNode[_k3] = pNode[_k3];
            }
          }
        }

        while (pNode.lastChild && pNode.lastChild !== splitNode && !isParentNode(pNode.lastChild, splitNode)) {
          cPNode.prepend(pNode.lastChild);
        }

        if (isContain && pNode.lastChild === splitNode) {
          cPNode.prepend(splitNode);
        } else if (isParentNode(pNode.lastChild, splitNode)) {
          cPNode.prepend(this.copyRightNode(pNode.lastChild, splitNode, isContain) || '');
        }

        return cPNode.firstChild ? cPNode : null;
      }
    }, {
      key: "setRange",
      value: function setRange() {
        var range;

        if (this.historyRange.length > 0) {
          range = this.historyRange.at(-1);
        } else {
          this.root.focus();
          range = getSelection().getRangeAt(0);
        }

        return range;
      }
    }, {
      key: "getRange",
      value: function getRange() {
        var selection = getSelection();
        var range; // ????????????????????????????????????

        if (selection.type === 'None') {
          range = this.setRange();
        } else {
          range = selection.getRangeAt(0); // ??????????????????editor

          if (!selectionInEditor(this.root, range)) {
            range = this.setRange();
          }
        }

        var res = {
          root: this.root,
          range: range,
          startNode: range.startContainer,
          endNode: range.endContainer,
          commonNode: range.commonAncestorContainer
        };
        return res;
      }
    }, {
      key: "setTextStyle",
      value: function setTextStyle(tagName, tagStyle, tagAttr) {
        // const { tempNodeList } = this;
        this.markTag = tagName;
        this.markTagStyle = tagStyle;
        this.markTagAttr = tagAttr;
        var res = this.getRange();
        var root = res.root,
            range = res.range,
            commonNode = res.commonNode;
        var startNode = res.startNode,
            endNode = res.endNode;
        var childNodes = commonNode.childNodes; // ?????????????????????????????????

        var startOffset = range.startOffset,
            endOffset = range.endOffset;
        var startNodeIdx = 0;
        var endNodeIdx = 0;

        if (startNode.nodeType !== 3) {
          return;
        } // ????????????(????????????????????????)


        if (range.collapsed) {
          var placeNode = document.createTextNode(placeholderMark); // active??????

          if (this.hasActive(startNode)) {
            var activeNode = this.getActiveNode(startNode); // ????????????????????????????????????

            if (startOffset === startNode.length) {
              var deferNode = startNode;

              while (isLastChild(deferNode) && deferNode !== activeNode) {
                deferNode = deferNode.parentElement;
              }

              if (deferNode !== activeNode) {
                activeNode.after(this.copyRightNode(activeNode, deferNode.nextSibling, true) || '');
              } // ???????????????????????????????????????????????????????????????

              /* const tempActiveNode=tempNodeList.find((i) => i instanceof HTMLElement && i.tagName.toLowerCase() === tagName);
              if (
                  startNode.textContent === placeholderMark
                  && tempNodeList.length > 0
                  && tempActiveNode
              ) {
                  tempActiveNode?.remove(); // ?????????mark????????????
                  tempNodeList.push(placeNode);
                  return;
              } */


              activeNode.after(placeNode);
            } else if (startOffset === 0) {
              // ????????????????????????????????????????????? ???????????????chrome??????????????????????????????????????????
              activeNode.before(placeNode);
            } else {
              startNode = startNode.splitText(startOffset);
              activeNode.after(this.copyRightNode(activeNode, startNode, true));
              activeNode.after(placeNode);
            } // tempNodeList.push(placeNode);

          } else {
            var markDom = this.createMarkTag();
            startNode = startNode.splitText(startOffset);
            startNode.previousSibling.after(markDom);
            markDom.appendChild(placeNode); // tempNodeList.push(markDom);
          }

          range.setStart(placeNode, 1);
          range.setEnd(placeNode, 1);
          root.focus();
          return;
        } // ?????????????????????????????????


        if (startNode === endNode) {
          var _startNode$parentElem;

          if (endOffset < endNode.length) {
            endNode.splitText(endOffset);
          }

          if (startOffset > 0) {
            startNode = startNode.splitText(startOffset);
          } // ???????????????hasActive??????


          var isMarked = false;
          var pNode = startNode.parentElement;

          while (pNode !== root) {
            if (this.isActive(pNode)) {
              isMarked = true;
              break;
            }

            pNode = pNode.parentElement;
          }

          if (isMarked) {
            // ??????pNode???b??????
            var bDom = this.createMarkTag();

            while (pNode.lastChild && pNode.lastChild !== startNode && !isParentNode(pNode.lastChild, startNode)) {
              bDom.prepend(pNode.lastChild);
            }

            if (bDom.firstChild) {
              pNode.after(bDom);
            } // pNode????????????????????????startNode???????????????


            if (pNode.lastChild !== startNode) {
              this.addRightMark(pNode.lastChild, startNode);
            }

            pNode.after(pNode.lastChild);

            if (!pNode.firstChild) {
              pNode.remove();
            }
          } else {
            var _bDom = this.createMarkTag();

            startNode.after(_bDom);

            _bDom.appendChild(startNode);
          }

          range.setStart(startNode, 0);
          range.setEnd(startNode, startNode.length);
          (_startNode$parentElem = startNode.parentElement) === null || _startNode$parentElem === void 0 ? void 0 : _startNode$parentElem.normalize();
          root.focus();
          return;
        } // ????????????????????????????????????


        if (endOffset < endNode.length) {
          endNode = endNode.splitText(endOffset).previousSibling;
        }

        if (startOffset > 0) {
          startNode = startNode.splitText(startOffset);
        }

        for (var i = 0; i < childNodes.length; i++) {
          if (childNodes[i] === startNode || isParentNode(childNodes[i], startNode)) {
            startNodeIdx = i;
          }

          if (childNodes[i] === endNode || isParentNode(childNodes[i], endNode)) {
            endNodeIdx = i;
            break;
          }
        }

        var handleNodeList = Array.from(childNodes).slice(startNodeIdx, endNodeIdx + 1);
        var isStartActive = false;
        var isEndActive = false;
        var startActiveNode = startNode.parentElement;

        while (startActiveNode !== root) {
          if (this.isActive(startActiveNode)) {
            isStartActive = true;
            break;
          }

          startActiveNode = startActiveNode.parentElement;
        }

        var endActiveNode = endNode.parentElement;

        while (endActiveNode !== root) {
          if (this.isActive(endActiveNode)) {
            isEndActive = true;
            break;
          }

          endActiveNode = endActiveNode.parentElement;
        } // ??????node?????????node???????????????active?????????????????????active??????


        if (isStartActive || isEndActive) {
          if (startActiveNode === endActiveNode) {
            // ???????????????active??????????????????
            this.removeSelectedMark(startActiveNode, startNode, endNode);
          } else {
            var firstHandleNode = handleNodeList.shift(); // ???????????????active??????

            if (isStartActive) {
              this.removeSiblingsMark(firstHandleNode, startActiveNode, 'right');
              this.removeRightMark(startActiveNode, startNode);
            } else {
              this.removeSiblingsMark(firstHandleNode, startNode, 'right');
            }

            var lastHandleNode = handleNodeList.pop(); // ???????????????????????????

            if (isEndActive) {
              this.removeSiblingsMark(lastHandleNode, endActiveNode);
              this.removeLeftMark(endActiveNode, endNode);
            } else {
              this.removeSiblingsMark(lastHandleNode, endNode);
            }

            var _iterator = _createForOfIteratorHelper(handleNodeList),
                _step;

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var _i2 = _step.value;
                this.removeAllMark(_i2);
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
          }
        } else {
          this.addStartMark(handleNodeList.shift(), startNode);
          this.addEndMark(handleNodeList.pop(), endNode);

          var _iterator2 = _createForOfIteratorHelper(handleNodeList),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _i3 = _step2.value;
              this.addMark(_i3);
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }

        range.setStart(startNode, 0);
        range.setEnd(endNode, endNode.length);
        root.normalize();
        root.focus();
      }
    }, {
      key: "setParagraphStyle",
      value: function setParagraphStyle(pStyleName, pStyleValue) {
        var res = this.getRange();
        var root = res.root,
            commonNode = res.commonNode,
            startNode = res.startNode,
            endNode = res.endNode;
        var childNodes = commonNode.childNodes; // ?????????????????????????????????

        var startNodeIdx = 0;
        var endNodeIdx = 0;

        if (commonNode === root) {
          for (var i = 0; i < childNodes.length; i++) {
            if (childNodes[i] === startNode || isParentNode(childNodes[i], startNode)) {
              startNodeIdx = i;
            }

            if (childNodes[i] === endNode || isParentNode(childNodes[i], endNode)) {
              endNodeIdx = i;
              break;
            }
          }

          for (var _i4 = startNodeIdx; _i4 <= endNodeIdx; _i4++) {
            childNodes[_i4].style[pStyleName] = pStyleValue;
          }
        } else {
          var handleNode = commonNode;

          while (handleNode.parentElement !== root) {
            handleNode = handleNode.parentElement;
          }

          handleNode.style[pStyleName] = pStyleValue;
        }

        root.focus();
      }
    }, {
      key: "insertElement",
      value: function insertElement(node) {
        var attr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var style = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var res = this.getRange();
        var root = res.root,
            range = res.range,
            startNode = res.startNode,
            endNode = res.endNode,
            commonNode = res.commonNode;
        var startOffset = range.startOffset,
            endOffset = range.endOffset;
        var dom;

        if (typeof node === 'string') {
          dom = document.createElement(node);
        } else {
          dom = node;
        }

        Object.keys(attr).forEach(function (k) {
          dom.setAttribute(k, attr[k]);
        }); // dom.setAttribute('contenteditable', 'false');

        Object.keys(style).forEach(function (k) {
          dom.style[k] = style[k];
        });

        if (range.collapsed) {
          var pNode = startNode; // ??????????????? ?????????????????????????????????????????????????????????????????????????????????????????????

          if (startOffset === 0) {
            // ????????????????????????????????????(?????????????????????1.?????????????????? 2.???????????????????????????????????????????????????)
            while (pNode !== root && pNode.parentElement !== root) {
              pNode = pNode.parentElement;
            }
          } else if (startOffset === startNode.length) {
            // ????????????????????????????????????
            while (isLastChild(pNode) && pNode !== root && pNode.parentElement !== root) {
              pNode = pNode.parentElement;
            }

            if (pNode.parentElement !== root) {
              var referNode = pNode;
              pNode = pNode.parentElement;

              while (pNode.parentElement !== root) {
                pNode = pNode.parentElement;
              }

              pNode.after(this.copyRightNode(pNode, referNode) || '');
            }
          } else {
            // ????????????????????????????????????
            while (pNode !== root && pNode.parentElement !== root) {
              pNode = pNode.parentElement;
            }

            var splitNode;

            if (startNode === endNode) {
              endNode.splitText(endOffset);
              splitNode = startNode.splitText(startOffset);
            } else {
              splitNode = endNode.splitText(endOffset).previousSibling;
            }

            pNode.after(this.copyRightNode(pNode, splitNode) || '');
          }

          pNode.after(dom);
        } else {
          // ???????????????root
          if (commonNode === root) {
            range.deleteContents();
            range.insertNode(dom);
          } else {
            var _pNode = startNode;

            while (_pNode.parentElement !== root) {
              _pNode = _pNode.parentElement;
            }

            var _splitNode;

            if (startNode === endNode) {
              endNode.splitText(endOffset);
              _splitNode = startNode.splitText(startOffset);
            } else {
              _splitNode = endNode.splitText(endOffset).previousSibling;
            }

            range.deleteContents();

            _pNode.after(this.copyRightNode(_pNode, _splitNode) || '');

            _pNode.after(dom);
          }
        } // ???????????????????????????????????????????????????


        if (dom.parentNode && dom.nextSibling === null) {
          var placeElement = document.createElement(this.blockTag);
          placeElement.appendChild(document.createTextNode(placeholderMark));
          dom.after(placeElement);
        } // togglePlaceholder(this.placeholder, root);


        root.focus();
      }
    }, {
      key: "setEditorContent",
      value: function setEditorContent(val) {
        this.root.innerHTML = val;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.root.innerHTML = ''; // togglePlaceholder(this.placeholder, this.root);

        this.root.focus();
      }
    }]);

    return QkEditor;
  }();

  return QkEditor;

}));
