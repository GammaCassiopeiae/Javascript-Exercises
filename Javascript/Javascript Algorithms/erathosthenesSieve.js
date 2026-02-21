// The function "sieveOfEratosthenes" takes an integer 'n' as a parameter.
function sieveOfEratosthenes(n) {
    
    // Create an array named 'primes' and fill it with 'true' values, 
    // representing the assumption that all numbers from 0 to n are prime initially.
    let primes = new Array(n + 1).fill(true);
    
    // Initialize 'p' variable as the first number (2) to start checking for prime numbers.
    let p = 2;

    // The while loop continues until we check all numbers up to the square root of 'n'.
    while (p * p <= n) {

        // If a number is marked as true in the 'primes' array, 
        // it means that it's still considered a prime number.
        if (primes[p]) {
            
            // Then we update all multiples of this prime number by marking them false,
            // indicating they are not prime numbers. 
            for (let i = p * p; i <= n; i += p) {
                primes[i] = false;
            }
        }

        // Move to the next unvisited number.
        p += 1;
    }

    // Initialize variables to count the total number of primes and store them in an array.
    let count = 0;
    let numList = [];

    // Iterate through all numbers from 2 to n,
    for (let p = 2; p <= n; p++) {

        // If a number is marked as true, it's still considered a prime number,
        if (primes[p]) {
            
            // Increment the count and add that prime number to the list.
            count++;
            numList.push(p);
        }
    }

    // Return an object containing the total count of primes and the first 100 primes.
    return { count: count, first100Nums: numList.slice(0, 100) };
}

// Call the function with a limit up to 105 and store the result in 'result'.
let result = sieveOfEratosthenes(105);

// Use console.log() to print out the results.
console.log("Count of prime numbers:", result.count);
console.log("First 100 prime numbers:", result.first100Nums);
