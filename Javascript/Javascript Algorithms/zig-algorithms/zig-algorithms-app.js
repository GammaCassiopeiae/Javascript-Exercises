/* ⚡ ZIG ALGORITHM ENGINE v4.0 // CLEAN RENDER MODE */

const Algorithms = {
  data: [
    {
      title: 'Bubble Sort',
      code: `fn bubbleSort(arr: []i32) void {
    const n = arr.len;
    var i: usize = 0;
    while (i < n) : (i += 1) {
        var j: usize = 0;
        while (j < n - i - 1) : (j += 1) {
            if (arr[j] > arr[j + 1]) {
                std.mem.swap(i32, &arr[j], &arr[j + 1]);
            }
        }
    }
}`
    },
    {
      title: 'Quick Sort',
      code: `fn quickSort(arr: []i32) void {
    if (arr.len <= 1) return;

    const pivot_idx = partition(arr);
    quickSort(arr[0..pivot_idx]);
    quickSort(arr[pivot_idx + 1 ..]);
}

fn partition(arr: []i32) usize {
    const len = arr.len;
    const pivot = len - 1;
    var i: usize = 0;

    var j: usize = 0;
    while (j < len - 1) : (j += 1) {
        if (arr[j] < arr[pivot]) {
            std.mem.swap(i32, &arr[i], &arr[j]);
            i += 1;
        }
    }
    std.mem.swap(i32, &arr[i], &arr[len - 1]);
    return i;
}`
    },
    {
      title: 'Binary Search',
      code: `fn binarySearch(arr: []const i32, target: i32) ?usize {
    var low: i64 = 0;
    var high: i64 = @as(i64, @intCast(arr.len)) - 1;

    while (low <= high) {
        const mid: usize = @intCast(@divTrunc(low + high, 2));
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = @as(i64, @intCast(mid)) + 1;
        } else {
            high = @as(i64, @intCast(mid)) - 1;
        }
    }
    return null;
}`
    },
    {
      title: 'Linked List Node',
      code: `const std = @import("std");

fn ListNode(comptime T: type) type {
    return struct {
        value: T,
        next: ?*Node,

        const Node = @This();

        fn init(value: T) Node {
            return Node{
                .value = value,
                .next = null,
            };
        }
    };
}`
    },
    {
      title: 'Stack (LIFO)',
      code: `fn Stack(comptime T: type) type {
    return struct {
        items: std.ArrayList(T),

        const Self = @This();

        fn init(allocator: std.mem.Allocator) Self {
            return Self{
                .items = std.ArrayList(T).init(allocator),
            };
        }

        fn push(self: *Self, item: T) !void {
            try self.items.append(item);
        }

        fn pop(self: *Self) ?T {
            return self.items.pop();
        }

        fn peek(self: *Self) ?T {
            const items = self.items.items;
            if (items.len == 0) return null;
            return items[items.len - 1];
        }
    };
}`
    },
    {
      title: 'Merge Sort',
      code: `fn mergeSort(arr: []i32, allocator: std.mem.Allocator) !void {
    const len = arr.len;
    if (len <= 1) return;

    const mid = len / 2;
    var left = try allocator.alloc(i32, mid);
    defer allocator.free(left);
    var right = try allocator.alloc(i32, len - mid);
    defer allocator.free(right);

    @memcpy(left, arr[0..mid]);
    @memcpy(right, arr[mid..]);

    try mergeSort(left, allocator);
    try mergeSort(right, allocator);
    merge(arr, left, right);
}

fn merge(arr: []i32, left: []const i32, right: []const i32) void {
    var i: usize = 0;
    var j: usize = 0;
    var k: usize = 0;

    while (i < left.len and j < right.len) : (k += 1) {
        if (left[i] <= right[j]) {
            arr[k] = left[i];
            i += 1;
        } else {
            arr[k] = right[j];
            j += 1;
        }
    }

    while (i < left.len) : ({ k += 1; i += 1; }) {
        arr[k] = left[i];
    }

    while (j < right.len) : ({ k += 1; j += 1; }) {
        arr[k] = right[j];
    }
}`
    },
    {
      title: 'Fibonacci (DP)',
      code: `fn fibonacci(n: usize) u64 {
    if (n == 0) return 0;
    if (n == 1) return 1;

    var dp: [100]u64 = undefined;
    dp[0] = 0;
    dp[1] = 1;

    var i: usize = 2;
    while (i <= n) : (i += 1) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}`
    },
    {
      title: 'Dijkstra Algorithm',
      code: `const std = @import("std");
const Edge = struct { to: usize, weight: i32 };

fn dijkstra(
    graph: []const std.ArrayList(Edge),
    start: usize,
    allocator: std.mem.Allocator,
) ![]i32 {
    const n = graph.len;
    var dist = try allocator.alloc(i32, n);
    var visited = try allocator.alloc(bool, n);

    var i: usize = 0;
    while (i < n) : (i += 1) {
        dist[i] = std.math.maxInt(i32);
        visited[i] = false;
    }
    dist[start] = 0;

    var changed = true;
    while (changed) {
        changed = false;
        var u: usize = 0;
        while (u < n) : (u += 1) {
            if (visited[u]) continue;
            for (graph[u].items) |edge| {
                const new_dist = dist[u] + edge.weight;
                if (new_dist < dist[edge.to]) {
                    dist[edge.to] = new_dist;
                    changed = true;
                }
            }
            visited[u] = true;
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
