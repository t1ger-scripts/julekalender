# Ringsted Dun - Julekalender

Skoleprojekt udviklet med React, TypeScript, Vite og SCSS.

## Status

Projektets grundstruktur er oprettet. Arbejdsfilerne indeholder
formålskommentarer, men funktionaliteten er endnu ikke implementeret.
En tom side ved opstart er derfor forventet.

## Lokal opsætning

Installér Node.js med npm. Kør derefter fra projektets rod:

```bash
npm ci
npm run dev
```

Åbn localhost-adressen fra terminalen.

## Kommandoer

```bash
npm run dev      # Starter udviklingsserveren
npm run build    # Kontrollerer TypeScript og bygger projektet
npm run preview  # Viser det byggede projekt lokalt
npm run lint     # Kontrollerer koden med ESLint
```

## Projektstruktur

| Mappe | Formål |
|---|---|
| public/data | Kalenderens lokale JSON-indhold |
| public/images | Billeder og grafik |
| src/components | Genbrugelige UI-komponenter |
| src/components/activities | Kalenderens fem aktivitetstyper |
| src/templates | Sidens layout |
| src/pages | Samler data, fælles state og komponenter |
| src/api | Indlæsning af lokal JSON |
| src/types | Fælles TypeScript-interfaces og typer |
| src/utils | Hjælpefunktioner og lokal lagring |
| src/styles | SCSS og fælles design tokens |

## Atomic Design

Komponenterne opdeles efter ansvar og genbrug:
atomer, molekyler, organismer, templates og sider.
Niveauerne dokumenteres, selvom komponentmapperne ikke er navngivet efter dem.

## Planlagt dataflow

- Kalenderindhold indlæses fra public/data/doors.json.
- CalendarPage ejer den fælles state.
- Aktiviteter melder gennemførelse tilbage via onComplete.
- Åbnede og gennemførte dage gemmes i localStorage.
- Hver gennemført dagsaktivitet giver ét lod.
- Genbesøg giver ikke ekstra lodder.
- Oversete dage giver ikke mulighed for efterfølgende optjening.

localStorage gælder kun den aktuelle browser og enhed.
Rigtig nyhedsbrevstilmelding og fælles vindertrækning er ikke tilkoblet.

## Samarbejde

- Arbejd på en separat branch til hver opgave.
- Aftal fælles datatyper og props, før komponenterne implementeres.
- Brug fælles design tokens frem for gentagne farvekoder.
- Commit package-lock.json, men aldrig node_modules eller dist.
- Nye SCSS-filer tilkobles i src/styles/style.scss.

## Afprøvning af kalenderen

Start projektet lokalt:

```bash
npm ci
npm run dev
```

Åbn adressen fra terminalen.

Klik på **Udviklerværktøjer** nederst til venstre. Her kan du:

- Vælge kalenderdato uden at ændre computerens dato.
- Nulstille gennemførte aktiviteter, lodder og belønninger.

Eksempler på spilledatoer:

| Dato | Aktivitet |
|---|---|
| 29. november 2026 | Quiz |
| 2. december 2026 | Pudeflipper |
| 3. december 2026 | Pudematcher |
| 8. december 2026 | Lykkehjul |

Efter gennemførsel kan resultatet genbesøges fra kalenderlågen
eller Mine gaver. Resultater gemmes i browserens localStorage.

Udviklerpanelet vises kun ved `npm run dev`.
Ved genindlæsning bruges startdatoen fra `src/config/dev.ts`.
Gemte resultater bevares, indtil de nulstilles.

`npm run build` og `npm run preview` bruger den faktiske dato,
viser ikke udviklerpanelet og bruger separat lagring.

Daglige lodtrækninger og hovedlodtrækningen juleaften er en del
af konceptet, men selve lodtrækningerne og fælles registrering
af deltagere ligger uden for projektets scope.