// Job Sequencing with Deadlines
// Time Complexity: O(n²) or O(n log n) with optimized approach
// Space Complexity: O(n)
// Maximize profit by scheduling jobs within their deadlines

// Greedy approach using sorting by profit
function jobSequencing(jobs) {
    if (jobs.length === 0) {
        return { sequence: [], totalProfit: 0, totalJobs: 0 };
    }

    // Sort jobs by profit in descending order
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

    // Find maximum deadline
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));

    // Initialize slots (true = available)
    const slots = new Array(maxDeadline).fill(true);
    const sequence = [];
    let totalProfit = 0;

    // Iterate through sorted jobs
    for (const job of sortedJobs) {
        // Find a free slot for this job (starting from the last possible slot)
        for (let j = Math.min(maxDeadline, job.deadline) - 1; j >= 0; j--) {
            if (slots[j]) {
                slots[j] = false;
                sequence.push({ ...job, slot: j + 1 });
                totalProfit += job.profit;
                break;
            }
        }
    }

    // Sort sequence by slot number
    sequence.sort((a, b) => a.slot - b.slot);

    return {
        sequence,
        totalProfit,
        totalJobs: sequence.length,
        maxDeadline
    };
}

// Optimized approach using Disjoint Set Union (DSU)
// Time Complexity: O(n log n)
class DSU {
    constructor(n) {
        this.parent = new Array(n + 1);
        for (let i = 0; i <= n; i++) {
            this.parent[i] = i;
        }
    }

    find(x) {
        if (this.parent[x] === x) return x;
        return this.parent[x] = this.find(this.parent[x]);
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            this.parent[rootX] = rootY;
        }
    }
}

function jobSequencingOptimized(jobs) {
    if (jobs.length === 0) {
        return { sequence: [], totalProfit: 0, totalJobs: 0 };
    }

    // Sort by profit descending
    const sortedJobs = [...jobs].sort((a, b) => b.profit - a.profit);

    // Find maximum deadline
    const maxDeadline = Math.max(...jobs.map(job => job.deadline));

    // Initialize DSU
    const dsu = new DSU(maxDeadline);
    const slots = new Array(maxDeadline + 1).fill(null); // slot -> job
    const sequence = [];
    let totalProfit = 0;

    for (const job of sortedJobs) {
        // Find the latest available slot
        const availableSlot = dsu.find(Math.min(maxDeadline, job.deadline));

        if (availableSlot > 0) {
            slots[availableSlot] = job;
            sequence.push({ ...job, slot: availableSlot });
            totalProfit += job.profit;
            // Union with previous slot
            dsu.union(availableSlot, availableSlot - 1);
        }
    }

    return {
        sequence,
        totalProfit,
        totalJobs: sequence.length
    };
}

// With job IDs
function jobSequencingWithIds(jobs) {
    const withIds = jobs.map((job, index) => ({ ...job, id: index + 1 }));
    return jobSequencing(withIds);
}

// Example usage
console.log('Job Sequencing with Deadlines');
console.log('==============================');

const jobs = [
    { id: 'A', deadline: 2, profit: 100 },
    { id: 'B', deadline: 1, profit: 19 },
    { id: 'C', deadline: 2, profit: 27 },
    { id: 'D', deadline: 1, profit: 25 },
    { id: 'E', deadline: 3, profit: 15 }
];

console.log('Jobs:', jobs);

const result = jobSequencing(jobs);
console.log('\nOptimal Sequence:');
result.sequence.forEach(job => {
    console.log(`  Slot ${job.slot}: Job ${job.id} (deadline: ${job.deadline}, profit: ${job.profit})`);
});
console.log('\nTotal Jobs Completed:', result.totalJobs);
console.log('Maximum Profit:', result.totalProfit);

// Another example
console.log('\n--- Another Example ---');
const jobs2 = [
    { id: 'J1', deadline: 4, profit: 20 },
    { id: 'J2', deadline: 1, profit: 10 },
    { id: 'J3', deadline: 1, profit: 40 },
    { id: 'J4', deadline: 1, profit: 30 },
    { id: 'J5', deadline: 2, profit: 50 },
    { id: 'J6', deadline: 2, profit: 60 }
];

const result2 = jobSequencing(jobs2);
console.log('Jobs:', jobs2.map(j => j.id).join(', '));
console.log('Sequence:', result2.sequence.map(j => j.id).join(' → '));
console.log('Total Profit:', result2.totalProfit);

// Optimized version comparison
console.log('\n--- Optimized Version (DSU) ---');
const result3 = jobSequencingOptimized(jobs);
console.log('Total Profit:', result3.totalProfit);
