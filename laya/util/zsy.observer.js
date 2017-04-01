/*
  api像jquery 一样的简单明了
*/
(function (root) {
  function hasKeys(obj) {
    var key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        return true;
      }
    }
    return false;
  }

  function injectEle(arr, ele) {
    var index = ele.index;
    /*
      从后往前遍历 如果 func index 不小于 第i个index
      将func插入到 i+1
    */
    for (var len = arr.length, i = len - 1; i >= 0; i--) {
      if (!arr[i].index || index >= arr[i].index) {
        arr.splice(i + 1, 0, ele);
        return true;
      }
    }
    /*
      如果 是空数组 || 比第一个元素index还小
      直接插入最前面
    */
    arr.unshift(ele);
  }

  function zsyObserver() {
    var self = this;
    self.hookFuncs = {};
    self.treeLevelSign = '::';
    self.init();
  }
  zsyObserver.prototype = {
    init: function () {
      var self = this;
    },
    emit: function (cmd, data) {
      var self = this;
      var func_list = self.hookFuncs[cmd];
      if (zutil.isShowOberverCmd()) {
        zutil.log('emit:' + cmd);
      }
      if (!cmd) {
        return false;
      }
      if (!self.hasBinded(cmd)) {
        return false;
      }
      func_list.forEach(function (func, index) {
        setTimeout(function () {
          func(cmd, data);
        }, 0);
      });
      // 清除只需执行一次的函数
      self.hookFuncs[cmd] = func_list.filter(function (func, index) {
        return !func.call_only_one;
      });

      self.treePass(self.emit, cmd, data);
    },
    on: function (cmd, func, index, call_only_one) {
      // call_only_one 只执行一次
      var self = this;
      var hookFuncs = self.hookFuncs;
      if (typeof func !== 'function') {
        return false;
      }
      var token = (Math.random()).toString().replace('0.', '');
      func.token = token;
      if (!hookFuncs.hasOwnProperty(cmd)) {
        hookFuncs[cmd] = [];
      }
      if (!index) {
        index = 0;
      }
      func.index = index;
      if (call_only_one) {
        func.call_only_one = true;
      }
      injectEle(hookFuncs[cmd], func);
      return token;
    },
    one: function (cmd, func, index) {
      var self = this;
      self.on(cmd, func, index, true);
    },
    off: function (cmd, func) {
      // noTraceTree 不会传递到 父-->子
      var self = this;
      var hookFuncs = self.hookFuncs;

      // cmd as token
      if (!func && !isNaN(Number(cmd))) {
        var token = cmd;
        for (var cmd in hookFuncs) {
          var funs_arr = hookFuncs[cmd];
          for (var j in funs_arr) {
            if (funs_arr[j].token == token) {
              funs_arr.splice(j, 1);
            }
          }
        }
      }

      if (self.hasBinded(cmd)) {
        var hook_index = hookFuncs[cmd].indexOf(func);
        if (hook_index != -1) {
          hookFuncs[cmd].splice(hook_index, 1);
        }
      }
      if (self.hasSubBinded(cmd)) {
        self.treePass(self.off, cmd, func);
      }
    },
    clear: function (cmd) {
      var self = this;
      var hookFuncs = self.hookFuncs;
      if (self.hasBinded(cmd)) {
        delete hookFuncs[cmd];
      }
      if (self.hasSubBinded(cmd)) {
        self.treePass(self.clear, cmd);
      }
    },
    clearAll: function () {
      var self = this;
      self.hookFuncs = {};
    },
    treePass: function (obser_func, cmd, callback_func) {
      /*
        传递命令
        eg: h1 --> h1::h2, 如果没有 h1::h2 寻找找 h1::h2::h3
        一级一级传递
      */
      var self = this;
      var hookFuncs = self.hookFuncs;
      var treeLevelSign = self.treeLevelSign;
      var closetChildList = [];
      for (var key in hookFuncs) {
        var index = traceTree(key, cmd);
        if (index !== 0) {
          injectEle(closetChildList, {
            cmd: key,
            index: index
          });
        }
      }
      if (closetChildList.length === 0) {
        return false;
      }

      closetChildList.forEach(function (item) {
        obser_func.bind(self)(item.cmd, callback_func);
      });

      function traceTree(childCmd, parentCmd) {
        // 判断childCmd在命令树种最靠近parentCmd, 没有中间层

        if (childCmd.indexOf(parentCmd + treeLevelSign) === -1) {
          return 0;
        }
        // 如果在hookFuncs中有 parentCmd 的子类 且是 childCmd 的父类
        for (var key in hookFuncs) {
          if (key.indexOf(parentCmd + treeLevelSign) !== -1 && childCmd.indexOf(key + treeLevelSign) !== -1) {
            return 0;
          }
        }
        // index 让 h1::h2 h1::h3::h4之前传递
        return indexOfGene(childCmd, parentCmd);
      }

      function indexOfGene(childCmd, parentCmd) {
        var index = 0;
        var treeLevelSign = self.treeLevelSign;
        index = childCmd.split(treeLevelSign).length - parentCmd.split(treeLevelSign).length;
        return index;
      }
    },
    hasSubBinded: function (cmd) {
      // 有没有子类 的命令 用来 off h1 off h1::h2 命令
      var self = this;
      var hookFuncs = self.hookFuncs;
      var treeLevelSign = self.treeLevelSign;
      for (var cmd_list in hookFuncs) {
        if (cmd_list.indexOf(cmd + treeLevelSign) !== -1) {
          return true;
        }
      }
      return false;
    },
    hasBinded: function (cmd) {
      var self = this;
      var hookFuncs = self.hookFuncs;
      var treeLevelSign = self.treeLevelSign;

      var found = Boolean(hookFuncs.hasOwnProperty(cmd) && hasKeys(hookFuncs[cmd])),
        position = cmd.lastIndexOf(treeLevelSign);

      while (!found && position !== -1) {
        cmd = cmd.substr(0, position);
        position = cmd.lastIndexOf(treeLevelSign);
        found = Boolean(hookFuncs.hasOwnProperty(cmd) && hasKeys(hookFuncs[cmd]));
      }

      return found;
    }
  };
  root.zsyObserver = zsyObserver;
}((typeof window === 'object' && window) || this));