/**
 * Algorithm Viewer - Shared functionality for all algorithm visualizations
 * Pure Vanilla JavaScript using Canvas API
 */

(function() {
  'use strict';

  // Theme management
  function initTheme() {
    const themeToggle = document.querySelector('.js-theme-toggle');
    const body = document.body;
    let theme = localStorage.getItem('neon-algorithms-theme') || 'dark';
    
    body.setAttribute('data-theme', theme);
    updateThemeIcon(themeToggle, theme);

    if (themeToggle) {
      themeToggle.addEventListener('click', function() {
        theme = theme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', theme);
        localStorage.setItem('neon-algorithms-theme', theme);
        updateThemeIcon(themeToggle, theme);
      });
    }
  }

  function updateThemeIcon(toggle, theme) {
    if (!toggle) return;
    const icon = toggle.querySelector('.c-theme-toggle__icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }
  }

  // Set current year
  function setCurrentYear() {
    const yearEl = document.querySelector('.js-current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Base Algorithm Viewer Class
  window.AlgorithmViewer = function(canvasId, options) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.options = options || {};
    this.running = false;
    this.paused = false;
    this.completed = false;
    this.animationId = null;
    this.speed = 50;
    this.statusDisplay = document.querySelector('.js-status-display');
    
    this.setupCanvas();
    this.setupControls();
    this.init();
  };

  window.AlgorithmViewer.prototype = {
    setupCanvas: function() {
      if (!this.canvas || !this.ctx) return;
      
      const resize = function() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
        this.draw();
      }.bind(this);

      resize();
      window.addEventListener('resize', resize);
    },

    setupControls: function() {
      const startBtn = document.querySelector('.js-start-btn');
      const resetBtn = document.querySelector('.js-reset-btn');
      const stepBtn = document.querySelector('.js-step-btn');
      const speedControl = document.querySelector('.js-speed-control');
      const sizeControl = document.querySelector('.js-size-control');

      if (startBtn) {
        startBtn.addEventListener('click', this.toggleStart.bind(this));
      }
      if (resetBtn) {
        resetBtn.addEventListener('click', this.reset.bind(this));
      }
      if (stepBtn) {
        stepBtn.addEventListener('click', this.step.bind(this));
      }
      if (speedControl) {
        speedControl.addEventListener('input', function(e) {
          this.speed = parseInt(e.target.value, 10);
        }.bind(this));
      }
      if (sizeControl) {
        sizeControl.addEventListener('change', function(e) {
          this.size = parseInt(e.target.value, 10);
          this.reset();
        }.bind(this));
      }
    },

    toggleStart: function() {
      if (this.completed) {
        this.reset();
        return;
      }
      this.running = !this.running;
      if (this.running) {
        this.animate();
      } else {
        this.paused = true;
      }
    },

    reset: function() {
      this.running = false;
      this.paused = false;
      this.completed = false;
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.init();
      this.draw();
      this.setStatus('Ready to start visualization...');
    },

    step: function() {
      this.nextStep();
      this.draw();
    },

    animate: function() {
      if (!this.running) return;
      
      if (this.paused) {
        this.setStatus('Paused');
        return;
      }

      const delay = Math.max(10, 1010 - this.speed * 10);
      
      const step = function() {
        if (!this.running) return;
        
        if (this.nextStep()) {
          this.completed = true;
          this.running = false;
          this.setStatus('✓ Complete!');
          return;
        }
        
        this.draw();
        this.animationId = setTimeout(function() {
          requestAnimationFrame(step.bind(this));
        }.bind(this), delay);
      }.bind(this);

      step();
    },

    nextStep: function() {
      // Override in subclass
      return true;
    },

    init: function() {
      // Override in subclass
    },

    draw: function() {
      // Override in subclass
    },

    setStatus: function(message) {
      if (this.statusDisplay) {
        this.statusDisplay.textContent = message;
      }
    },

    // Utility: Get neon color
    getNeonColor: function(name, alpha) {
      const colors = {
        lime: '0, 255, 157',
        violet: '189, 0, 255',
        cyan: '0, 243, 255',
        green: '57, 255, 20',
        purple: '157, 0, 255'
      };
      const rgb = colors[name] || colors.lime;
      return 'rgba(' + rgb + ', ' + (alpha || 1) + ')';
    },

    // Utility: Draw glow effect
    drawGlow: function(x, y, radius, color) {
      const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius * 2);
      gradient.addColorStop(0, color);
      gradient.addColorStop(0.5, color.replace('1)', '0.3)'));
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius * 2, 0, Math.PI * 2);
      this.ctx.fill();
    }
  };

  // Initialize on DOM ready
  function init() {
    initTheme();
    setCurrentYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
