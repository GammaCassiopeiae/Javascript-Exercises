/* ⚡ CPP ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `#include <vector>
#include <algorithm>

void bubbleSort(std::vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                std::swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
    },
    {
      title: 'Quick Sort',
      code: `#include <vector>

int partition(std::vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return (i + 1);
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`
    },
    {
      title: 'Binary Search',
      code: `#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}`
    },
    {
      title: 'Linked List Node',
      code: `template <typename T>
struct ListNode {
    T value;
    ListNode* next;
    ListNode(T val) : value(val), next(nullptr) {}
};`
    },
    {
      title: 'Stack (LIFO)',
      code: `#include <vector>
#include <stdexcept>

template <typename T>
class Stack {
private:
    std::vector<T> items;
public:
    void push(T item) { items.push_back(item); }
    void pop() { 
        if (items.empty()) throw std::runtime_error("Empty");
        items.pop_back(); 
    }
    T top() { return items.back(); }
};`
    },
    {
      title: 'Merge Sort',
      code: `#include <vector>

void merge(std::vector<int>& arr, int l, int m, int r) {
    // Implementation of merge logic...
}

void mergeSort(std::vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `#include <vector>

long long fibonacci(int n) {
    if (n <= 1) return n;
    std::vector<long long> table(n + 1, 0);
    table[1] = 1;
    for (int i = 2; i <= n; i++) {
        table[i] = table[i - 1] + table[i - 2];
    }
    return table[n];
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `#include <vector>
#include <queue>

std::vector<int> dijkstra(const std::vector<std::vector<std::pair<int, int>>>& graph, int start) {
    std::vector<int> dist(graph.size(), 1e9);
    dist[start] = 0;
    // Priority queue based relaxation...
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

    for(let i = 1; i <= 100; i++) {
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
    title.textContent = index <= 8 ? item.title : `${item.title} (Instance ${index})`;
    
    const id = document.createElement('span');
    id.className = 'c-algo-card__id';
    id.textContent = `CPP-ALGO-${index.toString().padStart(3, '0')}`;
    
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
