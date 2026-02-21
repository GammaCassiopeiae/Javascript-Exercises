// Using for loop
function one() {
  const size = 5;
  for (let i = 0; i < size; i++) {
    let str = '';
    for (let j = 0; j <= i; j++)
      str += '*';
    console.log(str);
  }
}

// Using while loop
function two() {
  const size = 5;
  let i = 0;
  while (i < size) {
    let str = '';
    let j = 0;
    while (j <= i) {
      str += '*';
      j++;
    }
    console.log(str);
    i++;
  }
}

// Using nested for loops
function three() {
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let str = '';
    for (let j = 0; j < i; j++)
      str += '*';
    console.log(str);
  }
}

// Using nested while loops
function four() {
  const size = 5;
  let i = 1;
  while (i <= size) {
    let str = '';
    let j = 0;
    while (j < i) {
      str += '*';
      j++;
    }
    console.log(str);
    i++;
  }
}
// Using for loop
function five() {
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let str = '';
    for (let j = 1; j <= i; j++)
      str += '*';
    console.log(str);
  }
  for (let k = size - 1; k > 0; k--) {
    let str = '';
    for (let l = 1; l <= k; l++)
      str += '*';
    console.log(str);
  }
}

// Using while loop
function six() {
  const size = 5;
  let i = 1;
  while (i <= size) {
    let str = '';
    let j = 0;
    while (j < i) {
      str += '*';
      j++;
    }
    console.log(str);
    i++;
  }
  let k = size - 1;
  while (k > 0) {
    let str = '';
    let l = 0;
    while (l < k) {
      str += '*';
      l++;
    }
    console.log(str);
    k--;
  }
}

// Using nested for loops
function seven() {
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let str = '';
    for (let j = 0; j < i; j++)
      str += '*';
    console.log(str);
  }
  for (let k = size - 2; k >= 0; k--) {
    let str = '';
    for (let l = 1; l <= k; l++)
      str += '*';
    console.log(str);
  }
}

// Using nested while loops
function eight() {
  const size = 5;
  let i = 1;
  while (i <= size) {
    let str = '';
    let j = 0;
    while (j < i) {
      str += '*';
      j++;
    }
    console.log(str);
    i++;
  }
  let k = size - 2;
  while (k >= 0) {
    let str = '';
    let l = 1;
    while (l <= k) {
      str += '*';
      l++;
    }
    console.log(str);
    k--;
  }
}
// Using for loop
function nine() {
  const size = 5;
  for (let i = 0; i < size; i++) {
    let str = '';
    for (let j = 0; j <= i; j++)
      str += '*';
    console.log(str);
  }
}

// Using while loop
function ten() {
  const size = 5;
  let i = 0;
  while (i < size) {
    let str = '';
    let j = 0;
    while (j <= i) {
      str += '*';
      j++;
    }
    console.log(str);
    i++;
  }
}

// Using nested for loops
function eleven() {
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let str = '';
    for (let j = 0; j < i; j++)
      str += '*';
    console.log(str);
  }
}

// Using nested while loops
function twelve() {
  const size = 5;
  let i = 1;
  while (i <= size) {
    let str = '';
    let j = 0;
    while (j < i) {
      str += '*';
      j++;
    }
    console.log(str);
    i++;
  }
}
// Using for loop
function thirteen() {
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let str = '';
    for (let j = 0; j < size; j++)
      str += '*';
    console.log(str);
  }
}

// Using while loop
function fourteen() {
  const size = 5;
  let i = 1;
  while (i <= size) {
    let str = '';
    for (let j = 0; j < size; j++)
      str += '*';
    console.log(str);
    i++;
  }
}

// Using nested for loops
function fifteen() {
  const size = 5;
  for (let i = 1; i <= size; i++) {
    let str = '';
    for (let j = 0; j < size; j++)
      str += '*';
    console.log(str);
  }
}

// Using nested while loops
function sixteen() {
  const size = 5;
  let i = 1;
  while (i <= size) {
    let str = '';
    for (let j = 0; j < size; j++)
      str += '*';
    console.log(str);
    i++;
  }
}

function printStars(){
    one();
    two();
    three();
    four();
    five();
    six();
    seven();
    eight();
    nine();
    ten();
    eleven();
    twelve();
    thirteen();
    fourteen();
    console.log("Program Terminated!");
}
printStars();
