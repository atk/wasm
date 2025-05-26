import { compileWat, WasmRunner } from "@exercism/wasm-lib";

let wasmModule;
let currentInstance;

beforeAll(async () => {
  try {
    const watPath = new URL("./lasagna.wat", import.meta.url);
    const { buffer } = await compileWat(watPath);
    wasmModule = await WebAssembly.compile(buffer);
  } catch (err) {
    console.log(`Error compiling *.wat: \n${err}`);
    process.exit(1);
  }
});

beforeEach(async () => {
  currentInstance = null;

  if (!wasmModule) {
    return Promise.reject();
  }
  try {
    currentInstance = await new WasmRunner(wasmModule);
    return Promise.resolve();
  } catch (err) {
    console.log(`Error instantiating WebAssembly module: ${err}`);
    return Promise.reject();
  }
});

describe('EXPECTED_MINUTES_IN_OVEN', () => {
  test('constant is defined correctly', () => {
    expect(Number(currentInstance.exports.EXPECTED_MINUTES_IN_OVEN)).toBe(40);
  });
});

describe('remainingMinutesInOven', () => {
  test('calculates the remaining time', () => {
    expect(currentInstance.exports.remainingMinutesInOven(25)).toBe(15);
    expect(currentInstance.exports.remainingMinutesInOven(5)).toBe(35);
    expect(currentInstance.exports.remainingMinutesInOven(39)).toBe(1);
  });

  test('works correctly for the edge cases', () => {
    expect(currentInstance.exports.remainingMinutesInOven(40)).toBe(0);
    expect(currentInstance.exports.remainingMinutesInOven(0)).toBe(40);
  });
});

describe('preparationTimeInMinutes', () => {
  test('calculates the preparation time', () => {
    expect(currentInstance.exports.preparationTimeInMinutes(1)).toBe(2);
    expect(currentInstance.exports.preparationTimeInMinutes(2)).toBe(4);
    expect(currentInstance.exports.preparationTimeInMinutes(8)).toBe(16);
  });
});

describe('totalTimeInMinutes', () => {
  test('calculates the total cooking time', () => {
    expect(currentInstance.exports.totalTimeInMinutes(1, 5)).toBe(7);
    expect(currentInstance.exports.totalTimeInMinutes(4, 15)).toBe(23);
    expect(currentInstance.exports.totalTimeInMinutes(1, 30)).toBe(32);
  });
});
