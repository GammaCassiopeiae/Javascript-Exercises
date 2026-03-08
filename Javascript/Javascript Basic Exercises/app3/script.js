/**
 * Algorithm Simulation Engine
 */

const mockExecution = () => {
    const data = [
        { id: 'res-bogo', val: 'TIMEOUT_INF' },
        { id: 'res-gnome', val: 'SORTED_54ms' },
        { id: 'res-bubble', val: 'SWAPS: 21' },
        { id: 'res-insertion', val: 'KEYS: 15' },
        { id: 'res-selection', val: 'MIN_FOUND' },
        { id: 'res-merge', val: 'DIVIDED_8x' },
        { id: 'res-native', val: 'V8_0.001ms' },
        { id: 'res-bucket', val: 'BKT_COUNT: 5' },
        { id: 'res-matrix', val: 'FLATTENED' },
        { id: 'res-quick', val: 'PIVOT_LOCKED' },
        { id: 'res-linear', val: 'FOUND_AT_7' },
        { id: 'res-binary', val: 'FOUND_AT_42' }
    ];

    data.forEach((item, index) => {
        setTimeout(() => {
            const el = document.getElementById(item.id);
            if (el) {
                el.textContent = `> ${item.val}`;
                el.parentElement.style.background = 'rgba(188, 0, 255, 0.05)';
            }
        }, index * 150);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const runBtn = document.getElementById('run-all');
    runBtn.addEventListener('click', () => {
        // Reset
        document.querySelectorAll('.c-algo-row__result').forEach(r => r.textContent = 'EXECUTING...');
        mockExecution();
    });
});
