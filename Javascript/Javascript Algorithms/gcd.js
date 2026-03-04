// Euclidean Algorithm for GCD (Greatest Common Divisor)
// Time Complexity: O(log(min(a, b)))
// Space Complexity: O(1) iterative, O(log(min(a, b))) recursive

// Iterative version
function gcdIterative(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }

    return a;
}

// Recursive version
function gcdRecursive(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);

    if (b === 0) return a;
    return gcdRecursive(b, a % b);
}

// GCD of multiple numbers
function gcdMultiple(...numbers) {
    return numbers.reduce((acc, num) => gcdIterative(acc, num));
}

// LCM using GCD
function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcdIterative(a, b);
}

// LCM of multiple numbers
function lcmMultiple(...numbers) {
    return numbers.reduce((acc, num) => lcm(acc, num));
}

// Example usage
const a = 48;
const b = 18;

console.log(`GCD(${a}, ${b}):`);
console.log('Iterative:', gcdIterative(a, b));
console.log('Recursive:', gcdRecursive(a, b));

console.log(`\nLCM(${a}, ${b}):`, lcm(a, b));

console.log('\nGCD of multiple numbers [24, 36, 60, 84]:', gcdMultiple(24, 36, 60, 84));
console.log('LCM of multiple numbers [4, 6, 8, 12]:', lcmMultiple(4, 6, 8, 12));

// More examples
console.log('\n--- More Examples ---');
console.log('GCD(100, 35):', gcdIterative(100, 35));
console.log('GCD(17, 19) - coprime:', gcdIterative(17, 19));
console.log('GCD(0, 5):', gcdIterative(0, 5));
