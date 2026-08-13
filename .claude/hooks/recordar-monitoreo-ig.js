// Recordatorio del monitoreo de Instagram de @xoultec.
//
// El loop de monitoreo vive en la memoria de la sesion de Claude: /clear y /compact
// lo borran y no avisan (paso el 20-jul-2026, 20 dias sin revisar DMs). Este hook
// corre en SessionStart y PostCompact, y si la bandera .claude/ig-loop.on existe
// reinyecta las instrucciones para que el asistente vuelva a armar el loop.
//
// Apagar el recordatorio = borrar .claude/ig-loop.on

const fs = require('fs');
const path = require('path');

const RAIZ = path.resolve(__dirname, '..', '..');
const BANDERA = path.join(RAIZ, '.claude', 'ig-loop.on');
const CAMPANA = path.resolve(RAIZ, '..', 'Apify', 'campana');

if (!fs.existsSync(BANDERA)) process.exit(0);

// El evento llega como JSON por stdin; si falla, asumimos SessionStart.
let evento = 'SessionStart';
try {
  evento = JSON.parse(fs.readFileSync(0, 'utf8')).hook_event_name || evento;
} catch {}

// Edad de los latidos sellados: es el dato que dice si el loop murio o no.
// Cada latido guarda su propio campo ISO (`ultimoChequeo` / `ultimoPost`), igual que monitor.js.
function edad(archivo, campo, etiqueta) {
  try {
    const l = JSON.parse(fs.readFileSync(path.join(CAMPANA, archivo), 'utf8'));
    const t = Date.parse(l[campo]);
    if (Number.isNaN(t)) return `${etiqueta}: latido ilegible`;
    return `${etiqueta}: hace ${Math.floor((Date.now() - t) / 3600000)}h (${l[campo]})`;
  } catch {
    return `${etiqueta}: sin latido registrado`;
  }
}

const latido = [
  edad('ig-latido.json', 'ultimoChequeo', 'ultimo chequeo de DMs/comentarios'),
  edad('post-latido.json', 'ultimoPost', 'ultima publicacion'),
].join(' · ');

const instrucciones = fs.readFileSync(BANDERA, 'utf8').trim();

process.stdout.write(JSON.stringify({
  systemMessage: `Monitoreo IG @xoultec ACTIVO — ${latido}. El loop no sobrevive a /clear ni /compact: hay que rearmarlo.`,
  hookSpecificOutput: {
    hookEventName: evento,
    additionalContext: `[Recordatorio automatico del monitoreo de Instagram]\n${latido}\n\n${instrucciones}`,
  },
}));
