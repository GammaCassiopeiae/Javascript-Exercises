// Extended Euclidean Algorithm
// Time Complexity: O(log(min(a, b)))
// Space Complexity: O(1) iterative, O(log(min(a, b))) recursive
// Finds GCD and coefficients x, y such that: ax + by = gcd(a, b)

// Iterative version
function extendedGcdIterative(a, b) {
    let oldR = a, r = b;
    let oldX = 1, x = 0;
    let oldY = 0, y = 1;

    while (r !== 0) {
        const quotient = Math.floor(oldR / r);

        [oldR, r] = [r, oldR - quotient * r];
        [oldX, x] = [x, oldX - quotient * x];
        [oldY, y] = [y, oldY - quotient * y];
    }

    return {
        gcd: oldR,
        x: oldX,
        y: oldY,
        equation: `${a}(${oldX}) + ${b}(${oldY}) = ${oldR}`
    };
}

// Recursive version
function extendedGcdRecursive(a, b) {
    if (b === 0) {
        return {
            gcd: a,
            x: 1,
            y: 0,
            equation: `${a}(1) + ${b}(0) = ${a}`
        };
    }

    const result = extendedGcdRecursive(b, a % b);
    const newX = result.y;
    const newY = result.x - Math.floor(a / b) * result.y;

    return {
        gcd: result.gcd,
        x: newX,
        y: newY,
        equation: `${a}(${newX}) + ${b}(${newY}) = ${result.gcd}`
    };
}

// Modular multiplicative inverse using Extended GCD
// Finds x such that: (a * x) ≡ 1 (mod m)
function modInverse(a, m) {
    const result = extendedGcdIterative(a, m);

    if (result.gcd !== 1) {
        return null; // Inverse doesn't exist
    }

    // Make sure x is positive
    return ((result.x % m) + m) % m;
}

// Solve linear Diophantine equation: ax + by = c
function solveDiophantine(a, b, c) {
    const result = extendedGcdIterative(a, b);

    if (c % result.gcd !== 0) {
        return { solvable: false, message: 'No integer solutions exist' };
    }

    const factor = c / result.gcd;
    const x0 = result.x * factor;
    const y0 = result.y * factor;

    // General solution:
    // x = x0 + (b/gcd) * t
    // y = y0 - (a/gcd) * t
    return {
        solvable: true,
        particularSolution: { x: x0, y: y0 },
        generalSolution: {
            x: `x = ${x0} + ${b / result.gcd} * t`,
            y: `y = ${y0} - ${a / result.gcd} * t`
        }
    };
}

// Example usage
const a = 35;
const b = 15;

console.log(`Extended GCD(${a}, ${b}):`);
const result = extendedGcdIterative(a, b);
console.log('GCD:', result.gcd);
console.log('x:', result.x);
console.log('y:', result.y);
console.log('Equation:', result.equation);
console.log('Verification:', a * result.x + b * result.y);

console.log('\n--- Recursive Version ---');
const resultRec = extendedGcdRecursive(a, b);
console.log('Equation:', resultRec.equation);

console.log('\n--- Modular Inverse ---');
const modA = 3;
const modM = 11;
const inverse = modInverse(modA, modM);
console.log(`Modular inverse of ${modA} mod ${modM}:`, inverse);
console.log('Verification:', (modA * inverse) % modM);

console.log('\n--- Diophantine Equation ---');
const diophantine = solveDiophantine(35, 15, 10);
console.log('35x + 15y = 10:', diophantine);
