(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function() {
    this.bindKeyHandlers();
    window.setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }, 20);
  };

  GameView.prototype.bindKeyHandlers = function () {
    var that = this;
    key("up", function() { that.game.ship.power(1) });
    key("down", function() { that.game.ship.power(-1) });

    key("left", function() { that.game.ship.steer(0.5) });
    key("right", function() { that.game.ship.steer(-0.5) });
  };
})();