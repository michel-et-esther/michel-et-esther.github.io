# Invitation au mariage de Michel & Esther

Faire-part web pour le mariage de **Michel & Esther**, le **samedi 31 octobre 2026**
à Port-Bouët (Abidjan, Côte d'Ivoire).

Voir en ligne : https://michel-et-esther.github.io/

## Le déroulé de la page

1. **La porte** — porte sculptée en vert d'eucalyptus qui s'ouvre sur « Touchez pour entrer »
2. **Héros** — monogramme M&E, prénoms, date et lieu, sur photo plein écran
3. **Carte d'invitation** — les familles YAO & KONGOZA, les noms des mariés, verset
4. **Notre histoire** — frise de quatre étapes, chaque photo s'agrandit au clic
5. **Le programme de la journée** — cérémonie civile, bénédiction, réception
6. **Compte à rebours** — jusqu'au 31 octobre 2026 à 12h30
7. **Les lieux** — les trois adresses, avec itinéraire Google Maps
8. **RSVP** — formulaire qui envoie la réponse par WhatsApp, puis les contacts téléphoniques

## Le programme

| Heure | Moment | Lieu |
|-------|--------|------|
| 12:30 | Cérémonie civile | Hôtel communal de Port-Bouët |
| 13:30 | Bénédiction nuptiale | Église Vase d'Honneur, Centre Doxa, Port-Bouët |
| 15:00 | Réception | Salle de la cantine de la mairie de Port-Bouët, au sein du Centre Pilote |

## La palette

Reprise du nuancier choisi par les mariés — sauge, bleu poudré et ivoire — avec un
champagne pâle pour les ornements (monogramme, filets, boutons).

| Rôle | Teinte |
|------|--------|
| Sauge profonde | `#26302b` → `#45544c` |
| Sauge du nuancier | `#737e6e`, `#9ba998` |
| Bleu poudré | `#232d36`, `#8798a8`, `#c4cfe1` |
| Ivoire | `#f8f6f1`, `#ece8de` |
| Champagne | `#6b5c34` → `#f2ead2` |

Les sections sombres alternent volontairement : sauge pour le compte à rebours,
bleu poudré pour le RSVP.

## Modifier le contenu

Tout ce qui change souvent est regroupé dans l'objet `CONFIG`, en haut de
[`assets/js/main.js`](assets/js/main.js) :

| Clé | Rôle |
|-----|------|
| `dateMariage` | Cible du compte à rebours (heure d'Abidjan, UTC+0) |
| `whatsapp` | Numéro qui reçoit les confirmations, format international sans `+` |
| `musique` | Chemin du fichier audio d'ambiance |
| `photos` | Les photos de la galerie, dans l'ordre de la frise |

Les textes (prénoms, familles, verset, horaires, adresses) et les trois numéros de
téléphone sont directement dans [`index.html`](index.html). Les couleurs et les tailles
sont des variables CSS en tête de [`assets/css/style.css`](assets/css/style.css).

### Changer le numéro qui reçoit les RSVP

Une seule ligne, dans `assets/js/main.js` :

```js
whatsapp: "2250789710514",   // format international, sans le +
```

### Ajouter la musique d'ambiance

Déposer un fichier `assets/audio/ambiance.mp3`. Le bouton son apparaît tout seul dès que
le fichier est disponible, et reste masqué sinon. Aucune autre modification n'est requise.

## Organisation des fichiers

```
index.html                    le faire-part du 31 octobre 2026
assets/css/style.css          styles et animations
assets/js/main.js             porte, compte à rebours, galerie, RSVP
assets/img/hero*.jpg          héros : plein cadre (mobile), portrait encadré et
                              fond adouci (grand écran)
assets/img/story/             les quatre photos de la frise
assets/img/banner-*.jpg       textures photographiques des sections sombres
assets/img/*.svg              bouquet, panneau de porte, favicon
```

## Notes techniques

- Aucune dépendance ni étape de compilation : c'est du HTML, CSS et JavaScript simples.
  Les seules ressources externes sont les polices Google Fonts.
- Le héros a deux mises en page : en mobile la photo occupe tout l'écran et le texte se
  répartit haut et bas pour dégager les visages ; sur grand écran le texte passe à gauche
  et la photo est présentée encadrée à droite, sur un fond volontairement adouci.
- Les animations respectent `prefers-reduced-motion` : elles se désactivent pour les
  personnes qui ont demandé à limiter les effets de mouvement.
- Le RSVP ne stocke rien et n'utilise aucun serveur : il prépare un message WhatsApp que
  l'invité envoie lui-même.
- Testé de 390 px (mobile) à 1440 px (ordinateur), sans débordement horizontal.
