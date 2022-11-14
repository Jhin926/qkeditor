(function (React, ReactDOM) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
  var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;

    var _s, _e;

    try {
      for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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

  var colorList = ['#222222', '#505050', '#666666', '#999999', '#cacaca', '#d8d8d8', '#e8e8e8', '#f2f2f2', '#f8f8f8', '#ffffff', '#f04142', '#eb28bd', '#8f2bff', '#1a74ff', '#00abab', '#00aa54', '#70b500', '#ffba12', '#ff7528', '#996d39', '#ffd1d1', '#ffbaef', '#e0c4ff', '#c1e1f7', '#c7f2f2', '#c2edd8', '#def7b5', '#ffebba', '#ffd8c2', '#f5d8b6', '#ff8585', '#ff87e3', '#c087ff', '#599aff', '#5ed1d1', '#69cf9c', '#acde5b', '#ffd05e', '#ffa775', '#c79254', '#ff5e5e', '#f54ccd', '#ae66ff', '#3d89ff', '#39c4c4', '#3bbf7d', '#8ecc29', '#ffc740', '#ff8e4f', '#c0833b', '#b83232', '#b31e90', '#641eb3', '#1356bd', '#008585', '#008542', '#508200', '#cc950e', '#b3521c', '#815a2c', '#7a2122', '#75145e', '#4b1785', '#0e408c', '#005c5c', '#005e2f', '#314f00', '#856109', '#662f10', '#634119'];

  var ColorPicker = function ColorPicker(_ref) {
    var onChange = _ref.onChange,
        slectedKey = _ref.slectedKey;
    var selectedColorKey = slectedKey;

    var _useState = React.useState(''),
        _useState2 = _slicedToArray(_useState, 2),
        activeColor = _useState2[0],
        setActiveColor = _useState2[1];

    var _useState3 = React.useState(JSON.parse(localStorage.getItem(selectedColorKey) || '[]')),
        _useState4 = _slicedToArray(_useState3, 2),
        selectedColor = _useState4[0],
        setSelectedColor = _useState4[1];

    var setInputColor = React.useCallback(function (event) {
      var lowerVal = event.target.value;
      var hexReg = /^#[0-9a-f]{0,8}$/;

      if (hexReg.test(lowerVal)) {
        setActiveColor(event.target.value);
      }
    }, []);
    var pushSelectedColor = React.useCallback(function (color) {
      var hexReg = /^#(([0-9a-f]{2}){1,4})$/i;

      if (hexReg.test(color)) {
        var sameColorIdx = selectedColor.indexOf(color);

        if (sameColorIdx > -1) {
          selectedColor.splice(sameColorIdx, 1);
        }

        selectedColor.unshift(color);

        if (selectedColor.length > 10) {
          selectedColor.pop();
        }

        setSelectedColor(_toConsumableArray(selectedColor));
        localStorage.setItem(selectedColorKey, JSON.stringify(selectedColor));
        onChange(color);
      }
    }, []);
    React.useEffect(function () {
      setActiveColor(JSON.parse(localStorage.getItem(selectedColorKey) || '[]')[0] || '');
    }, []);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "color-picker"
    }, /*#__PURE__*/React__default["default"].createElement("div", {
      className: "picker-inner"
    }, selectedColor.length > 0 && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h3", {
      className: "picker-title"
    }, "\u8FD1\u671F\u4F7F\u7528"), /*#__PURE__*/React__default["default"].createElement("ul", {
      className: "picker-list"
    }, selectedColor.map(function (color) {
      return /*#__PURE__*/React__default["default"].createElement("li", {
        key: color,
        className: "picker-item",
        onClick: function onClick() {
          setActiveColor(color);
          pushSelectedColor(color);
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: "picker-span",
        style: {
          backgroundColor: color,
          border: color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#f8f8f8' ? '1px solid #e8e8e8' : 'none'
        }
      }));
    }))), /*#__PURE__*/React__default["default"].createElement("h3", {
      className: "picker-title"
    }, "\u5168\u90E8\u989C\u8272"), /*#__PURE__*/React__default["default"].createElement("ul", {
      className: "picker-list"
    }, colorList.map(function (color) {
      return /*#__PURE__*/React__default["default"].createElement("li", {
        key: color,
        className: "picker-item ".concat(color === activeColor ? 'selected' : ''),
        onClick: function onClick() {
          setActiveColor(color);
          pushSelectedColor(color);
        }
      }, /*#__PURE__*/React__default["default"].createElement("span", {
        className: "picker-span",
        style: {
          backgroundColor: color,
          border: color.toLowerCase() === '#ffffff' || color.toLowerCase() === '#f8f8f8' ? '1px solid #e8e8e8' : 'none'
        }
      }));
    })), /*#__PURE__*/React__default["default"].createElement("p", {
      className: "picker-line"
    }), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "picker-footer"
    }, /*#__PURE__*/React__default["default"].createElement("p", {
      className: "active-color",
      style: {
        backgroundColor: activeColor
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      className: "picker-span"
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "picker-input"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      value: activeColor,
      onChange: setInputColor,
      onClick: function onClick(e) {
        return e.stopPropagation();
      }
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "picker-btn",
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        pushSelectedColor(activeColor);
      }
    }, "\u786E\u5B9A"))));
  };

  function changeRange(dom) {
    var sel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var l = dom.lastChild;
    setTimeout(function () {
      var range = new Range();
      range.setStart(l, 1);
      range.setEnd(l, 1);

      if (!sel) {
        sel = getSelection();
      }

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
  function isLastChild(node) {
    var _node$parentElement, _node$parentElement2;

    // 有时候会出现一个空文本节点的情况
    (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 ? void 0 : _node$parentElement.normalize();
    return ((_node$parentElement2 = node.parentElement) === null || _node$parentElement2 === void 0 ? void 0 : _node$parentElement2.lastChild) === node;
  }

  var insertTagType = ['img', 'hr', 'table'];
  var autoFocus = false;
  function setAutoFocus() {
    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    autoFocus = val;
  }
  var placeholderMark = "\uFEFF";
  var blockTag = 'div';
  function setBlockTag() {
    var tagname = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'div';
    blockTag = tagname;
  }

  function isEmpty(editor) {
    return editor.innerHTML === '' || editor.innerHTML === '<br>' || editor.innerHTML === "<".concat(blockTag, "><br></").concat(blockTag, ">");
  }

  function isPlaceholder(editor) {
    return editor.innerHTML === "<".concat(blockTag, ">").concat(placeholderMark, "</").concat(blockTag, ">");
  }
  /**
   * 
   * @returns 返回一个用来接收输入的，隐藏的节点
   */


  function createInnerPlaceholder() {
    var placeholderElement = document.createElement(blockTag);
    var placeholderTextNode = document.createTextNode(placeholderMark);
    placeholderElement.appendChild(placeholderTextNode);
    return placeholderElement;
  }

  function selectionInEditor(node, range) {
    var rangeContainer = range.commonAncestorContainer;
    return node === rangeContainer || isParentNode(node, rangeContainer);
  }

  var placeholderText = '请输入...';
  /**
   * 
   * @returns 返回一个用来显示的placeholder文字
   */

  function createOutterPlaceholder() {
    var placeholderNode = document.createElement(blockTag);
    placeholderNode.style.cssText = "position: absolute;\n                                    left: 20px;\n                                    top: 20px;\n                                    color: gray;\n                                    pointer-events: none;\n                                    position: absolute;";
    placeholderNode.appendChild(document.createTextNode(placeholderText));
    return placeholderNode;
  }

  function togglePlaceholder(placeholder, editor) {
    if (isEmpty(editor)) {
      placeholder.style.display = 'block';
      editor.firstChild && editor.firstChild.remove();
      var placeholderContent = createInnerPlaceholder();
      editor.appendChild(placeholderContent);
      changeRange(placeholderContent);
    } else if (!isPlaceholder(editor)) {
      placeholder.style.display = 'none';
    }
  }

  var QkEditor = /*#__PURE__*/function () {
    function QkEditor(id) {
      var _this = this;

      _classCallCheck(this, QkEditor);

      _defineProperty(this, "config", {});

      _defineProperty(this, "historyRange", []);

      _defineProperty(this, "tempNodeList", []);

      var instanceDom = document.getElementById(id);

      if (instanceDom) {
        instanceDom.style.position = 'relative';
        var editor = document.createElement('div');
        editor.contentEditable = 'true';
        editor.style.cssText = "\n                                    height: 100%;\n                                    outline: none;\n                                    overflow-y: auto;\n                                    padding: 20px;";
        instanceDom.appendChild(editor);
        this.root = editor;

        var _placeholderText = createOutterPlaceholder();

        editor.after(_placeholderText);
        this.placeholder = _placeholderText;
        var placeholderContent = createInnerPlaceholder();
        editor.appendChild(placeholderContent);

        if (autoFocus) {
          changeRange(placeholderContent);
        }

        var tempNodeList = this.tempNodeList;
        /* this.root.addEventListener('input', () => {
            togglePlaceholder(this.placeholder, this.root);
            const changeCallback = this.config.onChange;
            if (changeCallback && typeof changeCallback === 'function') {
                changeCallback(editor.innerHTML);
            }
        }); */

        /**
         * 观察编辑区域的子节点的改变，返回结果
         */

        var observerOptions = {
          childList: true,
          // 观察目标子节点的变化，是否有添加或者删除
          attributes: true,
          // 观察属性变动
          subtree: true,
          // 观察后代节点，默认为 false
          characterData: true // 监听所有字符的变化

        };
        var observer = new MutationObserver(function () {
          togglePlaceholder(_this.placeholder, editor);
          var changeCallback = _this.config.onChange;

          if (changeCallback && typeof changeCallback === 'function') {
            var res = isPlaceholder(editor) ? '' : editor.innerHTML;
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
              var currentNode = _this.root.childNodes[rg.startOffset]; // 如果是在img，hr，或者table等之类的元素后面，就新添加一个placeholderContent，并且将光标定位其上

              var _placeholderContent = createInnerPlaceholder();

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
            } // 此处应该考虑如果是 在placeholderText左或者右 ,那么应该选中之(这种情况是刚插入的空的block节点，然后鼠标光标定位，然后输入)
            //if(rg.startContainer === rg.endContainer && rg.startContainer.textContent === placeholderMark) {
            //     rg.setStart(rg.startContainer, 0);
            //     rg.setEnd(rg.startContainer, 1);
            //     editor.focus();
            //     return;
            // }
            // 不是因为插入空标签，触发的slectionchange


            if (!(rg.startContainer === rg.endContainer && rg.startContainer.textContent === placeholderMark) && rg.endOffset === 1 && rg.startOffset === 1 && tempNodeList.length > 0) {
              if (rg.commonAncestorContainer !== tempNodeList.at(-1) && !isParentNode(tempNodeList.at(-1), rg.commonAncestorContainer)) {
                tempNodeList.forEach(function (i) {
                  i.remove();
                });
              }

              tempNodeList.length = 0;

              _this.root.normalize();
            }
          }
        });
      } else {
        console.error('dom不存在！');
      }
    } // 判断当前节点是否mark状态


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
      } // 清除左边或者右边的b标签(此时node不是b状态)

    }, {
      key: "removeSiblingsMark",
      value: function removeSiblingsMark(pNode, node) {
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
        var firstNode = direction === 'left' ? pNode.firstChild : pNode.lastChild;

        while (firstNode && firstNode !== node && !isParentNode(firstNode, node)) {
          var tempNode = direction === 'left' ? firstNode.nextSibling : firstNode.previousSibling;
          this.removeAllMark(firstNode);
          firstNode = tempNode;
        } // 如果存在firstNode，并且是startNode的祖先节点


        if (firstNode && isParentNode(firstNode, node)) {
          this.removeSiblingsMark(firstNode, node, direction);
        }
      }
    }, {
      key: "addStartMark",
      value: function addStartMark(node, startNode) {
        // 移除startNode右侧的所有b标签
        if (node === startNode) {
          // 开始节点是文本节点
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
          // 此时node是一个文本节点
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
          // 排除掉选中的hr，img，table等块级节点
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
          // 此时firstChild是node的祖先节点
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
          // 此时lastChild是node的祖先节点
          this.addRightMark(pNode.lastChild, node, isContain);
        } else if (isContain) {
          bDom.prepend(node);
        }

        if (bDom.firstChild) {
          pNode.appendChild(bDom);
        }
      } // 取消分割节点右侧的所有的节点的mark状态

    }, {
      key: "removeRightMark",
      value: function removeRightMark(activeNode, cutNode) {
        while (activeNode.lastChild && activeNode.lastChild !== cutNode && !isParentNode(activeNode.lastChild, cutNode)) {
          activeNode.after(activeNode.lastChild);
        } // 把开始节点及其b标签下面的祖先节点移出b标签


        if (activeNode.lastChild !== cutNode) {
          this.addLeftMark(activeNode.lastChild, cutNode);
        }

        activeNode.after(activeNode.lastChild);

        if (!activeNode.firstChild) {
          // 如果pBdom是空的，就移除
          activeNode.remove();
        }
      } // 取消分割节点左侧的所有的节点的mark状态

    }, {
      key: "removeLeftMark",
      value: function removeLeftMark(activeNode, cutNode) {
        while (activeNode.firstChild && activeNode.firstChild !== cutNode && !isParentNode(activeNode.firstChild, cutNode)) {
          activeNode.before(activeNode.firstChild);
        }

        if (activeNode.firstChild !== cutNode) {
          this.addRightMark(activeNode.firstChild, cutNode);
        }

        activeNode.before(activeNode.firstChild); // 把开始节点及其b下面的祖先节点移出b标签

        if (!activeNode.firstChild) {
          // 如果pBdom是空的，就移除
          activeNode.remove();
        }
      }
    }, {
      key: "removeSelectedMark",
      value: function removeSelectedMark(activeNode, startNode, endNode) {
        var bDom = this.createMarkTag(); // 最后一个节点如果不是startNode或者它的祖先节点，就添加进新的activeNode

        while (activeNode.lastChild && activeNode.lastChild !== endNode && !isParentNode(activeNode.lastChild, endNode)) {
          bDom.prepend(activeNode.lastChild);
        }

        if (bDom.firstChild) {
          activeNode.after(bDom);
        } // b节点的最后一个子节点是endNode的祖先节点


        if (activeNode.lastChild !== endNode) {
          this.addRightMark(activeNode.lastChild, endNode);
        } // 最后一个节点如果不是startNode或者它的祖先节点，就移出activeNode


        while (activeNode.lastChild && activeNode.lastChild !== startNode && !isParentNode(activeNode.lastChild, startNode)) {
          activeNode.after(activeNode.lastChild);
        }

        if (activeNode.lastChild !== startNode) {
          // b节点的最后一个子节点是startNode的祖先节点
          this.addLeftMark(activeNode.lastChild, startNode);
        }

        activeNode.after(activeNode.lastChild);

        if (!activeNode.firstChild) {
          activeNode.remove();
        }
      } // 移除自身或者子节点的mark状态

    }, {
      key: "removeAllMark",
      value: function removeAllMark(node) {
        if (node.nodeType === 3) {
          return;
        }

        if (this.isActive(node)) {
          // 如果是mark，则移出所有子节点并删除当前mark节点
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
      key: "getRange",
      value: function getRange() {
        var selection = getSelection();
        /* // 没有选中页面上的任何节点
        if (selection.type === 'None') {
            this.root.focus();
            selection = getSelection()!;
        }
        let range = selection.getRangeAt(0);
        // 选中了非editor实例的dom节点
        if (!selectionInEditor(this.root, range)) {
            this.root.focus();
            selection = getSelection()!;
            range = selection.getRangeAt(0);
        } */

        var range;

        if (selection.type === 'None') {
          if (this.historyRange.length > 0) {
            range = this.historyRange.at(-1);
          } else {
            this.root.focus();
            selection = getSelection();
            range = selection.getRangeAt(0);
          }
        } else {
          range = selection.getRangeAt(0);

          if (!selectionInEditor(this.root, range)) {
            if (this.historyRange.length > 0) {
              range = this.historyRange.at(-1);
            } else {
              this.root.focus();
              selection = getSelection();
              range = selection.getRangeAt(0);
            }
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
      key: "setLink",
      value: function setLink(href) {
        if (this.historyRange.length) {
          // 想选中最后一次选择的选区，这个方案行不通。 无法选中刚失去光标的editor
          // const lastRange = this.historyRange.at(-1);
          // const sel = window.getSelection();
          // lastRange && sel?.addRange(lastRange);
          this.setTextStyle('a', null, {
            href: href
          });
        }
      }
    }, {
      key: "setTextStyle",
      value: function setTextStyle(tagName, tagStyle, tagAttr) {
        var tempNodeList = this.tempNodeList;
        this.markTag = tagName;
        this.markTagStyle = tagStyle;
        this.markTagAttr = tagAttr;
        var res = this.getRange();
        var root = res.root,
            range = res.range,
            commonNode = res.commonNode;
        var startNode = res.startNode,
            endNode = res.endNode;
        var childNodes = commonNode.childNodes; // 最深的共同祖先的子节点

        var startOffset = range.startOffset,
            endOffset = range.endOffset;
        var startNodeIdx = 0;
        var endNodeIdx = 0;

        if (startNode.nodeType !== 3) {
          return;
        }

        if (range.collapsed) {
          var placeNode = document.createTextNode(placeholderMark);

          if (this.hasActive(startNode)) {
            var activeNode = this.getActiveNode(startNode);

            if (startOffset === startNode.length) {
              var deferNode = startNode;

              while (isLastChild(deferNode) && deferNode !== activeNode) {
                deferNode = deferNode.parentElement;
              }

              if (deferNode !== activeNode) {
                activeNode.after(this.copyRightNode(activeNode, deferNode.nextSibling, true) || '');
              } // 已经加了某个状态，没有输入，直接取消的时候


              if (startNode.textContent === placeholderMark && tempNodeList.length > 0 && tempNodeList.some(function (i) {
                return i instanceof HTMLElement && i.tagName.toLowerCase() === tagName;
              })) {
                var tempActiveNode = tempNodeList.find(function (i) {
                  return i instanceof HTMLElement && i.tagName === tagName;
                });
                tempActiveNode === null || tempActiveNode === void 0 ? void 0 : tempActiveNode.remove(); // 已有的mark状态删除

                tempNodeList.push(placeNode);
                return;
              }

              activeNode.after(placeNode);
            } else if (startOffset === 0) {
              // 光标在一个文本节点的开始位置， 这种情况在chrome不存在（其他浏览器没有试过）
              // const span = document.createElement('span');
              activeNode.before(placeNode);
            } else {
              startNode = startNode.splitText(startOffset);
              activeNode.after(this.copyRightNode(activeNode, startNode, true));
              activeNode.after(placeNode);
            }

            tempNodeList.push(placeNode);
          } else {
            var markDom = this.createMarkTag();
            startNode = startNode.splitText(startOffset);
            startNode.previousSibling.after(markDom);
            markDom.appendChild(placeNode);
            tempNodeList.push(markDom);
          }

          range.setStart(placeNode, 1);
          range.setEnd(placeNode, 1);
          root.focus();
          return;
        } // 选中的是同一个文本节点


        if (startNode === endNode) {
          var _startNode$parentElem;

          if (endOffset < endNode.length) {
            endNode.splitText(endOffset);
          }

          if (startOffset > 0) {
            startNode = startNode.splitText(startOffset);
          } // 此处可以用hasActive优化


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
            // 此时pNode是b标签
            var bDom = this.createMarkTag();

            while (pNode.lastChild && pNode.lastChild !== startNode && !isParentNode(pNode.lastChild, startNode)) {
              bDom.prepend(pNode.lastChild);
            }

            if (bDom.firstChild) {
              pNode.after(bDom);
            } // pNode的最后一个节点是startNode的祖先节点


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
        } // 分割开始和结束的文本节点


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
        } // 开始node和结束node只要有一个加粗状态，就判定为加粗状态


        if (isStartActive || isEndActive) {
          if (startActiveNode === endActiveNode) {
            // 都是同一个b标签的子节点
            this.removeSelectedMark(startActiveNode, startNode, endNode);
          } else {
            var firstHandleNode = handleNodeList.shift(); // 开始节点是active状态

            if (isStartActive) {
              this.removeSiblingsMark(firstHandleNode, startActiveNode, 'right');
              this.removeRightMark(startActiveNode, startNode);
            } else {
              this.removeSiblingsMark(firstHandleNode, startNode, 'right');
            }

            var lastHandleNode = handleNodeList.pop(); // 结束节点是加粗状态

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
        var childNodes = commonNode.childNodes; // 最深的共同祖先的子节点

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
          var pNode = startNode; // 该方法假定 插入的时候光标在文本节点左右或者中间。应该考虑非文本节点的情况

          if (startOffset === 0) {
            // 光标在文本节点的开始位置(此时两种情况，1.没有任何输入 2.换行之后此时考虑上一行带下来的样式)
            while (pNode !== root && pNode.parentElement !== root) {
              pNode = pNode.parentElement;
            }
          } else if (startOffset === startNode.length) {
            // 光标在文本节点的结束位置
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
            // 光标在文本节点的中间位置
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
          // 共同节点是root
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
        } // 如果当前插入的节点是最后一个子节点


        if (dom.parentNode && dom.nextSibling === null) {
          var placeElement = document.createElement(blockTag);
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

  var PYEditor = function PYEditor() {
    var _useState = React.useState('#222'),
        _useState2 = _slicedToArray(_useState, 2),
        bgColor = _useState2[0],
        setBgColor = _useState2[1];

    var _useState3 = React.useState(false),
        _useState4 = _slicedToArray(_useState3, 2),
        displayBgColorPicker = _useState4[0],
        setDisplayBgColorPicker = _useState4[1];

    var _useState5 = React.useState('#222'),
        _useState6 = _slicedToArray(_useState5, 2),
        fontColor = _useState6[0],
        setFontColor = _useState6[1];

    var _useState7 = React.useState(false),
        _useState8 = _slicedToArray(_useState7, 2),
        displayColorPicker = _useState8[0],
        setDisplayColorPicker = _useState8[1];

    var _useState9 = React.useState(false),
        _useState10 = _slicedToArray(_useState9, 2),
        fontsizePicker = _useState10[0],
        setFontsizePicker = _useState10[1];

    var _useState11 = React.useState('14px'),
        _useState12 = _slicedToArray(_useState11, 2),
        fontSize = _useState12[0],
        setFontSize = _useState12[1];

    var _useState13 = React.useState(null),
        _useState14 = _slicedToArray(_useState13, 2),
        editorInstance = _useState14[0],
        setEditorInstance = _useState14[1];

    var hideBgColor = React.useCallback(function () {
      setDisplayBgColorPicker(false);
    }, []);
    var hideFontColor = React.useCallback(function () {
      setDisplayColorPicker(false);
    }, []);
    var changeFontSize = React.useCallback(function (val) {
      editorInstance.setTextStyle('span', {
        fontSize: val
      });
      setFontSize(val);
      setFontsizePicker(false);
    }, [editorInstance]);
    React.useEffect(function () {
      if (displayBgColorPicker) {
        window.addEventListener('click', hideBgColor);
      } else {
        window.removeEventListener('click', hideBgColor);
      }
    }, [displayBgColorPicker]);
    React.useEffect(function () {
      if (displayColorPicker) {
        window.addEventListener('click', hideFontColor);
      } else {
        window.removeEventListener('click', hideFontColor);
      }
    }, [displayColorPicker]);
    React.useEffect(function () {
      setAutoFocus(true);
      setBlockTag('p');
      var editor = new QkEditor('y-editor');

      editor.config.onChange = function (innerHtml) {
        console.log('当前编辑器的内容是', innerHtml);
      };

      setEditorInstance(editor);
    }, []);
    return /*#__PURE__*/React__default["default"].createElement("div", {
      className: "y-editor"
    }, /*#__PURE__*/React__default["default"].createElement("header", {
      className: "y-ed-bar"
    }, /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setTextStyle('b');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      stroke: "#222",
      strokeWidth: "1.5",
      fill: "none",
      fillRule: "evenodd",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M7.3 5h5.75a3.25 3.25 0 010 6.5H7.3h0V5zM7.3 11.5h6.25a3.75 3.75 0 010 7.5H7.3h0v-7.5z"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setTextStyle('span', {
          textDecoration: 'line-through'
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3 11.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z",
      fill: "#222"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M16.756 7.305C16.756 6.288 15.78 4 12.122 4 8.463 4 7.244 6.288 7.244 7.814c0 1.525.976 2.796 5.122 3.813C16.512 12.644 17 13.915 17 15.441 17 16.966 15.537 19 12.122 19S7 17.22 7 15.44",
      stroke: "#222",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setTextStyle('u');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      fill: "#222",
      x: "6.8",
      y: "18.2",
      width: "10",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M17.3 5v5.5a5.5 5.5 0 01-11 0V5",
      stroke: "#222",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setTextStyle('i');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "#222",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      x: "8.7",
      y: "4.3",
      width: "9",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("rect", {
      x: "6.7",
      y: "18.2",
      width: "9",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M12.43 4.976l1.478.26-2.43 13.788-1.478-.26z"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        setDisplayBgColorPicker(!displayBgColorPicker);
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M0 0H24V24H0z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fill: bgColor,
      d: "M5 18L19 18 19 20 5 20z"
    }), /*#__PURE__*/React__default["default"].createElement("g", {
      transform: "rotate(45 2.464 16.743)"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      width: "10",
      height: "6",
      x: ".707",
      y: ".293",
      stroke: "#222222",
      strokeWidth: "1.5",
      rx: "1"
    }), /*#__PURE__*/React__default["default"].createElement("rect", {
      width: "6",
      height: "4",
      x: "2.707",
      y: "6.293",
      stroke: "#222222",
      strokeWidth: "1.5",
      rx: "1"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fill: "#222222",
      d: "M7.207 10.293v1.742c0 .265-.106.52-.293.707l-1.207 1.207c-.343.344-.9.344-1.243 0-.165-.164-.257-.388-.257-.62v-3.036h3z"
    }))))), displayBgColorPicker && /*#__PURE__*/React__default["default"].createElement(ColorPicker, {
      slectedKey: "bgColor",
      onChange: function onChange(color) {
        setDisplayBgColorPicker(!displayBgColorPicker);
        setBgColor(color);
        editorInstance.setTextStyle('span', {
          backgroundColor: color
        });
      }
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        setDisplayColorPicker(!displayColorPicker);
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      fill: "#222222",
      d: "M7.5 11.5c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75h-7.5c-.414 0-.75-.336-.75-.75z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      stroke: "#222222",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.5",
      d: "M6 16l5.276-10.553C11.413 5.173 11.694 5 12 5s.587.173.724.447L18 16h0"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fill: fontColor,
      d: "M5 18L19 18 19 20 5 20z"
    })))), displayColorPicker && /*#__PURE__*/React__default["default"].createElement(ColorPicker, {
      slectedKey: "fontColor",
      onChange: function onChange(color) {
        setDisplayColorPicker(!displayColorPicker);
        setFontColor(color);
        editorInstance.setTextStyle('span', {
          color: color
        });
      }
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        // editorInstance.setTextStyle('a', null, { href: 'http://www.baidu.com' });
        editorInstance.setLink('www.baidu.com');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      stroke: "#222",
      strokeWidth: "1.5",
      fill: "none",
      fillRule: "evenodd",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M11.086 13.414a3.5 3.5 0 010-4.95l2.828-2.828a3.5 3.5 0 014.95 4.95l-1.06 1.06"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M13.914 10.586a3.5 3.5 0 010 4.95l-2.828 2.828a3.5 3.5 0 01-4.95-4.95l1.06-1.06"
    })))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "drop-button"
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        setFontsizePicker(!fontsizePicker);
      }
    }, fontSize), fontsizePicker && /*#__PURE__*/React__default["default"].createElement("ul", {
      className: "drop-list"
    }, /*#__PURE__*/React__default["default"].createElement("li", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        changeFontSize('14px');
      }
    }, "14px"), /*#__PURE__*/React__default["default"].createElement("li", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        changeFontSize('20px');
      }
    }, "20px"), /*#__PURE__*/React__default["default"].createElement("li", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        changeFontSize('26px');
      }
    }, "26px"), /*#__PURE__*/React__default["default"].createElement("li", {
      onMouseDown: function onMouseDown(e) {
        e.preventDefault();
        changeFontSize('32px');
      }
    }, "32px"))), /*#__PURE__*/React__default["default"].createElement("button", {
      title: "\u70AB\u5F69\u5B57\u4F53",
      onClick: function onClick() {
        editorInstance.setTextStyle('span', {
          background: 'linear-gradient(-45deg, blue, red, blue)',
          color: '#fff'
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        margin: '2px 2px',
        borderRadius: '4px',
        background: 'linear-gradient(-45deg, blue, red, blue)'
      }
    })), /*#__PURE__*/React__default["default"].createElement("button", {
      title: "\u70AB\u5F69\u5B57\u4F53",
      onClick: function onClick() {
        editorInstance.setTextStyle('span', {
          background: 'linear-gradient(-45deg, red, blue, red)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent'
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("span", {
      style: {
        display: 'inline-block',
        width: '20px',
        height: '20px',
        margin: '2px 2px',
        borderRadius: '4px',
        background: 'linear-gradient(-45deg, red, blue, red)'
      }
    })), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        backgroundColor: '#d6d6d6',
        display: 'inline-block',
        height: '16px',
        margin: '0 10px',
        width: '1px'
      }
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.insertElement('img', {
          src: 'http://www.baidu.com/img/flexible/logo/pc/result@2.png'
        }, {
          border: '1px solid #ebebeb'
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      transform: "translate(3.7 5)",
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      stroke: "#222",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      x: ".3",
      width: "16",
      height: "14",
      rx: "1"
    }), /*#__PURE__*/React__default["default"].createElement("circle", {
      fill: "#222",
      cx: "4.25",
      cy: "4.25",
      r: "1.25"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M1 12.5l7.921-5.469a3 3 0 013.977.51L16 11.14h0",
      stroke: "#222",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.insertElement('hr', {}, {
          margin: '10px 0'
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      transform: "translate(4.7 4)",
      fill: "#222",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      y: "0.5",
      width: "15",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("rect", {
      y: "7.3",
      width: "3.5",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("rect", {
      x: "6",
      y: "7.3",
      width: "3.5",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("rect", {
      x: "11.5",
      y: "7.3",
      width: "3.5",
      height: "1.5",
      rx: "0.75"
    }), /*#__PURE__*/React__default["default"].createElement("rect", {
      y: "14",
      width: "15",
      height: "1.5",
      rx: "0.75"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        var insertTable = document.createElement('table');

        for (var i = 0; i < 2; i++) {
          var insertTr = document.createElement('tr');

          for (var _i = 0; _i < 3; _i++) {
            var insertTd = document.createElement('td');
            insertTd.style.cssText = 'padding: 12px;border-right: 1px solid #ebeef5;border-bottom: 1px solid #ebeef5;height:24px;';
            insertTr.appendChild(insertTd);
          }

          insertTable.appendChild(insertTr);
        }

        editorInstance.insertElement(insertTable, {
          cellspacing: 0,
          cellpadding: '5px'
        }, {
          margin: '10px 0',
          width: '100%',
          borderLeft: '1px solid #ebeef5',
          borderTop: '1px solid #ebeef5'
        });
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "25",
      height: "24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      clipRule: "evenodd",
      d: "M4.002 6a1 1 0 011-1h14a1 1 0 011 1v12a1 1 0 01-1 1h-14a1 1 0 01-1-1V6z",
      stroke: "#222",
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M12.002 4.941v14M4.002 12h16",
      stroke: "#222",
      strokeWidth: "1.5",
      strokeLinejoin: "round"
    }))), /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        backgroundColor: '#d6d6d6',
        display: 'inline-block',
        height: '16px',
        margin: '0 10px',
        width: '1px'
      }
    }), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setParagraphStyle('text-align', 'left');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M0 0h24v24H0z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M5.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z",
      fill: "#222"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setParagraphStyle('text-align', 'center');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M0 0h24v24H0z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M8.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-3-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z",
      fill: "#222"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setParagraphStyle('text-align', 'right');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: "24",
      height: "24"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      fill: "none",
      fillRule: "evenodd"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M0 0h24v24H0z"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      d: "M10.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-5-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z",
      fill: "#222"
    })))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setParagraphStyle('text-indent', '2em');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 25 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      clipPath: "url(#sylLineIndent)"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.98642 5.25C3.98642 4.83579 4.32221 4.5 4.73642 4.5H19.2364C19.6506 4.5 19.9864 4.83579 19.9864 5.25C19.9864 5.66421 19.6506 6 19.2364 6H4.73642C4.32221 6 3.98642 5.66421 3.98642 5.25Z",
      fill: "#222222"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.98642 14.25C3.98642 13.8358 4.32221 13.5 4.73642 13.5H12.2364C12.6506 13.5 12.9864 13.8358 12.9864 14.25C12.9864 14.6642 12.6506 15 12.2364 15H4.73642C4.32221 15 3.98642 14.6642 3.98642 14.25Z",
      fill: "#222222"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.98642 9.75C3.98642 9.33579 4.32221 9 4.73642 9H12.2364C12.6506 9 12.9864 9.33579 12.9864 9.75C12.9864 10.1642 12.6506 10.5 12.2364 10.5H4.73642C4.32221 10.5 3.98642 10.1642 3.98642 9.75Z",
      fill: "#222222"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M3.98642 18.75C3.98642 18.3358 4.32221 18 4.73642 18H19.2364C19.6506 18 19.9864 18.3358 19.9864 18.75C19.9864 19.1642 19.6506 19.5 19.2364 19.5H4.73642C4.32221 19.5 3.98642 19.1642 3.98642 18.75Z",
      fill: "#222222"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      fillRule: "evenodd",
      clipRule: "evenodd",
      d: "M16.9864 14.2757C16.9864 14.543 17.3096 14.6768 17.4986 14.4879L19.7743 12.2121C19.8914 12.095 19.8914 11.905 19.7743 11.7879L17.4986 9.51211C17.3096 9.32312 16.9864 9.45697 16.9864 9.72425V11H14.4864C14.2103 11 13.9864 11.2239 13.9864 11.5V12.5C13.9864 12.7761 14.2103 13 14.4864 13H16.9864V14.2757Z",
      fill: "#222222"
    })), /*#__PURE__*/React__default["default"].createElement("defs", null, /*#__PURE__*/React__default["default"].createElement("clipPath", {
      id: "sylLineIndent"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      width: "24",
      height: "24",
      fill: "white",
      transform: "translate(0.98642)"
    }))))), /*#__PURE__*/React__default["default"].createElement("button", {
      type: "button",
      onClick: function onClick() {
        editorInstance.setParagraphStyle('text-indent', '0');
      }
    }, /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "24",
      height: "24",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("g", {
      clipPath: "url(#sylLineIndent1)"
    }, /*#__PURE__*/React__default["default"].createElement("path", {
      id: "svg_3",
      fill: "#222222",
      d: "m3.98642,5.25c0,-0.41421 0.33579,-0.75 0.75,-0.75l14.49998,0c0.4142,0 0.75,0.33579 0.75,0.75c0,0.41421 -0.3358,0.75 -0.75,0.75l-14.49998,0c-0.41421,0 -0.75,-0.33579 -0.75,-0.75z",
      clipRule: "evenodd",
      fillRule: "evenodd"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      id: "svg_4",
      fill: "#222222",
      d: "m10.653061,14.25c0,-0.4142 0.33579,-0.75 0.75,-0.75l7.49998,0c0.4142,0 0.75,0.3358 0.75,0.75c0,0.4142 -0.3358,0.75 -0.75,0.75l-7.49998,0c-0.41421,0 -0.75,-0.3358 -0.75,-0.75z",
      clipRule: "evenodd",
      fillRule: "evenodd"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      id: "svg_5",
      fill: "#222222",
      d: "m10.653061,9.75c0,-0.41421 0.33579,-0.75 0.75,-0.75l7.49998,0c0.4142,0 0.75,0.33579 0.75,0.75c0,0.4142 -0.3358,0.75 -0.75,0.75l-7.49998,0c-0.41421,0 -0.75,-0.3358 -0.75,-0.75z",
      clipRule: "evenodd",
      fillRule: "evenodd"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      id: "svg_6",
      fill: "#222222",
      d: "m3.98642,18.75c0,-0.4142 0.33579,-0.75 0.75,-0.75l14.49998,0c0.4142,0 0.75,0.3358 0.75,0.75c0,0.4142 -0.3358,0.75 -0.75,0.75l-14.49998,0c-0.41421,0 -0.75,-0.3358 -0.75,-0.75z",
      clipRule: "evenodd",
      fillRule: "evenodd"
    }), /*#__PURE__*/React__default["default"].createElement("path", {
      transform: "rotate(180 6.590969085693359,11.999979019165039) ",
      id: "svg_7",
      fill: "#222222",
      d: "m6.653107,14.2757c0,0.2673 0.3232,0.4011 0.5122,0.2122l2.2757,-2.2758c0.1171,-0.1171 0.1171,-0.3071 0,-0.4242l-2.2757,-2.27579c-0.189,-0.18899 -0.5122,-0.05514 -0.5122,0.21214l0,1.27575l-2.5,0c-0.2761,0 -0.5,0.2239 -0.5,0.5l0,1c0,0.2761 0.2239,0.5 0.5,0.5l2.5,0l0,1.2757z",
      clipRule: "evenodd",
      fillRule: "evenodd"
    })), /*#__PURE__*/React__default["default"].createElement("defs", null, /*#__PURE__*/React__default["default"].createElement("clipPath", {
      id: "sylLineIndent1"
    }, /*#__PURE__*/React__default["default"].createElement("rect", {
      width: "24",
      height: "24",
      fill: "white",
      transform: "translate(0.98642)"
    })))))), /*#__PURE__*/React__default["default"].createElement("div", {
      className: "y-ed-content",
      id: "y-editor"
    }));
  };

  ReactDOM__default["default"].render( /*#__PURE__*/React__default["default"].createElement(PYEditor, null), document.getElementById('root'));

})(React, ReactDOM);
