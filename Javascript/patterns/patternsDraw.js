// Triangle patterns
function drawOne() { // Right triangle - For loops
  for (let i = 1; i <= 5; i++) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawTwo() { // Right triangle - While loops
  let i = 1;
  while (i <= 5) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += '*';
      j++;
    }
    console.log(row);
    i++;
  }
}

// Diamond patterns
function drawThree() { // Diamond - For loops
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * i - 1; k++) {
      row += '*';
    }
    console.log(row);
  }
  for (let i = size - 1; i >= 1; i--) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * i - 1; k++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawFour() { // Diamond - While loops
  const size = 5;
  let i = 1;
  while (i <= size) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * i - 1) {
      row += '*';
      k++;
    }
    console.log(row);
    i++;
  }
  i = size - 1;
  while (i >= 1) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * i - 1) {
      row += '*';
      k++;
    }
    console.log(row);
    i--;
  }
}

// Add more patterns like:
// drawFive() for inverted triangle
// drawSix() for pyramid
// drawSeven() for hourglass
// drawEight() for X shape
// etc.

// Inverted Right Triangle
function drawFive() { // For loops
  for (let i = 5; i >= 1; i--) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawSix() { // While loops
  let i = 5;
  while (i >= 1) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += '*';
      j++;
    }
    console.log(row);
    i--;
  }
}

// Pyramid Pattern
function drawSeven() { // For loops
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * i - 1; k++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawEight() { // While loops
  const size = 5;
  let i = 1;
  while (i <= size) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * i - 1) {
      row += '*';
      k++;
    }
    console.log(row);
    i++;
  }
}

// Hourglass Pattern
function drawNine() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * (size - i) - 1; k++) {
      row += '*';
    }
    console.log(row);
  }
  for (let i = size - 2; i >= 0; i--) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * (size - i) - 1; k++) {
      row += '*';
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
    while (j < i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * (size - i) - 1) {
      row += '*';
      k++;
    }
    console.log(row);
    i++;
  }
  i = size - 2;
  while (i >= 0) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * (size - i) - 1) {
      row += '*';
      k++;
    }
    console.log(row);
    i--;
  }
}

// Inverted Pyramid Pattern
function drawEleven() { // For loops
  const size = 5;
  for (let i = size; i >= 1; i--) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * i - 1; k++) {
      row += '*';
    }
    console.log(row);
  }
}

function drawTwelve() { // While loops
  const size = 5;
  let i = size;
  while (i >= 1) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * i - 1) {
      row += '*';
      k++;
    }
    console.log(row);
    i--;
  }
}

// X Shape Pattern
function drawThirteen() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += ' ';
    }
    row += '*';
    for (let k = 0; k < 2 * (size - i) - 1; k++) {
      row += ' ';
    }
    console.log(row);
  }
  for (let i = size - 2; i >= 0; i--) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += ' ';
    }
    row += '*';
    for (let k = 0; k < 2 * (size - i) - 1; k++) {
      row += ' ';
    }
    console.log(row);
  }
}

function drawFourteen() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += ' ';
      j++;
    }
    row += '*';
    let k = 0;
    while (k < 2 * (size - i) - 1) {
      row += ' ';
      k++;
    }
    console.log(row);
    i++;
  }
  i = size - 2;
  while (i >= 0) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += ' ';
      j++;
    }
    row += '*';
    let k = 0;
    while (k < 2 * (size - i) - 1) {
      row += ' ';
      k++;
    }
    console.log(row);
    i--;
  }
}

// Star with Alternating Spaces
function drawFifteen() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += ' ';
    }
    row += '*';
    for (let k = 0; k < 2 * (size - i) - 1; k++) {
      if (k % 2 === 0) row += ' '; // Alternate space
      else row += '*';
    }
    console.log(row);
  }
}

function drawSixteen() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += ' ';
      j++;
    }
    row += '*';
    let k = 0;
    while (k < 2 * (size - i) - 1) {
      if (k % 2 === 0) row += ' '; // Alternate space
      else row += '*';
      k++;
    }
    console.log(row);
    i++;
  }
}

// Spiral Pattern
function drawSeventeen() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < i; j++) {
      row += ' ';
    }
    for (let k = 0; k < 2 * (size - i) - 1; k++) {
      if (k % 2 === 0) row += '*';
      else row += ' ';
    }
    console.log(row);
  }
}

function drawEighteen() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < i) {
      row += ' ';
      j++;
    }
    let k = 0;
    while (k < 2 * (size - i) - 1) {
      if (k % 2 === 0) row += '*';
      else row += ' ';
      k++;
    }
    console.log(row);
    i++;
  }
}

// Checkerboard Design
function drawNineteen() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 === 0) row += '*';
      else row += ' ';
    }
    console.log(row);
  }
}

function drawTwenty() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < size) {
      if ((i + j) % 2 === 0) row += '*';
      else row += ' ';
      j++;
    }
    console.log(row);
    i++;
  }
}

// Zigzag Pattern
function drawTwentyOne() { // For loops
  const size = 5;
  for (let i = 0; i < size * 2; i++) {
    let row = '';
    for (let j = 0; j < size; j++) {
      if ((i + j) % 2 === 0) row += '*';
      else row += ' ';
    }
    console.log(row);
  }
}

function drawTwentyTwo() { // While loops
  const size = 5;
  let i = 0;
  while (i < size * 2) {
    let row = '';
    let j = 0;
    while (j < size) {
      if ((i + j) % 2 === 0) row += '*';
      else row += ' ';
      j++;
    }
    console.log(row);
    i++;
  }
}

// Hollow Diamond Pattern
function drawTwentyThree() { // For loops
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    row += '*';
    for (let k = 0; k < 2 * i - 3; k++) {
      if (k === 0 || k === 2 * i - 4) row += ' '; // Add space between stars
      else row += '*';
    }
    console.log(row);
  }
  for (let i = size - 1; i >= 1; i--) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    row += '*';
    for (let k = 0; k < 2 * i - 3; k++) {
      if (k === 0 || k === 2 * i - 4) row += ' '; // Add space between stars
      else row += '*';
    }
    console.log(row);
  }
}

function drawTwentyFour() { // While loops
  const size = 5;
  let i = 1;
  while (i <= size) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    row += '*';
    let k = 0;
    while (k < 2 * i - 3) {
      if (k === 0 || k === 2 * i - 4) row += ' '; // Add space between stars
      else row += '*';
      k++;
    }
    console.log(row);
    i++;
  }
  i = size - 1;
  while (i >= 1) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    row += '*';
    let k = 0;
    while (k < 2 * i - 3) {
      if (k === 0 || k === 2 * i - 4) row += ' '; // Add space between stars
      else row += '*';
      k++;
    }
    console.log(row);
    i--;
  }
}

// Pascal's Triangle Pattern
function drawTwentyFive() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < size - i - 1; j++) {
      row += ' ';
    }
    for (let k = 0; k <= i; k++) {
      if (k === 0 || k === i) row += '*';
      else row += ' '; // Create Pascal's triangle pattern
    }
    console.log(row);
  }
}

function drawTwentySix() { // While loops
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
      if (k === 0 || k === i) row += '*';
      else row += ' '; // Create Pascal's triangle pattern
      k++;
    }
    console.log(row);
    i++;
  }
}

// Diamond with Numbers Pattern
function drawTwentySeven() { // For loops
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
      row += k;
    }
    console.log(row);
  }
  for (let i = size - 1; i >= 1; i--) {
    let row = '';
    for (let j = 0; j < size - i; j++) {
      row += ' ';
    }
    for (let k = 1; k <= 2 * i - 1; k++) {
      row += k;
    }
    console.log(row);
  }
}

function drawTwentyEight() { // While loops
  const size = 5;
  let i = 1;
  while (i <= size) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    let k = 1;
    while (k <= 2 * i - 1) {
      row += k;
      k++;
    }
    console.log(row);
    i++;
  }
  i = size - 1;
  while (i >= 1) {
    let row = '';
    let j = 0;
    while (j < size - i) {
      row += ' ';
      j++;
    }
    let k = 1;
    while (k <= 2 * i - 1) {
      row += k;
      k++;
    }
    console.log(row);
    i--;
  }
}

// Star with Random Spacing
function drawTwentyNine() { // For loops
  const size = 5;
  for (let i = 0; i < size; i++) {
    let row = '';
    for (let j = 0; j < i; j++) {
      if (Math.random() > 0.5) row += ' '; // Random space
      else row += '*';
    }
    console.log(row);
  }
}

function drawThirty() { // While loops
  const size = 5;
  let i = 0;
  while (i < size) {
    let row = '';
    let j = 0;
    while (j < i) {
      if (Math.random() > 0.5) row += ' '; // Random space
      else row += '*';
      j++;
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
    drawEleven();
    // :::  ....  ::: 
    
    console.log("Program Terminated!");
}
for(let i=0;i<10;i++){
  printStars();
  console.log(":::::::::::::::::::::::::::::::::");
}

