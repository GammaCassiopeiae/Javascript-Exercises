/**
 * 1. Reševanje kvadratne enačbe: ax^2 + bx + c = 0
 * Uporablja kvadratno formulo z diskriminanto (D).
 */
function resiKvadratnoEnacbo(a, b, c) {
    const diskriminanta = Math.pow(b, 2) - 4 * a * c;

    if (diskriminanta > 0) {
        const x1 = (-b + Math.sqrt(diskriminanta)) / (2 * a);
        const x2 = (-b - Math.sqrt(diskriminanta)) / (2 * a);
        return {
            tip: "Dve realni rešitvi",
            x1,
            x2
        };
    } else if (diskriminanta === 0) {
        const x = -b / (2 * a);
        return {
            tip: "Ena dvojna realna rešitev",
            x1: x
        };
    } else {
        return {
            tip: "Kompleksni rešitvi",
            sporocilo: "Enačba nima realnih rešitev"
        };
    }
}

/**
 * 2. Izračun kvadrata binoma (a + b)^2 = a^2 + 2ab + b^2
 */
function kvadratBinoma(a, b) {
    // Vrne nizek (string) v obliki polinoma
    const clen1 = Math.pow(a, 2);
    const clen2 = 2 * a * b;
    const clen3 = Math.pow(b, 2);
    return `${a}^2 + 2*${a}*${b} + ${b}^2 = ${clen1 + clen2 + clen3}`;
}

/**
 * 3. Razcep razlike kvadratov a^2 - b^2 = (a - b)(a + b)
 */
function razlikaKvadratov(a, b) {
    const rezultat = (a - b) * (a + b);
    return `(${a} - ${b})(${a} + ${b}) = ${rezultat}`;
}

// --- PRIMERI UPORABE ---

console.log("--- Kvadratna enačba (x^2 - 5x + 6 = 0) ---");
console.log(resiKvadratnoEnacbo(1, -5, 6));

console.log("\n--- Kvadrat binoma (3 + 4)^2 ---");
console.log(kvadratBinoma(3, 4));

console.log("\n--- Razlika kvadratov (10^2 - 5^2) ---");
console.log(razlikaKvadratov(10, 5));