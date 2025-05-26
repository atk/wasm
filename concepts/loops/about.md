# About

The anatomy of a loop in Web Assembly is like this:

```wat
(loop $name 
  (if (local.get $condition) 
    (then (call $effect) (br $name)))
)

;; or

(loop $name
  (call $effect)
  (br_if $name (local.get $condition))
)
```

The former will have the condition tested up front, like a classical for- or while-loop, whereas the latter will test the condition after calling the effect, like a do-while-loop.
