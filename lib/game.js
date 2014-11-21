(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.width = Game.DIM_X;
    this.height = Game.DIM_Y;
    this.asteroids = [];
    this.addAsteroids();
    this.ship = new Asteroids.Ship([300, 300], this);
    this.bullets = [];
    this.points = 0;
    this.lives = 3;
  };

  Game.DIM_X = 600;
  Game.DIM_Y = 600;
  Game.NUM_ASTEROIDS = 8;

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
    if (this.asteroids.length < 1) {
      this.lives = 3
      this.addAsteroids();
     }

    if (this.lives < 1) {
      this.lives = 3;
      this.points = 0;
      this.asteroids = [];
      this.addAsteroids();
     }


    var objects = this.allObjects()
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    objects.forEach(function(object) {
      object.draw(ctx);
    });

    ctx.font = "24px sans-serif";
    ctx.strokeStyle = "white";
    ctx.strokeText("Lives: " + this.lives, 15, 35);
    ctx.strokeText("Points: " + this.points, 450, 35);
  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function(object) {
      object.move();
    });
  };

  Game.prototype.wrap = function(pos) {
    var px = pos[0];
    var py = pos[1];
    var new_pos = [px, py];

    if (px < 0) {
      new_pos[0] = this.width - px;
    } else if (px > this.width) {
      new_pos[0] = px - this.width;
    }

    if (py < 0) {
      new_pos[1] = this.height - py;
    } else if (py > this.height) {
      new_pos[1] = py - this.height;
    }

    return new_pos;
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = 0; j < objects.length; j++) {
        if (i === j) { continue; }
        obj1 = objects[i];
        obj2 = objects[j];
        if (obj1.isCollidedWith(obj2)) {
          obj1.collideWith(obj2);
        }
      }
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      idx = this.asteroids.indexOf(object);
      this.asteroids.splice(idx, 1);
      this.points ++;
    }
    else if (object instanceof Asteroids.Bullet) {
      idx = this.bullets.indexOf(object);
      this.bullets.splice(idx, 1);
    }

    // if (this.asteroids.length === 0) {
    //   alert("YOU WIN");
    //   this.addAsteroids();
    // }

  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.bullets).concat(this.ship);
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > this.width) ||
           (pos[1] < 0 || pos[1] > this.height);
  };
})();
