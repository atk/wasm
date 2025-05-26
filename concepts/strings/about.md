# About

Strings are a finite sequence of characters. Web Assembly has no string type, so in order to handle strings, you need to treat parts of linear memory as ASCII or UTF-8 characters.

## ASCII and UTF-8

ASCII means American Standards Code for Information Interchange. It defines a character table of 127 characters and allows an extension of other 127 characters, depending on the code page. In most of your exercises, only the first 127 characters matter. Numbers start at 48 with zero, upper case letters start at 65 and lower case letters at 97 (which means that setting the bit 32 on a lower case letter will turn an upper case character into a lower case character).

UTF is the Unicode Transformation Format. It features a very simple run length encoding and encodes every codepoint into one or more items of a given number of bits. UTF-8 will have a byte (8 bit) as a single item. The lowest 127 characters are downwards compatible with ASCII. If the first bit is 1, the number of bits until the next zero bit shows the number of additional items, so an UTF-8 character starting with `10______` will have one, `110____` will have two additional bytes to it, and so on. UTF-8 is now the de-facto standard for character encoding on the internet.

## Strings as part of the data

One can define arbitrary UTF-8 strings within the linear memory using the `data` directive.

```wat
(module
    (memory (export "mem") 1)
    (data (i32.const 1024) "This can contain single-line valid UTF. Quotation marks inside the text need to be escaped: \", ")
    (data (i32.const 1120) "other escape characters, like \t, \r and \n work as well. Character codes are encoded as hex: \0A.")
)
```

## Receiving and returning strings

The idiomatic approach to receiving and returning strings is to have them as bytes in linear memory and take their offset and length as i32 numbers.

### Example 1: lower case conversion

```wat
(func (export "lowercase") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (local $outputLength i32)
    (local $char i32)
    (loop $chars
        (local.set $char (i32.load8_u (i32.add (local.get $inputOffset) (local.get $outputLength))))
        (if (i32.lt_u (i32.sub (local.get $char) (i32.const 65)) (i32.const 26)) (then
            (i32.store8 (i32.add (global.get $outputOffset) (local.get $outputLength))
                (i32.or (local.get $char) (i32.const 32)))))
    (br_if $chars (i32.lt_u (local.get $outputLength) (local.get $inputLength))))
    (global.get $outputOffset) (local.get $outputLength)
)
```

There are two nice shortcuts in this example code:

1. Checking if the character is an upper case letter in a single if-condition by first subtracting the code for `A` so codes below 'A' would become negative, then using `i32.lt_u` to treat the number as unsigned, so negative numbers become positive numbers plus 2^31 in the context of the comparison
2. Setting the 5th bit using `i32.or` to turn an upper case character into a lower case character

### Example 2: reading a number string

```wat
(func (export "parseint") (param $inputOffset i32) (param $inputLength) (result i32)
    (local $index i32)
    (local $number i32)
    (loop $digits
        (local.set $number (i32.add (i32.mul (local.get $number) (i32.const 10)) 
            (i32.sub (i32.load8_u (i32.add (local.get $inputOffset) (local.get $index))) (i32.const 48))))
    (br_if $digits (i32.lt_u (local.get $index) (local.get $inputLength))))
    (local.get $number)
)
```

This code handles only positive integers within the i32 range.

## Assembling strings

Instead of reading and writing strings character by character, it is possible to copy a whole portion of memory using `memory.copy`. Characters can be repeated using `memory.fill`.

The following function writes a part with a certain `$inputOffset` and `$inputLength` to the current `$outputOffset` at `$outputLength` and returns the new output length.

```wat
(func $write (param $inputOffset i32) (param $inputLength i32) 
    (param $outputOffset i32) (param $outputLength i32) (result i32)
    (memory.copy (i32.add (local.get $outputOffset) (local.get $outputLength)) 
        (local.get $inputOffset) (local.get $inputLength))
    (i32.add (local.get $ouputLength) (local.get $inputLength))
)

;; used as
(local.set $outputLength (call $write (local.get $inputOffset) (local.get $inputLength)
    (local.get $outputOffset) (local.get $outputLength)))
```

