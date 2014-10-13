(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = function () {};

  Function.prototype.inherits = function(superclass) {
    var Surrogate = function() {};
    Surrogate.prototype = superclass.prototype;
    this.prototype = new Surrogate();
  };

  Util.randomVector = function(length) {
    var dxSign = Math.random() < 0.5 ? -1 : 1;
    var dySign = Math.random() < 0.5 ? -1 : 1;
    var dx = (Math.random() * length) * dxSign;
    var dy = (Math.random() * length) * dySign;

    return [dx, dy];
  };
})();