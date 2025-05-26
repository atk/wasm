(module
  ;;
  ;; The fast attack is available when the knight is sleeping.
  ;;
  ;; @param {i32} $knightIsAwake
  ;;
  ;; @returns {i32} Whether or not you can execute a fast attack.
  ;;
  (func (export "canExecuteFastAttack") (param $knightIsAwake i32) (result i32)
    (i32.const 1)
  )

  ;;
  ;; A useful spy captures information, which they can't do if everyone's asleep.
  ;;
  ;; @param {i32} $knightIsAwake
  ;; @param {i32} $archerIsAwake
  ;; @param {i32} $prisonerIsAwake
  ;;
  ;; @returns {i32} Whether or not you can spy on someone.
  ;;
  (func (export "canSpy") (param $knightIsAwake i32) (param $archerIsAwake i32)
    (param $prisonerIsAwake i32) (result i32)
    (i32.const 0)
  )

  ;;
  ;; The archer will intercept the signal, and a sleeping prisoner will miss it.
  ;;
  ;; @param {i32} $archerIsAwake
  ;; @param {i32} $prisonerIsAwake
  ;;
  ;; @returns {i32} Whether or not you can send a signal to the prisoner.
  ;;
  (func (export "canSignalPrisoner") (param $archerIsAwake i32) (param $prisonerIsAwake i32) (result i32)
    (i32.const 1)
  )

  ;;
  ;; Annalyns friend can be freed in two ways: the archer sleeps while the pet dog is present
  ;; or both archer and knights are asleep while the prisoner is awake.
  ;;
  ;; @param {i32} $knightIsAwake
  ;; @param {i32} $archerIsAwake
  ;; @param {i32} $prisonerIsAwake
  ;; @param {i32} $petDogIsPresent
  ;;
  ;; @returns {i32} Whether or not you can free Annalyn's friend.
  ;;
  (func (export "canFreePrisoner") (param $knightIsAwake i32) (param $archerIsAwake i32)
    (param $prisonerIsAwake i32) (param $petDogIsPresent i32) (result i32)
    (i32.const 0)
  )
)
