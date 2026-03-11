#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ─── ANSI Color Helpers ───────────────────────────────────────────────────────
const C = {
  reset:   '\x1b[0m',
  bold:    '\x1b[1m',
  dim:     '\x1b[2m',
  // foregrounds
  cyan:    '\x1b[96m',
  green:   '\x1b[92m',
  yellow:  '\x1b[93m',
  magenta: '\x1b[95m',
  blue:    '\x1b[94m',
  white:   '\x1b[97m',
  gray:    '\x1b[90m',
  red:     '\x1b[91m',
  orange:  '\x1b[38;5;208m',
  // backgrounds
  bgBlue:  '\x1b[44m',
  bgGray:  '\x1b[100m',
};

const col  = (color, text) => `${C[color]}${text}${C.reset}`;
const bold = (text)        => `${C.bold}${text}${C.reset}`;

// ─── Category Map ─────────────────────────────────────────────────────────────
// Maps keyword fragments (lowercase) to a display category label
const CATEGORIES = [
  { label: 'Sorting',          keys: ['sort', 'bubble', 'merge', 'quick', 'insert', 'select', 'heap', 'bucket', 'gnome', 'bogo', 'mix'] },
  { label: 'Searching',        keys: ['search', 'binary', 'linear', 'interpolation', 'jump', 'ternary', 'exponential'] },
  { label: 'Graph',            keys: ['dijkstra', 'bfs', 'dfs', 'bellman', 'floyd', 'kruskal', 'prim', 'euler', 'graph', 'topological'] },
  { label: 'Dynamic Prog.',    keys: ['dynamic', 'dynammicprog', 'knapsack', 'memoization', 'lcs', 'lis', 'rod', 'coin', 'edit', 'matrix_chain', 'dp'] },
  { label: 'Trees & DS',       keys: ['heap', 'quad', 'bsp', 'suffix', 'palindromic', 'union', 'avl', 'tree', 'trie'] },
  { label: 'String Algs',      keys: ['kmp', 'rabin', 'z_alg', 'aho', 'boyer', 'huffman', 'longest', 'palindrome', 'sliding', 'prefix', 'twopoin'] },
  { label: 'Math & Numbers',   keys: ['fibonacci', 'sieve', 'erath', 'gcd', 'pascal', 'prime', 'factor', 'collatz', 'square', 'number', 'combinat', 'tribonacci', 'fast'] },
  { label: 'Cryptography',     keys: ['rsa', 'diffie', 'md5', 'sha', 'hash', 'crt', 'luhn', 'modular', 'security', 'extended_gcd', 'diffie_hellman'] },
  { label: 'Backtracking',     keys: ['backtrack', 'sudoku', 'hanoi', 'nextpermute', 'recursion'] },
  { label: 'Greedy Algs',      keys: ['greedy', 'activity', 'fractional', 'job_seq', 'interval', 'coin_change'] },
  { label: 'Geometry',         keys: ['convex', 'closest', 'line_inter', 'point_in', 'bresenham', 'perlin', 'path'] },
  { label: 'Games & Sim',      keys: ['snake', 'conway', 'chess', 'collision', 'combat', 'puzzle', 'boid', 'flood', 'game', 'fairCoin', 'shuffle', 'randomized', 'randomeness'] },
  { label: 'AI & Search',      keys: ['a_star', 'astar', 'minimax', 'mtcs', 'neural', 'behavior', 'finite', 'decision', 'predictive'] },
  { label: 'Visualizers',      keys: ['vis', 'visual', 'alg'] },
  { label: 'Other',            keys: [] },
];

function getCategory(filename) {
  const lower = filename.toLowerCase();
  for (const cat of CATEGORIES) {
    for (const key of cat.keys) {
      if (lower.includes(key)) return cat.label;
    }
  }
  return 'Other';
}

// ─── File Discovery ───────────────────────────────────────────────────────────
const DIR         = __dirname;
const EXTENSIONS  = ['.js', '.html'];
const SKIP_FILES  = ['cli_node.js'];   // don't list ourselves

function loadFiles() {
  const files = fs.readdirSync(DIR)
    .filter(f => {
      const ext = path.extname(f).toLowerCase();
      return EXTENSIONS.includes(ext) && !SKIP_FILES.includes(f);
    })
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

  // Group by category
  const grouped = {};
  for (const f of files) {
    const cat = getCategory(f);
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(f);
  }

  // Build flat numbered list preserving category order
  const ordered = [];
  for (const cat of CATEGORIES) {
    if (grouped[cat.label]) {
      for (const f of grouped[cat.label]) {
        ordered.push({ file: f, category: cat.label });
      }
      delete grouped[cat.label];
    }
  }
  // Append anything left
  for (const leftover of Object.values(grouped).flat()) {
    ordered.push({ file: leftover, category: 'Other' });
  }

  return ordered;
}

// ─── Terminal Helpers ─────────────────────────────────────────────────────────
function clearScreen() {
  process.stdout.write('\x1bc');
}

function printDivider(char = '─', width = 72, color = 'gray') {
  console.log(col(color, char.repeat(width)));
}

function printHeader() {
  clearScreen();
  printDivider('═', 72, 'blue');
  const title = '  ⚡  JavaScript Algorithms  —  CLI Code Viewer';
  console.log(col('cyan', bold(title)));
  const sub   = `  📁  ${DIR}`;
  console.log(col('gray', sub));
  printDivider('═', 72, 'blue');
  console.log();
}

function printMenu(entries) {
  let lastCat = null;
  for (let i = 0; i < entries.length; i++) {
    const { file, category } = entries[i];
    const num  = String(i + 1).padStart(4, ' ');
    const ext  = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    if (category !== lastCat) {
      if (lastCat !== null) console.log();
      console.log(col('yellow', bold(`  ┌─ ${category} ${'─'.repeat(Math.max(0, 50 - category.length))}┐`)));
      lastCat = category;
    }

    const numStr  = col('green',   `${num}.`);
    const extStr  = ext === '.js' ? col('cyan', ext) : col('magenta', ext);
    const nameStr = col('white',   name);
    console.log(`  ${numStr}  ${nameStr}${extStr}`);
  }
  console.log();
  printDivider('─', 72, 'gray');
  console.log(col('gray', `  Total files: ${col('yellow', bold(String(entries.length)))}`));
  printDivider('─', 72, 'gray');
  console.log();
}

// ─── Code Display ─────────────────────────────────────────────────────────────
const JS_KW  = /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|extends|import|export|default|typeof|instanceof|throw|try|catch|finally|async|await|yield|of|in|null|undefined|true|false|this|super|delete|void)\b/g;
const JS_STR = /(["'`])(?:(?!\1)[^\\]|\\.)*\1/g;
const JS_CMT = /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g;
const JS_NUM = /\b(\d+(\.\d+)?)\b/g;

function highlightJS(code) {
  // Very lightweight JS coloriser for the terminal
  const lines = code.split('\n');
  return lines.map(line => {
    // Comments — whole line or inline
    if (/^\s*(\/\/|\/\*)/.test(line)) {
      return col('gray', line);
    }
    return line
      .replace(JS_STR, m => col('green', m))
      .replace(JS_CMT, m => col('gray',  m))
      .replace(JS_KW,  m => col('cyan',  bold(m)))
      .replace(JS_NUM, m => col('orange', m));
  }).join('\n');
}

function displayCode(entry, index, total) {
  const { file } = entry;
  const filePath = path.join(DIR, file);
  let code;
  try {
    code = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    console.log(col('red', `  ✗ Could not read file: ${e.message}`));
    return;
  }

  clearScreen();
  printDivider('═', 72, 'blue');
  const header = `  📄  [${index}/${total}]  ${file}`;
  console.log(col('cyan', bold(header)));
  const meta = `  Lines: ${code.split('\n').length}   Size: ${(code.length / 1024).toFixed(1)} KB`;
  console.log(col('gray', meta));
  printDivider('═', 72, 'blue');
  console.log();

  const ext = path.extname(file).toLowerCase();
  const highlighted = (ext === '.js') ? highlightJS(code) : code;

  // Print with line numbers
  const lines = highlighted.split('\n');
  const pad   = String(lines.length).length;
  for (let i = 0; i < lines.length; i++) {
    const lineNum = col('gray', String(i + 1).padStart(pad, ' ') + ' │ ');
    process.stdout.write(lineNum + lines[i] + '\n');
  }

  console.log();
  printDivider('─', 72, 'gray');
  console.log(col('gray', '  [Enter] Back to menu   [q] Quit   [p] Previous   [n] Next'));
  printDivider('─', 72, 'gray');
}

// ─── Main App ─────────────────────────────────────────────────────────────────
async function main() {
  const entries = loadFiles();

  if (entries.length === 0) {
    console.log(col('red', 'No .js or .html files found in this directory.'));
    process.exit(1);
  }

  const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
  });

  // Raw mode for single-keypress navigation (when viewing code)
  let viewingIndex = null;   // null = menu, number = index in entries (0-based)

  function prompt(question) {
    return new Promise(resolve => rl.question(question, resolve));
  }

  async function showMenu() {
    printHeader();
    printMenu(entries);
    const answer = await prompt(col('yellow', bold('  Enter number (or q to quit): ')));
    return answer.trim();
  }

  async function showCode(idx) {
    displayCode(entries[idx], idx + 1, entries.length);
    const answer = await prompt(col('yellow', bold('  > ')));
    return answer.trim().toLowerCase();
  }

  // ── Main loop ──
  outerLoop: while (true) {
    const input = await showMenu();

    if (input.toLowerCase() === 'q' || input.toLowerCase() === 'quit') {
      clearScreen();
      console.log(col('cyan', bold('\n  👋  Goodbye! Happy coding!\n')));
      break;
    }

    const num = parseInt(input, 10);
    if (isNaN(num) || num < 1 || num > entries.length) {
      printHeader();
      console.log(col('red', `  ✗ Invalid choice. Please enter a number between 1 and ${entries.length}.\n`));
      await prompt(col('gray', '  Press Enter to continue...'));
      continue;
    }

    let idx = num - 1;

    // ── Code viewer loop ──
    while (true) {
      const cmd = await showCode(idx);

      if (cmd === 'q') {
        clearScreen();
        console.log(col('cyan', bold('\n  👋  Goodbye! Happy coding!\n')));
        break outerLoop;
      } else if (cmd === 'n') {
        idx = (idx + 1) % entries.length;
      } else if (cmd === 'p') {
        idx = (idx - 1 + entries.length) % entries.length;
      } else if (cmd === '' || cmd === 'b') {
        break;   // back to menu
      } else {
        // Try treating input as a number (jump to file)
        const jumpTo = parseInt(cmd, 10);
        if (!isNaN(jumpTo) && jumpTo >= 1 && jumpTo <= entries.length) {
          idx = jumpTo - 1;
        }
        // Otherwise stay on same file
      }
    }
  }

  rl.close();
  process.exit(0);
}

main().catch(err => {
  console.error(col('red', `\n  Fatal error: ${err.message}\n`));
  process.exit(1);
});
