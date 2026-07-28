const JQUERY_TUTORIAL_DATA = [
  {
    id: "selectors",
    title: "jQuery Selectors",
    category: "Basics",
    jquery: `// Select by tag
$("p").hide();

// Select by ID
$("#test").show();

// Select by Class
$(".demo").addClass("active");`,
    dom: `// Select by tag
document.querySelectorAll("p")
  .forEach(el => el.style.display = "none");

// Select by ID
document.getElementById("test")
  .style.display = "block";

// Select by Class
document.querySelectorAll(".demo")
  .forEach(el => el.classList.add("active"));`
  },
  {
    id: "events",
    title: "jQuery Events",
    category: "Events",
    jquery: `// Click event
$("button").click(function() {
  alert("Clicked!");
});

// Hover event
$("#target").hover(
  function() { $(this).css("color", "red"); },
  function() { $(this).css("color", "white"); }
);`,
    dom: `// Click event
document.querySelectorAll("button")
  .forEach(btn => {
    btn.addEventListener("click", () => {
      alert("Clicked!");
    });
  });

// Hover event
const target = document.getElementById("target");
target.addEventListener("mouseenter", 
  () => target.style.color = "red"
);
target.addEventListener("mouseleave", 
  () => target.style.color = "white"
);`
  },
  {
    id: "hide-show",
    title: "Hide and Show",
    category: "Effects",
    jquery: `// Hide
$("#hide").click(function(){
  $("p").hide(1000);
});

// Show
$("#show").click(function(){
  $("p").show(1000);
});`,
    dom: `// Hide
document.getElementById("hide").addEventListener("click", () => {
  document.querySelectorAll("p").forEach(p => {
    p.style.transition = "opacity 1s";
    p.style.opacity = "0";
    setTimeout(() => p.style.display = "none", 1000);
  });
});

// Show
document.getElementById("show").addEventListener("click", () => {
  document.querySelectorAll("p").forEach(p => {
    p.style.display = "block";
    p.style.opacity = "0";
    setTimeout(() => p.style.opacity = "1", 10);
  });
});`
  },
  {
    id: "fade",
    title: "Fade Effects",
    category: "Effects",
    jquery: `// Fade In/Out
$("button").click(function(){
  $("#div1").fadeIn();
  $("#div2").fadeOut("slow");
  $("#div3").fadeToggle(3000);
});`,
    dom: `// Fade In/Out
document.querySelector("button").addEventListener("click", () => {
  const el = document.getElementById("div1");
  el.style.display = "block";
  el.style.opacity = 0;
  el.style.transition = "opacity 0.4s";
  setTimeout(() => el.style.opacity = 1, 10);
  
  const el2 = document.getElementById("div2");
  el2.style.transition = "opacity 0.8s";
  el2.style.opacity = 0;
  setTimeout(() => el2.style.display = "none", 800);
});`
  },
  {
    id: "slide",
    title: "Slide Effects",
    category: "Effects",
    jquery: `// Slide Up/Down
$("#flip").click(function(){
  $("#panel").slideDown("slow");
});

$("#stop").click(function(){
  $("#panel").slideUp();
});`,
    dom: `// Slide Up/Down
const panel = document.getElementById("panel");
document.getElementById("flip").addEventListener("click", () => {
  panel.style.transition = "max-height 0.6s ease-in";
  panel.style.maxHeight = "500px";
});

document.getElementById("stop").addEventListener("click", () => {
  panel.style.transition = "max-height 0.4s ease-out";
  panel.style.maxHeight = "0";
});`
  },
  {
    id: "animate",
    title: "Custom Animation",
    category: "Effects",
    jquery: `// Animate multiple properties
$("button").click(function(){
  $("div").animate({
    left: '250px',
    opacity: '0.5',
    height: '150px',
    width: '150px'
  });
});`,
    dom: `// Using Web Animations API
document.querySelector("button").addEventListener("click", () => {
  document.querySelector("div").animate([
    { left: '0px', opacity: 1, height: '100px', width: '100px' },
    { left: '250px', opacity: 0.5, height: '150px', width: '150px' }
  ], {
    duration: 1000,
    fill: 'forwards'
  });
});`
  },
  {
    id: "chaining",
    title: "Method Chaining",
    category: "Effects",
    jquery: `// Chaining methods
$("#p1").css("color", "red")
  .slideUp(2000)
  .slideDown(2000);`,
    dom: `// Manual sequential execution
const p1 = document.getElementById("p1");
p1.style.color = "red";
// Animation sequence requires Promises or Callbacks
slideUp(p1, 2000)
  .then(() => slideDown(p1, 2000));`
  },
  {
    id: "get-set",
    title: "Get and Set Content",
    category: "HTML",
    jquery: `// Get and Set
let text = $("#test").text();
$("#test").text("Hello World!");

let html = $("#test").html();
$("#test").html("<b>Hello World!</b>");

let val = $("#i1").val();
$("#i1").val("New Value");`,
    dom: `// Get and Set
let text = document.getElementById("test").textContent;
document.getElementById("test").textContent = "Hello World!";

let html = document.getElementById("test").innerHTML;
document.getElementById("test").innerHTML = "<b>Hello World!</b>";

let val = document.getElementById("i1").value;
document.getElementById("i1").value = "New Value";`
  },
  {
    id: "add-elements",
    title: "Add Elements",
    category: "HTML",
    jquery: `// Append, Prepend, After, Before
$("p").append(" Appended text.");
$("p").prepend("Prepended text. ");
$("img").after("Some text after");
$("img").before("Some text before");`,
    dom: `// insertAdjacentHTML or appendChild
const p = document.querySelector("p");
p.insertAdjacentHTML('beforeend', ' Appended text.');
p.insertAdjacentHTML('afterbegin', 'Prepended text. ');

const img = document.querySelector("img");
img.insertAdjacentHTML('afterend', 'Some text after');
img.insertAdjacentHTML('beforebegin', 'Some text before');`
  },
  {
    id: "remove-elements",
    title: "Remove Elements",
    category: "HTML",
    jquery: `// Remove and Empty
$("#div1").remove();
$("#div1").empty();`,
    dom: `// remove and innerHTML
const div = document.getElementById("div1");
div.remove();

const div2 = document.getElementById("div2");
div2.innerHTML = "";`
  },
  {
    id: "css-classes",
    title: "CSS Classes",
    category: "HTML",
    jquery: `// Add, Remove, Toggle
$("h1").addClass("blue");
$("h1").removeClass("blue");
$("h1").toggleClass("blue");`,
    dom: `// classList API
const h1 = document.querySelector("h1");
h1.classList.add("blue");
h1.classList.remove("blue");
h1.classList.toggle("blue");`
  },
  {
    id: "css-method",
    title: "CSS Method",
    category: "HTML",
    jquery: `// Set CSS Property
$("p").css("background-color", "yellow");
$("p").css({"background-color": "yellow", "font-size": "200%"});`,
    dom: `// style Property
const p = document.querySelector("p");
p.style.backgroundColor = "yellow";
Object.assign(p.style, {
  backgroundColor: "yellow",
  fontSize: "200%"
});`
  },
  {
    id: "dimensions",
    title: "Dimensions",
    category: "HTML",
    jquery: `// Width and Height
let w = $("#div1").width();
let h = $("#div1").height();
let iw = $("#div1").innerWidth();`,
    dom: `// clientWidth and offsetWidth
const div = document.getElementById("div1");
let w = div.getBoundingClientRect().width;
let h = div.getBoundingClientRect().height;
let iw = div.clientWidth;`
  },
  {
    id: "ancestors",
    title: "Traversing - Ancestors",
    category: "Traversing",
    jquery: `// parent, parents, parentsUntil
$("span").parent();
$("span").parents("ul");
$("span").parentsUntil("div");`,
    dom: `// parentElement and closest
const span = document.querySelector("span");
let p = span.parentElement;
let ancestors = span.closest("ul");
// parentsUntil requires a loop to collect parents`
  },
  {
    id: "descendants",
    title: "Traversing - Descendants",
    category: "Traversing",
    jquery: `// children, find
$("div").children();
$("div").children("p.first");
$("div").find("span");`,
    dom: `// children and querySelectorAll
const div = document.querySelector("div");
let children = div.children;
let specificChildren = div.querySelectorAll(":scope > p.first");
let allSpans = div.querySelectorAll("span");`
  },
  {
    id: "siblings",
    title: "Traversing - Siblings",
    category: "Traversing",
    jquery: `// siblings, next, prev
$("h2").siblings();
$("h2").next();
$("h2").prev();`,
    dom: `// parentElement.children and nextElementSibling
const h2 = document.querySelector("h2");
let siblings = [...h2.parentElement.children].filter(el => el !== h2);
let next = h2.nextElementSibling;
let prev = h2.previousElementSibling;`
  },
  {
    id: "filtering",
    title: "Traversing - Filtering",
    category: "Traversing",
    jquery: `// first, last, eq, filter, not
$("div p").first();
$("div p").last();
$("p").eq(1);
$("p").filter(".intro");
$("p").not(".intro");`,
    dom: `// querySelector and matches
let first = document.querySelector("div p");
let ps = document.querySelectorAll("div p");
let last = ps[ps.length - 1];
let second = ps[1];
let filtered = [...ps].filter(p => p.matches(".intro"));
let notFiltered = [...ps].filter(p => !p.matches(".intro"));`
  },
  {
    id: "ajax-load",
    title: "AJAX Load",
    category: "AJAX",
    jquery: `// Load content into element
$("#div1").load("demo_test.txt");`,
    dom: `// fetch and innerHTML
fetch("demo_test.txt")
  .then(response => response.text())
  .then(data => {
    document.getElementById("div1").innerHTML = data;
  });`
  },
  {
    id: "ajax-get-post",
    title: "AJAX Get/Post",
    category: "AJAX",
    jquery: `// GET and POST
$.get("test.asp", function(data, status){
  alert("Data: " + data + "\\nStatus: " + status);
});

$.post("demo_test_post.asp", {name: "Donald"}, function(data){
  alert("Data: " + data);
});`,
    dom: `// fetch with method
fetch("test.asp")
  .then(res => res.text())
  .then(data => alert("Data: " + data));

fetch("demo_test_post.asp", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Donald" })
})
.then(res => res.text())
.then(data => alert("Data: " + data));`
  },
  {
    id: "noconflict",
    title: "Misc - noConflict",
    category: "Misc",
    jquery: `// Relinquish $ control
var jq = $.noConflict();
jq(document).ready(function(){
  jq("button").click(function(){
    jq("p").text("jQuery is still working!");
  });
});`,
    dom: `// Native JS doesn't have $ conflict by default
// Unless using other libraries that use $
window.$ = undefined; // Manually "relinquish" if needed
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("button").addEventListener("click", () => {
    document.querySelector("p").textContent = "Vanilla is fine!";
  });
});`
  }
];
