// zsytssk utility 常用工具集合
var zu = {};
zu.$ = function (selector) {
  var _self = this;

  function isDom(ele) {
    if (!ele) {
      return false
    }
    return 'click' in ele;
  }

  analysisSelector = function (selector) {
    var zdoms;
    if (typeof selector === 'string') {
      // 瀛楃涓查€夋嫨鍣�
      var doms = document.querySelectorAll(selector);
      zdoms = new Z(doms, selector);
    } else if (isDom(selector)) {
      // dom
      zdoms = new Z([selector]);
    } else if (selector instanceof Z) {
      // z dom
      zdoms = selector;
    } else if (selector.length && isDom(selector[0])) {
      zdoms = new Z(zdoms = new Z([selector]));
      return false;
    }
    return zdoms;
  };

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || '';
  }
  Z.prototype = Array.prototype;
  Z.prototype.eq = function (index) {
    // 杩斿洖绗嚑涓厓绱�
    var $this = this;
    return new Z([$this[index]]);
  };
  Z.prototype.find = function (index) {
    // 杩斿洖绗嚑涓厓绱�
    var $this = this;
    return new Z([$this[index]]);
  };
  Z.prototype.reduce = function () {
    // 闄ゅ幓閲嶅鐨勫厓绱�
    var self = this;
    var _slef = new Z('', self.selector);
    if (!self.length) {
      return self;
    }
    for (var i = 0; i < self.length; i++) {
      if (!_slef.contains(self[i])) {
        _slef[length] = self[i];
        _slef.length += 1;
      }
    }
    self = _slef
    return self;
  };
  Z.prototype.contains = function (ele) {
    // 鐩戞祴鏄惁鍖呭惈鍝釜鍏冪礌
    var self = this;
    if (!isDom(ele)) {
      // 濡傛灉涓嶆槸dom鍏冪礌鐩存帴杩斿洖
      return false;
    }
    for (var i = 0; i < self.length; i++) {
      if (self[i] == ele) {
        return true;
      }
    }
    return false;
  }
  Z.prototype.addClass = function (cla) {
    var $this = this;
    if (!this.length) {
      return this;
    }
    $this.forEach(function (ele) {
      ele.classList.add(cla);
    });
    return this;
  };

  Z.prototype.closest = function (selector) {
    var $this = this;
    var len_this = $this.length;
    var zdoms = analysisSelector(selector);
    for (var i = 0; i < zdoms.length; i++) {
      var dom = zdoms[i];
      for (var j = 0, len = $this.length; j < len; j++) {
        if (isClosest($this[j], dom)) {
          return analysisSelector(dom);
        }
      }
    }
    return false;

    function isClosest(son, parent) {
      if (!son) {
        // 濡傛灉宸茬粡鍒拌揪document 杩斿洖false
        return false
      }
      if (son == parent) {
        return true;
      } else {
        return isClosest(son.parentNode, parent);
      }
    }
    return $this;
  };

  Z.prototype.addClass = function (cla) {
    var $this = this;
    if (!this.length) {
      return this;
    }
    $this.forEach(function (ele) {
      ele.classList.add(cla);
    });
    return this;
  };

  Z.prototype.removeClass = function (cla) {
    var $this = this;
    if (!this.length) {
      return this;
    }
    $this.forEach(function (ele) {
      ele.classList.remove(cla);
    });
    return this;
  };
  Z.prototype.on = function (event, selector, callback) {
    var $this = this;
    if (!this.length) {
      return this;
    }
    if (typeof (selector) === 'function') {
      callback = selector;
      $this.forEach(function (ele) {
        ele.addEventListener(event, callback);
      });
    } else {
      $this.forEach(function (ele) {
        ele.addEventListener(event, function (e) {
          var doms = [];
          for (var i = 0, len = $this.length; i < len; i++) {
            var domsItem = $this[i].querySelectorAll(selector);
            for (var j = 0, item_len = domsItem.length; j < item_len; j++) {
              doms.push(domsItem[j]);
            }
          }
          var closetDom = _self.$(e.target).closest(doms);
          if (closetDom) {
            callback.call(closetDom[0], e);
          }
        });
      });
    }
    return this;
  };
  window.Z = Z;
  return analysisSelector(selector);
}
zu.getEleStyle = function (ele, porperty) {
  // 获得元素的css属性
  return window.getComputedStyle(ele)[porperty];
}
zu.pxToRem = function (px) {
  // 把px 转换成 rem
  var htmlFontSize = zu.getEleStyle(document.documentElement, 'font-size');

  htmlFontSize = parseFloat(htmlFontSize);
  px = parseFloat(px);
  return (px / htmlFontSize).toFixed(2);
}
zu.animate = function (porperty, value, time, timeFuc, callback) {
  time = time || 500;
  timeFuc = timeFuc || 'ease-in';

  obj.style.transition = porperty + ' ' + timeFuc + ' ' + (time / 1000) + 's';
  obj.style.webkitTransition = porperty + ' ' + timeFuc + ' ' +
    (time / 1000) + 's';
  obj.style[porperty] = value + 'rem';
  // 娓呯┖ transition
  setTimeout(function () {
    obj.style.transition = '';
    obj.style.webkitTransition = '';
    if (callback && typeof (callback) === 'function') {
      callback();
    }
  }, time);
}
