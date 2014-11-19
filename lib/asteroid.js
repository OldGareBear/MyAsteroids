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

  // Asteroid.COLOR = "#BDBDBD";
  Asteroid.radius = 50;

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }
  };

  Asteroid.prototype.draw = function (ctx) {
    var img = new Image();
    console.log(img);

    img.src = "./assets/tennis_ball.png";
    ctx.drawImage(img, this.pos[0] - this.radius/2, this.pos[1] - this.radius/2,
      this.radius*1.25, this.radius*1.25);

    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    //
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // );

    ctx.fill();
  };
})();
