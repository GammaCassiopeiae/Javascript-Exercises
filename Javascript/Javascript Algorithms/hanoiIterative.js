function hanoiIterative(n) {
  let moves = [];
  
  function moveDisk(fromPeg, toPeg) {
    moves.push(`Move disk from ${fromPeg} to ${toPeg}`);
  }
  
  // Initialize the initial state (all disks on source)
  const source = 'A';
  const target = 'C';
  const auxiliary = 'B';

  let currentMovesCount = 1;
  while (currentMovesCount <= Math.pow(2, n) - 1) {
    for (let i = 0; i < 3; i++) {
      if (currentMovesCount % (Math.pow(2, n-1) + Math.pow(2, n-2)) === 0 || currentMovesCount % Math.pow(2, n-1) === 1) {
        moveDisk(source, target);
      } else if (currentMovesCount % (3 * Math.pow(2, n-2 - 1)) === 1 && currentMovesCount > Math.pow(2, n-2)) {
        moveDisk(target, auxiliary);
      } else if (currentMovesCount % Math.pow(2, n-2) === 0) {
        moveDisk(auxiliary, source);
      }
      
      currentMovesCount++;
    }
  }

  return moves;
}

// Example usage:
const numberOfDisks = 3;
console.log(hanoiIterative(numberOfDisks).join('\n'));
