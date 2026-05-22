# PTS-Maths — État du projet

> Document de suivi pour reprendre le projet d'une session à l'autre.
> Dernière mise à jour : 17 mai 2026.

---

## Vision

PTS-Maths est une **application desktop (PWA)** qui aide les lycéens français en **spécialité mathématiques** (Première & Terminale) à apprendre, s'entraîner et réviser leur programme officiel, via une boucle d'apprentissage progressive (vidéo → explication → exercices → maîtrise → évaluation) inspirée de **Khan Academy** et **Duolingo**, avec la qualité pédagogique de **Yvan Monka**.

**Cible** : ilyas (Première spé maths, lycée Fénelon de Lille, mai 2026) + futurs utilisateurs si publication.

---

## Décisions stratégiques verrouillées

| Décision | Choix |
|---|---|
| **Format** | PWA (icône desktop + web + futur mobile), 1 codebase |
| **Budget** | 0 € à l'usage (max 5 €) |
| **Stack** | HTML + CSS + JS pur + Tailwind CDN, IndexedDB, GitHub Pages |
| **IA en amont** (production contenu) | Claude Opus + SymPy (vérif symbolique) + cross-check IA + fiches Monka |
| **IA en aval** (feedback erreur) | **Gemini free tier** (clé API à configurer étape 7) |
| **Image generation** | **Pollinations.ai** (gratuit, sans clé) — pas Gemini car qualité art supérieure |
| **Stratégie contenu** | Vidéos Yvan Monka en source de vérité, exercices générés + validés |
| **Ordre construction** | MVP = 1 chapitre → V1 = Première complète été 2026 → V2 = Terminale (validée par cross-IA, pas par ilyas) |

## Pédagogie

- **Verrouillage séquentiel** : chaque propriété déverrouille la suivante quand maîtrisée
- **Sur échec exercice** → rejoué en fin de session avec **3× plus** d'exemples
- **Sur échec à nouveau** → même volume, exos différents (anti-mémorisation)
- **Éval finale** : 2 exos par propriété, **4 à 5 évaluations différentes** par chapitre en rotation
- **Récompenses** : étoile par chapitre validé sans faute, bouton reset chapitre, drapeau 🚩 signalement erreur

---

## Chapitres prioritaires (production semaine 2)

1. **Produit scalaire** (Première) — 5 propriétés définies
2. **Application du produit scalaire / Géométrie repérée** (Première) — 5 propriétés définies
3. **Suites arithmétiques et géométriques** (Première) — 5 propriétés définies

(Les autres chapitres viendront ensuite — Première complète été 2026, Terminale ensuite.)

---

## Étapes — État d'avancement

### ✅ TERMINÉ

- [x] **Phase 0** — Découverte
- [x] **Phase 1** — Cadrage Produit (vision, MVP, métriques, risques)
- [x] **Phase 2** — Architecture Technique (PWA, stack, hébergement)
- [x] **Phase 3** — Intégration IA (pipeline 5 couches : Opus + SymPy + 2e IA + Monka + 🚩 user ; Gemini en aval)
- [x] **Phase 4** — Plan de Développement (roadmap 2 semaines)
- [x] **Étape 1** — Scaffold PWA (index.html, app.js, styles.css, manifest, SW, icônes)
- [x] **Étape 1 bis** — Onboarding (prénom + classe), écran d'accueil immersif, XP/niveau, sons Web Audio, confettis canvas-confetti
- [x] **Étape 1.5** — Boutique : 4 fonds (Aurore/Minuit/Coucher de soleil/Forêt), 5 titres colorés, bouclier 100 XP, défi dimanche (niv. 5+), prestige (niv. 20)
- [x] **Étape 1.6** — Studio création d'images via Pollinations (1000 XP, 1/jour, fonds custom auto-ajoutés à la collection)
- [x] **Étape 2** — Vue détaillée d'un chapitre (hero + propriétés avec verrouillage séquentiel + éval finale dorée verrouillée)
- [x] **Bugfixes** — Streak/XP miroirs sur vue chapitre + thèmes wallpaper sur TOUS les écrans via `body[data-wallpaper]`

### 🚧 EN COURS (prochaine session)

- [ ] **Étape 3** — Vue propriété : YouTube embed Yvan Monka + explication écrite + bouton "Passer aux exercices"

### 🔜 À VENIR

- [ ] **Étape 4** — Boucle d'apprentissage (exercices, validation, XP, retry rule "3× plus")
- [ ] **Étape 5** — IndexedDB (remplacer localStorage), tracking précis de la progression
- [ ] **Étape 6** — Mode évaluation finale (2 exos × N propriétés, rotation de 4-5 évals)
- [ ] **Étape 7** — Intégration **Gemini free tier** pour feedback d'erreur personnalisé + clé API utilisateur stockée localement
- [ ] **Étapes 8-13** — Production du contenu des 3 chapitres prioritaires (Produit scalaire / Géométrie repérée / Suites)
- [ ] **Étape 14** — Tests finaux + déploiement GitHub Pages

### Post-MVP

- [ ] Enrichissement à 4-5 évals par chapitre
- [ ] Tous les autres chapitres de Première (été 2026)
- [ ] Tous les chapitres de Terminale (été 2026, cross-validation IA)
- [ ] Mode "défi du dimanche" actif (gamification)
- [ ] Récompense prestige niveau 20 (à définir)
- [ ] Migration vers compte utilisateur + synchro multi-appareils (si publication)

---

## Stack technique en place

**Fichiers du projet** (dans `C:\Users\ilyas\OneDrive\Desktop\PTS-Maths`) :
- `index.html` — entrée principale, contient tous les écrans (onboarding, home, dashboard, chapter, shop, studio, settings modal)
- `app.js` — toute la logique JS (state, navigation, XP, sons, confettis, boutique, studio, etc.)
- `styles.css` — styles complémentaires à Tailwind (wallpapers, animations, transitions)
- `manifest.json` — PWA manifest
- `service-worker.js` — cache offline + install
- `assets/` — icônes (icon.svg, icon-192.png, icon-512.png, icon-maskable-512.png, favicon-32.png)

**Persistance** : `localStorage` sous la clé `pts-maths-state-v1`. Migration vers IndexedDB prévue étape 5.

**Dépendances externes** :
- Tailwind CSS via CDN (`cdn.tailwindcss.com`)
- Google Fonts Inter (`fonts.googleapis.com`)
- canvas-confetti via jsDelivr
- Pollinations.ai pour génération d'images (pas de clé API)
- Gemini (à venir étape 7, clé utilisateur)

---

## Comment reprendre le projet en nouvelle session

1. **Réouvrir le dossier** `C:\Users\ilyas\OneDrive\Desktop\PTS-Maths` dans Cowork
2. **Lire ce document** (`PROJECT_STATE.md`) pour comprendre l'état
3. **Continuer à l'étape "En cours"** ci-dessus (actuellement étape 3 — vue propriété)
4. Garder le **ton de fond** : honnêteté radicale, étape par étape, vulgarisation, validation avant chaque grosse décision
5. L'utilisateur s'appelle **ilyas** et est un **vrai débutant en code** — ne pas le bombarder de jargon

---

## Notes & idées en attente

- **Récompense prestige niveau 20** : à définir avec ilyas quand il en approche (idée mentionnée : "voix personnalisée" ou autre cosmétique unique)
- **Sons** : ilyas a noté qu'ils sont "pas mal mais on peut faire mieux" — à itérer plus tard (peut-être des sons réels au lieu de Web Audio API)
- **Mise à jour PWA** : actuellement on ouvre `index.html` en `file://`. Le vrai install PWA nécessitera déploiement HTTPS (étape 14, GitHub Pages)
