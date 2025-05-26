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

const inputBufferOffset = 0;
const inputBufferCapacity = 512;

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

const pizzaPrice = (items) => {
  const [inputOffset, inputLength] = writeToMemory(items.map(item => item + '\n').join(''));
  return currentInstance.exports.pizzaPrice(inputOffset, inputLength);
} 

const orderPrice = (pizzas) => {
  const [references, offset] = pizzas.reduce(([refs, offset], pizza) => {
    const inputOffset, inputLength] = writeToMemory([pizza.pizza, ...pizza.extras].map(item => item + '\n').join(''), offset);
    return [[...references, inputOffset, inputLength], inputOffset + inputLength];
  }, [[], 0]);
  const refBuffer = currentInstance.get_mem_as_u32(offset, references.length * 4);
  refBuffer.set(references);
  return currentInstance.exports.orderPrice(offset, references.length);
}

class PizzaOrder {
  /**
   *
   * @param {Pizza} pizza
   * @param  {Extra[]} extras
   */
  constructor(pizza, ...extras) {
    this.pizza = pizza;
    this.extras = Object.freeze(extras);

    Object.freeze(this);
  }
}

describe('Price for pizza margherita', () => {
  test("pizzaPrice('Margherita')", () => {
    expect(pizzaPrice('Margherita')).toBe(7);
  });
});

describe('Price for pizza formaggio', () => {
  test("pizzaPrice('Formaggio')", () => {
    expect(pizzaPrice('Formaggio')).toBe(10);
  });
});

describe('Price for pizza caprese', () => {
  test("pizzaPrice('Caprese')", () => {
    expect(pizzaPrice('Caprese')).toBe(9);
  });
});

describe('Price for pizza margherita with extra sauce', () => {
  test("pizzaPrice('Margherita', 'ExtraSauce')", () => {
    expect(pizzaPrice('Margherita', 'ExtraSauce')).toBe(8);
  });
});

describe('Price for pizza caprese with extra toppings', () => {
  test("pizzaPrice('Caprese', 'ExtraToppings')", () => {
    expect(pizzaPrice('Caprese', 'ExtraToppings')).toBe(11);
  });
});

describe('Price for pizza formaggio with extra sauce and toppings', () => {
  test("pizzaPrice('Formaggio', 'ExtraSauce', 'ExtraToppings')", () => {
    expect(pizzaPrice('Formaggio', 'ExtraSauce', 'ExtraToppings')).toBe(13);
  });
});

describe('Price for pizza caprese with extra sauce and toppings', () => {
  test("pizzaPrice('Caprese', 'ExtraSauce', 'ExtraToppings')", () => {
    expect(pizzaPrice('Caprese', 'ExtraSauce', 'ExtraToppings')).toBe(12);
  });
});

describe('Price for pizza caprese with a lot of extra toppings', () => {
  test("pizzaPrice('Caprese', 'ExtraToppings', 'ExtraToppings', 'ExtraToppings', 'ExtraToppings')", () => {
    expect(
      pizzaPrice(
        'Caprese',
        'ExtraToppings',
        'ExtraToppings',
        'ExtraToppings',
        'ExtraToppings',
      ),
    ).toBe(17);
  });
});

describe('Order price for no pizzas', () => {
  test('orderPrice([])', () => {
    expect(orderPrice([])).toBe(0);
  });
});

describe('Order price for a single pizza caprese', () => {
  test("orderPrice([PizzaOrder('Caprese')])", () => {
    const order = new PizzaOrder('Caprese');
    expect(orderPrice([order])).toBe(9);
  });
});

describe('Order price for a single pizza formaggio with extra sauce', () => {
  test("orderPrice([PizzaOrder('Formaggio', 'ExtraSauce')])", () => {
    const order = new PizzaOrder('Formaggio', 'ExtraSauce');
    expect(orderPrice([order])).toBe(11);
  });
});

describe('Order price for one pizza margherita and one pizza caprese with extra toppings', () => {
  test("orderPrice([PizzaOrder('Margherita'), PizzaOrder('Caprese', 'ExtraToppings')])", () => {
    const margherita = new PizzaOrder('Margherita');
    const caprese = new PizzaOrder('Caprese', 'ExtraToppings');

    expect(orderPrice([margherita, caprese])).toBe(18);

    // Also test that the order doesn't matter
    expect(orderPrice([caprese, margherita])).toBe(18);
  });
});

describe('Order price for one pizza margherita with a LOT of sauce and one pizza caprese with a LOT of toppings', () => {
  test("orderPrice([PizzaOrder('Margherita', 'ExtraSauce', 'ExtraSauce', 'ExtraSauce'), PizzaOrder('Caprese', 'ExtraToppings', 'ExtraToppings', 'ExtraToppings', 'ExtraToppings')])", () => {
    const saucyMargherita = new PizzaOrder(
      'Margherita',
      'ExtraSauce',
      'ExtraSauce',
      'ExtraSauce',
    );
    const toppedCaprese = new PizzaOrder(
      'Caprese',
      'ExtraToppings',
      'ExtraToppings',
      'ExtraToppings',
      'ExtraToppings',
    );

    expect(orderPrice([saucyMargherita, toppedCaprese])).toBe(27);

    // Also test that the order doesn't matter
    expect(orderPrice([toppedCaprese, saucyMargherita])).toBe(27);
  });
});

describe('Order price for very large order', () => {
  test('orderPrice([/* lots of */])', () => {
    const margherita = new PizzaOrder('Margherita');
    const margherita2 = new PizzaOrder('Margherita', 'ExtraSauce');
    const caprese = new PizzaOrder('Caprese');
    const caprese2 = new PizzaOrder('Caprese', 'ExtraToppings');
    const formaggio = new PizzaOrder('Formaggio');
    const formaggio2 = new PizzaOrder('Formaggio', 'ExtraSauce');
    const formaggio3 = new PizzaOrder(
      'Formaggio',
      'ExtraSauce',
      'ExtraToppings',
    );
    const formaggio4 = new PizzaOrder(
      'Formaggio',
      'ExtraToppings',
      'ExtraSauce',
      'ExtraToppings',
      'ExtraSauce',
    );

    const actual = orderPrice([
      margherita,
      margherita2,
      caprese,
      caprese2,
      formaggio,
      formaggio2,
      formaggio3,
      formaggio4,
    ]);
    expect(actual).toBe(85);
  });
});

describe('Order price for a gigantic order', () => {
  test('orderPrice([/* lots of */])', () => {
    const allTheMargheritas = Array(100 * 1000).fill(
      new PizzaOrder('Margherita'),
    );
    const actual = orderPrice(allTheMargheritas);
    expect(actual).toBe(700 * 1000);
  });
});
