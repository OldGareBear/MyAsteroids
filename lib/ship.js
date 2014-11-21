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

  Ship.RADIUS = 50;
  Ship.MAXSPEED = 15

  Ship.prototype.relocate = function() {
    this.vel = [0, 0];
    this.pos = this.game.randomPos();
  };

  Ship.prototype.power = function (impulse) {
    new_vx = this.vel[0] + Math.cos(this.angle) * impulse;
    new_vy = this.vel[1] - Math.sin(this.angle) * impulse;

    this.vel = [new_vx % Ship.MAXSPEED, new_vy % Ship.MAXSPEED];
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

  Ship.prototype.fireBullet = function() {
    var bullet = new Asteroids.Bullet(this.pos, this.game, this.angle);
  };

  Ship.prototype.draw = function(ctx) {

    var img = new Image();
    img.src = "./assets/dog.png";

    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(-this.angle);
    ctx.drawImage(img, -(100/2), -(100/2), 2*this.radius, 2*this.radius);

    ctx.restore();
  };

})();
