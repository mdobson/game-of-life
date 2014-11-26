var Board = require('./board');

var b = new Board();

b.seed([[2,1],[2,2],[2,3]]);
console.log('-----Initial Seed State-----');
b.print();
console.log('----------------------------');
b.on('update', function() {
  console.log('----------Next Round--------');
  b.print();
  console.log('----------------------------');
});
b.start();


/*
var cell = b.getCell(1, 2);

var adjacentCoordinates = [
    [cell.x - 1, cell.y - 1], //top left
    [cell.x, cell.y - 1], // top mid
    [cell.x + 1, cell.y - 1], // top right
    [cell.x - 1, cell.y], // mid left 
    [cell.x + 1, cell.y], // mid right 
    [cell.x - 1, cell.y + 1], // bottom left
    [cell.x, cell.y + 1], // bottom mid
    [cell.x + 1, cell.y + 1] // bottom right

  ];

  var alive = 0;
  adjacentCoordinates.forEach(function(coord) {
    var c = b.getCell(coord[0], coord[1]);
    if(c && c.state === 'alive') {
      alive++;
    }
  });

  console.log(alive);
*/
