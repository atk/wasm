(module
  (memory (export "mem") 1)
  
  ;; data format: name + price
  (data (i32.const 1024) "Margherita\07Caprese\09Formaggio\0aExtraSauce\01ExtraToppings\02")

  ;;
  ;; $pizzaPrice - recursively calculate the pizza price
  ;;
  (func $pizzaPrice (param $inputOffset i32) (param $inputLength i32) (param $priceOffset i32) (param $priceIndex i32) (param $mismatch i32) (param $price f64) (result f64)
    (local $pchar i32)
    (local $ichar i32)
    (if (i32.eqz (local.get $inputLength)) (then (return (local.get $price))))
    (local.set $ichar (i32.load8_u (i32.add (local.get $inputOffset) (local.get $priceIndex))))
    (local.set $pchar (i32.load8_u (i32.add (local.get $priceOffset) (local.get $priceIndex))))
    ;; price + letter -> increase priceOffset, set priceIndex to zero, set inputLength to zero
    ;; letter + linebreak -> set mismatch only increase priceOffset
    ;; priceOffset >= 54 -> set priceOffset to zero
    ;; letter + letter -> increase both indices + set mismatch if unequal
    (if (i32.and (i32.ge_u (local.get $pchar) (i32.const 65)) (i32.ge_u (local.get $ichar) (i32.const 65)))
      (then (local.set $inputIndex (i32.add (local.get $inputIndex) (i32.const 1)))
        (local.set $priceIndex (i32.add (local.get $priceIndex) (i32.const 1)))
        (if (i32.ne (local.get $pchar) (local.get $ichar)) (then (local.set $mismatch (i32.const 1))))))
    ;; price + linebreak -> if no mismatch, add to price, add inputLength to inputOffset, reset priceOffset/-Index
    (if (i32.lt_u (local.get $pchar) (i32.const 65)) (then (if (i32.lt_u (local.get $ichar) (i32.const 65))) (then
      (if (i32.eqz (local.get $mismatch)) 
        (then (local.set $price (f64.add (local.get $price) (f64.convert_i32_u (local.get $pchar))))
          (local.set $priceOffset (i32.const 0)) (local.set $priceIndex (i32.const 0))) 
      (else))))
    (else ))
    (call $pizzaPrize (local.get $inputOffset) (local.get $inputLength) (local.get $priceOffset) (local.get $priceIndex) (local.get $mismatch) (local.get $price))
  )

  ;;
  ;; pizzaPrice - calculate the price for one pizza described in a string with newline-terminated items
  ;;
  ;; @param {i32} $inputOffset - offset of the description in linear memory 
  ;; @param {i32} $inputLength - length of the description in linear memory
  ;; @returns {f64} - price of the described pizza
  ;;
  (func (export "pizzaPrice") (param $inputOffset i32) (param $inputLength i32) (result f64)
    (call $pizzaPrice (local.get $inputOffset) (local.get $inputLength) (i32.const 1024) (i32.const 0) (i32.const 0) (f64.const 0.0))
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
