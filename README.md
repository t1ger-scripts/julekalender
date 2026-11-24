# Ringsted Dun – Julekalender 2026

Skoleprojekt udviklet med React, TypeScript, Vite og SCSS.

Kalenderen indeholder 25 låger: 29. november og 1.–24. december.
Den 30. november springes over.

## Lokal opsætning

Installér Node.js 24 LTS med npm, og kør følgende fra projektets rod:

```bash
npm ci
npm run dev
```

Åbn adressen, som vises i terminalen.

## Funktioner

- Fire aktiviteter: lykkehjul, quiz, pudematcher og pudeflipper.
- Gennemførte aktiviteter og belønninger gemmes i browseren.
- Genbesøg viser det gemte resultat uden et nyt spilforsøg.
- Mine resultater giver adgang til gennemførte dages gemte resultater.
- Produktvisning med billede, produktlink og eventuel rabatkode.
- Link til Ringsted Duns nyhedsbrevstilmelding.

Løsningen er tilpasset forskellige desktopstørrelser og viser
enten tre eller fem kalenderlåger.

## Afprøvning

Udviklerpanelet kan aktiveres i `src/config/dev.ts`:

```ts
export const devConfig = {
  enabled: import.meta.env.DEV,
  initialDate: '2026-12-08',
}
```

Med konfigurationen ovenfor vises **Udviklerværktøjer** nederst til venstre ved `npm run dev`.
Her kan kalenderdatoen ændres, og fremgangen nulstilles.

| Testdato | Aktivitet |
|---|---|
| 29. november | Quiz |
| 2. december | Pudeflipper |
| 3. december | Pudematcher |
| 8. december | Lykkehjul |

Ved genindlæsning bruges startdatoen fra konfigurationen.
Gemte resultater bevares, indtil de nulstilles.

Sæt `enabled: false` for at skjule panelet og bruge den faktiske dato i Danmark.
Udviklingsserveren bruger fortsat udviklingens lagring, også når panelet er skjult.
Ved `npm run build` efterfulgt af `npm run preview` bruges den faktiske dato
og produktionens lagring. Panelet er ikke med i produktionsvisningen.

## Data og lagring

Indhold hentes fra lokale JSON-filer:

- `public/data/doors.json`: datoer, aktiviteter og produkter.
- `public/data/activities.json`: aktivitetstekster og spilindstillinger.
- `public/data/quiz.json`: quizspørgsmål og belønninger.

Brugerens resultater gemmes i `localStorage`, ikke i JSON-filerne.
Fremgangen gælder kun den aktuelle browser og enhed.

Udvikling og produktion bruger separate lagringsnøgler.
Rabatkodens tekst dannes ud fra produkt-id og vundet rabatprocent.

## Projektstruktur

| Mappe | Formål |
|---|---|
| `src/components` | Genbrugelige komponenter og visninger |
| `src/components/activities` | De fire spil |
| `src/pages` | Kalendersiden og fælles state |
| `src/templates` | Sidens overordnede layout |
| `src/api` | Indlæsning af JSON |
| `src/types` | Fælles TypeScript-typer og interfaces |
| `src/utils` | Lagring og hjælpefunktioner |
| `src/config` | Udviklerindstillinger |
| `src/styles` | SCSS opdelt i kalender, topområde, modaler, spil og resultater |
| `src/assets/fonts` | De tre anvendte skrifttyper |
| `public/images` | Billeder og ikoner |

Billeder er opdelt efter formål:

| Mappe | Indhold |
|---|---|
| `public/images/backgrounds` | Kalenderens baggrund |
| `public/images/branding` | Logo og gås; gåsen bruges også som favicon |
| `public/images/calendar` | Lågeikoner, adventslys og håndtag |
| `public/images/games/icons` | Spilikoner og ikoner til spilleregler |
| `public/images/games/pillows` | Pudernes for- og bagsider |
| `public/images/games/wheel` | Lykkehjulets felter og pil |
| `public/images/games/quiz` | Quizbilleder |
| `public/images/products` | Dagens produktbilleder |

Opdater billedstier i JSON eller komponenter, hvis en fil flyttes.
Adventslys og lykkehjulsikoner indlæses også via dynamiske stier i koden.

Atomic Design-principper anvendes gennem komponenternes ansvar
og genbrug: fra `Counter` over `Door` og `Calendar` til
`CalendarLayout` og `CalendarPage`.

## Kommandoer

```bash
npm run dev      # Lokal udvikling
npm run build    # TypeScript-kontrol og produktionsbuild
npm run preview  # Lokal visning af produktionsbuild
npm run lint     # ESLint-kontrol
```

## Manuel kontrol

- Skift dato i udviklerpanelet, og afprøv de fire aktivitetstyper.
- Gennemfør en aktivitet, genindlæs, og kontrollér, at resultat og lodder bevares.
- Åbn en gennemført låge og samme dato via Mine resultater; resultatet skal være det samme.
- Kontrollér rabatkode ved rabat og fravær af rabatkode ved lodder eller ingen ekstra gevinst.
- Kontrollér første og sidste dato samt tre/fem låger ved ændret desktopbredde.
- Brug Tab og Shift + Tab til navigation, Enter til åbning og Escape til lukning af modalen.
- Kontrollér, at fokus returnerer til åbningsknappen efter lukning.

## Afgrænsning

Konceptet omfatter en daglig lodtrækning blandt brugere, der
gennemfører dagens aktivitet. Vundne lodder tæller til
hovedlodtrækningen juleaften.

Selve lodtrækningerne, fælles deltagerregistrering og integration
af gyldige rabatkoder i webshoppen ligger uden for projektets scope.
Nyhedsbrevstilmelding foregår på Ringsted Duns egen hjemmeside.
