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
    var objects = this.allObjects()
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    objects.forEach(function(object) {
      object.draw(ctx);
    });
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
          console.log("COLLISION"); // remove later
          obj1.collideWith(obj2);
        }
      }
    };
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (asteroid) {
    idx = this.asteroids.indexOf(asteroid)
    this.asteroids.splice(idx, 1);
  };

  Game.prototype.allObjects = function() {
    return this.asteroids.concat(this.ship);
  };
})();