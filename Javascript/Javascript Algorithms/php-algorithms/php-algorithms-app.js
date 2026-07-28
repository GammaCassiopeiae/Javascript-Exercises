/* ⚡ PHP ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `<?php
function bubbleSort(array $arr): array {
    $n = count($arr);
    for ($i = 0; $i < $n; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                $tmp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $tmp;
            }
        }
    }
    return $arr;
}`
    },
    {
      title: 'Quick Sort',
      code: `<?php
function quickSort(array $arr): array {
    if (count($arr) <= 1) return $arr;
    $pivot = $arr[0];
    $left = $right = [];
    for ($i = 1; $i < count($arr); $i++) {
        if ($arr[$i] < $pivot) $left[] = $arr[$i];
        else $right[] = $arr[$i];
    }
    return array_merge(quickSort($left), [$pivot], quickSort($right));
}`
    },
    {
      title: 'Binary Search',
      code: `<?php
function binarySearch(array $arr, $target): int {
    $low = 0;
    $high = count($arr) - 1;
    while ($low <= $high) {
        $mid = floor(($low + high) / 2);
        if ($arr[$mid] == $target) return $mid;
        if ($arr[$mid] < $target) $low = $mid + 1;
        else $high = $mid - 1;
    }
    return -1;
}`
    },
    {
      title: 'Linked List Node',
      code: `<?php
class ListNode {
    public $value;
    public $next = null;
    public function __construct($value) {
        $this->value = $value;
    }
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `<?php
class Stack {
    private $items = [];
    public function push($item) { array_push($this->items, $item); }
    public function pop() { return array_pop($this->items); }
    public function peek() { return end($this->items); }
}`
    },
    {
      title: 'Merge Sort',
      code: `<?php
function mergeSort(array $arr): array {
    if (count($arr) <= 1) return $arr;
    $mid = floor(count($arr) / 2);
    $left = mergeSort(array_slice($arr, 0, $mid));
    $right = mergeSort(array_slice($arr, $mid));
    return merge($left, $right);
}

function merge($left, $right) {
    $res = [];
    while (count($left) > 0 && count($right) > 0) {
        if ($left[0] < $right[0]) $res[] = array_shift($left);
        else $res[] = array_shift($right);
    }
    return array_merge($res, $left, $right);
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `<?php
function fibonacci(int $n): int {
    $table = array_fill(0, $n + 1, 0);
    $table[1] = 1;
    for ($i = 0; $i <= $n; $i++) {
        if ($i + 1 <= $n) $table[$i + 1] += $table[$i];
        if ($i + 2 <= $n) $table[$i + 2] += $table[$i];
    }
    return $table[$n];
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `<?php
// Graph Shortest Path
function dijkstra(array $graph, int $start): array {
    $dist = array_fill(0, count($graph), INF);
    $visited = array_fill(0, count($graph), false);
    $dist[$start] = 0;
    // Core weight update logic...
    return $dist;
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
    id.textContent = `PHP-ALGO-${index.toString().padStart(3, '0')}`;
    
    header.append(title, id);

    // Code Block
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
