(module
  (memory (export "mem") 1)

  (global $outputOffset i32 (i32.const 1024))

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
    (global.get $outputOffset) (i32.const 0)
  )

  ;;
  ;; birthdaySign - build the sign for a person of a given age
  ;;
  ;; @param {i32} $age - the age of the person
  ;; @returns {(i32,i32)} - offset and length of the sign in linear memory
  ;;
  (func (export "birthdaySign") (param $age i32) (result i32 i32)
    (global.get $outputOffset) (i32.const 0)
  )

  ;;
  ;; graduationSign - build a sign for the graduation of a person in a certain year
  ;;
  ;; @param {i32} $nameOffset - offset of the name in linear memory
  ;; @param {i32} $nameLength - length of the name in linear memory
  ;; @param {i32} $year - 4 digit year
  ;; @returns {(i32,i32)} - offset and length of the sign in linear memory
  ;;
  (func (export "graduationSign") (param $nameOffset i32) (param $nameLength i32) (param $year i32) (result i32 i32)
    (global.get $outputOffset) (i32.const 0)
  )

  ;;
  ;; costOf - write a quotation for the cost of a sign
  ;;
  ;; @param {i32} $signOffset - offset of the sign in linear memory
  ;; @param {i32} $signLength - length of the sign in linear memory
  ;; @returns {(i32,i32)} - offset and length of the quotation in linear memory
  ;;
  (func (export "costOf") (param $signOffset i32) (param $signLength i32) (result i32 i32)
    (global.get $outputOffset) (i32.const 0)
  )
)
