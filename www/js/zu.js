// zsytssk utility 常用工具集合

// trigger event

// 自定义事件无法触发 on(event, selector, callback) 因为在on中作的是event.target 在不在selector下面
// 现在触发的的事件无法冒泡, 也许我只能自定义事件了 所有的传递的都是自定义事件
// 我现在暂时放在 event 的detail上面
var zu = {};
zu.$ = function (selector) {
  var _self = this;

  function isDom(ele) {
    if (!ele) {
      return false
    }
    return 'onclick' in ele;
  }

  $ = function (selector) {
    var zdoms;
    if (typeof selector === 'string') {
      // selector
      var doms = document.querySelectorAll(selector);
      zdoms = new Z(doms, selector);
    } else if (isDom(selector)) {
      // dom
      zdoms = new Z([selector]);
    } else if (selector instanceof Z) {
      // z dom
      zdoms = selector;
    } else if (selector instanceof NodeList) {
      // 数组元素
      zdoms = new Z(selector);
    } else if (selector.length) {
      // 数组元素
      zdoms = new Z(selector);
    }
    zdoms = zdoms.filter(function (index, item) {
      // 除去不是text + comment节点
      return isDom(item);
    });
    return zdoms;
  };

  function createZapEvent() {
    // create zap event zap == tap
    $('body')[0].dataset.createtap = 'on';
    $(document).on('touchstart', function (event) {
      event.target.dataset.zsytouchstatus = 'start';
    });
    $(document).on('touchmove', function (event) {
      if (event.target.dataset.zsytouchstatus == 'start') {
        event.target.dataset.zsytouchstatus = 'move';
      }
    });
    $(document).on('touchend', function (event) {
      var zsytouchstatus;
      if (event.target.dataset && event.target.dataset.zsytouchstatus) {
        zsytouchstatus = event.target.dataset.zsytouchstatus;
        event.target.removeAttribute('data-zsytouchstatus');
      }
      if (zsytouchstatus != 'start') {
        return true;
      }
      $(event.target).trigger('zap');
    });
  }

  function eventPopup(origindom, dom, eventName) {
    // 用于事件冒泡
    var evt = new CustomEvent(eventName, {
      detail: origindom
    });
    dom.dispatchEvent(evt);
    if (dom.parentNode) {
      return eventPopup(origindom, dom.parentNode, eventName);
    }
    return false
  }

  function Z(dom, selector) {
    var i, len = dom ? dom.length : 0;
    for (i = 0; i < len; i++) {
      this[i] = dom[i];
    }
    this.length = len;
    this.selector = selector || '';
  }
  Z.prototype = new Array;
  Z.prototype.eq = function (index) {
    // zepto eq
    var $self = this;
    return $($self[index]);
  };
  Z.prototype.index = function (selector) {
    // zepto eq
    var $self = this;
    if (selector) {
      // find item index in this list
      var Zdoms = $(selector);
      for (var i = 0; i < $self.length; i++) {
        if ($self[i] == Zdoms[0]) {
          return i;
        }
      }
    } else {
      // find this first element index in the parent
      var $siblings = $($self[0].parentNode.childNodes);
      for (var i = 0; i < $siblings.length; i++) {
        if ($siblings[i] == $self[0]) {
          return i;
        }
      }
    }
    return -1;
  };
  Z.prototype.find = function (selector) {
    // zepto find
    var $self = this;
    var doms = $self[0].querySelectorAll(selector);
    return new Z(doms);
  };
  Z.prototype.siblings = function (selector) {
    // zepto find
    var $self = this;
    var zdoms = new Z([]);
    for (var i = 0; i < $self.length; i++) {
      zdoms = zdoms.add($($self[i].parentNode.childNodes));
    }
    zdoms = zdoms.reduce();
    if (selector) {
      var zdomsSelector = $(selector);
      var zdomsResult = new Z([]);
      for (var i = 0; i < zdomsSelector.length; i++) {
        if (zdoms.contains(zdomsSelector[i])) {
          zdomsResult.push(zdomsSelector[i])
        }
      }
      zdoms = zdomsResult.reduce();
    }
    return zdoms;
  };
  Z.prototype.filter = function (callback) {
    // zepto find
    var $self = this;
    var doms = [];
    for (var i = 0; i < $self.length; i++) {
      if (callback(i, $self[i])) {
        doms.push($self[i]);
      }
    }
    return new Z(doms);
  };
  Z.prototype.add = function (zdoms) {
    var $self = this;
    zdoms = $(zdoms);
    var a = Array.prototype.slice.call($self);
    var b = Array.prototype.slice.call(zdoms);
    return new Z(a.concat(b)).reduce();
  }
  Z.prototype.reduce = function () {
    // delete dulplicate dom
    var $self = this;
    var zdoms = new Z([], self.selector);
    if (!$self.length) {
      return $self;
    }
    for (var i = 0; i < $self.length; i++) {
      if (!zdoms.contains($self[i])) {
        zdoms.push($self[i]);
      }
    }
    $self = zdoms
    return $self;
  };
  Z.prototype.contains = function (ele) {
    // detect Zdoms contains a dom
    var $self = this;
    if (!isDom(ele)) {
      return false;
    }
    for (var i = 0; i < $self.length; i++) {
      if ($self[i] == ele) {
        return true;
      }
    }
    return false;
  }
  Z.prototype.push = function (ele) {
    // detect Zdoms contains a dom
    var $self = this;
    $self[$self.length] = ele;
    $self.length += 1;
  }

  Z.prototype.closest = function (selector) {
    var $self = this;
    var len_this = $self.length;
    var zdoms = $(selector);
    for (var i = 0; i < zdoms.length; i++) {
      var dom = zdoms[i];
      for (var j = 0, len = $self.length; j < len; j++) {
        if (isClosest($self[j], dom)) {
          return $(dom);
        }
      }
    }
    return false;

    function isClosest(son, parent) {
      if (!son) {
        // parent 是不是 son的父级元素
        return false
      }
      if (son == parent) {
        return true;
      } else {
        return isClosest(son.parentNode, parent);
      }
    }
    return $self;
  };

  Z.prototype.addClass = function (cla) {
    var $self = this;
    if (!this.length) {
      return this;
    }
    $self.forEach(function (ele) {
      ele.classList.add(cla);
    });
    return this;
  };

  Z.prototype.removeClass = function (cla) {
    var $self = this;
    if (!this.length) {
      return this;
    }
    $self.forEach(function (ele) {
      ele.classList.remove(cla);
    });
    return this;
  };
  Z.prototype.on = function (event, selector, callback) {
    var $self = this;
    if (!this.length) {
      return this;
    }
    if (event == 'zap') {
      if ($('body')[0].dataset.createtap !== 'on') {
        createZapEvent();
      }
    }
    if (typeof (selector) === 'function') {
      callback = selector;
      $self.forEach(function (ele) {
        ele.addEventListener(event, callback);
      });
    } else {
      $self.forEach(function (ele) {
        ele.addEventListener(event, function (e) {
          var doms = [];
          var domsItem = ele.querySelectorAll(selector);
          for (var j = 0, item_len = domsItem.length; j < item_len; j++) {
            doms.push(domsItem[j]);
          }
          var closetDom = $(e.target).closest(doms);
          if (isDom(e.detail)) {
            var closetDom = $(e.detail).closest(doms);
          }
          if (closetDom) {
            callback.call(closetDom[0], e);
          }
        });
      });
    }
    return this;
  };
  Z.prototype.trigger = function (eventName) {
    var $self = this;
    for (var i = 0; i < $self.length; i++) {
      var Ditem = $self[i];
      eventPopup(Ditem, Ditem, eventName);
    }
    return $self;
  }

  window.Z = Z;
  return $(selector);
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
