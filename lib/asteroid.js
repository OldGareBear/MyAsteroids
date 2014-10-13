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
  Asteroid.RADIUS = 20;
})();