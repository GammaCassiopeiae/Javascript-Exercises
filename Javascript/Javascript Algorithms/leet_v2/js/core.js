/**
 * NEON-NOIR LOGIC ENGINE v4.1
 * Global Implementation for LeetCode Tutorial App
 * Ensures compatibility with file:/// protocol
 */

const NEON_LEET = {
  /**
   * Initializes mouse-tracking glow for cards (NEO-03)
   */
  initCardGlow() {
    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    };

    const cards = document.querySelectorAll('.c-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
    });
  },

  /**
   * Visualization Helper
   */
  createViz(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    const max = Math.max(...data, 1);

    data.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'c-viz__bar';
      bar.dataset.index = idx;
      bar.dataset.value = val;
      const height = Math.max((val / max) * 100, 10);
      bar.style.height = `${height}%`;
      
      // Add value label
      const label = document.createElement('span');
      label.className = 'c-viz__label';
      label.textContent = val;
      bar.appendChild(label);
      
      container.appendChild(bar);
    });
  },

  /**
   * Animation Helpers
   */
  async highlight(index, colorClass = 'is-active', duration = 500) {
    const bars = document.querySelectorAll('.c-viz__bar');
    if (bars[index]) {
      bars[index].classList.add(colorClass);
      await new Promise(r => setTimeout(r, duration));
      bars[index].classList.remove(colorClass);
    }
  },

  async markResolved(index, color = 'var(--n-green)') {
    const bars = document.querySelectorAll('.c-viz__bar');
    if (bars[index]) {
      bars[index].style.background = color;
      bars[index].style.boxShadow = `0 0 20px ${color}`;
    }
  },

  /**
   * Theme Management (NEO-02 compatible)
   */
  initTheme() {
    const savedTheme = localStorage.getItem('neon-theme') || 'dark';
    this.applyTheme(savedTheme);

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('u-theme-light') ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
      });
    }
  },

  applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('u-theme-light');
    } else {
      document.body.classList.remove('u-theme-light');
    }
    localStorage.setItem('neon-theme', theme);
  }
};

// Auto-init
window.addEventListener('DOMContentLoaded', () => {
  NEON_LEET.initCardGlow();
  NEON_LEET.initTheme();
});
