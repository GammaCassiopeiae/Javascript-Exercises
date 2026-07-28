/* ⚡ JAVA ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    },
    {
      title: 'Quick Sort',
      code: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`
    },
    {
      title: 'Binary Search',
      code: `public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;
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
      code: `class ListNode<T> {
    T value;
    ListNode<T> next;

    ListNode(T value) {
        this.value = value;
        this.next = null;
    }
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `import java.util.ArrayList;
import java.util.List;

public class Stack<T> {
    private List<T> items = new ArrayList<>();

    public void push(T item) {
        items.add(item);
    }

    public T pop() {
        if (items.isEmpty()) return null;
        return items.remove(items.size() - 1);
    }

    public T peek() {
        if (items.isEmpty()) return null;
        return items.get(items.size() - 1);
    }
}`
    },
    {
      title: 'Merge Sort',
      code: `public static void mergeSort(int[] arr) {
    if (arr.length <= 1) return;
    int mid = arr.length / 2;
    int[] left = new int[mid];
    int[] right = new int[arr.length - mid];
    System.arraycopy(arr, 0, left, 0, mid);
    System.arraycopy(arr, mid, right, 0, right.length);
    mergeSort(left);
    mergeSort(right);
    merge(arr, left, right);
}

private static void merge(int[] arr, int[] left, int[] right) {
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `public static long fibonacci(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;

    long[] dp = new long[n + 1];
    dp[1] = 1;
    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `import java.util.*;

public static int[] dijkstra(List<List<Edge>> graph, int start) {
    int n = graph.size();
    int[] dist = new int[n];
    boolean[] visited = new boolean[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;

    PriorityQueue<Edge> pq = new PriorityQueue<>();
    pq.add(new Edge(start, 0));

    while (!pq.isEmpty()) {
        Edge current = pq.poll();
        int u = current.to;
        if (visited[u]) continue;
        visited[u] = true;

        for (Edge edge : graph.get(u)) {
            int newDist = dist[u] + edge.weight;
            if (newDist < dist[edge.to]) {
                dist[edge.to] = newDist;
                pq.add(new Edge(edge.to, newDist));
            }
        }
    }
    return dist;
}

static class Edge implements Comparable<Edge> {
    int to, weight;
    Edge(int to, int weight) {
        this.to = to;
        this.weight = weight;
    }
    public int compareTo(Edge other) {
        return Integer.compare(this.weight, other.weight);
    }
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
