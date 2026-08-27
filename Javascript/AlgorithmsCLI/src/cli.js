#!/usr/bin/env node

import readline from "node:readline";
import { algorithms } from "./algorithms.js";

const demoValues = [34, 7, 23, 32, 5, 62, 18];
const demoTarget = 32;
const ansi = {
  reset: "\u001b[0m",
  lime: "\u001b[92m",
  green: "\u001b[32m",
  cyan: "\u001b[96m",
  magenta: "\u001b[95m",
  violet: "\u001b[35m",
  scarlet: "\u001b[91m",
  silver: "\u001b[37m",
  yellow: "\u001b[93m",
  dim: "\u001b[2m",
};
const colorsEnabled = Boolean(process.stdout.isTTY && !process.env.NO_COLOR);

function paint(color, text) {
  return colorsEnabled ? `${color}${text}${ansi.reset}` : text;
}

function colorizeCode(source) {
  if (!colorsEnabled) return source;

  const tokens = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\b(?:const|let|var|function|return|if|else|for|while|new|true|false)\b|\b\d+(?:\.\d+)?\b)/g;
  let output = "";
  let lastIndex = 0;

  for (const match of source.matchAll(tokens)) {
    output += `${ansi.lime}${source.slice(lastIndex, match.index)}${ansi.reset}`;
    const token = match[0];
    const color = token.startsWith("\"") || token.startsWith("'") || token.startsWith("`")
      ? ansi.yellow
      : /^\d/.test(token)
        ? ansi.magenta
        : ansi.cyan;
    output += `${color}${token}${ansi.reset}`;
    lastIndex = match.index + token.length;
  }

  return `${output}${ansi.lime}${source.slice(lastIndex)}${ansi.reset}`;
}

function printHeader() {
  console.clear();
  console.log(paint(ansi.violet, "                 .-''''-."));
  console.log(paint(ansi.violet, "              .-'  .--.  '-."));
  console.log(`${paint(ansi.violet, "            .'   .'    '.   '.")}${paint(ansi.silver, "       .")}`);
  console.log(`${paint(ansi.violet, "           /   .'        '.   \\")}${paint(ansi.silver, "   .-.'")}`);
  console.log(`${paint(ansi.violet, "          ;   /     __     \\   ;")}${paint(ansi.silver, " .'  /")}`);
  console.log(`${paint(ansi.violet, "          |  ;    /  \\    ;  |")}${paint(ansi.silver, "/   /")}`);
  console.log(`${paint(ansi.violet, "          ;  |   | () |   |  ;")}${paint(ansi.silver, "    /")}`);
  console.log(`${paint(ansi.violet, "           \\  \\   \\__/   /  /")}${paint(ansi.silver, "   /")}`);
  console.log(`${paint(ansi.violet, "            '.  '.___.'  .'")}${paint(ansi.silver, "  /")}`);
  console.log(paint(ansi.violet, "              '-._____.-'"));
  console.log(paint(ansi.lime, "        <== ALGORITHM TUTORIAL CLI ==>"));
  console.log(paint(ansi.scarlet, "             /\\/\\  /\\/\\  /\\/\\"));
  console.log(paint(ansi.silver, "            /  \\/\\/  \\/\\/  \\"));
  console.log(paint(ansi.green, "   Learn by selecting an algorithm and running its demo.\n"));
}

function printMenu() {
  console.log("Algorithms:");
  for (const algorithm of algorithms) {
    console.log(
      `  ${String(algorithm.id).padStart(2, " ")}. ${algorithm.name.padEnd(24)} ${algorithm.type}`,
    );
  }
  console.log("\n  q. Quit");
}

function printDetails(algorithm) {
  let input;
  let result;
  let argumentLabel;
  let argument;

  if (algorithm.demo) {
    ({ input, argument, argumentLabel } = algorithm.demo);
    const extraArguments = algorithm.demo.args
      ?? (algorithm.demo.start ? [algorithm.demo.start, argument] : argument === undefined ? [] : [argument]);
    result = algorithm.run(input, ...extraArguments);
  } else {
    input = algorithm.requiresSortedInput
      ? [...demoValues].sort((a, b) => a - b)
      : demoValues;
    argument = algorithm.type === "Searching" ? demoTarget : undefined;
    result = algorithm.type === "Sorting"
      ? algorithm.run(input)
      : algorithm.run(input, argument);
  }

  const display = (value) => typeof value === "string" ? value : JSON.stringify(value);

  console.log(`\n--- ${algorithm.name} (${algorithm.type}) ---`);
  console.log(algorithm.summary);
  console.log(`Complexity: ${algorithm.complexity}`);
  console.log(`Input:      ${display(input)}`);
  if (argumentLabel) console.log(`${argumentLabel.padEnd(12)} ${display(argument)}`);
  if (algorithm.demo?.args) console.log(`Arguments:   ${display(algorithm.demo.args)}`);
  console.log(`\n${paint(ansi.cyan, "JavaScript implementation:")}`);
  console.log(paint(ansi.dim, "----------------------------------------"));
  console.log(colorizeCode(algorithm.source));
  console.log(paint(ansi.dim, "----------------------------------------"));

  if (algorithm.type === "Sorting") {
    console.log(`Output:     ${display(result)}`);
  } else if (algorithm.type === "Searching") {
    console.log(`Target:     ${demoTarget}`);
    console.log(`Result:     ${result === -1 ? "not found" : `found at index ${result}`}`);
  } else {
    console.log(`Result:     ${display(result)}`);
  }
  console.log("\nPress Enter to return to the menu.");
}

function startCli() {
  const interfaceReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const ask = (question) => new Promise((resolve) => {
    interfaceReader.question(question, resolve);
  });

  async function run() {
    while (true) {
      printHeader();
      printMenu();
      const answer = (await ask("\nChoose an algorithm: ")).trim().toLowerCase();

      if (answer === "q" || answer === "quit" || answer === "exit") break;

      const algorithm = algorithms.find((item) => String(item.id) === answer);
      if (!algorithm) {
        console.log(`\nPlease choose a number from 1 to ${algorithms.length}.`);
        await ask("Press Enter to continue.");
        continue;
      }

      printDetails(algorithm);
      await ask("");
    }

    interfaceReader.close();
    console.log("\nKeep practicing!");
  }

  run().catch((error) => {
    interfaceReader.close();
    console.error(error);
    process.exitCode = 1;
  });
}

if (process.argv.includes("--list")) {
  for (const algorithm of algorithms) {
    console.log(`${algorithm.id}. ${algorithm.name} - ${algorithm.type}`);
  }
} else {
  startCli();
}
