# Introduction

Conditionals are a staple of control flow in programming. They test a condition and then do something or else execute something else. Web Assembly is no exception, having `if`, `then`, and `else` and `select`:

```wat
;; classical if branches
(if (local.get $condition) 
    (then (return (local.get $value)))
    (else (return (global.get $error))))

;; the else-branch is optional
(if (local.get $condition)
    (then (return (local.get $value))))

;; if condition is not zero, the then-branch is executed,
;; otherwise an else-branch, if present, will be run

;; both branches of select are evaluated, the one not selected is dropped
(select (local.get $var1) (local.get $var2) (local.get $condition))

;; if $condition is not zero, $var1 is put on the stack and $var2 is dropped
;; if $condition is zero, $var2 is put on the stack and $var1 is dropped
```

