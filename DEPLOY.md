# 🚀 Déployer PTS-Maths sur GitHub Pages

> Guide pas à pas pour passer de **« le fichier sur mon bureau »** à **« une vraie app accessible depuis n'importe où via un lien »**.
>
> Bénéfices du déploiement :
> - Les vidéos YouTube fonctionnent à 100 %
> - L'app est installable comme une vraie PWA (icône sur le bureau via Chrome)
> - Le mode hors ligne marche (Service Worker activé)
> - Tu peux partager un lien à n'importe qui
> - HTTPS pour toutes les fonctionnalités modernes
>
> **Durée totale : 10 minutes**, dont 3 minutes de création de compte si tu n'as pas encore de GitHub.

---

## Étape 1 — Créer un compte GitHub (3 min)

Si tu as déjà un compte GitHub, saute à l'étape 2.

1. Va sur **https://github.com/signup**
2. Renseigne ton email et un mot de passe
3. Choisis un **nom d'utilisateur** (ex : `ilyas-nini`) — il apparaîtra dans ton URL publique
4. Confirme ton email (un mail t'est envoyé)
5. Tu peux skipper toutes les questions d'onboarding

## Étape 2 — Créer le dépôt (2 min)

1. Une fois connecté, clique sur le **+** en haut à droite → **New repository**
2. Remplis le formulaire :
   - **Repository name** : `pts-maths`
   - **Description** : `App de révision pour spé maths` (facultatif)
   - **Visibility** : choisis **Public** (obligatoire pour GitHub Pages gratuit)
   - Coche **Add a README file** : non, on en a déjà un
   - Coche **Add .gitignore** : non
3. Clique **Create repository**

Tu vois maintenant une page presque vide avec ton repo `pts-maths`.

## Étape 3 — Uploader les fichiers (2 min)

GitHub propose un upload simple via le navigateur :

1. Sur la page de ton repo, clique sur **uploading an existing file** (le lien dans le texte gris)
2. Ouvre ton dossier `C:\Users\ilyas\OneDrive\Desktop\PTS-Maths` dans l'Explorateur Windows
3. **Sélectionne TOUS les fichiers et dossiers** (Ctrl + A) :
   - `index.html`
   - `app.js`
   - `styles.css`
   - `manifest.json`
   - `service-worker.js`
   - `README.md`
   - `DEPLOY.md`
   - `PROJECT_STATE.md`
   - `HANDOVER.md`
   - `.gitignore`
   - Dossier `assets/`
4. **Glisse-dépose** la sélection dans la zone d'upload GitHub
5. Patiente quelques secondes que les fichiers se téléversent
6. En bas, dans **Commit changes** :
   - Message : `Initial commit — PTS-Maths v0.4`
   - Clique **Commit changes**

Les fichiers sont maintenant dans ton repo GitHub.

## Étape 4 — Activer GitHub Pages (1 min)

1. Sur ton repo, clique sur l'onglet **Settings** (tout à droite en haut)
2. Dans le menu de gauche, clique sur **Pages**
3. Dans la section **Build and deployment** :
   - **Source** : choisis **Deploy from a branch**
   - **Branch** : choisis **main** + dossier **/ (root)** + clique **Save**
4. Une bannière jaune apparaît : « Your site is being deployed »
5. Attends **30 à 60 secondes**, puis rafraîchis la page
6. Tu vois en haut : **Your site is live at `https://[ton-username].github.io/pts-maths/`**

## Étape 5 — Tester (2 min)

1. Clique sur le lien (ou copie-le dans ton navigateur)
2. L'app s'ouvre — tu vois l'écran d'onboarding (premier lancement)
3. Crée ton profil (prénom + classe)
4. **Vérifie que les vidéos YouTube fonctionnent** : va dans Première → Produit scalaire → Définition → clique sur la vidéo
5. **Installe l'app** : Chrome devrait te proposer une icône d'installation dans la barre d'URL (ou via les 3 points → Installer PTS-Maths)
6. **Partage** le lien à un ami pour tester !

---

## 🔧 Pour mettre à jour l'app

Quand tu fais des modifs en local (ou avec Claude), il faut re-uploader :

1. Va sur ton repo GitHub
2. Pour chaque fichier modifié : clique dessus → icône crayon (Edit) en haut à droite
3. Ou plus rapide : **Add file** → **Upload files** → glisse les nouveaux fichiers (ils remplaceront les anciens)
4. Commit
5. GitHub Pages se met à jour automatiquement en 1 minute

## 🌐 Nom de domaine personnalisé (facultatif, plus tard)

Si tu veux `https://pts-maths.fr` au lieu de `[username].github.io/pts-maths/` :

1. Achète un domaine sur **Gandi**, **OVH** ou **Namecheap** (8-15 €/an)
2. Dans Settings → Pages → Custom domain : entre ton domaine
3. Suis les instructions pour les enregistrements DNS

Mais ce n'est pas du tout obligatoire — le lien GitHub Pages marche parfaitement.

---

## ❓ Problèmes possibles

**« Mon lien renvoie une 404 »** : attends 1-2 minutes que le déploiement finisse. Sinon vérifie que ton fichier `index.html` est bien à la racine du repo (pas dans un sous-dossier).

**« L'app charge mais pas les vidéos »** : c'était le problème en `file://`, mais en HTTPS sur GitHub Pages ça devrait marcher. Si une vidéo précise ne marche pas, c'est probablement un embed désactivé par l'auteur (utilise le bouton 🚩 pour la signaler).

**« Je ne vois pas le bouton Installer »** : ouvre l'app dans Chrome ou Edge (pas Firefox). L'install PWA n'est dispo que sur ces navigateurs.

---

Bonne mise en ligne ! 🚀
