/* ⚡ TS ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`
    },
    {
      title: 'Quick Sort',
      code: `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}`
    },
    {
      title: 'Binary Search',
      code: `function binarySearch(arr: number[], target: number): number {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`
    },
    {
      title: 'Linked List Node',
      code: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;
  constructor(value: T) {
    this.value = value;
  }
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `class Stack<T> {
  private items: T[] = [];
  push(item: T): void { this.items.push(item); }
  pop(): T | undefined { return this.items.pop(); }
  peek(): T | undefined { return this.items[this.items.length - 1]; }
}`
    },
    {
      title: 'Merge Sort',
      code: `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift()!);
    else result.push(right.shift()!);
  }
  return [...result, ...left, ...right];
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `function fibonacci(n: number): number {
  const table = Array(n + 1).fill(0);
  table[1] = 1;
  for (let i = 0; i <= n; i++) {
    if (i + 1 <= n) table[i + 1] += table[i];
    if (i + 2 <= n) table[i + 2] += table[i];
  }
  return table[n];
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `// Graph Shortest Path
function dijkstra(graph: number[][], start: number): number[] {
  const dist = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  dist[start] = 0;
  // Weight update logic...
  return dist;
}`
    }
  ],

  init() {
    this.container = document.getElementById('algo-grid');
    this.render();
  },

  render() {
    const fragment = document.createDocumentFragment();

    // Render 100 entries as requested
    for(let i = 1; i <= 100; i++) {
        const baseItem = this.data[(i - 1) % this.data.length];
        fragment.appendChild(this.createCard(baseItem, i));
    }

    this.container.appendChild(fragment);
  },

  createCard(item, index) {
    const card = document.createElement('article');
    card.className = 'c-algo-card';
    
    // Header
    const header = document.createElement('div');
    header.className = 'c-algo-card__header';
    
    const title = document.createElement('h2');
    title.className = 'c-algo-card__title';
    title.textContent = index <= 8 ? item.title : `${item.title} (Node ${index})`;
    
    const id = document.createElement('span');
    id.className = 'c-algo-card__id';
    id.textContent = `ALGO-${index.toString().padStart(3, '0')}`;
    
    header.append(title, id);

    // Code Block - Using textContent for safety and to remove tags
    const pre = document.createElement('pre');
    pre.className = 'c-code-block';
    const code = document.createElement('code');
    code.textContent = item.code; // Clean code only, no tags
    pre.appendChild(code);

    card.append(header, pre);
    return card;
  }
};

document.addEventListener('DOMContentLoaded', () => Algorithms.init());
