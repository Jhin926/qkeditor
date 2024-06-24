var QkEditor = (function () {
  'use strict';

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
      writable: !1
    }), e;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
        t && (r = t);
        var n = 0,
          F = function () {};
        return {
          s: F,
          n: function () {
            return n >= r.length ? {
              done: !0
            } : {
              done: !1,
              value: r[n++]
            };
          },
          e: function (r) {
            throw r;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o,
      a = !0,
      u = !1;
    return {
      s: function () {
        t = t.call(r);
      },
      n: function () {
        var r = t.next();
        return a = r.done, r;
      },
      e: function (r) {
        u = !0, o = r;
      },
      f: function () {
        try {
          a || null == t.return || t.return();
        } finally {
          if (u) throw o;
        }
      }
    };
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : e[r] = t, e;
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  function changeRange(dom, sel) {
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
    // 有时候会出现一个空文本节点的情况
    (_node$parentElement = node.parentElement) === null || _node$parentElement === void 0 || _node$parentElement.normalize();
    return ((_node$parentElement2 = node.parentElement) === null || _node$parentElement2 === void 0 ? void 0 : _node$parentElement2.lastChild) === node;
  }
  function isEmpty(editor) {
    var blockTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    return editor.innerHTML === '' || editor.innerHTML === '<br>' || editor.innerHTML === "<".concat(blockTag, "><br></").concat(blockTag, ">");
  }

  /**
   * 
   * @returns 返回一个用来显示placeholder文字的节点
   */
  function createOutterPlaceholder() {
    var placeholderText = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '请输入...';
    var blockTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    var placeholderNode = document.createElement(blockTag);
    placeholderNode.style.cssText = "position: absolute;\n                                    left: 20px;\n                                    top: 20px;\n                                    color: gray;\n                                    pointer-events: none;\n                                    position: absolute;";
    placeholderNode.appendChild(document.createTextNode(placeholderText));
    return placeholderNode;
  }
  var colorList = ['#222222', '#505050', '#666666', '#999999', '#cacaca', '#d8d8d8', '#e8e8e8', '#f2f2f2', '#f8f8f8', '#ffffff', '#f04142', '#eb28bd', '#8f2bff', '#1a74ff', '#00abab', '#00aa54', '#70b500', '#ffba12', '#ff7528', '#996d39', '#ffd1d1', '#ffbaef', '#e0c4ff', '#c1e1f7', '#c7f2f2', '#c2edd8', '#def7b5', '#ffebba', '#ffd8c2', '#f5d8b6', '#ff8585', '#ff87e3', '#c087ff', '#599aff', '#5ed1d1', '#69cf9c', '#acde5b', '#ffd05e', '#ffa775', '#c79254', '#ff5e5e', '#f54ccd', '#ae66ff', '#3d89ff', '#39c4c4', '#3bbf7d', '#8ecc29', '#ffc740', '#ff8e4f', '#c0833b', '#b83232', '#b31e90', '#641eb3', '#1356bd', '#008585', '#008542', '#508200', '#cc950e', '#b3521c', '#815a2c', '#7a2122', '#75145e', '#4b1785', '#0e408c', '#005c5c', '#005e2f', '#314f00', '#856109', '#662f10', '#634119'];

  var img$e = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg stroke='%23222' strokeWidth='1.5' fill='none' fillRule='evenodd' strokeLinejoin='round'%3e %3cpath d='M7.3 5h5.75a3.25 3.25 0 010 6.5H7.3h0V5zM7.3 11.5h6.25a3.75 3.75 0 010 7.5H7.3h0v-7.5z' /%3e %3c/g%3e%3c/svg%3e";

  var img$d = "data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cpath fillRule='evenodd' clipRule='evenodd' d='M3 11.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z' fill='%23222' /%3e %3cpath d='M16.756 7.305C16.756 6.288 15.78 4 12.122 4 8.463 4 7.244 6.288 7.244 7.814c0 1.525.976 2.796 5.122 3.813C16.512 12.644 17 13.915 17 15.441 17 16.966 15.537 19 12.122 19S7 17.22 7 15.44' stroke='%23222' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /%3e%3c/svg%3e";

  var img$c = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg fill='none' fillRule='evenodd'%3e %3crect fill='%23222' x='6.8' y='18.2' width='10' height='1.5' rx='0.75' /%3e %3cpath d='M17.3 5v5.5a5.5 5.5 0 01-11 0V5' stroke='%23222' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /%3e %3c/g%3e%3c/svg%3e";

  var img$b = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg fill='%23222' fillRule='evenodd'%3e %3crect x='8.7' y='4.3' width='9' height='1.5' rx='0.75' /%3e %3crect x='6.7' y='18.2' width='9' height='1.5' rx='0.75' /%3e %3cpath d='M12.43 4.976l1.478.26-2.43 13.788-1.478-.26z' /%3e %3c/g%3e%3c/svg%3e";

  var img$a = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg transform='translate(4.7 4)' fill='%23222' fillRule='evenodd'%3e %3crect y='0.5' width='15' height='1.5' rx='0.75' /%3e %3crect y='7.3' width='3.5' height='1.5' rx='0.75' /%3e %3crect x='6' y='7.3' width='3.5' height='1.5' rx='0.75' /%3e %3crect x='11.5' y='7.3' width='3.5' height='1.5' rx='0.75' /%3e %3crect y='14' width='15' height='1.5' rx='0.75' /%3e %3c/g%3e%3c/svg%3e";

  var img$9 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3e %3cg fill='none' fillRule='evenodd'%3e %3cpath d='M0 0h24v24H0z' /%3e %3cpath d='M8.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-3-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z' fill='%23222' /%3e %3c/g%3e%3c/svg%3e";

  var img$8 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3e %3cg fill='none' fillRule='evenodd'%3e %3cpath d='M0 0h24v24H0z' /%3e %3cpath d='M5.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z' fill='%23222' /%3e %3c/g%3e%3c/svg%3e";

  var img$7 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3e %3cg fill='none' fillRule='evenodd'%3e %3cpath d='M0 0h24v24H0z' /%3e %3cpath d='M10.75 5h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm0 8h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5zm-5-4h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5zm0 8h12.5a.75.75 0 010 1.5H5.75a.75.75 0 010-1.5z' fill='%23222' /%3e %3c/g%3e%3c/svg%3e";

  var img$6 = "data:image/svg+xml,%3csvg width='24' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e %3cg clipPath='url(%23sylLineIndent)'%3e %3cpath fillRule='evenodd' clipRule='evenodd' d='M3.98642 5.25C3.98642 4.83579 4.32221 4.5 4.73642 4.5H19.2364C19.6506 4.5 19.9864 4.83579 19.9864 5.25C19.9864 5.66421 19.6506 6 19.2364 6H4.73642C4.32221 6 3.98642 5.66421 3.98642 5.25Z' fill='%23222222' /%3e %3cpath fillRule='evenodd' clipRule='evenodd' d='M3.98642 14.25C3.98642 13.8358 4.32221 13.5 4.73642 13.5H12.2364C12.6506 13.5 12.9864 13.8358 12.9864 14.25C12.9864 14.6642 12.6506 15 12.2364 15H4.73642C4.32221 15 3.98642 14.6642 3.98642 14.25Z' fill='%23222222' /%3e %3cpath fillRule='evenodd' clipRule='evenodd' d='M3.98642 9.75C3.98642 9.33579 4.32221 9 4.73642 9H12.2364C12.6506 9 12.9864 9.33579 12.9864 9.75C12.9864 10.1642 12.6506 10.5 12.2364 10.5H4.73642C4.32221 10.5 3.98642 10.1642 3.98642 9.75Z' fill='%23222222' /%3e %3cpath fillRule='evenodd' clipRule='evenodd' d='M3.98642 18.75C3.98642 18.3358 4.32221 18 4.73642 18H19.2364C19.6506 18 19.9864 18.3358 19.9864 18.75C19.9864 19.1642 19.6506 19.5 19.2364 19.5H4.73642C4.32221 19.5 3.98642 19.1642 3.98642 18.75Z' fill='%23222222' /%3e %3cpath fillRule='evenodd' clipRule='evenodd' d='M16.9864 14.2757C16.9864 14.543 17.3096 14.6768 17.4986 14.4879L19.7743 12.2121C19.8914 12.095 19.8914 11.905 19.7743 11.7879L17.4986 9.51211C17.3096 9.32312 16.9864 9.45697 16.9864 9.72425V11H14.4864C14.2103 11 13.9864 11.2239 13.9864 11.5V12.5C13.9864 12.7761 14.2103 13 14.4864 13H16.9864V14.2757Z' fill='%23222222' /%3e %3c/g%3e %3cdefs%3e%3cclipPath id='sylLineIndent'%3e%3crect width='24' height='24' fill='white' transform='translate(0.98642)' /%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

  var img$5 = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg clipPath='url(%23sylLineIndent1)'%3e %3cpath id='svg_3' fill='%23222222' d='m3.98642%2c5.25c0%2c-0.41421 0.33579%2c-0.75 0.75%2c-0.75l14.49998%2c0c0.4142%2c0 0.75%2c0.33579 0.75%2c0.75c0%2c0.41421 -0.3358%2c0.75 -0.75%2c0.75l-14.49998%2c0c-0.41421%2c0 -0.75%2c-0.33579 -0.75%2c-0.75z' clipRule='evenodd' fillRule='evenodd' /%3e %3cpath id='svg_4' fill='%23222222' d='m10.653061%2c14.25c0%2c-0.4142 0.33579%2c-0.75 0.75%2c-0.75l7.49998%2c0c0.4142%2c0 0.75%2c0.3358 0.75%2c0.75c0%2c0.4142 -0.3358%2c0.75 -0.75%2c0.75l-7.49998%2c0c-0.41421%2c0 -0.75%2c-0.3358 -0.75%2c-0.75z' clipRule='evenodd' fillRule='evenodd' /%3e %3cpath id='svg_5' fill='%23222222' d='m10.653061%2c9.75c0%2c-0.41421 0.33579%2c-0.75 0.75%2c-0.75l7.49998%2c0c0.4142%2c0 0.75%2c0.33579 0.75%2c0.75c0%2c0.4142 -0.3358%2c0.75 -0.75%2c0.75l-7.49998%2c0c-0.41421%2c0 -0.75%2c-0.3358 -0.75%2c-0.75z' clipRule='evenodd' fillRule='evenodd' /%3e %3cpath id='svg_6' fill='%23222222' d='m3.98642%2c18.75c0%2c-0.4142 0.33579%2c-0.75 0.75%2c-0.75l14.49998%2c0c0.4142%2c0 0.75%2c0.3358 0.75%2c0.75c0%2c0.4142 -0.3358%2c0.75 -0.75%2c0.75l-14.49998%2c0c-0.41421%2c0 -0.75%2c-0.3358 -0.75%2c-0.75z' clipRule='evenodd' fillRule='evenodd' /%3e %3cpath transform='rotate(180 6.590969085693359%2c11.999979019165039) ' id='svg_7' fill='%23222222' d='m6.653107%2c14.2757c0%2c0.2673 0.3232%2c0.4011 0.5122%2c0.2122l2.2757%2c-2.2758c0.1171%2c-0.1171 0.1171%2c-0.3071 0%2c-0.4242l-2.2757%2c-2.27579c-0.189%2c-0.18899 -0.5122%2c-0.05514 -0.5122%2c0.21214l0%2c1.27575l-2.5%2c0c-0.2761%2c0 -0.5%2c0.2239 -0.5%2c0.5l0%2c1c0%2c0.2761 0.2239%2c0.5 0.5%2c0.5l2.5%2c0l0%2c1.2757z' clipRule='evenodd' fillRule='evenodd' /%3e %3c/g%3e %3cdefs%3e%3cclipPath id='sylLineIndent1'%3e%3crect width='24' height='24' fill='white' transform='translate(0.98642)' /%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";

  var img$4 = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg transform='translate(3.7 5)' fill='none' fillRule='evenodd'%3e %3crect stroke='%23222' strokeWidth='1.5' strokeLinejoin='round' x='.3' width='16' height='14' rx='1' /%3e %3ccircle fill='%23222' cx='4.25' cy='4.25' r='1.25' /%3e %3cpath d='M1 12.5l7.921-5.469a3 3 0 013.977.51L16 11.14h0' stroke='%23222' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' /%3e %3c/g%3e%3c/svg%3e";

  var img$3 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' fill='none' version='1.1' width='16' height='16' viewBox='0 0 16 16'%3e%3cdefs%3e%3cclipPath id='master_svg0_233_61584'%3e%3crect x='0' y='0' width='16' height='16' rx='0'/%3e%3c/clipPath%3e%3c/defs%3e%3cg clip-path='url(%23master_svg0_233_61584)'%3e%3cg%3e%3cpath d='M6.6663378125%2c4.000078046875L6.6663378125%2c14.000048046875L5.3330078125%2c14.000048046875L5.3330078125%2c4.000078046875L1.3330078125%2c4.000078046875L1.3330078125%2c2.666748046875L10.6663378125%2c2.666748046875L10.6663378125%2c4.000078046875L6.6663378125%2c4.000078046875ZM11.9997078125%2c9.333418046875L11.9997078125%2c14.000048046875L10.6663378125%2c14.000048046875L10.6663378125%2c9.333418046875L8.6663378125%2c9.333418046875L8.6663378125%2c8.000078046875L13.9997078125%2c8.000078046875L13.9997078125%2c9.333418046875L11.9997078125%2c9.333418046875Z' fill='black' fill-opacity='1'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e";

  var img$2 = "data:image/svg+xml,%3csvg width='24' height='24' xmlns='http://www.w3.org/2000/svg'%3e %3cg stroke='%23222' strokeWidth='1.5' fill='none' fillRule='evenodd' strokeLinecap='round' strokeLinejoin='round'%3e %3cpath d='M11.086 13.414a3.5 3.5 0 010-4.95l2.828-2.828a3.5 3.5 0 014.95 4.95l-1.06 1.06' /%3e %3cpath d='M13.914 10.586a3.5 3.5 0 010 4.95l-2.828 2.828a3.5 3.5 0 01-4.95-4.95l1.06-1.06' /%3e %3c/g%3e%3c/svg%3e";

  var img$1 = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e %3cg fill='none' fillRule='evenodd'%3e %3cpath fill='%23222222' d='M7.5 11.5c0-.414.336-.75.75-.75h7.5c.414 0 .75.336.75.75s-.336.75-.75.75h-7.5c-.414 0-.75-.336-.75-.75z' /%3e %3cpath stroke='%23222222' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M6 16l5.276-10.553C11.413 5.173 11.694 5 12 5s.587.173.724.447L18 16h0' /%3e %3cpath fill='%23222222' d='M5 18L19 18 19 20 5 20z' /%3e %3c/g%3e%3c/svg%3e";

  var img = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3e %3cg fill='none' fillRule='evenodd'%3e %3cpath d='M0 0H24V24H0z' /%3e %3cpath fill='%23222222' d='M5 18L19 18 19 20 5 20z' /%3e %3cg transform='rotate(45 2.464 16.743)'%3e %3crect width='10' height='6' x='.707' y='.293' stroke='%23222222' strokeWidth='1.5' rx='1' /%3e %3crect width='6' height='4' x='2.707' y='6.293' stroke='%23222222' strokeWidth='1.5' rx='1' /%3e %3cpath fill='%23222222' d='M7.207 10.293v1.742c0 .265-.106.52-.293.707l-1.207 1.207c-.343.344-.9.344-1.243 0-.165-.164-.257-.388-.257-.62v-3.036h3z' /%3e %3c/g%3e %3c/g%3e%3c/svg%3e";

  var setBold = function setBold(editor) {
    editor.setTextStyle('b');
  };
  var setStrike = function setStrike(editor) {
    editor.setTextStyle('span', {
      textDecoration: 'line-through'
    });
  };
  var setUnderline = function setUnderline(editor) {
    editor.setTextStyle('u');
  };
  var setItalic = function setItalic(editor) {
    editor.setTextStyle('i');
  };
  var setSplitLine = function setSplitLine(editor) {
    editor.insertElement('hr', {}, {
      margin: '10px 0'
    });
  };
  var setAlignCenter = function setAlignCenter(editor) {
    editor.setParagraphStyle('text-align', 'center');
  };
  var setAlignLeft = function setAlignLeft(editor) {
    editor.setParagraphStyle('text-align', 'left');
  };
  var setAlignRight = function setAlignRight(editor) {
    editor.setParagraphStyle('text-align', 'right');
  };
  var setIndentRight = function setIndentRight(editor) {
    editor.setParagraphStyle('text-indent', '1em');
  };
  var setIndentLeft = function setIndentLeft(editor) {
    editor.setParagraphStyle('text-indent', '0');
  };
  var showImage = function showImage(editor, toolbarItem) {
    var toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    toolbarPop.innerHTML = "\n        <div class=\"qk-pop-item qk-pop-image\">\u672C\u5730\u4E0A\u4F20</div>\n        <div class=\"qk-pop-item qk-pop-image\">\u7F51\u7EDC\u56FE\u7247</div>\n    ";
    toolbarPop.onclick = function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.innerHTML === '网络图片') {
        var imgInputContainer = document.createElement('div');
        imgInputContainer.className = 'qk-editor-modal';
        imgInputContainer.innerHTML = "\n                <div class=\"qk-modal-input\">\n                    <label>\u56FE\u7247\u5730\u5740</label>\n                    <input type='text' id=\"qkEditorImgPath\" placeholder=\"\u8BF7\u8F93\u5165\u56FE\u7247\u5730\u5740\" />\n                </div>\n                <div class=\"qk-modal-input\">\n                    <label>\u56FE\u7247\u63CF\u8FF0</label>\n                    <input type='text' id=\"qkEditorImgAlt\" placeholder=\"\u8BF7\u8F93\u5165\u56FE\u7247\u63CF\u8FF0\" />\n                </div>\n                <div>\n                    <button class=\"qk-button-primary\">\u786E\u5B9A</button>\n                    <button>\u53D6\u6D88</button>\n                </div>\n            ";
        editor.root.after(imgInputContainer);
        imgInputContainer.onclick = function (event) {
          if (event.target.tagName.toUpperCase() === 'BUTTON') {
            editor.insertImg(imgInputContainer.querySelector('#qkEditorImgPath').value, {}, {
              alt: imgInputContainer.querySelector('#qkEditorImgAlt').value
            });
            var p = imgInputContainer.parentNode;
            if (p) {
              p.removeChild(imgInputContainer);
            }
          }
        };
      } else {
        var imgInput = document.createElement('input');
        imgInput.type = 'file';
        imgInput.accept = 'image/*';
        imgInput.click();
        imgInput.addEventListener('change', function (event) {
          var file = event.target.files[0];
          var reader = new FileReader();
          reader.onload = function (e) {
            if (cfg.customUploadImg) {
              var insertImgFn = function insertImgFn(src) {
                editor.insertImg(src);
              };
              cfg.customUploadImg(e.target.result, insertImgFn);
            } else {
              editor.insertImg(e.target.result);
            }
          };
          reader.readAsDataURL(file);
        });
      }
    };
    toolbarItem.appendChild(toolbarPop);
  };
  var showFontsize = function showFontsize(editor, toolbarItem) {
    var toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    toolbarPop.innerHTML = "\n        <div class=\"qk-pop-item qk-pop-fontsize\">12px</div>\n        <div class=\"qk-pop-item qk-pop-fontsize\">14px</div>\n        <div class=\"qk-pop-item qk-pop-fontsize\">16px</div>\n        <div class=\"qk-pop-item qk-pop-fontsize\">18px</div>\n        <div class=\"qk-pop-item qk-pop-fontsize\">22px</div>\n        <div class=\"qk-pop-item qk-pop-fontsize\">26px</div>\n        <div class=\"qk-pop-item qk-pop-fontsize\">30px</div>\n    ";
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      editor.setTextStyle('span', {
        fontSize: e.target.innerHTML
      });
    });
  };
  var showLink = function showLink(editor, toolbarItem) {
    var toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    toolbarPop.innerHTML = "\n        <div class=\"qk-pop-item qk-pop-input\">\n            <input class=\"qk-editor-input\" type=\"text\" placeholder=\"\u8BF7\u8F93\u5165\u94FE\u63A5\u5730\u5740\" />\n            <button class=\"qk-button-primary\">\u786E\u5B9A</button>\n        </div>\n    ";
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.target.tagName.toUpperCase() === 'BUTTON') {
        var ipt = toolbarPop.querySelector('input');
        editor.setTextStyle('a', null, {
          href: ipt.value,
          target: '_blank'
        });
      }
    });
  };
  var showFontColor = function showFontColor(editor, toolbarItem) {
    var toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    // toolbarPop.style.display = 'block';
    var colorListDom = colorList.map(function (i) {
      return "\n        <li class=\"qk-colorpicker-item\">\n            <span class=\"qk-colorpicker-span\" data-color=\"".concat(i, "\" style=\"background:").concat(i, "\"/>\n        </li>");
    }).join('');
    toolbarPop.innerHTML = "\n        <div class=\"qk-colorpicker\">\n            <div class=\"qk-colorpicker-inner\">\n                <h3 class=\"qk-colorpicker-title\">\u5168\u90E8\u989C\u8272</h3>\n                <ul class=\"qk-colorpicker-list\">\n                    ".concat(colorListDom, "\n                </ul>\n                <p class=\"qk-colorpicker-line\" />\n                <div class=\"qk-colorpicker-footer\">\n                    <p class=\"active-color\" id=\"qk-colorpicker-selected\">\n                        <span class=\"qk-colorpicker-span\" />\n                    </p>\n                    <div class=\"qk-colorpicker-input\">\n                        <input id=\"qk-colorpicker-value\" type=\"text\" />\n                    </div>\n                    <div class=\"qk-colorpicker-btn\">\n                        \u786E\u5B9A\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var tg = e.target;
      if (tg.className === 'qk-colorpicker-span') {
        var currentColor = tg.getAttribute('data-color');
        editor.setTextStyle('span', {
          color: currentColor
        });
        toolbarItem.querySelector('#qk-colorpicker-selected').style.background = currentColor;
        toolbarItem.querySelector('#qk-colorpicker-value').value = currentColor;
      }
    });
  };
  var showBgColor = function showBgColor(editor, toolbarItem) {
    var toolbarPop = document.createElement('div');
    toolbarPop.className = 'qk-toolbar-pop';
    // toolbarPop.style.display = 'block';
    var colorListDom = colorList.map(function (i) {
      return "\n        <li class=\"qk-colorpicker-item\">\n            <span class=\"qk-colorpicker-span\" data-color=\"".concat(i, "\" style=\"background:").concat(i, "\"/>\n        </li>");
    }).join('');
    toolbarPop.innerHTML = "\n        <div class=\"qk-colorpicker\">\n            <div class=\"qk-colorpicker-inner\">\n                <h3 class=\"qk-colorpicker-title\">\u5168\u90E8\u989C\u8272</h3>\n                <ul class=\"qk-colorpicker-list\">\n                    ".concat(colorListDom, "\n                </ul>\n                <p class=\"qk-colorpicker-line\" />\n                <div class=\"qk-colorpicker-footer\">\n                    <p class=\"active-color\" id=\"qk-colorpicker-selected\">\n                        <span class=\"qk-colorpicker-span\" />\n                    </p>\n                    <div class=\"qk-colorpicker-input\">\n                        <input id=\"qk-colorpicker-value\" type=\"text\" />\n                    </div>\n                    <div class=\"qk-colorpicker-btn\">\n                        \u786E\u5B9A\n                    </div>\n                </div>\n            </div>\n        </div>\n    ");
    toolbarItem.appendChild(toolbarPop);
    toolbarPop.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var tg = e.target;
      if (tg.className === 'qk-colorpicker-span') {
        var currentColor = tg.getAttribute('data-color');
        editor.setTextStyle('span', {
          background: currentColor
        });
        toolbarItem.querySelector('#qk-colorpicker-selected').style.background = currentColor;
        toolbarItem.querySelector('#qk-colorpicker-value').value = currentColor;
      }
    });
  };
  var QKToolbar = /*#__PURE__*/_createClass(function QKToolbar(dom, config) {
    var _this = this;
    _classCallCheck(this, QKToolbar);
    _defineProperty(this, "menus", ['bold', 'head', 'fontSize', 'fontName', 'italic', 'underline', 'strike', 'indent', 'lineHeight', 'fontColor', 'backColor', 'link', 'list', 'todo', 'justify', 'quote', 'emoticon', 'image', 'video', 'table', 'code', 'splitLine', 'undo', 'redo', 'alignCenter', 'alignLeft', 'alignRight', 'indentRight', 'indentLeft']);
    _defineProperty(this, "configMap", {
      alignCenter: {
        icon: img$9,
        fn: setAlignCenter
      },
      alignLeft: {
        icon: img$8,
        fn: setAlignLeft
      },
      alignRight: {
        icon: img$7,
        fn: setAlignRight
      },
      bold: {
        icon: img$e,
        fn: setBold
      },
      italic: {
        icon: img$b,
        fn: setItalic
      },
      indentLeft: {
        icon: img$5,
        fn: setIndentLeft
      },
      indentRight: {
        icon: img$6,
        fn: setIndentRight
      },
      splitLine: {
        icon: img$a,
        fn: setSplitLine
      },
      strike: {
        icon: img$d,
        fn: setStrike
      },
      underline: {
        icon: img$c,
        fn: setUnderline
      },
      image: {
        icon: img$4,
        fn: showImage
      },
      fontSize: {
        icon: img$3,
        fn: showFontsize
      },
      link: {
        icon: img$2,
        fn: showLink
      },
      fontColor: {
        icon: img$1,
        fn: showFontColor
      },
      backColor: {
        icon: img,
        fn: showBgColor
      }
    });
    _defineProperty(this, "editor", void 0);
    var cfg = config.option || this.menus;
    this.editor = config.editor;
    if (!this.editor) {
      console.log('toolbar找不到editor');
    }
    var instanceDom = typeof dom === 'string' ? document.getElementById(dom) : dom;
    if (instanceDom) {
      var _iterator = _createForOfIteratorHelper(cfg),
        _step;
      try {
        var _loop = function _loop() {
          var i = _step.value;
          if (_this.configMap[i]) {
            var toolbarItem = document.createElement('div');
            toolbarItem.className = 'qk-toolbar-menu';
            var toolbarImg = document.createElement('img');
            toolbarImg.src = _this.configMap[i].icon;
            toolbarItem.appendChild(toolbarImg);
            // 插入图片相关处理
            if (i === 'image') {
              _this.configMap[i].fn(_this.editor, toolbarItem);
            } else if (i === 'fontSize') {
              _this.configMap[i].fn(_this.editor, toolbarItem);
            } else if (i === 'link') {
              _this.configMap[i].fn(_this.editor, toolbarItem);
            } else if (i === 'fontColor') {
              _this.configMap[i].fn(_this.editor, toolbarItem);
            } else if (i === 'backColor') {
              _this.configMap[i].fn(_this.editor, toolbarItem);
            } else {
              toolbarItem.onclick = function () {
                _this.configMap[i].fn(_this.editor);
              };
            }
            instanceDom.appendChild(toolbarItem);
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  });

  var insertTagType = ['img', 'hr', 'table'];
  var placeholderMark = "\uFEFF";
  function isPlaceholder(editor) {
    var blockTag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
    return editor.innerHTML === "<".concat(blockTag, ">").concat(placeholderMark, "</").concat(blockTag, ">");
  }

  /**
   * 
   * @returns 返回一个用来接收输入的，隐藏的节点
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
    placeholderText: '请输入...'
    // uploadConfig: {}
  };
  var QkContent = /*#__PURE__*/function () {
    // tempNodeList: (HTMLElement|Text)[] = [];

    function QkContent(dom) {
      var _this = this;
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      _classCallCheck(this, QkContent);
      _defineProperty(this, "blockTag", 'div');
      _defineProperty(this, "historyRange", []);
      _defineProperty(this, "markTag", void 0);
      _defineProperty(this, "markTagAttr", void 0);
      _defineProperty(this, "markTagStyle", void 0);
      _defineProperty(this, "placeholder", void 0);
      _defineProperty(this, "root", void 0);
      _defineProperty(this, "imgControl", null);
      var option = Object.assign({}, defaultConfig, config);
      this.blockTag = option.blockTag;
      var instanceDom = typeof dom === 'string' ? document.getElementById(dom) : dom;
      if (instanceDom) {
        instanceDom.style.position = 'relative';
        var editor = document.createElement('div');
        editor.className = "qk-editor-content";
        editor.contentEditable = true;
        instanceDom.appendChild(editor);
        this.root = editor;
        var placeholderText = createOutterPlaceholder(option.placeholderText, option.blockTag);
        editor.after(placeholderText);
        this.placeholder = placeholderText;
        var placeholderContent = createInnerPlaceholder(this.blockTag);
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
              var currentNode = _this.root.childNodes[rg.startOffset];
              // 如果是在img，hr，或者table等之类的元素后面，就新添加一个placeholderContent，并且将光标定位其上
              var _placeholderContent = createInnerPlaceholder(option.blockTag);
              _this.root.insertBefore(_placeholderContent, currentNode);
              changeRange(_placeholderContent, sel);
            }
          }
        });
        this.root.addEventListener('paste', function (e) {
          var _iterator = _createForOfIteratorHelper(e.clipboardData.items),
            _step;
          try {
            var _loop = function _loop() {
              var item = _step.value;
              // 粘贴板如果是图片，就转成base64，其他类型暂不处理
              if (item.kind === 'file') {
                e.preventDefault();
                if (item.type.indexOf('image/') > -1) {
                  if (option.uploadConfig) {} else {
                    var onFileReader = new FileReader();
                    onFileReader.onloadend = function () {
                      onFileReader.result && _this.insertImg(onFileReader.result);
                    };
                    onFileReader.readAsDataURL(item.getAsFile()); // 转成base64
                    // onFileReader.readAsArrayBuffer(item.getAsFile()!);
                  }
                }
              }
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
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
    return _createClass(QkContent, [{
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
      }

      // 清除左边或者右边的active标签(此时node不是active状态)
    }, {
      key: "removeSiblingsMark",
      value: function removeSiblingsMark(pNode, node) {
        var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'left';
        var firstNode = direction === 'left' ? pNode.firstChild : pNode.lastChild;
        while (firstNode && firstNode !== node && !isParentNode(firstNode, node)) {
          var tempNode = direction === 'left' ? firstNode.nextSibling : firstNode.previousSibling;
          this.removeAllMark(firstNode);
          firstNode = tempNode;
        }
        // 如果存在firstNode，并且是startNode的祖先节点
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
      }

      // 取消分割节点右侧的所有的节点的mark状态
    }, {
      key: "removeRightMark",
      value: function removeRightMark(activeNode, cutNode) {
        while (activeNode.lastChild && activeNode.lastChild !== cutNode && !isParentNode(activeNode.lastChild, cutNode)) {
          activeNode.after(activeNode.lastChild);
        }
        // 把开始节点及其b标签下面的祖先节点移出b标签
        if (activeNode.lastChild !== cutNode) {
          this.addLeftMark(activeNode.lastChild, cutNode);
        }
        activeNode.after(activeNode.lastChild);
        if (!activeNode.firstChild) {
          // 如果pBdom是空的，就移除
          activeNode.remove();
        }
      }

      // 取消分割节点左侧的所有的节点的mark状态
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
        var bDom = this.createMarkTag();

        // 最后一个节点如果不是startNode或者它的祖先节点，就添加进新的activeNode
        while (activeNode.lastChild && activeNode.lastChild !== endNode && !isParentNode(activeNode.lastChild, endNode)) {
          bDom.prepend(activeNode.lastChild);
        }
        if (bDom.firstChild) {
          activeNode.after(bDom);
        }
        // b节点的最后一个子节点是endNode的祖先节点
        if (activeNode.lastChild !== endNode) {
          this.addRightMark(activeNode.lastChild, endNode);
        }
        // 最后一个节点如果不是startNode或者它的祖先节点，就移出activeNode
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
      }

      // 移除自身或者子节点的mark状态
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
        var range;
        // 没有选中页面上的任何节点
        if (selection.type === 'None') {
          range = this.setRange();
        } else {
          range = selection.getRangeAt(0);
          // 光标不在当前editor
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
        var childNodes = commonNode.childNodes; // 最深的共同祖先的子节点
        var startOffset = range.startOffset,
          endOffset = range.endOffset;
        var startNodeIdx = 0;
        var endNodeIdx = 0;
        if (startNode.nodeType !== 3) {
          return;
        }

        // 选区重合(没有选中任何文本)
        if (range.collapsed) {
          var placeNode = document.createTextNode(placeholderMark);
          // active状态
          if (this.hasActive(startNode)) {
            var activeNode = this.getActiveNode(startNode);
            // 光标在文本节点的结束位置
            if (startOffset === startNode.length) {
              var deferNode = startNode;
              while (isLastChild(deferNode) && deferNode !== activeNode) {
                deferNode = deferNode.parentElement;
              }
              if (deferNode !== activeNode) {
                activeNode.after(this.copyRightNode(activeNode, deferNode.nextSibling, true) || '');
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
            } else if (startOffset === 0) {
              // 光标在一个文本节点的开始位置， 这种情况在chrome不存在（其他浏览器没有试过）
              activeNode.before(placeNode);
            } else {
              startNode = startNode.splitText(startOffset);
              activeNode.after(this.copyRightNode(activeNode, startNode, true));
              activeNode.after(placeNode);
            }

            // tempNodeList.push(placeNode);
          } else {
            var markDom = this.createMarkTag();
            startNode = startNode.splitText(startOffset);
            startNode.previousSibling.after(markDom);
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
          var _startNode$parentElem;
          if (endOffset < endNode.length) {
            endNode.splitText(endOffset);
          }
          if (startOffset > 0) {
            startNode = startNode.splitText(startOffset);
          }

          // 此处可以用hasActive优化
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
            }
            // pNode的最后一个节点是startNode的祖先节点
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
          (_startNode$parentElem = startNode.parentElement) === null || _startNode$parentElem === void 0 || _startNode$parentElem.normalize();
          root.focus();
          return;
        }
        // 分割开始和结束的文本节点
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
        }
        // 开始node和结束node只要有一个active状态，就判定为active状态
        if (isStartActive || isEndActive) {
          if (startActiveNode === endActiveNode) {
            // 都是同一个active标签的子节点
            this.removeSelectedMark(startActiveNode, startNode, endNode);
          } else {
            var firstHandleNode = handleNodeList.shift();
            // 开始节点是active状态
            if (isStartActive) {
              this.removeSiblingsMark(firstHandleNode, startActiveNode, 'right');
              this.removeRightMark(startActiveNode, startNode);
            } else {
              this.removeSiblingsMark(firstHandleNode, startNode, 'right');
            }
            var lastHandleNode = handleNodeList.pop();
            // 结束节点是加粗状态
            if (isEndActive) {
              this.removeSiblingsMark(lastHandleNode, endActiveNode);
              this.removeLeftMark(endActiveNode, endNode);
            } else {
              this.removeSiblingsMark(lastHandleNode, endNode);
            }
            var _iterator2 = _createForOfIteratorHelper(handleNodeList),
              _step2;
            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _i2 = _step2.value;
                this.removeAllMark(_i2);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }
          }
        } else {
          this.addStartMark(handleNodeList.shift(), startNode);
          this.addEndMark(handleNodeList.pop(), endNode);
          var _iterator3 = _createForOfIteratorHelper(handleNodeList),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var _i3 = _step3.value;
              this.addMark(_i3);
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
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
        });
        Object.keys(style).forEach(function (k) {
          dom.style[k] = style[k];
        });
        if (range.collapsed) {
          var pNode = startNode;
          // 该方法假定 插入的时候光标在文本节点左右或者中间。应该考虑非文本节点的情况

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
        }
        // 如果当前插入的节点是最后一个子节点
        if (dom.parentNode && dom.nextSibling === null) {
          var placeElement = document.createElement(this.blockTag);
          placeElement.appendChild(document.createTextNode(placeholderMark));
          dom.after(placeElement);
        }
        // togglePlaceholder(this.placeholder, root);
        root.focus();
      }
    }, {
      key: "insertImg",
      value: function insertImg(src) {
        var imgDom = document.createElement('img');
        imgDom.src = src;
        imgDom.onload = function () {
          imgDom.onmouseover = function () {
            imgDom.style.boxShadow = '0 0 5px rgba(0,0,0,.3)';
          };
          imgDom.onmouseout = function () {
            imgDom.style.boxShadow = 'none';
          };
          imgDom.style.cssText = "\n                width:50%;\n                cursor:pointer;\n                border-radius: 4px;\n            ";
        };
        var root = this.root;
        var rootParent = root.parentNode;
        imgDom.addEventListener('click', function (imgE) {
          imgE.preventDefault();
          imgE.stopPropagation();
          var imgControlTop = imgDom.offsetTop;
          var imgControlLeft = imgDom.offsetLeft;
          var p = imgDom.parentNode;
          while (p !== root) {
            imgControlTop += p.offsetTop;
            imgControlLeft += p.offsetLeft;
          }
          var imgControl = document.createElement('div');
          imgControl.className = "qk-img-control";
          imgControl.style.cssText = "\n                top: ".concat(imgControlTop, "px;\n                left: ").concat(imgControlLeft, "px;\n                width: ").concat(imgDom.clientWidth, "px;\n                height: ").concat(imgDom.clientHeight, "px;\n            ");
          imgControl.innerHTML = "\n                <span class=\"qk-img-contol-hook top-left\"></span>\n                <span class=\"qk-img-contol-hook top-right\"></span>\n                <span class=\"qk-img-contol-hook bottom-left\"></span>\n                <span class=\"qk-img-contol-hook bottom-right\"></span>\n            ";
          var toggleImgControl = function toggleImgControl(e) {
            var clsName = e.target.className;
            if (clsName.indexOf('qk-img-contol-hook') < 0 && clsName.indexOf('qk-img-control') < 0) {
              if (rootParent.querySelector('.qk-img-control')) {
                rootParent.removeChild(imgControl);
                rootParent.removeEventListener('click', toggleImgControl);
              }
            }
          };
          rootParent.addEventListener('click', toggleImgControl);
          imgControl.addEventListener('mousedown', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var currentNode = event.target;
            var clsName = currentNode.className;
            if (clsName.indexOf('qk-img-contol-hook') > -1) {
              // 点击的是四个操作点
              var initWidth = imgControl.clientWidth;
              var initHeight = imgControl.clientHeight;
              var getDistance = function getDistance(e) {
                e.preventDefault();
                e.stopPropagation();
                var distance = e.screenX - event.screenX;
                if (clsName.indexOf('left') > -1) {
                  distance = -distance;
                }
                imgControl.style.width = initWidth + distance + 'px';
                imgDom.style.width = initWidth + distance + 'px';
                imgControl.style.height = (initWidth + distance) / initWidth * initHeight + 'px';
              };
              var removeEventFn = function removeEventFn(e) {
                e.preventDefault();
                e.stopPropagation();
                rootParent.removeEventListener('mousemove', getDistance);
                rootParent.removeEventListener('mouseup', removeEventFn);
                rootParent.removeEventListener('mouseleave', removeEventFn);
              };
              rootParent.addEventListener('mousemove', getDistance);
              rootParent.addEventListener('mouseup', removeEventFn);
              rootParent.addEventListener('mouseleave', removeEventFn);
            }
          });
          root.after(imgControl);
        });
        this.insertElement(imgDom);
      }
    }, {
      key: "setEditorContent",
      value: function setEditorContent(val) {
        this.root.innerHTML = val;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.root.innerHTML = '';
        // togglePlaceholder(this.placeholder, this.root);
        this.root.focus();
      }
    }]);
  }();

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;
    if (!css || typeof document === 'undefined') {
      return;
    }
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".qk-editor {\n  border: 1px solid #ddd;\n  border-radius: 5px;\n}\n.qk-editor h1,\n.qk-editor h2,\n.qk-editor h3,\n.qk-editor h4,\n.qk-editor h5,\n.qk-editor h6 {\n  font-size: inherit;\n  font-weight: normal;\n  margin: 0;\n  padding: 0;\n}\n.qk-editor ul,\n.qk-editor li {\n  padding: 0;\n  margin: 0;\n  list-style: none;\n}\n.qk-editor input {\n  border: 1px solid #ddd;\n  padding: 6px 10px;\n  outline: none;\n  border-radius: 5px;\n}\n.qk-editor button {\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 5px;\n  padding: 5px 15px;\n  cursor: pointer;\n}\n.qk-editor button:hover {\n  background-color: #ddd;\n}\n.qk-editor .qk-button-primary {\n  background-color: #589ff8;\n  color: #fff;\n}\n.qk-editor .qk-button-primary:hover {\n  background-color: #66b1ff;\n}\n.qk-editor .qk-editor-toolbar {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  border-bottom: 1px solid #ddd;\n  font-size: 14px;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu {\n  display: flex;\n  align-items: center;\n  padding: 5px;\n  cursor: pointer;\n  border-radius: 3px;\n  position: relative;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop {\n  display: none;\n  text-align: center;\n  border: 1px solid #ddd;\n  background-color: #fff;\n  position: absolute;\n  left: 0;\n  top: 100%;\n  z-index: 999;\n  border-radius: 5px;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-item {\n  padding: 6px 0;\n  border-bottom: 1px solid #ddd;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-item:last-child {\n  border-bottom: none;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-image {\n  width: 100px;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-image:hover {\n  background-color: #f0f0f0;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-fontsize {\n  padding: 8px 16px;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-fontsize:hover {\n  background-color: #f0f0f0;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-input {\n  padding: 8px 16px;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu .qk-toolbar-pop .qk-pop-input input {\n  border: 1px solid #ddd;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu:hover {\n  background-color: #f3f3f3;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu:hover .qk-toolbar-pop {\n  display: block;\n}\n.qk-editor .qk-editor-toolbar > .qk-toolbar-menu > img {\n  width: 16px;\n  height: 16px;\n}\n.qk-editor .qk-editor-toolbar .qk-editor-input {\n  border: none;\n  background-color: #fff;\n  outline: none;\n  padding: 6px 16px;\n}\n.qk-editor .qk-editor-content {\n  height: 100%;\n  box-sizing: border-box;\n  outline: none;\n  padding: 20px;\n}\n.qk-editor .qk-img-control {\n  position: absolute;\n}\n.qk-editor .qk-img-control .qk-img-contol-hook {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background-color: #5491f0;\n  cursor: nwse-resize;\n}\n.qk-editor .qk-img-control .top-left {\n  top: 0;\n  left: 0;\n}\n.qk-editor .qk-img-control .top-right {\n  top: 0;\n  right: 0;\n  cursor: nesw-resize;\n}\n.qk-editor .qk-img-control .bottom-left {\n  bottom: 0;\n  left: 0;\n  cursor: nesw-resize;\n}\n.qk-editor .qk-img-control .bottom-right {\n  bottom: 0;\n  right: 0;\n}\n.qk-editor .qk-editor-modal {\n  position: absolute;\n  left: 50%;\n  top: 60px;\n  transform: translateX(-50%);\n  border: 1px solid #e8e8e8;\n  background-color: #fff;\n  box-shadow: 0 2px 10px #0000001f;\n  padding: 20px 15px;\n  font-size: 14px;\n  color: #333;\n}\n.qk-editor .qk-editor-modal .qk-modal-input {\n  margin-bottom: 15px;\n}\n.qk-editor .color-block {\n  display: inline-flex;\n  box-sizing: border-box;\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  margin: 1px;\n  padding: 1px;\n  align-items: center;\n  border: 1px solid transparent;\n  cursor: pointer;\n  user-select: none;\n}\n.qk-editor .qk-colorpicker {\n  position: relative;\n  z-index: 2;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner {\n  box-sizing: border-box;\n  width: 285px;\n  background-color: #fff;\n  box-shadow: 0 0 1px rgba(0, 0, 0, 0.3);\n  padding: 10px;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-title {\n  font-size: 12px;\n  color: #666;\n  margin: 5px 0 10px;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-list .qk-colorpicker-item {\n  display: inline-flex;\n  box-sizing: border-box;\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  margin: 1px;\n  padding: 1px;\n  align-items: center;\n  border: 1px solid transparent;\n  cursor: pointer;\n  user-select: none;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-list .qk-colorpicker-item:hover {\n  border-color: #bfbfbf;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-list .qk-colorpicker-item.selected {\n  border-color: #222;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-list .qk-colorpicker-item .qk-colorpicker-span {\n  width: 100%;\n  height: 100%;\n  border-radius: 2px;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-line {\n  margin: 10px 1px 12px;\n  background-color: rgba(0, 0, 0, 0.1);\n  width: 100%;\n  height: 1px;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-footer {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-footer .active-color {\n  display: inline-flex;\n  box-sizing: border-box;\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n  margin: 1px;\n  padding: 1px;\n  align-items: center;\n  border: 1px solid transparent;\n  cursor: pointer;\n  user-select: none;\n  width: 22px;\n  height: 22px;\n  border: 1px solid #e8e8e8;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-footer .qk-colorpicker-input {\n  flex: 0 0 126px;\n  border: 1px solid #e8e8e8;\n  font-size: 12px;\n  height: 24px;\n  border-radius: 2px;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-footer .qk-colorpicker-input input {\n  width: 100%;\n  height: 100%;\n  padding: 0 10px;\n  border: none;\n  outline: none;\n  background-color: transparent;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-footer .qk-colorpicker-btn {\n  border: 1px solid #e8e8e8;\n  font-size: 12px;\n  border-radius: 2px;\n  padding: 0 10px;\n  line-height: 22px;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.qk-editor .qk-colorpicker .qk-colorpicker-inner .qk-colorpicker-footer .qk-colorpicker-btn:hover {\n  border-color: #a0a0a0;\n}\n";
  styleInject(css_248z);

  var QkEditor = /*#__PURE__*/_createClass(function QkEditor(domId1) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, QkEditor);
    _defineProperty(this, "toolbar", void 0);
    _defineProperty(this, "editor", void 0);
    if (domId1) {
      var instanceDom = typeof domId1 === 'string' ? document.getElementById(domId1) : domId1;
      if (instanceDom) {
        instanceDom.className = 'qk-editor';
        var toolbarDom = document.createElement('header');
        toolbarDom.className = 'qk-editor-toolbar';
        var editorDom = document.createElement('div');
        instanceDom.appendChild(toolbarDom);
        instanceDom.appendChild(editorDom);
        this.editor = new QkContent(editorDom, config.editor);
        this.toolbar = new QKToolbar(toolbarDom, _objectSpread2({
          editor: this.editor
        }, config.toolbar));
      } else {
        console.log('没有找到dom');
      }
    } else {
      console.error('缺少必须参数');
      return;
    }
  });

  return QkEditor;

})();
