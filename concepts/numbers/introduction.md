# Introduction

Many programming languages have very fine grained number types; Web assembly only has four, two each for integer and floating-point with 32 and 64 bit.

* `i32`/`i64` are integer numbers, where the number is directly stored as a binary number. If used as a signed number, the highest bit will be set for negative numbers; that means that if you handle a negative number as unsigned integer, it will be `2 ^ (bits - 1) + abs(value)`
* `f32`/`f64` are floating-point numbers conforming to IEEE 754, with 23/52 bits mantissa, 8/11 bits exponent and one bit for the sign

You can convert between those types in different ways.

Values need to be declared to be assigned: `(i32.const 1)`.

## Arithmetics

The basic four arithmetics, addition, subtraction, multiplication and division, are supported for all number types.

For integers, division has two flavors, unsigned or signed, and there is also a modulo operator called remainder for both unsigned and signed values.

```wat
;; Addition 1 + 1 = 2
(i32.add (i32.const 1) (i32.const 1)) (i64.add (i64.const 1) (i64.const 1))
(f32.add (f32.const 1) (f32.const 1)) (f64.add (f64.const 1) (f64.const 1))
;; Subtraction 1 - 1 = 0
(i32.sub (i32.const 1) (i32.const 1)) (i64.sub (i64.const 1) (i64.const 1))
(f32.sub (f32.const 1) (f32.const 1)) (f64.sub (f64.const 1) (f64.const 1))
;; Multiplication 1 * 1 = 1
(i32.mul (i32.const 1) (i32.const 1)) (i64.mul (i64.const 1) (i64.const 1))
(f32.mul (f32.const 1) (f32.const 1)) (f64.mul (f64.const 1) (f64.const 1))
;; Division, signed 1 / 1 = 1
(i32.div_s (i32.const 1) (i32.const 1)) (i64.div_s (i64.const 1) (i64.const 1))
(f32.div (f32.const 1) (f32.const 1)) (f64.div (f64.const 1) (f64.const 1))
;; Division, unsigned 1 / 1 = 1
(i32.div_u (i32.const 1) (i32.const 1)) (i64.div_u (i64.const 1) (i64.const 1))
;; Remainder/Modulo, signed 1 % 1 = 0
(i32.rem_s (i32.const 1) (i32.const 1)) (i64.rem_s (i64.const 1) (i64.const 1))
;; Remainder/Modulo, unsigned 1 % 1 = 0
(i32.rem_u (i32.const 1) (i32.const 1)) (i64.rem_u (i64.const 1) (i64.const 1))
```

## Floating-point specific instructions

There are a few more operators for dealing with floating-point numbers, i.e. min and max, nearest/ceil/floor, truncate (removes the non-integer part without conversion), absolute, negate, copy sign and square root.



## Bitwise operations

For integers, there are also bitwise operations, i.e. and, or, xor, shift left, shift right, rotate left, rotate right, count leading or trailing zeros or the total bits that are set in the number. There is no not-operator, but you can use the equals zero operator to the same effect.

## Comparisons

You can compare the same type of numbers with one another, if it is less than, less equal, equal / equals zero (integers only),

## Conversion

