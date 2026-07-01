# Fuente del banner de email (pie de correos de PVenta)

HTML fuente de los banners que viven en `public/email/campana-es.png` y
`public/email/campana-en.png` (servidos en `https://xoultec.com/email/campana-*.png`).
Ver el brief: `marketing/brief-banner-email-pventa.md`.

**Los nombres de los PNG NO cambian entre campañas** — para rotar el creativo se
edita el HTML de aquí, se re-renderiza, se **sobrescriben** los PNG y se hace push.
PVenta apunta siempre a las mismas 2 URLs, no hay que tocar su repo.

## Especificación
- 1200 × 300 px (proporción 4:1), PNG, < 150 KB, sin animación.
- Fondo azul marino de marca (degradado **vertical** — comprime mucho mejor que uno diagonal).
- Fuente: Poppins (se carga de Google Fonts al renderizar).

## Cómo re-renderizar (Chrome headless, Windows)

```powershell
$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$src    = "C:\Data\4Claude\Repositorios\xoultec-website\marketing\email-banner-src"
$dst    = "C:\Data\4Claude\Repositorios\xoultec-website\public\email"
foreach ($lang in 'es','en') {
  Start-Process $chrome -NoNewWindow -Wait -ArgumentList @(
    '--headless','--disable-gpu','--no-sandbox','--hide-scrollbars',
    '--force-device-scale-factor=1','--virtual-time-budget=4000',
    '--window-size=1200,300',
    "--screenshot=$dst\campana-$lang.png",
    ("file:///" + "$src\banner_$lang.html".Replace('\','/'))
  )
}
```

Verificar que cada PNG salga **1200×300 y < 150 KB** antes de hacer push.
