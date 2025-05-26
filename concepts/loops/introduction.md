# Introduction

Repeating a task is one of the most basic patterns. While other languages sport different kinds of loop, Web Assembly gets by with ony one type: `loop` together with `br`/`br_if`.

You can use these to emulate different kinds of loop.

```wat
// for (i = 0; i < 10; i++) log(i)
(local.set $i (i32.const 0))
(loop $zeroToNine (if (i32.lt (local.get $i) (i32.const 10)) (then
  (call $log (local.get $i))
  (local.set $i (i32.add (local.get $i) (i32.const 1)))
  (br $zeroToNine)
)))

// while (b != 0) { tmp = a; a = b; b = tmp % b; }
(loop $gcd (if (local.get $b) (then
  (local.set $tmp (local.get $a))
  (local.set $a (local.get $b))
  (local.set $b (i32.rem_u (local.get $tmp) (local.get $b)))
  (br $gcd)
)))

// let cand = num / 2, steps = 0;
// do { cand = (candidate + num / cand) / 2 } while (steps < 100)
(local.set $cand (f64.div (local.get $num) (f64.const 1)))
(local.set $steps (i32.const 0))
(loop $heron
  (local.set $cand (f64.div (f64.add (local.get $cand)
    (f64.div (local.get $num) (local.get $cand))) (f64.const 2.0)))
  (local.set $steps (i32.add (local.get $steps) (i32.const 1))) 
(br_if $heron (i32.lt (local.get $steps) (i32.const 100))))
```

