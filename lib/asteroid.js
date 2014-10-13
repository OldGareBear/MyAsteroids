(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    Asteroids.MovingObject.call(this,
                      pos,
                      Asteroids.Util.randomVector(2),
                      Asteroid.RADIUS,
                      Asteroid.COLOR, game);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.COLOR = "#BDBDBD";
  Asteroid.RADIUS = 30;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function (ctx) {

  };
})();