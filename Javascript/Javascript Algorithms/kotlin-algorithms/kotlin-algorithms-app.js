/* ⚡ KOTLIN ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `fun bubbleSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}`
    },
    {
      title: 'Quick Sort',
      code: `fun quickSort(arr: IntArray, low: Int, high: Int) {
    if (low < high) {
        val pi = partition(arr, low, high)
        quickSort(arr, low, pi - 1)
        quickSort(arr, pi + 1, high)
    }
}

private fun partition(arr: IntArray, low: Int, high: Int): Int {
    val pivot = arr[high]
    var i = low - 1
    for (j in low until high) {
        if (arr[j] < pivot) {
            i++
            val temp = arr[i]
            arr[i] = arr[j]
            arr[j] = temp
        }
    }
    val temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    return i + 1
}`
    },
    {
      title: 'Binary Search',
      code: `fun binarySearch(arr: IntArray, target: Int): Int {
    var low = 0
    var high = arr.size - 1
    while (low <= high) {
        val mid = low + (high - low) / 2
        if (arr[mid] == target) return mid
        if (arr[mid] < target) low = mid + 1
        else high = mid - 1
    }
    return -1
}`
    },
    {
      title: 'Linked List Node',
      code: `class ListNode<T>(var value: T) {
    var next: ListNode<T>? = null
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `class Stack<T> {
    private val items = mutableListOf<T>()

    fun push(item: T) {
        items.add(item)
    }

    fun pop(): T? {
        return if (items.isEmpty()) null
        else items.removeAt(items.size - 1)
    }

    fun peek(): T? {
        return if (items.isEmpty()) null
        else items.last()
    }
}`
    },
    {
      title: 'Merge Sort',
      code: `fun mergeSort(arr: IntArray): IntArray {
    if (arr.size <= 1) return arr
    val mid = arr.size / 2
    val left = arr.sliceArray(0 until mid)
    val right = arr.sliceArray(mid until arr.size)
    return merge(mergeSort(left), mergeSort(right))
}

private fun merge(left: IntArray, right: IntArray): IntArray {
    val result = IntArray(left.size + right.size)
    var i = 0; var j = 0; var k = 0
    while (i < left.size && j < right.size) {
        if (left[i] <= right[j]) result[k++] = left[i++]
        else result[k++] = right[j++]
    }
    while (i < left.size) result[k++] = left[i++]
    while (j < right.size) result[k++] = right[j++]
    return result
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `fun fibonacci(n: Int): Long {
    if (n == 0) return 0
    if (n == 1) return 1

    val dp = LongArray(n + 1)
    dp[1] = 1
    for (i in 2..n) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `import java.util.PriorityQueue

data class Edge(val to: Int, val weight: Int)

fun dijkstra(graph: List<List<Edge>>, start: Int): IntArray {
    val n = graph.size
    val dist = IntArray(n) { Int.MAX_VALUE }
    val visited = BooleanArray(n)
    dist[start] = 0

    val pq = PriorityQueue<Pair<Int, Int>>(compareBy { it.second })
    pq.add(start to 0)

    while (pq.isNotEmpty()) {
        val (u, d) = pq.poll()
        if (visited[u]) continue
        visited[u] = true

        for (edge in graph[u]) {
            val newDist = dist[u] + edge.weight
            if (newDist < dist[edge.to]) {
                dist[edge.to] = newDist
                pq.add(edge.to to newDist)
            }
        }
    }
    return dist
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
