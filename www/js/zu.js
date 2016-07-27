// zsytssk utility 常用工具集合
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
    } else if (selector.length && isDom(selector[0])) {
      zdoms = new Z(zdoms = new Z([selector]));
      return false;
    }
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
  Z.prototype = Array.prototype;
  Z.prototype.eq = function (index) {
    // zepto eq
    var $self = this;
    return $($self[index]);
  };
  Z.prototype.find = function (selector) {
    // zepto find
    var $self = this;
    var doms = $self[0].querySelectorAll(selector);
    return new Z(doms, '');
  };
  Z.prototype.reduce = function () {
    // delete dulplicate dom
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
        // 濡傛灉宸茬粡鍒拌揪document 杩斿洖false
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
