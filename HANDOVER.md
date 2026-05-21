# 📦 PTS-Maths — Document de transfert de session

> Ce document contient TOUT le contexte du projet pour reprendre dans une nouvelle session Claude sans rien perdre.
>
> **Dernière mise à jour : 19 mai 2026 — fin de session avec 14 chapitres complets + déploiement prêt.**

---

## 🚀 PROMPT À COPIER-COLLER dans la nouvelle session Claude

Sélectionne tout le bloc ci-dessous, copie-le, et envoie-le comme premier message.

```
Salut Claude. Je m'appelle nini (Ilyas), je suis lycéen en Première spécialité maths au lycée Fénelon de Lille (mai 2026). Je suis débutant total en code.

Je continue un projet PWA en cours appelé PTS-Maths, hébergé dans C:\Users\ilyas\OneDrive\Desktop\PTS-Maths.

Avant TOUT autre chose, fais ces étapes dans l'ordre :

1. Lis le fichier C:\Users\ilyas\OneDrive\Desktop\PTS-Maths\HANDOVER.md en entier — toute notre histoire et les décisions stratégiques y sont.
2. Charge le skill "strategiste-app-ia" (méthode : étape par étape, honnêteté radicale, validation avant chaque grosse décision).
3. Fais-moi un récap rapide de l'état actuel (5-10 lignes) et propose-moi ce qu'on peut attaquer maintenant.

Mes préférences :
- Tutoie-moi, sois direct et bienveillant
- Honnêteté radicale, pas de flatterie
- Vulgarise les termes techniques (je suis 0 % dev)
- Pas besoin de redemander les choix stratégiques déjà tranchés
- Si tu peux enchaîner plusieurs étapes d'un coup en autonomie, fais-le
- Tu peux utiliser Python via bash (`mcp__workspace__bash`) pour éditer le fichier app.js directement — c'est plus fiable que l'outil Edit
- Pas d'emojis dans le code

Lance la lecture du HANDOVER.md et confirme-moi que tu as bien compris l'état avant qu'on continue.
```

---

## 1. 👤 IDENTITÉ ET PRÉFÉRENCES

**Utilisateur** : nini (Ilyas) — élève en **Première spécialité mathématiques**, lycée Fénelon de Lille, mai 2026.
- Débutant total en code
- Travaille seul
- Usage personnel puis publication envisagée

**Budget** : 0 € (max 5 € pour tout le projet)
**Délai cible** : MVP fonctionnel atteint. V1 complète pour rentrée septembre 2026.

**Style attendu de Claude** : tutoiement, bienveillance, **honnêteté radicale**, vulgarisation systématique, méthode skill `strategiste-app-ia`.

---

## 2. 🎯 LA VISION

**PTS-Maths** est une **PWA installable** qui aide les lycéens spé maths à apprendre via une boucle d'apprentissage progressive (vidéo Monka → explication → exercices → maîtrise → évaluation finale), inspirée de Khan Academy + Duolingo.

---

## 3. 🔒 DÉCISIONS STRATÉGIQUES VERROUILLÉES

(Ne pas re-discuter — déjà tranchées.)

| Décision | Choix |
|---|---|
| **Format** | PWA (icône desktop + web + futur mobile), 1 codebase |
| **Stack** | HTML + CSS + JS pur + Tailwind CDN |
| **Stockage** | localStorage (v1) |
| **Hébergement** | GitHub Pages (déploiement préparé, manuel à faire par nini) |
| **Backend** | AUCUN |
| **IA contenu** | Claude Opus + SymPy + cross-check + Monka + 🚩 user |
| **IA feedback** | Gemini 2.0 Flash (clé utilisateur facultative) |
| **Images** | Pollinations.ai (gratuit, sans clé) |
| **Vidéos** | YouTube embed (chaîne *maths et tiques*) |
| **Math rendering** | KaTeX |

### Pédagogie verrouillée
- Verrouillage séquentiel des propriétés
- Échec → exo rejoué en fin de session
- Évaluation finale : 2 exos/propriété, sans faute = chapitre validé
- Animation Sans Faute (trophée + étoiles + +30 XP bonus)
- Bonus chapitre validé : +300 XP

### Système XP
- `level = floor(sqrt(xp/50)) + 1`
- 10 XP/exo juste, 5 XP/exo repris, 15 XP/exo éval, 50 propriété, 30 sans faute, 300 chapitre validé

### Boutique XP
- Fonds : Aurore (offert), Minuit (150), Coucher de soleil (250), Forêt (400)
- Titres : Élève, Curieux (80), Affûté (150), Champion (350), Légende (800)
- Bouclier de série : 100 XP
- Défi du dimanche ×3 : débloqué niveau 5
- Prestige "???" : verrouillé niveau 20

### Studio Pollinations
- 1000 XP par image, 1 par jour
- Styles : Anime, Cinématique, Épique, Manga, Réaliste, Néon
- Refund auto si échec API

---

## 4. 🏗️ ARCHITECTURE TECHNIQUE

### Fichiers du projet (`C:\Users\ilyas\OneDrive\Desktop\PTS-Maths`)
```
├── index.html              # Tous les écrans (onboarding, home, dashboard, chapter, property, exercise, shop, studio, settings)
├── app.js                  # Toute la logique (~4700 lignes, ~285 KB)
├── styles.css              # Styles custom + dark mode + wallpapers
├── manifest.json           # PWA manifest
├── service-worker.js       # Cache offline
├── README.md               # Description du projet
├── DEPLOY.md               # Instructions de déploiement GitHub Pages
├── HANDOVER.md             # CE document
├── PROJECT_STATE.md        # État précédent (encore valide pour historique)
├── .gitignore              # Pour Git
└── assets/
    ├── icon.svg
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-512.png
    └── favicon-32.png
```

### State localStorage (clé : `pts-maths-state-v1`)
```js
{
  user: { name, classLevel, onboarded },
  xp: number,
  streak: { count, lastDayISO },
  soundEnabled, theme, geminiKey,
  progress: { [chapterId]: { chapterMastered, [propertyId]: { mastered, ... } } },
  currentScreen, currentChapter, currentProperty,
  shop: { ownedWallpapers, activeWallpaper, ownedTitles, activeTitle, shieldsAvailable, customWallpapers, lastImageGenISO, lastSundayChallengeISO },
  session: { mode, chapterId, propertyId, queue, retryQueue, currentIndex, phase, ... }
}
```

### Helpers console (`window.PTS`)
- `PTS.gainXp(n)`, `PTS.reset()`, `PTS.confetti()`
- `PTS.openChapter(id)`, `PTS.openProperty(chapterId, propertyId)`
- `PTS.startSession(chapterId, propertyId)`, `PTS.startEvaluation(chapterId)`
- `PTS.openStudio()`, `PTS.resetImageQuota()`
- `PTS.state()`, `PTS.play('success'|'error'|'levelup'|'xp'|'magic'|'denied'|'click')`

### ⚠️ Note technique importante
**L'outil Edit/Write a un bug de cache** : les modifications ne se synchronisent pas toujours sur disque. Pour éditer `app.js` de manière fiable, **utiliser Python via `mcp__workspace__bash`** : lire le fichier, faire la modification en mémoire Python, réécrire le fichier. Le chemin bash est `/sessions/<session>/mnt/PTS-Maths/app.js`.

---

## 5. 📊 CONTENU PÉDAGOGIQUE — ÉTAT ACTUEL

**14 chapitres COMPLETS, ~380 exercices LaTeX**, toutes les évaluations finales fonctionnelles.

### Première Spécialité Maths (6 chapitres × ~25 exos = ~150 exos)
| Chapitre | Propriétés | Exos | Eval |
|---|---|---|---|
| Produit scalaire | 5/5 | 25 | ✅ |
| Géométrie repérée | 5/5 | 25 | ✅ |
| Suites arith./géom. | 5/5 | 25 | ✅ |
| Dérivation | 5/5 | 25 | ✅ |
| Second degré | 5/5 | 25 | ✅ |
| Probabilités conditionnelles | 5/5 | 25 | ✅ |

### Bases (collège & seconde) (8 chapitres × ~20 exos = ~160 exos)
| Chapitre | Propriétés | Exos | Eval |
|---|---|---|---|
| Calcul littéral | 4/4 | 20 | ✅ |
| Fractions | 4/4 | 20 | ✅ |
| Pythagore & Thalès | 4/4 | 20 | ✅ |
| Puissances et racines | 4/4 | 20 | ✅ |
| Équations 1er degré | 4/4 | 20 | ✅ |
| Trigonométrie de base | 4/4 | 20 | ✅ |
| Vecteurs de seconde | 4/4 | 20 | ✅ |
| Fonctions affines | 4/4 | 20 | ✅ |

### Terminale Spé Maths
- **Pas encore commencé** (planifié été 2026 — voir étape 9-13)

### Vidéos Yvan Monka intégrées
La quasi-totalité des propriétés a une vidéo Monka identifiée. Quelques chapitres Bases utilisent un fallback générique (`2gKpv0brXVQ` = cours calcul littéral) en attendant la production de contenu validée — l'utilisateur peut signaler via 🚩.

---

## 6. ✅ ÉTAPES COMPLÉTÉES

- ✅ Phases 0-4 — Découverte, cadrage, architecture, IA, plan
- ✅ Étape 1 — Scaffold PWA
- ✅ Étape 1 bis — Onboarding, accueil, XP, sons, confettis
- ✅ Étape 1.5 — Boutique XP (fonds, titres, bouclier, défi, prestige)
- ✅ Étape 1.6 — Studio Pollinations
- ✅ Étape 2 — Vue chapitre avec verrouillage séquentiel
- ✅ Étape 3 — Vue propriété (vidéo Monka + explication)
- ✅ Étape 3.1 — Mode sombre global
- ✅ Étape 4 — Boucle d'apprentissage (exercices QCM/numérique)
- ✅ Étape 4.1 — Animation Sans Faute + Onglet Bases
- ✅ Étape 4.2 — Contenu complet Produit scalaire
- ✅ Étape 6 — Mode évaluation finale + statut dynamique chapitre
- ✅ Étape 7 — Feedback IA Gemini + dark mode célébrations
- ✅ Étape 7.1 — Infrastructure KaTeX
- ✅ Étape 7.2 — Conversion LaTeX de tout le contenu
- ✅ Étape 8 — Production contenu Géométrie repérée + Suites
- ✅ Étape 8.1 — Suites entièrement eval-able
- ✅ Étape 8.2 — Tous les chapitres Bases initiaux eval-ables
- ✅ Étape 8.3 — Chapitre Dérivation complet
- ✅ Étape 8.4 — Chapitre Second degré complet
- ✅ Étape 8.5 — Probabilités conditionnelles complet
- ✅ Étape 8.6 — 4 derniers chapitres Bases (Puissances, Équations, Trigo, Vecteurs, Fonctions affines)
- ✅ Restauration urgente du fichier app.js (corruption résolue via Python)
- ✅ **Étape 14 (prep)** — Fichiers de déploiement créés : `.gitignore`, `README.md`, `DEPLOY.md`

---

## 7. 🎯 PROCHAINES ÉTAPES

### A. Déploiement GitHub Pages (manuel, nini)
**Tout est prêt côté code.** Il reste juste les actions manuelles côté utilisateur :
1. Créer un compte GitHub (3 min)
2. Créer un repo `pts-maths` (2 min)
3. Drag & drop tous les fichiers (2 min)
4. Activer GitHub Pages dans Settings (1 min)
5. Tester sur l'URL `https://[username].github.io/pts-maths/`

**Tout est documenté dans `DEPLOY.md`** avec captures détaillées de chaque étape.

### B. Tester l'app
nini n'a pas encore testé personnellement :
- L'animation Sans Faute
- Le feedback IA Gemini (nécessite création de clé sur aistudio.google.com/apikey)
- L'évaluation finale complète sur un chapitre

### C. Étape 5 — IndexedDB (silent refactor)
Optionnel, pas urgent. Permet de stocker plus de contenu (~illimité) au lieu de localStorage (~5 MB). À faire seulement si le contenu dépasse 5 MB.

### D. Étapes 9-13 — Production Terminale Spé Maths
Été 2026. Chapitres Terminale spé :
- Limites de suites
- Continuité
- Compléments dérivation (composée, exponentielle, log, etc.)
- Fonction exponentielle
- Fonction logarithme népérien
- Trigonométrie (Terminale)
- Suites majorées/minorées/bornées
- Probabilités (loi binomiale, échantillonnage)
- Vecteurs et produit scalaire dans l'espace
- Géométrie dans l'espace
- Schéma de Bernoulli, loi binomiale

### E. Améliorations cosmétiques (post-MVP)
- Sons plus jolis (samples au lieu de Web Audio API)
- Stats / profile screen
- Définir la récompense Prestige niveau 20
- Vrais Monka videos pour les chapitres Bases (à valider une par une)

---

## 8. 🐛 BUGS CONNUS & LIMITATIONS

| Bug / Limitation | Statut | Fix |
|---|---|---|
| Vidéos YouTube erreur 153 sur `file://` | Bloquant en local | ✅ Auto-résolu au déploiement HTTPS |
| PWA install indisponible en `file://` | Bloquant en local | ✅ Auto-résolu au déploiement |
| L'outil Edit/Write a un cache qui ne sync pas toujours | Workaround Python via bash | Voir section "Note technique" plus haut |
| Pollinations parfois lent (5-15 s) | Acceptable, loader affiché | — |
| Certaines vidéos Monka des Bases sont des fallbacks génériques | À améliorer | Production étape 9+ |

---

## 9. 📌 NOTES SUR NINI

- **Style de communication** : dictée vocale fréquente, typos, phrases longues — toujours clarifier si ambigu
- A insisté sur l'**animation Sans Faute** spectaculaire (livrée)
- A demandé le **mode sombre** complet (livré)
- A demandé l'**onglet Bases** pour les prérequis collège/seconde (livré, 8 chapitres remplis)
- A proposé lui-même la **boutique XP** et le **studio de création d'images**
- Préfère qu'on enchaîne plusieurs étapes en autonomie quand il est absent
- N'a pas encore testé l'animation Sans Faute ni le feedback IA Gemini

---

## 10. 📞 RÉFÉRENCES

- **Yvan Monka** : chaîne YouTube *maths et tiques* + `maths-et-tiques.fr`
- **Pollinations.ai** : `https://image.pollinations.ai/prompt/...`
- **Gemini API** : `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent` (clé sur `aistudio.google.com/apikey`)
- **KaTeX docs** : `https://katex.org/docs/supported.html`
- **GitHub Pages docs** : `https://docs.github.com/en/pages`

---

## Fin du document

**Reste honnête, reste pédagogue, reste à l'écoute. nini est un excellent porteur de projet — il sait ce qu'il veut, il fait confiance, et il veut un produit beau et fonctionnel pour son bac. Le MVP est largement atteint. Reste à déployer et à compléter Terminale pour avoir l'app complète.** 💪
