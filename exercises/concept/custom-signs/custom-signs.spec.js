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

const inputBufferOffset = 128;
const inputBufferCapacity = 256;
const writeToMemory = (input, offset = inputBufferOffset) => {
  const inputLengthEncoded = new TextEncoder().encode(input).length;
  if (inputLengthEncoded > inputBufferCapacity) {
    throw new Error(
      `String is too large for buffer of size ${inputBufferCapacity} bytes`
    );
  }
  currentInstance.set_mem_as_utf8(offset, inputLengthEncoded, input)
  return [offset, inputLengthEncoded]
}

const buildSign = (occassion, name) => {
  const [occassionOffset, occassionLength] = writeToMemory(occassion);
  const [nameOffset, nameLength] = writeToMemory(name, occassionOffset + occassionLength);
  const [outputOffset, outputLength] = currentInstance.exports.buildSign(
    occassionOffset,
    occassionLength,
    nameOffset,
    nameLength
  );
  return currentInstance.get_mem_as_utf8(outputOffset, outputLength);
}

const buildBirthdaySign = (age) => {
  const [outputOffset, outputLength] = currentInstance.exports.buildBirthdaySign(age);
  return currentInstance.get_mem_as_utf8(outputOffset, outputLength);
}

const graduationFor = (name, year) => {
  const [nameOffset, nameLength] = writeToMemory(name);
  const [outputOffset, outputLength] = currentInstance.exports.graduationFor(nameOffset, nameLength, year);
  return currentInstance.get_mem_as_utf8(outputOffset, outputLength);
}

const costOf = (sign, currency) => {
  const [signOffset, signLength] = writeToMemory(sign);
  const [currencyOffset, currencyLength] = writeToMemory(currency, signOffset + signLength);
  const [outputOffset, outputLength] = currentInstance.exports.costOf(signOffset, signLength, currencyOffset, currencyLength);
  return currentInstance.get_mem_as_utf8(outputOffset, outputLength);
}

describe('buildSign', () => {
  test('occasion is Birthday', () => {
    expect(buildSign('Birthday', 'Jack')).toBe('Happy Birthday Jack!');
  });

  test('occasion is Anniversary', () => {
    expect(buildSign('Anniversary', 'Jill')).toBe('Happy Anniversary Jill!');
  });
});

describe('buildBirthdaySign', () => {
  test('age is less than 50', () => {
    expect(buildBirthdaySign(49)).toBe(
      'Happy Birthday! What a young fellow you are.',
    );
  });

  test('age is 50 or older', () => {
    expect(buildBirthdaySign(51)).toBe(
      'Happy Birthday! What a mature fellow you are.',
    );
  });

  test('age is 50', () => {
    expect(buildBirthdaySign(50)).toBe(
      'Happy Birthday! What a mature fellow you are.',
    );
  });
});

describe('graduationFor', () => {
  test('Robs graduation, 2021', () => {
    const expected = 'Congratulations Rob!\nClass of 2021';
    expect(graduationFor('Rob', 2021)).toBe(expected);
  });

  test('Jills graduation, 1999', () => {
    const expected = 'Congratulations Jill!\nClass of 1999';
    expect(graduationFor('Jill', 1999)).toBe(expected);
  });
});

describe('costOf', () => {
  test('sign is total of characters followed by the currency', () => {
    const sign = 'Happy Birthday!';
    const expected = 'Your sign costs 50.00 dollars.';
    expect(costOf(sign, 'dollars')).toBe(expected);
  });

  test('includes line breaks in the calculation', () => {
    const sign = 'Congratulations Rob\nClass of 2021';
    const expected = 'Your sign costs 86.00 dollars.';
    expect(costOf(sign, 'dollars')).toBe(expected);
  });

  test('handles different currency arguments', () => {
    const sign = 'Happy Easter, little sister!';
    const expected = 'Your sign costs 76.00 euros.';
    expect(costOf(sign, 'euros')).toBe(expected);
  });
});
