(module
  (memory (export "mem") 1)

  (data (i32.const 0) "Happy Birthday! What a youngmature fellow you are.Congratulations !\nClass of Your sign costs .00 .")

  (global $outputOffset i32 (i32.const 1024))

  ;;
  ;; write - writes string to output, return new length
  ;;
  ;; @param {i32} $offset - offset of the string in linear memory
  ;; @param {i32} $length - length of the string in linear memory
  ;; @param {i32} $outputLength - current output length
  ;; @returns {i32} - new output length
  ;;
  (func $write (param $offset i32) (param $length i32) (param $outputLength i32) (result i32)
    (memory.copy (i32.add (global.get $outputOffset) (local.get $outputLength)) (local.get $offset) (local.get $length))
    (i32.add (local.get $outputLength) (local.get $length))
  )

  ;;
  ;; writeNumber - writes number as string to output, return new length
  ;;
  ;; @param {i32} $number - number to write as string
  ;; @param {i32} $outputLength - current output length
  ;; @returns {i32} - new output length
  ;;
  (func $writeNumber (param $number i32) (param $outputLength i32) (result i32)
    (local $digits i32)
    (local $tmp i32)
    (local.set $tmp (local.get $number))
    (loop $countDigits (if (local.get $tmp) (then 
      (local.set $tmp (i32.div_u (local.get $tmp) (i32.const 10)))
      (local.set $digits (i32.add (local.get $digits) (i32.const 1)))
      (br $countDigits))))
    (local.set $tmp (i32.add (local.get $outputLength) (local.get $digits)))
    (loop $writeDigits
      (local.set $digits (i32.sub (local.get $digits) (i32.const 1)))
      (i32.store8 (i32.add (global.get $outputOffset) (i32.add (local.get $outputLength) (local.get $digits)))
        (i32.add (i32.rem_u (local.get $number) (i32.const 10)) (i32.const 48)))
      (local.set $number (i32.div_u (local.get $number) (i32.const 10)))
    (br_if $writeDigits (local.get $digits)))
    (local.get $tmp)
  )

  ;;
  ;; buildSign - build the sign for the given person and occassion
  ;;
  ;; @param {i32} $occassionOffset - offset of the occassion in linear memory
  ;; @param {i32} $occassionLength - length of the occassion in linear memory
  ;; @param {i32} $nameOffset - offset of the name in linear memory
  ;; @param {i32} $nameLength - length of the name in linear memory
  ;; @returns {(i32,i32)} - offset and length of the sign in linear memory
  ;;
  (func (export "buildSign") (param $occassionOffset i32) (param $occassionLength i32) (param $nameOffset i32) (param $nameLength i32) (result i32 i32)
    (local $outputLength i32)
    (local.set $outputLength (call $write (i32.const 0) (i32.const 6) (local.get $outputLength)))
    (local.set $outputLength (call $write (local.get $occassionOffset) (local.get $occassionLength) (local.get $outputLength)))
    (local.set $outputLength (call $write (i32.const 5) (i32.const 1) (local.get $outputLength)))
    (local.set $outputLength (call $write (local.get $nameOffset) (local.get $nameLength) (local.get $outputLength)))
    (local.set $outputLength (call $write (i32.const 14) (i32.const 1) (local.get $outputLength)))
    (global.get $outputOffset) (local.get $outputLength)
  )

  ;;
  ;; birthdaySign - build the sign for a person of a given age
  ;;
  ;; @param {i32} $age - the age of the person
  ;; @returns {(i32,i32)} - offset and length of the sign in linear memory
  ;;
  (func (export "buildBirthdaySign") (param $age i32) (result i32 i32)
    (local $outputLength i32)
    (local.set $outputLength (call $write (i32.const 0)
      (select (i32.const 23) (i32.const 28) (i32.ge_u (local.get $age) (i32.const 50)))
      (local.get $outputLength)))
    (local.set $outputLength (call $write
      (select (i32.const 28) (i32.const 34) (i32.ge_u (local.get $age) (i32.const 50)))
      (select (i32.const 22) (i32.const 16) (i32.ge_u (local.get $age) (i32.const 50)))
      (local.get $outputLength)))
    (global.get $outputOffset) (local.get $outputLength)
  )

  ;;
  ;; graduationFor - build a sign for the graduation of a person in a certain year
  ;;
  ;; @param {i32} $nameOffset - offset of the name in linear memory
  ;; @param {i32} $nameLength - length of the name in linear memory
  ;; @param {i32} $year - 4 digit year
  ;; @returns {(i32,i32)} - offset and length of the sign in linear memory
  ;;
  (func (export "graduationFor") (param $nameOffset i32) (param $nameLength i32) (param $year i32) (result i32 i32)
    (local $outputLength i32)
    (local.set $outputLength (call $write (i32.const 50) (i32.const 16) (local.get $outputLength)))
    (local.set $outputLength (call $write (local.get $nameOffset) (local.get $nameLength) (local.get $outputLength)))
    (local.set $outputLength (call $write (i32.const 66) (i32.const 11) (local.get $outputLength)))
    (local.set $outputLength (call $writeNumber (local.get $year) (local.get $outputLength)))
    (global.get $outputOffset) (local.get $outputLength)
  )

  ;;
  ;; costOf - write a quotation for the cost of a sign
  ;;
  ;; @param {i32} $signOffset - offset of the sign in linear memory
  ;; @param {i32} $signLength - length of the sign in linear memory
  ;; @param {i32} $currencyOffset - offset of the currency in linear memory
  ;; @param {i32} $currencyLength - length of the currency in linear memory
  ;; @returns {(i32,i32)} - offset and length of the quotation in linear memory
  ;;
  (func (export "costOf") (param $signOffset i32) (param $signLength i32) (param $currencyOffset i32) (param $currencyLength i32) (result i32 i32)
    (local $outputLength i32)
    (local.set $outputLength (call $write (i32.const 77) (i32.const 16) (local.get $outputLength)))
    (local.set $outputLength (call $writeNumber (i32.shl (i32.add (i32.const 10) (local.get $signLength)) (i32.const 1)) (local.get $outputLength)))
    (local.set $outputLength (call $write (i32.const 93) (i32.const 4) (local.get $outputLength)))
    (local.set $outputLength (call $write (local.get $currencyOffset) (local.get $currencyLength) (local.get $outputLength)))
    (local.set $outputLength (call $write (i32.const 97) (i32.const 1) (local.get $outputLength)))
    (global.get $outputOffset) (local.get $outputLength)
  )
)
