import { test as xtest } from '@jest/globals';
import { compileWat, WasmRunner } from "@exercism/wasm-lib";

let wasmModule;
let currentInstance;

beforeAll(async () => {
  try {
    const watPath = new URL("./.meta/proof.ci.wat", import.meta.url);
    const { buffer } = await compileWat(watPath);
    wasmModule = await WebAssembly.compile(buffer);
  } catch (err) {
    console.log(`Error compiling *.wat: \n${err}`);
    process.exit(1);
  }
});

function triplets({ sum, minFactor, maxFactor }) {
  const u32Size = 4;

  const [outputOffset, outputLength] = currentInstance.exports.triplets(
    sum,
    minFactor ?? 1,
    maxFactor ?? sum
  );

  // Decode JS string from returned offset and length
  return currentInstance.get_mem_as_u32(outputOffset, outputLength / u32Size)
    .reduce((tuples, value) => 
      (tuples.at(-1) || [0,0,0]).length === 3
      ? [...tuples, [value]]
      : [...tuples.slice(0, -1), [...tuples.at(-1), value]],
      []
    );
}

function tripletsWithSum(sum, options = {}) {
  return triplets({ ...options, sum }).map((triplet) =>
    triplet.sort((a, b) => a - b),
  );
}

describe('Triplet', () => {
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
  test('triplets whose sum is 12', () => {
    expect(tripletsWithSum(12)).toEqual([[3, 4, 5]]);
  });

  xtest('triplets whose sum is 108', () => {
    expect(tripletsWithSum(108)).toEqual([[27, 36, 45]]);
  });

  xtest('triplets whose sum is 1000', () => {
    expect(tripletsWithSum(1000)).toEqual([[200, 375, 425]]);
  });

  xtest('no matching triplets for 1001', () => {
    expect(tripletsWithSum(1001)).toEqual([]);
  });

  xtest('returns all matching triplets', () => {
    expect(tripletsWithSum(90)).toEqual([
      [9, 40, 41],
      [15, 36, 39],
    ]);
  });

  xtest('several matching triplets', () => {
    expect(tripletsWithSum(840)).toEqual([
      [40, 399, 401],
      [56, 390, 394],
      [105, 360, 375],
      [120, 350, 370],
      [140, 336, 364],
      [168, 315, 357],
      [210, 280, 350],
      [240, 252, 348],
    ]);
  });

  xtest('returns triplets with no factor smaller than minimum factor', () => {
    expect(tripletsWithSum(90, { minFactor: 10 })).toEqual([[15, 36, 39]]);
  });

  xtest('returns triplets with no factor larger than maximum factor', () => {
    expect(tripletsWithSum(840, { maxFactor: 349 })).toEqual([[240, 252, 348]]);
  });

  xtest('returns triplets with factors in range', () => {
    expect(tripletsWithSum(840, { maxFactor: 352, minFactor: 150 })).toEqual([
      [210, 280, 350],
      [240, 252, 348],
    ]);
  });

  // This test doesn't run on our online test runner because it will time-out
  // with most implementations. It's up to you to test your solution locally.
  test.skip(
    'triplets for large number',
    () => {
      expect(tripletsWithSum(30000)).toEqual([
        [1200, 14375, 14425],
        [1875, 14000, 14125],
        [5000, 12000, 13000],
        [6000, 11250, 12750],
        [7500, 10000, 12500],
      ]);
    },
    20 * 1000,
  );
});