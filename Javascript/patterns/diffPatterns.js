// 1. Random Star Field
function drawOne() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawTwo() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < Math.floor(Math.random() * 10)) {
      row += '*';
      j++;
    }
    console.log(row);
    i++;
  }
}

// 2. Spiral Pattern with Random Steps
function drawThree() { // For loops
  const size = 5;
  for (let i = 0; i < size * 2; i++) {
    let row = '';
    for (let j = 0; j < Math.floor(Math.random() * size); j++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawFour() { // While loops
  const size = 5;
  let i = 0;
  while (i < size * 2) {
    let row = '';
    let j = 0;
    while (j < Math.floor(Math.random() * size)) {
      row += '*';
      j++;
    }
    console.log(row);
    i++;
  }
}

// 3. Checkerboard with Random Symbols
function drawFive() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 === 0) {
        row += Math.random() > 0.5 ? '*' : '#';
      } else {
        row += Math.random() > 0.5 ? '@' : '$';
      }
    }
    console.log(row);
  }
}

function drawSix() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < size) {
      if ((i + j) % 2 === 0) {
        row += Math.random() > 0.5 ? '*' : '#';
      } else {
        row += Math.random() > 0.5 ? '@' : '$';
      }
      j++;
    }
    console.log(row);
    i++;
  }
}

// 4. Zigzag Pattern with Random Direction
function drawSeven() { // For loops
  const size = 5;
  for (let i = 0; i < size * 2; i++) {
    let row = '';
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 === 0 && Math.random() > 0.5) {
        row += '*';
      } else if ((i + j) % 2 === 1 && Math.random() > 0.5) {
        row += '#';
      } else {
        row += ' ';
      }
    }
    console.log(row);
  }
}

function drawEight() { // While loops
  const size = 5;
  let i = 0;
  while (i < size * 2) {
    let row = '';
    let j = 0;
    while (j < size) {
      if ((i + j) % 2 === 0 && Math.random() > 0.5) {
        row += '*';
      } else if ((i + j) % 2 === 1 && Math.random() > 0.5) {
        row += '#';
      } else {
        row += ' ';
      }
      j++;
    }
    console.log(row);
    i++;
  }
}

// 5. Pascal's Triangle with Random Numbers
function drawNine() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < size - i - 1; j++) {
      row += ' ';
    }
    for (let k = 0; k <= i; k++) {
      if (k === 0 || k === i) {
        row += Math.floor(Math.random() * 10);
      } else {
        row += ' ';
      }
    }
    console.log(row);
  }
}

function drawTen() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < size - i - 1) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k <= i) {
      if (k === 0 || k === i) {
        row += Math.floor(Math.random() * 10);
      } else {
        row += ' ';
      }
      k++;
    }
    console.log(row);
    i++;
  }
}

function printStars(){
    drawOne();
    drawTwo();
    drawThree();
    drawFour();
    drawFive();
    drawSix();
    drawSeven();
    drawEight();
    drawNine();
    drawTen();
    console.log("Program Terminated!");
}
printStars();