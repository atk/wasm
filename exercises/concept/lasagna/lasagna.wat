;;
;; 👋🏽 Hi there!
;;
;; On the Web Assembly track, we provide you with stubs. These stubs provide
;; a starting point to solving the exercise.
;;
;; Every exported global and function will have a WADoc (similar to JSDoc,
;; but for Web Assembly) comment block explaining what it is supposed to do.
;; The function signatures will also be provided.
;;
;; 💡 You can remove those comments after reading them. They don't add value
;; to your finished solution. You can also remove the whole stub if you want.
;;
;; Good luck preparing some lasagna!
;;
(module
  ;;
  ;; The time in minutes it takes to prepare a single layer
  ;;
  (global $PREPARATION_MINUTES_PER_LAYER i32 (i32.const 2))

  ;;
  ;; Determines the number of minutes the lasagna still needs to remain in the
  ;; oven to be properly prepared.
  ;;
  ;; @param {i32} $actualMinutesInOven - already passed minutes
  ;;
  ;; @returns {i32} - the number of minutes still remaining
  ;;
  (func (export "remainingMinutesInOven") (param $actualMinutesInOven i32) (result i32)
    (i32.const -1) ;; replace with your implementation
  )

  ;;
  ;; Given a number of layers, calculate the total preparation time
  ;;
  ;; @param {i32} $layers - number of layers
  ;;
  ;; @returns {i32} - preparation time in minutes
  ;;
  (func (export "preparationTimeInMinutes") (param $layers i32) (result i32)
    (i32.const -1) ;; replace with your implementation
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
    (i32.const -1) ;; replace with your implementation
  )
)
