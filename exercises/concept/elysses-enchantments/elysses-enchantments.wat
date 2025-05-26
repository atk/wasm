(module
  (memory (export "mem" 1))

  ;;
  ;; getItem - Gets an item from a i32 array by index
  ;;
  ;; @param {i32} $inputOffset - offset of the array in linear memory
  ;; @param {i32} $inputLength - length of the array in linear memory
  ;; @param {i32} $index - index of the item
  ;; @returns {i32} - item at index
  ;;
  (func (export "getItem") (param $inputOffset i32) (param $inputLength i32) (param $index i32) (result i32)
    (i32.const 0)
  )

  ;;
  ;; setItem - Overwrites an item in an i32 array at index
  ;;
  ;; @param {i32} $inputOffset - offset of the array in linear memory
  ;; @param {i32} $inputLength - length of the array in linear memory
  ;; @param {i32} $index - index of the item
  ;; @param {i32} $item - item to replace the one at index
  ;;
  (func (export "setItem") (param $inputOffset i32) (param $inputLength i32) (param $index i32) (param $item i32))

  ;;
  ;; insertItemAtTop - Appends an item at the end of an i32 array
  ;; 
  ;; @param {i32} $inputOffset - offset of the array in linear memory
  ;; @param {i32} $inputLength - length of the array in linear memory
  ;; @param {i32} $item - item to add at the end
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "insertItemAtTop") (param $inputOffset i32) (param $inputLength i32) (param $item i32) (result i32 i32)
    (local.get $inputOffset) (local.get $inputLength)
  )

  ;;
  ;; insertItemAtBottom - Inserts an item at the start of an i32 array
  ;;
  ;; @param {i32} $inputOffset - offset of the array in linear memory
  ;; @param {i32} $inputLength - length of the array in linear memory
  ;; @param {i32} $item - item to be inserted at the start
  ;; @returns {(i32,i32)} - offset and length of the output in linear memory
  ;;
  (func (export "insertItemAtBottom") (param $inputOffset i32) (param $inputLength i32) (param $item i32) (result i32 i32)
    (local.get $inputOffset) (local.get $inputLength)
  )

  ;;
  ;; removeItem - Removes an item from an i32 array at index
  ;;

  ;;
  ;; removeItemFromTop - Removes an item at the end of an i32 array
  ;;

  ;;
  ;; checkSizeOfStack - Checks the size of an i32 array
  ;;
)
