(module
  (memory (export "mem") 1)

  ;;
  ;; frontDoorResponse - Respond with the first character given an input
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "frontDoorResponse") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (i32.const 0) (i32.const 0)
  )

  ;;
  ;; frontDoorPassword - Format the password for the front door as a noun
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func $frontDoorPassword (export "frontDoorPassword") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (i32.const 0) (i32.const 0)
  )

  ;;
  ;; backDoorResponse - Respond with the last character given an input
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "backDoorResponse") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (i32.const 0) (i32.const 0)
  )

  ;;
  ;; backDoorPassword - Format the password for the back door, given the response
  ;;
  ;; @param {i32} $inputOffset - offset of the input in linear memory
  ;; @param {i32} $inputLength - length of the input in linear memory
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "backDoorPassword") (param $inputOffset i32) (param $inputLength i32) (result i32 i32)
    (i32.const 0) (i32.const 0)
  )
)
