# About

Web Assembly (short: Wasm) is a binary instruction format for a stack-based virtual machine that can run on the server or in the browser. Unlike other VMs like JVM or .NET, it is very low level and pretty similar to CPU instructions.

In most cases, one would create Wasm through a compile target of a higher-level language like C, C++, Rust, Zig, etc. However, this comes at a price, since all of these languages require boilerplate code. Handwritten Wasm is usually a lot smaller and often faster.

Since it is a hassle to manually write bytecodes, Wasm also supports a text format of its language through a lisp-like syntax. A simple Wasm text program looks like this:

```wat
;; define a module
(module
  ;; declarations of imports, memory, globals and functions (imports need to go first)
  
  ;; a function returning double the given number
  (func (export "double") (param $number i32) (result i32)
    (i32.mul (local.get $number) (i32.const 2))
  )
)
```

One can also write in reverse notation, though it is more difficult to read for most humans:

```wat
;; instead of
(i32.mul (local.get $number) (i32.const 2))

;; you could also write
local.get $number
i32.const 2
i32.mul
```

### Data types

The main data types are integer and float, each available in 32 and 64 bit. Integers are also available in 128 bit and can be interpreted both as unsigned and signed. 32-bit floats are far less precise than the 64bit-IEEE754 floats that are used in JS as Number type.

### Global assignment

You can assign global constants and variables and use them:

```wat
(global $immutable i32 (i32.const 1))
(global $mutable (mut i32) (i32.const 2))

;; getting a global value
(global.get $immutable)

;; setting a global value (only if it is marked mutable)
(global.set $mutable (i32.const 3))
```

### Local assignment

There are no local constants; local variables can only be assigned inside of a function:

```wat
(global $letter i32 (i32.const 65))

;; writes letters from A-Z and returns offset and length in linear memory
(func $letters (result i32 i32)
  (local $offset i32)
  (local $length i32)
  (local.set $offset (i32.const 512))
  (loop $chars
    (i32.store8
      (i32.add (local.get $offset) (local.get $length))
      (i32.add (local.get $length) (global.get $letter)))
    (local.set $length (i32.add (local.get $length) (i32.const 1)))
  (br_if $chars (i32.lt_u (local.get $length) (i32.const 26))))
  (local.get $offset) (local.get $length)
)
```

### Functions

Functions can have an internal name and an exported one, an arbitrary number of `param`s and a single `result`, all of which are optional:

```wat
(func $internalName (export "external_name") (param $arg1 i32) (param $arg2 i32) (result i32)
  (i32.sub (local.get $arg1) (local.get $arg2))
)
```

The function will automatically return all values that are on the stack, except if it encounters a previous `return` statement.

### Comments

There are single- and multi-line-comments:

```wat
;; single-line comment

(; multi-line
   comment ;)
```

[Web Assembly Instructions Reference](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference)

