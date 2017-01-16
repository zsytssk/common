/*
    从前往后寻找 和从后往前寻找有什么区别？
    queryElements 我先写一个从前往后寻找的
*/

var zutil = {
  getElementsByName: function (root_dom, name) {
    var self = this;
    var arr = [];
    if (root_dom.getChildByName && root_dom.getChildByName(name)) {
      for (var i = 0; i < root_dom.numChildren; i++) {
        if (root_dom.getChildAt(i).name == name) {
          arr.push(root_dom.getChildAt(i));
        }
      }
    }
    for (var i = 0; i < root_dom.numChildren; i++) {
      arr = arr.concat(self.getElementsByName(root_dom.getChildAt(i), name));
    }
    return arr;
  },
  // Button Image Label ... laya.ui 中的组件
  getElementsByType: function (root_dom, type) {
    var self = this;
    var arr = [];
    var typeParent = self.mapType(type);
    if (!typeParent) {
      return arr;
    }
    for (var i = 0; i < root_dom.numChildren; i++) {
      if (root_dom.getChildAt(i) instanceof typeParent) {
        arr.push(root_dom.getChildAt(i));
      }
    }
    for (var i = 0; i < root_dom.numChildren; i++) {
      arr = arr.concat(self.getElementsByType(root_dom.getChildAt(i), type));
    }
    return arr;
  },
  mapType: function (typeStr) {
    var self = this;
    var type_arr = typeStr.split('.');
    var result;
    for (var i = 0; i < type_arr.length; i++) {
      var type = type_arr[i];
      if (i === 0) {
        result = laya.ui[type] || ui[type] || laya.display[type];
      } else {
        result = result[type];
      }
      if (!result) {
        // 如果没有
        break;
      }
    }

    return result;
  },
  // 通过属性来寻找子类 propertyName:value
  getElementsByProperty: function (root_dom, propStr) {
    var self = this;
    var arr = [];
    var propArr = propStr.split(':');
    if (!propArr.length) {
      return arr;
    }
    if (propArr[1] == 'false') {
      propArr[1] = false;
    } else if (propArr[1] == 'true') {
      propArr[1] = true;
    }
    for (var i = 0; i < root_dom.numChildren; i++) {
      if (root_dom.getChildAt(i)[propArr[0]] == propArr[1]) {
        arr.push(root_dom.getChildAt(i));
      }
    }
    for (var i = 0; i < root_dom.numChildren; i++) {
      arr = arr.concat(self.getElementsByProperty(root_dom.getChildAt(i), propStr));
    }
    return arr;
  },
  // 获取所有下级node
  getAllElements: function (root_dom) {
    var self = this;
    var arr = [];
    for (var i = 0; i < root_dom.numChildren; i++) {
      arr.push(root_dom.getChildAt(i));
      arr = arr.concat(self.getAllElements(root_dom.getChildAt(i)));
    }
    return arr;
  },
  // 获取所有下级node
  getAllChildrens: function (root_dom) {
    var self = this;
    var arr = [];
    for (var i = 0; i < root_dom.numChildren; i++) {
      arr.push(root_dom.getChildAt(i));
    }
    return arr;
  },
  // 通过 (name:nameStr type:typeStr).. 形式查询
  queryElements: function (root_dom, queryString) {
    var self = this;
    var arr = [];
    var queryArr = queryString.split(' ');
    if (!queryArr) {
      return arr;
    }
    var lastQueryStr = queryArr[queryArr.length - 1];

    var allElements = self.getAllElements(root_dom);
    for (var i = 0; i < allElements.length; i++) {
      if (!self.isChecked(allElements[i], lastQueryStr)) {
        continue;
      }
      if (self._itemParentCheck(root_dom, allElements[i], queryArr)) {
        arr.push(allElements[i]);
      }
    }
    return arr;
  },
  querySiblings: function (dom_origin) {
    var self = this;
    var arr = [];
    var dom_parent = dom_origin.parent;
    for (var i = 0; i < dom_parent.numChildren; i++) {
      var dom_item = dom_parent.getChildAt(i);
      if (dom_item == dom_origin) {
        continue;
      }
      arr.push(dom_item);
    }
    return arr;
  },
  // 寻找最近符合条件的父类
  queryClosest: function (dom_item, queryString) {
    var self = this;
    var parent = dom_item.parent;
    if (!parent) {
      return null;
    }
    if (self.isChecked(parent, queryString)) {
      return parent;
    }
    return self.queryClosest(parent, queryString);
  },
  isClosest: function (dom_item, dom_parent) {
    var self = this;
    if (!dom_item) {
      return false;
    }
    if (dom_item == dom_parent) {
      return true;
    }
    var parent = dom_item.parent;
    return self.isClosest(parent, dom_parent);
  },
  wrapElementByClass: function (dom_origin, ClassName) {
    var dom_parent = dom_origin.parent;
    var index = zutil.getElementIndex(dom_origin);
    var new_class_dom = new ClassName(dom_origin);
    dom_parent.addChildAt(new_class_dom, index);
    return new_class_dom;
  },
  // dom_list中符合condition_str的元素 提取出来放在一个数组中
  filterElements: function (dom_list, filter_str) {
    var self = this;
    var arr = [];
    return dom_list.filter(function (dom_item, index) {
      return self.isChecked(dom_item, filter_str);
    });
  },
  getElementIndex: function (dom_item) {
    var self = this;
    var dom_parent = dom_item.parent;
    if (!parent) {
      return -1;
    }
    for (var i = 0; i < dom_parent.numChildren; i++) {
      if (dom_parent.getChildAt(i) == dom_item) {
        return i;
      }
    }
    return -1;
  },
  queryControllersFromDom: function (root_dom, queryString) {
    var self = this;
    var doms = self.queryElements(root_dom, queryString);
    var arr = [];

    for (var i = 0; i < doms.length; i++) {
      var controller = self.getControllerFromDom(doms[i]);
      if (controller) {
        arr.push(controller);
      }
    }
    return arr;
  },
  getControllerFromDom: function (dom) {
    var self = this;
    if (dom.controller) {
      return dom.controller;
    }
    return null;
  },
  _itemParentCheck: function (root_dom, item_dom, queryArr) {
    var self = this;
    var lastQueryStr = queryArr[queryArr.length - 1];
    var funcSelf = self._itemParentCheck.bind(self);
    var parent_dom = item_dom._parent;
    if (self.isChecked(item_dom, lastQueryStr)) {
      queryArr = queryArr.slice(0, -1);
    }
    if (queryArr.length === 0) {
      return true;
    }
    if (parent_dom == root_dom) {
      // 如果已经找到最顶级 queryArr还没有完成所有匹配 返回false
      return false;
    }
    return self._itemParentCheck(root_dom, parent_dom, queryArr);
  },
  isChecked: function (check_item, condition_str) {
    var self = this;
    if (condition_str.indexOf('|') == -1) {
      return self._typeIsChecked(check_item, condition_str);
    }

    var condition_arr = condition_str.split('|');
    for (var i = 0; i < condition_arr.length; i++) {
      if (!self._typeIsChecked(check_item, condition_arr[i])) {
        return false;
      }
    }
    return true;
  },
  // 判断item是否符合条件 name:nameStr
  _typeIsChecked: function (check_item, type_str) {
    var self = this;

    var queryArr = type_str.split(':');
    var queryType = queryArr[0];
    var queryStr = queryArr[1];
    if (queryType == 'name') {
      return check_item.name == queryStr;
    } else if (queryType == 'type') {
      var typeParent = self.mapType(queryStr);
      return check_item instanceof typeParent;
    } else if (queryType == 'property') {
      var propertyName = queryStr;
      var propertyValue = queryArr[2];
      if (propertyValue == 'false') {
        propertyValue = false;
      } else if (propertyValue == 'true') {
        propertyValue = true;
      }
      return check_item[propertyName] == propertyValue;
    }
  },
  convertXMLToNode: function (xmlText) {
    var self = this;
    var node;
    var jsonObj = self.xml_str2json(xmlText);
    node = self.convertJSONToNode(jsonObj);
    return node;
  },
  convertJSONToNode: function (jsonObj) {
    var self = this;
    var type = jsonObj.type;
    if (!laya.ui[type]) {
      return null;
    }
    var node = new laya.ui[type]();
    var props = jsonObj.props;
    for (var prop_name in props) {
      // 属性
      var prop_val = props[prop_name];

      if (!isNaN(Number(prop_val))) {
        prop_val = Number(prop_val);
      }
      node[prop_name] = prop_val;
    }
    var childs = jsonObj.childs;
    for (var i = 0; i < childs.length; i++) {
      var child_json = childs[i];
      var child_node = self.convertJSONToNode(child_json);
      if (child_node) {
        node.addChild(child_node);
      }
    }
    return node;
  },
  xml2json: function (node, path) {
    var self = this;
    var result = {};
    result.type = self.getNodeLocalName(node);
    result.childs = [];
    var nodeChildren = node.childNodes;
    for (var cidx = 0; cidx < nodeChildren.length; cidx++) {
      var child = nodeChildren.item(cidx);
      var childName = self.getNodeLocalName(child);
      var _child = self.xml2json(child);
      result.childs.push(_child);
    }

    // Attributes
    if (node.attributes) {
      result.props = {};
      for (var aidx = 0; aidx < node.attributes.length; aidx++) {
        var attr = node.attributes.item(aidx);
        result.props[attr.name] = attr.value;
      }
    }
    return result;
  },
  getNodeLocalName: function (node) {
    var nodeLocalName = node.localName;
    if (nodeLocalName === null) // Yeah, this is IE!!
      nodeLocalName = node.baseName;
    if (nodeLocalName === null || nodeLocalName === "") // =="" is IE too
      nodeLocalName = node.nodeName;
    return nodeLocalName;
  },
  xml_str2json: function (xmlDocStr) {
    var self = this;
    var xmlDoc = self.parseXmlString(xmlDocStr);
    if (xmlDoc !== null)
      return self.xml2json(xmlDoc);
    else
      return null;
  },
  parseXmlString: function (xmlDocStr) {
    var self = this;
    if (xmlDocStr === undefined) {
      return null;
    }
    var xmlDoc, parser;
    if (window.DOMParser) {
      parser = new window.DOMParser();
    }
    try {
      xmlDoc = parser.parseFromString(xmlDocStr, "text/xml").firstChild;
    } catch (err) {
      xmlDoc = null;
    }
    return xmlDoc;
  },
  // 防止按钮多次点击 按钮锁定一秒
  isSpriteLock: function (sprite) {
    var self = zutil;
    if (sprite.isLock) {
      return true;
    }
    sprite.isLock = true;
    Laya.timer.once(1000, self.sprite, function () {
      sprite.isLock = false;
    });
    return false;
  },
  // log
  log: function (msg) {
    var self = zutil;

    if (!self.debugType()) {
      return true;
    }
    var type = self.debugType();
    log = console[type];
    if (!log) {
      log = console.log;
    }
    if (arguments.length == 1 && (typeof (msg) != 'function' && typeof (msg) != 'object')) {
      msg = msg + '';
      var style_obj = self.debugStyle();
      var style = '';
      for (var name in style_obj) {
        style += name + ':' + style_obj[name] + ';';
      }

      log.call(console, '%c %s', style, msg);
    } else {
      log.apply(console, arguments);
    }
  },
  // 分析字符串
  getQueryString: function (query) {
    var query_string = {};
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (typeof query_string[pair[0]] === "undefined") {
        query_string[pair[0]] = decodeURIComponent(pair[1]);
      } else if (typeof query_string[pair[0]] === "string") {
        var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
        query_string[pair[0]] = arr;
      } else {
        query_string[pair[0]].push(decodeURIComponent(pair[1]));
      }
    }
    return query_string;
  },
  // 检测页面的状态
  detectModel: function (state) {
    var self = this;
    var queryStr = location.href.split('?')[1];
    if (!queryStr) {
      return false;
    }
    queryStr = queryStr.replace(location.hash, '');
    var query = self.getQueryString(queryStr)[state];
    if (query) {
      return query;
    }
    return false;
  },
  debugType: function () {
    var self = this;
    return self.detectModel('debugType') || self.detectModel('debugFE');
  },
  debugStyle: function () {
    var self = this;
    var style = self.detectModel('debugStyle');
    var style_obj = {
      'background': 'rgba(64, 224, 208, 0.2)',
      'font-family': '楷体',
      'font-size': '16px',
      'color': 'DodgerBlue',
      'text-shadow': '0 1px 0 #ccc, 0 2 px 0# c9c9c9, 0 3 px 0# bbb, 0 4 px 0# b9b9b9,0 5 px 0# aaa,0 6 px 1 px rgba(0, 0, 0, .1),0 0 5 px rgba(0, 0, 0, .1),0 1 px 3 px rgba(0, 0, 0, .3),0 3 px 5 px rgba(0, 0, 0, .2),0 5 px 10 px rgba(0, 0, 0, .25),0 10 px 10 px rgba(0, 0, 0, .2),0 20 px 20 px rgba(0, 0, 0, .15);'
    };
    if (!style) {
      return style_obj;
    }
    var style_arr = style.replace(/[\{\}]/g, '').split(';');
    style_arr.forEach(function (item) {
      item = item.replace(';', '');
      var matchs = item.split(':');
      if (matchs.length !== 2) {
        return true;
      }
      style_obj[matchs[0]] = matchs[1];
    });
    return style_obj;
  },
  showStat: function () {
    var self = this;
    return self.detectModel('showStat');
  },
  isAutoTest: function () {
    var self = this;
    return self.detectModel('autoTest');
  },
  isShowOberverCmd: function () {
    var self = this;
    return self.detectModel('showOberverCmd');
  },
  compareObj: function (x, y) {
    if (x === y) {
      return true;
    }

    for (var p in x) {
      if (x.hasOwnProperty(p)) {
        if (!y.hasOwnProperty(p)) {
          return false;
        }

        if (x[p] === y[p]) {
          continue;
        }

        if (typeof (x[p]) !== "object") {
          return false;
        }
      }
    }

    for (p in y) {
      if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
        return false;
      }
    }
    return true;
  },
  extend: function (sub_class, super_class, name_sapce) {
    var self = this;
    for (var p in super_class)
      if (b.hasOwnProperty(p)) sub_class[p] = super_class[p];

    function __() {
      this.constructor = sub_class;
    }
    sub_class.prototype = super_class === null ? Object.create(super_class) : (__.prototype = super_class.prototype, new __());
    if (name_sapce) {
      var arr_space = name_sapce.split('.');
      self.nameMap(arr_space, null, sub_class);
    }
  },
  nameMap: function (arr_space, obj, end_obj) {
    var self = this;
    if (!obj) {
      obj = window;
    }
    if (arr_space.length == 1) {
      return (obj[arr_space[0]] = end_obj);
    }
    if (!obj[arr_space[0]]) {
      obj[arr_space[0]] = {};
    }
    return self.nameMap(arr_space.slice(1), obj[arr_space[0]], end_obj);
  },
  calcStrLen: function (str) {
    return str.replace(/[^\x00-\xff]/g, "01").length;
  }
};