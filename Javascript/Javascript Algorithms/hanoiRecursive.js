function hanoiRecursive(n, source = 'A', target = 'C', auxiliary = 'B') {
  if (n === 1) {
    console.log(`Move disk 1 from rod ${source} to rod ${target}`);
    return;
  }
  
  // Move n-1 disks from source to auxiliary, so they are out of the way
  hanoiRecursive(n - 1, source, auxiliary, target);
  
  // Move remaining disk from source to target
  console.log(`Move disk ${n} from rod ${source} to rod ${target}`);
  
  // Move n-1 disks from auxiliary to target
  hanoiRecursive(n - 1, auxiliary, target, source);
}

// Example usage:
const numberOfDisks = 3;
hanoiRecursive(numberOfDisks); 
