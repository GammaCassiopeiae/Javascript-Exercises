function luhnCheckRecursive(cardNumber, index = cardNumber.length - 1, isSecond = false) {
  if (index < 0) return sum % 10 === 0;

  let digit = parseInt(cardNumber.charAt(index));

  if (isSecond) {
    digit *= 2;
    if (digit > 9) {
      digit -= 9;
    }
  }

  const result = luhnCheckRecursive(cardNumber, index - 1, !isSecond);
  
  return (digit + sum) % 10 === 0 ? true : false;
}

const cardNumber2 = "4532015112830366";
console.log(luhnCheckRecursive(cardNumber2)); // Output: true
