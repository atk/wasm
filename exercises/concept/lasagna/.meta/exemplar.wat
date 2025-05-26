(module
  ;;
  ;; The time in minutes it takes to prepare a single layer
  ;;
  (global $PREPARATION_MINUTES_PER_LAYER i32 (i32.const 2))

  ;;
  ;; The amount of minutes the lasagna should be in the oven.
  ;;
  (global $EXPECTED_MINUTES_IN_OVEN (export "EXPECTED_MINUTES_IN_OVEN") i32 (i32.const 40))

  ;;
  ;; Determines the number of minutes the lasagna still needs to remain in the
  ;; oven to be properly prepared.
  ;;
  ;; @param {i32} $actualMinutesInOven - already passed minutes
  ;;
  ;; @returns {i32} - the number of minutes still remaining
  ;;
  (func (export "remainingMinutesInOven") (param $actualMinutesInOven i32) (result i32)
    (i32.sub (global.get $EXPECTED_MINUTES_IN_OVEN) (local.get $actualMinutesInOven))
  )

  ;;
  ;; Given a number of layers, calculate the total preparation time
  ;;
  ;; @param {i32} $layers - number of layers
  ;;
  ;; @returns {i32} - preparation time in minutes
  ;;
  (func $preparationTimeInMinutes (export "preparationTimeInMinutes") (param $layers i32) (result i32)
    (i32.mul (local.get $layers) (global.get $PREPARATION_MINUTES_PER_LAYER))
  )

  ;;
  ;; Calculates the total time required to prepare and bake the lasagna
  ;;
  ;; @param {i32} $layers - number of layers
  ;; @param {i32} $actualMinutesInOven - the number of minutes required to bake the lasagna
  ;;
  ;; @returns {i32} - total time to prepare and bake the lasagna
  ;;
  (func (export "totalTimeInMinutes") (param $layers i32) (param $actualMinutesInOven i32) (result i32)
    (i32.add (local.get $actualMinutesInOven)
      (call $preparationTimeInMinutes (local.get $layers)))
  )
)

