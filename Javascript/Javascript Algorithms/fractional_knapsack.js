// Fractional Knapsack Problem
// Time Complexity: O(n log n) for sorting
// Space Complexity: O(n)
// Items can be broken into fractions (unlike 0/1 Knapsack)
// Greedy approach: Take items with highest value/weight ratio first

function fractionalKnapsack(items, capacity) {
    if (items.length === 0 || capacity <= 0) {
        return { maxValue: 0, selectedItems: [] };
    }

    // Calculate value/weight ratio for each item
    const withRatio = items.map((item, index) => ({
        ...item,
        ratio: item.value / item.weight,
        originalIndex: index
    }));

    // Sort by ratio in descending order
    withRatio.sort((a, b) => b.ratio - a.ratio);

    let remainingCapacity = capacity;
    let totalValue = 0;
    const selectedItems = [];

    for (const item of withRatio) {
        if (remainingCapacity <= 0) break;

        if (item.weight <= remainingCapacity) {
            // Take the whole item
            selectedItems.push({
                index: item.originalIndex,
                name: item.name,
                weight: item.weight,
                value: item.value,
                fraction: 1
            });
            totalValue += item.value;
            remainingCapacity -= item.weight;
        } else {
            // Take fraction of the item
            const fraction = remainingCapacity / item.weight;
            selectedItems.push({
                index: item.originalIndex,
                name: item.name,
                weight: remainingCapacity,
                value: item.value * fraction,
                fraction: fraction
            });
            totalValue += item.value * fraction;
            remainingCapacity = 0;
        }
    }

    return {
        maxValue: totalValue,
        selectedItems,
        capacityUsed: capacity - remainingCapacity,
        remainingCapacity
    };
}

// Compare with 0/1 Knapsack (for demonstration)
function fractionalVs01Knapsack(items, capacity) {
    // Fractional Knapsack (Greedy)
    const fractional = fractionalKnapsack(items, capacity);

    // 0/1 Knapsack (DP)
    const n = items.length;
    const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            dp[i][w] = dp[i - 1][w];
            if (items[i - 1].weight <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
                );
            }
        }
    }

    return {
        fractional: {
            maxValue: fractional.maxValue,
            approach: 'Greedy (by value/weight ratio)'
        },
        zeroOne: {
            maxValue: dp[n][capacity],
            approach: 'Dynamic Programming'
        },
        difference: fractional.maxValue - dp[n][capacity]
    };
}

// Example usage
console.log('Fractional Knapsack Problem');
console.log('===========================');

const items = [
    { name: 'Gold', weight: 10, value: 60 },
    { name: 'Silver', weight: 20, value: 100 },
    { name: 'Bronze', weight: 30, value: 120 },
    { name: 'Diamond', weight: 15, value: 45 }
];
const capacity = 50;

console.log('Items:', items);
console.log('Capacity:', capacity);

const result = fractionalKnapsack(items, capacity);
console.log('\nMaximum Value:', result.maxValue);
console.log('\nSelected Items:');
result.selectedItems.forEach(item => {
    console.log(`  ${item.name}: ${item.fraction === 1 ? 'full' : (item.fraction * 100).toFixed(0) + '%'} (${item.weight} kg, value: ${item.value.toFixed(2)})`);
});
console.log('\nCapacity used:', result.capacityUsed, '/', capacity);

// Comparison example
console.log('\n--- Fractional vs 0/1 Knapsack ---');
const items2 = [
    { name: 'Item 1', weight: 10, value: 60 },
    { name: 'Item 2', weight: 20, value: 100 },
    { name: 'Item 3', weight: 30, value: 120 }
];
const capacity2 = 50;

const comparison = fractionalVs01Knapsack(items2, capacity2);
console.log('Fractional Knapsack:', comparison.fractional.maxValue);
console.log('0/1 Knapsack:', comparison.zeroOne.maxValue);
console.log('Difference (advantage of fractional):', comparison.difference);
