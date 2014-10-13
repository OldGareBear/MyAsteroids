(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function(pos, game) {
    Asteroids.MovingObject.call(this,
                      pos,
                      [0, 0],
                      Ship.RADIUS,
                      Ship.COLOR, game);
    this.angle = Math.PI / 2;
  };

  Ship.inherits(Asteroids.MovingObject);

  Ship.COLOR = "black";
  Ship.RADIUS = 15;

  Ship.prototype.relocate = function() {
    this.vel = [0, 0];
    this.pos = this.game.randomPos();
  };

  Ship.prototype.power = function (impulse) {
    new_vx = this.vel[0] + Math.cos(this.angle) * impulse;
    new_vy = this.vel[1] - Math.sin(this.angle) * impulse;
    this.vel = [new_vx, new_vy];
  };

  Ship.prototype.steer = function (direction) {
    this.angle += direction
    if (this.angle < 0) {
      this.angle += Math.PI * 2;
    }
    else if (this.angle > Math.PI * 2) {
      this.angle -= Math.PI * 2;
    }
  };

  Ship.prototype.draw = function(ctx) {

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

    ctx.beginPath();
    ctx.moveTo(this.pos[0], this.pos[1]);
    ctx.lineTo((this.pos[0] + Math.cos(this.angle) * (this.radius + 10)),
               (this.pos[1] - Math.sin(this.angle) * (this.radius + 10)));

    ctx.lineWidth = 5;
    ctx.stroke();
  };

})();