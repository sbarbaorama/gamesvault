# Libreria Giochi PC

App web installabile (PWA) per consultare e gestire un catalogo personale di giochi per PC: copertine, screenshot, piattaforma di acquisto (Steam, Epic, GOG, Amazon, EA), genere, anno, sviluppatore, publisher e prezzo pagato.

Questo repository contiene **solo il codice**: nessun dato personale. I dati stanno in un repository GitHub **privato** separato, a cui l'app si collega con un token personale salvato soltanto sul dispositivo.

## Contenuto

| File | Cosa contiene |
|---|---|
| `index.html` | L'app |
| `sw.js` | Service worker: avvio rapido e consultazione offline |
| `manifest.webmanifest`, `icons/` | Nome, colori e icone per l'installazione |
| `vendor/` | Librerie per leggere i file Excel e zip (SheetJS, JSZip) |

## Pubblicazione

Settings → Pages → Deploy from a branch → `main` / root. L'app funziona su qualunque hosting statico in https.

## Dati

Il repository dei dati deve contenere `dati/giochi.json`, `dati/info.json`, `dati/img/`, `media/` e, per la ricerca automatica delle copertine, `.github/workflows/cerca-copertine.yml`.
