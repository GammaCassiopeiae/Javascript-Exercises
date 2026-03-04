// Activity Selection Problem
// Time Complexity: O(n log n) for sorting
// Space Complexity: O(n)
// Select maximum number of non-overlapping activities

// Greedy approach: Sort by finish time and select activities
function activitySelection(activities) {
    if (activities.length === 0) return { selected: [], count: 0 };

    // Sort activities by finish time
    const sorted = [...activities].sort((a, b) => a.finish - b.finish);

    const selected = [sorted[0]];
    let lastFinishTime = sorted[0].finish;

    for (let i = 1; i < sorted.length; i++) {
        // Select if start time is after or equal to last finish time
        if (sorted[i].start >= lastFinishTime) {
            selected.push(sorted[i]);
            lastFinishTime = sorted[i].finish;
        }
    }

    return {
        selected,
        count: selected.length,
        totalActivities: activities.length
    };
}

// With activity IDs tracking
function activitySelectionWithIds(activities) {
    if (activities.length === 0) return { selected: [], count: 0 };

    // Add original index as ID
    const withIds = activities.map((a, i) => ({ ...a, id: i }));

    // Sort by finish time
    const sorted = [...withIds].sort((a, b) => a.finish - b.finish);

    const selected = [sorted[0]];
    let lastFinishTime = sorted[0].finish;

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].start >= lastFinishTime) {
            selected.push(sorted[i]);
            lastFinishTime = sorted[i].finish;
        }
    }

    return {
        selected,
        count: selected.length
    };
}

// For already sorted activities (by finish time)
function activitySelectionSorted(activities) {
    if (activities.length === 0) return { selected: [], count: 0 };

    const selected = [activities[0]];
    let lastFinishTime = activities[0].finish;

    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastFinishTime) {
            selected.push(activities[i]);
            lastFinishTime = activities[i].finish;
        }
    }

    return { selected, count: selected.length };
}

// Example usage
const activities = [
    { start: 1, finish: 3, name: 'A1' },
    { start: 2, finish: 5, name: 'A2' },
    { start: 4, finish: 7, name: 'A3' },
    { start: 1, finish: 8, name: 'A4' },
    { start: 5, finish: 9, name: 'A5' },
    { start: 8, finish: 10, name: 'A6' },
    { start: 9, finish: 11, name: 'A7' }
];

console.log('Activity Selection Problem');
console.log('==========================');
console.log('Activities:', activities);

const result = activitySelection(activities);
console.log('\nSelected Activities:');
result.selected.forEach(a => {
    console.log(`  ${a.name}: [${a.start}, ${a.finish}]`);
});
console.log('Count:', result.count);
console.log('Total:', result.totalActivities);

// Another example
console.log('\n--- Another Example ---');
const activities2 = [
    { start: 0, finish: 6, name: 'Meeting 1' },
    { start: 1, finish: 2, name: 'Meeting 2' },
    { start: 3, finish: 4, name: 'Meeting 3' },
    { start: 5, finish: 7, name: 'Meeting 4' },
    { start: 8, finish: 9, name: 'Meeting 5' },
    { start: 5, finish: 9, name: 'Meeting 6' }
];

const result2 = activitySelection(activities2);
console.log('Maximum meetings that can be attended:', result2.count);
result2.selected.forEach(m => console.log(`  ${m.name}`));
