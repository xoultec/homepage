# Chequeo automatico del monitoreo de Instagram de @xoultec.
# Lo dispara la tarea programada "XoulTec - Chequeo IG".
#
# Por que existe: el loop de monitoreo vive en una sesion de Claude y muere con la ventana
# (paso el 20-jul-2026: 20 dias sin revisar DMs). Esto lo ancla al Programador de Tareas.
#
# Como sabe si funciono: compara el sello del latido antes y despues. Si la sesion hija no
# llego a sellar, el chequeo NO se hizo -> avisa por Telegram. Un fallo silencioso aqui es
# peor que no tener la tarea.
#
# Requisitos: sesion de Windows iniciada, Chrome abierto y logueado en @xoultec, extension
# de Claude activa. Sin eso la sesion hija no tiene navegador y esto avisa del fallo.

$ErrorActionPreference = 'Continue'

$repo    = 'C:\Data\4Claude\Repositorios\xoultec-website'
$monitor = 'C:\Data\4Claude\Repositorios\Apify\monitor.js'
$latido  = 'C:\Data\4Claude\Repositorios\Apify\campana\ig-latido.json'
$log     = Join-Path $repo '.claude\tareas\chequeo-ig.log'
$claude  = Join-Path $env:USERPROFILE '.local\bin\claude.exe'
$node    = 'C:\Program Files\nodejs\node.exe'
$limiteMin = 12

function Get-Sello {
    try { (Get-Content $latido -Raw -ErrorAction Stop | ConvertFrom-Json).ultimoChequeo }
    catch { $null }
}

$stamp = Get-Date -Format 'yyyy-MM-dd HH:mm'
$antes = Get-Sello

$ask = 'Lee el archivo .claude\tareas\prompt-chequeo-ig.txt y ejecuta al pie de la letra lo que dice. No hagas nada mas.'

# OJO: -ArgumentList con un ARRAY une los elementos con espacios y NO los entrecomilla
# (Windows PowerShell 5.1). El 24-ago-2026, en la primera corrida real, eso partio el prompt
# en palabras sueltas y la sesion hija recibio solo "Lee": se quedo sin instrucciones y el
# chequeo no se hizo. El prompt tiene que viajar como UN solo argumento entrecomillado.
$argumentos = '--permission-mode acceptEdits "{0}"' -f $ask

$p = Start-Process -FilePath $claude `
                   -ArgumentList $argumentos `
                   -WorkingDirectory $repo -PassThru

$termino = $p.WaitForExit($limiteMin * 60 * 1000)
if (-not $termino) {
    Stop-Process -Id $p.Id -Force -ErrorAction SilentlyContinue
}

Start-Sleep -Seconds 3
$despues = Get-Sello

if ($despues -and $despues -ne $antes) {
    Add-Content -Path $log -Encoding utf8 -Value "$stamp | ok | latido sellado $despues"
} else {
    $razon = if ($termino) { 'la sesion termino sin sellar' } else { "se colgo y la mate a los $limiteMin min" }
    Add-Content -Path $log -Encoding utf8 -Value "$stamp | fallo | $razon"
    $nota = "Chequeo IG automatico FALLO ($stamp): $razon. El monitoreo de @xoultec NO se hizo en esta pasada. Revisa que Chrome este abierto y logueado en @xoultec y que la extension de Claude este activa."
    & $node $monitor --nota $nota
}
