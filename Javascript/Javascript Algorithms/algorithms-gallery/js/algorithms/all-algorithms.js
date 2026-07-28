/**
 * Simple Algorithm Visualizations - Working Code
 * Pure Vanilla JavaScript Canvas
 */

(function() {
  'use strict';

  // Color utilities
  function getColor(name, alpha) {
    var colors = {
      lime: '0, 255, 157',
      violet: '189, 0, 255',
      cyan: '0, 243, 255',
      magenta: '255, 0, 255'
    };
    return 'rgba(' + (colors[name] || colors.lime) + ', ' + alpha + ')';
  }

  // Base viewer
  function Viewer(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.running = false;
    this.done = false;
    this.speed = 50;
    this.statusEl = document.querySelector('.js-status-display');
    this.resize();
    this.setup();
    this.bindControls();
    this.draw();
  }

  Viewer.prototype = {
    resize: function() {
      var rect = this.canvas.parentElement.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.w = rect.width;
      this.h = rect.height;
    },

    setup: function() {},
    step: function() { return true; },
    draw: function() {},

    bindControls: function() {
      var self = this;
      var startBtn = document.querySelector('.js-start-btn');
      var resetBtn = document.querySelector('.js-reset-btn');
      var stepBtn = document.querySelector('.js-step-btn');
      var speedSlider = document.querySelector('.js-speed-control');

      if (startBtn) startBtn.onclick = function() { self.toggle(); };
      if (resetBtn) resetBtn.onclick = function() { self.reset(); };
      if (stepBtn) stepBtn.onclick = function() { self.doStep(); };
      if (speedSlider) speedSlider.oninput = function() { self.speed = +this.value; };
    },

    toggle: function() {
      if (this.done) { this.reset(); return; }
      this.running = !this.running;
      if (this.running) this.loop();
    },

    reset: function() {
      this.running = false;
      this.done = false;
      this.setup();
      this.draw();
      if (this.statusEl) this.statusEl.textContent = 'Ready';
    },

    doStep: function() {
      this.step();
      this.draw();
    },

    loop: function() {
      var self = this;
      if (!this.running || this.done) return;
      var delay = Math.max(20, 1020 - this.speed * 10);
      if (this.step()) {
        this.done = true;
        this.running = false;
        if (this.statusEl) this.statusEl.textContent = '✓ Done!';
      } else {
        this.draw();
        setTimeout(function() { self.loop(); }, delay);
      }
    },

    setStatus: function(msg) {
      if (this.statusEl) this.statusEl.textContent = msg;
    },

    clear: function() {
      this.ctx.fillStyle = getColor('lime', 0.02);
      this.ctx.fillRect(0, 0, this.w, this.h);
    },

    drawBar: function(x, y, w, h, color) {
      this.ctx.fillStyle = color;
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 10;
      this.ctx.fillRect(x, y, w, h);
      this.ctx.shadowBlur = 0;
    },

    drawCircle: function(x, y, r, color, text) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, r, 0, Math.PI * 2);
      this.ctx.fillStyle = color;
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 15;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
      if (text !== undefined) {
        this.ctx.fillStyle = '#000';
        this.ctx.font = 'bold 12px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(String(text), x, y);
      }
    },

    drawLine: function(x1, y1, x2, y2, color, width) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = width || 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.stroke();
    }
  };

  // ============ SORTING ============

  // Bubble Sort
  function BubbleSortViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  BubbleSortViewer.prototype = Object.create(Viewer.prototype);
  BubbleSortViewer.prototype.setup = function() {
    this.n = 15;
    this.arr = [];
    for (var i = 0; i < this.n; i++) this.arr.push(Math.random() * 0.7 + 0.2);
    this.i = 0; this.j = 0;
  };
  BubbleSortViewer.prototype.step = function() {
    if (this.j >= this.n - 1 - this.i) {
      this.i++; this.j = 0;
      if (this.i >= this.n - 1) return true;
    }
    if (this.arr[this.j] > this.arr[this.j + 1]) {
      var t = this.arr[this.j];
      this.arr[this.j] = this.arr[this.j + 1];
      this.arr[this.j + 1] = t;
    }
    this.j++;
    return false;
  };
  BubbleSortViewer.prototype.draw = function() {
    this.clear();
    var bw = (this.w - 40) / this.n;
    var mh = this.h - 60;
    for (var i = 0; i < this.n; i++) {
      var x = 20 + i * bw;
      var bh = this.arr[i] * mh;
      var y = this.h - 30 - bh;
      var c = getColor('lime', 0.6);
      if (i === this.j || i === this.j + 1) c = getColor('violet', 0.9);
      else if (i >= this.n - this.i) c = getColor('cyan', 0.5);
      this.drawBar(x, y, bw - 2, bh, c);
    }
  };

  // Quick Sort
  function QuickSortViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  QuickSortViewer.prototype = Object.create(Viewer.prototype);
  QuickSortViewer.prototype.setup = function() {
    this.n = 15;
    this.arr = [];
    for (var i = 0; i < this.n; i++) this.arr.push(Math.random() * 0.7 + 0.2);
    this.stack = [{l: 0, r: this.n - 1}];
    this.pivot = -1;
  };
  QuickSortViewer.prototype.step = function() {
    if (this.stack.length === 0) return true;
    var cur = this.stack.pop();
    if (cur.l >= cur.r) return false;
    var pv = this.arr[cur.r];
    var i = cur.l - 1;
    for (var j = cur.l; j < cur.r; j++) {
      if (this.arr[j] <= pv) {
        i++;
        var t = this.arr[i]; this.arr[i] = this.arr[j]; this.arr[j] = t;
      }
    }
    var t = this.arr[i + 1]; this.arr[i + 1] = this.arr[cur.r]; this.arr[cur.r] = t;
    this.pivot = i + 1;
    this.stack.push({l: cur.l, r: this.pivot - 1});
    this.stack.push({l: this.pivot + 1, r: cur.r});
    return false;
  };
  QuickSortViewer.prototype.draw = function() {
    this.clear();
    var bw = (this.w - 40) / this.n;
    var mh = this.h - 60;
    for (var i = 0; i < this.n; i++) {
      var x = 20 + i * bw;
      var bh = this.arr[i] * mh;
      var y = this.h - 30 - bh;
      var c = getColor('lime', 0.6);
      if (i === this.pivot) c = getColor('cyan', 0.9);
      this.drawBar(x, y, bw - 2, bh, c);
    }
  };

  // Binary Search
  function BinarySearchViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  BinarySearchViewer.prototype = Object.create(Viewer.prototype);
  BinarySearchViewer.prototype.setup = function() {
    this.n = 15;
    this.arr = [];
    for (var i = 0; i < this.n; i++) this.arr.push((i + 1) / this.n);
    this.target = Math.random();
    this.l = 0; this.r = this.n - 1; this.m = -1;
    this.searching = false;
  };
  BinarySearchViewer.prototype.step = function() {
    if (!this.searching) { this.searching = true; this.setStatus('Target: ' + this.target.toFixed(2)); return false; }
    if (this.l > this.r) { this.setStatus('Not found'); return true; }
    this.m = Math.floor((this.l + this.r) / 2);
    if (Math.abs(this.arr[this.m] - this.target) < 0.01) {
      this.setStatus('Found at ' + this.m); return true;
    }
    if (this.arr[this.m] > this.target) this.r = this.m - 1;
    else this.l = this.m + 1;
    return false;
  };
  BinarySearchViewer.prototype.draw = function() {
    this.clear();
    var cw = (this.w - 40) / this.n;
    var ch = 60;
    var sy = this.h / 2 - ch / 2;
    for (var i = 0; i < this.n; i++) {
      var x = 20 + i * cw;
      var c = getColor('lime', 0.3);
      if (i === this.m) c = getColor('violet', 0.9);
      else if (i >= this.l && i <= this.r && this.searching) c = getColor('cyan', 0.5);
      this.drawBar(x + 2, sy, cw - 4, ch, c);
      this.ctx.fillStyle = '#000';
      this.ctx.font = '10px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.arr[i].toFixed(2), x + cw / 2, sy + ch / 2);
    }
    this.ctx.fillStyle = getColor('cyan', 0.8);
    this.ctx.font = '14px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Target: ' + this.target.toFixed(2), this.w / 2, 40);
  };

  // BFS
  function BFSViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  BFSViewer.prototype = Object.create(Viewer.prototype);
  BFSViewer.prototype.setup = function() {
    this.nodes = [{x:400,y:60},{x:250,y:150},{x:400,y:150},{x:550,y:150},{x:180,y:250},{x:320,y:250},{x:480,y:250},{x:620,y:250}];
    this.edges = [[0,1],[0,2],[0,3],[1,4],[1,5],[2,5],[3,6],[3,7]];
    this.visited = [];
    this.queue = [0];
    this.cur = -1;
  };
  BFSViewer.prototype.step = function() {
    if (this.queue.length === 0) return true;
    this.cur = this.queue.shift();
    if (this.visited.indexOf(this.cur) === -1) {
      this.visited.push(this.cur);
      for (var i = 0; i < this.edges.length; i++) {
        var e = this.edges[i];
        var n = e[0] === this.cur ? e[1] : (e[1] === this.cur ? e[0] : -1);
        if (n >= 0 && this.visited.indexOf(n) === -1 && this.queue.indexOf(n) === -1) {
          this.queue.push(n);
        }
      }
    }
    return false;
  };
  BFSViewer.prototype.draw = function() {
    this.clear();
    for (var i = 0; i < this.edges.length; i++) {
      var e = this.edges[i];
      this.drawLine(this.nodes[e[0]].x, this.nodes[e[0]].y, this.nodes[e[1]].x, this.nodes[e[1]].y, getColor('lime', 0.2), 2);
    }
    for (var i = 0; i < this.nodes.length; i++) {
      var n = this.nodes[i];
      var c = getColor('lime', 0.3);
      if (this.visited.indexOf(i) !== -1) c = getColor('violet', 0.8);
      if (i === this.cur) c = getColor('cyan', 1);
      this.drawCircle(n.x, n.y, 25, c, i);
    }
  };

  // DFS
  function DFSViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  DFSViewer.prototype = Object.create(BFSViewer.prototype);
  DFSViewer.prototype.setup = function() {
    this.nodes = [{x:400,y:60},{x:250,y:150},{x:400,y:150},{x:550,y:150},{x:180,y:250},{x:320,y:250},{x:480,y:250},{x:620,y:250}];
    this.edges = [[0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[3,7]];
    this.visited = [];
    this.stack = [0];
    this.cur = -1;
  };
  DFSViewer.prototype.step = function() {
    if (this.stack.length === 0) return true;
    this.cur = this.stack.pop();
    if (this.visited.indexOf(this.cur) === -1) {
      this.visited.push(this.cur);
      for (var i = this.edges.length - 1; i >= 0; i--) {
        var e = this.edges[i];
        var n = e[0] === this.cur ? e[1] : (e[1] === this.cur ? e[0] : -1);
        if (n >= 0 && this.visited.indexOf(n) === -1) this.stack.push(n);
      }
    }
    return false;
  };

  // Dijkstra
  function DijkstraViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  DijkstraViewer.prototype = Object.create(Viewer.prototype);
  DijkstraViewer.prototype.setup = function() {
    this.nodes = [{x:150,y:200},{x:300,y:100},{x:300,y:300},{x:450,y:150},{x:450,y:250},{x:600,y:200}];
    this.edges = [{f:0,t:1,w:4},{f:0,t:2,w:2},{f:1,t:2,w:1},{f:1,t:3,w:5},{f:2,t:3,w:8},{f:2,t:4,w:10},{f:3,t:4,w:2},{f:3,t:5,w:6},{f:4,t:5,w:3}];
    this.dist = [0,999,999,999,999,999];
    this.visited = [];
    this.cur = -1;
  };
  DijkstraViewer.prototype.step = function() {
    var min = 999, idx = -1;
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.visited.indexOf(i) === -1 && this.dist[i] < min) { min = this.dist[i]; idx = i; }
    }
    if (idx === -1) return true;
    this.cur = idx;
    this.visited.push(idx);
    for (var i = 0; i < this.edges.length; i++) {
      var e = this.edges[i];
      if (e.f === idx || e.t === idx) {
        var n = e.f === idx ? e.t : e.f;
        if (this.visited.indexOf(n) === -1 && this.dist[idx] + e.w < this.dist[n]) {
          this.dist[n] = this.dist[idx] + e.w;
        }
      }
    }
    return false;
  };
  DijkstraViewer.prototype.draw = function() {
    this.clear();
    for (var i = 0; i < this.edges.length; i++) {
      var e = this.edges[i];
      this.drawLine(this.nodes[e.f].x, this.nodes[e.f].y, this.nodes[e.t].x, this.nodes[e.t].y, getColor('lime', 0.2), 2);
      var mx = (this.nodes[e.f].x + this.nodes[e.t].x) / 2;
      var my = (this.nodes[e.f].y + this.nodes[e.t].y) / 2;
      this.ctx.fillStyle = getColor('cyan', 0.8);
      this.ctx.font = '11px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(String(e.w), mx, my - 8);
    }
    for (var i = 0; i < this.nodes.length; i++) {
      var c = getColor('lime', 0.3);
      if (this.visited.indexOf(i) !== -1) c = getColor('violet', 0.8);
      if (i === this.cur) c = getColor('cyan', 1);
      this.drawCircle(this.nodes[i].x, this.nodes[i].y, 28, c, i);
      this.ctx.fillStyle = getColor('lime', 0.9);
      this.ctx.font = '10px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(this.dist[i] === 999 ? '∞' : String(this.dist[i]), this.nodes[i].x, this.nodes[i].y + 45);
    }
  };

  // A* Pathfinding
  function AStarViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  AStarViewer.prototype = Object.create(Viewer.prototype);
  AStarViewer.prototype.setup = function() {
    this.cols = 15; this.rows = 10; this.sz = 40;
    this.grid = [];
    for (var y = 0; y < this.rows; y++) {
      this.grid[y] = [];
      for (var x = 0; x < this.cols; x++) {
        this.grid[y][x] = {x:x,y:y,f:0,g:0,h:0,p:null,w:Math.random()<0.25};
      }
    }
    this.start = {x:1,y:5}; this.end = {x:13,y:5};
    this.grid[this.start.y][this.start.x].w = false;
    this.grid[this.end.y][this.end.x].w = false;
    this.open = [this.grid[this.start.y][this.start.x]];
    this.closed = [];
    this.cur = null;
  };
  AStarViewer.prototype.heu = function(a, b) { return Math.abs(a.x - b.x) + Math.abs(a.y - b.y); };
  AStarViewer.prototype.step = function() {
    if (this.open.length === 0) return true;
    var low = 0;
    for (var i = 1; i < this.open.length; i++) if (this.open[i].f < this.open[low].f) low = i;
    this.cur = this.open[low];
    if (this.cur.x === this.end.x && this.cur.y === this.end.y) return true;
    this.open.splice(low, 1);
    this.closed.push(this.cur);
    var neigh = [{x:this.cur.x,y:this.cur.y-1},{x:this.cur.x,y:this.cur.y+1},{x:this.cur.x-1,y:this.cur.y},{x:this.cur.x+1,y:this.cur.y}];
    for (var i = 0; i < neigh.length; i++) {
      var n = neigh[i];
      if (n.x >= 0 && n.x < this.cols && n.y >= 0 && n.y < this.rows) {
        var cell = this.grid[n.y][n.x];
        if (!cell.w && this.closed.indexOf(cell) === -1) {
          var tg = this.cur.g + 1;
          if (this.open.indexOf(cell) === -1 || tg < cell.g) {
            cell.g = tg;
            cell.h = this.heu(cell, this.end);
            cell.f = cell.g + cell.h;
            cell.p = this.cur;
            if (this.open.indexOf(cell) === -1) this.open.push(cell);
          }
        }
      }
    }
    return false;
  };
  AStarViewer.prototype.draw = function() {
    this.clear();
    var ox = (this.w - this.cols * this.sz) / 2;
    var oy = (this.h - this.rows * this.sz) / 2;
    for (var y = 0; y < this.rows; y++) {
      for (var x = 0; x < this.cols; x++) {
        var c = this.grid[y][x];
        var cx = ox + x * this.sz;
        var cy = oy + y * this.sz;
        var col = getColor('lime', 0.1);
        if (c.w) col = getColor('violet', 0.5);
        else if (this.closed.indexOf(c) !== -1) col = getColor('cyan', 0.4);
        else if (this.open.indexOf(c) !== -1) col = getColor('lime', 0.6);
        if (c === this.cur) col = getColor('magenta', 1);
        this.drawBar(cx + 1, cy + 1, this.sz - 2, this.sz - 2, col);
      }
    }
    this.drawBar(ox + this.start.x * this.sz + 5, oy + this.start.y * this.sz + 5, this.sz - 10, this.sz - 10, getColor('lime', 0.9));
    this.drawBar(ox + this.end.x * this.sz + 5, oy + this.end.y * this.sz + 5, this.sz - 10, this.sz - 10, getColor('magenta', 0.9));
  };

  // Convex Hull
  function ConvexHullViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  ConvexHullViewer.prototype = Object.create(Viewer.prototype);
  ConvexHullViewer.prototype.setup = function() {
    this.pts = [];
    this.stack = [];
    this.i = -1;
  };
  ConvexHullViewer.prototype.draw = function() {
    this.clear();
    if (this.pts.length === 0) {
      for (var i = 0; i < 12; i++) this.pts.push({x: 100 + Math.random() * (this.w - 200), y: 100 + Math.random() * (this.h - 200)});
      var bot = 0;
      for (var i = 1; i < this.pts.length; i++) if (this.pts[i].y > this.pts[bot].y) bot = i;
      var t = this.pts[0]; this.pts[0] = this.pts[bot]; this.pts[bot] = t;
      this.stack = [this.pts[0]];
    }
    for (var i = 0; i < this.pts.length; i++) {
      var c = getColor('lime', 0.4);
      if (i < this.i) c = getColor('cyan', 0.6);
      if (i === this.i) c = getColor('magenta', 1);
      this.drawCircle(this.pts[i].x, this.pts[i].y, 8, c, '');
    }
    if (this.stack.length > 1) {
      this.ctx.strokeStyle = getColor('violet', 0.8);
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(this.stack[0].x, this.stack[0].y);
      for (var i = 1; i < this.stack.length; i++) this.ctx.lineTo(this.stack[i].x, this.stack[i].y);
      this.ctx.stroke();
    }
  };
  ConvexHullViewer.prototype.cross = function(o, a, b) { return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x); };
  ConvexHullViewer.prototype.step = function() {
    if (this.pts.length === 0) return false;
    this.i++;
    if (this.i >= this.pts.length) return true;
    var p = this.pts[this.i];
    while (this.stack.length > 1 && this.cross(this.stack[this.stack.length - 2], this.stack[this.stack.length - 1], p) <= 0) {
      this.stack.pop();
    }
    this.stack.push(p);
    return false;
  };

  // Huffman
  function HuffmanViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  HuffmanViewer.prototype = Object.create(Viewer.prototype);
  HuffmanViewer.prototype.setup = function() {
    this.chars = [{c:'A',f:0.35},{c:'B',f:0.25},{c:'C',f:0.20},{c:'D',f:0.12},{c:'E',f:0.08}];
    this.codes = {};
    this.build();
  };
  HuffmanViewer.prototype.build = function() {
    var nodes = [];
    for (var i = 0; i < this.chars.length; i++) nodes.push({c:this.chars[i].c,f:this.chars[i].f,l:null,r:null});
    while (nodes.length > 1) {
      nodes.sort(function(a,b){return a.f-b.f;});
      var l = nodes.shift(), r = nodes.shift();
      nodes.push({c:'',f:l.f+r.f,l:l,r:r});
    }
    this.tree = nodes[0];
    this.genCodes(this.tree, '');
  };
  HuffmanViewer.prototype.genCodes = function(n, code) {
    if (!n) return;
    if (n.c) this.codes[n.c] = code;
    else { this.genCodes(n.l, code + '0'); this.genCodes(n.r, code + '1'); }
  };
  HuffmanViewer.prototype.drawTree = function(n, x, y, dx, dy) {
    if (!n) return;
    this.drawCircle(x, y, 25, getColor('violet', 0.7), n.c || n.f.toFixed(2));
    if (n.l) {
      this.drawLine(x, y + 25, x - dx, y + dy, getColor('lime', 0.4), 2);
      this.ctx.fillStyle = getColor('cyan', 0.8);
      this.ctx.font = '10px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('0', x - dx / 2, y + dy / 2);
      this.drawTree(n.l, x - dx, y + dy, dx / 2, dy + 20);
    }
    if (n.r) {
      this.drawLine(x, y + 25, x + dx, y + dy, getColor('lime', 0.4), 2);
      this.ctx.fillStyle = getColor('cyan', 0.8);
      this.ctx.font = '10px monospace';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('1', x + dx / 2, y + dy / 2);
      this.drawTree(n.r, x + dx, y + dy, dx / 2, dy + 20);
    }
  };
  HuffmanViewer.prototype.draw = function() {
    this.clear();
    if (this.tree) this.drawTree(this.tree, this.w / 2, 60, this.w / 6, 70);
    var cs = Object.keys(this.codes);
    var ty = this.h - cs.length * 35 - 20;
    this.ctx.fillStyle = getColor('lime', 0.1);
    this.ctx.fillRect(20, ty - 10, 200, cs.length * 35 + 20);
    for (var i = 0; i < cs.length; i++) {
      this.ctx.fillStyle = getColor('lime', 0.8);
      this.ctx.font = '14px monospace';
      this.ctx.textAlign = 'left';
      this.ctx.fillText(cs[i] + ': ' + this.codes[cs[i]], 30, ty + i * 35);
    }
  };
  HuffmanViewer.prototype.step = function() { return true; };

  // K-Means
  function KMeansViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  KMeansViewer.prototype = Object.create(Viewer.prototype);
  KMeansViewer.prototype.setup = function() {
    this.k = 3;
    this.pts = [];
    this.cent = [];
    this.assign = [];
    this.iter = 0;
  };
  KMeansViewer.prototype.draw = function() {
    this.clear();
    if (this.pts.length === 0) {
      for (var i = 0; i < 50; i++) this.pts.push({x: 100 + Math.random() * (this.w - 200), y: 100 + Math.random() * (this.h - 200)});
      for (var j = 0; j < this.k; j++) this.cent.push({x: 100 + Math.random() * (this.w - 200), y: 100 + Math.random() * (this.h - 200)});
      this.assign = new Array(this.pts.length).fill(-1);
    }
    var cols = ['violet', 'cyan', 'magenta'];
    for (var i = 0; i < this.pts.length; i++) {
      var c = this.assign[i] >= 0 ? getColor(cols[this.assign[i] % 3], 0.6) : getColor('lime', 0.4);
      this.drawCircle(this.pts[i].x, this.pts[i].y, 6, c, '');
    }
    for (var j = 0; j < this.k; j++) {
      this.drawCircle(this.cent[j].x, this.cent[j].y, 15, getColor(cols[j], 1), j);
    }
    this.ctx.fillStyle = getColor('cyan', 0.8);
    this.ctx.font = '14px sans-serif';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('Iteration: ' + this.iter, 20, 30);
  };
  KMeansViewer.prototype.dist = function(p1, p2) { return Math.sqrt((p1.x-p2.x)*(p1.x-p2.x) + (p1.y-p2.y)*(p1.y-p2.y)); };
  KMeansViewer.prototype.step = function() {
    this.iter++;
    var changed = false;
    for (var i = 0; i < this.pts.length; i++) {
      var md = 999, mc = 0;
      for (var j = 0; j < this.k; j++) {
        var d = this.dist(this.pts[i], this.cent[j]);
        if (d < md) { md = d; mc = j; }
      }
      if (this.assign[i] !== mc) changed = true;
      this.assign[i] = mc;
    }
    for (var j = 0; j < this.k; j++) {
      var sx = 0, sy = 0, cnt = 0;
      for (var i = 0; i < this.pts.length; i++) {
        if (this.assign[i] === j) { sx += this.pts[i].x; sy += this.pts[i].y; cnt++; }
      }
      if (cnt > 0) { this.cent[j].x = sx / cnt; this.cent[j].y = sy / cnt; }
    }
    if (!changed || this.iter >= 10) return true;
    return false;
  };

  // Perceptron
  function PerceptronViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  PerceptronViewer.prototype = Object.create(Viewer.prototype);
  PerceptronViewer.prototype.setup = function() {
    this.w = [Math.random() - 0.5, Math.random() - 0.5];
    this.b = Math.random() - 0.5;
    this.lr = 0.1;
    this.pts = [];
    this.line = {m: 0, b: 0};
    this.epoch = 0;
    for (var i = 0; i < 30; i++) {
      var x = Math.random() * 2 - 1;
      var y = Math.random() * 2 - 1;
      var lb = (y > x * 0.5 + 0.2) ? 1 : -1;
      this.pts.push({x: x, y: y, l: lb});
    }
  };
  PerceptronViewer.prototype.pred = function(x, y) { var s = x * this.w[0] + y * this.w[1] + this.b; return s > 0 ? 1 : -1; };
  PerceptronViewer.prototype.step = function() {
    this.epoch++;
    var idx = Math.floor(Math.random() * this.pts.length);
    var p = this.pts[idx];
    var pr = this.pred(p.x, p.y);
    if (pr !== p.l) {
      this.w[0] += this.lr * p.l * p.x;
      this.w[1] += this.lr * p.l * p.y;
      this.b += this.lr * p.l;
    }
    if (this.w[1] !== 0) { this.line.m = -this.w[0] / this.w[1]; this.line.b = -this.b / this.w[1]; }
    return false;
  };
  PerceptronViewer.prototype.draw = function() {
    this.clear();
    var cx = this.w / 2, cy = this.h / 2, sc = Math.min(this.w, this.h) / 2.5;
    this.ctx.strokeStyle = getColor('lime', 0.2);
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(cx - sc, cy); this.ctx.lineTo(cx + sc, cy);
    this.ctx.moveTo(cx, cy - sc); this.ctx.lineTo(cx, cy + sc);
    this.ctx.stroke();
    var x1 = -sc, x2 = sc;
    var y1 = this.line.m * x1 + this.line.b, y2 = this.line.m * x2 + this.line.b;
    this.ctx.strokeStyle = getColor('violet', 0.8);
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(cx + x1 * sc, cy - y1 * sc);
    this.ctx.lineTo(cx + x2 * sc, cy - y2 * sc);
    this.ctx.stroke();
    for (var i = 0; i < this.pts.length; i++) {
      var p = this.pts[i];
      var px = cx + p.x * sc, py = cy - p.y * sc;
      var c = p.l === 1 ? getColor('lime', 0.8) : getColor('magenta', 0.8);
      var pr = this.pred(p.x, p.y);
      if (pr !== p.l) {
        this.ctx.strokeStyle = getColor('cyan', 1);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(px - 8, py - 8); this.ctx.lineTo(px + 8, py + 8);
        this.ctx.moveTo(px + 8, py - 8); this.ctx.lineTo(px - 8, py + 8);
        this.ctx.stroke();
      }
      this.drawCircle(px, py, 6, c, '');
    }
    this.ctx.fillStyle = getColor('cyan', 0.8);
    this.ctx.font = '12px monospace';
    this.ctx.textAlign = 'left';
    this.ctx.fillText('w1: ' + this.w[0].toFixed(3), 20, 30);
    this.ctx.fillText('w2: ' + this.w[1].toFixed(3), 20, 50);
    this.ctx.fillText('b: ' + this.b.toFixed(3), 20, 70);
  };

  // Placeholder
  function PlaceholderViewer(canvasId) {
    Viewer.call(this, canvasId);
  }
  PlaceholderViewer.prototype = Object.create(Viewer.prototype);
  PlaceholderViewer.prototype.setup = function() { this.t = 0; };
  PlaceholderViewer.prototype.step = function() { this.t++; return this.t > 100; };
  PlaceholderViewer.prototype.draw = function() {
    this.clear();
    this.ctx.fillStyle = getColor('cyan', 0.8);
    this.ctx.font = '16px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Algorithm Visualization', this.w / 2, this.h / 2 - 20);
    this.ctx.font = '12px monospace';
    this.ctx.fillText('Step: ' + this.t, this.w / 2, this.h / 2 + 20);
    for (var i = 0; i < 20; i++) {
      var x = this.w / 2 + Math.cos(this.t * 0.1 + i * 0.5) * 100;
      var y = this.h / 2 + Math.sin(this.t * 0.1 + i * 0.5) * 100;
      this.drawCircle(x, y, 5, getColor(i % 2 === 0 ? 'lime' : 'violet', 0.6), '');
    }
  };

  // Export
  window.BubbleSortViewer = BubbleSortViewer;
  window.QuickSortViewer = QuickSortViewer;
  window.BinarySearchViewer = BinarySearchViewer;
  window.BFSViewer = BFSViewer;
  window.DFSViewer = DFSViewer;
  window.DijkstraViewer = DijkstraViewer;
  window.AStarViewer = AStarViewer;
  window.ConvexHullViewer = ConvexHullViewer;
  window.HuffmanViewer = HuffmanViewer;
  window.KMeansViewer = KMeansViewer;
  window.PerceptronViewer = PerceptronViewer;
  window.PlaceholderViewer = PlaceholderViewer;

})();
