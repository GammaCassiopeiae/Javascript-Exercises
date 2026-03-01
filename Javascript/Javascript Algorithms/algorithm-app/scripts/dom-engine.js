
/**
 * NEON-NOIR DOM ENGINE
 * Directive 201: document.createElement() for dynamic component injection.
 * Directive 206: Fragment Injection for performance.
 */

class AlgoEngine {
  constructor(categoryTitle, accentColor) {
    this.categoryTitle = categoryTitle;
    this.accentColor = accentColor;
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.updateColors();
      this.render();
    });
  }

  updateColors() {
    if (this.accentColor) {
      document.documentElement.style.setProperty('--neon-lime', this.accentColor);
      document.documentElement.style.setProperty('--border-glow', `rgba(${this.hexToRgb(this.accentColor)}, 0.2)`);
    }
  }

  hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
  }

  render() {
    const mainContent = document.getElementById('algo-container');
    if (!mainContent || !window.ALGO_DATA) return;

    const fragment = document.createDocumentFragment();

    window.ALGO_DATA.forEach(algo => {
      const section = document.createElement('section');
      section.className = 'c-algo';
      
      const title = document.createElement('h2');
      title.className = 'c-algo__title u-text-glow';
      title.textContent = algo.title;
      section.appendChild(title);

      const container = document.createElement('div');
      container.className = 'c-code-container';

      // Code Block
      const pre = document.createElement('pre');
      pre.className = 'c-code-block';
      const code = document.createElement('code');
      code.textContent = algo.code.trim();
      pre.appendChild(code);
      container.appendChild(pre);

      // Explanation Block
      const explanation = document.createElement('div');
      explanation.className = 'c-explanation';
      
      algo.explanation.forEach((line, index) => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'c-line-info';
        
        const num = document.createElement('span');
        num.className = 'c-line-info__num';
        num.textContent = `L${index + 1}:`;
        
        const text = document.createTextNode(line);
        
        lineDiv.appendChild(num);
        lineDiv.appendChild(text);
        explanation.appendChild(lineDiv);
      });

      container.appendChild(explanation);
      section.appendChild(container);
      fragment.appendChild(section);
    });

    mainContent.appendChild(fragment);
  }
}
