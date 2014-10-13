(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.width = Game.DIM_X;
    this.height = Game.DIM_Y;
    this.asteroids = [];
    this.addAsteroids();
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 20;

  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.asteroids.push(new Asteroids.Asteroid(this.randomPos(),
                                                 this));
    }
  };

  Game.prototype.randomPos = function () {
    var px = Math.floor(Math.random() * Game.DIM_X);
    var py = Math.floor(Math.random() * Game.DIM_Y);
    return [px, py];
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.asteroids.forEach(function(asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    return [pos[0] % this.width,
            pos[1] % this.height];
  };
})();