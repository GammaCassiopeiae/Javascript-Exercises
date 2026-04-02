/* ⚡ GO ALGORITHM ENGINE v4.0 // NEON-NOIR COMPLIANT // 30 UNIQUE ALGORITHMS */

const GoAlgorithms = {

  /* ═══════════════════════════════════════════════════
     DATA — 30 Go Algorithm Implementations
     ═══════════════════════════════════════════════════ */

  data: [

    // ─── SORTING ────────────────────────────────────
    {
      title: 'Bubble Sort',
      category: 'sorting',
      complexity: 'O(n²) / O(1)',
      code: `package main

func bubbleSort(arr []int) []int {
    n := len(arr)
    for i := 0; i < n; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
    return arr
}`
    },
    {
      title: 'Quick Sort',
      category: 'sorting',
      complexity: 'O(n log n) / O(log n)',
      code: `package main

func quickSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    pivot := arr[0]
    var left, right []int
    for _, v := range arr[1:] {
        if v < pivot {
            left = append(left, v)
        } else {
            right = append(right, v)
        }
    }
    result := quickSort(left)
    result = append(result, pivot)
    result = append(result, quickSort(right)...)
    return result
}`
    },
    {
      title: 'Merge Sort',
      category: 'sorting',
      complexity: 'O(n log n) / O(n)',
      code: `package main

func mergeSort(arr []int) []int {
    if len(arr) <= 1 {
        return arr
    }
    mid := len(arr) / 2
    left := mergeSort(arr[:mid])
    right := mergeSort(arr[mid:])
    return merge(left, right)
}

func merge(l, r []int) []int {
    var res []int
    i, j := 0, 0
    for i < len(l) && j < len(r) {
        if l[i] < r[j] {
            res = append(res, l[i]); i++
        } else {
            res = append(res, r[j]); j++
        }
    }
    res = append(res, l[i:]...)
    res = append(res, r[j:]...)
    return res
}`
    },
    {
      title: 'Insertion Sort',
      category: 'sorting',
      complexity: 'O(n²) / O(1)',
      code: `package main

func insertionSort(arr []int) []int {
    for i := 1; i < len(arr); i++ {
        key := arr[i]
        j := i - 1
        for j >= 0 && arr[j] > key {
            arr[j+1] = arr[j]
            j--
        }
        arr[j+1] = key
    }
    return arr
}`
    },
    {
      title: 'Selection Sort',
      category: 'sorting',
      complexity: 'O(n²) / O(1)',
      code: `package main

func selectionSort(arr []int) []int {
    n := len(arr)
    for i := 0; i < n-1; i++ {
        minIdx := i
        for j := i + 1; j < n; j++ {
            if arr[j] < arr[minIdx] {
                minIdx = j
            }
        }
        arr[i], arr[minIdx] = arr[minIdx], arr[i]
    }
    return arr
}`
    },
    {
      title: 'Heap Sort',
      category: 'sorting',
      complexity: 'O(n log n) / O(1)',
      code: `package main

func heapSort(arr []int) []int {
    n := len(arr)
    for i := n/2 - 1; i >= 0; i-- {
        heapify(arr, n, i)
    }
    for i := n - 1; i > 0; i-- {
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)
    }
    return arr
}

func heapify(arr []int, n, i int) {
    largest := i
    l, r := 2*i+1, 2*i+2
    if l < n && arr[l] > arr[largest] {
        largest = l
    }
    if r < n && arr[r] > arr[largest] {
        largest = r
    }
    if largest != i {
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
    }
}`
    },
    {
      title: 'Counting Sort',
      category: 'sorting',
      complexity: 'O(n + k) / O(k)',
      code: `package main

func countingSort(arr []int) []int {
    if len(arr) == 0 {
        return arr
    }
    max := arr[0]
    for _, v := range arr {
        if v > max { max = v }
    }
    count := make([]int, max+1)
    for _, v := range arr {
        count[v]++
    }
    idx := 0
    for i, c := range count {
        for j := 0; j < c; j++ {
            arr[idx] = i
            idx++
        }
    }
    return arr
}`
    },
    {
      title: 'Radix Sort',
      category: 'sorting',
      complexity: 'O(d·(n+k)) / O(n+k)',
      code: `package main

func radixSort(arr []int) []int {
    max := getMax(arr)
    for exp := 1; max/exp > 0; exp *= 10 {
        arr = countByDigit(arr, exp)
    }
    return arr
}

func getMax(arr []int) int {
    m := arr[0]
    for _, v := range arr {
        if v > m { m = v }
    }
    return m
}

func countByDigit(arr []int, exp int) []int {
    n := len(arr)
    output := make([]int, n)
    count := make([]int, 10)
    for _, v := range arr {
        count[(v/exp)%10]++
    }
    for i := 1; i < 10; i++ {
        count[i] += count[i-1]
    }
    for i := n - 1; i >= 0; i-- {
        d := (arr[i] / exp) % 10
        output[count[d]-1] = arr[i]
        count[d]--
    }
    return output
}`
    },

    // ─── SEARCHING ──────────────────────────────────
    {
      title: 'Binary Search',
      category: 'searching',
      complexity: 'O(log n) / O(1)',
      code: `package main

func binarySearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    for low <= high {
        mid := (low + high) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return -1
}`
    },
    {
      title: 'Linear Search',
      category: 'searching',
      complexity: 'O(n) / O(1)',
      code: `package main

func linearSearch(arr []int, target int) int {
    for i, v := range arr {
        if v == target {
            return i
        }
    }
    return -1
}`
    },
    {
      title: 'Jump Search',
      category: 'searching',
      complexity: 'O(√n) / O(1)',
      code: `package main

import "math"

func jumpSearch(arr []int, target int) int {
    n := len(arr)
    step := int(math.Sqrt(float64(n)))
    prev := 0
    for arr[min(step, n)-1] < target {
        prev = step
        step += int(math.Sqrt(float64(n)))
        if prev >= n {
            return -1
        }
    }
    for arr[prev] < target {
        prev++
        if prev == min(step, n) {
            return -1
        }
    }
    if arr[prev] == target {
        return prev
    }
    return -1
}`
    },
    {
      title: 'Interpolation Search',
      category: 'searching',
      complexity: 'O(log log n) / O(1)',
      code: `package main

func interpolationSearch(arr []int, target int) int {
    low, high := 0, len(arr)-1
    for low <= high && target >= arr[low] &&
        target <= arr[high] {
        if low == high {
            if arr[low] == target {
                return low
            }
            return -1
        }
        pos := low + ((target - arr[low]) *
            (high - low)) /
            (arr[high] - arr[low])
        if arr[pos] == target {
            return pos
        }
        if arr[pos] < target {
            low = pos + 1
        } else {
            high = pos - 1
        }
    }
    return -1
}`
    },

    // ─── DATA STRUCTURES ────────────────────────────
    {
      title: 'Linked List',
      category: 'data-structure',
      complexity: 'Insert O(1) / Search O(n)',
      code: `package main

type ListNode struct {
    Value int
    Next  *ListNode
}

type LinkedList struct {
    Head *ListNode
}

func (ll *LinkedList) Insert(val int) {
    node := &ListNode{Value: val}
    node.Next = ll.Head
    ll.Head = node
}

func (ll *LinkedList) Search(val int) bool {
    curr := ll.Head
    for curr != nil {
        if curr.Value == val {
            return true
        }
        curr = curr.Next
    }
    return false
}

func (ll *LinkedList) Delete(val int) {
    if ll.Head == nil { return }
    if ll.Head.Value == val {
        ll.Head = ll.Head.Next
        return
    }
    curr := ll.Head
    for curr.Next != nil {
        if curr.Next.Value == val {
            curr.Next = curr.Next.Next
            return
        }
        curr = curr.Next
    }
}`
    },
    {
      title: 'Doubly Linked List',
      category: 'data-structure',
      complexity: 'Insert O(1) / Delete O(1)',
      code: `package main

type DLNode struct {
    Value      int
    Prev, Next *DLNode
}

type DoublyLinkedList struct {
    Head, Tail *DLNode
}

func (dll *DoublyLinkedList) Append(val int) {
    node := &DLNode{Value: val}
    if dll.Tail == nil {
        dll.Head = node
        dll.Tail = node
        return
    }
    node.Prev = dll.Tail
    dll.Tail.Next = node
    dll.Tail = node
}

func (dll *DoublyLinkedList) Remove(node *DLNode) {
    if node.Prev != nil {
        node.Prev.Next = node.Next
    } else {
        dll.Head = node.Next
    }
    if node.Next != nil {
        node.Next.Prev = node.Prev
    } else {
        dll.Tail = node.Prev
    }
}`
    },
    {
      title: 'Stack (LIFO)',
      category: 'data-structure',
      complexity: 'Push O(1) / Pop O(1)',
      code: `package main

import "errors"

type Stack struct {
    items []int
}

func (s *Stack) Push(item int) {
    s.items = append(s.items, item)
}

func (s *Stack) Pop() (int, error) {
    if len(s.items) == 0 {
        return 0, errors.New("stack empty")
    }
    top := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return top, nil
}

func (s *Stack) Peek() (int, error) {
    if len(s.items) == 0 {
        return 0, errors.New("stack empty")
    }
    return s.items[len(s.items)-1], nil
}

func (s *Stack) IsEmpty() bool {
    return len(s.items) == 0
}`
    },
    {
      title: 'Queue (FIFO)',
      category: 'data-structure',
      complexity: 'Enqueue O(1) / Dequeue O(1)',
      code: `package main

import "errors"

type Queue struct {
    items []int
}

func (q *Queue) Enqueue(item int) {
    q.items = append(q.items, item)
}

func (q *Queue) Dequeue() (int, error) {
    if len(q.items) == 0 {
        return 0, errors.New("queue empty")
    }
    front := q.items[0]
    q.items = q.items[1:]
    return front, nil
}

func (q *Queue) Peek() (int, error) {
    if len(q.items) == 0 {
        return 0, errors.New("queue empty")
    }
    return q.items[0], nil
}

func (q *Queue) IsEmpty() bool {
    return len(q.items) == 0
}`
    },
    {
      title: 'Binary Search Tree',
      category: 'data-structure',
      complexity: 'O(log n) avg / O(n) worst',
      code: `package main

type BSTNode struct {
    Value       int
    Left, Right *BSTNode
}

func (n *BSTNode) Insert(val int) *BSTNode {
    if n == nil {
        return &BSTNode{Value: val}
    }
    if val < n.Value {
        n.Left = n.Left.Insert(val)
    } else if val > n.Value {
        n.Right = n.Right.Insert(val)
    }
    return n
}

func (n *BSTNode) Search(val int) bool {
    if n == nil { return false }
    if val == n.Value { return true }
    if val < n.Value {
        return n.Left.Search(val)
    }
    return n.Right.Search(val)
}

func (n *BSTNode) InOrder() []int {
    if n == nil { return nil }
    var res []int
    res = append(res, n.Left.InOrder()...)
    res = append(res, n.Value)
    res = append(res, n.Right.InOrder()...)
    return res
}`
    },
    {
      title: 'Hash Map',
      category: 'data-structure',
      complexity: 'O(1) avg / O(n) worst',
      code: `package main

const bucketCount = 256

type entry struct {
    key   string
    value int
}

type HashMap struct {
    buckets [bucketCount][]entry
}

func (h *HashMap) hash(key string) int {
    sum := 0
    for _, c := range key {
        sum += int(c)
    }
    return sum % bucketCount
}

func (h *HashMap) Set(key string, val int) {
    idx := h.hash(key)
    for i, e := range h.buckets[idx] {
        if e.key == key {
            h.buckets[idx][i].value = val
            return
        }
    }
    h.buckets[idx] = append(
        h.buckets[idx], entry{key, val},
    )
}

func (h *HashMap) Get(key string) (int, bool) {
    idx := h.hash(key)
    for _, e := range h.buckets[idx] {
        if e.key == key {
            return e.value, true
        }
    }
    return 0, false
}`
    },
    {
      title: 'Trie (Prefix Tree)',
      category: 'data-structure',
      complexity: 'O(m) per op / O(n·m)',
      code: `package main

type TrieNode struct {
    children map[rune]*TrieNode
    isEnd    bool
}

type Trie struct {
    root *TrieNode
}

func NewTrie() *Trie {
    return &Trie{
        root: &TrieNode{
            children: make(map[rune]*TrieNode),
        },
    }
}

func (t *Trie) Insert(word string) {
    node := t.root
    for _, ch := range word {
        if _, ok := node.children[ch]; !ok {
            node.children[ch] = &TrieNode{
                children: make(map[rune]*TrieNode),
            }
        }
        node = node.children[ch]
    }
    node.isEnd = true
}

func (t *Trie) Search(word string) bool {
    node := t.root
    for _, ch := range word {
        if _, ok := node.children[ch]; !ok {
            return false
        }
        node = node.children[ch]
    }
    return node.isEnd
}`
    },
    {
      title: 'Min Heap',
      category: 'data-structure',
      complexity: 'Insert O(log n) / Extract O(log n)',
      code: `package main

type MinHeap struct {
    data []int
}

func (h *MinHeap) Insert(val int) {
    h.data = append(h.data, val)
    h.bubbleUp(len(h.data) - 1)
}

func (h *MinHeap) ExtractMin() int {
    min := h.data[0]
    last := len(h.data) - 1
    h.data[0] = h.data[last]
    h.data = h.data[:last]
    if len(h.data) > 0 {
        h.sinkDown(0)
    }
    return min
}

func (h *MinHeap) bubbleUp(i int) {
    for i > 0 {
        parent := (i - 1) / 2
        if h.data[i] >= h.data[parent] {
            break
        }
        h.data[i], h.data[parent] =
            h.data[parent], h.data[i]
        i = parent
    }
}

func (h *MinHeap) sinkDown(i int) {
    n := len(h.data)
    for {
        smallest := i
        l, r := 2*i+1, 2*i+2
        if l < n && h.data[l] < h.data[smallest] {
            smallest = l
        }
        if r < n && h.data[r] < h.data[smallest] {
            smallest = r
        }
        if smallest == i { break }
        h.data[i], h.data[smallest] =
            h.data[smallest], h.data[i]
        i = smallest
    }
}`
    },

    // ─── GRAPH ALGORITHMS ───────────────────────────
    {
      title: 'DFS (Depth-First)',
      category: 'graph',
      complexity: 'O(V + E) / O(V)',
      code: `package main

func dfs(graph map[int][]int, start int) []int {
    visited := make(map[int]bool)
    var result []int

    var traverse func(node int)
    traverse = func(node int) {
        if visited[node] {
            return
        }
        visited[node] = true
        result = append(result, node)
        for _, neighbor := range graph[node] {
            traverse(neighbor)
        }
    }

    traverse(start)
    return result
}`
    },
    {
      title: 'BFS (Breadth-First)',
      category: 'graph',
      complexity: 'O(V + E) / O(V)',
      code: `package main

func bfs(graph map[int][]int, start int) []int {
    visited := map[int]bool{start: true}
    queue := []int{start}
    var result []int

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        result = append(result, node)

        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }
    return result
}`
    },
    {
      title: 'Dijkstra Algorithm',
      category: 'graph',
      complexity: 'O(V²) / O(V)',
      code: `package main

import "math"

func dijkstra(graph [][]int, src int) []int {
    n := len(graph)
    dist := make([]int, n)
    visited := make([]bool, n)
    for i := range dist {
        dist[i] = math.MaxInt32
    }
    dist[src] = 0

    for count := 0; count < n; count++ {
        u := minVertex(dist, visited)
        visited[u] = true
        for v := 0; v < n; v++ {
            if !visited[v] && graph[u][v] != 0 &&
                dist[u]+graph[u][v] < dist[v] {
                dist[v] = dist[u] + graph[u][v]
            }
        }
    }
    return dist
}

func minVertex(dist []int, vis []bool) int {
    min, idx := math.MaxInt32, 0
    for v, d := range dist {
        if !vis[v] && d < min {
            min = d; idx = v
        }
    }
    return idx
}`
    },
    {
      title: 'Bellman-Ford',
      category: 'graph',
      complexity: 'O(V·E) / O(V)',
      code: `package main

import "math"

type Edge struct {
    Src, Dst, Weight int
}

func bellmanFord(
    edges []Edge, V, src int,
) ([]int, bool) {
    dist := make([]int, V)
    for i := range dist {
        dist[i] = math.MaxInt32
    }
    dist[src] = 0

    for i := 0; i < V-1; i++ {
        for _, e := range edges {
            if dist[e.Src] != math.MaxInt32 &&
                dist[e.Src]+e.Weight < dist[e.Dst] {
                dist[e.Dst] = dist[e.Src] + e.Weight
            }
        }
    }
    // Detect negative cycle
    for _, e := range edges {
        if dist[e.Src] != math.MaxInt32 &&
            dist[e.Src]+e.Weight < dist[e.Dst] {
            return dist, true // negative cycle
        }
    }
    return dist, false
}`
    },
    {
      title: 'Topological Sort',
      category: 'graph',
      complexity: 'O(V + E) / O(V)',
      code: `package main

func topologicalSort(
    graph map[int][]int, V int,
) []int {
    visited := make(map[int]bool)
    var stack []int

    var dfs func(node int)
    dfs = func(node int) {
        visited[node] = true
        for _, neighbor := range graph[node] {
            if !visited[neighbor] {
                dfs(neighbor)
            }
        }
        stack = append(stack, node)
    }

    for v := 0; v < V; v++ {
        if !visited[v] {
            dfs(v)
        }
    }
    // Reverse the stack
    for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
        stack[i], stack[j] = stack[j], stack[i]
    }
    return stack
}`
    },
    {
      title: 'Floyd-Warshall',
      category: 'graph',
      complexity: 'O(V³) / O(V²)',
      code: `package main

import "math"

func floydWarshall(graph [][]int) [][]int {
    V := len(graph)
    dist := make([][]int, V)
    for i := range dist {
        dist[i] = make([]int, V)
        copy(dist[i], graph[i])
    }

    for k := 0; k < V; k++ {
        for i := 0; i < V; i++ {
            for j := 0; j < V; j++ {
                if dist[i][k] != math.MaxInt32 &&
                    dist[k][j] != math.MaxInt32 &&
                    dist[i][k]+dist[k][j] < dist[i][j] {
                    dist[i][j] = dist[i][k] + dist[k][j]
                }
            }
        }
    }
    return dist
}`
    },

    // ─── DYNAMIC PROGRAMMING ────────────────────────
    {
      title: 'Fibonacci (DP)',
      category: 'dynamic',
      complexity: 'O(n) / O(n)',
      code: `package main

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    dp := make([]int, n+1)
    dp[0], dp[1] = 0, 1
    for i := 2; i <= n; i++ {
        dp[i] = dp[i-1] + dp[i-2]
    }
    return dp[n]
}

// Space-optimized version
func fibOptimized(n int) int {
    if n <= 1 { return n }
    a, b := 0, 1
    for i := 2; i <= n; i++ {
        a, b = b, a+b
    }
    return b
}`
    },
    {
      title: 'Knapsack 0/1',
      category: 'dynamic',
      complexity: 'O(n·W) / O(n·W)',
      code: `package main

func knapsack(
    weights, values []int,
    capacity int,
) int {
    n := len(weights)
    dp := make([][]int, n+1)
    for i := range dp {
        dp[i] = make([]int, capacity+1)
    }

    for i := 1; i <= n; i++ {
        for w := 0; w <= capacity; w++ {
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w {
                val := dp[i-1][w-weights[i-1]] +
                    values[i-1]
                if val > dp[i][w] {
                    dp[i][w] = val
                }
            }
        }
    }
    return dp[n][capacity]
}`
    },
    {
      title: 'LCS (Longest Common Subseq)',
      category: 'dynamic',
      complexity: 'O(m·n) / O(m·n)',
      code: `package main

func lcs(a, b string) string {
    m, n := len(a), len(b)
    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if a[i-1] == b[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
            }
        }
    }

    // Backtrack to find the subsequence
    result := []byte{}
    i, j := m, n
    for i > 0 && j > 0 {
        if a[i-1] == b[j-1] {
            result = append([]byte{a[i-1]}, result...)
            i--; j--
        } else if dp[i-1][j] > dp[i][j-1] {
            i--
        } else {
            j--
        }
    }
    return string(result)
}`
    },
    {
      title: 'Coin Change',
      category: 'dynamic',
      complexity: 'O(n·amount) / O(amount)',
      code: `package main

import "math"

func coinChange(coins []int, amount int) int {
    dp := make([]int, amount+1)
    for i := range dp {
        dp[i] = math.MaxInt32
    }
    dp[0] = 0

    for i := 1; i <= amount; i++ {
        for _, coin := range coins {
            if coin <= i &&
                dp[i-coin] != math.MaxInt32 {
                val := dp[i-coin] + 1
                if val < dp[i] {
                    dp[i] = val
                }
            }
        }
    }

    if dp[amount] == math.MaxInt32 {
        return -1
    }
    return dp[amount]
}`
    },
  ],

  /* ═══════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════ */

  state: {
    filter: 'all',
    search: '',
  },

  /* ═══════════════════════════════════════════════════
     BOOT SEQUENCE — BIOS Boot Animation
     ═══════════════════════════════════════════════════ */

  bootMessages: [
    '[BOOT] Initializing GO_ALGO_TERMINAL v4.0...',
    '[SYS]  Loading kernel modules...',
    '[MEM]  Allocating goroutine pool: 2048 threads',
    '[NET]  Establishing uplink... AES-256 handshake',
    '[SYNC] Connecting to GOPHER_PROTOCOL_v1.22',
    '[DB]   Mounting algorithm database: 30 nodes',
    '[GPU]  Neon render pipeline: ONLINE',
    '[SEC]  Encryption layer: SHA-512 // STATUS: ACTIVE',
    '[SYS]  All systems nominal. Welcome, Netrunner.',
    '',
    '>> ACCESS GRANTED //',
  ],

  async runBootSequence() {
    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');

    for (const msg of this.bootMessages) {
      await this.delay(120 + Math.random() * 180);
      bootLog.textContent += msg + '\n';
    }

    await this.delay(600);
    bootScreen.classList.add('is-hidden');

    setTimeout(() => {
      bootScreen.style.display = 'none';
    }, 700);
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  /* ═══════════════════════════════════════════════════
     INITIALIZATION
     ═══════════════════════════════════════════════════ */

  init() {
    this.container = document.getElementById('algo-grid');
    this.searchInput = document.getElementById('search-input');
    this.filterButtons = document.querySelectorAll('.c-filter-btn');
    this.nodeCountEl = document.getElementById('node-count');
    this.activeFilterEl = document.getElementById('active-filter');

    this.bindEvents();
    this.render();
    this.initHUD();
    this.runBootSequence();
    this.consoleEasterEgg();
  },

  /* ═══════════════════════════════════════════════════
     EVENT BINDING — Event Delegation
     ═══════════════════════════════════════════════════ */

  bindEvents() {
    // Search input
    this.searchInput.addEventListener('input', (e) => {
      this.state.search = e.target.value.toLowerCase();
      this.render();
    });

    // Filter buttons — event delegation on parent
    document.getElementById('filter-buttons').addEventListener('click', (e) => {
      const btn = e.target.closest('.c-filter-btn');
      if (!btn) return;

      this.filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      this.state.filter = btn.dataset.filter;
      this.render();
    });
  },

  /* ═══════════════════════════════════════════════════
     MOUSE HUD — X/Y Coordinate Display
     ═══════════════════════════════════════════════════ */

  initHUD() {
    const hudX = document.getElementById('hud-x');
    const hudY = document.getElementById('hud-y');

    document.addEventListener('mousemove', (e) => {
      hudX.textContent = String(e.clientX).padStart(4, '0');
      hudY.textContent = String(e.clientY).padStart(4, '0');
    });
  },

  /* ═══════════════════════════════════════════════════
     FILTERING LOGIC
     ═══════════════════════════════════════════════════ */

  getFilteredData() {
    return this.data.filter(item => {
      const matchesFilter = this.state.filter === 'all' || item.category === this.state.filter;
      const matchesSearch = this.state.search === '' ||
        item.title.toLowerCase().includes(this.state.search) ||
        item.category.toLowerCase().includes(this.state.search);
      return matchesFilter && matchesSearch;
    });
  },

  /* ═══════════════════════════════════════════════════
     RENDER ENGINE — DocumentFragment Batch DOM Update
     ═══════════════════════════════════════════════════ */

  render() {
    const filtered = this.getFilteredData();
    const fragment = document.createDocumentFragment();

    if (filtered.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'c-empty';
      empty.innerHTML = `NO_NODES_FOUND<span class="c-empty__sub">// Adjust search parameters or reset filters</span>`;
      fragment.appendChild(empty);
    } else {
      filtered.forEach((item, i) => {
        const globalIndex = this.data.indexOf(item) + 1;
        const card = this.createCard(item, globalIndex);
        card.style.animationDelay = `${i * 0.04}s`;
        fragment.appendChild(card);
      });
    }

    this.container.innerHTML = '';
    this.container.appendChild(fragment);

    // Update stats
    this.nodeCountEl.textContent = `NODES: ${String(filtered.length).padStart(3, '0')}`;
    this.activeFilterEl.textContent = `FILTER: ${this.state.filter.toUpperCase()}`;
  },

  /* ═══════════════════════════════════════════════════
     CARD FACTORY — createElement Pattern (XSS-safe)
     ═══════════════════════════════════════════════════ */

  createCard(item, index) {
    const card = document.createElement('article');
    card.className = 'c-algo-card';
    card.dataset.serial = `SN:GO-${index.toString().padStart(3, '0')}`;

    // ── Header ──
    const header = document.createElement('div');
    header.className = 'c-algo-card__header';

    const title = document.createElement('h2');
    title.className = 'c-algo-card__title';
    title.textContent = item.title;

    const id = document.createElement('span');
    id.className = 'c-algo-card__id';
    id.textContent = `GO-ALGO-${index.toString().padStart(3, '0')}`;

    header.append(title, id);

    // ── Meta Row ──
    const meta = document.createElement('div');
    meta.className = 'c-algo-card__meta';

    const category = document.createElement('span');
    category.className = `c-algo-card__category c-algo-card__category--${item.category}`;
    category.textContent = item.category.replace('-', '_').toUpperCase();

    const complexity = document.createElement('span');
    complexity.className = 'c-algo-card__complexity';
    complexity.textContent = item.complexity;

    const status = document.createElement('div');
    status.className = 'c-algo-card__status';
    const dot = document.createElement('span');
    dot.className = 'c-algo-card__status-dot';
    const statusText = document.createElement('span');
    statusText.textContent = 'COMPILED';
    status.append(dot, statusText);

    meta.append(category, complexity, status);

    // ── Code Block ──
    const pre = document.createElement('pre');
    pre.className = 'c-code-block';
    const code = document.createElement('code');
    code.textContent = item.code;
    pre.appendChild(code);

    card.append(header, meta, pre);
    return card;
  },

  /* ═══════════════════════════════════════════════════
     CONSOLE EASTER EGG
     ═══════════════════════════════════════════════════ */

  consoleEasterEgg() {
    console.log(
      '%c ╔══════════════════════════════════════╗\n' +
      ' ║   GO_ALGO_TERMINAL v4.0              ║\n' +
      ' ║   ACCESS: ROOT // CLEARANCE: OMEGA   ║\n' +
      ' ║   "The Gopher sees all."             ║\n' +
      ' ╚══════════════════════════════════════╝',
      'color: #00f3ff; font-family: monospace; font-size: 12px; text-shadow: 0 0 5px #00f3ff;'
    );
  }
};

/* ═══════════════════════════════════════════════════
   BOOTSTRAP — DOMContentLoaded
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => GoAlgorithms.init());
