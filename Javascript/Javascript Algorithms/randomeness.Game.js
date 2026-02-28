function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
}

const deck = ["As", "Kralj", "Dama", "Fant", "10", "9"];
console.log("Premešan krov:", shuffle([...deck]));


class RandomBag {
    constructor(items) {
        this.contents = [...items];
        this.currentBag = [];
    }

    next() {
        if (this.currentBag.length === 0) {
            console.log("--- Vreča prazna, mešam novo ---");
            this.currentBag = shuffle([...this.contents]);
        }
        return this.currentBag.pop();
    }
}

const tetrisBag = new RandomBag(['I', 'J', 'L', 'O', 'S', 'T', 'Z']);
for (let i = 0; i < 10; i++) console.log(`Dobil si del: ${tetrisBag.next()}`);


class SeededRandom {
    constructor(seed) {
        this.seed = seed;
    }

    // Standardni LCG parametri (uporabljeni v številnih knjižnicah)
    next() {
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed / 4294967296; // Vrne med 0 in 1
    }
}

const rng = new SeededRandom(12345); // Fiksno seme
console.log("Naključno 1:", rng.next());
console.log("Naključno 2:", rng.next());


function getWeightedRandom(options) {
    const totalWeight = options.reduce((acc, opt) => acc + opt.weight, 0);
    let random = Math.random() * totalWeight;

    for (const opt of options) {
        if (random < opt.weight) return opt.id;
        random -= opt.weight;
    }
}

const spawnRates = [
    { id: 'Goblin', weight: 80 },
    { id: 'Orc', weight: 18 },
    { id: 'Dragon', weight: 2 }
];

console.log("Spawnan sovražnik:", getWeightedRandom(spawnRates));

function boxMullerTransform() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    // Box-Muller transformacija za generiranje normalne porazdelitve
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

const mean = 180; // Povprečna višina
const stdDev = 10; // Standardni odklon
console.log("Višina NPC-ja:", Math.round(mean + boxMullerTransform() * stdDev), "cm");


