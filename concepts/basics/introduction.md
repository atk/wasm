# Introduction

Web Assembly (short: Wasm) is a static language, supporting imperative, and declarative (e.g. functional programming) styles.

All commands are written as `(type.method arguments)`, all declarations are written as `(type $name information)`.

## Constant and Variable Declarations

Constants and variables need to be declared before they can be used:

```wat
;; constants can only be global
(global $MY_FIRST_CONSTANT i32 (i32.const 10))

(func $myFirstFunction
  ;; local variable
  (local $my_first_variable i32)

  ;; constants cannot be changed - this will cause an error
  (global.set $MY_FIRST_CONSTANT 11)

  ;; but local variables can
  (local.set $my_first_variable 17)
)
```

All internal names are prefixed with `$`.

## Function Declarations

Functions are repeatable units of logic. In Wasm, they can have an internal name and an exported name, parameters and a return value:

```wat
(func $add (param $num1 i32) (param $num2 i32) (result i32)
  (i32.add (local.get $num1) (local.get $num2))
)
```

You can then call the function like this:

```wat
(call $add (i32.const 1336) (i32.const 1))
```

## Exposing to other files

In addition to internal names starting with `$`, you can also export memory slices, global variables and functions:

```wat
(module
  (memory (export "mem") 1)

  (global $outputOffset (export "offset") i32 (i32.const 512))

  (func (export "add") (param $num1 i32) (param $num2 i32) (result i32)
    (i32.add (local.get $num1) (local.get $num2))
  )
)
```

