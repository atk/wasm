import { compileWat, WasmRunner } from "@exercism/wasm-lib";

let wasmModule;
let currentInstance;

beforeAll(async () => {
  try {
    const watPath = new URL("./annalyns-infiltration.wat", import.meta.url);
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

describe("can execute fast attack", () => {
  test("when the knight is awake", () => {
    const knightIsAwake = true;
    const expected = false;

    expect(Boolean(currentInstance.exports.canExecuteFastAttack(knightIsAwake))).toBe(
      expected,
    );
  });

  test("when the knight is asleep", () => {
    const knightIsAwake = false;
    const expected = true;

    expect(Boolean(currentInstance.exports.canExecuteFastAttack(knightIsAwake))).toBe(
      expected,
    );
  });
});

describe("can spy", () => {
  test("when everyone is asleep", () => {
    const knightIsAwake = false;
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });

  test("when only the prisoner is awake", () => {
    const knightIsAwake = false;
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });

  test("when only the archer is awake", () => {
    const knightIsAwake = false;
    const archerIsAwake = true;
    const prisonerIsAwake = false;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });

  test("when only the knight is asleep", () => {
    const knightIsAwake = false;
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });

  test("when only the knight is awake", () => {
    const knightIsAwake = true;
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });

  test("when only the archer is asleep", () => {
    const knightIsAwake = true;
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });

  test("when everyone is awake", () => {
    const knightIsAwake = true;
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSpy(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
      ),
    )).toBe(expected);
  });
});

describe("can signal prisoner", () => {
  test("when everyone is asleep", () => {
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canSignalPrisoner(archerIsAwake, prisonerIsAwake),
    )).toBe(expected);
  });

  test("when only the prisoner is awake", () => {
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canSignalPrisoner(archerIsAwake, prisonerIsAwake),
    )).toBe(expected);
  });

  test("when only the archer is awake", () => {
    const archerIsAwake = true;
    const prisonerIsAwake = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canSignalPrisoner(archerIsAwake, prisonerIsAwake),
    )).toBe(expected);
  });

  test("when everyone is awake", () => {
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canSignalPrisoner(archerIsAwake, prisonerIsAwake),
    )).toBe(expected);
  });
});

describe("can free prisoner", () => {
  test("when everyone is asleep and pet dog is not present", () => {
    const knightIsAwake = false;
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when everyone is asleep and pet dog is present", () => {
    const knightIsAwake = false;
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const petDogIsPresent = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the prisoner is awake and pet dog is not present", () => {
    const knightIsAwake = false;
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const petDogIsPresent = false;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the prisoner is awake and pet dog is present", () => {
    const knightIsAwake = false;
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const petDogIsPresent = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the archer is awake and pet dog is not present", () => {
    const knightIsAwake = false;
    const archerIsAwake = true;
    const prisonerIsAwake = false;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the archer is awake and pet dog is present", () => {
    const knightIsAwake = false;
    const archerIsAwake = true;
    const prisonerIsAwake = false;
    const petDogIsPresent = true;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the knight is asleep and pet dog is not present", () => {
    const knightIsAwake = false;
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the knight is asleep and pet dog is present", () => {
    const knightIsAwake = false;
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const petDogIsPresent = true;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the knight is awake and pet dog is not present", () => {
    const knightIsAwake = true;
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the knight is awake and pet dog is present", () => {
    const knightIsAwake = true;
    const archerIsAwake = false;
    const prisonerIsAwake = false;
    const petDogIsPresent = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the archer is asleep and pet dog is not present", () => {
    const knightIsAwake = true;
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the archer is asleep and pet dog is present", () => {
    const knightIsAwake = true;
    const archerIsAwake = false;
    const prisonerIsAwake = true;
    const petDogIsPresent = true;
    const expected = true;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the prisoner is asleep and pet dog is not present", () => {
    const knightIsAwake = true;
    const archerIsAwake = true;
    const prisonerIsAwake = false;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when only the prisoner is asleep and pet dog is present", () => {
    const knightIsAwake = true;
    const archerIsAwake = true;
    const prisonerIsAwake = false;
    const petDogIsPresent = true;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when everyone is awake and pet dog is not present", () => {
    const knightIsAwake = true;
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const petDogIsPresent = false;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });

  test("when everyone is awake and pet dog is present", () => {
    const knightIsAwake = true;
    const archerIsAwake = true;
    const prisonerIsAwake = true;
    const petDogIsPresent = true;
    const expected = false;

    expect(Boolean(
      currentInstance.exports.canFreePrisoner(
        knightIsAwake,
        archerIsAwake,
        prisonerIsAwake,
        petDogIsPresent,
      ),
    )).toBe(expected);
  });
});
