function luhnCheck(number) {
    // Convert input number to string and reverse it for easier processing
    const digits = String(number)
        .split('')
        .reverse();

    let totalSum = 0;

    for (let i = 0; i < digits.length; i++) {
        let digit = parseInt(digits[i]);

        // Double every second digit from the right (starting at index 1 in reversed array)
        if (i % 2 === 1) {
            digit *= 2;
            // If doubling results in a value > 9, subtract 9
            if (digit > 9) {
                digit = digit - 9;
            }
        }

        totalSum += digit;
    }

    // The number is valid if the sum modulo 10 equals 0
    return totalSum % 10 === 0;
}

// Example usage:
console.log(luhnCheck(4539));           // true (valid)
console.log(luhnCheck(1234));          // false (invalid)
