import run from "aocrunner";

const NUMBERS = {
  zero: "0",
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

function isNumeric(str: string): boolean {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function parseLine(line: string): number {
  let firstDigit = null;
  let lastDigit = null;
  const inputArray = Array.from(line);

  for (let x = 0; x < inputArray.length; x++) {
    let numeric = null;
    if (isNumeric(inputArray[x])) {
      numeric = inputArray[x];

      if (firstDigit === null) {
        firstDigit = numeric;
      }

      lastDigit = numeric;
    }
  }

  if (firstDigit != null) {
    let combined = firstDigit + lastDigit;
    return +combined;
  }

  return 0;
}

function convertLine(line: string): string {
  let convertedLine = line;
  for (const key in NUMBERS) {
    convertedLine = convertedLine.replace(key, NUMBERS[key]);
  }
  return convertedLine;
}

function sumLines(lines: string[]): number {
  let sum = 0;
  for (let x = 0; x < lines.length; x++) {
    sum += parseLine(lines[x]);
  }

  return sum;
}

const part1 = (rawInput: string) => {
  const lines = parseInput(rawInput);

  return sumLines(lines);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  let convertedLines: string[] = [];

  for (let x = 0; x < input.length; x++) {
    convertedLines.push(convertLine(input[x]));
  }

  return sumLines(convertedLines);
};

run({
  part1: {
    tests: [
      {
        input: "1abc2",
        expected: 12,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine`,
        expected: 29,
      },
      {
        input: `eightwothree`,
        expected: 83,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
