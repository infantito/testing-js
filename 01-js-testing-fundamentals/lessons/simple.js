const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

// case failed | const sum = (a, b) => a - b;
let result = sum(3, 7);
let expected = 10;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

// case failed | const subtract = (a, b) => a + b;
result = subtract(7, 3);
expected = 4;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
