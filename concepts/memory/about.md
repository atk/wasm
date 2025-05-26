# About

Web Assembly handles memory like slices of linear storage addressable on byte precision, though you can read and write 8, 16, 32 or 64 bits at once, as signed or unsigned. You can define slices of memory

```wat
;; memory definitions needs to be before anything else in a module except for imports
;; define a memory slice exported as "mem" of one page (1 x 64kb)
(memory (export "mem") 1)

;; return the size of the memory in pages as i32
(memory.size)

;; grow the memory by 1 page
(memory.grow (i32.const 1))

;; load 1 signed byte (i8) from $address into an i32 register
i32.load8_s (local.get $address)
;; load 1 unsigned byte (u8) from $address into an i32 register
i32.load8_u (local.get $address)
;; load 1 signed word (i16) from $address into an i32 register
i32.load16_s (local.get $address)
;; load 1 unsigned word (u16) from $address into an i32 register
i32.load16_u (local.get $address)

;; store 1 signed byte (i8) at $address from an i32 register
i32.store8_s (local.get $address) (i32.const -8)

;; fill a slice of memory defined by offset and length with one value

;; copy a slice of memory defined by destination offset, source offset, and length


```
