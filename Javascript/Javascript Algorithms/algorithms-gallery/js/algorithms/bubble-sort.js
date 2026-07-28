/**
 * Bubble Sort Visualization
 * Pure Vanilla JavaScript Canvas Implementation
 */

(function() {
  'use strict';

  window.BubbleSortViewer = function(canvasId) {
    window.AlgorithmViewer.call(this, canvasId, { name: 'Bubble Sort' });
  };

  window.BubbleSortViewer.prototype = Object.create(window.AlgorithmViewer.prototype);
  window.BubbleSortViewer.prototype.constructor = window.BubbleSortViewer;

  window.BubbleSortViewer.prototype.init = function() {
    this.size = 20;
    this.array = [];
    this.comparison = { i: -1, j: -1 };
    this.swapped = false;
    this.sorted = false;
    this.i = 0;
    this.j = 0;
    this.generateArray();
  };

  window.BubbleSortViewer.prototype.generateArray = function() {
    this.array = [];
    for (let i = 0; i < this.size; i++) {
      this.array.push(Math.random() * 0.8 + 0.1);
    }
  };

  window.BubbleSortViewer.prototype.nextStep = function() {
    if (this.sorted) return true;

    if (this.j >= this.size - 1 - this.i) {
      this.i++;
      this.j = 0;
      if (this.i >= this.size - 1) {
        this.sorted = true;
        return true;
      }
    }

    this.comparison = { i: this.j, j: this.j + 1 };
    
    if (this.array[this.j] > this.array[this.j + 1]) {
      const temp = this.array[this.j];
      this.array[this.j] = this.array[this.j + 1];
      this.array[this.j + 1] = temp;
      this.swapped = true;
      this.setStatus('Swapping elements at positions ' + this.j + ' and ' + (this.j + 1));
    } else {
      this.swapped = false;
    }

    this.j++;
    return false;
  };

  window.BubbleSortViewer.prototype.draw = function() {
    if (!this.ctx) return;

    // Clear canvas
    this.ctx.fillStyle = this.getNeonColor('lime', 0.02);
    this.ctx.fillRect(0, 0, this.width, this.height);

    const barWidth = (this.width - 40) / this.size;
    const maxHeight = this.height - 60;

    for (let i = 0; i < this.size; i++) {
      const x = 20 + i * barWidth;
      const barHeight = this.array[i] * maxHeight;
      const y = this.height - 30 - barHeight;

      // Determine color based on state
      let color = this.getNeonColor('lime', 0.6);
      
      if (this.comparison.i === i || this.comparison.j === i) {
        color = this.getNeonColor('violet', 0.9);
      } else if (this.sorted) {
        color = this.getNeonColor('cyan', 0.7);
      } else if (i >= this.size - this.i && this.i > 0) {
        color = this.getNeonColor('cyan', 0.4);
      }

      // Draw bar with glow
      this.ctx.fillStyle = color;
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 10;
      this.ctx.fillRect(x, y, barWidth - 2, barHeight);
      this.ctx.shadowBlur = 0;

      // Draw value on top
      if (this.size <= 15) {
        this.ctx.fillStyle = this.getNeonColor('lime', 0.8);
        this.ctx.font = '10px "Fira Code"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(this.array[i].toFixed(2), x + (barWidth - 2) / 2, y - 5);
      }
    }

    // Draw baseline
    this.ctx.strokeStyle = this.getNeonColor('lime', 0.3);
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(10, this.height - 30);
    this.ctx.lineTo(this.width - 10, this.height - 30);
    this.ctx.stroke();

    // Draw status
    if (this.swapped) {
      this.ctx.fillStyle = this.getNeonColor('violet', 0.8);
      this.ctx.font = 'bold 14px "Rajdhani"';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('SWAP!', this.width / 2, 30);
    }
  };

  // Initialize when loaded
  const viewer = new window.BubbleSortViewer('algo-canvas');
  window.algorithmViewer = viewer;

})();
