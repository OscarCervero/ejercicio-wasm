;; takeuchi.wat
;; Implementacion plana y robusta de Takeuchi

(module
  (func $tak (param $x i32) (param $y i32) (param $z i32) (result i32)
    ;; Comparamos si x <= y
    local.get $x
    local.get $y
    i32.le_s
    (if (result i32)
      (then
        ;; Caso base: devuelve y
        local.get $y
      )
      (else
        ;; Preparamos el 1er argumento: tak(x - 1, y, z)
        local.get $x
        i32.const 1
        i32.sub
        local.get $y
        local.get $z
        call $tak

        ;; Preparamos el 2do argumento: tak(y - 1, z, x)
        local.get $y
        i32.const 1
        i32.sub
        local.get $z
        local.get $x
        call $tak

        ;; Preparamos el 3er argumento: tak(z - 1, x, y)
        local.get $z
        i32.const 1
        i32.sub
        local.get $x
        local.get $y
        call $tak

        ;; Llamada externa: tak(arg1, arg2, arg3)
        call $tak
      )
    )
  )

  (export "tak" (func $tak))
)