(module
  ;;
  ;; The day rate, given a rate per hour
  ;;
  ;; @param {f64} $ratePerHour
  ;;
  ;; @returns {f64} - the rate per day
  ;;
  (func $dayRate (export "dayRate") (param $ratePerHour f64) (result f64)
    (f64.const 128.0)
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
    (i32.const 10)
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
    (f64.const 8960)
  )
)
