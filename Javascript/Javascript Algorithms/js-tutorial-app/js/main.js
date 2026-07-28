/**
 * JavaScript Tutorial App - Main Script
 * Following Neon-Noir Architect Manifesto (JS-01 to JS-20)
 * DOM API Implementation for Interactive Learning
 */

(function() {
  'use strict';

  // ====================
  // CODE EXAMPLES DATA
  // Extracted from JavaScript Tutorial
  // ====================
  const codeExamples = {
    basics: [
      {
        title: 'Hello World',
        badge: 'Basic',
        code: `<script type="text/javascript">
  document.write("Hello World!")
<\/script>`
      },
      {
        title: 'Function Definition',
        badge: 'Function',
        code: `<script type="text/javascript">
  function sayHello() {
    alert("Hello World")
  }
<\/script>`
      },
      {
        title: 'External Script',
        badge: 'External',
        code: `// Include in HTML:
<script src="script.js"><\/script>

// script.js content:
function sayHello() {
  alert("Hello World")
}`
      },
      {
        title: 'Document Write',
        badge: 'DOM',
        code: `<script type="text/javascript">
  document.write("Hello World")
<\/script>`
      }
    ],

    variables: [
      {
        title: 'Variable Declaration',
        badge: 'var',
        code: `// Declaring variables
var money;
var name;

// Multiple variables
var money, name;

// With initialization
var name = "Ali";
var money;`
      },
      {
        title: 'Variable Scope',
        badge: 'Scope',
        code: `// Global variable
var myVar = "global";

function checkscope() {
  // Local variable
  var myVar = "local";
  document.write(myVar); // Outputs: local
}

checkscope();
document.write(myVar); // Outputs: global`
      },
      {
        title: 'Data Types',
        badge: 'Types',
        code: `// Number
var age = 25;
var price = 19.99;

// String
var name = "John";
var message = 'Hello';

// Boolean
var isActive = true;
var isComplete = false;

// Undefined
var notDefined;

// Null
var empty = null;`
      },
      {
        title: 'Typeof Operator',
        badge: 'Operator',
        code: `var num = 42;
var str = "Hello";
var bool = true;
var obj = {};
var arr = [];

console.log(typeof num);    // "number"
console.log(typeof str);    // "string"
console.log(typeof bool);   // "boolean"
console.log(typeof obj);    // "object"
console.log(typeof arr);    // "object"`
      }
    ],

    operators: [
      {
        title: 'Arithmetic Operators',
        badge: 'Math',
        code: `var a = 33;
var b = 10;

document.write("a + b = " + (a + b)); // 43
document.write("<br />");
document.write("a - b = " + (a - b)); // 23
document.write("<br />");
document.write("a / b = " + (a / b)); // 3.3
document.write("<br />");
document.write("a % b = " + (a % b)); // 3
document.write("<br />");
document.write("a * b = " + (a * b)); // 330`
      },
      {
        title: 'Comparison Operators',
        badge: 'Compare',
        code: `var a = 10;
var b = "10";

// Equal to
document.write(a == b);  // true (value)

// Strict equal
document.write(a === b); // false (type differs)

// Not equal
document.write(a != b);  // false

// Strict not equal
document.write(a !== b); // true

// Greater than
document.write(a > 5);   // true

// Less than or equal
document.write(a <= 10); // true`
      },
      {
        title: 'Logical Operators',
        badge: 'Logic',
        code: `var a = true;
var b = false;

// AND (&&)
document.write(a && b); // false

// OR (||)
document.write(a || b); // true

// NOT (!)
document.write(!a);     // false
document.write(!b);     // true

// Short-circuit evaluation
var result = a && "Success"; // "Success"
var fallback = b || "Default"; // "Default"`
      },
      {
        title: 'Assignment Operators',
        badge: 'Assign',
        code: `var x = 10;

// Add and assign
x += 5;  // x = x + 5 = 15

// Subtract and assign
x -= 3;  // x = x - 3 = 12

// Multiply and assign
x *= 2;  // x = x * 2 = 24

// Divide and assign
x /= 4;  // x = x / 4 = 6

// Modulus and assign
x %= 4;  // x = x % 4 = 2`
      }
    ],

    control: [
      {
        title: 'If-Else Statement',
        badge: 'Condition',
        code: `var age = 18;

if (age >= 18) {
  document.write("You are an adult.");
} else {
  document.write("You are a minor.");
}

// Multiple conditions
var score = 85;

if (score >= 90) {
  document.write("Grade: A");
} else if (score >= 80) {
  document.write("Grade: B");
} else if (score >= 70) {
  document.write("Grade: C");
} else {
  document.write("Grade: F");
}`
      },
      {
        title: 'Switch Statement',
        badge: 'Switch',
        code: `var day = "Monday";

switch (day) {
  case "Monday":
    document.write("Start of week");
    break;
  case "Friday":
    document.write("End of work week");
    break;
  case "Saturday":
  case "Sunday":
    document.write("Weekend!");
    break;
  default:
    document.write("Midweek day");
}`
      },
      {
        title: 'While Loop',
        badge: 'Loop',
        code: `var count = 1;

while (count <= 5) {
  document.write("Count: " + count + "<br />");
  count++;
}

// Do-While Loop
var i = 1;
do {
  document.write("i = " + i + "<br />");
  i++;
} while (i <= 5);`
      },
      {
        title: 'For Loop',
        badge: 'For',
        code: `// Standard for loop
for (var i = 0; i < 5; i++) {
  document.write("Iteration: " + i + "<br />");
}

// For-in loop (objects)
var person = {
  name: "John",
  age: 30,
  city: "NYC"
};

for (var key in person) {
  document.write(key + ": " + person[key] + "<br />");
}`
      },
      {
        title: 'Break and Continue',
        badge: 'Control',
        code: `// Break example
for (var i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Exit loop when i is 5
  }
  document.write(i + " ");
}
// Output: 0 1 2 3 4

// Continue example
for (var j = 0; j < 5; j++) {
  if (j === 2) {
    continue; // Skip iteration when j is 2
  }
  document.write(j + " ");
}
// Output: 0 1 3 4`
      }
    ],

    functions: [
      {
        title: 'Function Definition',
        badge: 'Function',
        code: `// Function declaration
function sayHello() {
  alert("Hello World");
}

// Call the function
sayHello();

// Function with parameters
function greet(name) {
  document.write("Hello, " + name + "!");
}

greet("Alice"); // Hello, Alice!`
      },
      {
        title: 'Function with Return',
        badge: 'Return',
        code: `// Function with return value
function add(a, b) {
  return a + b;
}

var result = add(5, 3);
document.write("Sum: " + result); // Sum: 8

// Multiple parameters
function calculateArea(width, height) {
  return width * height;
}

var area = calculateArea(10, 5);
document.write("Area: " + area); // Area: 50`
      },
      {
        title: 'Nested Functions',
        badge: 'Nested',
        code: `function outerFunction() {
  var outerVar = "I'm outside";
  
  function innerFunction() {
    var innerVar = "I'm inside";
    document.write(outerVar); // Accessible
    document.write(innerVar); // Accessible
  }
  
  innerFunction();
  // document.write(innerVar); // Error: not accessible
}

outerFunction();`
      },
      {
        title: 'Function Constructor',
        badge: 'Constructor',
        code: `// Using Function constructor
var multiply = new Function('a', 'b', 'return a * b');

document.write(multiply(5, 4)); // 20

// Function literal (expression)
var greet = function(name) {
  return "Hello, " + name;
};

document.write(greet("Bob")); // Hello, Bob`
      },
      {
        title: 'Anonymous Function',
        badge: 'Callback',
        code: `// Anonymous function as callback
var numbers = [1, 2, 3, 4, 5];

numbers.forEach(function(num) {
  document.write(num * 2 + " ");
});
// Output: 2 4 6 8 10

// Self-invoking function
(function() {
  var private = "I'm private";
  document.write(private);
})();`
      }
    ],

    events: [
      {
        title: 'onclick Event',
        badge: 'Click',
        code: `// HTML: <button onclick="handleClick()">Click Me</button>

function handleClick() {
  alert("Button was clicked!");
}

// AddEventListener approach
var button = document.getElementById("myBtn");
button.addEventListener("click", function() {
  alert("Button clicked via addEventListener!");
});`
      },
      {
        title: 'onmouseover Event',
        badge: 'Mouse',
        code: `// HTML: <div id="myDiv">Hover over me</div>

var myDiv = document.getElementById("myDiv");

myDiv.addEventListener("mouseover", function() {
  this.style.backgroundColor = "#39ff14";
  this.style.color = "#000";
});

myDiv.addEventListener("mouseout", function() {
  this.style.backgroundColor = "";
  this.style.color = "";
});`
      },
      {
        title: 'onsubmit Event',
        badge: 'Form',
        code: `// HTML: <form id="myForm">...</form>

var form = document.getElementById("myForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  
  var formData = new FormData(form);
  alert("Form submitted!");
  
  // Process form data
  for (var [key, value] of formData.entries()) {
    console.log(key, value);
  }
});`
      },
      {
        title: 'Event Object',
        badge: 'Event',
        code: `var button = document.getElementById("myBtn");

button.addEventListener("click", function(event) {
  // Event properties
  console.log("Event type:", event.type);
  console.log("Target:", event.target);
  console.log("Current Target:", event.currentTarget);
  console.log("Client X:", event.clientX);
  console.log("Client Y:", event.clientY);
  
  // Prevent default behavior
  event.preventDefault();
  
  // Stop propagation
  event.stopPropagation();
});`
      },
      {
        title: 'Keyboard Events',
        badge: 'Keyboard',
        code: `var input = document.getElementById("myInput");

input.addEventListener("keydown", function(event) {
  console.log("Key pressed:", event.key);
  console.log("Key code:", event.keyCode);
  
  if (event.key === "Enter") {
    alert("Enter key pressed!");
  }
});

input.addEventListener("keyup", function(event) {
  console.log("Key released:", event.key);
});

input.addEventListener("keypress", function(event) {
  console.log("Character:", event.char);
});`
      }
    ],

    dom: [
      {
        title: 'getElementById',
        badge: 'Select',
        code: `// Get element by ID
var element = document.getElementById("myElement");

// Change content
element.innerHTML = "New Content";
element.textContent = "Plain Text";

// Change style
element.style.color = "#39ff14";
element.style.fontSize = "20px";

// Change attributes
element.setAttribute("class", "new-class");
element.setAttribute("title", "New Title");`
      },
      {
        title: 'querySelector',
        badge: 'Select',
        code: `// Query selector (first match)
var first = document.querySelector(".myClass");
var byId = document.querySelector("#myId");

// Query selector all (all matches)
var all = document.querySelectorAll(".myClass");

// Loop through NodeList
all.forEach(function(element) {
  element.style.color = "#bd00ff";
});

// Complex selectors
var items = document.querySelectorAll("ul li:nth-child(odd)");`
      },
      {
        title: 'Create Element',
        badge: 'Create',
        code: `// Create new element
var newDiv = document.createElement("div");

// Set content
newDiv.textContent = "I'm a new div!";

// Set class
newDiv.className = "c-code-container";

// Set ID
newDiv.id = "dynamicElement";

// Append to DOM
document.body.appendChild(newDiv);

// Create with DocumentFragment
var fragment = document.createDocumentFragment();
for (var i = 0; i < 3; i++) {
  var li = document.createElement("li");
  li.textContent = "Item " + i;
  fragment.appendChild(li);
}
document.querySelector("ul").appendChild(fragment);`
      },
      {
        title: 'Modify Elements',
        badge: 'Modify',
        code: `var element = document.getElementById("myElement");

// Change HTML content
element.innerHTML = "<strong>Bold</strong> text";

// Add class
element.classList.add("active");

// Remove class
element.classList.remove("inactive");

// Toggle class
element.classList.toggle("hidden");

// Check class
if (element.classList.contains("active")) {
  console.log("Element is active");
}`
      },
      {
        title: 'Remove Elements',
        badge: 'Remove',
        code: `var element = document.getElementById("toRemove");

// Modern approach
element.remove();

// Traditional approach
element.parentNode.removeChild(element);

// Remove all children
var parent = document.getElementById("parent");
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}

// Or using innerHTML
parent.innerHTML = "";`
      },
      {
        title: 'Traverse DOM',
        badge: 'Traverse',
        code: `var element = document.getElementById("start");

// Parent node
var parent = element.parentNode;

// Child nodes
var children = element.children;
var firstChild = element.firstChild;
var lastChild = element.lastChild;

// Siblings
var next = element.nextSibling;
var prev = element.previousSibling;

// Element siblings (skip text nodes)
var nextElem = element.nextElementSibling;
var prevElem = element.previousElementSibling;`
      }
    ],

    objects: [
      {
        title: 'Object Literal',
        badge: 'Object',
        code: `// Create object
var person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  isEmployed: true,
  
  // Method
  greet: function() {
    return "Hello, I'm " + this.firstName;
  }
};

// Access properties
document.write(person.firstName); // John
document.write(person["lastName"]); // Doe

// Call method
document.write(person.greet()); // Hello, I'm John`
      },
      {
        title: 'Object Methods',
        badge: 'Methods',
        code: `var car = {
  brand: "Toyota",
  model: "Camry",
  year: 2020,
  
  // Method shorthand
  start() {
    return "Engine started";
  },
  
  // Getter
  get info() {
    return this.brand + " " + this.model;
  },
  
  // Setter
  set year(value) {
    if (value >= 1900) {
      this._year = value;
    }
  }
};

document.write(car.info); // Toyota Camry
document.write(car.start()); // Engine started`
      },
      {
        title: 'Array Methods',
        badge: 'Array',
        code: `var numbers = [1, 2, 3, 4, 5];

// Push - add to end
numbers.push(6);

// Pop - remove from end
var last = numbers.pop();

// Map - transform
var doubled = numbers.map(function(n) {
  return n * 2;
});

// Filter - select
var evens = numbers.filter(function(n) {
  return n % 2 === 0;
});

// Reduce - accumulate
var sum = numbers.reduce(function(acc, n) {
  return acc + n;
}, 0);

document.write("Sum: " + sum);`
      },
      {
        title: 'Array Operations',
        badge: 'Array',
        code: `var fruits = ["Apple", "Banana", "Orange"];

// Length
document.write(fruits.length); // 3

// Access
document.write(fruits[0]); // Apple

// Join
var joined = fruits.join(", ");

// Slice
var subset = fruits.slice(1, 3);

// Splice - modify array
fruits.splice(1, 0, "Mango"); // Insert

// Sort
fruits.sort();

// Reverse
fruits.reverse();

// IndexOf
var index = fruits.indexOf("Banana");`
      },
      {
        title: 'Date Object',
        badge: 'Date',
        code: `// Current date
var now = new Date();

// Specific date
var birthday = new Date(1990, 5, 15);

// Get components
document.write(now.getFullYear());
document.write(now.getMonth()); // 0-11
document.write(now.getDate());  // Day of month
document.write(now.getDay());   // Day of week (0-6)
document.write(now.getHours());
document.write(now.getMinutes());
document.write(now.getSeconds());

// Format
document.write(now.toDateString());
document.write(now.toLocaleString());`
      },
      {
        title: 'Math Object',
        badge: 'Math',
        code: `// Constants
document.write(Math.PI);      // 3.14159...
document.write(Math.E);       // 2.718...

// Rounding
document.write(Math.round(4.7));  // 5
document.write(Math.floor(4.7));  // 4
document.write(Math.ceil(4.2));   // 5

// Power and root
document.write(Math.pow(2, 3));   // 8
document.write(Math.sqrt(16));    // 4

// Random
var random = Math.random();       // 0 to 1
var randomInt = Math.floor(Math.random() * 100); // 0-99

// Min/Max
document.write(Math.max(1, 5, 3)); // 5
document.write(Math.min(1, 5, 3)); // 1`
      }
    ],

    advanced: [
      {
        title: 'Try-Catch',
        badge: 'Error',
        code: `try {
  // Code that might throw error
  var result = riskyOperation();
  document.write("Success: " + result);
} catch (error) {
  // Handle error
  document.write("Error: " + error.message);
} finally {
  // Always executes
  document.write("Cleanup complete");
}

// Throw custom error
function validateAge(age) {
  if (age < 0) {
    throw new Error("Age cannot be negative");
  }
}`
      },
      {
        title: 'Regular Expressions',
        badge: 'RegExp',
        code: `// Create regex
var pattern = /hello/i;  // i = case insensitive

// Test
var result = pattern.test("Hello World"); // true

// Exec
var match = pattern.exec("Hello World");
document.write(match[0]); // "Hello"

// String methods
var text = "Hello World";
document.write(text.match(/o/g));  // ["o", "o"]
document.write(text.replace(/World/, "JS")); // "Hello JS"
document.write(text.search(/World/)); // 6`
      },
      {
        title: 'JSON',
        badge: 'JSON',
        code: `// JSON object
var data = {
  name: "John",
  age: 30,
  city: "NYC"
};

// Stringify (object to string)
var jsonString = JSON.stringify(data);
document.write(jsonString);
// {"name":"John","age":30,"city":"NYC"}

// Parse (string to object)
var parsed = JSON.parse(jsonString);
document.write(parsed.name); // John

// From server response
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data));`
      },
      {
        title: 'Local Storage',
        badge: 'Storage',
        code: `// Set item
localStorage.setItem("username", "John");
localStorage.setItem("age", "30");

// Get item
var name = localStorage.getItem("username");
document.write(name); // John

// Remove item
localStorage.removeItem("age");

// Clear all
// localStorage.clear();

// Store object
var user = { name: "Jane", age: 25 };
localStorage.setItem("user", JSON.stringify(user));

// Retrieve object
var storedUser = JSON.parse(localStorage.getItem("user"));`
      },
      {
        title: 'Fetch API',
        badge: 'Async',
        code: `// Basic fetch
fetch('https://api.example.com/data')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(error) {
    console.error('Error:', error);
  });

// Async/Await
async function getData() {
  try {
    var response = await fetch('/api/data');
    var data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}`
      }
    ]
  };

  // ====================
  // SYNTAX HIGHLIGHTING - Simple and Safe
  // ====================
  function highlightSyntax(code) {
    // First escape all HTML to prevent XSS and display issues
    var escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Highlight keywords with simple word boundaries
    var keywords = ['var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'new', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'in', 'of', 'void', 'delete', 'this', 'true', 'false', 'null', 'undefined', 'async', 'await'];
    
    keywords.forEach(function(keyword) {
      var regex = new RegExp('\\b' + keyword + '\\b', 'g');
      escaped = escaped.replace(regex, '<span class="keyword">' + keyword + '</span>');
    });

    return escaped;
  }

  // ====================
  // CREATE CODE CONTAINER
  // ====================
  function createCodeContainer(example) {
    var container = document.createElement('div');
    container.className = 'c-code-container';

    var header = document.createElement('div');
    header.className = 'c-code-container__header';

    var title = document.createElement('span');
    title.className = 'c-code-container__title';
    title.textContent = example.title;

    var badge = document.createElement('span');
    badge.className = 'c-code-container__badge';
    badge.textContent = example.badge;

    header.appendChild(title);
    header.appendChild(badge);

    var content = document.createElement('div');
    content.className = 'c-code-container__content';

    var codeBlock = document.createElement('pre');
    codeBlock.className = 'c-code-block';
    codeBlock.innerHTML = highlightSyntax(example.code);

    content.appendChild(codeBlock);
    container.appendChild(header);
    container.appendChild(content);

    return container;
  }

  // ====================
  // POPULATE CODE SECTIONS
  // ====================
  function populateCodeSections() {
    var sections = {
      basics: 'basics-codes',
      variables: 'variables-codes',
      operators: 'operators-codes',
      control: 'control-codes',
      functions: 'functions-codes',
      events: 'events-codes',
      dom: 'dom-codes',
      objects: 'objects-codes',
      advanced: 'advanced-codes'
    };

    for (var section in sections) {
      if (codeExamples[section]) {
        var container = document.getElementById(sections[section]);
        if (container) {
          // Use DocumentFragment for performance (JS-02)
          var fragment = document.createDocumentFragment();
          
          codeExamples[section].forEach(function(example) {
            fragment.appendChild(createCodeContainer(example));
          });
          
          container.appendChild(fragment);
        }
      }
    }
  }

  // ====================
  // POPULATE TABLE OF CONTENTS
  // ====================
  function populateTOC() {
    var tocList = document.getElementById('toc-list');
    if (!tocList) return;

    var tocItems = [
      { id: 'welcome', label: 'Welcome' },
      { id: 'basics', label: 'JavaScript Basics' },
      { id: 'variables', label: 'Variables & Datatypes' },
      { id: 'operators', label: 'Operators' },
      { id: 'control', label: 'Control Structures' },
      { id: 'functions', label: 'Functions' },
      { id: 'events', label: 'Events' },
      { id: 'dom', label: 'DOM Manipulation' },
      { id: 'objects', label: 'Objects & Arrays' },
      { id: 'advanced', label: 'Advanced Topics' }
    ];

    var fragment = document.createDocumentFragment();

    tocItems.forEach(function(item) {
      var li = document.createElement('li');
      li.className = 'c-toc__item';

      var link = document.createElement('a');
      link.className = 'c-toc__link';
      link.href = '#' + item.id;
      link.textContent = item.label;
      link.dataset.target = item.id;

      li.appendChild(link);
      fragment.appendChild(li);
    });

    tocList.appendChild(fragment);
  }

  // ====================
  // NAVIGATION TOGGLE
  // ====================
  function initNavToggle() {
    var toggle = document.querySelector('.js-nav-toggle');
    var navList = document.querySelector('.c-nav__list');

    if (toggle && navList) {
      toggle.addEventListener('click', function() {
        navList.classList.toggle('is-open');
        
        // Animate toggle bars
        var bars = toggle.querySelectorAll('.c-nav__toggle-bar');
        if (navList.classList.contains('is-open')) {
          bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          bars[0].style.transform = '';
          bars[1].style.opacity = '';
          bars[2].style.transform = '';
        }
      });
    }
  }

  // ====================
  // ACTIVE SECTION HIGHLIGHTING
  // ====================
  function initScrollSpy() {
    var sections = document.querySelectorAll('.c-section');
    var tocLinks = document.querySelectorAll('.c-toc__link');

    if (!sections.length || !tocLinks.length) return;

    var observerOptions = {
      root: null,
      rootMargin: '-100px 0px -60% 0px',
      threshold: 0
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          
          tocLinks.forEach(function(link) {
            link.classList.remove('is-active');
            if (link.dataset.target === id) {
              link.classList.add('is-active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function(section) {
      observer.observe(section);
    });
  }

  // ====================
  // DOM INTERACTIVE DEMO
  // ====================
  function initDomInteractive() {
    var changeTextBtn = document.getElementById('changeTextBtn');
    var addElementBtn = document.getElementById('addElementBtn');
    var toggleClassBtn = document.getElementById('toggleClassBtn');
    var output = document.getElementById('dom-output');
    var demoText = document.getElementById('demo-text');

    if (changeTextBtn && demoText) {
      changeTextBtn.addEventListener('click', function() {
        // JS-03: classList API
        demoText.classList.add('is-active');
        demoText.textContent = '✨ Text changed via DOM API!';
        demoText.style.color = 'var(--neon-violet)';
        demoText.style.textShadow = '0 0 10px var(--neon-violet)';
        
        setTimeout(function() {
          demoText.classList.remove('is-active');
        }, 300);
      });
    }

    if (addElementBtn && output) {
      var count = 0;
      addElementBtn.addEventListener('click', function() {
        count++;
        
        // JS-01: DOM Creation
        var newElement = document.createElement('p');
        newElement.textContent = '🔹 Dynamic element #' + count;
        newElement.style.color = 'var(--neon-lime)';
        newElement.style.fontFamily = 'var(--font-mono)';
        newElement.style.marginTop = 'var(--space-xs)';
        
        // Animation using Web Animations API (JS-20)
        newElement.animate([
          { opacity: 0, transform: 'translateX(-20px)' },
          { opacity: 1, transform: 'translateX(0)' }
        ], {
          duration: 300,
          easing: 'var(--ease-out)'
        });
        
        output.appendChild(newElement);
      });
    }

    if (toggleClassBtn && output) {
      toggleClassBtn.addEventListener('click', function() {
        output.classList.toggle('is-loading');
        
        if (output.classList.contains('is-loading')) {
          output.style.opacity = '0.5';
          output.innerHTML = '<p>⏳ Loading state...</p>';
        } else {
          output.style.opacity = '1';
          output.innerHTML = '<p id="demo-text">Click buttons to see DOM manipulation in action!</p>';
          demoText = document.getElementById('demo-text');
        }
      });
    }
  }

  // ====================
  // SMOOTH SCROLL FOR ANCHOR LINKS (JS-14)
  // ====================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          // JS-14: Smooth scroll
          target.scrollIntoView({ behavior: 'smooth' });
          
          // Close mobile nav if open
          var navList = document.querySelector('.c-nav__list');
          if (navList && navList.classList.contains('is-open')) {
            navList.classList.remove('is-open');
          }
        }
      });
    });
  }

  // ====================
  // LOCAL STORAGE FOR THEME PREFERENCE (JS-16)
  // ====================
  function initThemePreference() {
    // Check for saved theme preference
    var savedTheme = localStorage.getItem('neon-theme');
    
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Save theme on change (for future theme toggle feature)
    window.addEventListener('storage', function(e) {
      if (e.key === 'neon-theme') {
        document.documentElement.setAttribute('data-theme', e.newValue);
      }
    });
  }

  // ====================
  // KEYBOARD NAVIGATION
  // ====================
  function initKeyboardNav() {
    document.addEventListener('keydown', function(event) {
      // Escape key to close mobile nav
      if (event.key === 'Escape') {
        var navList = document.querySelector('.c-nav__list');
        if (navList && navList.classList.contains('is-open')) {
          navList.classList.remove('is-open');
        }
      }
    });
  }

  // ====================
  // PERFORMANCE: DEBOUNCE (JS-13)
  // ====================
  function debounce(func, wait) {
    var timeout;
    return function executedFunction() {
      var context = this;
      var args = arguments;
      
      var later = function() {
        timeout = null;
        func.apply(context, args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // ====================
  // LAZY LOADING CODE BLOCKS (JS-09)
  // ====================
  function initLazyLoad() {
    var codeContainers = document.querySelectorAll('.c-code-container');
    
    if ('IntersectionObserver' in window) {
      var codeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-loaded');
            codeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      codeContainers.forEach(function(container) {
        codeObserver.observe(container);
      });
    }
  }

  // ====================
  // COPY CODE FUNCTIONALITY (JS-15)
  // ====================
  function initCopyCode() {
    // Add copy buttons to code containers
    var codeContainers = document.querySelectorAll('.c-code-container');
    
    codeContainers.forEach(function(container) {
      var header = container.querySelector('.c-code-container__header');
      
      var copyBtn = document.createElement('button');
      copyBtn.className = 'c-code-container__copy';
      copyBtn.innerHTML = '📋';
      copyBtn.title = 'Copy code';
      copyBtn.style.cssText = 'background:transparent;border:none;cursor:pointer;font-size:1.2em;opacity:0.7;transition:opacity 0.3s';
      copyBtn.onmouseover = function() { this.style.opacity = '1'; };
      copyBtn.onmouseout = function() { this.style.opacity = '0.7'; };
      
      copyBtn.addEventListener('click', function() {
        var codeBlock = container.querySelector('.c-code-block');
        var code = codeBlock.textContent;
        
        // JS-15: Clipboard API
        navigator.clipboard.writeText(code).then(function() {
          copyBtn.innerHTML = '✅';
          setTimeout(function() {
            copyBtn.innerHTML = '📋';
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
        });
      });
      
      header.appendChild(copyBtn);
    });
  }

  // ====================
  // SEARCH FUNCTIONALITY
  // ====================
  function initSearch() {
    // Create search input in header
    var headerContent = document.querySelector('.c-header__content');
    if (!headerContent) return;

    var searchContainer = document.createElement('div');
    searchContainer.className = 'c-search';
    searchContainer.style.cssText = 'display:flex;align-items:center;gap:0.5rem';

    var searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search topics...';
    searchInput.className = 'c-search__input';
    searchInput.style.cssText = 'background:rgba(255,255,255,0.05);border:1px solid rgba(57,255,20,0.3);border-radius:4px;padding:0.5rem 1rem;color:#fff;font-family:var(--font-body);min-width:200px';
    searchInput.onfocus = function() { this.style.borderColor = 'var(--neon-lime)'; this.style.boxShadow = '0 0 10px rgba(57,255,20,0.3)'; };
    searchInput.onblur = function() { this.style.borderColor = 'rgba(57,255,20,0.3)'; this.style.boxShadow = 'none'; };

    searchContainer.appendChild(searchInput);
    headerContent.appendChild(searchContainer);

    // Search functionality
    searchInput.addEventListener('input', debounce(function(e) {
      var query = e.target.value.toLowerCase();
      
      if (query.length < 2) {
        document.querySelectorAll('.c-code-container').forEach(function(c) {
          c.style.display = '';
        });
        return;
      }

      document.querySelectorAll('.c-code-container').forEach(function(container) {
        var title = container.querySelector('.c-code-container__title').textContent.toLowerCase();
        var badge = container.querySelector('.c-code-container__badge').textContent.toLowerCase();
        var code = container.querySelector('.c-code-block').textContent.toLowerCase();
        
        if (title.includes(query) || badge.includes(query) || code.includes(query)) {
          container.style.display = '';
        } else {
          container.style.display = 'none';
        }
      });
    }, 300));
  }

  // ====================
  // PROGRESS INDICATOR
  // ====================
  function initScrollProgress() {
    var progressBar = document.createElement('div');
    progressBar.className = 'c-scroll-progress';
    progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--neon-lime),var(--neon-violet));z-index:var(--z-tooltip);transition:width 0.1s';
    progressBar.style.width = '0%';
    
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', debounce(function() {
      var scrollTop = window.scrollY;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }, 10));
  }

  // ====================
  // BACK TO TOP BUTTON
  // ====================
  function initBackToTop() {
    var backToTop = document.createElement('button');
    backToTop.className = 'c-back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.title = 'Back to top';
    backToTop.style.cssText = 'position:fixed;bottom:2rem;right:2rem;width:50px;height:50px;border:2px solid var(--neon-lime);border-radius:50%;background:var(--bg-deep);color:var(--neon-lime);font-size:1.5rem;cursor:pointer;opacity:0;visibility:hidden;transition:all 0.3s;z-index:var(--z-tooltip);box-shadow:0 0 15px rgba(57,255,20,0.3)';
    backToTop.onmouseover = function() { 
      this.style.transform = 'translateY(-5px)'; 
      this.style.boxShadow = '0 10px 30px rgba(57,255,20,0.5)';
    };
    backToTop.onmouseout = function() { 
      this.style.transform = 'translateY(0)'; 
      this.style.boxShadow = '0 0 15px rgba(57,255,20,0.3)';
    };

    backToTop.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.body.appendChild(backToTop);

    window.addEventListener('scroll', debounce(function() {
      if (window.scrollY > 500) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
      } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
      }
    }, 100));
  }

  // ====================
  // INITIALIZATION
  // ====================
  function init() {
    // Populate content
    populateCodeSections();
    populateTOC();

    // Initialize interactions
    initNavToggle();
    initScrollSpy();
    initDomInteractive();
    initSmoothScroll();
    initThemePreference();
    initKeyboardNav();
    initLazyLoad();
    initCopyCode();
    initSearch();
    initScrollProgress();
    initBackToTop();

    // Log initialization (JS-08: CSS Variable updates demo)
    console.log('🚀 JavaScript Tutorial App initialized');
    console.log('📚 Loaded', Object.keys(codeExamples).length, 'code sections');
    
    // Demo: Update CSS variable (NEON effect intensity)
    document.documentElement.style.setProperty('--neon-intensity', '1');
  }

  // Run initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
