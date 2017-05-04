var c = document.getElementsByTagName('canvas')[0];
var ctx = c.getContext("2d");
var w = 400;
var h = 400;
var space_height = 100;
var space_width = 100;
var BLOCK_W = Math.floor(w/ space_width);
var BLOCK_H = Math.floor(h / space_height);

// create the universe for the game
var space = new Array(space_height);
for (var i = 0 ;i < space.length; i++) {
  space[i] = new Array(space_width).fill(0);
}

// create the universe for the game
var space_temp = new Array(space_height);
for (var i = 0 ;i < space_temp.length; i++) {
  space_temp[i] = new Array(space_width).fill(0);
}

for (var i = 0 ;i < space.length; i++) {
   for (var j = 0; j < space.length; j++) {
		if (Math.random() * 10 > 8) {
			space[i][j] = 1;
		}
    }
}

function cellCheck(x, y) {
  
  var numOfNeighbours = 0;
  
  for (var i = -1; i <= 1; i++) {
    for (var j = -1; j <= 1; j++) {
      // out of bounds
      if(((x + j) < 0) || ((x + j) > space_width-1) || ((y + i) < 0) || ((y + i) > space_height-1)) {
        continue;
      }

      // skip the current node
      if (y + i == y && x + j == x) {
        continue;
      }
      
      if(space[i + y][j + x] == 1)
        numOfNeighbours++;
        
    }
  }
  
  if(space[y][x] == 1) { // for live cells
    if (numOfNeighbours < 2) {
      space_temp[y][x] = 0; // kill cell
    } else if (numOfNeighbours == 2 || numOfNeighbours == 3) {
      space_temp[y][x] = 1; // does not change
    } else if (numOfNeighbours > 3) {
      space_temp[y][x] = 0; // kill cell
    }
  } else { // if dead cell
    if(numOfNeighbours == 3) {
      space_temp[y][x] = 1; // make live cell
    }
  }
}

// draws the board and the moving shape
function draw() {
  for (var x = 0; x < space_width; ++x) {
      for (var y = 0; y < space_height; ++y) {
          if (space[y][x] == 0) {
              ctx.fillStyle = "white";
          } else {
              ctx.strokeStyle = 'light grey';
              ctx.lineWidth = "0.1";
              ctx.fillStyle = 'black';
          }
          ctx.fillRect(BLOCK_W * x  , BLOCK_H * y, BLOCK_W , BLOCK_H);
          ctx.strokeRect( BLOCK_W * x, BLOCK_H * y, BLOCK_W  , BLOCK_H  );
      }
  }
}

function tick() {
  for (var i = 0; i < space_width; i++) {
    for (var j = 0; j < space_height; j++) {
      cellCheck(j, i);
    }
  }
  
  // deep copy from temp to space
  space = JSON.parse(JSON.stringify(space_temp));
  
  // clear temp array
  for (var i = 0 ;i < space_temp.length; i++) {
    space_temp[i] = new Array(space_width).fill(0);
  }
}

function startGame() {

    draw();

    setInterval( tick, 25 );
    setInterval( draw, 25 );

}

startGame();

