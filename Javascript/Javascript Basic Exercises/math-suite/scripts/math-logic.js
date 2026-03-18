
/**
 * MATH SUITE LOGIC ENGINE
 * High-performance mathematical utility functions.
 */

const MathSuite = {
  // --- Basic Number Properties ---
  
  isArmstrong: (n) => {
    const digits = String(n).split('');
    const p = digits.length;
    const sum = digits.reduce((acc, d) => acc + Math.pow(Number(d), p), 0);
    return sum === n;
  },

  isNeon: (n) => {
    const square = n * n;
    const sum = String(square).split('').reduce((acc, d) => acc + Number(d), 0);
    return sum === n;
  },

  isHappy: (n) => {
    const seen = new Set();
    while (n !== 1 && !seen.has(n)) {
      seen.add(n);
      n = String(n).split('').reduce((acc, d) => acc + Math.pow(Number(d), 2), 0);
    }
    return n === 1;
  },

  isPerfect: (n) => {
    if (n < 2) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        sum += i;
        if (i !== n / i) sum += n / i;
      }
    }
    return sum === n;
  },

  getDivisors: (n) => {
    const divisors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) divisors.push(i);
    }
    return divisors;
  },

  getProperDivisorsSum: (n) => {
    if (n < 2) return 0;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        sum += i;
        if (i !== n / i) sum += n / i;
      }
    }
    return sum;
  },

  isAbundant: (n) => MathSuite.getProperDivisorsSum(n) > n,
  isDeficient: (n) => MathSuite.getProperDivisorsSum(n) < n,

  isPrime: (n) => {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  },

  // --- Digit-Based Concepts ---

  isPalindrome: (n) => {
    const s = String(n);
    return s === s.split('').reverse().join('');
  },

  isKaprekar: (n) => {
    if (n === 1) return true;
    const sq = String(n * n);
    for (let i = 1; i < sq.length; i++) {
      const left = Number(sq.substring(0, i));
      const right = Number(sq.substring(i));
      if (right > 0 && left + right === n) return true;
    }
    return false;
  },

  isHarshad: (n) => {
    const sum = String(n).split('').reduce((acc, d) => acc + Number(d), 0);
    return n % sum === 0;
  },

  isAutomorphic: (n) => {
    const sq = n * n;
    return String(sq).endsWith(String(n));
  },

  isEmirp: (n) => {
    if (!MathSuite.isPrime(n)) return false;
    const rev = Number(String(n).split('').reverse().join(''));
    return n !== rev && MathSuite.isPrime(rev);
  },

  isDudeney: (n) => {
    const root = Math.round(Math.pow(n, 1/3));
    if (root * root * root !== n) return false;
    const sum = String(n).split('').reduce((acc, d) => acc + Number(d), 0);
    return sum === root;
  },

  // --- Sequence & Series ---

  isFibonacci: (n) => {
    const isSquare = (x) => Math.sqrt(x) % 1 === 0;
    return isSquare(5 * n * n + 4) || isSquare(5 * n * n - 4);
  },

  isTriangular: (n) => {
    if (n < 0) return false;
    const val = 8 * n + 1;
    return Math.sqrt(val) % 1 === 0;
  },

  isSquare: (n) => Math.sqrt(n) % 1 === 0,
  isCube: (n) => Math.pow(n, 1/3) % 1 === 0 || Math.abs(Math.round(Math.pow(n, 1/3)) - Math.pow(n, 1/3)) < 0.000001,

  getCatalan: (n) => {
    const fact = (num) => (num <= 1 ? 1 : num * fact(num - 1));
    // Simple version for small n
    if (n > 10) return "Too large"; 
    return fact(2 * n) / (fact(n + 1) * fact(n));
  },

  // --- Divisibility & Factors ---

  getGCD: (a, b) => {
    while (b) {
      a %= b;
      [a, b] = [b, a];
    }
    return a;
  },

  getLCM: (a, b) => (a * b) / MathSuite.getGCD(a, b),

  getPrimeFactors: (n) => {
    const factors = [];
    let d = 2;
    while (n >= 2) {
      if (n % d === 0) {
        factors.push(d);
        n /= d;
      } else {
        d++;
      }
    }
    return factors;
  },

  areAmicable: (a, b) => {
    return MathSuite.getProperDivisorsSum(a) === b && MathSuite.getProperDivisorsSum(b) === a;
  }
};

// UI Controller
const UI = {
  showResult: (text) => {
    const resultBox = document.getElementById('result-box');
    const resultContent = document.getElementById('result-content');
    resultContent.textContent = text;
    resultBox.classList.add('is-visible');
  },
  
  handleForm: (id, callback) => {
    const form = document.getElementById(id);
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input').value;
      const input2 = form.querySelector('input[data-second]')?.value;
      if (input2 !== undefined) {
        callback(Number(input), Number(input2));
      } else {
        callback(Number(input));
      }
    });
  }
};
