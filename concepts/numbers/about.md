# About

Web assembly has four types of numbers. You get integers with 32 and 64 bit capacity and IEEE 754 floating-point numbers with 32 and 64 bit precision. The same integer numbers can be handled as both signed and unsigned.

Ultimately, all types in Web assembly come down to those numbers. Booleans are represented as 32-bit integers. Strings are arrays of 8-bit integers stored in linear memory in the little endian form. You basically need to implement all other types yourself.

For integers, unless you need values of 2^32 or more (or 2^21 if signed), use `i32`, otherwise `i64`. If you need fractions, f64 is the most reasonable choice. f32 is only useful in cases where precision does not matter that much.

Web Assembly has no math library and only a few basic operators to handle numbers.


