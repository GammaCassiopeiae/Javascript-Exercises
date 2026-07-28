/* ⚡ RUST ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `fn bubble_sort(arr: &mut [i32]) {
    let n = arr.len();
    for i in 0..n {
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}`
    },
    {
      title: 'Quick Sort',
      code: `fn quick_sort(arr: &mut [i32]) {
    let len = arr.len();
    if len <= 1 { return; }
    
    let pivot = partition(arr);
    quick_sort(&mut arr[..pivot]);
    quick_sort(&mut arr[pivot + 1..]);
}

fn partition(arr: &mut [i32]) -> usize {
    let len = arr.len();
    let pivot = len - 1;
    let mut i = 0;
    
    for j in 0..len - 1 {
        if arr[j] < arr[pivot] {
            arr.swap(i, j);
            i += 1;
        }
    }
    arr.swap(i, len - 1);
    i
}`
    },
    {
      title: 'Binary Search',
      code: `fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut low = 0;
    let mut high = arr.len() as i32 - 1;
    
    while low <= high {
        let mid = (low + high) as usize / 2;
        if arr[mid] == target {
            return Some(mid);
        } else if arr[mid] < target {
            low = mid as i32 + 1;
        } else {
            high = mid as i32 - 1;
        }
    }
    None
}`
    },
    {
      title: 'Linked List Node',
      code: `use std::rc::Rc;
use std::cell::RefCell;

#[derive(Clone)]
struct ListNode<T> {
    value: T,
    next: Option<Rc<RefCell<ListNode<T>>>>,
}

impl<T> ListNode<T> {
    fn new(value: T) -> Self {
        ListNode { value, next: None }
    }
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    fn new() -> Self {
        Stack { items: Vec::new() }
    }
    
    fn push(&mut self, item: T) {
        self.items.push(item);
    }
    
    fn pop(&mut self) -> Option<T> {
        self.items.pop()
    }
    
    fn peek(&self) -> Option<&T> {
        self.items.last()
    }
}`
    },
    {
      title: 'Merge Sort',
      code: `fn merge_sort(arr: &mut [i32]) {
    let len = arr.len();
    if len <= 1 { return; }
    
    let mid = len / 2;
    let mut left = arr[..mid].to_vec();
    let mut right = arr[mid..].to_vec();
    
    merge_sort(&mut left);
    merge_sort(&mut right);
    merge(arr, &left, &right);
}

fn merge(arr: &mut [i32], left: &[i32], right: &[i32]) {
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;
    
    while i < left.len() && j < right.len() {
        if left[i] <= right[j] {
            arr[k] = left[i];
            i += 1;
        } else {
            arr[k] = right[j];
            j += 1;
        }
        k += 1;
    }
    
    while i < left.len() {
        arr[k] = left[i];
        i += 1;
        k += 1;
    }
    
    while j < right.len() {
        arr[k] = right[j];
        j += 1;
        k += 1;
    }
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `fn fibonacci(n: usize) -> u64 {
    if n == 0 { return 0; }
    if n == 1 { return 1; }
    
    let mut dp = vec![0u64; n + 1];
    dp[1] = 1;
    
    for i in 2..=n {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    dp[n]
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `use std::collections::BinaryHeap;
use std::cmp::Reverse;

fn dijkstra(graph: &Vec<Vec<(usize, i32)>>, start: usize) -> Vec<i32> {
    let n = graph.len();
    let mut dist = vec![i32::MAX; n];
    let mut heap = BinaryHeap::new();
    
    dist[start] = 0;
    heap.push(Reverse((0, start)));
    
    while let Some(Reverse((d, u))) = heap.pop() {
        if d > dist[u] { continue; }
        
        for &(v, weight) in &graph[u] {
            let new_dist = dist[u] + weight;
            if new_dist < dist[v] {
                dist[v] = new_dist;
                heap.push(Reverse((new_dist, v)));
            }
        }
    }
    
    dist
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
