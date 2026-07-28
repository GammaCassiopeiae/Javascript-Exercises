/**
 * Quick Sort Visualization
 */
(function() {
  'use strict';

  window.QuickSortViewer = function(canvasId) {
    window.AlgorithmViewer.call(this, canvasId);
  };

  window.QuickSortViewer.prototype = Object.create(window.AlgorithmViewer.prototype);
  window.QuickSortViewer.prototype.constructor = window.QuickSortViewer;

  window.QuickSortViewer.prototype.init = function() {
    this.size = 20;
    this.array = [];
    this.generateArray();
    this.stack = [];
    this.currentRange = { left: 0, right: this.size - 1 };
    this.pivot = -1;
    this.partitionIndex = -1;
    this.sorted = false;
    this.sortedRanges = [];
  };

  window.QuickSortViewer.prototype.generateArray = function() {
    this.array = [];
    for (let i = 0; i < this.size; i++) {
      this.array.push(Math.random() * 0.8 + 0.1);
    }
  };

  window.QuickSortViewer.prototype.nextStep = function() {
    if (this.sorted) return true;

    if (this.stack.length === 0 && this.currentRange.left >= this.currentRange.right) {
      this.sorted = true;
      return true;
    }

    if (this.currentRange.left >= this.currentRange.right) {
      if (this.stack.length > 0) {
        this.currentRange = this.stack.pop();
      }
      return false;
    }

    // Partition
    const pivotValue = this.array[this.currentRange.right];
    let i = this.currentRange.left - 1;
    
    for (let j = this.currentRange.left; j < this.currentRange.right; j++) {
      if (this.array[j] <= pivotValue) {
        i++;
        const temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
      }
    }
    
    const temp = this.array[i + 1];
    this.array[i + 1] = this.array[this.currentRange.right];
    this.array[this.currentRange.right] = temp;

    this.pivot = i + 1;
    this.partitionIndex = i + 1;

    this.stack.push({ left: this.currentRange.left, right: this.partitionIndex - 1 });
    this.stack.push({ left: this.partitionIndex + 1, right: this.currentRange.right });

    this.sortedRanges.push({ left: this.currentRange.left, right: this.currentRange.right });
    
    this.currentRange = this.stack.pop();
    this.setStatus('Partitioned at index ' + this.pivot);
    
    return false;
  };

  window.BubbleSortViewer.prototype.draw = function() {
    if (!this.ctx) return;

    this.ctx.fillStyle = this.getNeonColor('lime', 0.02);
    this.ctx.fillRect(0, 0, this.width, this.height);

    const barWidth = (this.width - 40) / this.size;
    const maxHeight = this.height - 60;

    for (let i = 0; i < this.size; i++) {
      const x = 20 + i * barWidth;
      const barHeight = this.array[i] * maxHeight;
      const y = this.height - 30 - barHeight;

      let color = this.getNeonColor('lime', 0.6);
      
      if (i === this.pivot) {
        color = this.getNeonColor('cyan', 0.9);
      } else if (i === this.partitionIndex) {
        color = this.getNeonColor('violet', 0.9);
      }

      this.ctx.fillStyle = color;
      this.ctx.shadowColor = color;
      this.ctx.shadowBlur = 10;
      this.ctx.fillRect(x, y, barWidth - 2, barHeight);
      this.ctx.shadowBlur = 0;
    }

    this.ctx.strokeStyle = this.getNeonColor('lime', 0.3);
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(10, this.height - 30);
    this.ctx.lineTo(this.width - 10, this.height - 30);
    this.ctx.stroke();
  };

  const viewer = new window.QuickSortViewer('algo-canvas');
  window.algorithmViewer = viewer;
})();
