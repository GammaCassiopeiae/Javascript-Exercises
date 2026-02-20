function luhnCheckIterative(cardNumber) {
  let sum = 0;
  let isSecond = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));

    if (isSecond) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecond = !isSecond;
  }

  return (sum % 10) === 0;
}

const cardNumber = "4532015112830366";
console.log(luhnCheckIterative(cardNumber)); // Output: true
