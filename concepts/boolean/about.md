# About

Web assembly has no dedicated type for Booleans. Instead, it uses 32-bit integer variables containing 1 for true, or 0 for false, and binary operators to handle boolean logic.

The equivalents of logical AND, OR, and NOT are:

* AND: `i32.and`
* OR: `i32.or`
* NOT: `i32.eqz` (this is the comparison operator "not equal zero")

```wat
;; AND
(i32.and (i32.const 1) (i32.const 1)) ;; (i32.const 1)
(i32.and (i32.const 1) (i32.const 0)) ;; (i32.const 0)
(i32.and (i32.const 0) (i32.const 1)) ;; (i32.const 0)
(i32.and (i32.const 0) (i32.const 0)) ;; (i32.const 0)

;; OR
(i32.or (i32.const 1) (i32.const 1)) ;; (i32.const 1)
(i32.or (i32.const 1) (i32.const 0)) ;; (i32.const 1)
(i32.or (i32.const 0) (i32.const 1)) ;; (i32.const 1)
(i32.or (i32.const 0) (i32.const 0)) ;; (i32.const 0)

;; NOT
(i32.eqz (i32.const 1)) ;; (i32.const 0)
(i32.eqz (i32.const 0)) ;; (i32.const 1)
```

> **Warning**: Since these binary operators apply the logical operation to each bit of the values, make sure the input is only either 0 or 1.

