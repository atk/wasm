(module
  ;;
  ;; The day rate, given a rate per hour
  ;;
  ;; @param {f64} $ratePerHour
  ;;
  ;; @returns {f64} - the rate per day
  ;;
  (func $dayRate (export "dayRate") (param $ratePerHour f64) (result f64)
    (f64.mul (local.get $ratePerHour) (f64.const 8.0))
  )

  ;;
  ;; Calculates the number of days in a budget, rounded down
  ;;
  ;; @param {f64} $budget: the total budget
  ;; @param {f64} $ratePerHour: the rate per hour
  ;;
  ;; @returns {i32} the number of days
  ;;
  (func (export "daysInBudget") (param $budget f64) (param $ratePerHour f64)
    (result i32)
    (i32.trunc_f64_u (f64.div (local.get $budget) 
      (call $dayRate (local.get $ratePerHour))))
  )

  ;;
  ;; Calculates the discounted rate for large projects, rounded up
  ;;
  ;; @param {f64} $ratePerHour
  ;; @param {i32} $numDays: number of days the project spans
  ;; @param {f64} $discount: for example 20% written as 0.2
  ;;
  ;; @returns {f64} the rounded up discounted rate
  ;;
  (func (export "priceWithMonthlyDiscount") (param $ratePerHour f64)
    (param $numDays i32) (param $discount f64) (result f64)
    (local $remainingDays f64)
    (local $discountedDays f64)
    (local.set $remainingDays (f64.convert_i32_u (i32.rem_u
      (local.get $numDays) (i32.const 22))))
    (local.set $discountedDays (f64.mul (f64.sub (f64.convert_i32_u (local.get $numDays))
      (local.get $remainingDays)) (f64.sub (f64.const 1) (local.get $discount))))
    (f64.ceil (f64.mul (f64.add (local.get $discountedDays) (local.get $remainingDays))
      (call $dayRate (local.get $ratePerHour))))
  )
)
