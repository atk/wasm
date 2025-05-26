# Introduction

Strings are a finite sequence of characters. Unlike most other languages, Web Assembly has not string type, so you have to treat a part of linear memory as a string yourself.

## Define a string

To define a string, you can use the `data` directive.

```wat
(module
    (memory (export "mem") 1)
    (data (i32.const 0) "This is a string at position 0; it is 57 characters long.")
)
```

You can use all that you learned about memory management to copy strings with `memory.copy`, repeat ASCII characters with `memory.fill`, read and write bytes with `i32.read8_u` and `i32.store8`.

> **Warning**: the de-facto format for strings is UTF-8, which beyond the first 127 ASCII characters supports multi-byte characters - and you have to handle those yourself.

