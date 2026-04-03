/* ⚡ JAVASCRIPT ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`
    },
    {
      title: 'Quick Sort',
      code: `function quickSort(arr) {
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
      code: `function binarySearch(arr, target) {
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
      code: `class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.items.length === 0) return null;
    return this.items.pop();
  }

  peek() {
    if (this.items.length === 0) return null;
    return this.items[this.items.length - 1];
  }
}`
    },
    {
      title: 'Merge Sort',
      code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  return [...result, ...left, ...right];
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `function fibonacci(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;

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
      code: `function dijkstra(graph, start) {
  const dist = Array(graph.length).fill(Infinity);
  const visited = Array(graph.length).fill(false);
  dist[start] = 0;

  for (let i = 0; i < graph.length; i++) {
    let u = -1;
    for (let j = 0; j < graph.length; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;
    }
    if (dist[u] === Infinity) break;
    visited[u] = true;
    for (const [v, weight] of graph[u]) {
      if (dist[u] + weight < dist[v]) dist[v] = dist[u] + weight;
    }
  }
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

    for (let i = 1; i <= 100; i++) {
        const baseItem = this.data[(i - 1) % this.data.length];
        fragment.appendChild(this.createCard(baseItem, i));
    }

    this.container.appendChild(fragment);
  },

  createCard(item, index) {
    const card = document.createElement('article');
    card.className = 'c-algo-card';

    const header = document.createElement('div');
    header.className = 'c-algo-card__header';

    const title = document.createElement('h2');
    title.className = 'c-algo-card__title';
    title.textContent = index <= 8 ? item.title : item.title + ' (Node ' + index + ')';

    const id = document.createElement('span');
    id.className = 'c-algo-card__id';
    id.textContent = 'ALGO-' + index.toString().padStart(3, '0');

    header.append(title, id);

    const pre = document.createElement('pre');
    pre.className = 'c-code-block';
    const code = document.createElement('code');
    code.textContent = item.code;
    pre.appendChild(code);

    card.append(header, pre);
    return card;
  }
};

document.addEventListener('DOMContentLoaded', () => Algorithms.init());
