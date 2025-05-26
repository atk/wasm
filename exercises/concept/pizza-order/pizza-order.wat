(module
  (memory (export "mem") 1)

  ;;
  ;; pizzaPrice - calculate the price for one pizza described in a string with newline-terminated items
  ;;
  ;; @param {i32} $inputOffset - offset of the description in linear memory 
  ;; @param {i32} $inputLength - length of the description in linear memory
  ;; @returns {f64} - price of the described pizza
  ;;
  (func $pizzaPrice (export "pizzaPrice") (param $inputOffset i32) (param $inputLength i32) (result f64)
    (f64.const 0.0)    
  )

  ;;
  ;; orderPrice - calculate the price for an order of multiple pizzas described in an array of strings
  ;; containing offset/length pairs as u32
  ;;
  ;; @param {i32} $inputOffset - offset of the orders array in linear memory
  ;; @param {i32} $inputLength - count of u32 items in the orders array in linear memory
  ;; @returns {f64} - price of the described order
  ;;
  (func (export "orderPrice") (param $inputOffset i32) (param $inputLength i32) (result f64)
    (f64.const 0.0)      
  )
)
