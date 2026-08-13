/**
 * Graba el TV simulado del GPS a video, sin que nadie tenga que capturar pantalla.
 *
 * Por qué existe: el reel necesita el TV en movimiento (la ficha rota sola cada 2.6 s),
 * y la grabación que hizo Rubén el 13-ago era del TV REAL — razones sociales y vendedores
 * de un tenant vivo. Regla del 9-ago: nada de datos reales de clientes.
 *
 * Cómo: Chrome headless a 1080×1920 + CDP Page.captureScreenshot en bucle.
 *
 * ⚠️ NO usar Page.startScreencast: solo entrega fotograma cuando la página repinta, y en
 * headless las animaciones CSS no lo disparan — en una prueba de 22 s llegaron 3 fotogramas.
 * Capturando nosotros salen todos, y se guarda la marca de tiempo real de cada uno para que
 * ffmpeg respete el ritmo aunque alguna captura tarde de más.
 *
 *   node grabar-tv.js [segundos] [fps]
 */

const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const FFMPEG = path.join(os.homedir(),
  'AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe',
  'ffmpeg-9.0-full_build/bin/ffmpeg.exe');
const PAGINA = 'file:///C:/Data/4Claude/Repositorios/xoultec-website/marketing/instagram/post-graphics-src/gps-tv-simulado.html';
const SALIDA = 'C:/Data/4Claude/Repositorios/xoultec-website/marketing/instagram/gps-tv-reel.mp4';

const SEGUNDOS = Number(process.argv[2] || 20);
const FPS = Number(process.argv[3] || 15);
const PUERTO = 9333;
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tvgps-'));

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  const chrome = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${PUERTO}`,
    '--window-size=1080,1920',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    `--user-data-dir=${path.join(tmp, 'perfil')}`,
    PAGINA,
  ], { stdio: 'ignore' });

  // El puerto tarda en abrir; se reintenta en vez de dormir a ciegas.
  let ws = null;
  for (let i = 0; i < 40 && !ws; i++) {
    await esperar(500);
    try {
      const lista = await (await fetch(`http://127.0.0.1:${PUERTO}/json/list`)).json();
      const pagina = lista.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (pagina) ws = pagina.webSocketDebuggerUrl;
    } catch { /* aún no levanta */ }
  }
  if (!ws) { chrome.kill(); throw new Error('Chrome no abrió el puerto de depuración'); }

  const sock = new WebSocket(ws);
  let id = 0;
  const pendientes = new Map();
  await new Promise((listo) => { sock.addEventListener('open', listo); });
  sock.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pendientes.has(msg.id)) { pendientes.get(msg.id)(msg.result); pendientes.delete(msg.id); }
  });
  const cmd = (method, params = {}) => new Promise((res) => {
    const i = ++id; pendientes.set(i, res);
    sock.send(JSON.stringify({ id: i, method, params }));
  });

  await esperar(2000);                       // que termine de pintar el primer render

  console.log(`grabando ${SEGUNDOS}s a ~${FPS} fps...`);
  const frames = [];
  const intervalo = 1000 / FPS;
  const arranque = Date.now();
  const fin = arranque + SEGUNDOS * 1000;
  while (Date.now() < fin) {
    const objetivo = arranque + frames.length * intervalo;
    const espera = objetivo - Date.now();
    if (espera > 0) await esperar(espera);
    const t = (Date.now() - arranque) / 1000;
    const r = await cmd('Page.captureScreenshot', { format: 'jpeg', quality: 92 });
    frames.push({ data: r.data, t });
  }

  sock.close();
  chrome.kill();

  if (frames.length < 10) throw new Error(`solo llegaron ${frames.length} fotogramas`);

  // Duración real de cada fotograma, para que el video respete el ritmo original.
  const lista = [];
  for (let i = 0; i < frames.length; i++) {
    const archivo = path.join(tmp, `f${String(i).padStart(5, '0')}.jpg`);
    fs.writeFileSync(archivo, Buffer.from(frames[i].data, 'base64'));
    const dur = i < frames.length - 1 ? frames[i + 1].t - frames[i].t : 0.08;
    lista.push(`file '${archivo.replace(/\\/g, '/')}'`, `duration ${Math.max(dur, 0.01).toFixed(4)}`);
  }
  lista.push(`file '${path.join(tmp, `f${String(frames.length - 1).padStart(5, '0')}.jpg`).replace(/\\/g, '/')}'`);
  const concat = path.join(tmp, 'lista.txt');
  fs.writeFileSync(concat, lista.join('\n'));

  const dur = frames[frames.length - 1].t - frames[0].t;
  console.log(`${frames.length} fotogramas en ${dur.toFixed(1)}s (${(frames.length / dur).toFixed(1)} fps)`);

  execFileSync(FFMPEG, [
    '-y', '-f', 'concat', '-safe', '0', '-i', concat,
    '-vf', 'scale=1080:1920:flags=lanczos,fps=30',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20', '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart', SALIDA,
  ], { stdio: 'inherit' });

  // Chrome suele dejar el perfil bloqueado un momento; si no se puede borrar, no importa.
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch { /* lo limpia Windows */ }
  console.log(`listo: ${SALIDA}`);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
