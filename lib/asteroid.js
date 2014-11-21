(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function(pos, game) {
    Asteroids.MovingObject.call(this,
                      pos,
                      Asteroids.Util.randomVector(2),
                      Asteroid.radius,
                      Asteroid.COLOR, game);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.radius = 20;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      game.lives --;
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    var img = new Image();
    img.src = "./assets/tennis_ball.png";

    ctx.drawImage(img, this.pos[0] - this.radius/2, this.pos[1] - this.radius/2,
      this.radius * 2, this.radius * 2);

  };
})();
