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

const splitLines = (rawInput: string) => {
  return rawInput.split("\n");
};

function isNumeric(char: string): boolean {
  return !isNaN(parseInt(char, 10));
}

function parseLine(line: string): number {
  let firstDigit: string | null = null;
  let lastDigit: string | null = null;

  for (let char of line) {
    if (isNumeric(char)) {
      if (firstDigit === null) {
        firstDigit = char;
      }
      lastDigit = char;
    }
  }

  if (firstDigit !== null && lastDigit !== null) {
    return parseInt(firstDigit + lastDigit, 10);
  }

  return 0;
}

function calibrationWords(line: string): number {
  const calibrationDigits: { [key: number]: number } = {};

  for (let x = 0; x < line.length; x++) {
    if (isNumeric(line[x])) {
      calibrationDigits[x] = parseInt(line[x], 10);
    }
  }

  for (const key in NUMBERS) {
    const numKey = key as keyof typeof NUMBERS;
    let firstIndex = line.indexOf(numKey);

    if (firstIndex != -1) {
      calibrationDigits[firstIndex] = parseInt(NUMBERS[numKey], 10);
    }

    const lastIndex = line.lastIndexOf(numKey);
    if (lastIndex != -1 && lastIndex != firstIndex) {
      calibrationDigits[lastIndex] = parseInt(NUMBERS[numKey], 10);
    }
  }

  const sortedKeys = Object.keys(calibrationDigits)
    .map(Number)
    .sort((a, b) => a - b);
  if (sortedKeys.length === 0) return 0;

  const firstDigit = calibrationDigits[sortedKeys[0]];
  const lastDigit = calibrationDigits[sortedKeys[sortedKeys.length - 1]];

  return parseInt(String(firstDigit) + String(lastDigit), 10);
}

function sumLines(lines: string[]): number {
  let sum = 0;
  for (let x = 0; x < lines.length; x++) {
    sum += parseLine(lines[x]);
  }
  return sum;
}

const part1 = (rawInput: string) => {
  const lines = splitLines(rawInput);
  return sumLines(lines);
};

const part2 = (rawInput: string) => {
  const input = splitLines(rawInput);
  let sums: number[] = [];

  for (let x = 0; x < input.length; x++) {
    sums.push(calibrationWords(input[x]));
  }
  return sums.reduce((partialSum, a) => partialSum + a, 0);
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
