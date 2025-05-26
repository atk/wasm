# Introduction

Many programming languages have very fine grained number types; Web assembly only has four, two each for integer and floating-point with 32 and 64 bit.

* `i32`/`i64` are integer numbers, where the number is directly stored as a binary number. If used as a signed number, the highest bit will be set for negative numbers; that means that if you handle a negative number as unsigned integer, it will be `2 ^ (bits - 1) + abs(value)`
* `f32`/`f64` are floating-point numbers conforming to IEEE 754, with 23/52 bits mantissa, 8/11 bits exponent and one bit for the sign

<<<<<<< HEAD
You can convert between those types in different ways.

Values need to be declared to be assigned: `(i32.const 1)`.

You can convert between those types in different ways. Values need to be instantiated to be assigned: `(i32.const 1)`. Many developers tend to always write floating-point numbers with decimal places, even though they are not strictly necessary, to avoid confusion.

## Limitations

Integers have limited capacity; with 32 bits, they can store either numbers from 0 to 4,294,967,295 as unsigned or from -2,147,483,647 to 2,147,483,647 signed. With 64 bits, they can go from 0 to 18,446,744,073,709,551,615 unsigned or signed from -9,223,372,036,854,775,807 to 9,223,372,036,854,775,807.

Floating-point numbers can go much higher due to their exponent, but are limited in precision. For example, for f32, `0.1 + 0.2 = 0.30000001192092896`, while for f64, it is `0.1 + 0.2 = 0.30000000000000004`.

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

```wat
;; Minimum; min(1.0, 2.0) = 1.0
(f32.min (i32.const 1.0) (i32.const 2.0)) (f64.min (f64.const 1.0) (f64.const 2.0))
;; Maximum: max(1.0, 2.0) = 2.0
(f32.max (i32.const 1.0) (i32.const 2.0)) (f64.max (f64.const 1.0) (f64.const 2.0))
;; Nearest: nearest(1.49) = 1.0, nearest(1.5) = 2.0
(f32.nearest (f32.const 1.5)) (f64.nearest (f64.const 1.5))
;; Floor: floor(1.9) = 1.0, floor(-1.9) = 2.0
(f32.floor (f32.const 1.9)) (f64.floor (f64.const 1.9))
;; Ceiling: ceil(1.1) = 2.0
(f32.ceil (f32.const 1.1)) (f64.ceil (f64.const 1.1))
;; Truncate: trunc(-1.9) = -1
(f32.trunc (f32.const -1.9)) (f64.trunc (f64.const -1.9))
;; Absolute: abs(-10.0) = 10.0
(f32.abs (f32.const -10.0)) (f64.abs (f64.const -10.0))
;; Negate: neg(1.0) = -1.0
(f32.neg (f32.const 1.0)) (f64.neg (f64.const -1.0))
;; Copy sign: copysign(10.0, -4.0) = -10.0
(f32.copysign (f32.const 10.0) (f32.const -4.0)) (f64.copysign (f64.const 10.0) (f64.const -4.0))
;; Square root: sqrt(36.0) = 6.0
(f32.sqrt (f32.const 36.0)) (f64.sqrt (f64.const 36.0))
```
## Bitwise operations

For integers, there are also bitwise operations, i.e. and, or, xor, shift left, shift right, rotate left, rotate right, count leading or trailing zeros or the total bits that are set in the number. There is no not-operator, but you can use the equals zero operator to the same effect.

## Comparisons

You can compare the same type of numbers with one another, if it is less than, less equal, equal / equals zero (integers only),

## Conversion

You can compare the same type of numbers with one another, if it is less than, less equal, equal / equals zero (integers only), is larger than, or larger equal than the other number.

## Conversion

You can convert from integer to floating-point:

```wat

```
