var Cell = module.exports = function(x, y, board) {
  this.state = 'dead';
  this.nextState = 'dead';
  this.x = x;
  this.y = y;
  this.board = board;
};

Cell.prototype.kill = function() {
  this.nextState = 'dead';
};

Cell.prototype.rez = function() {
  this.nextState = 'alive';
};

Cell.prototype.commit = function() {
  this.state = this.nextState;
};
Cell.prototype.nextTurn = function() {
  var self = this;
  
  var adjacentCoordinates = [
    [this.x - 1, this.y - 1], //top left
    [this.x, this.y - 1], // top mid
    [this.x + 1, this.y - 1], // top right
    [this.x - 1, this.y], // mid left 
    [this.x + 1, this.y], // mid right 
    [this.x - 1, this.y + 1], // bottom left
    [this.x, this.y + 1], // bottom mid
    [this.x + 1, this.y + 1] // bottom right

  ];

  var alive = 0;
  adjacentCoordinates.forEach(function(coordinate) {
    var x = coordinate[0];
    var y = coordinate[1];
    var cell = self.board.getCell(x, y);
    if(cell && cell.state === 'alive') {
      alive++;
    }
  });

  if(self.state === 'alive') { 
    if(alive < 2) {
      self.kill();
    } else if(alive === 2 || alive === 3) {
      self.rez();
    } else if(alive > 3) {
      self.kill();
    }
  } else if(self.state === 'dead') {
    if(alive === 3) {
      self.rez();
    }
  }

};


