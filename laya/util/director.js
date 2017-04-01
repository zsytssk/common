(function () {
  function getPageName() {
    var url = '';
    var name = location.hash.replace('#/', '');
    return name;
  }

  function setPageName(name) {
    var url = location.href.replace(location.hash, '').replace(location.origin, '');
    url = '#/' + name;
    history.pushState({
      page: name
    }, "page: " + name, url);
  }

  function Router(routes) {
    var self = this;
    self.routes = routes;
  }

  zutil.extend(Router, null, 'Router');
  var _proto = Router.prototype;
  _proto.init = function () {
    var self = this;

    window.onpopstate = function (event) {
      self.runRouteFun();
    };
    self.runRouteFun();
  };

  _proto.runRouteFun = function () {
    var self = this;
    var route = self.getRoute();
    if (!route) {
      return false;
    }
    var fn_page = self.routes[route];
    if (fn_page && typeof (fn_page) == 'function') {
      fn_page();
    }
  };

  _proto.setRoute = function (name) {
    var self = this;
    setPageName(name);
    self.runRouteFun();
  };
  _proto.getRoute = function () {
    return getPageName();
  };
})();