# Vanavond

**Wat eten we vanavond?** De zin die in bijna elk huis rond zessen valt. Vanavond maakt er een besluit van, op basis van wat er al in je kast ligt.

**Live:** https://mariusvanderkolk-arch.github.io/vanavond-app/

Een kleine, snelle webapp (PWA) in het Nederlands. Alles draait in je browser: er is geen account, geen server en geen database. Wat je aanvinkt wordt bewaard in `localStorage` op je eigen apparaat.

## Wat kan het?

- **Vanavond**: één concreet voorstel voor vanavond, gerangschikt op wat je al in huis hebt. Met filters voor tijd (20 tot 60 min), dieet (alles, vegetarisch, vegan), stemming (snel, comfort, licht, budget) en het aantal personen. Niet tevreden? Vraag een ander voorstel, of laat *Ik kan niet kiezen* je er één voor één doorheen leiden.
- **Kast**: tik aan wat er in huis is, of zet in één keer de *Basisvoorraad* of de *Groentelade* aan. Met zoeken.
- **Week**: plan zeven avonden. *Vul open avonden* kiest per dag het recept dat het best bij je kast past, zonder herhaling.
- **Lijst**: een boodschappenlijst met alleen wat je nog niet hebt, opgeteld over de geplande avonden en omgerekend naar het aantal personen. Afvinken in de winkel.
- **Recepten**: 11 recepten met foto, ingrediënten (met *Heb ik*-knop) en stappen. Bewaar je favorieten.
- **Installeerbaar**: als app op je telefoon of computer te zetten, en werkt daarna ook offline.

Op desktop staat de navigatie in een zijbalk, op mobiel in een tabbalk onderaan.

## Zelf draaien

Je hebt [Node.js](https://nodejs.org) 20.19 of nieuwer nodig.

```bash
npm install      # afhankelijkheden installeren
npm run dev      # ontwikkelserver op http://localhost:5173
npm run build    # productieversie bouwen in de map dist/
npm run preview  # de gebouwde versie lokaal bekijken
```

De PWA-iconen maak je opnieuw uit de SVG-bronnen met `npm run icons`.

## Techniek

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4, met de kleuren en lettertypes (Fraunces en Outfit) als thema in `src/index.css`
- [Zustand](https://zustand.docs.pmnd.rs) voor de toestand, bewaard in `localStorage`
- [Lucide](https://lucide.dev) voor de iconen

```
src/
  data/        recepten en ingrediënten (gewone TypeScript-bestanden)
  lib/         rekenwerk: voorstellen, boodschappenlijst, datums, opslag
  components/  knoppen, navigatie, receptkaarten, receptvenster
  views/       de vier onderdelen: Vanavond, Kast, Week, Lijst
public/
  recepten/    receptfoto's
  icons/       app-iconen (SVG-bronnen en PNG's)
```

### Een recept toevoegen

1. Zet een foto (3:2, bijvoorbeeld 1728×1152) in `public/recepten/`.
2. Voeg het recept toe aan `src/data/recipes.ts`. Hoeveelheden zijn voor 2 personen; de app rekent ze om.
3. Gebruik ingrediënten uit `src/data/ingredients.ts`, of voeg daar een nieuw ingrediënt toe.

## Gratis online zetten

De map `dist/` is een statische site. Die kun je gratis hosten.

**Vercel**
1. Log in op [vercel.com](https://vercel.com) met je GitHub-account en kies *Add New → Project*.
2. Kies deze repository. Vercel herkent Vite vanzelf (build: `npm run build`, map: `dist`).
3. Klik op *Deploy*.

**Netlify**
1. Log in op [netlify.com](https://www.netlify.com) en kies *Add new site → Import an existing project*.
2. Kies deze repository, build command `npm run build`, publish directory `dist`.
3. Klik op *Deploy*.

**GitHub Pages** (zo draait deze repository)
1. De workflow `.github/workflows/pages.yml` bouwt de app bij elke push naar `main`, met `VITE_BASE=/<repo-naam>/`, en zet `dist/` op GitHub Pages.
2. Eenmalig: zet in de repository-instellingen onder *Pages* de bron op *GitHub Actions*.
3. Zelf met de hand bouwen voor Pages kan ook: `VITE_BASE=/vanavond-app/ npm run build`.

GitHub Pages is gratis voor openbare repositories. Voor een privé-repository vraagt Pages om een betaald abonnement; Vercel en Netlify werken wel gratis met privé-repositories.

## Licentie

MIT, zie [LICENSE](LICENSE).
