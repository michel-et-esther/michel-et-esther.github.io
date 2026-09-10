# Faire-part de mariage — passation

> Ce fichier existe **à l'identique dans les deux dépôts** (`invitation-rodrigue-niki`
> et `invitation-esther-michel`), pour qu'une nouvelle session le trouve quel que soit
> le dossier ouvert. Toute mise à jour doit être recopiée dans l'autre.
>
> Dernière mise à jour : 10 septembre 2026.

---

## 1. En un coup d'œil

Deux faire-part web, indépendants, même socle technique. Le second est dérivé du premier.

| | **Rodrigue & Grâce** | **Michel & Esther** |
|---|---|---|
| Rôle | Le mariage de l'utilisateur lui-même | Celui d'un ami (contact WhatsApp « Roro Momo ») |
| Date | Samedi 12 septembre 2026, 12h00 | Samedi 31 octobre 2026, 12h30 |
| Lieu | Yopougon, Abidjan | Port-Bouët, Abidjan |
| Dossier local | `~/Documents/odoo_workspace/invitation-rodrigue-niki` | `~/Documents/odoo_workspace/invitation-esther-michel` |
| Dépôt | `Lagohjean/invitation-rodrigue-niki` | `michel-et-esther/michel-et-esther.github.io` |
| En ligne | https://lagohjean.github.io/invitation-rodrigue-niki/ | https://michel-et-esther.github.io/ |
| Palette | Violet royal + or | Sauge, bleu poudré, ivoire + champagne |
| Branche | `main` | `main` |

Les deux sont publics, servis par GitHub Pages depuis `main` à la racine `/`, en HTTPS forcé.
**Aucune dépendance, aucune étape de build** : HTML + CSS + JS simples. Seule ressource
externe : les polices Google Fonts.

**La langue du projet est le français** — noms de variables, de classes, de fonctions,
commentaires, messages de commit. S'y conformer.

---

## 2. Accès déjà en place

- **`gh` authentifié** sur le compte **`Lagohjean`**, scopes `repo`, `workflow`, `read:org`.
  Permet de créer/transférer/renommer des dépôts et de piloter GitHub Pages par l'API.
- **Organisation `michel-et-esther`** : l'utilisateur en est **admin** (`role=admin`,
  `state=active`). Elle a été créée exprès pour que l'adresse du faire-part de l'ami ne
  contienne pas « lagohjean ».
- **Identité git locale** déjà configurée en global (`user.name = rlagoh`). Ne pas la
  changer. Les commits de cette série ont été faits avec `git -c user.name=rlagoh commit`.
- **Chrome et Firefox headless** disponibles (`google-chrome`, `/snap/bin/chromium`), plus
  `ffmpeg`. **Pillow 9.0.1** est là pour le traitement d'images ; **ImageMagick ne l'est pas**.
  `websocket-client` est installé (utile pour piloter Chrome, voir §7).

### Ce qui n'est pas possible par l'API

**Créer une organisation GitHub.** L'endpoint `POST /admin/organizations` est réservé à
GitHub Enterprise ; sur un compte personnel il renvoie 404. L'utilisateur doit passer par
https://github.com/organizations/plan (plan Free, ~2 min). C'est ainsi qu'a été créée
`michel-et-esther`.

### Attribution des commits

Terminer les messages de commit par :

```
Co-Authored-By: Claude Opus 5 (1M context) <noreply@anthropic.com>
```

et les descriptions de pull request par :

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

---

## 3. Projet 1 — Rodrigue & Grâce

Le faire-part d'origine, dont tout le reste découle. **Ne pas y toucher en travaillant sur
l'autre projet** : c'était une contrainte explicite de l'utilisateur (« pour un ami sans
impacter le mien »).

### Contenu

| Heure | Moment | Lieu |
|-------|--------|------|
| 12:00 | Cérémonie civile | Mairie de Yopougon |
| 13:30 | Bénédiction nuptiale | EERCI Temple Jérusalem, Yopougon Siporex, derrière l'Agence Emploi Jeunes |
| À la suite | Réception | Sur place, au Temple Jérusalem |

Familles **LAGOH** & **KEMONDE**. Verset : Genèse 2:24. Monogramme R&G.
WhatsApp RSVP : `2250556052740`.

### Structure

```
index.html              le faire-part du 12 septembre 2026
assets/css/style.css    ~1 220 lignes
assets/js/main.js       ~430 lignes
assets/img/             hero.jpg, hero-large.jpg, carte-invitation.jpg,
                        banner-bleu.jpg, banner-thrones.jpg, story/*.jpg,
                        roses.svg, porte-panneau.svg, favicon.svg
traditionnel/           l'ancien faire-part du mariage traditionnel (23 mai 2026),
                        avec invitation.pdf et ses propres ornements SVG
```

### Palette (variables CSS en tête de `style.css`)

`--violet-900 #24063f` · `--violet-800 #33094f` · `--violet-700 #451268` ·
`--violet-600 #5b2a86` · `--violet-400 #8a5cb0`
`--or-900 #8a6a12` · `--or-700 #b8902a` · `--or-500 #c9a227` · `--or-300 #e8c766` ·
`--or-100 #f6e7b4`
`--ivoire #fbf7f0` · `--ivoire-2 #f4ecdf` · `--encre #2b2130`

### Historique récent

Une section « Notre album » et ses photos ont été retirées, ainsi qu'une carte
« Fête & danse » du programme. La frise mentionne les bénédictions **des parents**
(et non des anciens). L'animation d'ouverture de la porte a été accélérée.
**Ne pas réintroduire ces éléments** sans demande explicite.

---

## 4. Projet 2 — Michel & Esther

### Les mariés

- **YAO HADI KOUAKOU Michel** et **KONGOZA N'GORAN Esther Irène**
- Familles **YAO** & **KONGOZA**
- Ordre d'affichage retenu : **Michel & Esther** (marié puis mariée, comme sur le projet 1).
  C'est un choix validé par l'utilisateur, alors que le message d'origine citait Esther
  en premier.
- Monogramme **M&E**.

### Programme du samedi 31 octobre 2026

| Heure | Moment | Lieu |
|-------|--------|------|
| 12:30 | Cérémonie civile | Hôtel communal de Port-Bouët |
| 13:30 | Bénédiction nuptiale | Église Vase d'Honneur — Centre Doxa, Port-Bouët |
| 15:00 | Réception | Salle de la cantine de la mairie de Port-Bouët, au sein du Centre Pilote |

Compte à rebours calé sur `2026-10-31T12:30:00+00:00` (Abidjan = UTC+0).

### Contacts

Trois numéros fournis. Le **premier** reçoit les RSVP WhatsApp (`2250555783875`), les trois
sont affichés en boutons d'appel sous le formulaire.

- 05 55 78 38 75 → `tel:+2250555783875`
- 05 66 50 83 78 → `tel:+2250566508378`
- 07 89 71 05 14 → `tel:+2250789710514`

### Palette — issue du nuancier envoyé par les mariés

Les cinq teintes ont été **échantillonnées au pixel** sur les pastilles de la photo de
nuancier (`WhatsApp Image 2026-09-09 at 19.54.51 (4).jpeg`) :
`#737e6e` sauge · `#9ba998` sauge clair · `#8798a8` bleu poudré · `#c4cfe1` bleu clair ·
`#f4f1ec` ivoire.

Variables CSS effectives :

```
--sauge-900 #26302b   --sauge-800 #33403a   --sauge-700 #45544c
--sauge-600 #5c6b5e   --sauge-400 #9ba998
--champ-900 #6b5c34   --champ-700 #7f6f42   --champ-500 #c4b287
--champ-300 #ded1ab   --champ-100 #f2ead2
--bleu-900  #232d36   --bleu-800  #2f3d49   --bleu-700  #63768a
--bleu-500  #8798a8   --bleu-300  #c4cfe1
--ivoire #f8f6f1      --ivoire-2 #ece8de    --encre #2d332e
```

**Pourquoi le champagne** : le nuancier est froid, l'or du projet 1 n'y tenait pas. Le
champagne pâle joue le rôle du métal (monogramme, filets, boutons, sceau) et s'accorde à
la fois à la sauge et au bleu. `--champ-700` a été volontairement **assombri à #7f6f42**
(et non le `#b8902a` d'origine) pour que les petits textes en capitales restent lisibles
sur fond blanc (~4,9:1).

**Alternance des sections sombres** : sauge pour le compte à rebours, bleu poudré pour le
RSVP (`.section--sauge` / `.section--bleue`). C'est ce qui donne au site son caractère
bicolore ; ne pas uniformiser.

### Correspondance des renommages depuis le projet 1

| Projet 1 | Projet 2 |
|---|---|
| `--violet-*` | `--sauge-*` |
| `--or-*` | `--champ-*` |
| `--gradient-or`, `--gradient-or-profond` | `--gradient-champ`, `--gradient-champ-profond` |
| `.texte-or` | `.texte-champ` |
| `.section--violette` | `.section--sauge` (+ `.section--bleue`, nouveau) |
| `balayage-or` | `balayage-champ` |
| ids SVG `orVert`, `orMono` | `champVert`, `champMono` |

### Ce qui diffère structurellement du projet 1

1. **Le héros a deux mises en page.** Leurs photos sont des portraits serrés : une bande
   2:1 étirée mettrait le texte en travers des visages.
   - **Mobile** : photo en plein cadre ; `.heros-texte` est un flex `space-between` qui
     répartit `.heros-haut` (monogramme + « Nous nous marions ») en haut et `.heros-bas`
     (prénoms, date, lieu) en bas — les visages restent dégagés au centre.
   - **≥ 900 px et ratio ≥ 1/1** : deux colonnes, texte à gauche et `.heros-portrait`
     (photo encadrée, `hero-portrait.jpg`) à droite ; `hero-large.jpg` ne sert plus que
     de fond volontairement flouté et assombri.
2. **Pas de carte d'invitation imprimée** : ils n'en ont pas fourni. Le bouton
   « Voir la carte » est devenu **« Voir nos photos »** et ouvre la galerie.
3. **La visionneuse est une vraie galerie** : `CONFIG.photos` (4 entrées) au lieu de
   `CONFIG.carte`. Chaque photo de la frise est un `<button class="etape-photo"
   data-photo="N">` qui ouvre la galerie à son rang. Le sélecteur JS est `[data-photo]`
   (et non plus `[data-galerie-index]`).
4. **Trois cartes de lieu** au lieu de deux.
5. **Bloc `.contacts`** sous le formulaire RSVP (les trois numéros).
6. **Bloc `.maries`** sur la carte d'invitation (les deux noms d'état civil).

### Structure

```
CLAUDE.md                     ce fichier
README.md                     doc destinée aux mariés / à l'utilisateur
index.html                    le faire-part du 31 octobre 2026
assets/css/style.css          ~1 350 lignes
assets/js/main.js             ~440 lignes
assets/img/hero.jpg           1066×1600 — plein cadre mobile
assets/img/hero-portrait.jpg  800×1200 — la photo encadrée du grand écran
assets/img/hero-large.jpg     1400×700 — fond flouté du grand écran
assets/img/story/             rencontre, promesse, civil, benediction (620×620)
assets/img/banner-couple.jpg  texture du compte à rebours
assets/img/banner-duo.jpg     texture du RSVP
assets/img/roses.svg          bouquet, recoloré en bleu poudré
assets/img/porte-panneau.svg  vantail sculpté, recoloré en eucalyptus
assets/img/favicon.svg        monogramme ME sur fond sauge
```

---

## 5. Décisions en attente — à reprendre

1. **Le numéro RSVP n'est pas confirmé.** J'ai retenu le premier des trois
   (`2250555783875`). À valider auprès de Roro. Une seule ligne à changer, dans
   `CONFIG.whatsapp` en tête de `assets/js/main.js`.

2. **Les textes de « Notre histoire » sont volontairement sans faits.** Je ne connais pas
   leur histoire réelle ; les deux premières étapes (« La rencontre » / « Le commencement »
   et « La promesse » / « Le temps ») sont poétiques et **sans dates inventées**. Si Roro
   fournit les vraies dates ou anecdotes, remplacer dans `index.html`. **Ne rien inventer.**

3. **« Hôtel » ou « autel » communal — question ouverte.** Le 10/09 Roro a écrit :
   *« À l'hôtel, c'est plutôt autel »*. Je **n'ai pas appliqué** la correction, après
   vérification : le portail officiel de la commune écrit *« La célébration du mariage se
   fait au sein de l'**Hôtel Communal** de Port-Bouët »*
   (https://www.port-bouet.ci/post_page?libelle_cat=etat-civil&id=72&sous_rubrique=Demarche+Administrative).
   « Autel » désigne la table du sanctuaire — sur une invitation, ce serait lu comme une
   faute et créerait une confusion avec la bénédiction religieuse de 13h30. Le site reste
   donc sur « Hôtel communal ». **Si l'utilisateur réaffirme le choix, l'appliquer** : le
   mot apparaît à deux endroits dans `index.html` (carte du programme et carte du lieu).

### Points cosmétiques connus, non corrigés

- Le 4ᵉ cercle de la frise (`story/benediction.jpg`) est légèrement décalé vers la droite.
  Recadrer avec une fenêtre décalée d'environ +80 px en x si on veut le centrer.
- Aucune musique d'ambiance sur les deux projets : le bouton son reste masqué tant que
  `assets/audio/ambiance.mp3` n'existe pas — c'est le comportement voulu, pas un bug.

---

## 6. Conventions de code

- **Objet `CONFIG`** en tête de `assets/js/main.js` : c'est le seul endroit à toucher pour
  la date du compte à rebours, le numéro WhatsApp, le chemin de la musique et la liste des
  photos. Le README de chaque projet documente ces clés.
- **Tout le texte visible est dans `index.html`**, pas dans le JS.
- **Les couleurs sont des variables CSS** dans `:root`. Ne pas coder une teinte en dur
  ailleurs ; si une valeur `rgba()` est nécessaire, reprendre la teinte de la variable
  correspondante.
- **Commentaires** : en français, ils expliquent *pourquoi* (une contrainte, un piège
  navigateur), jamais *quoi*. Garder cette densité — le code existant en est un bon étalon.
- **Accessibilité** : `prefers-reduced-motion` est respecté (bloc dédié en fin de CSS) ;
  les éléments décoratifs portent `aria-hidden="true"` ; les photos cliquables sont de
  vrais `<button>` avec `aria-label`. Maintenir ces garanties.
- **Typographie française** : trait d'union insécable `&#8209;` dans « Port‑Bouët » au sein
  des titres (sinon la césure coupe le nom), et `&nbsp;` avant le `»` fermant d'une citation
  (sinon il reste orphelin en fin de paragraphe).
- **Ne jamais commiter** les fichiers de test temporaires (`_test.html`, `_t*.html`) créés
  pour les captures d'écran.

---

## 7. Pièges rencontrés — et leurs solutions

Ce sont des heures perdues si on les redécouvre. Les plus coûteux d'abord.

### Chrome headless refuse les petites fenêtres

`--window-size=390,844` est **ignoré** : le viewport est raboté à **500×757**, et
`--screenshot` recadre le rendu sans prévenir — on croit voir un site décalé alors que
la mise en page est correcte. `--headless=old` ne change rien. Les captures mobiles
fiables passent obligatoirement par le protocole DevTools et
`Emulation.setDeviceMetricsOverride`. Version condensée du pilote utilisé :

```python
import json, subprocess, time, urllib.request, base64, os, websocket

class Nav:
    def __init__(self):
        self.port = 9200 + (os.getpid() % 400)          # port unique : pas de collision
        self.proc = subprocess.Popen(
            ["google-chrome", "--headless=new", "--disable-gpu", "--no-sandbox",
             "--hide-scrollbars", "--force-color-profile=srgb",
             f"--remote-debugging-port={self.port}",
             "--remote-allow-origins=*",                  # sinon handshake 403
             f"--user-data-dir=/tmp/cdp-{os.getpid()}", "about:blank"],
            stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        for _ in range(60):
            try:
                d = json.load(urllib.request.urlopen(f"http://127.0.0.1:{self.port}/json/list"))
                cible = next((t["webSocketDebuggerUrl"] for t in d if t["type"] == "page"), None)
                if cible: break
            except Exception: pass
            time.sleep(0.25)
        self.ws = websocket.create_connection(cible, timeout=30, suppress_origin=True)
        self.n = 0

    def cmd(self, m, **p):
        self.n += 1
        self.ws.send(json.dumps({"id": self.n, "method": m, "params": p}))
        while True:
            r = json.loads(self.ws.recv())
            if r.get("id") == self.n: return r.get("result", {})

    def metrics(self, w, h, dpr=2, mobile=True):
        self.cmd("Emulation.setDeviceMetricsOverride",
                 width=w, height=h, deviceScaleFactor=dpr, mobile=mobile)

    def ouvrir(self, url, attente=3):
        self.cmd("Page.enable"); self.cmd("Page.navigate", url=url); time.sleep(attente)

    def js(self, expr):
        return self.cmd("Runtime.evaluate", expression=expr,
                        returnByValue=True).get("result", {}).get("value")

    def shot(self, chemin):
        open(chemin, "wb").write(base64.b64decode(self.cmd("Page.captureScreenshot",
                                                           format="png")["data"]))
    def close(self):
        try: self.ws.close()
        except Exception: pass
        self.proc.terminate()
```

Deux détails indispensables : `--remote-allow-origins=*` **et** `suppress_origin=True`,
sans quoi le handshake WebSocket renvoie **403 Forbidden**.

**Recette de vérification** (390×844 dpr 2, puis 1440×900 dpr 1) :

```python
n.metrics(390, 844); n.ouvrir(URL)
n.js("document.getElementById('bouton-entrer').click()")   # ouvrir la porte
for s in ["#invitation","#histoire","#programme","#lieux","#rsvp",".pied"]:
    n.js(f"document.querySelector('{s}').scrollIntoView()"); time.sleep(1.3)
n.js("document.documentElement.scrollWidth")               # doit valoir 390
n.js("Array.from(document.images).filter(i=>!i.complete||i.naturalWidth===0).length")
```

Le défilement est **obligatoire** avant de compter les images : celles de la frise sont en
`loading="lazy"` et paraissent cassées sinon. Attention aussi au faux positif : l'`<img
id="vis-image">` de la visionneuse n'a **pas** de `src` avant l'ouverture de la galerie —
elle compte donc toujours pour une image « non chargée ».

### `100svh` fausse les captures pleine page

Prendre une capture dans une fenêtre de 7 600 px de haut donne un héros de 7 600 px : le
texte se retrouve au milieu du néant. Toujours capturer à la **vraie** hauteur d'écran,
puis défiler.

### `pkill -f <motif>` se tue lui-même

Le motif figure dans la ligne de commande du shell qui l'exécute : `pkill` s'auto-cible et
le shell meurt avec le code 144, sans message utile. Utiliser un motif entre crochets
(`cdp-profi[l]`) — et vérifier qu'aucun **autre** argument de la même commande ne contient
la chaîne visée. Le plus simple reste un port et un profil uniques par lancement.

### L'attribut `height` d'une balise `<img>` écrase `aspect-ratio`

`<img width="800" height="1200">` produit un indice de présentation `height: 1200px` qui
**neutralise** `aspect-ratio` en CSS : la photo encadrée du héros s'étirait à 1 600 px de
haut. Il faut `height: auto` explicite dans la règle, en plus de `aspect-ratio`.

### Ordre des media queries à spécificité égale

Le bloc grand écran du héros était placé **avant** la règle de base `.heros-contenu` dans
le fichier : à spécificité égale, la dernière déclaration gagne, donc la version mobile
écrasait silencieusement la version bureau. Placer tout bloc `@media` **après** les règles
qu'il doit surcharger.

### `gh repo create --push` échoue

`gh repo create … --source=. --push` crée bien le dépôt et le remote, puis casse sur
`git: 'remote-https' is not a git command` (exit 128). Le dépôt distant existe malgré
l'erreur : enchaîner simplement `git push -u origin main`. Penser aussi à
`git branch -m master main` — `gh` initialise sur `master` alors que les deux projets
sont sur `main`.

### GitHub Pages à la racine d'une organisation

Pour servir sur `https://<orga>.github.io/` (sans sous-dossier), le dépôt doit s'appeler
**exactement** `<orga>.github.io`. La configuration Pages **survit** au transfert et au
renommage, mais les premiers builds passent par un état `errored` transitoire — attendre
`status == "built"` avant de conclure. Les anciennes URL Pages **ne redirigent pas** :
`lagohjean.github.io/invitation-esther-michel/` renvoie désormais 404, et les URL absolues
du code (`og:url`, `og:image`, README) doivent être mises à jour à la main.

### Restriction d'accès des applications tierces

Une organisation neuve peut bloquer les jetons OAuth. Ça n'a **pas** posé problème ici
(le transfert et le renommage ont fonctionné du premier coup), mais si un appel API échoue
sur l'organisation : Settings → Third-party Access → autoriser **GitHub CLI**.

### Typographie

La calligraphie (`Great Vibes`) est **illisible en capitales** : les patronymes
« YAO HADI KOUAKOU » rendus dans cette police étaient indéchiffrables. Les noms d'état
civil sont donc en serif interlettré ; la calligraphie est réservée aux prénoms et au
« & ».

### Superposition sur la carte d'invitation

Le bouquet `roses.svg` était en `z-index: 2`, au-dessus du texte, et mordait sur
« LA FAMILLE KONGOZA » sur écran étroit. Il est repassé en `z-index: 1`, et les
paragraphes de la carte en `z-index: 3`.

---

## 8. Photos — sources et recettes

Les originaux **ne sont pas dans le dépôt**. Ils viennent de WhatsApp :

```
~/Téléchargements/WhatsApp Unknown 2026-09-09 at 19.57.01/
    WhatsApp Image 2026-09-09 at 19.54.50.jpeg       (A) 720×1080  enlacés, pilier
    WhatsApp Image 2026-09-09 at 19.54.51 (1).jpeg   (B) 720×1080  debout, main dans la main
    WhatsApp Image 2026-09-09 at 19.54.51.jpeg       (C) 720×1080  banc
    WhatsApp Image 2026-09-09 at 19.54.51 (2).jpeg   (D) 1066×1600 escalier, regard caméra
    WhatsApp Image 2026-09-09 at 19.54.51 (3).jpeg   (E) 1066×1600 escalier, rire
~/Téléchargements/WhatsApp Image 2026-09-09 at 19.54.51 (4).jpeg   le nuancier de couleurs
```

Recadrages exacts appliqués (Pillow, `Image.LANCZOS`) :

| Fichier produit | Source | Recadrage `(g, h, d, b)` | Taille | Traitement |
|---|---|---|---|---|
| `hero.jpg` | D | plein cadre | 1066×1600 | q82 |
| `hero-portrait.jpg` | D | `(130, 200, 930, 1400)` | 800×1200 | q85 |
| `hero-large.jpg` | D | `(0, 140, 1066, 673)` | 1400×700 | flou 26, saturation ×0,45, luminosité ×0,62, q70 |
| `story/rencontre.jpg` | A | `(90, 100, 710, 720)` | 620×620 | q85 |
| `story/promesse.jpg` | C | `(60, 100, 660, 700)` | 620×620 | q85 |
| `story/civil.jpg` | B | `(50, 60, 670, 680)` | 620×620 | q85 |
| `story/benediction.jpg` | E | `(80, 220, 980, 1120)` | 620×620 | q85 |
| `banner-couple.jpg` | E | `(0, 300, 1066, 1000)` | 1400×919 | q76 |
| `banner-duo.jpg` | A | `(0, 150, 720, 600)` | 1400×875 | q76 |

Les quatre cercles de la frise ont ensuite reçu **luminosité ×1,14 et contraste ×1,05** :
ce sont des prises de nuit, illisibles en petit format sans ce coup de pouce.

Le fond large est flouté **dans le fichier** (et non par un `filter` CSS) : c'est moins
coûteux à l'affichage, et le fichier tombe à ~13 ko.

---

## 9. Vérifier une mise en ligne

```bash
# attendre la fin du build
gh api repos/<orga>/<dépôt>/pages --jq '.status'        # jusqu'à "built"
gh api repos/<orga>/<dépôt>/pages/builds --jq '.[0] | "\(.status) \(.error.message // "—")"'

# les ressources répondent-elles ?
for u in "" assets/css/style.css assets/js/main.js assets/img/hero.jpg; do
  printf "%-28s %s\n" "/$u" "$(curl -s -o /dev/null -w '%{http_code}' https://michel-et-esther.github.io/$u)"
done
```

Attention : l'API GitHub renvoie parfois une **réponse vide** sur `/pages` (hoquet
transitoire) — réessayer avant de conclure à une panne.

Puis vérifier le rendu réel avec la recette du §7 : c'est le seul moyen d'attraper les
débordements horizontaux et les superpositions de texte, qu'aucun test HTTP ne voit.
