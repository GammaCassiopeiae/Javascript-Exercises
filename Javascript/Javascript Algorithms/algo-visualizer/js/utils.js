/**
 * ALGORITHM VISUALIZER - SHARED UTILITIES
 * Professional Vanilla JavaScript Implementation
 * Following R.A.G. Directives & Neon-Grid Architect Manifesto v3.0
 */

(function(global) {
    'use strict';

    // ==========================================================================
    // UTILS NAMESPACE
    // ==========================================================================
    const Utils = {};

    // ==========================================================================
    // DELAY / SLEEP FUNCTION
    // ==========================================================================
    Utils.sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // ==========================================================================
    // RANDOM ARRAY GENERATOR
    // ==========================================================================
    Utils.generateRandomArray = (length, min = 10, max = 100) => {
        const arr = [];
        for (let i = 0; i < length; i++) {
            arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return arr;
    };

    // ==========================================================================
    // ARRAY SHUFFLE (Fisher-Yates)
    // ==========================================================================
    Utils.shuffleArray = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    };

    // ==========================================================================
    // CANVAS HELPERS
    // ==========================================================================
    Utils.setupCanvas = (canvasId) => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return null;
        
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);
        
        return { canvas, ctx, width: rect.width, height: rect.height };
    };

    Utils.clearCanvas = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);
    };

    Utils.drawRoundedRect = (ctx, x, y, width, height, radius, fillStyle, strokeStyle) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        
        if (fillStyle) {
            ctx.fillStyle = fillStyle;
            ctx.fill();
        }
        
        if (strokeStyle) {
            ctx.strokeStyle = strokeStyle;
            ctx.stroke();
        }
    };

    Utils.drawText = (ctx, text, x, y, fontSize = 14, color = '#ffffff', align = 'center') => {
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px Rajdhani, sans-serif`;
        ctx.textAlign = align;
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x, y);
    };

    // ==========================================================================
    // DRAW BARS FOR SORTING VISUALIZATION
    // ==========================================================================
    Utils.drawBars = (ctx, array, width, height, colors = {}, options = {}) => {
        const {
            defaultColor = 'rgba(0, 243, 255, 0.6)',
            compareColor = '#ff00ff',
            swapColor = '#f6c23e',
            sortedColor = '#1cc88a',
            currentColor = '#00f3ff',
            compareIndices = [],
            swapIndices = [],
            sortedIndices = [],
            currentIndex = -1,
            showValues = true
        } = options;

        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding;
        const barWidth = chartWidth / array.length - 2;
        const maxValue = Math.max(...array);

        array.forEach((value, index) => {
            const barHeight = (value / maxValue) * chartHeight;
            const x = padding + index * (barWidth + 2);
            const y = height - padding - barHeight;

            let color = defaultColor;
            let glow = false;

            if (sortedIndices.includes(index)) {
                color = sortedColor;
            } else if (swapIndices.includes(index)) {
                color = swapColor;
                glow = true;
            } else if (compareIndices.includes(index)) {
                color = compareColor;
                glow = true;
            } else if (index === currentIndex) {
                color = currentColor;
                glow = true;
            }

            // Draw bar with glow effect
            if (glow) {
                ctx.shadowColor = color;
                ctx.shadowBlur = 15;
            } else {
                ctx.shadowBlur = 0;
            }

            Utils.drawRoundedRect(ctx, x, y, barWidth, barHeight, 3, color);

            // Draw value on top
            if (showValues && barWidth > 20) {
                ctx.shadowBlur = 0;
                Utils.drawText(ctx, value.toString(), x + barWidth / 2, y - 10, 12, '#ffffff');
            }
        });

        ctx.shadowBlur = 0;
    };

    // ==========================================================================
    // DRAW TREE NODE
    // ==========================================================================
    Utils.drawTreeNode = (ctx, node, x, y, radius, options = {}) => {
        const {
            defaultColor = 'rgba(0, 243, 255, 0.3)',
            highlightColor = '#ff00ff',
            visitedColor = 'rgba(54, 185, 204, 0.5)',
            pathColor = '#00ff88',
            isHighlighted = false,
            isVisited = false,
            isPath = false
        } = options;

        let color = defaultColor;
        if (isPath) color = pathColor;
        else if (isHighlighted) color = highlightColor;
        else if (isVisited) color = visitedColor;

        // Draw glow
        ctx.shadowColor = color;
        ctx.shadowBlur = isHighlighted ? 20 : 10;

        // Draw circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        // Draw border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.shadowBlur = 0;

        // Draw value
        if (node && node.value !== undefined) {
            Utils.drawText(ctx, node.value.toString(), x, y, 14, '#ffffff');
        }
    };

    Utils.drawTreeLine = (ctx, x1, y1, x2, y2, options = {}) => {
        const {
            color = 'rgba(255, 255, 255, 0.2)',
            highlightColor = '#00f3ff',
            isHighlighted = false
        } = options;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = isHighlighted ? highlightColor : color;
        ctx.lineWidth = isHighlighted ? 3 : 2;
        ctx.stroke();
    };

    // ==========================================================================
    // DRAW GRID CELL (for pathfinding, DP, etc.)
    // ==========================================================================
    Utils.drawGridCell = (ctx, x, y, size, type, options = {}) => {
        const {
            defaultColor = 'rgba(255, 255, 255, 0.05)',
            wallColor = '#e74a3b',
            startColor = '#1cc88a',
            endColor = '#ff00ff',
            visitedColor = 'rgba(54, 185, 204, 0.4)',
            pathColor = '#00ff88',
            currentColor = '#f6c23e'
        } = options;

        let color = defaultColor;
        let glow = false;

        switch (type) {
            case 'wall': color = wallColor; break;
            case 'start': color = startColor; glow = true; break;
            case 'end': color = endColor; glow = true; break;
            case 'visited': color = visitedColor; break;
            case 'path': color = pathColor; glow = true; break;
            case 'current': color = currentColor; glow = true; break;
        }

        if (glow) {
            ctx.shadowColor = color;
            ctx.shadowBlur = 10;
        }

        ctx.fillStyle = color;
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

        ctx.shadowBlur = 0;

        // Draw border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
    };

    // ==========================================================================
    // DRAW GRID
    // ==========================================================================
    Utils.drawGrid = (ctx, grid, cellSize, width, height, options = {}) => {
        const startX = (width - grid[0].length * cellSize) / 2;
        const startY = (height - grid.length * cellSize) / 2;

        for (let row = 0; row < grid.length; row++) {
            for (let col = 0; col < grid[row].length; col++) {
                const x = startX + col * cellSize;
                const y = startY + row * cellSize;
                Utils.drawGridCell(ctx, x, y, cellSize, grid[row][col], options);
            }
        }
    };

    // ==========================================================================
    // ANIMATION CONTROLLER
    // ==========================================================================
    Utils.AnimationController = class {
        constructor() {
            this.isRunning = false;
            this.isPaused = false;
            this.speed = 100;
            this.onStep = null;
            this.onComplete = null;
        }

        setSpeed(speed) {
            this.speed = Math.max(1, Math.min(500, speed));
        }

        async run(steps) {
            this.isRunning = true;
            this.isPaused = false;

            for (let i = 0; i < steps.length && this.isRunning; i++) {
                while (this.isPaused && this.isRunning) {
                    await Utils.sleep(100);
                }

                if (!this.isRunning) break;

                if (this.onStep) {
                    this.onStep(steps[i]);
                }

                await Utils.sleep(this.speed);
            }

            this.isRunning = false;
            if (this.onComplete) {
                this.onComplete();
            }
        }

        stop() {
            this.isRunning = false;
            this.isPaused = false;
        }

        pause() {
            this.isPaused = true;
        }

        resume() {
            this.isPaused = false;
        }

        togglePause() {
            this.isPaused = !this.isPaused;
        }
    };

    // ==========================================================================
    // STATS TRACKER
    // ==========================================================================
    Utils.StatsTracker = class {
        constructor() {
            this.reset();
        }

        reset() {
            this.comparisons = 0;
            this.swaps = 0;
            this.iterations = 0;
            this.startTime = null;
            this.endTime = null;
        }

        start() {
            this.reset();
            this.startTime = performance.now();
        }

        recordComparison() {
            this.comparisons++;
        }

        recordSwap() {
            this.swaps++;
        }

        recordIteration() {
            this.iterations++;
        }

        stop() {
            this.endTime = performance.now();
        }

        getElapsedTime() {
            if (!this.startTime) return 0;
            const end = this.endTime || performance.now();
            return ((end - this.startTime) / 1000).toFixed(3);
        }

        getStats() {
            return {
                comparisons: this.comparisons,
                swaps: this.swaps,
                iterations: this.iterations,
                time: this.getElapsedTime()
            };
        }

        updateDisplay(containerId) {
            const container = document.getElementById(containerId);
            if (!container) return;

            const stats = this.getStats();
            container.innerHTML = `
                <div class="c-stat">
                    <div class="c-stat__value">${stats.comparisons}</div>
                    <div class="c-stat__label">Comparisons</div>
                </div>
                <div class="c-stat">
                    <div class="c-stat__value">${stats.swaps}</div>
                    <div class="c-stat__label">Swaps</div>
                </div>
                <div class="c-stat">
                    <div class="c-stat__value">${stats.iterations}</div>
                    <div class="c-stat__label">Iterations</div>
                </div>
                <div class="c-stat">
                    <div class="c-stat__value">${stats.time}s</div>
                    <div class="c-stat__label">Time</div>
                </div>
            `;
        }
    };

    // ==========================================================================
    // INPUT PARSER
    // ==========================================================================
    Utils.parseArrayInput = (input, defaultArray = null) => {
        if (!input || input.trim() === '') {
            return defaultArray || Utils.generateRandomArray(10, 10, 100);
        }

        try {
            // Try parsing as JSON array
            if (input.trim().startsWith('[')) {
                const parsed = JSON.parse(input);
                if (Array.isArray(parsed)) {
                    return parsed.filter(n => typeof n === 'number' && !isNaN(n));
                }
            }

            // Try parsing as comma-separated values
            const parts = input.split(/[,\s]+/).filter(s => s.trim() !== '');
            const numbers = parts.map(s => parseFloat(s)).filter(n => !isNaN(n));
            
            if (numbers.length > 0) {
                return numbers;
            }
        } catch (e) {
            console.error('Error parsing input:', e);
        }

        return defaultArray || Utils.generateRandomArray(10, 10, 100);
    };

    // ==========================================================================
    // DOM HELPERS
    // ==========================================================================
    Utils.getElement = (selector) => {
        return document.querySelector(selector);
    };

    Utils.getElements = (selector) => {
        return document.querySelectorAll(selector);
    };

    Utils.setValue = (selector, value) => {
        const el = Utils.getElement(selector);
        if (el) el.value = value;
    };

    Utils.getValue = (selector) => {
        const el = Utils.getElement(selector);
        return el ? el.value : null;
    };

    Utils.setText = (selector, text) => {
        const el = Utils.getElement(selector);
        if (el) el.textContent = text;
    };

    Utils.setEnabled = (selector, enabled) => {
        const el = Utils.getElement(selector);
        if (el) el.disabled = !enabled;
    };

    Utils.addClass = (selector, className) => {
        const el = Utils.getElement(selector);
        if (el) el.classList.add(className);
    };

    Utils.removeClass = (selector, className) => {
        const el = Utils.getElement(selector);
        if (el) el.classList.remove(className);
    };

    Utils.toggleClass = (selector, className) => {
        const el = Utils.getElement(selector);
        if (el) el.classList.toggle(className);
    };

    // ==========================================================================
    // EVENT BINDING
    // ==========================================================================
    Utils.bindClick = (selector, handler) => {
        const el = Utils.getElement(selector);
        if (el) {
            el.addEventListener('click', handler);
        }
    };

    Utils.bindInput = (selector, handler) => {
        const el = Utils.getElement(selector);
        if (el) {
            el.addEventListener('input', handler);
        }
    };

    Utils.bindChange = (selector, handler) => {
        const el = Utils.getElement(selector);
        if (el) {
            el.addEventListener('change', handler);
        }
    };

    // ==========================================================================
    // NOTIFICATION / TOAST
    // ==========================================================================
    Utils.showToast = (message, type = 'info', duration = 3000) => {
        const toast = document.createElement('div');
        toast.className = `c-toast c-toast--${type}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            background: rgba(10, 11, 16, 0.95);
            border: 1px solid var(--neon-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'primary'});
            border-radius: 0.5rem;
            color: var(--color-white);
            z-index: 9999;
            animation: slideDown 0.3s ease-out;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeIn 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    };

    // ==========================================================================
    // EXPORT TO GLOBAL
    // ==========================================================================
    global.AlgoViz = Utils;

})(typeof window !== 'undefined' ? window : this);
