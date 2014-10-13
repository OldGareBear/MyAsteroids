(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject =
                      function(pos, vel, radius, color, game) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.color = color;
    this.game = game;
  };

  MovingObject.prototype.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.move = function () {
    new_pos = this.game.wrap([(this.pos[0] + this.vel[0]),
                              (this.pos[1] + this.vel[1])]);
    this.pos[0] = new_pos[0];
    this.pos[1] = new_pos[1];
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distance = Asteroids.Util.distance(this.pos, otherObject.pos);
    return (distance < this.radius + otherObject.radius);
  };

})();