# About

`if` takes an i32 condition, a `then` block and optionally an `else` block. If the condition is not zero, the `then` block will be executed, otherwise it will be skipped and an `else` block, if present, will be run.

You can use the numerical comparison operators to formulate the condition if you don't already have a boolean value. If you just want to check if a 32-bit integer is not zero, you can just use the number as condition. To invert the condition, you can use `i32.eqz`.

There is also a `select` statement that serves as a ternary statement, but unlike other languages' version, this one executes both branches and just drops the result not taken.

## Standard use cases for if

```wat
;; basic if without an else branch
(if (local.get $condition) (then (return (local.get $value))))

;; if with an else branch
(if (local.get $condition)
    (then (return (local.get $value)))
    (else (return (global.get $error))))

;; check if a character is a number
(if (i32.lt_u (i32.sub (local.get $char) (i32.const 48)) (i32.const 10))
    (then ...))

;; check if a character is a letter (both lower and upper case)
(if (i32.lt_u (i32.sub (i32.or (local.get $char)
    (i32.const 32)) (i32.const 97)) (i32.const 26))
    (then ...))
```

## Standard use cases for select



## Other conditionals

Loops will be discussed another time; they consist of a `loop` block marker and a repeat statement, either `br` or `br_if`, which takes the same identifier than the block marker and the same condition that `if` accepts.

