(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(pos, game, angle) {
    Asteroids.MovingObject.call(this,
      [pos[0], pos[1]],
      [Math.cos(angle) * Bullet.SPEED, -Math.sin(angle) * Bullet.SPEED],
      Bullet.RADIUS,
      Bullet.COLOR,
      game);

      game.bullets.push(this);
  };

  Bullet.COLOR = "#B4E6B3";
  Bullet.SPEED = 10;
  Bullet.RADIUS = 5;

  Bullet.inherits(Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Bullet.prototype.isWrappable = false;
})();