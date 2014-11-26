var Cell = require('./cell');
var EOL = require('os').EOL;
var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Board = module.exports = function(size) {
  EventEmitter.call(this);
  var self = this;
  this.size = size || 5;
  this.cells = [];
  for(var y = 0; y < this.size; y++) {
    for(var x = 0; x < this.size; x++) {
      var c = new Cell(x, y, this);
      self.cells.push(c);
    }
  }
  this.on('start', function() {
    self.start();
  });

  this.on('stop', function() {
    self.stop();
  });
};
util.inherits(Board, EventEmitter);

Board.prototype.getCell = function(x, y) {
  var cells = this.cells.filter(function(cell) {
    return cell.x === x && cell.y === y;
  });

  if(cells.length) {
    return cells[0];
  } else {
    return null;
  }
};


Board.prototype.start = function() {
  var self = this;
  this.timer = setInterval(function() {
    self.cells.forEach(function(cell) {
      cell.nextTurn();
    });
    self.cells.forEach(function(cell) {
      cell.commit();
    });
    self.emit('update');
  }, 2000);
};

Board.prototype.stop = function() {
  clearInterval(this.timer);
};

Board.prototype.seed = function(coordinates) {
  var self = this;
  coordinates.forEach(function(coordinate) {
    var x = coordinate[0];
    var y = coordinate[1];
    var cell = self.getCell(x, y);
    if(cell) {
      cell.rez();
      cell.commit();
    } else {
      throw new Error("Can't seed a cell that doesn't exist!");
    }
  });
};

Board.prototype.print = function() {
  var rows = [];
  for(var y = 0; y < this.size; y++) {
    var row = [];
    for(var x = 0; x < this.size; x++) {
      var cell = this.getCell(x, y);
      var representation = '0';
      if(cell.state === 'alive') {
         representation = '1';
      }
      row.push(representation);
    }
    rows.push(row.join(' | '));
  }
  console.log(rows.join(EOL));
};
