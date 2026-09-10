/* ============================================================
   Michel & Esther — 31 octobre 2026
   Animations, compte à rebours, galerie et RSVP WhatsApp.
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     Configuration — les seules valeurs à modifier au besoin
     ---------------------------------------------------------- */
  var CONFIG = {
    // Le mariage : 31 octobre 2026 à 12h30, heure d'Abidjan (UTC+0)
    dateMariage: "2026-10-31T12:30:00+00:00",

    // Numéro WhatsApp qui reçoit les confirmations (format international, sans +)
    whatsapp: "2250555783875",

    // Musique d'ambiance : déposez un fichier ici pour activer le bouton son.
    musique: "assets/audio/ambiance.mp3",

    // Photos de la galerie, dans l'ordre de la frise « Notre histoire ».
    photos: [
      { f: "story/rencontre",   alt: "Michel et Esther enlacés au pied de l'escalier" },
      { f: "story/promesse",    alt: "Michel et Esther assis côte à côte, joue contre joue" },
      { f: "story/civil",       alt: "Michel et Esther debout, main dans la main" },
      { f: "story/benediction", alt: "Michel et Esther riant aux éclats sur les marches" }
    ]
  };

  var doux = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ==========================================================
     1 · La porte d'entrée
     ========================================================== */
  var porte = $("#porte");
  var porteOuverte = false;

  function ouvrirLaPorte() {
    if (porteOuverte) return;
    porteOuverte = true;

    porte.classList.add("ouverte");
    document.body.classList.remove("verrouille");

    // Le héros se révèle pendant que les battants pivotent encore : l'attente
    // ressentie tombe à environ une seconde, sans perdre l'effet d'ouverture.
    window.scrollTo({ top: 0, behavior: "auto" });
    reveler();
    lancerMusique();

    setTimeout(function () {
      porte.classList.add("partie");
    }, doux ? 0 : 700);

    setTimeout(function () {
      porte.style.display = "none";
    }, doux ? 250 : 1350);
  }

  $("#bouton-entrer").addEventListener("click", ouvrirLaPorte);
  porte.addEventListener("click", function (e) {
    if (e.target === porte || e.target.classList.contains("battant")) ouvrirLaPorte();
  });
  document.addEventListener("keydown", function (e) {
    if (!porteOuverte && (e.key === "Enter" || e.key === " ")) ouvrirLaPorte();
  });

  /* ==========================================================
     2 · Apparition au défilement
     ========================================================== */
  var observateur = null;

  function reveler() {
    var cibles = $$(".anim:not(.vue)");
    if (doux || !("IntersectionObserver" in window)) {
      cibles.forEach(function (el) { el.classList.add("vue"); });
      $("#frise").classList.add("vue");
      return;
    }
    if (!observateur) {
      observateur = new IntersectionObserver(function (entrees) {
        entrees.forEach(function (entree) {
          if (entree.isIntersecting) {
            entree.target.classList.add("vue");
            observateur.unobserve(entree.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    cibles.forEach(function (el) { observateur.observe(el); });

    var frise = $("#frise");
    if (frise && !frise.classList.contains("vue")) {
      new IntersectionObserver(function (entrees, obs) {
        if (entrees[0].isIntersecting) { frise.classList.add("vue"); obs.disconnect(); }
      }, { threshold: 0.08 }).observe(frise);
    }
  }

  /* ==========================================================
     3 · Barre de progression + parallaxe du héros
     ========================================================== */
  var barre = $("#progression");
  var fond = $(".heros-fond");
  var enAttente = false;

  function surDefilement() {
    var y = window.scrollY || 0;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    barre.style.transform = "scaleX(" + (h > 0 ? Math.min(y / h, 1) : 0) + ")";

    // On passe par une variable CSS : l'animation de zoom la consomme dans ses
    // images-clés, alors qu'un transform en ligne serait écrasé par l'animation.
    if (fond && !doux && y < window.innerHeight * 1.2) {
      fond.style.setProperty("--parallaxe", (y * 0.24) + "px");
    }
    enAttente = false;
  }

  window.addEventListener("scroll", function () {
    if (!enAttente) { enAttente = true; requestAnimationFrame(surDefilement); }
  }, { passive: true });

  $("#fleche-defilement").addEventListener("click", function () {
    var cible = $("#invitation");
    if (cible) cible.scrollIntoView({ behavior: doux ? "auto" : "smooth", block: "start" });
  });

  /* ==========================================================
     4 · Pétales et poussière d'or sur le héros
     ========================================================== */
  (function petales() {
    var toile = $("#petales");
    if (!toile || doux) { if (toile) toile.style.display = "none"; return; }

    var ctx = toile.getContext("2d");
    var particules = [];
    var largeur = 0, hauteur = 0;
    var teintes = ["rgba(222,209,171,", "rgba(242,234,210,", "rgba(255,255,255,", "rgba(196,207,225,"];

    function dimensionner() {
      var r = Math.min(window.devicePixelRatio || 1, 2);
      largeur = toile.clientWidth;
      hauteur = toile.clientHeight;
      toile.width = largeur * r;
      toile.height = hauteur * r;
      ctx.setTransform(r, 0, 0, r, 0, 0);
    }

    function creer(haut) {
      return {
        x: Math.random() * largeur,
        y: haut ? Math.random() * hauteur : -20,
        r: 1.1 + Math.random() * 3.4,
        vy: 0.22 + Math.random() * 0.75,
        vx: -0.28 + Math.random() * 0.56,
        a: 0.18 + Math.random() * 0.55,
        phase: Math.random() * Math.PI * 2,
        vitPhase: 0.008 + Math.random() * 0.02,
        teinte: teintes[(Math.random() * teintes.length) | 0]
      };
    }

    function peupler() {
      var n = Math.round(Math.min(Math.max(largeur / 14, 26), 74));
      particules = [];
      for (var i = 0; i < n; i++) particules.push(creer(true));
    }

    function dessiner() {
      ctx.clearRect(0, 0, largeur, hauteur);
      for (var i = 0; i < particules.length; i++) {
        var p = particules[i];
        p.y += p.vy;
        p.phase += p.vitPhase;
        p.x += p.vx + Math.sin(p.phase) * 0.5;

        if (p.y - p.r > hauteur) particules[i] = creer(false);
        else if (p.x < -20) p.x = largeur + 20;
        else if (p.x > largeur + 20) p.x = -20;

        var scintille = p.a * (0.62 + 0.38 * Math.sin(p.phase * 2.1));
        ctx.beginPath();
        ctx.fillStyle = p.teinte + scintille.toFixed(3) + ")";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(dessiner);
    }

    dimensionner();
    peupler();
    dessiner();
    window.addEventListener("resize", function () { dimensionner(); peupler(); }, { passive: true });
  })();

  /* ==========================================================
     5 · Compte à rebours
     ========================================================== */
  (function rebours() {
    var cases = {};
    $$("#rebours .rebours-nombre").forEach(function (el) { cases[el.dataset.unite] = el; });

    var cible = new Date(CONFIG.dateMariage).getTime();
    var grille = $("#rebours");
    var libelle = $("#libelle-rebours");
    var jourJ = $("#jour-j");

    function poser(el, valeur) {
      var texte = valeur < 10 ? "0" + valeur : String(valeur);
      if (el.textContent === texte) return;
      el.textContent = texte;
      if (doux) return;
      el.classList.add("bat");
      setTimeout(function () { el.classList.remove("bat"); }, 340);
    }

    function battre() {
      var reste = cible - Date.now();

      if (reste <= 0) {
        grille.hidden = true;
        libelle.hidden = true;
        jourJ.hidden = false;
        jourJ.classList.add("vue");
        // Passé le grand jour, on remercie plutôt que de compter.
        if (reste < -12 * 3600 * 1000) jourJ.textContent = "Merci d'avoir partagé ce jour avec nous.";
        return;
      }

      var s = Math.floor(reste / 1000);
      poser(cases.jours, Math.floor(s / 86400));
      poser(cases.heures, Math.floor(s / 3600) % 24);
      poser(cases.minutes, Math.floor(s / 60) % 60);
      poser(cases.secondes, s % 60);
      setTimeout(battre, 1000 - (Date.now() % 1000));
    }

    battre();
  })();

  /* ==========================================================
     6 · Visionneuse — galerie des photos du couple
     ========================================================== */
  var visionneuse = $("#visionneuse");
  var visImage = $("#vis-image");
  var visCompteur = $("#vis-compteur");
  var indexCourant = 0;
  var suiteAffichee = CONFIG.photos;

  function cheminComplet(photo) {
    return "assets/img/" + photo.f + ".jpg";
  }

  function ouvrirVisionneuse(suite, i) {
    suiteAffichee = suite;
    indexCourant = i;
    visionneuse.hidden = false;
    // Un temps mort d'une frame pour que la transition CSS s'applique.
    requestAnimationFrame(function () { visionneuse.classList.add("ouverte"); });
    document.body.classList.add("verrouille");
    afficherPhoto();
    $(".vis-fermer").focus();
  }

  function fermerVisionneuse() {
    visionneuse.classList.remove("ouverte");
    document.body.classList.remove("verrouille");
    setTimeout(function () { visionneuse.hidden = true; }, 400);
  }

  function afficherPhoto() {
    var photo = suiteAffichee[indexCourant];
    visImage.src = cheminComplet(photo);
    visImage.alt = photo.alt;
    var seule = suiteAffichee.length < 2;
    visCompteur.textContent = seule ? "" : (indexCourant + 1) + " / " + suiteAffichee.length;
    $(".vis-prec").hidden = seule;
    $(".vis-suiv").hidden = seule;
  }

  function glisser(pas) {
    indexCourant = (indexCourant + pas + suiteAffichee.length) % suiteAffichee.length;
    afficherPhoto();
  }

  $(".vis-fermer").addEventListener("click", fermerVisionneuse);
  $(".vis-prec").addEventListener("click", function () { glisser(-1); });
  $(".vis-suiv").addEventListener("click", function () { glisser(1); });
  visionneuse.addEventListener("click", function (e) { if (e.target === visionneuse) fermerVisionneuse(); });

  document.addEventListener("keydown", function (e) {
    if (visionneuse.hidden) return;
    if (e.key === "Escape") fermerVisionneuse();
    else if (e.key === "ArrowLeft") glisser(-1);
    else if (e.key === "ArrowRight") glisser(1);
  });

  // Balayage tactile
  (function tactile() {
    var xDepart = null;
    visionneuse.addEventListener("touchstart", function (e) { xDepart = e.touches[0].clientX; }, { passive: true });
    visionneuse.addEventListener("touchend", function (e) {
      if (xDepart === null) return;
      var delta = e.changedTouches[0].clientX - xDepart;
      if (Math.abs(delta) > 45) glisser(delta < 0 ? 1 : -1);
      xDepart = null;
    }, { passive: true });
  })();

  // Chaque photo de la frise, comme le bouton « Voir nos photos »,
  // ouvre la galerie à son propre rang.
  $$("[data-photo]").forEach(function (declencheur) {
    declencheur.addEventListener("click", function () {
      var i = parseInt(declencheur.dataset.photo, 10) || 0;
      ouvrirVisionneuse(CONFIG.photos, i);
    });
  });

  /* ==========================================================
     7 · RSVP → WhatsApp
     ========================================================== */
  (function rsvp() {
    var form = $("#formulaire-rsvp");
    var nom = $("#nom");
    var personnes = $("#personnes");
    var blocPersonnes = $("#bloc-personnes");
    var retour = $("#message-envoi");

    function annoncer(texte) {
      retour.textContent = texte;
      retour.classList.add("visible");
    }

    function borner(v) { return Math.min(Math.max(v, 1), 20); }

    $("#moins").addEventListener("click", function () {
      personnes.value = borner((parseInt(personnes.value, 10) || 1) - 1);
    });
    $("#plus").addEventListener("click", function () {
      personnes.value = borner((parseInt(personnes.value, 10) || 1) + 1);
    });
    personnes.addEventListener("change", function () {
      personnes.value = borner(parseInt(personnes.value, 10) || 1);
    });

    // « Non, avec regret » : le nombre de personnes n'a plus de sens.
    function majPresence() {
      var present = $("input[name=presence]:checked").value.indexOf("Oui") === 0;
      blocPersonnes.hidden = !present;
    }
    $$("input[name=presence]").forEach(function (r) { r.addEventListener("change", majPresence); });
    majPresence();

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var valeurNom = nom.value.trim();
      if (valeurNom.length < 2) {
        nom.focus();
        annoncer("Merci d'indiquer votre nom pour que nous sachions qui vous êtes.");
        return;
      }

      var presence = $("input[name=presence]:checked").value;
      var present = presence.indexOf("Oui") === 0;
      var message = $("#message").value.trim();

      var lignes = [
        "Mariage de Michel & Esther — 31 octobre 2026",
        "",
        "Nom : " + valeurNom,
        "Réponse : " + presence
      ];
      if (present) lignes.push("Nombre de personnes : " + borner(parseInt(personnes.value, 10) || 1));
      if (message) lignes.push("Message : " + message);

      var url = "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(lignes.join("\n"));
      annoncer(present
        ? "Merci " + valeurNom + " ! WhatsApp s'ouvre, il ne reste qu'à envoyer."
        : "Merci pour votre réponse. WhatsApp s'ouvre pour l'envoyer.");
      window.open(url, "_blank", "noopener");
    });
  })();

  /* ==========================================================
     8 · Musique d'ambiance (activée si le fichier existe)
     ========================================================== */
  var audio = null;
  var boutonMusique = $("#bouton-musique");
  var iconeSon = $("#icone-son");

  (function preparerMusique() {
    audio = new Audio(CONFIG.musique);
    audio.loop = true;
    audio.volume = 0.34;
    audio.preload = "none";

    // Le bouton n'apparaît que si le fichier est réellement disponible.
    audio.addEventListener("canplay", function () { boutonMusique.hidden = false; });
    audio.addEventListener("error", function () { boutonMusique.hidden = true; });
    audio.preload = "metadata";
    audio.load();

    boutonMusique.addEventListener("click", function () {
      if (audio.paused) lancerMusique(true);
      else arreterMusique();
    });
  })();

  function lancerMusique(demandeExplicite) {
    if (!audio || boutonMusique.hidden) return;
    var essai = audio.play();
    if (essai && essai.catch) {
      essai.then(function () {
        boutonMusique.classList.add("joue");
        iconeSon.setAttribute("href", "#sym-son");
        boutonMusique.setAttribute("aria-label", "Couper la musique");
      }).catch(function () {
        // Le navigateur refuse la lecture automatique : le bouton reste disponible.
        if (demandeExplicite) arreterMusique();
      });
    }
  }

  function arreterMusique() {
    if (!audio) return;
    audio.pause();
    boutonMusique.classList.remove("joue");
    iconeSon.setAttribute("href", "#sym-son-coupe");
    boutonMusique.setAttribute("aria-label", "Activer la musique");
  }

  /* ==========================================================
     9 · Démarrage
     ========================================================== */
  // Si la page est rechargée en cours de route, on n'impose pas la porte.
  if (window.scrollY > 40) ouvrirLaPorte();
  else reveler(); // les éléments hors héros s'observent dès maintenant
})();
