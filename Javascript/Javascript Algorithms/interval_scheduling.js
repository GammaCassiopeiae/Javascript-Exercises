// Interval Scheduling Problem
// Time Complexity: O(n log n) for sorting
// Space Complexity: O(n)
// Find maximum number of non-overlapping intervals
// Also known as: Maximum Independent Set of Intervals

// Greedy approach: Sort by finish time
function intervalScheduling(intervals) {
    if (intervals.length === 0) {
        return { selected: [], count: 0 };
    }

    // Sort intervals by finish time
    const sorted = [...intervals].sort((a, b) => a.end - b.end);

    const selected = [sorted[0]];
    let lastEndTime = sorted[0].end;

    for (let i = 1; i < sorted.length; i++) {
        // Select if start time is >= last finish time
        if (sorted[i].start >= lastEndTime) {
            selected.push(sorted[i]);
            lastEndTime = sorted[i].end;
        }
    }

    return {
        selected,
        count: selected.length,
        totalIntervals: intervals.length
    };
}

// Find minimum number of rooms needed (Interval Partitioning)
function intervalPartitioning(intervals) {
    if (intervals.length === 0) {
        return { rooms: 0, assignments: [] };
    }

    // Create events: start (+1) and end (-1)
    const events = [];
    for (const interval of intervals) {
        events.push({ time: interval.start, type: 'start', interval });
        events.push({ time: interval.end, type: 'end', interval });
    }

    // Sort events by time, with end events before start events at same time
    events.sort((a, b) => {
        if (a.time !== b.time) return a.time - b.time;
        return a.type === 'end' ? -1 : 1;
    });

    let rooms = 0;
    let maxRooms = 0;
    const availableRooms = [];
    const assignments = [];

    for (const event of events) {
        if (event.type === 'start') {
            let room;
            if (availableRooms.length > 0) {
                room = availableRooms.pop();
            } else {
                room = ++rooms;
            }
            assignments.push({ interval: event.interval, room });
            maxRooms = Math.max(maxRooms, rooms - availableRooms.length);
        } else {
            // Find the room assigned to this interval and free it
            const assignment = assignments.find(a => a.interval === event.interval);
            if (assignment) {
                availableRooms.push(assignment.room);
            }
        }
    }

    return {
        minRooms: maxRooms,
        assignments
    };
}

// Find maximum weight independent set of intervals
// Each interval has a weight, maximize total weight
function weightedIntervalScheduling(intervals) {
    if (intervals.length === 0) {
        return { selected: [], totalWeight: 0 };
    }

    const n = intervals.length;

    // Add index and sort by finish time
    const sorted = intervals.map((interval, i) => ({ ...interval, index: i }))
        .sort((a, b) => a.end - b.end);

    // Find p[j] = largest index i < j such that interval i doesn't overlap with j
    const p = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
        for (let i = j - 1; i >= 0; i--) {
            if (sorted[i].end <= sorted[j].start) {
                p[j] = i + 1; // 1-indexed for DP convenience
                break;            }
    }

    // DP: OPT[j] = maximum weight using intervals 1 to j
    const OPT = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
        OPT[j] = Math.max(
            sorted[j - 1].weight + OPT[p[j - 1]],
            OPT[j - 1]
        );
    }

    // Reconstruct solution
    const selected = [];
    let j = n;
    while (j > 0) {
        if (sorted[j - 1].weight + OPT[p[j - 1]] >= OPT[j - 1]) {
            selected.unshift(sorted[j - 1]);
            j = p[j - 1];
        } else {
            j--;
        }
    }

    return {
        selected,
        totalWeight: OPT[n]
    };
}

// Check if two intervals overlap
function intervalsOverlap(a, b) {
    return a.start < b.end && b.start < a.end;
}

// Merge overlapping intervals
function mergeIntervals(intervals) {
    if (intervals.length <= 1) return intervals;

    const sorted = [...intervals].sort((a, b) => a.start - b.start);
    const merged = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
        const last = merged[merged.length - 1];
        if (sorted[i].start <= last.end) {
            last.end = Math.max(last.end, sorted[i].end);
        } else {
            merged.push(sorted[i]);
        }
    }

    return merged;
}

// Example usage
console.log('Interval Scheduling Problem');
console.log('===========================');

const intervals = [
    { start: 1, end: 3, name: 'A' },
    { start: 2, end: 5, name: 'B' },
    { start: 4, end: 7, name: 'C' },
    { start: 6, end: 9, name: 'D' },
    { start: 8, end: 10, name: 'E' },
    { start: 3, end: 4, name: 'F' }
];

console.log('Intervals:', intervals);

const result = intervalScheduling(intervals);
console.log('\nMaximum Non-Overlapping Intervals:');
result.selected.forEach(i => {
    console.log(`  ${i.name}: [${i.start}, ${i.end}]`);
});
console.log('Count:', result.count);

// Interval Partitioning
console.log('\n--- Interval Partitioning ---');
const intervals2 = [
    { start: 1, end: 4, name: 'Class 1' },
    { start: 2, end: 5, name: 'Class 2' },
    { start: 3, end: 6, name: 'Class 3' },
    { start: 6, end: 8, name: 'Class 4' },
    { start: 5, end: 7, name: 'Class 5' }
];

const partition = intervalPartitioning(intervals2);
console.log('Minimum rooms needed:', partition.minRooms);
console.log('Room assignments:');
partition.assignments.forEach(a => {
    console.log(`  ${a.interval.name} -> Room ${a.room}`);
});

// Weighted Interval Scheduling
console.log('\n--- Weighted Interval Scheduling ---');
const weightedIntervals = [
    { start: 1, end: 3, weight: 5 },
    { start: 2, end: 5, weight: 6 },
    { start: 4, end: 6, weight: 5 },
    { start: 6, end: 8, weight: 4 },
    { start: 5, end: 7, weight: 11 },
    { start: 7, end: 9, weight: 2 }
];

const weightedResult = weightedIntervalScheduling(weightedIntervals);
console.log('Selected intervals:');
weightedResult.selected.forEach(i => {
    console.log(`  [${i.start}, ${i.end}] weight: ${i.weight}`);
});
console.log('Total weight:', weightedResult.totalWeight);

// Merge Intervals
console.log('\n--- Merge Overlapping Intervals ---');
const toMerge = [
    { start: 1, end: 4 },
    { start: 2, end: 5 },
    { start: 7, end: 9 },
    { start: 8, end: 10 },
    { start: 15, end: 18 }
];
console.log('Original:', toMerge);
console.log('Merged:', mergeIntervals(toMerge));
