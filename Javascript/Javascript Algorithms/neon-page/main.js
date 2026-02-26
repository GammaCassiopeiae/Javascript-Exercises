/**
 * NEON-GRID // SYSTEM_DASHBOARD_CONTROLLER
 * Compliant with Directives 201-300
 */

(function() {
    'use strict';

    // 1. Reference Caching (Directive 202)
    const DOM = {
        cpuVal: document.getElementById('js-cpu-val'),
        cpuBar: document.getElementById('js-cpu-bar'),
        memVal: document.getElementById('js-mem-val'),
        memBar: document.getElementById('js-mem-bar'),
        pingVal: document.getElementById('js-ping-val'),
        pingBar: document.getElementById('js-ping-bar'),
        terminal: document.getElementById('js-terminal'),
        uptime: document.getElementById('js-uptime'),
        configForm: document.getElementById('js-config-form'),
        logTemplate: document.getElementById('js-log-template')
    };

    // State Management
    const state = {
        startTime: Date.now(),
        isActive: true,
        nodeCount: 0
    };

    /**
     * Updates the system uptime display
     * Uses requestAnimationFrame for precision (Directive 217)
     */
    function updateUptime() {
        const diff = Date.now() - state.startTime;
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const mins = Math.floor((diff % 3600000) / 60000);
        const secs = Math.floor((diff % 60000) / 1000);

        const formatted = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
        DOM.uptime.textContent = formatted;

        if (state.isActive) {
            requestAnimationFrame(updateUptime);
        }
    }

    /**
     * Simulates real-time system metrics
     */
    function simulateMetrics() {
        // CPU Simulation
        const cpu = Math.floor(Math.random() * 40) + 20; // 20-60%
        DOM.cpuVal.textContent = String(cpu).padStart(2, '0');
        DOM.cpuBar.style.width = `${cpu}%`;

        // Memory Simulation
        const mem = (Math.random() * 4 + 8).toFixed(1); // 8-12 GB
        DOM.memVal.textContent = mem;
        DOM.memBar.style.width = `${(parseFloat(mem) / 16) * 100}%`;

        // Ping Simulation
        const ping = Math.floor(Math.random() * 15) + 5; // 5-20 ms
        DOM.pingVal.textContent = String(ping).padStart(2, '0');
        DOM.pingBar.style.width = `${(ping / 50) * 100}%`;

        // Rare terminal log injection
        if (Math.random() > 0.9) {
            addTerminalLog(`NETWORK_TRAFFIC: SECTOR_${Math.floor(Math.random() * 9)} STABLE`);
        }
    }

    /**
     * Adds a line to the terminal using templates (Directive 205)
     * @param {string} text 
     */
    function addTerminalLog(text) {
        const clone = DOM.logTemplate.content.cloneNode(true);
        const line = clone.querySelector('.c-terminal__line');
        line.textContent = `> [${new Date().toLocaleTimeString()}] ${text}`;
        
        DOM.terminal.appendChild(clone);
        DOM.terminal.scrollTop = DOM.terminal.scrollHeight;

        // Keep terminal clean (max 20 lines)
        if (DOM.terminal.children.length > 20) {
            DOM.terminal.removeChild(DOM.terminal.firstElementChild);
        }
    }

    /**
     * Form Handling (Directive 223/253)
     */
    function handleConfigSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const nodeName = formData.get('node-name') || 'UNKNOWN_NODE';
        
        addTerminalLog(`CONFIGURING NODE: ${nodeName.toUpperCase()}...`);
        
        // Mock async sync
        const submitBtn = e.target.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'SYNCING...';

        setTimeout(() => {
            addTerminalLog(`SUCCESS: ${nodeName} SYNCHRONIZED TO GRID.`);
            submitBtn.disabled = false;
            submitBtn.textContent = 'SYNC_NODE';
            e.target.reset(); // Directive 253
        }, 1500);
    }

    /**
     * Event Delegation (Directive 207)
     */
    function initEvents() {
        // Form submission
        DOM.configForm.addEventListener('submit', handleConfigSubmit);

        // Sidebar Navigation Delegation
        document.getElementById('js-sidebar').addEventListener('click', (e) => {
            const btn = e.target.closest('.c-btn--sidebar');
            if (!btn) return;

            // Update UI State
            document.querySelectorAll('.c-btn--sidebar').forEach(b => b.classList.remove('is-active'));
            btn.classList.add('is-active');

            addTerminalLog(`NAVIGATING TO: ${btn.textContent.trim()}`);
        });

        // Global key listener for terminal focus (Mock)
        window.addEventListener('keydown', (e) => {
            if (e.key === '`') {
                addTerminalLog("TERMINAL_OVERRIDE_INITIATED...");
            }
        });
    }

    /**
     * Intersection Observer for Card Animations (Directive 216)
     */
    function initObservers() {
        const observerOptions = {
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Once visible, stop observing
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.c-card').forEach(card => {
            observer.observe(card);
        });
    }

    /**
     * Initializer
     */
    function init() {
        addTerminalLog("NEON-GRID ARCHITECT INTERFACE LOADED.");
        addTerminalLog("ENCRYPTED SESSION SECURE.");
        
        // Start Loops
        requestAnimationFrame(updateUptime);
        setInterval(simulateMetrics, 2000);
        
        initEvents();
        initObservers();
    }

    // Wait for DOM (Directive 241)
    document.addEventListener('DOMContentLoaded', init);

})();
