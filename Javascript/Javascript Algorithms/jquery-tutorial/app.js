const App = {
  state: {
    currentPage: 'home',
    currentTopic: null
  },

  init() {
    this.cacheDOM();
    this.bindEvents();
    this.route();
  },

  cacheDOM() {
    this.container = document.getElementById('app-container');
  },

  bindEvents() {
    window.addEventListener('hashchange', () => this.route());
    // Also handle direct file paths if needed, though hash is better for SPA
    window.addEventListener('load', () => this.route());
  },

  route() {
    const hash = window.location.hash.slice(1) || 'home';
    const path = window.location.pathname;
    
    // Detect if we are on a physical .html file (for "links to other html files" requirement)
    const fileMatch = path.match(/\/([a-zA-Z0-9\-]+)\.html$/);
    let topicId = null;

    if (fileMatch && fileMatch[1] !== 'index') {
      topicId = fileMatch[1];
    } else if (hash.startsWith('topic/')) {
      topicId = hash.split('/')[1];
    }

    if (topicId) {
      this.renderTopic(topicId);
    } else {
      this.renderHome();
    }
  },

  renderHome() {
    const main = document.createElement('div');
    main.innerHTML = `
      <section class="c-hero">
        <h1>jQuery vs DOM API</h1>
        <p>A Neon-Noir Comparison Guide</p>
      </section>
      <div class="l-tutorial-grid"></div>
    `;

    const grid = main.querySelector('.l-tutorial-grid');
    JQUERY_TUTORIAL_DATA.forEach(topic => {
      const card = document.createElement('a');
      card.href = `${topic.id}.html`;
      card.className = 'c-topic-card';
      card.innerHTML = `
        <h3>${topic.title}</h3>
        <p>Category: ${topic.category}</p>
      `;
      grid.appendChild(card);
    });

    this.container.innerHTML = '';
    this.container.appendChild(main);
  },

  renderTopic(topicId) {
    const topic = JQUERY_TUTORIAL_DATA.find(t => t.id === topicId);
    if (!topic) {
      this.renderHome();
      return;
    }

    const section = document.createElement('section');
    section.innerHTML = `
      <div class="u-margin-bottom-lg">
        <a href="index.html" class="c-nav__link">← Back to Overview</a>
        <h2 class="c-title" style="margin-top: 1rem; font-size: 2rem;">${topic.title}</h2>
      </div>

      <div class="l-comparison">
        <div class="c-container c-container--jquery">
          <h4 class="c-title">jQuery Implementation</h4>
          <div class="c-code-block">
            <pre><code>${this.escapeHTML(topic.jquery)}</code></pre>
          </div>
        </div>

        <div class="c-container c-container--dom">
          <h4 class="c-title">Vanilla DOM API</h4>
          <div class="c-code-block">
            <pre><code>${this.escapeHTML(topic.dom)}</code></pre>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = '';
    this.container.appendChild(section);
  },

  escapeHTML(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};

App.init();
