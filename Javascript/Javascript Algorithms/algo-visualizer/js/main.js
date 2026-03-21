/**
 * ALGORITHM VISUALIZER - MAIN JAVASCRIPT
 * Dashboard Navigation and Preview Animations
 * Following R.A.G. Directives & Neon-Grid Architect Manifesto v3.0
 */

(function() {
    'use strict';

    // ==========================================================================
    // STATE MANAGEMENT
    // ==========================================================================
    const AppState = {
        sidebarCollapsed: false,
        previewAnimations: {}
    };

    // ==========================================================================
    // DOM ELEMENTS
    // ==========================================================================
    const DOM = {
        wrapper: null,
        sidebarToggle: null,
        canvases: {}
    };

    // ==========================================================================
    // INITIALIZATION
    // ==========================================================================
    function init() {
        cacheDOM();
        bindEvents();
        initSidebar();
        initPreviewAnimations();
        console.log('AlgoViz Dashboard initialized');
    }

    function cacheDOM() {
        DOM.wrapper = document.getElementById('wrapper');
        DOM.sidebarToggle = document.getElementById('sidebarToggle');
        
        DOM.canvases = {
            sorting: document.getElementById('sortingPreview'),
            searching: document.getElementById('searchingPreview'),
            trees: document.getElementById('treesPreview'),
            graphs: document.getElementById('graphsPreview'),
            dp: document.getElementById('dpPreview'),
            ds: document.getElementById('dsPreview'),
            pathfinding: document.getElementById('pathfindingPreview'),
            recursion: document.getElementById('recursionPreview'),
            strings: document.getElementById('stringsPreview'),
            advanced: document.getElementById('advancedPreview')
        };
    }

    function bindEvents() {
        if (DOM.sidebarToggle) {
            DOM.sidebarToggle.addEventListener('click', toggleSidebar);
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', handleOutsideClick);

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Window resize
        window.addEventListener('resize', debounce(handleResize, 250));
    }

    // ==========================================================================
    // SIDEBAR FUNCTIONS
    // ==========================================================================
    function initSidebar() {
        const savedState = localStorage.getItem('sidebarState');
        if (savedState === 'collapsed') {
            DOM.wrapper.classList.add('l-wrapper--collapsed');
            AppState.sidebarCollapsed = true;
        }
    }

    function toggleSidebar() {
        AppState.sidebarCollapsed = !AppState.sidebarCollapsed;
        DOM.wrapper.classList.toggle('l-wrapper--collapsed', AppState.sidebarCollapsed);
        localStorage.setItem('sidebarState', AppState.sidebarCollapsed ? 'collapsed' : 'expanded');
    }

    function handleOutsideClick(e) {
        // Close mobile sidebar when clicking outside
        if (window.innerWidth <= 768 && 
            !e.target.closest('.c-sidebar') && 
            !e.target.closest('.c-topbar__toggle')) {
            DOM.wrapper.classList.remove('l-wrapper--sidebar-open');
        }
    }

    function handleKeyboard(e) {
        if (e.key === 'Escape') {
            if (window.innerWidth <= 768) {
                DOM.wrapper.classList.remove('l-wrapper--sidebar-open');
            }
        }
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            DOM.wrapper.classList.remove('l-wrapper--sidebar-open');
        }
    }

    // ==========================================================================
    // PREVIEW ANIMATIONS
    // ==========================================================================
    function initPreviewAnimations() {
        // Sorting Preview - Animated bars
        if (DOM.canvases.sorting) {
            AppState.previewAnimations.sorting = createSortingPreview(DOM.canvases.sorting);
        }

        // Searching Preview - Highlight moving
        if (DOM.canvases.searching) {
            AppState.previewAnimations.searching = createSearchingPreview(DOM.canvases.searching);
        }

        // Trees Preview - Tree structure
        if (DOM.canvases.trees) {
            AppState.previewAnimations.trees = createTreePreview(DOM.canvases.trees);
        }

        // Graphs Preview - Network nodes
        if (DOM.canvases.graphs) {
            AppState.previewAnimations.graphs = createGraphPreview(DOM.canvases.graphs);
        }

        // DP Preview - Grid cells
        if (DOM.canvases.dp) {
            AppState.previewAnimations.dp = createDPPreview(DOM.canvases.dp);
        }

        // DS Preview - Stack animation
        if (DOM.canvases.ds) {
            AppState.previewAnimations.ds = createStackPreview(DOM.canvases.ds);
        }

        // Pathfinding Preview - Grid with path
        if (DOM.canvases.pathfinding) {
            AppState.previewAnimations.pathfinding = createPathfindingPreview(DOM.canvases.pathfinding);
        }

        // Recursion Preview - Fractal tree
        if (DOM.canvases.recursion) {
            AppState.previewAnimations.recursion = createRecursionPreview(DOM.canvases.recursion);
        }

        // Strings Preview - Pattern matching
        if (DOM.canvases.strings) {
            AppState.previewAnimations.strings = createStringsPreview(DOM.canvases.strings);
        }

        // Advanced Preview - Segment tree
        if (DOM.canvases.advanced) {
            AppState.previewAnimations.advanced = createSegmentTreePreview(DOM.canvases.advanced);
        }
    }

    // ==========================================================================
    // SORTING PREVIEW
    // ==========================================================================
    function createSortingPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        let offset = 0;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            const bars = 20;
            const barWidth = (width - 40) / bars - 2;
            const padding = 20;
            
            for (let i = 0; i < bars; i++) {
                const value = Math.sin((i + offset) * 0.3) * 30 + 50;
                const barHeight = (value / 100) * (height - 40);
                const x = padding + i * (barWidth + 2);
                const y = height - padding - barHeight;
                
                const hue = (i * 10 + offset * 20) % 360;
                ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
                ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
                ctx.shadowBlur = 10;
                
                ctx.beginPath();
                ctx.roundRect(x, y, barWidth, barHeight, 3);
                ctx.fill();
            }
            
            ctx.shadowBlur = 0;
            offset += 0.05;
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // SEARCHING PREVIEW
    // ==========================================================================
    function createSearchingPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        let currentIndex = 0;
        let direction = 1;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            const boxes = 15;
            const boxSize = Math.min(40, (width - 40) / boxes - 4);
            const padding = 20;
            const startX = (width - boxes * (boxSize + 4)) / 2;
            const centerY = height / 2;
            
            const targetIndex = 7;
            
            for (let i = 0; i < boxes; i++) {
                const x = startX + i * (boxSize + 4);
                const y = centerY - boxSize / 2;
                
                let color = 'rgba(0, 243, 255, 0.3)';
                let glow = 0;
                
                if (i === currentIndex) {
                    color = i === targetIndex ? '#1cc88a' : '#ff00ff';
                    glow = 15;
                } else if (i < currentIndex) {
                    color = 'rgba(255, 255, 255, 0.1)';
                }
                
                ctx.shadowColor = color;
                ctx.shadowBlur = glow;
                ctx.fillStyle = color;
                
                ctx.beginPath();
                ctx.roundRect(x, y, boxSize, boxSize, 5);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = '12px Rajdhani';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText((i * 3 + 5).toString(), x + boxSize / 2, y + boxSize / 2);
            }
            
            currentIndex += direction;
            if (currentIndex >= boxes || currentIndex < 0) {
                direction *= -1;
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // TREE PREVIEW
    // ==========================================================================
    function createTreePreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        let pulsePhase = 0;

        const nodes = [
            { x: width / 2, y: 60, value: 8 },
            { x: width / 4, y: 140, value: 4 },
            { x: width * 3 / 4, y: 140, value: 12 },
            { x: width / 8, y: 220, value: 2 },
            { x: width * 3 / 8, y: 220, value: 6 },
            { x: width * 5 / 8, y: 220, value: 10 },
            { x: width * 7 / 8, y: 220, value: 14 }
        ];

        const edges = [
            [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]
        ];

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw edges
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
            ctx.lineWidth = 2;
            edges.forEach(([from, to]) => {
                ctx.beginPath();
                ctx.moveTo(nodes[from].x, nodes[from].y);
                ctx.lineTo(nodes[to].x, nodes[to].y);
                ctx.stroke();
            });
            
            // Draw nodes
            const pulse = Math.sin(pulsePhase) * 5 + 10;
            nodes.forEach((node, i) => {
                const isHighlighted = i === 0 || i === Math.floor(pulsePhase * 2) % nodes.length;
                
                ctx.shadowColor = isHighlighted ? '#00f3ff' : 'transparent';
                ctx.shadowBlur = isHighlighted ? pulse : 0;
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
                ctx.fillStyle = isHighlighted ? '#00f3ff' : 'rgba(0, 243, 255, 0.3)';
                ctx.fill();
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Rajdhani';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(node.value.toString(), node.x, node.y);
            });
            
            pulsePhase += 0.03;
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // GRAPH PREVIEW
    // ==========================================================================
    function createGraphPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        let activeNode = 0;

        const nodes = [
            { x: width * 0.5, y: height * 0.3 },
            { x: width * 0.25, y: height * 0.5 },
            { x: width * 0.75, y: height * 0.5 },
            { x: width * 0.15, y: height * 0.75 },
            { x: width * 0.4, y: height * 0.75 },
            { x: width * 0.6, y: height * 0.75 },
            { x: width * 0.85, y: height * 0.75 }
        ];

        const edges = [
            [0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6], [3, 4], [5, 6]
        ];

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw edges
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
            ctx.lineWidth = 2;
            edges.forEach(([from, to]) => {
                ctx.beginPath();
                ctx.moveTo(nodes[from].x, nodes[from].y);
                ctx.lineTo(nodes[to].x, nodes[to].y);
                ctx.stroke();
            });
            
            // Draw nodes
            nodes.forEach((node, i) => {
                const isActive = i === activeNode;
                const radius = isActive ? 25 : 20;
                
                ctx.shadowColor = isActive ? '#00f3ff' : 'transparent';
                ctx.shadowBlur = isActive ? 15 : 0;
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = isActive ? '#00f3ff' : 'rgba(0, 243, 255, 0.3)';
                ctx.fill();
                
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Rajdhani';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText((i + 1).toString(), node.x, node.y);
            });
            
            activeNode = (activeNode + 0.01) % nodes.length;
            if (Math.floor(activeNode) !== Math.floor((activeNode + 0.01) % nodes.length)) {
                activeNode = Math.floor(activeNode);
            }
            
            // Cycle through nodes
            const time = Date.now() / 1000;
            activeNode = Math.floor(time) % nodes.length;
            
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // DP PREVIEW
    // ==========================================================================
    function createDPPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const rows = 5;
        const cols = 8;
        const cellSize = Math.min(35, (width - 40) / cols, (height - 40) / rows);
        const startX = (width - cols * cellSize) / 2;
        const startY = (height - rows * cellSize) / 2;
        
        let activeCell = { row: 0, col: 0 };
        let visited = new Set();

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = startX + col * cellSize;
                    const y = startY + row * cellSize;
                    const key = `${row},${col}`;
                    
                    let color = 'rgba(255, 255, 255, 0.05)';
                    let glow = 0;
                    
                    if (visited.has(key)) {
                        color = 'rgba(54, 185, 204, 0.4)';
                    }
                    
                    if (row === activeCell.row && col === activeCell.col) {
                        color = '#00f3ff';
                        glow = 10;
                    }
                    
                    ctx.shadowColor = color;
                    ctx.shadowBlur = glow;
                    ctx.fillStyle = color;
                    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                    
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, y, cellSize, cellSize);
                    
                    ctx.shadowBlur = 0;
                }
            }
            
            // Move to next cell
            if (Math.random() < 0.05) {
                visited.add(`${activeCell.row},${activeCell.col}`);
                activeCell.col++;
                if (activeCell.col >= cols) {
                    activeCell.col = 0;
                    activeCell.row++;
                    if (activeCell.row >= rows) {
                        activeCell.row = 0;
                        visited.clear();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // STACK PREVIEW (Data Structures)
    // ==========================================================================
    function createStackPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const stackWidth = 120;
        const stackHeight = 25;
        const stackX = (width - stackWidth) / 2;
        let stackItems = [];
        let operation = 'push';
        let operationProgress = 0;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw stack container
            const containerHeight = 200;
            const containerX = stackX - 10;
            const containerY = (height - containerHeight) / 2;
            
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(containerX, containerY, stackWidth + 20, containerHeight);
            
            // Draw label
            ctx.fillStyle = '#00f3ff';
            ctx.font = '14px Rajdhani';
            ctx.textAlign = 'center';
            ctx.fillText('STACK (LIFO)', width / 2, containerY - 10);
            
            // Animate items
            operationProgress += 0.02;
            if (operationProgress >= 1) {
                operationProgress = 0;
                if (operation === 'push') {
                    if (stackItems.length < 6) {
                        stackItems.push({ value: stackItems.length + 1, y: containerY + containerHeight - 30 });
                    }
                    operation = 'pop';
                } else {
                    if (stackItems.length > 1) {
                        stackItems.pop();
                    }
                    operation = 'push';
                }
            }
            
            // Draw items
            stackItems.forEach((item, i) => {
                const targetY = containerY + containerHeight - 30 - i * stackHeight;
                const y = i === stackItems.length - 1 && operation === 'push'
                    ? containerY + containerHeight + 20 - (1 - operationProgress) * 50
                    : targetY;
                
                const hue = (i * 40) % 360;
                ctx.fillStyle = `hsla(${hue}, 80%, 60%, 0.7)`;
                ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
                ctx.shadowBlur = i === stackItems.length - 1 ? 10 : 0;
                
                ctx.beginPath();
                ctx.roundRect(stackX, y, stackWidth, stackHeight - 2, 5);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = '14px Rajdhani';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(item.value.toString(), stackX + stackWidth / 2, y + stackHeight / 2);
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // PATHFINDING PREVIEW
    // ==========================================================================
    function createPathfindingPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const rows = 7;
        const cols = 11;
        const cellSize = Math.min(25, (width - 40) / cols, (height - 40) / rows);
        const startX = (width - cols * cellSize) / 2;
        const startY = (height - rows * cellSize) / 2;
        
        // Create maze
        const maze = [];
        for (let row = 0; row < rows; row++) {
            maze[row] = [];
            for (let col = 0; col < cols; col++) {
                maze[row][col] = Math.random() < 0.2 ? 'wall' : 'empty';
            }
        }
        maze[0][0] = 'start';
        maze[rows-1][cols-1] = 'end';
        
        let path = [{ row: 0, col: 0 }];
        let pathIndex = 0;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    const x = startX + col * cellSize;
                    const y = startY + row * cellSize;
                    const cell = maze[row][col];
                    
                    let color = 'rgba(255, 255, 255, 0.05)';
                    let glow = 0;
                    
                    if (cell === 'wall') {
                        color = '#e74a3b';
                    } else if (cell === 'start') {
                        color = '#1cc88a';
                        glow = 10;
                    } else if (cell === 'end') {
                        color = '#ff00ff';
                        glow = 10;
                    }
                    
                    // Check if on path
                    const onPath = path.some((p, i) => p.row === row && p.col === col && i < pathIndex);
                    if (onPath) {
                        color = '#00ff88';
                        glow = 5;
                    }
                    
                    ctx.shadowColor = color;
                    ctx.shadowBlur = glow;
                    ctx.fillStyle = color;
                    ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
                    
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.strokeRect(x, y, cellSize, cellSize);
                }
            }
            
            ctx.shadowBlur = 0;
            
            // Advance path
            if (Math.random() < 0.03 && pathIndex < path.length) {
                pathIndex++;
            }
            
            // Regenerate path occasionally
            if (Math.random() < 0.005) {
                path = generateRandomPath(maze, rows, cols);
                pathIndex = 0;
            }
            
            requestAnimationFrame(animate);
        }
        
        function generateRandomPath(maze, rows, cols) {
            const path = [{ row: 0, col: 0 }];
            let row = 0, col = 0;
            
            while (row < rows - 1 || col < cols - 1) {
                if (col < cols - 1 && Math.random() < 0.5) {
                    col++;
                } else if (row < rows - 1) {
                    row++;
                } else {
                    col++;
                }
                if (maze[row][col] !== 'wall') {
                    path.push({ row, col });
                }
            }
            
            return path;
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // RECURSION PREVIEW (Fractal Tree)
    // ==========================================================================
    function createRecursionPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        let angle = 0;

        function drawBranch(startX, startY, len, branchAngle, depth) {
            if (depth === 0) return;
            
            const endX = startX + len * Math.cos(branchAngle);
            const endY = startY + len * Math.sin(branchAngle);
            
            const hue = (depth * 20 + angle * 30) % 360;
            ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${depth / 5})`;
            ctx.shadowColor = `hsla(${hue}, 80%, 60%, 0.5)`;
            ctx.shadowBlur = depth * 2;
            ctx.lineWidth = depth;
            
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            
            drawBranch(endX, endY, len * 0.75, branchAngle - 0.5, depth - 1);
            drawBranch(endX, endY, len * 0.75, branchAngle + 0.5, depth - 1);
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.shadowBlur = 0;
            
            const startX = width / 2;
            const startY = height - 20;
            const initialLen = 100;
            const initialAngle = -Math.PI / 2;
            
            drawBranch(startX, startY, initialLen, initialAngle + Math.sin(angle) * 0.3, 5);
            
            angle += 0.02;
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // STRINGS PREVIEW (Pattern Matching)
    // ==========================================================================
    function createStringsPreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const text = "ALGORITHM";
        const pattern = "RITH";
        const charWidth = 50;
        const charHeight = 40;
        const startX = (width - text.length * charWidth) / 2;
        let currentIndex = 0;
        let matchStart = -1;

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw text
            for (let i = 0; i < text.length; i++) {
                const x = startX + i * charWidth;
                const y = height / 2 - 30;
                
                let color = 'rgba(0, 243, 255, 0.3)';
                let glow = 0;
                
                if (i >= matchStart && i < matchStart + pattern.length && matchStart >= 0) {
                    color = '#1cc88a';
                    glow = 15;
                } else if (i >= currentIndex && i < currentIndex + pattern.length) {
                    color = '#ff00ff';
                    glow = 10;
                }
                
                ctx.shadowColor = color;
                ctx.shadowBlur = glow;
                ctx.fillStyle = color;
                
                ctx.beginPath();
                ctx.roundRect(x, y, charWidth - 4, charHeight, 5);
                ctx.fill();
                
                ctx.shadowBlur = 0;
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 18px Rajdhani';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(text[i], x + charWidth / 2 - 2, y + charHeight / 2);
            }
            
            // Draw pattern below
            const patternStartX = startX + currentIndex * charWidth;
            ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
            ctx.font = '14px Rajdhani';
            ctx.textAlign = 'left';
            ctx.fillText(pattern, patternStartX, height / 2 + 40);
            
            // Advance
            if (Math.random() < 0.02) {
                currentIndex++;
                if (currentIndex > text.length - pattern.length) {
                    // Check for match
                    const substr = text.substring(currentIndex, currentIndex + pattern.length);
                    if (substr === pattern) {
                        matchStart = currentIndex;
                    }
                    currentIndex = 0;
                    matchStart = -1;
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // SEGMENT TREE PREVIEW (Advanced)
    // ==========================================================================
    function createSegmentTreePreview(canvas) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        let highlightedNode = 0;

        // Segment tree structure (simplified)
        const levels = [
            [{ x: width / 2, y: 50, value: '0-7' }],
            [{ x: width / 4, y: 120, value: '0-3' }, { x: width * 3 / 4, y: 120, value: '4-7' }],
            [
                { x: width / 8, y: 190, value: '0-1' }, { x: width * 3 / 8, y: 190, value: '2-3' },
                { x: width * 5 / 8, y: 190, value: '4-5' }, { x: width * 7 / 8, y: 190, value: '6-7' }
            ],
            [
                { x: width / 16, y: 260, value: '0' }, { x: width * 3 / 16, y: 260, value: '1' },
                { x: width * 5 / 16, y: 260, value: '2' }, { x: width * 7 / 16, y: 260, value: '3' },
                { x: width * 9 / 16, y: 260, value: '4' }, { x: width * 11 / 16, y: 260, value: '5' },
                { x: width * 13 / 16, y: 260, value: '6' }, { x: width * 15 / 16, y: 260, value: '7' }
            ]
        ];

        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            // Draw edges
            ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
            ctx.lineWidth = 2;
            
            for (let level = 0; level < levels.length - 1; level++) {
                const currentLevel = levels[level];
                const nextLevel = levels[level + 1];
                
                currentLevel.forEach((node, i) => {
                    const child1 = nextLevel[i * 2];
                    const child2 = nextLevel[i * 2 + 1];
                    
                    if (child1) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y + 20);
                        ctx.lineTo(child1.x, child1.y - 20);
                        ctx.stroke();
                    }
                    if (child2) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y + 20);
                        ctx.lineTo(child2.x, child2.y - 20);
                        ctx.stroke();
                    }
                });
            }
            
            // Draw nodes
            const time = Date.now() / 500;
            levels.forEach((level, levelIndex) => {
                level.forEach((node, nodeIndex) => {
                    const globalIndex = levelIndex * 4 + nodeIndex;
                    const isHighlighted = Math.floor(time) % levels[levelIndex].length === nodeIndex;
                    
                    ctx.shadowColor = isHighlighted ? '#00f3ff' : 'transparent';
                    ctx.shadowBlur = isHighlighted ? 15 : 0;
                    
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, isHighlighted ? 22 : 18, 0, Math.PI * 2);
                    ctx.fillStyle = isHighlighted ? '#00f3ff' : 'rgba(0, 243, 255, 0.3)';
                    ctx.fill();
                    
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = '#ffffff';
                    ctx.font = '12px Rajdhani';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(node.value, node.x, node.y);
                });
            });
            
            requestAnimationFrame(animate);
        }
        
        animate();
        return { stop: () => {} };
    }

    // ==========================================================================
    // UTILITY FUNCTIONS
    // ==========================================================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ==========================================================================
    // DOM READY
    // ==========================================================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose API
    window.AlgoVizDashboard = {
        toggleSidebar
    };

})();
