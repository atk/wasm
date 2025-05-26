(module
  (memory (export "mem") 1)

  (data (i32.const 0) ", please")

  ;;
  ;; frontDoorResponse - Respond with the first character given an input
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "frontDoorResponse") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (local.get $inputOffset) (i32.const 1)
  )

  ;;
  ;; frontDoorPassword - Format the password for the front door as a noun
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func $frontDoorPassword (export "frontDoorPassword") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (local $idx i32)
    (local $char i32)
    (loop $letters
      (local.set $char (i32.load8_u (i32.add (local.get $inputOffset) (local.get $idx))))
      (i32.store8 (i32.add (local.get $inputOffset) (local.get $idx))
        (select (i32.or (local.get $char) (i32.const 32)) (i32.and (local.get $char) (i32.const 223)) (local.get $idx)))
      (local.set $idx (i32.add (local.get $idx) (i32.const 1)))
    (br_if $letters (i32.lt_u (local.get $idx) (local.get $inputLength))))
    (local.get $inputOffset) (local.get $inputLength)
  )

  ;;
  ;; backDoorResponse - Respond with the last character given an input
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "backDoorResponse") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (local.set $inputOffset (i32.add (local.get $inputOffset) (local.get $inputLength)))
    (loop $trim
      (local.set $inputOffset (i32.sub (local.get $inputOffset) (i32.const 1)))
    (br_if $trim (i32.lt_u (i32.load8_u (local.get $inputOffset)) (i32.const 65))))
    (local.get $inputOffset) (i32.const 1)
  )

  ;;
  ;; backDoorPassword - Format the password for the back door, given the response
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "backDoorPassword") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (memory.copy (i32.add (call $frontDoorPassword (local.get $inputOffset) (local.get $inputLength)))
      (i32.const 0) (i32.const 8))
    (local.get $inputOffset) (i32.add (local.get $inputLength) (i32.const 8))
  )
)
