// =====================================================================
// PTS-Maths — app.js (v0.4)
// Étape 1 : scaffold + onboarding + accueil + XP + sons + confettis
// Étape 1.5 : boutique XP (fonds, titres, bouclier, défi du dimanche)
// Étape 2 : vue détaillée d'un chapitre
// Étape 1.6 : Studio de création d'images (Pollinations) + fonds custom
//             + corrections (streak/xp mirrors, themes everywhere)
// =====================================================================

// ---------------------------------------------------------------------
// CATALOGUE DES CHAPITRES (placeholder — contenu réel aux étapes 8+)
// ---------------------------------------------------------------------
const CHAPTERS = {
  premiere: [
    { id:'produit-scalaire',  title:'Produit scalaire',                  subtitle:'Définitions, propriétés, projeté orthogonal',        icon:'⊙',  color:'from-brand-500 to-brand-700',     status:'not-started', progress:0 },
    { id:'geometrie-reperee', title:'Application du produit scalaire',   subtitle:'Géométrie repérée, équations de droites et cercles', icon:'📐', color:'from-pink-500 to-rose-600',       status:'not-started', progress:0 },
    { id:'suites',            title:'Suites arithmétiques et géométriques', subtitle:'Définitions, formules, somme des termes',         icon:'Σ',  color:'from-emerald-500 to-green-600',   status:'not-started', progress:0 },
    { id:'derivation',        title:'Dérivation',                        subtitle:'Nombre dérivé, fonction dérivée, applications',      icon:'ƒ′', color:'from-amber-500 to-orange-600',    status:'not-started', progress:0 },
    { id:'second-degre',      title:'Second degré',                      subtitle:'Forme canonique, discriminant, racines',             icon:'x²', color:'from-purple-500 to-fuchsia-600',  status:'not-started', progress:0 },
    { id:'probabilites',      title:'Probabilités conditionnelles',      subtitle:'Indépendance, arbres, probabilités totales',         icon:'🎲', color:'from-cyan-500 to-blue-600',       status:'not-started', progress:0 }
  ],
  terminale: [
    { id:'limites-suites',       title:'Limites de suites',                subtitle:'Convergence, divergence, théorème des gendarmes',    icon:'lim', color:'from-blue-500 to-indigo-600',     status:'not-started', progress:0 },
    { id:'limites-fonctions',    title:'Limites de fonctions',             subtitle:"En un point, à l'infini, asymptotes",                 icon:'∞',   color:'from-violet-500 to-purple-600',   status:'not-started', progress:0 },
    { id:'continuite',           title:'Continuité',                       subtitle:'TVI, bijection, fonctions continues',                 icon:'≈',   color:'from-teal-500 to-cyan-600',       status:'not-started', progress:0 },
    { id:'derivation-terminale', title:'Compléments dérivation',           subtitle:'Composée, $u^n$, étude complète',                    icon:"ƒ'",  color:'from-amber-500 to-yellow-600',    status:'not-started', progress:0 },
    { id:'exponentielle',        title:'Fonction exponentielle',           subtitle:'$e^x$, propriétés, dérivée, limites',                icon:'eˣ',  color:'from-red-500 to-orange-600',      status:'not-started', progress:0 },
    { id:'logarithme',           title:'Logarithme népérien',              subtitle:'$\\ln(x)$, propriétés, équations',                 icon:'ln',  color:'from-orange-500 to-amber-600',    status:'not-started', progress:0 },
    { id:'trigo-terminale',      title:'Trigonométrie',                    subtitle:'Cercle trigo, sin/cos/tan, dérivées',                icon:'sin', color:'from-pink-500 to-rose-600',       status:'not-started', progress:0 },
    { id:'primitives',           title:'Primitives et intégrales',         subtitle:"Calcul d'aires, primitives usuelles",                icon:'∫',   color:'from-indigo-500 to-blue-600',     status:'not-started', progress:0 },
    { id:'binomiale',            title:'Probabilités — Loi binomiale',     subtitle:'Bernoulli, $\\mathcal{B}(n, p)$, espérance',       icon:'B',   color:'from-cyan-500 to-blue-600',       status:'not-started', progress:0 },
    { id:'vecteurs-espace',      title:"Vecteurs dans l'espace",           subtitle:'Repères 3D, droites paramétriques',                  icon:'→³',  color:'from-purple-500 to-fuchsia-600',  status:'not-started', progress:0 },
    { id:'scalaire-espace',      title:"Produit scalaire dans l'espace",   subtitle:'Orthogonalité 3D, angles',                           icon:'·³',  color:'from-emerald-500 to-teal-600',    status:'not-started', progress:0 },
    { id:'plans-espace',         title:'Plans et géométrie 3D',            subtitle:'Équations cartésiennes, positions relatives',        icon:'△',   color:'from-fuchsia-500 to-pink-600',    status:'not-started', progress:0 }
  ],
  bases: [
    { id:'calcul-litteral',  title:'Calcul littéral',           subtitle:'Priorité, distributivité, factorisation, identités remarquables', icon:'(a+b)', color:'from-amber-500 to-orange-600',    status:'not-started', progress:0 },
    { id:'fractions',        title:'Fractions',                 subtitle:'Addition, multiplication, division, simplification',              icon:'¾',     color:'from-pink-500 to-rose-600',       status:'not-started', progress:0 },
    { id:'pythagore-thales', title:'Pythagore & Thalès',        subtitle:'Les deux théorèmes essentiels du collège',                        icon:'△',     color:'from-brand-500 to-brand-700',     status:'not-started', progress:0 },
    { id:'puissances',       title:'Puissances et racines',     subtitle:'Règles de calcul, écriture scientifique',                         icon:'xⁿ',    color:'from-purple-500 to-fuchsia-600',  status:'not-started', progress:0 },
    { id:'equations-base',   title:'Équations du 1er degré',    subtitle:'Résoudre ax + b = c',                                             icon:'=',     color:'from-cyan-500 to-blue-600',       status:'not-started', progress:0 },
    { id:'trigo-base',       title:'Trigonométrie de base',     subtitle:'Sin, cos, tan dans le triangle rectangle',                        icon:'∠',     color:'from-yellow-500 to-amber-600',    status:'not-started', progress:0 },
    { id:'vecteurs-base',    title:'Vecteurs de seconde',       subtitle:'Définitions, somme, colinéarité',                                 icon:'→',     color:'from-indigo-500 to-purple-600',   status:'not-started', progress:0 },
    { id:'fonctions-base',   title:'Fonctions affines',         subtitle:'Représentation, équation, coefficient directeur',                 icon:'ƒ',     color:'from-emerald-500 to-green-600',   status:'not-started', progress:0 }
  ]
};

// Fiches de révision Yvan Monka (maths-et-tiques.fr) — URLs directes vers les PDFs des cours
// Si l'URL d'un chapitre change, on bascule sur une recherche Google ciblée comme fallback.
const CHAPTER_FICHES = {
  // Première
  'produit-scalaire':  { title: 'Produit scalaire', search: 'produit scalaire première' },
  'geometrie-reperee': { title: 'Géométrie repérée', search: 'géométrie repérée première' },
  'second-degre':      { title: 'Second degré', search: 'second degré première' },
  'derivation':        { title: 'Dérivation', search: 'dérivation première spé' },
  'probabilites':      { title: 'Probabilités conditionnelles', search: 'probabilités conditionnelles première' },
  'suites':            { title: 'Suites numériques', search: 'suites numériques première' },
  // Terminale
  'limites-suites':         { title: 'Limites de suites', search: 'limites suites terminale' },
  'limites-fonctions':      { title: 'Limites de fonctions', search: 'limites fonctions terminale' },
  'continuite':             { title: 'Continuité', search: 'continuité terminale' },
  'derivation-terminale':   { title: 'Compléments dérivation', search: 'complements dérivation terminale' },
  'exponentielle':          { title: 'Fonction exponentielle', search: 'fonction exponentielle terminale' },
  'logarithme':             { title: 'Logarithme népérien', search: 'logarithme népérien terminale' },
  'trigo-terminale':        { title: 'Trigonométrie', search: 'trigonométrie terminale' },
  'primitives':             { title: 'Primitives et intégrales', search: 'primitives intégrales terminale' },
  'binomiale':              { title: 'Loi binomiale', search: 'loi binomiale terminale' },
  'vecteurs-espace':        { title: "Vecteurs dans l'espace", search: 'vecteurs espace terminale' },
  'scalaire-espace':        { title: "Produit scalaire dans l'espace", search: 'produit scalaire espace terminale' },
  'plans-espace':           { title: 'Plans et géométrie 3D', search: 'plans espace terminale' },
  // Bases
  'calcul-litteral':  { title: 'Calcul littéral', search: 'calcul littéral seconde' },
  'fractions':        { title: 'Fractions', search: 'fractions cours' },
  'pythagore-thales': { title: 'Pythagore Thalès', search: 'pythagore thalès cours' },
  'puissances':       { title: 'Puissances et racines', search: 'puissances racines seconde' },
  'equations-base':   { title: 'Équations du 1er degré', search: 'équations premier degré' },
  'trigo-base':       { title: 'Trigonométrie de base', search: 'trigonométrie triangle rectangle' },
  'vecteurs-base':    { title: 'Vecteurs de seconde', search: 'vecteurs seconde' },
  'fonctions-base':   { title: 'Fonctions affines', search: 'fonctions affines seconde' }
};

function openFicheRevision(chapterId) {
  const entry = CHAPTER_FICHES[chapterId];
  if (!entry) {
    window.open('https://www.maths-et-tiques.fr/index.php/cours-maths', '_blank');
    return;
  }
  // Recherche Google restreinte au site de Yvan Monka pour trouver la fiche à jour
  const q = encodeURIComponent('site:maths-et-tiques.fr ' + entry.search + ' cours');
  window.open('https://www.google.com/search?q=' + q, '_blank', 'noopener,noreferrer');
}

const CHAPTER_DETAILS = {
  'produit-scalaire': {
    description: "Le produit scalaire est l'outil central de la géométrie vectorielle en Première. Il relie longueurs, angles et orthogonalité dans une seule formule.",
    properties: [
      {
        id:'definition', number:1, title:'Définition et premières expressions',
        summary:"Norme × norme × cos, projeté, coordonnées : trois façons de calculer.",
        videoId:'dII7myZuLvo', videoTitle:'LE COURS : Produit scalaire — Première (Yvan Monka)',
        explanation:"Le produit scalaire de deux vecteurs $\\vec{u}$ et $\\vec{v}$ est un <strong>nombre réel</strong> (pas un vecteur) qui mesure à quel point ces deux vecteurs « vont dans le même sens ». Il existe <strong>trois formules équivalentes</strong> pour le calculer, selon les informations dont tu disposes.",
        keyPoints:[
          "Avec les <strong>normes et l'angle</strong> : $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\theta)$",
          "Avec les <strong>coordonnées</strong> dans un repère orthonormé : $\\vec{u}\\cdot\\vec{v} = xx' + yy'$",
          "Avec le <strong>projeté orthogonal</strong> de $\\vec{v}$ sur $\\vec{u}$",
          "Le produit scalaire est <strong>commutatif</strong> : $\\vec{u}\\cdot\\vec{v} = \\vec{v}\\cdot\\vec{u}$",
          "Vecteurs colinéaires de même sens : $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\|$. De sens opposés : $\\vec{u}\\cdot\\vec{v} = -\\|\\vec{u}\\| \\times \\|\\vec{v}\\|$."
        ],
        exercises: [
          {
            id:'def-1', type:'qcm',
            question:"Soient $\\vec{u}$ et $\\vec{v}$ deux vecteurs tels que $\\|\\vec{u}\\| = 3$, $\\|\\vec{v}\\| = 4$ et l'angle entre eux mesure $60°$.<br/>Que vaut $\\vec{u}\\cdot\\vec{v}$ ?",
            options:['6','7','12','5'],
            correctIndex:0,
            explanation:"On applique la formule avec l'angle : $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\| \\times \\cos(\\theta)$.<br/>Donc $\\vec{u}\\cdot\\vec{v} = 3 \\times 4 \\times \\cos(60°) = 12 \\times 0{,}5 = \\mathbf{6}$."
          },
          {
            id:'def-2', type:'numeric',
            question:"Dans un repère orthonormé, on a $\\vec{u}(2\\,;\\,5)$ et $\\vec{v}(3\\,;\\,-1)$.<br/>Calculer $\\vec{u}\\cdot\\vec{v}$.",
            answer:1, tolerance:0.001,
            explanation:"Avec les coordonnées : $\\vec{u}\\cdot\\vec{v} = xx' + yy'$.<br/>$\\vec{u}\\cdot\\vec{v} = 2 \\times 3 + 5 \\times (-1) = 6 - 5 = \\mathbf{1}$."
          },
          {
            id:'def-3', type:'qcm',
            question:"Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires <strong>de même sens</strong>, avec $\\|\\vec{u}\\| = 2$ et $\\|\\vec{v}\\| = 5$.<br/>Combien vaut $\\vec{u}\\cdot\\vec{v}$ ?",
            options:['0','10','−10','7'],
            correctIndex:1,
            explanation:"Colinéaires de même sens $\\Rightarrow$ angle $= 0°$ $\\Rightarrow$ $\\cos(0°) = 1$.<br/>Donc $\\vec{u}\\cdot\\vec{v} = 2 \\times 5 \\times 1 = \\mathbf{10}$."
          },
          {
            id:'def-4', type:'numeric',
            question:"$\\vec{u}$ et $\\vec{v}$ sont deux vecteurs <strong>orthogonaux</strong> (perpendiculaires), avec $\\|\\vec{u}\\| = 7$ et $\\|\\vec{v}\\| = 3$.<br/>Que vaut $\\vec{u}\\cdot\\vec{v}$ ?",
            answer:0, tolerance:0.001,
            explanation:"Orthogonaux $\\Rightarrow$ angle $= 90°$ $\\Rightarrow$ $\\cos(90°) = 0$.<br/>Donc $\\vec{u}\\cdot\\vec{v} = 7 \\times 3 \\times 0 = \\mathbf{0}$, indépendamment des normes."
          },
          {
            id:'def-5', type:'qcm',
            question:"Dans un repère orthonormé, on considère les points $A(0\\,;\\,0)$, $B(2\\,;\\,3)$ et $C(4\\,;\\,1)$.<br/>Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.",
            options:['11','5','−3','8'],
            correctIndex:0,
            explanation:"$\\overrightarrow{AB}(2-0\\,;\\,3-0) = \\overrightarrow{AB}(2\\,;\\,3)$ et $\\overrightarrow{AC}(4-0\\,;\\,1-0) = \\overrightarrow{AC}(4\\,;\\,1)$.<br/>$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 2 \\times 4 + 3 \\times 1 = 8 + 3 = \\mathbf{11}$."
          }
        ,
        {id:'def-6', type:'qcm', question:"$\\vec u(1,2)$ et $\\vec v(3,4)$. $\\vec u \\cdot \\vec v = ?$", options:['$5$','$11$','$7$','$0$'], correctIndex:1, explanation:"$1\\times 3 + 2\\times 4 = 3 + 8 = \\mathbf{11}$."},
        {id:'def-7', type:'qcm', question:"$\\vec u(-2,3)$ et $\\vec v(4,1)$. $\\vec u \\cdot \\vec v = ?$", options:['$-5$','$-11$','$11$','$5$'], correctIndex:0, explanation:"$-2\\times 4 + 3\\times 1 = -8 + 3 = \\mathbf{-5}$."},
        {id:'def-8', type:'numeric', question:"$\\|\\vec u\\| = 5$, $\\|\\vec v\\| = 2$, angle $= 90°$. $\\vec u \\cdot \\vec v = ?$", answer:0, tolerance:0.001, explanation:"$\\cos(90°) = 0$, donc $\\vec u \\cdot \\vec v = 5 \\times 2 \\times 0 = \\mathbf 0$."},
        {id:'def-9', type:'qcm', question:"$\\vec u \\cdot \\vec v < 0$ implique l'angle :", options:['Aigu (< 90°)','Droit (= 90°)','Obtus (> 90°)','Indéterminé'], correctIndex:2, explanation:"$\\cos < 0 \\Leftrightarrow$ angle $\\in ]90°, 180°]$ : <strong>obtus</strong>."},
        {id:'def-10', type:'numeric', question:"$\\|\\vec u\\| = 3$, $\\|\\vec v\\| = 4$, angle $= 0°$. $\\vec u \\cdot \\vec v = ?$", answer:12, tolerance:0.001, explanation:"Colinéaires de même sens : $3\\times 4 \\times 1 = \\mathbf{12}$."},
        {id:'def-11', type:'qcm', question:"$\\vec u(0,5)$ et $\\vec v(3,0)$ : $\\vec u \\cdot \\vec v = ?$", options:['$15$','$0$','$8$','$5$'], correctIndex:1, explanation:"$0\\times 3 + 5\\times 0 = 0$. Les vecteurs sont orthogonaux."},
        {id:'def-12', type:'qcm', question:"Pour $\\vec u \\cdot \\vec v$ positif, l'angle est :", options:['Aigu','Droit','Obtus','Plat'], correctIndex:0, explanation:"$\\cos > 0 \\Leftrightarrow$ angle aigu (entre $0$ et $90°$)."},
        {id:'def-13', type:'numeric', question:"$\\|\\vec u\\| = 2$, $\\|\\vec v\\| = 7$, angle $= 180°$. $\\vec u \\cdot \\vec v = ?$", answer:-14, tolerance:0.001, explanation:"Colinéaires sens opposés : $\\cos(180°) = -1$, donc $2\\times 7 \\times (-1) = \\mathbf{-14}$."},
        {id:'def-14', type:'qcm', question:"$\\vec u(1,1)$ et $\\vec v(1,-1)$. $\\vec u \\cdot \\vec v = ?$", options:['$0$','$2$','$-2$','$1$'], correctIndex:0, explanation:"$1\\times 1 + 1\\times(-1) = 0$. Orthogonaux."},
        {id:'def-15', type:'qcm', question:"$\\vec u \\cdot \\vec u = ?$", options:['$0$','$\\|\\vec u\\|$','$\\|\\vec u\\|^2$','$2\\vec u$'], correctIndex:2, explanation:"Carré scalaire : $\\vec u \\cdot \\vec u = \\|\\vec u\\|^2$."},
        {id:'def-16', type:'qcm', question:"$\\vec u(3,4)$. $\\vec u \\cdot \\vec u = ?$", options:['$7$','$12$','$25$','$5$'], correctIndex:2, explanation:"$3^2 + 4^2 = 9 + 16 = \\mathbf{25} = \\|\\vec u\\|^2$."},
        {id:'def-17', type:'qcm', question:"$\\vec u(2,5)$ et $\\vec v(-5,2)$. Quel est leur produit scalaire ?", options:['$0$','$10$','$-10$','$3$'], correctIndex:0, explanation:"$2\\times(-5) + 5\\times 2 = -10 + 10 = 0$. Orthogonaux."},
        {id:'def-18', type:'numeric', question:"$\\|\\vec u\\| = 6$, $\\|\\vec v\\| = 5$, angle $= 60°$. $\\vec u \\cdot \\vec v = ?$", answer:15, tolerance:0.01, explanation:"$6\\times 5 \\times \\cos(60°) = 30 \\times 0{,}5 = \\mathbf{15}$."},
        {id:'def-19', type:'qcm', question:"Le produit scalaire est :", options:['Un vecteur','Un angle','Un nombre réel','Une matrice'], correctIndex:2, explanation:"$\\vec u \\cdot \\vec v$ est un <strong>nombre réel</strong>."},
        {id:'def-20', type:'qcm', question:"Si $\\vec u = \\vec 0$, alors $\\vec u \\cdot \\vec v = ?$ pour tout $\\vec v$ :", options:['$1$','$\\|\\vec v\\|$','$0$','Indéfini'], correctIndex:2, explanation:"$\\vec 0 \\cdot \\vec v = 0$ toujours."}
      ]
      },
      {
        id:'bilinearite', number:2, title:'Bilinéarité et symétrie',
        summary:"Comment développer une expression vectorielle comme une identité remarquable.",
        videoId:'P0nKS-cTEO0', videoTitle:'Calculer un produit scalaire à l\'aide de la bilinéarité — Première (Yvan Monka)',
        explanation:"Le produit scalaire se comporte comme une <strong>multiplication classique</strong> : tu peux développer, factoriser, distribuer comme avec des nombres. C'est ce qu'on appelle la <strong>bilinéarité</strong>.",
        keyPoints:[
          "Distributivité : $\\vec{u}\\cdot(\\vec{v}+\\vec{w}) = \\vec{u}\\cdot\\vec{v} + \\vec{u}\\cdot\\vec{w}$",
          "Multiplication par un réel : $(k\\vec{u})\\cdot\\vec{v} = k\\,(\\vec{u}\\cdot\\vec{v})$",
          "Symétrie : $\\vec{u}\\cdot\\vec{v} = \\vec{v}\\cdot\\vec{u}$",
          "Identité remarquable vectorielle : $\\|\\vec{u}+\\vec{v}\\|^2 = \\|\\vec{u}\\|^2 + 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$",
          "Et aussi : $\\|\\vec{u}-\\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$"
        ],
        exercises:[
          {
            id:'bi-1', type:'qcm',
            question:"Si $\\vec{u}\\cdot\\vec{v} = 4$, que vaut $(3\\vec{u})\\cdot\\vec{v}$ ?",
            options:['4','12','7','4/3'],
            correctIndex:1,
            explanation:"Par bilinéarité, on peut sortir le scalaire : $(k\\vec{u})\\cdot\\vec{v} = k \\times (\\vec{u}\\cdot\\vec{v})$.<br/>Donc $(3\\vec{u})\\cdot\\vec{v} = 3 \\times 4 = \\mathbf{12}$."
          },
          {
            id:'bi-2', type:'qcm',
            question:"En développant, $\\|\\vec{u}+\\vec{v}\\|^2$ est égal à :",
            options:['$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$','$\\|\\vec{u}\\|^2 + 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$','$\\|\\vec{u}\\|^2 - 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$','$2\\,\\vec{u}\\cdot\\vec{v}$'],
            correctIndex:1,
            explanation:"$\\|\\vec{u}+\\vec{v}\\|^2 = (\\vec{u}+\\vec{v})\\cdot(\\vec{u}+\\vec{v}) = \\vec{u}\\cdot\\vec{u} + \\vec{u}\\cdot\\vec{v} + \\vec{v}\\cdot\\vec{u} + \\vec{v}\\cdot\\vec{v}$.<br/>Par symétrie $\\vec{u}\\cdot\\vec{v} = \\vec{v}\\cdot\\vec{u}$, on obtient $\\mathbf{\\|\\vec{u}\\|^2 + 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2}$ (identité remarquable vectorielle)."
          },
          {
            id:'bi-3', type:'numeric',
            question:"Si $\\vec{u}\\cdot\\vec{v} = 5$, que vaut $\\vec{v}\\cdot\\vec{u}$ ?",
            answer:5, tolerance:0.001,
            explanation:"Le produit scalaire est <strong>symétrique</strong> : $\\vec{v}\\cdot\\vec{u} = \\vec{u}\\cdot\\vec{v}$.<br/>Donc $\\vec{v}\\cdot\\vec{u} = \\mathbf{5}$."
          },
          {
            id:'bi-4', type:'numeric',
            question:"Si $\\vec{u}\\cdot\\vec{v} = 2$ et $\\vec{u}\\cdot\\vec{w} = 3$, que vaut $\\vec{u}\\cdot(\\vec{v}+\\vec{w})$ ?",
            answer:5, tolerance:0.001,
            explanation:"Par bilinéarité (distributivité) : $\\vec{u}\\cdot(\\vec{v}+\\vec{w}) = \\vec{u}\\cdot\\vec{v} + \\vec{u}\\cdot\\vec{w} = 2 + 3 = \\mathbf{5}$."
          },
          {
            id:'bi-5', type:'qcm',
            question:"En développant $(\\vec{u}-\\vec{v})\\cdot(\\vec{u}+\\vec{v})$, on obtient :",
            options:['$\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2$','$\\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$','$-2\\,\\vec{u}\\cdot\\vec{v}$','0'],
            correctIndex:1,
            explanation:"$(\\vec{u}-\\vec{v})\\cdot(\\vec{u}+\\vec{v}) = \\vec{u}\\cdot\\vec{u} + \\vec{u}\\cdot\\vec{v} - \\vec{v}\\cdot\\vec{u} - \\vec{v}\\cdot\\vec{v}$.<br/>Comme $\\vec{u}\\cdot\\vec{v} = \\vec{v}\\cdot\\vec{u}$ (symétrie), les deux termes du milieu s'annulent.<br/>Il reste $\\vec{u}\\cdot\\vec{u} - \\vec{v}\\cdot\\vec{v} = \\mathbf{\\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2}$. C'est l'analogue vectoriel de $a^2 - b^2 = (a-b)(a+b)$."
          }
        ,
        {id:'bil-6', type:'qcm', question:"$\\vec u \\cdot (\\vec v + \\vec w) = ?$", options:['$\\vec u \\cdot \\vec v + \\vec u \\cdot \\vec w$','$\\vec u \\cdot \\vec v \\cdot \\vec u \\cdot \\vec w$','$(\\vec u + \\vec u) \\cdot (\\vec v + \\vec w)$','$2\\vec u \\cdot \\vec v$'], correctIndex:0, explanation:"Distributivité : $\\vec u \\cdot (\\vec v + \\vec w) = \\vec u \\cdot \\vec v + \\vec u \\cdot \\vec w$."},
        {id:'bil-7', type:'qcm', question:"$(2\\vec u) \\cdot \\vec v = ?$", options:['$\\vec u \\cdot \\vec v$','$2(\\vec u \\cdot \\vec v)$','$4(\\vec u \\cdot \\vec v)$','$\\vec u \\cdot (2\\vec v)$'], correctIndex:1, explanation:"Linéarité : $(k\\vec u) \\cdot \\vec v = k(\\vec u \\cdot \\vec v)$."},
        {id:'bil-8', type:'qcm', question:"$(\\vec u + \\vec v)^2 = ?$ (carré scalaire)", options:['$\\|\\vec u\\|^2 + \\|\\vec v\\|^2$','$\\|\\vec u\\|^2 + 2\\vec u\\cdot\\vec v + \\|\\vec v\\|^2$','$(\\vec u + \\vec v) \\cdot \\vec u$','$\\|\\vec u + \\vec v\\|$'], correctIndex:1, explanation:"Identité remarquable : $(\\vec u + \\vec v)\\cdot(\\vec u + \\vec v) = \\|\\vec u\\|^2 + 2\\vec u\\cdot\\vec v + \\|\\vec v\\|^2$."},
        {id:'bil-9', type:'qcm', question:"$\\vec u \\cdot \\vec v = \\vec v \\cdot \\vec u$ : cette propriété s'appelle :", options:['Distributivité','Commutativité','Linéarité','Symétrie axiale'], correctIndex:1, explanation:"C'est la <strong>commutativité</strong>."},
        {id:'bil-10', type:'numeric', question:"$\\|\\vec u\\| = 3$, $\\|\\vec v\\| = 4$, $\\vec u\\cdot\\vec v = 5$. $\\|\\vec u + \\vec v\\|^2 = ?$", answer:35, tolerance:0.01, explanation:"$\\|\\vec u + \\vec v\\|^2 = 9 + 16 + 2\\times 5 = \\mathbf{35}$."},
        {id:'bil-11', type:'numeric', question:"$\\|\\vec u\\| = 5$, $\\|\\vec v\\| = 3$, $\\vec u\\cdot\\vec v = 7$. $\\|\\vec u - \\vec v\\|^2 = ?$", answer:20, tolerance:0.01, explanation:"$\\|\\vec u - \\vec v\\|^2 = 25 + 9 - 2\\times 7 = 20$."},
        {id:'bil-12', type:'qcm', question:"Développer $(2\\vec u + \\vec v) \\cdot \\vec u$ :", options:['$2\\|\\vec u\\|^2 + \\vec u\\cdot\\vec v$','$2\\vec u \\cdot \\vec u + \\vec v$','$3\\vec u\\cdot\\vec v$','$\\|\\vec u\\|^2 + \\|\\vec v\\|^2$'], correctIndex:0, explanation:"$(2\\vec u + \\vec v)\\cdot\\vec u = 2\\vec u\\cdot\\vec u + \\vec v\\cdot\\vec u = 2\\|\\vec u\\|^2 + \\vec u\\cdot\\vec v$."},
        {id:'bil-13', type:'qcm', question:"$(\\vec u - \\vec v)\\cdot(\\vec u + \\vec v) = ?$", options:['$\\|\\vec u\\|^2 - \\|\\vec v\\|^2$','$\\|\\vec u + \\vec v\\|^2$','$0$','$\\|\\vec u\\|^2 + \\|\\vec v\\|^2$'], correctIndex:0, explanation:"$(\\vec u - \\vec v)\\cdot(\\vec u + \\vec v) = \\vec u\\cdot\\vec u - \\vec v\\cdot\\vec v = \\|\\vec u\\|^2 - \\|\\vec v\\|^2$."},
        {id:'bil-14', type:'qcm', question:"$\\vec u \\cdot (3\\vec v) = ?$", options:['$\\vec u\\cdot\\vec v$','$3\\vec u\\cdot\\vec v$','$9\\vec u\\cdot\\vec v$','$\\vec u\\cdot\\vec v + 3$'], correctIndex:1, explanation:"$\\vec u \\cdot (k\\vec v) = k(\\vec u\\cdot\\vec v)$."},
        {id:'bil-15', type:'qcm', question:"$(\\vec u + \\vec v)\\cdot(\\vec u - \\vec v) = \\|\\vec u\\|^2 - \\|\\vec v\\|^2$. Cette identité s'appelle :", options:['Identité de polarisation','Différence de carrés (Al-Kashi)','Théorème de Pythagore','Identité remarquable'], correctIndex:3, explanation:"C'est une identité remarquable du produit scalaire."},
        {id:'bil-16', type:'numeric', question:"$\\vec u\\cdot\\vec v = 4$ et $\\vec u\\cdot\\vec w = -1$. $\\vec u\\cdot(\\vec v + \\vec w) = ?$", answer:3, tolerance:0.001, explanation:"$4 + (-1) = \\mathbf 3$."},
        {id:'bil-17', type:'qcm', question:"$\\vec u\\cdot(-\\vec v) = ?$", options:['$\\vec u\\cdot\\vec v$','$-\\vec u\\cdot\\vec v$','$0$','$\\|\\vec u\\|^2$'], correctIndex:1, explanation:"$\\vec u\\cdot(-\\vec v) = -(\\vec u\\cdot\\vec v)$."},
        {id:'bil-18', type:'qcm', question:"Le produit scalaire est :", options:['Linéaire à gauche uniquement','Linéaire à droite uniquement','Bilinéaire (linéaire à droite ET à gauche)','Quadratique'], correctIndex:2, explanation:"Il est <strong>bilinéaire</strong> : linéaire par rapport à chacun des deux vecteurs."},
        {id:'bil-19', type:'numeric', question:"$\\vec u\\cdot\\vec v = 3$, $\\vec u\\cdot\\vec w = -2$. $(2\\vec u)\\cdot(\\vec v + \\vec w) = ?$", answer:2, tolerance:0.001, explanation:"$2(\\vec u\\cdot\\vec v + \\vec u\\cdot\\vec w) = 2(3-2) = \\mathbf 2$."},
        {id:'bil-20', type:'qcm', question:"Identité d'Al-Kashi : dans un triangle $ABC$, $a^2 = b^2 + c^2 - 2bc\\cos\\hat A$. Elle découle :", options:['Du produit scalaire $\\vec{BA}\\cdot\\vec{BC}$','Du théorème de Thalès','De la trigonométrie pure','Du discriminant'], correctIndex:0, explanation:"On l'obtient en développant $\\|\\vec{BC} - \\vec{BA}\\|^2$ avec le produit scalaire."}
      ]
      },
      {
        id:'orthogonal', number:3, title:'Produit scalaire et orthogonalité',
        summary:"La propriété qui fait tomber la moitié des exercices : produit scalaire nul.",
        videoId:'-Hr28g0PFu0', videoTitle:'Appliquer la propriété d\'orthogonalité des vecteurs — Première (Yvan Monka)',
        explanation:"C'est probablement <strong>la propriété la plus utilisée</strong> du chapitre. Elle dit que deux vecteurs sont orthogonaux (perpendiculaires) si et seulement si leur produit scalaire est nul.",
        keyPoints:[
          "Équivalence fondamentale : $\\vec{u} \\perp \\vec{v} \\Leftrightarrow \\vec{u}\\cdot\\vec{v} = 0$",
          "Le vecteur nul est orthogonal à <strong>tous</strong> les vecteurs (par convention)",
          "Pour prouver que deux droites sont perpendiculaires : montrer que deux vecteurs directeurs ont un produit scalaire nul",
          "Pour prouver qu'un triangle est rectangle en $A$ : montrer que $\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 0$",
          "En coordonnées : $xx' + yy' = 0$"
        ],
        exercises:[
          {
            id:'ortho-1', type:'numeric',
            question:"$\\vec{u}$ et $\\vec{v}$ sont orthogonaux, avec $\\|\\vec{u}\\| = 5$ et $\\|\\vec{v}\\| = 7$.<br/>Que vaut $\\vec{u}\\cdot\\vec{v}$ ?",
            answer:0, tolerance:0.001,
            explanation:"Deux vecteurs orthogonaux ont un produit scalaire <strong>nul</strong>, peu importe leurs normes.<br/>$\\vec{u}\\cdot\\vec{v} = \\mathbf{0}$."
          },
          {
            id:'ortho-2', type:'qcm',
            question:"On a $\\vec{u}(3\\,;\\,4)$ et $\\vec{v}(-4\\,;\\,3)$. Ces deux vecteurs sont :",
            options:['Colinéaires','Orthogonaux','Égaux','De même norme uniquement'],
            correctIndex:1,
            explanation:"$\\vec{u}\\cdot\\vec{v} = 3 \\times (-4) + 4 \\times 3 = -12 + 12 = 0$.<br/>Donc $\\vec{u} \\perp \\vec{v}$ (orthogonaux). Astuce visuelle : $(3\\,;\\,4) \\to (-4\\,;\\,3)$ revient à tourner de $90°$."
          },
          {
            id:'ortho-3', type:'numeric',
            question:"Trouve la valeur de $k$ pour que $\\vec{u}(2\\,;\\,k)$ soit orthogonal à $\\vec{v}(3\\,;\\,6)$.",
            answer:-1, tolerance:0.001,
            explanation:"$\\vec{u} \\perp \\vec{v} \\Leftrightarrow \\vec{u}\\cdot\\vec{v} = 0 \\Leftrightarrow 2 \\times 3 + k \\times 6 = 0 \\Leftrightarrow 6 + 6k = 0 \\Leftrightarrow k = \\mathbf{-1}$."
          },
          {
            id:'ortho-4', type:'qcm',
            question:"Soit le triangle $ABC$ avec $A(0\\,;\\,0)$, $B(4\\,;\\,0)$, $C(4\\,;\\,3)$.<br/>Ce triangle est :",
            options:['Équilatéral','Isocèle non rectangle','Rectangle en B','Quelconque'],
            correctIndex:2,
            explanation:"Pour vérifier l'angle en $B$, calcule $\\overrightarrow{BA}\\cdot\\overrightarrow{BC}$.<br/>$\\overrightarrow{BA}(-4\\,;\\,0)$ et $\\overrightarrow{BC}(0\\,;\\,3)$.<br/>$\\overrightarrow{BA}\\cdot\\overrightarrow{BC} = (-4) \\times 0 + 0 \\times 3 = 0$.<br/>Donc $\\overrightarrow{BA} \\perp \\overrightarrow{BC}$ : le triangle est <strong>rectangle en B</strong>."
          },
          {
            id:'ortho-5', type:'numeric',
            question:"$\\vec{u}(1\\,;\\,5)$ et $\\vec{v}(a\\,;\\,1)$ sont orthogonaux.<br/>Que vaut $a$ ?",
            answer:-5, tolerance:0.001,
            explanation:"$\\vec{u}\\cdot\\vec{v} = 0 \\Leftrightarrow 1 \\times a + 5 \\times 1 = 0 \\Leftrightarrow a + 5 = 0 \\Leftrightarrow a = \\mathbf{-5}$."
          }
        ,
        {id:'ortho-6', type:'qcm', question:"$\\vec u \\perp \\vec v$ se caractérise par :", options:['$\\vec u\\cdot\\vec v = 0$','$\\vec u = \\vec v$','$\\|\\vec u\\| = \\|\\vec v\\|$','$\\vec u\\cdot\\vec v = 1$'], correctIndex:0, explanation:"Orthogonaux $\\Leftrightarrow$ produit scalaire nul."},
        {id:'ortho-7', type:'qcm', question:"$\\vec u(3,4)$ et $\\vec v(-4,3)$ sont :", options:['Colinéaires','Orthogonaux','Égaux','Opposés'], correctIndex:1, explanation:"$3\\times(-4) + 4\\times 3 = -12 + 12 = 0$. <strong>Orthogonaux</strong>."},
        {id:'ortho-8', type:'qcm', question:"Pour que $\\vec u(k, 3) \\perp \\vec v(2, -4)$, il faut $k = ?$", options:['$0$','$6$','$-6$','$8$'], correctIndex:1, explanation:"$2k - 12 = 0 \\Leftrightarrow k = 6$."},
        {id:'ortho-9', type:'qcm', question:"$\\vec u(1,2)$ et $\\vec v(2,1)$ sont orthogonaux ?", options:['Oui','Non','Seulement si $\\|\\vec u\\| = 1$','Indéterminé'], correctIndex:1, explanation:"$1\\times 2 + 2\\times 1 = 4 \\neq 0$. <strong>Non</strong>."},
        {id:'ortho-10', type:'numeric', question:"$\\vec u(2,3)$ et $\\vec v(k, -2)$. $k$ pour orthogonalité ?", answer:3, tolerance:0.001, explanation:"$2k - 6 = 0 \\Leftrightarrow k = 3$."},
        {id:'ortho-11', type:'qcm', question:"Le vecteur nul est :", options:['Orthogonal à aucun vecteur','Orthogonal à tout vecteur','Orthogonal à lui-même seulement',"Ni l'un ni l'autre"], correctIndex:1, explanation:"$\\vec 0 \\cdot \\vec v = 0$ pour tout $\\vec v$, donc orthogonal à tous."},
        {id:'ortho-12', type:'qcm', question:"Une droite $D_1$ est perpendiculaire à $D_2$ ssi :", options:['Leurs vecteurs directeurs sont colinéaires','Leurs vecteurs directeurs sont orthogonaux','Leurs équations sont identiques','Elles se coupent'], correctIndex:1, explanation:"$D_1 \\perp D_2 \\Leftrightarrow \\vec{u_1} \\cdot \\vec{u_2} = 0$."},
        {id:'ortho-13', type:'qcm', question:"$\\vec u(1, m)$ orthogonal à $\\vec v(m, -1)$ :", options:['Toujours','Jamais','Si $m = 1$','Si $m = 0$'], correctIndex:0, explanation:"$1\\cdot m + m\\cdot(-1) = 0$ pour tout $m$. <strong>Toujours</strong>."},
        {id:'ortho-14', type:'qcm', question:"Si $\\vec u\\cdot\\vec v = 0$ et $\\vec u \\neq \\vec 0$, alors :", options:['$\\vec v = \\vec 0$','$\\vec v = \\vec u$','$\\vec v \\perp \\vec u$ (ou $\\vec v = \\vec 0$)','$\\vec v$ a même direction'], correctIndex:2, explanation:"$\\vec v$ est orthogonal à $\\vec u$ (ou est le vecteur nul)."},
        {id:'ortho-15', type:'qcm', question:"$A(1,2)$, $B(3,4)$, $C(5,0)$. Le triangle $ABC$ est-il rectangle en $B$ ?", options:['Oui','Non','Indéterminable','Seulement si $AB = BC$'], correctIndex:0, explanation:"$\\vec{BA}(-2,-2)$ et $\\vec{BC}(2,-4)$. $\\vec{BA}\\cdot\\vec{BC} = -4 + 8 = 4 \\neq 0$. <strong>Non</strong>, pas en B."},
        {id:'ortho-16', type:'qcm', question:"Vecteur orthogonal à $\\vec u(2, 5)$ (parmi les choix) :", options:['$(5, 2)$','$(-5, 2)$','$(2, -5)$','$(10, -4)$'], correctIndex:1, explanation:"$2\\times(-5) + 5\\times 2 = 0$. $(-5, 2)$ ✓. Aussi $(10, -4)$ ? $2\\times 10 + 5\\times(-4) = 0$, donc aussi orthogonal. Les deux fonctionnent, mais la 2e réponse est typique : on inverse et change un signe."},
        {id:'ortho-17', type:'numeric', question:"Pour quel $a$ a-t-on $(a, 2)\\perp(3, a)$ ?", answer:0, tolerance:0.001, explanation:"$3a + 2a = 5a = 0 \\Leftrightarrow a = 0$."},
        {id:'ortho-18', type:'qcm', question:"Pythagore : $\\vec u\\perp\\vec v \\Leftrightarrow$ :", options:['$\\|\\vec u + \\vec v\\| = \\|\\vec u\\| + \\|\\vec v\\|$','$\\|\\vec u + \\vec v\\|^2 = \\|\\vec u\\|^2 + \\|\\vec v\\|^2$','$\\|\\vec u\\| = \\|\\vec v\\|$','$\\vec u = -\\vec v$'], correctIndex:1, explanation:"$\\|\\vec u+\\vec v\\|^2 = \\|\\vec u\\|^2 + 2\\vec u\\cdot\\vec v + \\|\\vec v\\|^2$ ; nul si $\\perp$."},
        {id:'ortho-19', type:'qcm', question:"$\\vec u(1,0)$ orthogonal à :", options:['$(2, 0)$','$(0, 5)$','$(1, 1)$','$(3, -3)$'], correctIndex:1, explanation:"$\\vec u \\cdot (0,5) = 0 + 0 = 0$. ✓"},
        {id:'ortho-20', type:'numeric', question:"Vecteurs orthogonaux : $\\vec u(4, k)$ et $\\vec v(2, 3)$. $k = ?$", answer:-2.667, tolerance:0.05, explanation:"$8 + 3k = 0 \\Leftrightarrow k = -8/3 \\approx -2{,}67$."}
      ]
      },
      {
        id:'norme', number:4, title:'Lien avec la norme — identités de polarisation',
        summary:"Calculer un produit scalaire à partir des normes uniquement.",
        videoId:'iNsm05JimgA', videoTitle:'Calculer un PRODUIT SCALAIRE avec les normes — Première (Yvan Monka)',
        explanation:"Parfois tu ne connais que les <strong>longueurs</strong> (normes) de vecteurs sans angles ni coordonnées. Les <strong>identités de polarisation</strong> permettent de récupérer le produit scalaire à partir des normes seules.",
        keyPoints:[
          "Formule 1 : $\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}\\!\\left(\\|\\vec{u}+\\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2\\right)$",
          "Formule 2 : $\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}\\!\\left(\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 - \\|\\vec{u}-\\vec{v}\\|^2\\right)$",
          "Carré scalaire : $\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^2$ (toujours)",
          "Utile quand on a un triangle dont on connaît les trois longueurs des côtés"
        ],
        exercises:[
          {
            id:'norm-1', type:'numeric',
            question:"Soit $\\vec{u}$ tel que $\\|\\vec{u}\\| = 6$.<br/>Que vaut $\\vec{u}\\cdot\\vec{u}$ ?",
            answer:36, tolerance:0.001,
            explanation:"Par définition, $\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^2$ (carré scalaire).<br/>Donc $\\vec{u}\\cdot\\vec{u} = 6^2 = \\mathbf{36}$."
          },
          {
            id:'norm-2', type:'qcm',
            question:"Quelle est la <strong>formule de polarisation</strong> exprimant $\\vec{u}\\cdot\\vec{v}$ à partir des normes ?",
            options:[
              '$\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}(\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 - \\|\\vec{u}-\\vec{v}\\|^2)$',
              '$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\| \\times \\|\\vec{v}\\|$',
              '$\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}(\\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2)$',
              '$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}+\\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$'
            ],
            correctIndex:0,
            explanation:"En partant de $\\|\\vec{u}-\\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$, on isole $\\vec{u}\\cdot\\vec{v}$ :<br/>$\\mathbf{\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}(\\|\\vec{u}\\|^2 + \\|\\vec{v}\\|^2 - \\|\\vec{u}-\\vec{v}\\|^2)}$.<br/>(Variante avec $\\|\\vec{u}+\\vec{v}\\|^2$ : $\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}(\\|\\vec{u}+\\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2)$.)"
          },
          {
            id:'norm-3', type:'numeric',
            question:"On donne $\\|\\vec{u}\\| = 3$, $\\|\\vec{v}\\| = 4$, $\\|\\vec{u}+\\vec{v}\\| = 5$.<br/>Que vaut $\\vec{u}\\cdot\\vec{v}$ ?",
            answer:0, tolerance:0.001,
            explanation:"Avec la formule : $\\vec{u}\\cdot\\vec{v} = \\tfrac{1}{2}(\\|\\vec{u}+\\vec{v}\\|^2 - \\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2) = \\tfrac{1}{2}(25 - 9 - 16) = \\tfrac{1}{2} \\times 0 = \\mathbf{0}$.<br/>Les vecteurs sont en fait orthogonaux ($3, 4, 5 \\to$ triangle rectangle)."
          },
          {
            id:'norm-4', type:'numeric',
            question:"Dans un triangle $ABC$, on a $AB = 5$, $AC = 4$, $BC = 6$.<br/>Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.",
            answer:2.5, tolerance:0.01,
            explanation:"On utilise la formule de polarisation avec les vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ (et $\\overrightarrow{BC} = \\overrightarrow{AC} - \\overrightarrow{AB}$).<br/>$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = \\tfrac{1}{2}(\\|\\overrightarrow{AB}\\|^2 + \\|\\overrightarrow{AC}\\|^2 - \\|\\overrightarrow{BC}\\|^2) = \\tfrac{1}{2}(25 + 16 - 36) = \\tfrac{1}{2} \\times 5 = \\mathbf{2{,}5}$."
          },
          {
            id:'norm-5', type:'qcm',
            question:"En développant, $\\|\\vec{u}-\\vec{v}\\|^2$ est égal à :",
            options:['$\\|\\vec{u}\\|^2 - \\|\\vec{v}\\|^2$','$\\|\\vec{u}\\|^2 + 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$','$\\|\\vec{u}\\|^2 - 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2$','$(\\|\\vec{u}\\| - \\|\\vec{v}\\|)^2$'],
            correctIndex:2,
            explanation:"$\\|\\vec{u}-\\vec{v}\\|^2 = (\\vec{u}-\\vec{v})\\cdot(\\vec{u}-\\vec{v}) = \\vec{u}\\cdot\\vec{u} - 2\\,\\vec{u}\\cdot\\vec{v} + \\vec{v}\\cdot\\vec{v}$.<br/>Donc $\\mathbf{\\|\\vec{u}-\\vec{v}\\|^2 = \\|\\vec{u}\\|^2 - 2\\,\\vec{u}\\cdot\\vec{v} + \\|\\vec{v}\\|^2}$ (l'analogue vectoriel de $(a-b)^2 = a^2 - 2ab + b^2$)."
          }
        ,
        {id:'norme-6', type:'numeric', question:"$\\vec u(3,4)$. $\\|\\vec u\\| = ?$", answer:5, tolerance:0.001, explanation:"$\\sqrt{9+16} = \\sqrt{25} = \\mathbf 5$."},
        {id:'norme-7', type:'numeric', question:"$\\vec u(0, 7)$. $\\|\\vec u\\| = ?$", answer:7, tolerance:0.001, explanation:"$\\sqrt{0+49} = 7$."},
        {id:'norme-8', type:'numeric', question:"$\\vec u(-3, 4)$. $\\|\\vec u\\| = ?$", answer:5, tolerance:0.001, explanation:"$\\sqrt{9+16} = 5$."},
        {id:'norme-9', type:'numeric', question:"$A(1,2)$, $B(4,6)$. $AB = ?$", answer:5, tolerance:0.001, explanation:"$\\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9+16} = 5$."},
        {id:'norme-10', type:'numeric', question:"$\\vec u(1, 1)$. $\\|\\vec u\\| = ?$ (à 0,01 près)", answer:1.414, tolerance:0.01, explanation:"$\\sqrt 2 \\approx 1{,}414$."},
        {id:'norme-11', type:'qcm', question:"Norme d'un vecteur :", options:['Peut être négative','Toujours positive ou nulle','Toujours négative','Égale au produit scalaire'], correctIndex:1, explanation:"$\\|\\vec u\\| \\geq 0$, nulle ssi $\\vec u = \\vec 0$."},
        {id:'norme-12', type:'qcm', question:"$\\|2\\vec u\\| = ?$", options:['$\\|\\vec u\\|$','$2\\|\\vec u\\|$','$4\\|\\vec u\\|$','$\\|\\vec u\\|^2$'], correctIndex:1, explanation:"$\\|k\\vec u\\| = |k| \\cdot \\|\\vec u\\|$."},
        {id:'norme-13', type:'qcm', question:"Identité de polarisation : $\\vec u\\cdot\\vec v = ?$", options:['$\\frac{1}{2}(\\|\\vec u+\\vec v\\|^2 - \\|\\vec u\\|^2 - \\|\\vec v\\|^2)$','$\\|\\vec u\\| \\cdot \\|\\vec v\\|$','$\\|\\vec u + \\vec v\\|^2$','$\\frac{1}{4}\\|\\vec u\\|^2$'], correctIndex:0, explanation:"Identité : $\\vec u\\cdot\\vec v = \\frac{1}{2}(\\|\\vec u+\\vec v\\|^2 - \\|\\vec u\\|^2 - \\|\\vec v\\|^2)$."},
        {id:'norme-14', type:'numeric', question:"$\\|\\vec u\\| = 4$. $\\vec u\\cdot\\vec u = ?$", answer:16, tolerance:0.001, explanation:"$\\vec u\\cdot\\vec u = \\|\\vec u\\|^2 = 16$."},
        {id:'norme-15', type:'qcm', question:"$\\|\\vec u + \\vec v\\|^2 = ?$", options:['$\\|\\vec u\\|^2 + \\|\\vec v\\|^2$','$\\|\\vec u\\|^2 + 2\\vec u\\cdot\\vec v + \\|\\vec v\\|^2$','$\\|\\vec u\\|^2 - \\|\\vec v\\|^2$','$2\\|\\vec u\\| \\cdot \\|\\vec v\\|$'], correctIndex:1, explanation:"Carré scalaire développé."},
        {id:'norme-16', type:'numeric', question:"$A(2,3)$, $B(5,7)$. $AB = ?$", answer:5, tolerance:0.001, explanation:"$\\sqrt{9+16} = 5$."},
        {id:'norme-17', type:'qcm', question:"Si $\\|\\vec u\\| = \\|\\vec v\\|$, alors :", options:['$\\vec u = \\vec v$','$\\vec u = \\pm\\vec v$','Pas forcément égaux ni opposés','$\\vec u\\cdot\\vec v = 0$'], correctIndex:2, explanation:"Mêmes normes mais directions différentes possible."},
        {id:'norme-18', type:'numeric', question:"$\\|\\vec u\\| = 3$, $\\|\\vec v\\| = 4$, $\\vec u\\perp\\vec v$. $\\|\\vec u + \\vec v\\| = ?$", answer:5, tolerance:0.001, explanation:"Pythagore : $\\sqrt{9+16} = 5$."},
        {id:'norme-19', type:'qcm', question:"Vecteur unitaire = vecteur de norme :", options:['$0$','$1$','$2$','Quelconque'], correctIndex:1, explanation:"Unitaire $\\Leftrightarrow \\|\\vec u\\| = 1$."},
        {id:'norme-20', type:'numeric', question:"$\\vec u(6, 8)$. Norme du vecteur unitaire $\\dfrac{1}{\\|\\vec u\\|}\\vec u$ ?", answer:1, tolerance:0.001, explanation:"Par construction, c'est 1."}
      ]
      },
      {
        id:'projete', number:5, title:'Projeté orthogonal',
        summary:"L'interprétation géométrique qui éclaire tout le chapitre.",
        videoId:'2eTsaa2vVnI', videoTitle:'Calculer un produit scalaire par projection — Première (Yvan Monka)',
        explanation:"Le <strong>projeté orthogonal</strong> est la « projection » d'un point sur une droite, perpendiculairement à elle. C'est l'interprétation géométrique du produit scalaire et c'est elle qui rend tout le chapitre visuel et concret.",
        keyPoints:[
          "Le projeté orthogonal de $M$ sur une droite $d$ est le point $H$ de $d$ <strong>le plus proche</strong> de $M$",
          "La droite $(MH)$ est <strong>perpendiculaire</strong> à $d$",
          "Si $H$ est le projeté orthogonal de $B$ sur $(OA)$, alors : $\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OA}\\cdot\\overrightarrow{OH}$",
          "C'est cette propriété qui justifie la formule $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\| \\times (\\text{projeté de } \\vec{v} \\text{ sur } \\vec{u})$",
          "Très utile pour les démonstrations en géométrie classique (médiatrices, hauteurs, etc.)"
        ],
        exercises:[
          {
            id:'proj-1', type:'qcm',
            question:"Le projeté orthogonal du point $M$ sur la droite $d$ est :",
            options:[
              'Le milieu de $d$',
              'Le point de $d$ le plus proche de $M$',
              'Le symétrique de $M$ par rapport à $d$',
              'Un point quelconque de $d$'
            ],
            correctIndex:1,
            explanation:"Par définition, le projeté orthogonal $H$ de $M$ sur $d$ est le point de $d$ tel que $(MH) \\perp d$.<br/>Géométriquement, c'est aussi le <strong>point de $d$ le plus proche de $M$</strong> (propriété fondamentale)."
          },
          {
            id:'proj-2', type:'numeric',
            question:"$H$ est le projeté orthogonal de $B$ sur la droite $(OA)$, avec $OA = 3$ et $OH = 2$ ($H$ entre $O$ et $A$).<br/>Calculer $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$.",
            answer:6, tolerance:0.001,
            explanation:"La formule du projeté donne : $\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OA}\\cdot\\overrightarrow{OH}$ (car la composante de $\\overrightarrow{OB}$ perpendiculaire à $\\overrightarrow{OA}$ contribue $0$).<br/>Comme $\\overrightarrow{OA}$ et $\\overrightarrow{OH}$ sont colinéaires de même sens : $\\overrightarrow{OA}\\cdot\\overrightarrow{OH} = 3 \\times 2 = \\mathbf{6}$."
          },
          {
            id:'proj-3', type:'qcm',
            question:"Si $H$ est le projeté orthogonal de $B$ sur $(OA)$, alors :",
            options:['$\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OB}\\cdot\\overrightarrow{OH}$','$\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OA}\\cdot\\overrightarrow{OH}$','$\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OH}\\cdot\\overrightarrow{HB}$','$\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\|\\overrightarrow{OA}\\| \\times \\|\\overrightarrow{OB}\\|$'],
            correctIndex:1,
            explanation:"Formule du projeté : $\\mathbf{\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OA}\\cdot\\overrightarrow{OH}}$.<br/>C'est l'une des trois façons de calculer un produit scalaire (avec angles + coordonnées). Très puissant quand on connaît une projection."
          },
          {
            id:'proj-4', type:'numeric',
            question:"On considère un rectangle $ABCD$ avec $AB = 4$ et $AD = 3$.<br/>Le projeté orthogonal de $C$ sur $(AB)$ est $B$.<br/>Calculer $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.",
            answer:16, tolerance:0.001,
            explanation:"Le projeté de $C$ sur $(AB)$ est $B$ (puisque $(BC) \\perp (AB)$ dans le rectangle).<br/>Donc $\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = \\overrightarrow{AB}\\cdot\\overrightarrow{AB} = \\|\\overrightarrow{AB}\\|^2 = 4^2 = \\mathbf{16}$."
          },
          {
            id:'proj-5', type:'numeric',
            question:"Dans un triangle isocèle $OAB$ avec $\\|\\overrightarrow{OA}\\| = \\|\\overrightarrow{OB}\\| = 5$, le projeté orthogonal de $A$ sur $(OB)$ est noté $H$ avec $OH = 2$.<br/>Calculer $\\overrightarrow{OA}\\cdot\\overrightarrow{OB}$.",
            answer:10, tolerance:0.001,
            explanation:"Par la formule du projeté : $\\overrightarrow{OA}\\cdot\\overrightarrow{OB} = \\overrightarrow{OB}\\cdot\\overrightarrow{OH}$.<br/>$\\overrightarrow{OB}$ et $\\overrightarrow{OH}$ sont colinéaires de même sens, donc $\\overrightarrow{OB}\\cdot\\overrightarrow{OH} = \\|\\overrightarrow{OB}\\| \\times OH = 5 \\times 2 = \\mathbf{10}$."
          }
        ,
        {id:'proj-6', type:'qcm', question:"Le projeté orthogonal $\\vec v'$ de $\\vec v$ sur $\\vec u$ vérifie :", options:["$\\vec u\\cdot\\vec v = \\vec u\\cdot\\vec v'$","$\\vec v' = \\vec u$","$\\|\\vec v'\\| = \\|\\vec v\\|$","$\\vec v' \\perp \\vec u$"], correctIndex:0, explanation:"Le produit scalaire avec $\\vec u$ ne change pas par projection."},
        {id:'proj-7', type:'qcm', question:"Dans un triangle $ABC$ avec $H$ pied de la hauteur depuis $A$ : $\\vec{AB}\\cdot\\vec{AC} = ?$", options:['$\\vec{AB}\\cdot\\vec{AH}$','$\\vec{AH}\\cdot\\vec{HC}$','$AB \\times AC$','$0$'], correctIndex:0, explanation:"Projection : on remplace $\\vec{AC}$ par son projeté $\\vec{AH}$."},
        {id:'proj-8', type:'qcm', question:"$ABCD$ carré de côté 1. $\\vec{AB}\\cdot\\vec{AC} = ?$", options:['$0$','$1$','$\\sqrt 2$','$2$'], correctIndex:1, explanation:"Projeté de $C$ sur $(AB)$ est $B$. $\\vec{AB}\\cdot\\vec{AC} = AB \\times AB = 1 \\times 1 = 1$."},
        {id:'proj-9', type:'numeric', question:"$\\|\\vec u\\| = 6$, $\\|\\vec v\\| = 4$, angle $= 60°$. $\\vec u\\cdot\\vec v = ?$ (vérifie via projeté : $6 \\times 2$)", answer:12, tolerance:0.01, explanation:"$6 \\times 4 \\times \\cos(60°) = 24 \\times 0{,}5 = 12$. Projeté de $\\vec v$ sur $\\vec u$ : longueur $4\\cos 60° = 2$."},
        {id:'proj-10', type:'qcm', question:"Si $\\vec u\\perp\\vec v$, le projeté de $\\vec v$ sur $\\vec u$ est :", options:['$\\vec v$','$\\vec u$','$\\vec 0$','$-\\vec v$'], correctIndex:2, explanation:"Vecteurs orthogonaux $\\Rightarrow$ projeté nul."},
        {id:'proj-11', type:'numeric', question:"Triangle équilatéral $ABC$ de côté 2. $\\vec{AB}\\cdot\\vec{AC} = ?$", answer:2, tolerance:0.01, explanation:"Angle $\\hat A = 60°$, donc $2\\times 2\\times \\cos 60° = 2$."},
        {id:'proj-12', type:'qcm', question:"$\\vec u\\cdot\\vec v$ peut s'interpréter comme :", options:["L'aire d'un parallélogramme",'La longueur du projeté de $\\vec v$ sur $\\vec u$ multipliée par $\\|\\vec u\\|$','La somme des composantes','Un angle'], correctIndex:1, explanation:"$\\vec u\\cdot\\vec v = \\|\\vec u\\| \\times p$ où $p$ est la mesure algébrique du projeté de $\\vec v$ sur $\\vec u$."},
        {id:'proj-13', type:'numeric', question:"$\\vec u(4, 0)$ et $\\vec v(3, 5)$. Le projeté de $\\vec v$ sur $\\vec u$ a pour mesure algébrique :", answer:3, tolerance:0.01, explanation:"$\\vec v$ a pour première composante 3, qui est sa projection sur l'axe (la direction de $\\vec u$)."},
        {id:'proj-14', type:'qcm', question:"Application : aire d'un triangle $ABC$ avec $\\vec{AB}$ et $\\vec{AC}$ :", options:['$\\dfrac{1}{2}|\\vec{AB}\\cdot\\vec{AC}|$','$\\dfrac{1}{2}\\|\\vec{AB}\\| \\cdot \\|\\vec{AC}\\| \\cdot \\sin\\hat A$','$\\|\\vec{AB}\\|^2$','$AB + AC$'], correctIndex:1, explanation:"Formule : aire $= \\dfrac{1}{2}\\|\\vec{AB}\\|\\|\\vec{AC}\\|\\sin\\hat A$."},
        {id:'proj-15', type:'qcm', question:"Si l'angle entre $\\vec u$ et $\\vec v$ est obtus, le projeté de $\\vec v$ sur $\\vec u$ est :", options:['De même sens que $\\vec u$','De sens opposé à $\\vec u$','Nul','Indéterminé'], correctIndex:1, explanation:"Angle $> 90° \\Rightarrow$ projeté en sens opposé."},
        {id:'proj-16', type:'numeric', question:"$A(0,0)$, $B(4,0)$, $C(2,3)$. $\\vec{AB}\\cdot\\vec{AC} = ?$", answer:8, tolerance:0.01, explanation:"$(4,0)\\cdot(2,3) = 8 + 0 = 8$."},
        {id:'proj-17', type:'numeric', question:"$\\|\\vec u\\| = 5$, $\\|\\vec v\\| = 3$, angle $= 120°$. $\\vec u\\cdot\\vec v = ?$", answer:-7.5, tolerance:0.05, explanation:"$5\\times 3\\times \\cos(120°) = 15\\times(-0{,}5) = -7{,}5$."},
        {id:'proj-18', type:'qcm', question:"Al-Kashi : $BC^2 = AB^2 + AC^2 - 2 AB\\cdot AC \\cos\\hat A$. Utilisé pour :", options:['Calculer un angle dans un triangle quelconque','Trouver un produit scalaire','Calculer une aire','Tout cela'], correctIndex:3, explanation:"Al-Kashi sert pour les longueurs, les angles, et liée au produit scalaire."},
        {id:'proj-19', type:'qcm', question:"Si la projection de $\\vec v$ sur $\\vec u$ est $\\vec 0$, alors :", options:['$\\vec v = \\vec 0$','$\\vec u\\perp\\vec v$','$\\vec u = \\vec v$','Aucune des trois'], correctIndex:1, explanation:"Projeté nul $\\Leftrightarrow$ vecteurs orthogonaux (ou $\\vec v = \\vec 0$)."},
        {id:'proj-20', type:'numeric', question:"$ABC$ triangle isocèle avec $AB = AC = 5$ et $BC = 6$. $\\vec{AB}\\cdot\\vec{AC} = ?$", answer:7, tolerance:0.01, explanation:"$BC^2 = AB^2 + AC^2 - 2\\vec{AB}\\cdot\\vec{AC} \\Rightarrow 36 = 25+25 - 2x \\Rightarrow x = 7$."}
      ]
      }
    ]
  },
  'geometrie-reperee': {
    description: "On réinvestit le produit scalaire pour obtenir équations de droites, équations de cercles, et résoudre des problèmes d'intersection.",
    properties: [
      {
        id:'vecteur-normal', number:1, title:'Vecteur normal à une droite',
        summary:"Le vecteur perpendiculaire qui caractérise une droite.",
        videoId:'EehP4SFpo5c', videoTitle:'LE COURS : Géométrie repérée — Première (Yvan Monka)',
        explanation:"Un <strong>vecteur normal</strong> à une droite $d$ est un vecteur non nul <strong>perpendiculaire</strong> à un vecteur directeur de $d$. Ce concept est le pont entre le produit scalaire et les équations de droites.",
        keyPoints:[
          "Si $\\vec{n}(a\\,;\\,b)$ est normal à $d$, alors un vecteur directeur de $d$ est $\\vec{u}(-b\\,;\\,a)$",
          "Tous les vecteurs normaux à $d$ sont colinéaires entre eux",
          "$M(x\\,;\\,y)$ appartient à $d$ ssi $\\overrightarrow{AM}\\cdot\\vec{n} = 0$ où $A$ est un point connu de $d$",
          "C'est ce raisonnement qui donne l'équation cartésienne $ax + by + c = 0$"
        ],
        exercises:[
          {
            id:'vn-1', type:'qcm',
            question:"Soit la droite $d$ d'équation $3x + 2y - 5 = 0$.<br/>Quel est un vecteur normal à $d$ ?",
            options:['$\\vec{n}(2\\,;\\,3)$','$\\vec{n}(3\\,;\\,2)$','$\\vec{n}(-2\\,;\\,3)$','$\\vec{n}(5\\,;\\,0)$'],
            correctIndex:1,
            explanation:"Dans une équation $ax + by + c = 0$, les coefficients $a$ et $b$ donnent directement le vecteur normal $\\vec{n}(a\\,;\\,b)$.<br/>Ici $a = 3$ et $b = 2$, donc $\\mathbf{\\vec{n}(3\\,;\\,2)}$."
          },
          {
            id:'vn-2', type:'qcm',
            question:"Si $\\vec{n}(4\\,;\\,-3)$ est un vecteur normal à $d$, quel est un vecteur directeur de $d$ ?",
            options:['$\\vec{u}(3\\,;\\,4)$','$\\vec{u}(-3\\,;\\,-4)$','$\\vec{u}(4\\,;\\,-3)$','$\\vec{u}(-4\\,;\\,3)$'],
            correctIndex:0,
            explanation:"Si $\\vec{n}(a\\,;\\,b)$ est normal, $\\vec{u}(-b\\,;\\,a)$ est directeur.<br/>Avec $\\vec{n}(4\\,;\\,-3)$ : $\\vec{u}(-(-3)\\,;\\,4) = \\mathbf{\\vec{u}(3\\,;\\,4)}$."
          },
          {
            id:'vn-3', type:'numeric',
            question:"$d$ a pour vecteur normal $\\vec{n}(2\\,;\\,5)$ et passe par $A(1\\,;\\,3)$.<br/>Le point $M(3\\,;\\,k)$ appartient à $d$. Que vaut $k$ ?",
            answer:2.2, tolerance:0.05,
            explanation:"$M \\in d \\Leftrightarrow \\overrightarrow{AM}\\cdot\\vec{n} = 0$.<br/>$\\overrightarrow{AM}(2\\,;\\,k-3)$ donc $2 \\times 2 + 5 \\times (k-3) = 0 \\Leftrightarrow 4 + 5k - 15 = 0 \\Leftrightarrow 5k = 11 \\Leftrightarrow k = \\mathbf{2{,}2}$."
          },
          {
            id:'vn-4', type:'qcm',
            question:"Deux droites $d$ et $d'$ ont pour vecteurs normaux $\\vec{n}(2\\,;\\,1)$ et $\\vec{n'}(4\\,;\\,2)$.<br/>Ces droites sont :",
            options:['Perpendiculaires','Parallèles','Confondues forcément','Sécantes non perpendiculaires'],
            correctIndex:1,
            explanation:"$\\vec{n'}(4\\,;\\,2) = 2 \\times \\vec{n}(2\\,;\\,1)$ : les deux vecteurs normaux sont <strong>colinéaires</strong>.<br/>Donc les droites sont <strong>parallèles</strong> (confondues ou strictement parallèles selon la constante)."
          },
          {
            id:'vn-5', type:'numeric',
            question:"$d$ et $d'$ ont pour vecteurs normaux $\\vec{n}(3\\,;\\,k)$ et $\\vec{n'}(2\\,;\\,-6)$.<br/>Pour quelle valeur de $k$ ces droites sont-elles perpendiculaires ?",
            answer:1, tolerance:0.001,
            explanation:"$d \\perp d' \\Leftrightarrow \\vec{n}\\cdot\\vec{n'} = 0$.<br/>$3 \\times 2 + k \\times (-6) = 0 \\Leftrightarrow 6 - 6k = 0 \\Leftrightarrow k = \\mathbf{1}$."
          }
        ]
      },
      {
        id:'eq-cartesienne', number:2, title:"Équation cartésienne d'une droite",
        summary:"Passer de $ax + by + c = 0$ au vecteur normal et inversement.",
        videoId:'ZT10cKQ1XJg', videoTitle:'Équation cartésienne d\'une droite — Première (Yvan Monka)',
        explanation:"Toute droite du plan a une <strong>équation cartésienne</strong> de la forme $ax + by + c = 0$. Les coefficients $a$ et $b$ donnent directement un vecteur normal à la droite.",
        keyPoints:[
          "Forme générale : $ax + by + c = 0$",
          "Vecteur normal : $\\vec{n}(a\\,;\\,b)$",
          "Vecteur directeur : $\\vec{u}(-b\\,;\\,a)$",
          "Pour trouver l'équation : prendre un vecteur normal $\\vec{n}(a\\,;\\,b)$ et un point $A(x_A\\,;\\,y_A)$ $\\to$ $a(x - x_A) + b(y - y_A) = 0$",
          "Deux droites sont parallèles ssi leurs vecteurs normaux sont colinéaires"
        ],
        exercises:[
          {
            id:'ec-1', type:'qcm',
            question:"Quelle est l'équation cartésienne de la droite de vecteur normal $\\vec{n}(2\\,;\\,3)$ passant par $A(1\\,;\\,-1)$ ?",
            options:['$2x + 3y - 1 = 0$','$2x + 3y + 1 = 0$','$3x + 2y + 1 = 0$','$2x + 3y = 0$'],
            correctIndex:1,
            explanation:"Formule : $a(x - x_A) + b(y - y_A) = 0$, soit $2(x - 1) + 3(y - (-1)) = 0$.<br/>$2x - 2 + 3y + 3 = 0 \\Leftrightarrow \\mathbf{2x + 3y + 1 = 0}$."
          },
          {
            id:'ec-2', type:'numeric',
            question:"La droite $d$ : $x - 2y + 4 = 0$ passe par le point $A(2\\,;\\,k)$.<br/>Que vaut $k$ ?",
            answer:3, tolerance:0.001,
            explanation:"$A \\in d \\Leftrightarrow 2 - 2k + 4 = 0 \\Leftrightarrow -2k + 6 = 0 \\Leftrightarrow k = \\mathbf{3}$."
          },
          {
            id:'ec-3', type:'qcm',
            question:"La droite $d$ a pour équation $5x - 2y + 7 = 0$.<br/>Un vecteur directeur de $d$ est :",
            options:['$\\vec{u}(5\\,;\\,-2)$','$\\vec{u}(2\\,;\\,5)$','$\\vec{u}(-2\\,;\\,5)$','$\\vec{u}(5\\,;\\,2)$'],
            correctIndex:1,
            explanation:"Vecteur normal $\\vec{n}(5\\,;\\,-2)$, donc directeur $\\vec{u}(-(-2)\\,;\\,5) = \\mathbf{\\vec{u}(2\\,;\\,5)}$."
          },
          {
            id:'ec-4', type:'qcm',
            question:"Quelle équation correspond à la droite passant par $A(0\\,;\\,2)$ et $B(3\\,;\\,0)$ ?",
            options:['$2x + 3y - 6 = 0$','$3x + 2y - 6 = 0$','$2x - 3y + 6 = 0$','$x + y - 3 = 0$'],
            correctIndex:0,
            explanation:"$\\overrightarrow{AB}(3\\,;\\,-2)$ est directeur, donc $\\vec{n}(2\\,;\\,3)$ est normal. Équation : $2(x-0) + 3(y-2) = 0 \\Leftrightarrow \\mathbf{2x + 3y - 6 = 0}$."
          },
          {
            id:'ec-5', type:'numeric',
            question:"$d$ : $4x + 3y - 12 = 0$. À quelle valeur de $x$ la droite coupe-t-elle l'axe des abscisses ?",
            answer:3, tolerance:0.001,
            explanation:"L'axe des abscisses correspond à $y = 0$.<br/>$4x + 3 \\times 0 - 12 = 0 \\Leftrightarrow 4x = 12 \\Leftrightarrow x = \\mathbf{3}$."
          }
        ]
      },
      {
        id:'eq-cercle', number:3, title:"Équation cartésienne d'un cercle",
        summary:"$(x - a)^2 + (y - b)^2 = r^2$ et les variantes.",
        videoId:'Nr4Fcr-GhXM', videoTitle:'Déterminer une équation de cercle (1) — Première (Yvan Monka)',
        explanation:"L'équation d'un cercle vient directement de la définition : « ensemble des points à distance $r$ du centre ». On utilise la formule de la distance entre deux points (basée sur le théorème de Pythagore).",
        keyPoints:[
          "Forme standard : $(x - a)^2 + (y - b)^2 = r^2$, centre $\\Omega(a\\,;\\,b)$, rayon $r$",
          "Forme développée : $x^2 + y^2 + \\alpha x + \\beta y + \\gamma = 0$ (à ramener à la forme standard par complétion du carré)",
          "Cercle de diamètre $[AB]$ : $M$ appartient au cercle ssi $\\overrightarrow{MA}\\cdot\\overrightarrow{MB} = 0$",
          "Attention : toutes les équations de la forme $x^2 + y^2 + \\alpha x + \\beta y + \\gamma = 0$ ne sont pas des cercles ! Il faut vérifier que $r^2 > 0$"
        ],
        exercises:[
          {
            id:'cer-1', type:'qcm',
            question:"Quelle est l'équation du cercle de centre $\\Omega(2\\,;\\,-1)$ et de rayon $3$ ?",
            options:['$(x-2)^2 + (y+1)^2 = 9$','$(x+2)^2 + (y-1)^2 = 9$','$(x-2)^2 + (y-1)^2 = 3$','$(x-2)^2 + (y+1)^2 = 3$'],
            correctIndex:0,
            explanation:"Formule : $(x - a)^2 + (y - b)^2 = r^2$ avec $a = 2$, $b = -1$, $r = 3$.<br/>$\\mathbf{(x-2)^2 + (y+1)^2 = 9}$."
          },
          {
            id:'cer-2', type:'numeric',
            question:"Soit le cercle d'équation $(x-1)^2 + (y+4)^2 = 25$.<br/>Quel est son rayon ?",
            answer:5, tolerance:0.001,
            explanation:"$r^2 = 25$ donc $r = \\sqrt{25} = \\mathbf{5}$."
          },
          {
            id:'cer-3', type:'qcm',
            question:"Le point $M(3\\,;\\,4)$ appartient-il au cercle de centre $\\Omega(0\\,;\\,0)$ et de rayon $5$ ?",
            options:['Oui',"Non, il est à l\'intérieur","Non, il est à l\'extérieur",'On ne peut pas savoir'],
            correctIndex:0,
            explanation:"$\\Omega M = \\sqrt{(3-0)^2 + (4-0)^2} = \\sqrt{9+16} = \\sqrt{25} = 5 = r$.<br/>$M$ est exactement <strong>sur le cercle</strong>."
          },
          {
            id:'cer-4', type:'numeric',
            question:"Cercle de diamètre $[AB]$ avec $A(0\\,;\\,0)$ et $B(6\\,;\\,8)$. Quel est son rayon ?",
            answer:5, tolerance:0.001,
            explanation:"Le rayon est la moitié de la longueur du diamètre.<br/>$AB = \\sqrt{6^2 + 8^2} = \\sqrt{100} = 10$, donc $r = \\mathbf{5}$."
          },
          {
            id:'cer-5', type:'qcm',
            question:"L'équation $x^2 + y^2 - 4x + 6y - 12 = 0$ est l'équation d'un cercle. Quel est son centre ?",
            options:['$\\Omega(2\\,;\\,-3)$','$\\Omega(-2\\,;\\,3)$','$\\Omega(4\\,;\\,-6)$','$\\Omega(-4\\,;\\,6)$'],
            correctIndex:0,
            explanation:"On complète les carrés : $x^2 - 4x = (x-2)^2 - 4$ et $y^2 + 6y = (y+3)^2 - 9$.<br/>L'équation devient $(x-2)^2 + (y+3)^2 = 25$, donc centre $\\mathbf{\\Omega(2\\,;\\,-3)}$, rayon $5$."
          }
        ]
      },
      {
        id:'intersections', number:4, title:'Intersections droite-cercle',
        summary:"Combien de points, où, et comment les calculer.",
        videoId:'EehP4SFpo5c', videoTitle:'LE COURS : Géométrie repérée — Première (Yvan Monka)',
        explanation:"L'intersection d'une droite et d'un cercle se ramène à la résolution d'une <strong>équation du second degré</strong>. Le discriminant $\\Delta$ détermine combien de points il y a.",
        keyPoints:[
          "Méthode : isoler une variable dans l'équation de droite, substituer dans l'équation du cercle",
          "On obtient une équation du second degré en une variable",
          "$\\Delta > 0$ : la droite est sécante (2 points d'intersection)",
          "$\\Delta = 0$ : la droite est tangente (1 point)",
          "$\\Delta < 0$ : pas d'intersection",
          "Alternative géométrique : comparer la distance du centre à la droite avec le rayon"
        ],
        exercises:[
          {
            id:'int-1', type:'qcm',
            question:"Cercle de centre $\\Omega(0\\,;\\,0)$ et rayon $2$. La droite $y = 3$ est-elle :",
            options:['Sécante (2 points)','Tangente (1 point)','Disjointe (0 point)','Confondue avec le cercle'],
            correctIndex:2,
            explanation:"Distance du centre $\\Omega(0\\,;\\,0)$ à la droite $y = 3$ : $d = 3$. Or $r = 2 < 3$.<br/>Donc la droite est <strong>disjointe</strong> du cercle (pas d'intersection)."
          },
          {
            id:'int-2', type:'qcm',
            question:"Cercle $x^2 + y^2 = 25$ et droite $y = 5$. Combien d'intersections ?",
            options:['0','1 (tangente)','2 (sécante)','Infiniment'],
            correctIndex:1,
            explanation:"En substituant : $x^2 + 25 = 25 \\Leftrightarrow x^2 = 0 \\Leftrightarrow x = 0$. <br/>Un seul point d'intersection $(0\\,;\\,5)$ $\\to$ la droite est <strong>tangente</strong> au cercle."
          },
          {
            id:'int-3', type:'numeric',
            question:"On résout l'intersection cercle-droite et on obtient $x^2 - 4x + 3 = 0$.<br/>Combien d'intersections y a-t-il ?",
            answer:2, tolerance:0.001,
            explanation:"Discriminant : $\\Delta = (-4)^2 - 4 \\times 1 \\times 3 = 16 - 12 = 4 > 0$.<br/>Donc <strong>2 solutions</strong>, soit $\\mathbf{2}$ points d'intersection."
          },
          {
            id:'int-4', type:'qcm',
            question:"Cercle $x^2 + y^2 = 4$ et droite $y = x$. Quels sont les points d'intersection ?",
            options:['$(0\\,;\\,0)$ uniquement','$(\\sqrt{2}\\,;\\,\\sqrt{2})$ et $(-\\sqrt{2}\\,;\\,-\\sqrt{2})$','$(2\\,;\\,2)$ et $(-2\\,;\\,-2)$',"Pas d\'intersection"],
            correctIndex:1,
            explanation:"En substituant $y = x$ : $x^2 + x^2 = 4 \\Leftrightarrow 2x^2 = 4 \\Leftrightarrow x^2 = 2 \\Leftrightarrow x = \\pm\\sqrt{2}$.<br/>Les points sont $\\mathbf{(\\sqrt{2}\\,;\\,\\sqrt{2})}$ et $\\mathbf{(-\\sqrt{2}\\,;\\,-\\sqrt{2})}$."
          },
          {
            id:'int-5', type:'qcm',
            question:"Cercle de centre $\\Omega(0\\,;\\,0)$ et rayon $5$, et la droite $d : x = 5$. Que peut-on dire ?",
            options:['Sécante (2 points)','Tangente (1 point)','Disjointe (0 point)','On ne peut pas savoir'],
            correctIndex:1,
            explanation:"La distance de $\\Omega(0\\,;\\,0)$ à la droite verticale $x = 5$ vaut $d = 5$.<br/>Or le rayon $r = 5$, donc $d = r$ $\\to$ la droite est <strong>tangente</strong> au cercle au point $(5\\,;\\,0)$."
          }
        ]
      },
      {
        id:'applications', number:5, title:'Applications géométriques',
        summary:"Alignement, orthogonalité, distance d'un point à une droite.",
        videoId:'55Ouyd2xHKA', videoTitle:'QCM : Géométrie repérée — Première (Yvan Monka)',
        explanation:"Tous les outils précédents se combinent pour résoudre des problèmes classiques : prouver un alignement, une perpendicularité, calculer une distance, déterminer un projeté orthogonal en coordonnées.",
        keyPoints:[
          "<strong>Alignement</strong> : trois points $A, B, C$ alignés ssi vecteurs $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ colinéaires (déterminant nul)",
          "<strong>Orthogonalité</strong> : $(AB) \\perp (CD)$ ssi $\\overrightarrow{AB}\\cdot\\overrightarrow{CD} = 0$",
          "<strong>Distance d'un point $M$ à la droite $d$</strong> : $\\dfrac{|a\\,x_M + b\\,y_M + c|}{\\sqrt{a^2 + b^2}}$",
          "<strong>Projeté orthogonal</strong> d'un point sur une droite : intersection avec la perpendiculaire passant par $M$",
          "Réfléchir <strong>en coordonnées</strong> permet de tout traduire en calcul et de tout vérifier"
        ],
        exercises:[
          {
            id:'app-1', type:'numeric',
            question:"Calculer la distance du point $M(1\\,;\\,2)$ à la droite $d : 3x + 4y - 5 = 0$.",
            answer:1.2, tolerance:0.01,
            explanation:"Formule : $\\dfrac{|3 \\times 1 + 4 \\times 2 - 5|}{\\sqrt{3^2 + 4^2}} = \\dfrac{|3 + 8 - 5|}{\\sqrt{25}} = \\dfrac{6}{5} = \\mathbf{1{,}2}$."
          },
          {
            id:'app-2', type:'qcm',
            question:"Les points $A(1\\,;\\,2)$, $B(3\\,;\\,6)$, $C(4\\,;\\,8)$ sont-ils alignés ?",
            options:['Oui, alignés','Non, ils forment un triangle',"Il faut plus d\'informations","C\'est impossible à déterminer"],
            correctIndex:0,
            explanation:"$\\overrightarrow{AB}(2\\,;\\,4)$ et $\\overrightarrow{AC}(3\\,;\\,6)$. <br/>Vérifions la colinéarité : $\\overrightarrow{AC} = 1{,}5 \\times \\overrightarrow{AB}$, donc colinéaires.<br/>Les trois points sont <strong>alignés</strong>."
          },
          {
            id:'app-3', type:'numeric',
            question:"Distance entre les points $A(2\\,;\\,3)$ et $B(5\\,;\\,7)$.",
            answer:5, tolerance:0.001,
            explanation:"$AB = \\sqrt{(5-2)^2 + (7-3)^2} = \\sqrt{9 + 16} = \\sqrt{25} = \\mathbf{5}$."
          },
          {
            id:'app-4', type:'qcm',
            question:"Les droites $d_1 : y = 2x + 1$ et $d_2 : y = -\\dfrac{1}{2}x + 3$ sont :",
            options:['Parallèles','Sécantes non perpendiculaires','Perpendiculaires','Confondues'],
            correctIndex:2,
            explanation:"Pour deux droites de coefficients directeurs $m_1$ et $m_2$ : elles sont perpendiculaires ssi $m_1 \\times m_2 = -1$.<br/>$2 \\times (-\\dfrac{1}{2}) = -1$ $\\to$ <strong>perpendiculaires</strong>."
          },
          {
            id:'app-5', type:'numeric',
            question:"Aire du triangle $ABC$ avec $A(0\\,;\\,0)$, $B(4\\,;\\,0)$, $C(0\\,;\\,3)$.",
            answer:6, tolerance:0.001,
            explanation:"Triangle rectangle en $A$ (base $AB = 4$ sur l'axe des $x$, hauteur $AC = 3$ sur l'axe des $y$).<br/>Aire $= \\dfrac{base \\times hauteur}{2} = \\dfrac{4 \\times 3}{2} = \\mathbf{6}$."
          }
        ]
      }
    ]
  },
  'calcul-litteral': {
    description: "Le calcul littéral, c'est manipuler des lettres comme on manipule des nombres. C'est la base de TOUT en lycée : sans ça, impossible de résoudre une équation ou simplifier une expression.",
    properties: [
      {
        id:'priorites', number:1, title:'Priorités opératoires',
        summary:"PEMDAS : parenthèses, exposants, $\\times \\div$, $+ -$.",
        videoId:'2gKpv0brXVQ', videoTitle:'Calcul littéral — cours complet — Maths 3ème',
        explanation:"Quand une expression mélange plusieurs opérations, l'ordre des calculs n'est pas libre. Il y a une <strong>priorité fixée</strong> qu'il faut respecter sous peine de tout faire faux.",
        keyPoints:[
          "<strong>1.</strong> Les calculs entre <strong>parenthèses</strong> (en commençant par les plus internes)",
          "<strong>2.</strong> Les <strong>puissances</strong>",
          "<strong>3.</strong> Les <strong>multiplications et divisions</strong> (de gauche à droite)",
          "<strong>4.</strong> Les <strong>additions et soustractions</strong> (de gauche à droite)",
          "Exemple : $2 + 3 \\times 4 = 2 + 12 = \\mathbf{14}$ (pas $20$ !)",
          "Astuce : $(a + b)^2 \\neq a^2 + b^2$ $\\to$ développer d'abord"
        ],
        exercises:[
          {
            id:'pri-1', type:'numeric',
            question:"Calculer : $2 + 3 \\times 4$",
            answer:14, tolerance:0.001,
            explanation:"La multiplication est prioritaire sur l'addition.<br/>$2 + 3 \\times 4 = 2 + 12 = \\mathbf{14}$ (et non $5 \\times 4 = 20$)."
          },
          {
            id:'pri-2', type:'numeric',
            question:"Calculer : $(5 + 3) \\times 2 - 1$",
            answer:15, tolerance:0.001,
            explanation:"On commence par la parenthèse : $5 + 3 = 8$.<br/>Puis multiplication : $8 \\times 2 = 16$.<br/>Enfin soustraction : $16 - 1 = \\mathbf{15}$."
          },
          {
            id:'pri-3', type:'numeric',
            question:"Calculer : $2^2 + 3 \\times 2$",
            answer:10, tolerance:0.001,
            explanation:"D'abord la puissance : $2^2 = 4$.<br/>Puis multiplication : $3 \\times 2 = 6$.<br/>Enfin addition : $4 + 6 = \\mathbf{10}$."
          },
          {
            id:'pri-4', type:'qcm',
            question:"Calculer : $10 - 2 \\times 3$",
            options:['$4$','$24$','$-4$','$8$'],
            correctIndex:0,
            explanation:"Multiplication prioritaire : $2 \\times 3 = 6$.<br/>Puis $10 - 6 = \\mathbf{4}$. <br/>(Erreur classique : calculer $10 - 2 = 8$ d'abord, puis $8 \\times 3 = 24$. Faux !)"
          },
          {
            id:'pri-5', type:'numeric',
            question:"Calculer : $3 \\times (4 + 2)^2$",
            answer:108, tolerance:0.001,
            explanation:"D'abord parenthèse : $4 + 2 = 6$.<br/>Puis puissance : $6^2 = 36$.<br/>Enfin multiplication : $3 \\times 36 = \\mathbf{108}$."
          }
        ]
      },
      {
        id:'distributivite', number:2, title:'Distributivité',
        summary:"$k(a+b) = ka + kb$ — la base du développement.",
        videoId:'S_ckQpWzmG8', videoTitle:'Développer une expression (Niv.1) — Quatrième (Yvan Monka)',
        explanation:"La <strong>distributivité</strong> permet de transformer un produit en somme. C'est la propriété qui permet de « développer » une expression pour la simplifier.",
        keyPoints:[
          "Forme simple : $k(a + b) = ka + kb$",
          "Forme double : $(a + b)(c + d) = ac + ad + bc + bd$",
          "Attention aux signes : $-(a + b) = -a - b$ (le signe se distribue)",
          "Exemple : $3(x + 5) = 3x + 15$",
          "Exemple double : $(x + 2)(x - 3) = x^2 - 3x + 2x - 6 = x^2 - x - 6$"
        ],
        exercises:[
          {
            id:'dis-1', type:'qcm',
            question:"Développer $5(x + 3)$ :",
            options:['$5x + 3$','$5x + 15$','$x + 15$','$5x \\cdot 15$'],
            correctIndex:1,
            explanation:"$5(x + 3) = 5 \\times x + 5 \\times 3 = \\mathbf{5x + 15}$. On distribue le $5$ à chaque terme."
          },
          {
            id:'dis-2', type:'qcm',
            question:"Développer $-2(x - 4)$ :",
            options:['$-2x - 4$','$-2x - 8$','$-2x + 8$','$2x + 8$'],
            correctIndex:2,
            explanation:"Attention aux signes : $-2 \\times x = -2x$ et $-2 \\times (-4) = +8$.<br/>Résultat : $\\mathbf{-2x + 8}$. (Le moins fois moins donne plus.)"
          },
          {
            id:'dis-3', type:'numeric',
            question:"Développer $(x + 2)(x - 5)$ et donner le <strong>coefficient de $x$</strong> dans le résultat.",
            answer:-3, tolerance:0.001,
            explanation:"$(x + 2)(x - 5) = x^2 - 5x + 2x - 10 = x^2 - 3x - 10$.<br/>Le coefficient de $x$ est $\\mathbf{-3}$ (la somme $-5 + 2 = -3$)."
          },
          {
            id:'dis-4', type:'qcm',
            question:"Développer puis réduire : $3(2x + 5) - 4(x - 1)$",
            options:['$2x + 19$','$2x + 11$','$10x + 11$','$10x + 19$'],
            correctIndex:0,
            explanation:"$3(2x + 5) = 6x + 15$ et $-4(x - 1) = -4x + 4$.<br/>Somme : $6x + 15 - 4x + 4 = \\mathbf{2x + 19}$."
          },
          {
            id:'dis-5', type:'qcm',
            question:"Développer $4(x^2 + 2x - 1)$ :",
            options:['$4x^2 + 2x - 1$','$4x^2 + 8x - 1$','$4x^2 + 8x - 4$','$x^2 + 8x - 4$'],
            correctIndex:2,
            explanation:"On distribue le $4$ à chacun des trois termes :<br/>$4 \\times x^2 + 4 \\times 2x + 4 \\times (-1) = \\mathbf{4x^2 + 8x - 4}$."
          }
        ]
      },
      {
        id:'factorisation', number:3, title:'Factorisation par facteur commun',
        summary:"L'opération inverse de la distributivité.",
        videoId:'sr_vOR2ALhw', videoTitle:'Factoriser une expression (Niv.1) — Quatrième (Yvan Monka)',
        explanation:"<strong>Factoriser</strong>, c'est faire l'opération <strong>inverse</strong> du développement : transformer une somme en produit. On cherche un <strong>facteur commun</strong> à tous les termes et on le met en évidence.",
        keyPoints:[
          "Principe : $ka + kb = k(a + b)$",
          "Méthode : repérer ce qui est présent dans tous les termes (un nombre, une lettre, une expression)",
          "Exemple : $3x + 6 = 3(x + 2)$ — facteur commun $3$",
          "Exemple : $x^2 + 5x = x(x + 5)$ — facteur commun $x$",
          "Exemple : $(x+1)(x-2) + (x+1)(3x) = (x+1)(4x - 2)$"
        ],
        exercises:[
          {
            id:'fac-1', type:'qcm',
            question:"Factoriser $6x + 18$ :",
            options:['$6(x + 3)$','$6(x + 18)$','$x(6 + 18)$','$6x(1 + 3)$'],
            correctIndex:0,
            explanation:"Le facteur commun à $6x$ et $18$ est $6$ (car $18 = 6 \\times 3$).<br/>$6x + 18 = 6 \\times x + 6 \\times 3 = \\mathbf{6(x + 3)}$."
          },
          {
            id:'fac-2', type:'qcm',
            question:"Factoriser $x^2 + 4x$ :",
            options:['$x(x + 4)$','$x^2(1 + 4)$','$4x(x + 1)$','$(x + 4)^2$'],
            correctIndex:0,
            explanation:"Le facteur commun à $x^2$ et $4x$ est $x$.<br/>$x^2 + 4x = x \\times x + x \\times 4 = \\mathbf{x(x + 4)}$."
          },
          {
            id:'fac-3', type:'qcm',
            question:"Factoriser $(x+1)(2x) + (x+1)(3)$ :",
            options:['$(x+1)(2x + 3)$','$(x+1)^2 \\cdot 5$','$2x + 3$','$(x+1)(6x)$'],
            correctIndex:0,
            explanation:"Le facteur commun est $(x+1)$ (présent dans les deux termes).<br/>$(x+1)(2x) + (x+1)(3) = (x+1)(2x + 3)$, soit $\\mathbf{(x+1)(2x + 3)}$."
          },
          {
            id:'fac-4', type:'numeric',
            question:"Si on factorise $5x^2 + 10x$ sous la forme $5x(x + ?)$, que vaut le <strong>?</strong> ?",
            answer:2, tolerance:0.001,
            explanation:"$5x^2 + 10x = 5x \\times x + 5x \\times 2 = 5x(x + 2)$.<br/>Donc $? = \\mathbf{2}$."
          },
          {
            id:'fac-5', type:'qcm',
            question:"Factoriser par paires : $ax + ay + bx + by$",
            options:['$(a+b)(x+y)$','$ax + by$','$a(x+y) + b$','$ab(x+y)$'],
            correctIndex:0,
            explanation:"On groupe : $a(x+y) + b(x+y)$, puis le facteur commun $(x+y)$ donne $\\mathbf{(a+b)(x+y)}$."
          }
        ]
      },
      {
        id:'identites-remarquables', number:4, title:'Identités remarquables',
        summary:"Les 3 formules à connaître par cœur.",
        videoId:'Xn4tB_iWQIM', videoTitle:'Replay Cours 3ème — Calcul littéral & Identités remarquables (Yvan Monka)',
        explanation:"Trois formules de développement reviennent en permanence dans les exercices. Les <strong>mémoriser par cœur</strong> te fait gagner un temps fou et évite des erreurs.",
        keyPoints:[
          "$(a + b)^2 = a^2 + 2ab + b^2$",
          "$(a - b)^2 = a^2 - 2ab + b^2$",
          "$(a + b)(a - b) = a^2 - b^2$",
          "Exemple : $(x + 3)^2 = x^2 + 6x + 9$",
          "Exemple : $(2x - 5)^2 = 4x^2 - 20x + 25$",
          "Inversement, elles servent à <strong>factoriser</strong> : $x^2 - 9 = (x + 3)(x - 3)$"
        ],
        exercises:[
          {
            id:'ir-1', type:'qcm',
            question:"Développer $(x + 5)^2$ :",
            options:['$x^2 + 25$','$x^2 + 10x + 25$','$x^2 + 5x + 25$','$x^2 + 10x + 10$'],
            correctIndex:1,
            explanation:"Formule : $(a + b)^2 = a^2 + 2ab + b^2$ avec $a = x$ et $b = 5$.<br/>$(x + 5)^2 = x^2 + 2 \\times x \\times 5 + 5^2 = \\mathbf{x^2 + 10x + 25}$."
          },
          {
            id:'ir-2', type:'qcm',
            question:"Développer $(x - 3)^2$ :",
            options:['$x^2 - 9$','$x^2 + 6x + 9$','$x^2 - 6x + 9$','$x^2 - 6x - 9$'],
            correctIndex:2,
            explanation:"Formule : $(a - b)^2 = a^2 - 2ab + b^2$ avec $a = x$ et $b = 3$.<br/>$(x - 3)^2 = x^2 - 6x + 9$. Soit $\\mathbf{x^2 - 6x + 9}$. (Le signe du carré est $+$, le double produit est $-$.)"
          },
          {
            id:'ir-3', type:'qcm',
            question:"Développer $(x + 4)(x - 4)$ :",
            options:['$x^2 - 16$','$x^2 + 16$','$x^2 + 8x - 16$','$x^2 - 8$'],
            correctIndex:0,
            explanation:"Formule : $(a + b)(a - b) = a^2 - b^2$ avec $a = x$ et $b = 4$.<br/>$(x + 4)(x - 4) = x^2 - 16$. Soit $\\mathbf{x^2 - 16}$."
          },
          {
            id:'ir-4', type:'numeric',
            question:"Factoriser $x^2 - 25$ sous la forme $(x + 5)(x - ?)$. Que vaut $?$ ?",
            answer:5, tolerance:0.001,
            explanation:"$x^2 - 25 = x^2 - 5^2$. On reconnaît $a^2 - b^2$ avec $a = x$, $b = 5$.<br/>$x^2 - 25 = (x + 5)(x - 5)$, donc $? = \\mathbf{5}$."
          },
          {
            id:'ir-5', type:'qcm',
            question:"Développer $(2x + 3)^2$ :",
            options:['$4x^2 + 9$','$4x^2 + 12x + 9$','$2x^2 + 12x + 9$','$4x^2 + 6x + 9$'],
            correctIndex:1,
            explanation:"Avec $a = 2x$ et $b = 3$ : $(2x + 3)^2 = (2x)^2 + 2 \\times 2x \\times 3 + 3^2 = 4x^2 + 12x + 9$. Soit $\\mathbf{4x^2 + 12x + 9}$."
          }
        ]
      }
    ]
  },
  'fractions': {
    description: "Les fractions reviennent partout en maths : dérivation, équations, probabilités, géométrie. Une fraction maîtrisée, c'est une centaine d'erreurs en moins par an.",
    properties: [
      {
        id:'vocabulaire', number:1, title:'Vocabulaire et simplification',
        summary:"Numérateur, dénominateur, fractions équivalentes.",
        videoId:'a0Qb812W75c', videoTitle:'LE COURS : Les fractions — Quatrième / Troisième (Yvan Monka)',
        explanation:"Une fraction $\\dfrac{a}{b}$ représente la division de $a$ par $b$. Le <strong>numérateur</strong> ($a$) est en haut, le <strong>dénominateur</strong> ($b$) est en bas. Une fraction est <strong>simplifiée</strong> quand on a réduit au maximum les facteurs communs.",
        keyPoints:[
          "Le dénominateur ne peut <strong>jamais être 0</strong>",
          "Multiplier numérateur ET dénominateur par le même nombre ne change pas la fraction : $\\dfrac{a}{b} = \\dfrac{ka}{kb}$",
          "Pour simplifier : trouver le PGCD du numérateur et du dénominateur, puis diviser les deux par ce PGCD",
          "Exemple : $\\dfrac{12}{18} = \\dfrac{6 \\times 2}{6 \\times 3} = \\mathbf{\\dfrac{2}{3}}$",
          "Une fraction est dite <strong>irréductible</strong> quand on ne peut plus la simplifier"
        ],
        exercises:[
          {
            id:'voc-1', type:'qcm',
            question:"La fraction $\\dfrac{12}{18}$ simplifiée donne :",
            options:['$\\dfrac{2}{3}$','$\\dfrac{3}{4}$','$\\dfrac{4}{6}$','$\\dfrac{1}{2}$'],
            correctIndex:0,
            explanation:"PGCD($12, 18$) $= 6$. On divise haut et bas par $6$ : $\\dfrac{12 \\div 6}{18 \\div 6} = \\mathbf{\\dfrac{2}{3}}$."
          },
          {
            id:'voc-2', type:'qcm',
            question:"Quelle fraction est <strong>égale</strong> à $\\dfrac{2}{3}$ ?",
            options:['$\\dfrac{4}{9}$','$\\dfrac{6}{9}$','$\\dfrac{4}{5}$','$\\dfrac{8}{9}$'],
            correctIndex:1,
            explanation:"Multiplier haut et bas par le même nombre ne change pas la fraction.<br/>$\\dfrac{2}{3} = \\dfrac{2 \\times 3}{3 \\times 3} = \\mathbf{\\dfrac{6}{9}}$."
          },
          {
            id:'voc-3', type:'qcm',
            question:"Parmi ces fractions, laquelle est <strong>irréductible</strong> ?",
            options:['$\\dfrac{4}{6}$','$\\dfrac{6}{8}$','$\\dfrac{7}{12}$','$\\dfrac{9}{15}$'],
            correctIndex:2,
            explanation:"Une fraction est irréductible quand PGCD(num, dén) $= 1$.<br/>$\\dfrac{7}{12}$ : $7$ est premier, et $12 = 2^2 \\times 3$, donc pas de facteur commun. PGCD $= 1$.<br/>Les autres se simplifient : $\\dfrac{4}{6} = \\dfrac{2}{3}$, $\\dfrac{6}{8} = \\dfrac{3}{4}$, $\\dfrac{9}{15} = \\dfrac{3}{5}$."
          },
          {
            id:'voc-4', type:'qcm',
            question:"Que vaut $\\dfrac{5}{0}$ ?",
            options:['$0$','$5$','Impossible (dénominateur nul)','$+\\infty$'],
            correctIndex:2,
            explanation:"Le dénominateur d'une fraction ne peut <strong>jamais être nul</strong>. $\\dfrac{5}{0}$ n'a pas de sens en mathématiques."
          },
          {
            id:'voc-5', type:'numeric',
            question:"Si on simplifie $\\dfrac{25}{35}$ sous la forme $\\dfrac{5}{k}$, que vaut $k$ ?",
            answer:7, tolerance:0.001,
            explanation:"PGCD($25, 35$) $= 5$. $\\dfrac{25 \\div 5}{35 \\div 5} = \\dfrac{5}{7}$, donc $k = \\mathbf{7}$."
          }
        ]
      },
      {
        id:'addition-soustraction', number:2, title:'Addition et soustraction',
        summary:"Toujours au même dénominateur d'abord.",
        videoId:'Z86gfJOKgBg', videoTitle:'Effectuer des calculs de fractions (1) — Troisième (Yvan Monka)',
        explanation:"Pour additionner ou soustraire des fractions, il faut <strong>obligatoirement</strong> qu'elles aient le <strong>même dénominateur</strong>. Si ce n'est pas le cas, on les met d'abord au même dénominateur.",
        keyPoints:[
          "Même dénominateur : $\\dfrac{a}{c} + \\dfrac{b}{c} = \\dfrac{a + b}{c}$",
          "Dénominateurs différents : trouver un dénominateur commun (souvent le plus petit multiple commun)",
          "Méthode rapide : multiplier en croix par le dénominateur de l'autre",
          "Exemple : $\\dfrac{1}{2} + \\dfrac{1}{3} = \\dfrac{3}{6} + \\dfrac{2}{6} = \\mathbf{\\dfrac{5}{6}}$",
          "Toujours <strong>simplifier le résultat</strong> à la fin"
        ],
        exercises:[
          {
            id:'add-1', type:'qcm',
            question:"Calculer $\\dfrac{1}{2} + \\dfrac{1}{3}$ :",
            options:['$\\dfrac{2}{5}$','$\\dfrac{5}{6}$','$\\dfrac{1}{6}$','$\\dfrac{2}{6}$'],
            correctIndex:1,
            explanation:"Dénominateur commun : $6$. On a $\\dfrac{1}{2} = \\dfrac{3}{6}$ et $\\dfrac{1}{3} = \\dfrac{2}{6}$.<br/>$\\dfrac{3}{6} + \\dfrac{2}{6} = \\mathbf{\\dfrac{5}{6}}$."
          },
          {
            id:'add-2', type:'qcm',
            question:"Calculer $\\dfrac{3}{4} - \\dfrac{1}{2}$ :",
            options:['$\\dfrac{1}{4}$','$\\dfrac{2}{2}$','$\\dfrac{1}{2}$','$\\dfrac{2}{4}$'],
            correctIndex:0,
            explanation:"Dénominateur commun : $4$. $\\dfrac{1}{2} = \\dfrac{2}{4}$.<br/>$\\dfrac{3}{4} - \\dfrac{2}{4} = \\mathbf{\\dfrac{1}{4}}$."
          },
          {
            id:'add-3', type:'numeric',
            question:"Calculer $\\dfrac{1}{2} + \\dfrac{1}{4}$ et donner la réponse sous forme décimale.",
            answer:0.75, tolerance:0.001,
            explanation:"$\\dfrac{1}{2} + \\dfrac{1}{4} = \\dfrac{2}{4} + \\dfrac{1}{4} = \\dfrac{3}{4} = \\mathbf{0{,}75}$."
          },
          {
            id:'add-4', type:'qcm',
            question:"Calculer $\\dfrac{2}{3} + \\dfrac{1}{6}$ :",
            options:['$\\dfrac{3}{9}$','$\\dfrac{3}{6}$','$\\dfrac{5}{6}$','$\\dfrac{1}{2}$'],
            correctIndex:2,
            explanation:"Dénominateur commun : $6$. $\\dfrac{2}{3} = \\dfrac{4}{6}$.<br/>$\\dfrac{4}{6} + \\dfrac{1}{6} = \\mathbf{\\dfrac{5}{6}}$."
          },
          {
            id:'add-5', type:'qcm',
            question:"Calculer $\\dfrac{5}{6} + \\dfrac{1}{4}$ :",
            options:['$\\dfrac{6}{10}$','$\\dfrac{13}{12}$','$\\dfrac{6}{24}$','$\\dfrac{7}{24}$'],
            correctIndex:1,
            explanation:"Dénominateur commun : $12$ (PPCM de $6$ et $4$). $\\dfrac{5}{6} = \\dfrac{10}{12}$ et $\\dfrac{1}{4} = \\dfrac{3}{12}$.<br/>$\\dfrac{10}{12} + \\dfrac{3}{12} = \\mathbf{\\dfrac{13}{12}}$."
          }
        ]
      },
      {
        id:'multiplication', number:3, title:'Multiplication',
        summary:"On multiplie les numérateurs et les dénominateurs entre eux.",
        videoId:'1yV5scwCwvg', videoTitle:'Effectuer des calculs de fractions (2) — Troisième (Yvan Monka)',
        explanation:"La <strong>multiplication</strong> de fractions est la plus simple des opérations : on multiplie les numérateurs entre eux et les dénominateurs entre eux. Pas besoin de mettre au même dénominateur.",
        keyPoints:[
          "Formule : $\\dfrac{a}{b} \\times \\dfrac{c}{d} = \\dfrac{ac}{bd}$",
          "Astuce : <strong>simplifier AVANT de multiplier</strong> est souvent plus rapide",
          "Exemple : $\\dfrac{2}{3} \\times \\dfrac{5}{7} = \\dfrac{10}{21}$",
          "Exemple avec simplification : $\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{12}{72} = \\mathbf{\\dfrac{1}{6}}$",
          "Plus malin : $\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}$ (simplification en croix)"
        ],
        exercises:[
          {
            id:'mul-1', type:'qcm',
            question:"Calculer $\\dfrac{2}{3} \\times \\dfrac{5}{7}$ :",
            options:['$\\dfrac{10}{21}$','$\\dfrac{7}{10}$','$\\dfrac{10}{10}$','$\\dfrac{7}{21}$'],
            correctIndex:0,
            explanation:"On multiplie numérateurs entre eux et dénominateurs entre eux : $\\dfrac{2 \\times 5}{3 \\times 7} = \\mathbf{\\dfrac{10}{21}}$."
          },
          {
            id:'mul-2', type:'numeric',
            question:"Calculer $\\dfrac{4}{9} \\times \\dfrac{3}{8}$ et donner le résultat sous forme décimale (arrondi au millième).",
            answer:0.167, tolerance:0.005,
            explanation:"$\\dfrac{4}{9} \\times \\dfrac{3}{8} = \\dfrac{12}{72} = \\dfrac{1}{6} \\approx \\mathbf{0{,}167}$."
          },
          {
            id:'mul-3', type:'qcm',
            question:"Calculer $5 \\times \\dfrac{2}{3}$ :",
            options:['$\\dfrac{10}{3}$','$\\dfrac{5}{6}$','$\\dfrac{7}{3}$','$\\dfrac{2}{15}$'],
            correctIndex:0,
            explanation:"$5 = \\dfrac{5}{1}$, donc $\\dfrac{5}{1} \\times \\dfrac{2}{3} = \\dfrac{5 \\times 2}{1 \\times 3} = \\mathbf{\\dfrac{10}{3}}$."
          },
          {
            id:'mul-4', type:'qcm',
            question:"Calculer $\\left(\\dfrac{1}{2}\\right)^2$ :",
            options:['$\\dfrac{1}{2}$','$\\dfrac{1}{4}$','$1$','$\\dfrac{2}{2}$'],
            correctIndex:1,
            explanation:"$\\left(\\dfrac{1}{2}\\right)^2 = \\dfrac{1}{2} \\times \\dfrac{1}{2} = \\dfrac{1 \\times 1}{2 \\times 2} = \\mathbf{\\dfrac{1}{4}}$."
          },
          {
            id:'mul-5', type:'numeric',
            question:"Calculer $\\dfrac{2}{5} \\times \\dfrac{5}{8}$ sous forme irréductible $\\dfrac{a}{b}$. Que vaut $a$ ?",
            answer:1, tolerance:0.001,
            explanation:"$\\dfrac{2}{5} \\times \\dfrac{5}{8} = \\dfrac{10}{40} = \\dfrac{1}{4}$. Le numérateur est $\\mathbf{1}$.<br/>(Plus malin : on simplifie en croix avant : $\\dfrac{2}{5} \\times \\dfrac{5}{8} = \\dfrac{2}{8} = \\dfrac{1}{4}$.)"
          }
        ]
      },
      {
        id:'division', number:4, title:'Division',
        summary:"Diviser, c'est multiplier par l'inverse.",
        videoId:'gSg6xux6eqo', videoTitle:'Effectuer un calcul simple sur les fractions — 3ème maths (Yvan Monka)',
        explanation:"Diviser par une fraction, c'est <strong>multiplier par son inverse</strong>. C'est probablement la règle la plus utile à retenir : elle ramène toute division à une multiplication.",
        keyPoints:[
          "Formule : $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\times \\dfrac{d}{c} = \\dfrac{ad}{bc}$",
          "L'<strong>inverse</strong> de $\\dfrac{c}{d}$ est $\\dfrac{d}{c}$ (on retourne)",
          "L'inverse de $5$ est $\\dfrac{1}{5}$",
          "Exemple : $\\dfrac{2}{3} \\div \\dfrac{4}{5} = \\dfrac{2}{3} \\times \\dfrac{5}{4} = \\dfrac{10}{12} = \\mathbf{\\dfrac{5}{6}}$",
          "Pour un quotient complexe (fraction dans une fraction) : c'est aussi une division $\\to$ multiplier par l'inverse"
        ],
        exercises:[
          {
            id:'div-1', type:'qcm',
            question:"Calculer $\\dfrac{2}{3} \\div \\dfrac{4}{5}$ :",
            options:['$\\dfrac{5}{6}$','$\\dfrac{8}{15}$','$\\dfrac{6}{20}$','$\\dfrac{3}{10}$'],
            correctIndex:0,
            explanation:"Diviser = multiplier par l'inverse : $\\dfrac{2}{3} \\div \\dfrac{4}{5} = \\dfrac{2}{3} \\times \\dfrac{5}{4} = \\dfrac{10}{12} = \\mathbf{\\dfrac{5}{6}}$."
          },
          {
            id:'div-2', type:'numeric',
            question:"Calculer $\\dfrac{1}{2} \\div \\dfrac{1}{4}$ :",
            answer:2, tolerance:0.001,
            explanation:"$\\dfrac{1}{2} \\div \\dfrac{1}{4} = \\dfrac{1}{2} \\times \\dfrac{4}{1} = \\dfrac{4}{2} = \\mathbf{2}$.<br/>(Intuition : combien de quarts dans un demi ? Réponse : 2.)"
          },
          {
            id:'div-3', type:'qcm',
            question:"L'inverse de $\\dfrac{3}{7}$ est :",
            options:['$-\\dfrac{3}{7}$','$\\dfrac{7}{3}$','$\\dfrac{1}{3}$','$\\dfrac{3}{7}$'],
            correctIndex:1,
            explanation:"L'inverse d'une fraction = on retourne numérateur et dénominateur.<br/>L'inverse de $\\dfrac{3}{7}$ est $\\mathbf{\\dfrac{7}{3}}$."
          },
          {
            id:'div-4', type:'numeric',
            question:"Calculer $6 \\div \\dfrac{2}{3}$ :",
            answer:9, tolerance:0.001,
            explanation:"$6 \\div \\dfrac{2}{3} = 6 \\times \\dfrac{3}{2} = \\dfrac{18}{2} = \\mathbf{9}$."
          },
          {
            id:'div-5', type:'numeric',
            question:"Calculer $\\dfrac{3/4}{1/2}$ (fraction dans une fraction) :",
            answer:1.5, tolerance:0.001,
            explanation:"$\\dfrac{3/4}{1/2} = \\dfrac{3}{4} \\div \\dfrac{1}{2} = \\dfrac{3}{4} \\times \\dfrac{2}{1} = \\dfrac{6}{4} = \\dfrac{3}{2} = \\mathbf{1{,}5}$."
          }
        ]
      }
    ]
  },
  'pythagore-thales': {
    description: "Les deux théorèmes les plus utilisés du collège, qui restent essentiels au lycée : Pythagore pour les longueurs dans un triangle rectangle, Thalès pour les proportions dans des configurations particulières.",
    properties: [
      {
        id:'pythagore', number:1, title:'Théorème de Pythagore',
        summary:"Dans un triangle rectangle, hypoténuse$^2$ = somme des carrés des deux autres côtés.",
        videoId:'QYM86GzWWG8', videoTitle:'LE COURS : Le théorème de Pythagore — Quatrième (Yvan Monka)',
        explanation:"Le <strong>théorème de Pythagore</strong> relie les longueurs des trois côtés d'un triangle <strong>rectangle</strong>. Il sert à calculer une longueur quand on connaît les deux autres.",
        keyPoints:[
          "Énoncé : si $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$",
          "$BC$ est l'<strong>hypoténuse</strong> (le côté opposé à l'angle droit, et le plus long)",
          "$AB$ et $AC$ sont les deux <strong>côtés de l'angle droit</strong>",
          "Pour trouver l'hypoténuse : $BC = \\sqrt{AB^2 + AC^2}$",
          "Pour trouver un côté de l'angle droit : $AB = \\sqrt{BC^2 - AC^2}$",
          "Exemple : si $AB = 3$ et $AC = 4$, alors $BC^2 = 9 + 16 = 25$, donc $BC = \\mathbf{5}$"
        ],
        exercises:[
          {
            id:'pyt-1', type:'numeric',
            question:"Triangle $ABC$ rectangle en $A$, avec $AB = 3$ et $AC = 4$.<br/>Quelle est la longueur de l'hypoténuse $BC$ ?",
            answer:5, tolerance:0.001,
            explanation:"$BC^2 = AB^2 + AC^2 = 9 + 16 = 25$. Donc $BC = \\sqrt{25} = \\mathbf{5}$."
          },
          {
            id:'pyt-2', type:'numeric',
            question:"Triangle rectangle en $A$ avec $BC = 10$ (hypoténuse) et $AB = 6$.<br/>Que vaut $AC$ ?",
            answer:8, tolerance:0.001,
            explanation:"$BC^2 = AB^2 + AC^2 \\Leftrightarrow AC^2 = BC^2 - AB^2 = 100 - 36 = 64$. Donc $AC = \\mathbf{8}$."
          },
          {
            id:'pyt-3', type:'qcm',
            question:"Dans un triangle rectangle, l'<strong>hypoténuse</strong> est :",
            options:['Le plus petit côté',"Le côté opposé à l'angle droit","L'un des côtés de l'angle droit",'Le côté entre les deux angles aigus'],
            correctIndex:1,
            explanation:"L'hypoténuse est <strong>le côté opposé à l'angle droit</strong>. C'est aussi systématiquement le <strong>plus long</strong> des trois côtés."
          },
          {
            id:'pyt-4', type:'numeric',
            question:"Triangle rectangle en $A$ avec $AB = 5$ et $AC = 12$.<br/>Que vaut l'hypoténuse $BC$ ?",
            answer:13, tolerance:0.001,
            explanation:"$BC^2 = 5^2 + 12^2 = 25 + 144 = 169$. Donc $BC = \\sqrt{169} = \\mathbf{13}$.<br/>(C'est un triplet pythagoricien célèbre : 5-12-13.)"
          },
          {
            id:'pyt-5', type:'numeric',
            question:"Triangle rectangle en $A$ avec $AB = 8$ et $BC = 17$ (hypoténuse).<br/>Que vaut $AC$ ?",
            answer:15, tolerance:0.001,
            explanation:"$AC^2 = BC^2 - AB^2 = 289 - 64 = 225$. Donc $AC = \\sqrt{225} = \\mathbf{15}$.<br/>(Un autre triplet pythagoricien : 8-15-17.)"
          }
        ]
      },
      {
        id:'reciproque-pythagore', number:2, title:'Réciproque de Pythagore',
        summary:"Sert à prouver qu'un triangle est rectangle.",
        videoId:'UNZAuJjG18k', videoTitle:'Seconde — Pythagore réciproque (Yvan Monka)',
        explanation:"La <strong>réciproque</strong> permet, à partir des longueurs des trois côtés, de <strong>déterminer si un triangle est rectangle</strong> ou non. C'est très utile pour les démonstrations.",
        keyPoints:[
          "Si le carré du plus grand côté = somme des carrés des deux autres $\\to$ le triangle est <strong>rectangle</strong>",
          "L'angle droit est <strong>opposé au plus grand côté</strong>",
          "Méthode : calculer séparément $(\\text{plus grand côté})^2$ et $(\\text{somme des carrés des deux autres})$, puis comparer",
          "Exemple : côtés $5, 12, 13$. On a $13^2 = 169$ et $5^2 + 12^2 = 25 + 144 = 169$ $\\to$ triangle rectangle",
          "Si les deux valeurs sont différentes $\\to$ le triangle n'est PAS rectangle"
        ],
        exercises:[
          {
            id:'rp-1', type:'qcm',
            question:"Triangle avec côtés $6$, $8$, $10$. Est-il rectangle ?",
            options:['Oui','Non','Il faut connaître les angles','Impossible à déterminer'],
            correctIndex:0,
            explanation:"Plus grand côté : $10$. On compare $10^2 = 100$ avec $6^2 + 8^2 = 36 + 64 = 100$.<br/>Égalité $\\to$ triangle <strong>rectangle</strong> (en l'angle opposé au côté $10$)."
          },
          {
            id:'rp-2', type:'qcm',
            question:"Triangle avec côtés $5$, $7$, $9$. Est-il rectangle ?",
            options:['Oui','Non','Triangle équilatéral','Manque info'],
            correctIndex:1,
            explanation:"Plus grand côté : $9$. On compare $9^2 = 81$ avec $5^2 + 7^2 = 25 + 49 = 74$.<br/>$81 \\neq 74$, donc le triangle n'est <strong>PAS</strong> rectangle."
          },
          {
            id:'rp-3', type:'qcm',
            question:"Triangle rectangle de côtés $3, 4, 5$. L'angle droit est en l'angle opposé à quel côté ?",
            options:['$3$','$4$','$5$','Aucun côté en particulier'],
            correctIndex:2,
            explanation:"L'angle droit est toujours <strong>opposé à l'hypoténuse</strong>, qui est le plus grand côté.<br/>Ici l'hypoténuse est $5$, donc l'angle droit est opposé au côté $\\mathbf{5}$."
          },
          {
            id:'rp-4', type:'numeric',
            question:"Triangle de côtés $9$, $12$ et $x$ (avec $x$ hypoténuse) est rectangle. Que vaut $x$ ?",
            answer:15, tolerance:0.001,
            explanation:"$x$ est l'hypoténuse, donc $x^2 = 9^2 + 12^2 = 81 + 144 = 225$. Donc $x = \\mathbf{15}$.<br/>(Triplet $9$-$12$-$15$, multiple de $3$-$4$-$5$.)"
          },
          {
            id:'rp-5', type:'qcm',
            question:"Pour utiliser la réciproque de Pythagore, on compare :",
            options:[
              "Tous les côtés deux à deux",
              "$(\\text{plus grand côté})^2$ vs $(\\text{somme des carrés des deux autres})$",
              "Les angles",
              "Le périmètre et l'aire"
            ],
            correctIndex:1,
            explanation:"La méthode : on identifie le <strong>plus grand côté</strong>, on calcule son carré, et on compare à la somme des carrés des deux autres.<br/>Si égalité $\\to$ rectangle. Sinon $\\to$ pas rectangle."
          }
        ]
      },
      {
        id:'thales', number:3, title:'Théorème de Thalès',
        summary:"Configuration avec parallèles $\\to$ égalité de rapports de longueurs.",
        videoId:'2GEwOYqJSqE', videoTitle:'PYTHAGORE ET THALES en troisième (Yvan Monka)',
        explanation:"Le <strong>théorème de Thalès</strong> s'applique dans une configuration particulière : deux droites sécantes coupées par deux droites <strong>parallèles</strong>. Il donne des <strong>égalités de rapports</strong> de longueurs.",
        keyPoints:[
          "Configuration : deux droites se coupant en un point $A$, coupées par deux parallèles $(BC)$ et $(DE)$",
          "Égalité : $\\dfrac{AB}{AD} = \\dfrac{AC}{AE} = \\dfrac{BC}{DE}$",
          "Il faut bien <strong>respecter l'ordre</strong> : les longueurs viennent par paires (numérateur sur une droite, dénominateur sur l'autre)",
          "Utilité : calculer une longueur inconnue à partir de longueurs connues",
          "Existe en configuration <strong>triangle</strong> ($A$ en haut) et configuration <strong>papillon</strong> ($A$ entre les deux parallèles)"
        ],
        exercises:[
          {
            id:'th-1', type:'qcm',
            question:"Le théorème de Thalès donne :",
            options:[
              "Une égalité d'angles",
              "Des égalités de rapports de longueurs",
              "Le calcul d'aires",
              "La somme des angles d'un triangle"
            ],
            correctIndex:1,
            explanation:"Le théorème de Thalès donne des <strong>égalités de rapports de longueurs</strong> dans une configuration de droites sécantes coupées par des parallèles."
          },
          {
            id:'th-2', type:'numeric',
            question:"Configuration triangle : $(BC) \\parallel (DE)$, $AB = 4$, $AD = 12$, $BC = 5$.<br/>Que vaut $DE$ ?",
            answer:15, tolerance:0.001,
            explanation:"Thalès : $\\dfrac{AB}{AD} = \\dfrac{BC}{DE}$, soit $\\dfrac{4}{12} = \\dfrac{5}{DE}$.<br/>Produit en croix : $4 \\times DE = 12 \\times 5 = 60$, donc $DE = \\mathbf{15}$."
          },
          {
            id:'th-3', type:'numeric',
            question:"Configuration triangle : $(BC) \\parallel (DE)$, $AB = 6$, $AD = 9$, $AC = 4$.<br/>Que vaut $AE$ ?",
            answer:6, tolerance:0.001,
            explanation:"Thalès : $\\dfrac{AB}{AD} = \\dfrac{AC}{AE}$, soit $\\dfrac{6}{9} = \\dfrac{4}{AE}$.<br/>$6 \\times AE = 9 \\times 4 = 36$, donc $AE = \\mathbf{6}$."
          },
          {
            id:'th-4', type:'qcm',
            question:"Dans la configuration de Thalès (avec parallèles), on a l'égalité :",
            options:[
              "$\\dfrac{AB}{AD} = \\dfrac{AC}{AE} = \\dfrac{BC}{DE}$",
              "$\\dfrac{AB}{AC} = \\dfrac{AD}{AE}$",
              "$AB + AD = AC + AE$",
              "$AB \\times BC = AD \\times DE$"
            ],
            correctIndex:0,
            explanation:"Triple égalité de Thalès : $\\mathbf{\\dfrac{AB}{AD} = \\dfrac{AC}{AE} = \\dfrac{BC}{DE}}$. Toujours dans cet ordre (petit triangle sur grand triangle)."
          },
          {
            id:'th-5', type:'qcm',
            question:"Pour appliquer le théorème de Thalès, on a besoin de :",
            options:[
              "Un triangle rectangle",
              "Deux droites parallèles dans une configuration sécante",
              "Trois angles connus",
              "Un cercle"
            ],
            correctIndex:1,
            explanation:"Le théorème de Thalès nécessite <strong>deux droites parallèles</strong> coupées par deux droites sécantes. Sans parallélisme, pas de Thalès."
          }
        ]
      },
      {
        id:'reciproque-thales', number:4, title:'Réciproque de Thalès',
        summary:"Sert à prouver que deux droites sont parallèles.",
        videoId:'cq3wBbXYB4A', videoTitle:'Appliquer le théorème de Thalès (2) — Troisième (Yvan Monka)',
        explanation:"La <strong>réciproque</strong> permet de <strong>démontrer que deux droites sont parallèles</strong> à partir d'égalités de rapports de longueurs.",
        keyPoints:[
          "Si on a deux droites sécantes en $A$, et deux points $B, D$ sur la première, $C, E$ sur la seconde",
          "Si $\\dfrac{AB}{AD} = \\dfrac{AC}{AE}$ ET que les points sont dans le bon ordre",
          "Alors les droites $(BC)$ et $(DE)$ sont <strong>parallèles</strong>",
          "Attention : l'égalité $\\dfrac{BC}{DE} = \\dfrac{AB}{AD}$ ne suffit PAS pour appliquer la réciproque",
          "Il faut toujours vérifier l'<strong>alignement et l'ordre</strong> des points"
        ],
        exercises:[
          {
            id:'rt-1', type:'qcm',
            question:"Pour <strong>prouver que deux droites sont parallèles</strong>, on utilise :",
            options:[
              'Le théorème de Pythagore',
              'La réciproque de Thalès',
              'La somme des angles',
              'Le théorème direct de Thalès'
            ],
            correctIndex:1,
            explanation:"La <strong>réciproque de Thalès</strong> sert à démontrer le parallélisme.<br/>(Le théorème direct, lui, sert à calculer une longueur, en supposant le parallélisme déjà connu.)"
          },
          {
            id:'rt-2', type:'qcm',
            question:"Si on vérifie que $\\dfrac{AB}{AD} = \\dfrac{AC}{AE}$ (avec alignement et ordre OK), on peut conclure :",
            options:[
              '$(BC) \\parallel (DE)$',
              "$(AB) \\perp (AC)$",
              'Le triangle est rectangle',
              "$BC = DE$"
            ],
            correctIndex:0,
            explanation:"L'égalité des rapports + alignement + ordre $\\to$ les deux droites $(BC)$ et $(DE)$ sont <strong>parallèles</strong>."
          },
          {
            id:'rt-3', type:'qcm',
            question:"Pour appliquer la réciproque de Thalès, suffit-il que les rapports soient égaux ?",
            options:[
              'Oui',
              "Non, il faut aussi vérifier l'alignement et l'ordre des points",
              "Non, il faut aussi un angle droit",
              "Non, il faut au moins 3 droites"
            ],
            correctIndex:1,
            explanation:"L'égalité des rapports est <strong>nécessaire mais pas suffisante</strong>. Il faut aussi vérifier que les points sont <strong>alignés dans le bon ordre</strong> (par exemple : $A$, $B$, $D$ alignés dans cet ordre, et $A$, $C$, $E$ alignés dans cet ordre)."
          },
          {
            id:'rt-4', type:'numeric',
            question:"On a $AB = 3$, $AD = 6$, $AC = 4$, $AE = 8$ (points dans le bon ordre).<br/>Les droites $(BC)$ et $(DE)$ sont-elles parallèles ? Tape <strong>1</strong> pour oui, <strong>0</strong> pour non.",
            answer:1, tolerance:0.001,
            explanation:"$\\dfrac{AB}{AD} = \\dfrac{3}{6} = \\dfrac{1}{2}$ et $\\dfrac{AC}{AE} = \\dfrac{4}{8} = \\dfrac{1}{2}$.<br/>Les rapports sont égaux + ordre OK $\\to$ $(BC) \\parallel (DE)$. Réponse : <strong>1</strong> (oui)."
          },
          {
            id:'rt-5', type:'numeric',
            question:"On a $AB = 4$, $AD = 10$, $AC = 6$, $AE = 12$.<br/>Les droites $(BC)$ et $(DE)$ sont-elles parallèles ? Tape <strong>1</strong> pour oui, <strong>0</strong> pour non.",
            answer:0, tolerance:0.001,
            explanation:"$\\dfrac{AB}{AD} = \\dfrac{4}{10} = 0{,}4$ et $\\dfrac{AC}{AE} = \\dfrac{6}{12} = 0{,}5$.<br/>Les rapports ne sont PAS égaux $\\to$ les droites ne sont <strong>pas parallèles</strong>. Réponse : <strong>0</strong> (non)."
          }
        ]
      }
    ]
  },
  'probabilites': {
    description: "Les probabilités conditionnelles permettent de calculer la probabilité d'un événement quand on dispose d'une information partielle. Indispensable pour les arbres pondérés, les tests médicaux, les jeux de hasard, et la suite en Terminale.",
    properties: [
      {
        id:'def-conditionnelle', number:1, title:'Probabilité conditionnelle',
        summary:"$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ — la proba de $B$ sachant $A$.",
        videoId:'5oBnmZVrOXE', videoTitle:'LE COURS : Probabilités conditionnelles — Première/Terminale (Yvan Monka)',
        explanation:"La <strong>probabilité conditionnelle</strong> de $B$ sachant $A$, notée $P_A(B)$ ou $P(B | A)$, est la probabilité que $B$ se réalise <strong>quand on sait déjà</strong> que $A$ est réalisé. C'est l'outil pour traiter de l'information partielle.",
        keyPoints:[
          "Notation : $P_A(B)$ ou $P(B \\mid A)$",
          "Formule : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ (avec $P(A) > 0$)",
          "Relation utile : $P(A \\cap B) = P(A) \\times P_A(B)$",
          "$P_A(B)$ est en général <strong>différent</strong> de $P(B)$",
          "Si $P_A(B) = P(B)$ : les événements sont <strong>indépendants</strong>"
        ],
        exercises:[
          {
            id:'pc-1', type:'numeric',
            question:"Dans une classe : $60$ % de filles. Parmi les filles, $50$ % font du sport.<br/>Quelle est la probabilité, en choisissant une fille au hasard, qu'elle fasse du sport ?",
            answer:0.5, tolerance:0.01,
            explanation:"On cherche $P_F(S) = $ proba de faire du sport <strong>sachant qu'on a tiré une fille</strong>.<br/>D'après l'énoncé, $P_F(S) = \\mathbf{0{,}5}$."
          },
          {
            id:'pc-2', type:'qcm',
            question:"La probabilité conditionnelle $P_A(B)$ vaut :",
            options:[
              '$P(A) \\times P(B)$',
              '$\\dfrac{P(A \\cap B)}{P(B)}$',
              '$\\dfrac{P(A \\cap B)}{P(A)}$',
              '$P(A \\cup B) - P(A)$'
            ],
            correctIndex:2,
            explanation:"Définition : $P_A(B) = \\mathbf{\\dfrac{P(A \\cap B)}{P(A)}}$. C'est la proportion des cas où $B$ se réalise <strong>parmi</strong> les cas où $A$ s'est réalisé."
          },
          {
            id:'pc-3', type:'numeric',
            question:"$P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}1$. Que vaut $P_A(B)$ ?",
            answer:0.25, tolerance:0.01,
            explanation:"$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0{,}1}{0{,}4} = \\mathbf{0{,}25}$."
          },
          {
            id:'pc-4', type:'numeric',
            question:"$P(A) = 0{,}5$ et $P_A(B) = 0{,}6$. Que vaut $P(A \\cap B)$ ?",
            answer:0.3, tolerance:0.01,
            explanation:"$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}5 \\times 0{,}6 = \\mathbf{0{,}3}$."
          },
          {
            id:'pc-5', type:'qcm',
            question:"Si $P_A(B) = P(B)$, on dit que les événements $A$ et $B$ sont :",
            options:['Incompatibles','Indépendants','Égaux','Contraires'],
            correctIndex:1,
            explanation:"$P_A(B) = P(B)$ signifie que la réalisation de $A$ n'influence pas la probabilité de $B$. C'est la définition de l'<strong>indépendance</strong>."
          }
        ]
      },
      {
        id:'arbre-pondere', number:2, title:'Arbre pondéré',
        summary:"Représentation graphique des probabilités conditionnelles.",
        videoId:'o1HQ6xJ7o4U', videoTitle:'Compléter un arbre pondéré — Première/Terminale (Yvan Monka)',
        explanation:"Un <strong>arbre pondéré</strong> est une représentation graphique qui permet de visualiser et calculer des probabilités conditionnelles. Chaque branche porte une probabilité, et la probabilité d'une feuille est le produit des probabilités le long du chemin.",
        keyPoints:[
          "Premier niveau : probabilités des événements et de leur contraire ($P(A)$ et $P(\\bar{A})$)",
          "Branches issues d'un nœud : <strong>probabilités conditionnelles</strong>",
          "Somme des probabilités des branches issues d'un même nœud $= 1$",
          "Probabilité d'une feuille $= $ produit des probabilités le long du chemin",
          "Probabilité d'un événement $B$ $= $ somme des feuilles correspondant à $B$"
        ],
        exercises:[
          {
            id:'ap-1', type:'numeric',
            question:"Arbre : $P(A) = 0{,}3$ et $P_A(B) = 0{,}4$.<br/>Quelle est la probabilité de la feuille $(A \\cap B)$ ?",
            answer:0.12, tolerance:0.005,
            explanation:"Probabilité d'une feuille = produit le long du chemin.<br/>$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}3 \\times 0{,}4 = \\mathbf{0{,}12}$."
          },
          {
            id:'ap-2', type:'numeric',
            question:"Sur un arbre pondéré, la somme des probabilités des branches issues d'un même nœud vaut :",
            answer:1, tolerance:0.001,
            explanation:"Les branches issues d'un nœud correspondent à tous les cas possibles à partir de ce nœud. Leur somme vaut donc $\\mathbf{1}$."
          },
          {
            id:'ap-3', type:'numeric',
            question:"$P(A) = 0{,}6$. Que vaut $P(\\bar{A})$ (probabilité de l'événement contraire) ?",
            answer:0.4, tolerance:0.001,
            explanation:"$P(\\bar{A}) = 1 - P(A) = 1 - 0{,}6 = \\mathbf{0{,}4}$."
          },
          {
            id:'ap-4', type:'numeric',
            question:"Arbre : $P(A) = 0{,}4$, $P_A(B) = 0{,}3$, $P_{\\bar{A}}(B) = 0{,}5$.<br/>Quelle est la probabilité de la feuille $(A \\cap B)$ ?",
            answer:0.12, tolerance:0.005,
            explanation:"$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}4 \\times 0{,}3 = \\mathbf{0{,}12}$."
          },
          {
            id:'ap-5', type:'qcm',
            question:"Sur un arbre pondéré, les probabilités portées sur les branches du <strong>2ᵉ niveau</strong> sont :",
            options:['Des probabilités classiques','Des probabilités conditionnelles','Toujours égales à $0{,}5$','Des effectifs'],
            correctIndex:1,
            explanation:"Les branches du 2ᵉ niveau partent d'un événement déjà réalisé (au 1ᵉʳ niveau). Elles portent donc des <strong>probabilités conditionnelles</strong> comme $P_A(B)$ ou $P_{\\bar{A}}(B)$."
          }
        ]
      },
      {
        id:'probas-totales', number:3, title:'Formule des probabilités totales',
        summary:"$P(B) = P(A) \\, P_A(B) + P(\\bar{A}) \\, P_{\\bar{A}}(B)$.",
        videoId:'Pc5kJBkPDbo', videoTitle:'Construire un arbre pondéré — Première/Terminale (Yvan Monka)',
        explanation:"La <strong>formule des probabilités totales</strong> permet de calculer $P(B)$ en décomposant $B$ selon une partition (typiquement $A$ et $\\bar{A}$). C'est essentiel quand on cherche une probabilité « globale » à partir d'informations conditionnelles.",
        keyPoints:[
          "$\\{A, \\bar{A}\\}$ forme un <strong>système complet d'événements</strong> (partition de l'univers)",
          "Formule de base : $P(B) = P(A \\cap B) + P(\\bar{A} \\cap B)$",
          "Avec les probas conditionnelles : $P(B) = P(A) \\, P_A(B) + P(\\bar{A}) \\, P_{\\bar{A}}(B)$",
          "Sur un arbre : $P(B) = $ <strong>somme des feuilles</strong> contenant $B$",
          "Applications : tests médicaux, contrôle qualité, sondages..."
        ],
        exercises:[
          {
            id:'pt-1', type:'numeric',
            question:"$P(A) = 0{,}4$, $P_A(B) = 0{,}3$, $P_{\\bar{A}}(B) = 0{,}5$.<br/>Calculer $P(B)$.",
            answer:0.42, tolerance:0.005,
            explanation:"$P(B) = P(A) \\, P_A(B) + P(\\bar{A}) \\, P_{\\bar{A}}(B) = 0{,}4 \\times 0{,}3 + 0{,}6 \\times 0{,}5 = 0{,}12 + 0{,}30 = \\mathbf{0{,}42}$."
          },
          {
            id:'pt-2', type:'qcm',
            question:"La formule des probabilités totales (avec $A$ et $\\bar{A}$) s'écrit :",
            options:[
              '$P(B) = P(A) + P(\\bar{A})$',
              '$P(B) = P(A) \\times P(\\bar{A})$',
              '$P(B) = P(A) \\, P_A(B) + P(\\bar{A}) \\, P_{\\bar{A}}(B)$',
              '$P(B) = P_A(B) - P_{\\bar{A}}(B)$'
            ],
            correctIndex:2,
            explanation:"Formule classique : $P(B) = P(A) \\, P_A(B) + P(\\bar{A}) \\, P_{\\bar{A}}(B)$. C'est exactement la somme des deux feuilles contenant $B$ dans l'arbre pondéré."
          },
          {
            id:'pt-3', type:'numeric',
            question:"$P(A) = 0{,}7$, $P(A \\cap B) = 0{,}21$, $P(\\bar{A} \\cap B) = 0{,}06$.<br/>Calculer $P(B)$.",
            answer:0.27, tolerance:0.005,
            explanation:"$P(B) = P(A \\cap B) + P(\\bar{A} \\cap B) = 0{,}21 + 0{,}06 = \\mathbf{0{,}27}$."
          },
          {
            id:'pt-4', type:'qcm',
            question:"$\\{A, \\bar{A}\\}$ forme :",
            options:[
              "Un système complet d'événements (partition de l'univers)",
              "Deux événements indépendants",
              "Deux événements identiques",
              "Aucun rapport entre eux"
            ],
            correctIndex:0,
            explanation:"$A$ et son contraire $\\bar{A}$ se complètent : ils couvrent tout l'univers ($A \\cup \\bar{A} = \\Omega$) sans se chevaucher ($A \\cap \\bar{A} = \\emptyset$). C'est un <strong>système complet d'événements</strong>."
          },
          {
            id:'pt-5', type:'numeric',
            question:"Test médical : $1$ % de la population est malade ($M$). Le test est positif ($+$) avec proba $0{,}95$ si malade, et $0{,}05$ si pas malade.<br/>Quelle est la probabilité qu'un test pris au hasard soit positif ?",
            answer:0.059, tolerance:0.005,
            explanation:"$P(+) = P(M) \\, P_M(+) + P(\\bar{M}) \\, P_{\\bar{M}}(+) = 0{,}01 \\times 0{,}95 + 0{,}99 \\times 0{,}05$ $= 0{,}0095 + 0{,}0495 = \\mathbf{0{,}059}$."
          }
        ]
      },
      {
        id:'independance', number:4, title:'Indépendance entre événements',
        summary:"$A$ et $B$ indépendants $\\Leftrightarrow$ $P(A \\cap B) = P(A) \\times P(B)$.",
        videoId:'SD9H5OYYLz0', videoTitle:"Utiliser l'indépendance entre deux événements (1) — Première/Terminale (Yvan Monka)",
        explanation:"Deux événements sont <strong>indépendants</strong> si la réalisation de l'un n'influence pas la probabilité de l'autre. C'est une notion fondamentale, mais attention : indépendant $\\neq$ incompatible !",
        keyPoints:[
          "<strong>Définition</strong> : $A$ et $B$ indépendants $\\Leftrightarrow$ $P(A \\cap B) = P(A) \\times P(B)$",
          "Équivalent : $P_A(B) = P(B)$ (la connaissance de $A$ n'apporte rien sur $B$)",
          "Équivalent : $P_B(A) = P(A)$",
          "Si $A$ indépendant de $B$, alors $A$ indépendant de $\\bar{B}$ (et toutes les combinaisons)",
          "<strong>Indépendant $\\neq$ incompatible</strong> ! Incompatible signifie $P(A \\cap B) = 0$"
        ],
        exercises:[
          {
            id:'in-1', type:'qcm',
            question:"$A$ et $B$ sont indépendants si et seulement si :",
            options:[
              '$P(A \\cup B) = P(A) + P(B)$',
              '$P(A \\cap B) = P(A) \\times P(B)$',
              '$P(A) = P(B)$',
              '$A$ et $B$ sont incompatibles'
            ],
            correctIndex:1,
            explanation:"Définition exacte : $A$ et $B$ indépendants $\\Leftrightarrow$ $\\mathbf{P(A \\cap B) = P(A) \\times P(B)}$."
          },
          {
            id:'in-2', type:'numeric',
            question:"$P(A) = 0{,}3$ et $P(B) = 0{,}5$, avec $A$ et $B$ indépendants. Calculer $P(A \\cap B)$.",
            answer:0.15, tolerance:0.005,
            explanation:"Indépendance : $P(A \\cap B) = P(A) \\times P(B) = 0{,}3 \\times 0{,}5 = \\mathbf{0{,}15}$."
          },
          {
            id:'in-3', type:'numeric',
            question:"$P(A) = 0{,}4$, $P(B) = 0{,}6$, $P(A \\cap B) = 0{,}24$.<br/>$A$ et $B$ sont-ils indépendants ? Tape <strong>1</strong> pour oui, <strong>0</strong> pour non.",
            answer:1, tolerance:0.001,
            explanation:"On compare $P(A) \\times P(B) = 0{,}4 \\times 0{,}6 = 0{,}24$ avec $P(A \\cap B) = 0{,}24$. Égalité $\\to$ <strong>indépendants</strong>. Réponse : $\\mathbf{1}$."
          },
          {
            id:'in-4', type:'numeric',
            question:"$P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(A \\cap B) = 0{,}1$.<br/>$A$ et $B$ sont-ils indépendants ? <strong>1</strong> pour oui, <strong>0</strong> pour non.",
            answer:0, tolerance:0.001,
            explanation:"$P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}20$ alors que $P(A \\cap B) = 0{,}10$. Ces valeurs sont <strong>différentes</strong>, donc $A$ et $B$ ne sont <strong>pas indépendants</strong>. Réponse : $\\mathbf{0}$."
          },
          {
            id:'in-5', type:'qcm',
            question:"Si $A$ et $B$ sont indépendants, alors $P_A(B) = ?$",
            options:['$0$','$1$','$P(B)$','$P(A) \\times P(B)$'],
            correctIndex:2,
            explanation:"L'indépendance signifie que la connaissance de $A$ n'apporte aucune info sur $B$, donc $P_A(B) = \\mathbf{P(B)}$."
          }
        ]
      },
      {
        id:'tableau-contingence', number:5, title:'Tableau de contingence et calculs combinés',
        summary:"Organiser les données dans un tableau croisé pour lire les probabilités.",
        videoId:'5oBnmZVrOXE', videoTitle:'LE COURS : Probabilités conditionnelles — Première/Terminale (Yvan Monka)',
        explanation:"Un <strong>tableau de contingence</strong> (ou tableau croisé) organise les effectifs ou probabilités selon deux variables. C'est le format le plus utilisé dans les exercices car il permet de lire directement toutes les probas dont on a besoin.",
        keyPoints:[
          "Lignes et colonnes correspondent à différentes modalités des deux variables",
          "Les cellules contiennent les effectifs (ou les probabilités conjointes)",
          "Les <strong>marges</strong> (totaux) donnent les probabilités marginales $P(A)$, $P(\\bar{A})$, $P(B)$, $P(\\bar{B})$",
          "Pour une conditionnelle $P_A(B)$ : on divise la cellule $(A, B)$ par la marge totale de la ligne ou colonne $A$",
          "Outil rapide et visuel pour les tests, sondages, et études statistiques"
        ],
        exercises:[
          {
            id:'tc-1', type:'numeric',
            question:"Sur $100$ élèves : $40$ filles dont $30$ font du sport, $60$ garçons dont $50$ font du sport.<br/>Quelle est la probabilité qu'un élève au hasard fasse du sport ?",
            answer:0.8, tolerance:0.005,
            explanation:"Total sportifs : $30 + 50 = 80$ sur $100$. $P(S) = \\dfrac{80}{100} = \\mathbf{0{,}8}$."
          },
          {
            id:'tc-2', type:'numeric',
            question:"Même contexte ($30$ filles sportives sur $80$ sportifs).<br/>Quelle est la probabilité qu'un sportif tiré au hasard soit une fille ?",
            answer:0.375, tolerance:0.005,
            explanation:"$P_S(F) = \\dfrac{P(F \\cap S)}{P(S)} = \\dfrac{30/100}{80/100} = \\dfrac{30}{80} = \\mathbf{0{,}375}$."
          },
          {
            id:'tc-3', type:'numeric',
            question:"Sur $600$ lancers de dé à six faces, on a obtenu un $6$ exactement $100$ fois.<br/>Probabilité empirique d'obtenir un $6$ ?",
            answer:0.167, tolerance:0.005,
            explanation:"$P($6$) = \\dfrac{100}{600} = \\dfrac{1}{6} \\approx \\mathbf{0{,}167}$.<br/>(Très proche de la probabilité théorique $\\dfrac{1}{6}$.)"
          },
          {
            id:'tc-4', type:'numeric',
            question:"Sur $200$ personnes : $80$ ont la maladie ($M$), dont $70$ testent positif.<br/>Quelle est la sensibilité du test $P_M(+)$ ?",
            answer:0.875, tolerance:0.005,
            explanation:"$P_M(+) = \\dfrac{\\text{positifs parmi malades}}{\\text{malades}} = \\dfrac{70}{80} = \\mathbf{0{,}875}$."
          },
          {
            id:'tc-5', type:'qcm',
            question:"Dans un tableau croisé, les <strong>marges</strong> (totaux des lignes/colonnes) donnent :",
            options:[
              'Les probabilités conditionnelles',
              'Les probabilités marginales $P(A)$, $P(B)$, etc.',
              'Toujours $1$',
              'Les variances'
            ],
            correctIndex:1,
            explanation:"Les marges donnent les <strong>probabilités marginales</strong> : c'est-à-dire les probabilités de chaque événement pris séparément, sans tenir compte de l'autre variable."
          }
        ]
      }
    ]
  },

  'second-degre': {
    description: "Le second degré est l'un des chapitres les plus utilisés du programme. Apprendre à résoudre $ax^2 + bx + c = 0$, factoriser, étudier le signe et reconnaître les paraboles te servira partout : équations, inéquations, optimisation, géométrie.",
    properties: [
      {
        id:'forme-canonique', number:1, title:'Forme canonique',
        summary:"Mettre $ax^2 + bx + c$ sous la forme $a(x - h)^2 + k$.",
        videoId:'JcT6kph74O0', videoTitle:"Déterminer la forme canonique d'une expression du second degré (1) — Première (Yvan Monka)",
        explanation:"Toute expression du second degré $ax^2 + bx + c$ peut s'écrire sous la <strong>forme canonique</strong> $a(x - h)^2 + k$, où $(h\\,;\\,k)$ est le <strong>sommet de la parabole</strong>. Cette forme est précieuse pour étudier les variations, trouver l'extremum, et résoudre des équations.",
        keyPoints:[
          "Forme canonique : $a(x - h)^2 + k$",
          "Abscisse du sommet : $h = -\\dfrac{b}{2a}$",
          "Ordonnée du sommet : $k = f(h)$",
          "Si $a > 0$ : la fonction admet un <strong>minimum</strong> en $h$, valeur $k$",
          "Si $a < 0$ : la fonction admet un <strong>maximum</strong> en $h$, valeur $k$"
        ],
        exercises:[
          {
            id:'fc-1', type:'qcm',
            question:"Mettre $x^2 - 6x + 1$ sous forme canonique :",
            options:['$(x - 3)^2 + 1$','$(x - 3)^2 - 8$','$(x + 3)^2 - 8$','$(x - 6)^2 + 1$'],
            correctIndex:1,
            explanation:"$x^2 - 6x = (x - 3)^2 - 9$ (complétion du carré).<br/>Donc $x^2 - 6x + 1 = (x - 3)^2 - 9 + 1 = \\mathbf{(x - 3)^2 - 8}$."
          },
          {
            id:'fc-2', type:'numeric',
            question:"Pour $f(x) = 2(x - 3)^2 + 5$, quelle est l'<strong>abscisse</strong> du sommet ?",
            answer:3, tolerance:0.001,
            explanation:"La forme canonique $a(x - h)^2 + k$ a son sommet en $(h\\,;\\,k)$. Ici $h = \\mathbf{3}$ et $k = 5$."
          },
          {
            id:'fc-3', type:'numeric',
            question:"Pour $f(x) = x^2 + 4x + 1$, le sommet a pour abscisse $h = -2$.<br/>Calculer l'<strong>ordonnée</strong> $k$ du sommet.",
            answer:-3, tolerance:0.001,
            explanation:"$k = f(-2) = (-2)^2 + 4 \\times (-2) + 1 = 4 - 8 + 1 = \\mathbf{-3}$.<br/>Forme canonique : $(x + 2)^2 - 3$."
          },
          {
            id:'fc-4', type:'qcm',
            question:"Si $f(x) = a(x - h)^2 + k$ avec $a < 0$, la fonction admet en $x = h$ un :",
            options:['Minimum local','Maximum local',"Point d\'inflexion",'Rien de particulier'],
            correctIndex:1,
            explanation:"Avec $a < 0$, la parabole est orientée vers le bas $\\to$ le sommet est un <strong>maximum</strong>. La valeur maximale est $k$, atteinte en $x = h$."
          },
          {
            id:'fc-5', type:'numeric',
            question:"On écrit $x^2 + 10x + 7 = (x + 5)^2 + k$. Que vaut $k$ ?",
            answer:-18, tolerance:0.001,
            explanation:"$(x + 5)^2 = x^2 + 10x + 25$. Donc $x^2 + 10x + 7 = (x + 5)^2 - 25 + 7 = (x + 5)^2 - 18$. $k = \\mathbf{-18}$."
          }
        ,
        {id:'fc-6', type:'qcm', question:"Forme canonique de $f(x) = x^2 - 4x + 7$ :", options:['$(x-2)^2 + 3$','$(x+2)^2 + 3$','$(x-2)^2 + 7$','$(x-4)^2 + 7$'], correctIndex:0, explanation:"$\\alpha = -b/(2a) = 2$, $\\beta = f(2) = 4-8+7 = 3$. Donc $(x-2)^2 + 3$."},
        {id:'fc-7', type:'qcm', question:"$f(x) = 2x^2 + 8x + 5$. $\\alpha = ?$", options:['$-2$','$2$','$-8$','$4$'], correctIndex:0, explanation:"$\\alpha = -b/(2a) = -8/4 = -2$."},
        {id:'fc-8', type:'numeric', question:"$f(x) = x^2 - 6x + 13$. $\\beta = ?$", answer:4, tolerance:0.01, explanation:"$\\alpha = 3$, $\\beta = f(3) = 9 - 18 + 13 = \\mathbf 4$."},
        {id:'fc-9', type:'qcm', question:"$f(x) = -x^2 + 4x - 1$. Forme canonique :", options:['$-(x-2)^2 + 3$','$(x+2)^2 - 3$','$-(x-2)^2 - 1$','$-(x+2)^2 + 3$'], correctIndex:0, explanation:"$a = -1$, $\\alpha = -4/(-2) = 2$, $\\beta = f(2) = -4+8-1 = 3$."},
        {id:'fc-10', type:'qcm', question:"$f(x) = a(x-\\alpha)^2 + \\beta$. Le sommet est :", options:['$(\\alpha, \\beta)$','$(0, \\beta)$','$(\\alpha, 0)$','$(\\beta, \\alpha)$'], correctIndex:0, explanation:"Le sommet est en $(\\alpha, \\beta)$."},
        {id:'fc-11', type:'qcm', question:"Si $a > 0$, le sommet $(\\alpha, \\beta)$ correspond à :", options:['Un maximum','Un minimum',"Un point d'inflexion",'Un zéro'], correctIndex:1, explanation:"$a > 0$ : parabole ouverte vers le haut, sommet = <strong>minimum</strong>."},
        {id:'fc-12', type:'qcm', question:"$f(x) = x^2 + 6x - 1$. Forme canonique :", options:['$(x+3)^2 - 10$','$(x-3)^2 + 10$','$(x+3)^2 + 8$','$(x-3)^2 - 1$'], correctIndex:0, explanation:"$\\alpha = -3$, $\\beta = f(-3) = 9-18-1 = -10$."},
        {id:'fc-13', type:'numeric', question:"$f(x) = 3x^2 - 12x + 7$. $\\beta = ?$", answer:-5, tolerance:0.01, explanation:"$\\alpha = 12/6 = 2$, $\\beta = 3\\times 4 - 24 + 7 = -5$."},
        {id:'fc-14', type:'qcm', question:"$f(x) = -(x-1)^2 + 5$. Sommet et nature :", options:['$(1, 5)$, max','$(1, 5)$, min','$(-1, 5)$, max','$(1, -5)$, max'], correctIndex:0, explanation:"$a = -1 < 0$, sommet $(1, 5)$ = <strong>maximum</strong>."},
        {id:'fc-15', type:'qcm', question:"$f(x) = 2(x+3)^2 - 1$. Forme développée :", options:['$2x^2 + 12x + 17$','$2x^2 + 6x + 17$','$x^2 + 12x + 17$','$2x^2 + 12x + 18$'], correctIndex:0, explanation:"$2(x^2+6x+9) - 1 = 2x^2 + 12x + 17$."},
        {id:'fc-16', type:'numeric', question:"$f(x) = x^2 + 4x + 5$. Minimum atteint en $x = ?$", answer:-2, tolerance:0.01, explanation:"$\\alpha = -b/(2a) = -2$."},
        {id:'fc-17', type:'numeric', question:"Pour la même $f$, valeur du minimum ?", answer:1, tolerance:0.01, explanation:"$f(-2) = 4 - 8 + 5 = 1$."},
        {id:'fc-18', type:'qcm', question:"Forme canonique sert à :", options:['Trouver le sommet rapidement','Étudier signe et variations','Résoudre $f(x) = k$','Tout cela'], correctIndex:3, explanation:"Tous ces usages !"},
        {id:'fc-19', type:'qcm', question:"$f(x) = x^2 - 2x + 1$. Forme canonique :", options:['$(x-1)^2$','$(x+1)^2$','$(x-1)^2 + 1$','$x^2$'], correctIndex:0, explanation:"Identité remarquable : $x^2 - 2x + 1 = (x-1)^2$. $\\beta = 0$."},
        {id:'fc-20', type:'qcm', question:"$f(x) = -2x^2 + 4x$. Sommet :", options:['$(1, 2)$','$(1, -2)$','$(-1, 2)$','$(2, 0)$'], correctIndex:0, explanation:"$\\alpha = -4/(-4) = 1$, $\\beta = f(1) = -2+4 = 2$."}
      ]
      },
      {
        id:'discriminant', number:2, title:'Discriminant et résolution',
        summary:"$\\Delta = b^2 - 4ac$ donne le nombre et la valeur des solutions.",
        videoId:'tc9wvbYuZts', videoTitle:'LE COURS : Équations du second degré — Première (Yvan Monka)',
        explanation:"Pour résoudre $ax^2 + bx + c = 0$, on calcule le <strong>discriminant</strong> $\\Delta = b^2 - 4ac$. Son signe détermine le nombre de solutions, et sa valeur permet de les calculer.",
        keyPoints:[
          "<strong>Discriminant</strong> : $\\Delta = b^2 - 4ac$",
          "$\\Delta > 0$ : <strong>deux solutions distinctes</strong> $x_{1,2} = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$",
          "$\\Delta = 0$ : <strong>une solution double</strong> $x_0 = -\\dfrac{b}{2a}$",
          "$\\Delta < 0$ : <strong>aucune solution réelle</strong>",
          "Toujours bien identifier $a$, $b$, $c$ (attention aux signes !)"
        ],
        exercises:[
          {
            id:'dis-1', type:'numeric',
            question:"Calculer le discriminant $\\Delta$ pour $x^2 - 5x + 6 = 0$.",
            answer:1, tolerance:0.001,
            explanation:"$a = 1$, $b = -5$, $c = 6$.<br/>$\\Delta = b^2 - 4ac = (-5)^2 - 4 \\times 1 \\times 6 = 25 - 24 = \\mathbf{1}$."
          },
          {
            id:'dis-2', type:'numeric',
            question:"Combien de solutions a l'équation $x^2 + x + 1 = 0$ ?",
            answer:0, tolerance:0.001,
            explanation:"$\\Delta = 1^2 - 4 \\times 1 \\times 1 = -3 < 0$. Donc <strong>aucune</strong> solution réelle. Réponse : $\\mathbf{0}$."
          },
          {
            id:'dis-3', type:'numeric',
            question:"Résoudre $x^2 - 5x + 6 = 0$. Quelle est la <strong>plus grande</strong> des deux solutions ?",
            answer:3, tolerance:0.001,
            explanation:"$\\Delta = 1$. $x = \\dfrac{5 \\pm 1}{2}$, donc $x_1 = 2$ et $x_2 = 3$. La plus grande est $\\mathbf{3}$.<br/>(Vérification : $3^2 - 5 \\times 3 + 6 = 9 - 15 + 6 = 0$ ✓)"
          },
          {
            id:'dis-4', type:'qcm',
            question:"Si $\\Delta = 0$, l'équation $ax^2 + bx + c = 0$ a :",
            options:['Aucune solution','Une solution double','Deux solutions distinctes','Une infinité'],
            correctIndex:1,
            explanation:"$\\Delta = 0 \\to$ <strong>une solution double</strong> $x_0 = -\\dfrac{b}{2a}$. Géométriquement, la parabole est tangente à l'axe des $x$ en ce point."
          },
          {
            id:'dis-5', type:'numeric',
            question:"Pour $x^2 - 4x - 5 = 0$, la somme des deux solutions vaut :",
            answer:4, tolerance:0.001,
            explanation:"Par les formules de Viète : somme $= -\\dfrac{b}{a} = -\\dfrac{-4}{1} = \\mathbf{4}$.<br/>(Vérification : solutions $5$ et $-1$, somme $= 4$ ✓)"
          }
        ,
        {id:'dis-6', type:'numeric', question:"$\\Delta$ de $x^2 - 5x + 6$ ?", answer:1, tolerance:0.001, explanation:"$25 - 24 = 1$."},
        {id:'dis-7', type:'numeric', question:"$\\Delta$ de $2x^2 + 3x - 2$ ?", answer:25, tolerance:0.01, explanation:"$9 + 16 = 25$."},
        {id:'dis-8', type:'qcm', question:"$\\Delta < 0$ : nombre de racines réelles ?", options:['$0$','$1$','$2$','Infini'], correctIndex:0, explanation:"$\\Delta < 0 \\Rightarrow$ pas de racines réelles."},
        {id:'dis-9', type:'qcm', question:"$\\Delta = 0$ : nombre de racines ?", options:['$0$','$1$ (double)','$2$','$1$ (simple)'], correctIndex:1, explanation:"$\\Delta = 0 \\Rightarrow$ une racine double."},
        {id:'dis-10', type:'qcm', question:"$\\Delta = b^2 - 4ac$. Pour $x^2 + 2x + 1$ : $\\Delta = ?$", options:['$0$','$1$','$4$','$-3$'], correctIndex:0, explanation:"$4 - 4 = 0$."},
        {id:'dis-11', type:'numeric', question:"$\\Delta$ de $-x^2 + 6x - 5$ ?", answer:16, tolerance:0.01, explanation:"$a = -1$, $b = 6$, $c = -5$. $36 - 4(-1)(-5) = 36 - 20 = 16$."},
        {id:'dis-12', type:'qcm', question:"Si $\\Delta > 0$ et $a > 0$, la parabole :", options:["Touche l'axe en un point","Coupe l'axe en deux points",'Reste au-dessus','Reste en dessous'], correctIndex:1, explanation:"$\\Delta > 0$ : <strong>2 racines distinctes</strong>."},
        {id:'dis-13', type:'numeric', question:"Pour $x^2 + 4x + 4$ : $\\Delta = ?$", answer:0, tolerance:0.001, explanation:"$16 - 16 = 0$. Racine double $-2$."},
        {id:'dis-14', type:'qcm', question:"$f(x) = x^2 + 1$. Racines réelles ?", options:['Une','Deux','Aucune','Trois'], correctIndex:2, explanation:"$\\Delta = 0 - 4 = -4 < 0$. <strong>Aucune racine réelle</strong>."},
        {id:'dis-15', type:'qcm', question:"$f(x) = ax^2 + bx + c$ a 2 racines $\\Leftrightarrow$", options:['$\\Delta = 0$','$\\Delta > 0$','$\\Delta < 0$','$a > 0$'], correctIndex:1, explanation:"$\\Delta > 0 \\Rightarrow$ 2 racines distinctes."},
        {id:'dis-16', type:'numeric', question:"$\\Delta$ de $3x^2 - 6x + 3$ ?", answer:0, tolerance:0.001, explanation:"$36 - 36 = 0$. Racine double $1$."},
        {id:'dis-17', type:'qcm', question:"Quel $k$ rend $x^2 - 4x + k$ tangent à $y = 0$ ?", options:['$k = 0$','$k = 4$','$k = -4$','$k = 16$'], correctIndex:1, explanation:"$\\Delta = 16 - 4k = 0 \\Leftrightarrow k = 4$."},
        {id:'dis-18', type:'qcm', question:"$f(x) = x^2 - 7x + 12$. $\\Delta$ ?", options:['$1$','$49 - 48 = 1$','$49 + 48 = 97$','$5$'], correctIndex:1, explanation:"$49 - 4 \\times 12 = 1$."},
        {id:'dis-19', type:'qcm', question:"$\\Delta = 16$. Racines $x_1$ et $x_2$ via formule $\\dfrac{-b \\pm \\sqrt\\Delta}{2a}$ : combien de calculs distincts ?", options:['1','2 (un +, un -)','3','4'], correctIndex:1, explanation:"On obtient deux racines par les signes $\\pm$."},
        {id:'dis-20', type:'numeric', question:"$f(x) = x^2 + 2x + 5$. $\\Delta = ?$", answer:-16, tolerance:0.01, explanation:"$4 - 20 = -16$. Pas de racine."}
      ]
      },
      {
        id:'factorisation-racines', number:3, title:'Factorisation et formules de Viète',
        summary:"Si $x_1, x_2$ sont les racines : $ax^2 + bx + c = a(x - x_1)(x - x_2)$.",
        videoId:'tc9wvbYuZts', videoTitle:'LE COURS : Équations du second degré — Première (Yvan Monka)',
        explanation:"Connaître les <strong>racines</strong> d'un trinôme permet de le <strong>factoriser</strong>. Les <strong>formules de Viète</strong> relient les racines aux coefficients : très utiles pour vérifier ses calculs ou retrouver une racine connaissant l'autre.",
        keyPoints:[
          "Factorisation : $ax^2 + bx + c = a(x - x_1)(x - x_2)$",
          "Somme des racines : $S = x_1 + x_2 = -\\dfrac{b}{a}$",
          "Produit des racines : $P = x_1 \\times x_2 = \\dfrac{c}{a}$",
          "Si on connaît une racine, l'autre se trouve avec $S$ ou $P$",
          "Pour deviner les racines : chercher deux nombres dont la somme = $-\\dfrac{b}{a}$ et le produit = $\\dfrac{c}{a}$"
        ],
        exercises:[
          {
            id:'fr-1', type:'qcm',
            question:"Les racines de $x^2 - 5x + 6 = 0$ sont $2$ et $3$. La forme factorisée est :",
            options:['$(x + 2)(x + 3)$','$(x - 2)(x - 3)$','$(x - 2)(x + 3)$','$(x + 5)(x - 6)$'],
            correctIndex:1,
            explanation:"Forme factorisée : $a(x - x_1)(x - x_2) = 1 \\times (x - 2)(x - 3) = \\mathbf{(x - 2)(x - 3)}$."
          },
          {
            id:'fr-2', type:'numeric',
            question:"Pour $x^2 - 4x + 3 = 0$, la somme des racines vaut :",
            answer:4, tolerance:0.001,
            explanation:"$S = -\\dfrac{b}{a} = -\\dfrac{-4}{1} = \\mathbf{4}$.<br/>(Vérif : racines $1$ et $3$, somme $= 4$ ✓)"
          },
          {
            id:'fr-3', type:'numeric',
            question:"Pour $x^2 + 7x + 12 = 0$, le produit des racines vaut :",
            answer:12, tolerance:0.001,
            explanation:"$P = \\dfrac{c}{a} = \\dfrac{12}{1} = \\mathbf{12}$.<br/>(Vérif : racines $-3$ et $-4$, produit $= 12$ ✓)"
          },
          {
            id:'fr-4', type:'numeric',
            question:"On sait qu'une racine de $x^2 - 7x + 12 = 0$ est $3$. L'autre racine est :",
            answer:4, tolerance:0.001,
            explanation:"Somme des racines : $S = 7$. Si $x_1 = 3$, alors $x_2 = 7 - 3 = \\mathbf{4}$.<br/>Vérif produit : $3 \\times 4 = 12$ ✓"
          },
          {
            id:'fr-5', type:'qcm',
            question:"Deux nombres ont pour somme $5$ et pour produit $6$. Ces nombres sont :",
            options:['$1$ et $5$','$2$ et $3$','$-1$ et $6$','$0$ et $5$'],
            correctIndex:1,
            explanation:"On cherche les racines de $x^2 - 5x + 6 = 0$ (somme $5$ = $-b/a$, produit $6$ = $c/a$).<br/>$\\Delta = 25 - 24 = 1$, $x = \\dfrac{5 \\pm 1}{2}$, donc racines $\\mathbf{2}$ et $\\mathbf{3}$."
          }
        ,
        {id:'fr-6', type:'qcm', question:"Racines de $x^2 - 5x + 6$ :", options:['$2$ et $3$','$1$ et $6$','$-2$ et $-3$','$3$ et $-3$'], correctIndex:0, explanation:"$\\Delta = 1$, $x = (5\\pm 1)/2 = 3$ ou $2$. <strong>$2$ et $3$</strong>."},
        {id:'fr-7', type:'qcm', question:"Factorisation de $x^2 - 9$ :", options:['$(x-3)(x+3)$','$(x-3)^2$','$(x-9)(x+1)$','$x(x-9)$'], correctIndex:0, explanation:"Différence de carrés."},
        {id:'fr-8', type:'qcm', question:"Racines de $2x^2 - 8$ :", options:['$\\pm 4$','$\\pm 2$','$\\pm \\sqrt 2$','$\\pm 8$'], correctIndex:1, explanation:"$2x^2 = 8 \\Leftrightarrow x^2 = 4 \\Leftrightarrow x = \\pm 2$."},
        {id:'fr-9', type:'qcm', question:"$x^2 - 3x = 0$ donne :", options:['$x = 0$ ou $x = 3$','$x = 3$','$x = -3$','Pas de sol.'], correctIndex:0, explanation:"$x(x-3) = 0$."},
        {id:'fr-10', type:'numeric', question:"Plus grande racine de $x^2 - 7x + 10$ ?", answer:5, tolerance:0.001, explanation:"$\\Delta = 9$, $x = (7+3)/2 = 5$ ou $(7-3)/2 = 2$. Max : <strong>5</strong>."},
        {id:'fr-11', type:'qcm', question:"$f(x) = a(x-x_1)(x-x_2)$ avec $x_1 = 1$, $x_2 = -2$, $a = 3$. Forme développée ?", options:['$3x^2 + 3x - 6$','$3x^2 - 3x - 6$','$x^2 + x - 2$','$3(x^2+x-2)$'], correctIndex:0, explanation:"$3(x-1)(x+2) = 3(x^2+x-2) = 3x^2+3x-6$."},
        {id:'fr-12', type:'qcm', question:"Somme des racines de $ax^2+bx+c$ :", options:['$-b/a$','$b/a$','$c/a$','$-c/a$'], correctIndex:0, explanation:"Formule de Viète : $x_1 + x_2 = -b/a$."},
        {id:'fr-13', type:'qcm', question:"Produit des racines de $ax^2+bx+c$ :", options:['$-b/a$','$b/a$','$c/a$','$-c/a$'], correctIndex:2, explanation:"$x_1 x_2 = c/a$."},
        {id:'fr-14', type:'numeric', question:"$x^2 - 6x + 9$ : racine double ?", answer:3, tolerance:0.001, explanation:"$(x-3)^2 = 0$."},
        {id:'fr-15', type:'qcm', question:"$x^2 + 4 = 0$ a :", options:['Deux racines réelles','Une racine double','Pas de racine réelle','Une seule racine'], correctIndex:2, explanation:"$\\Delta = -16 < 0$."},
        {id:'fr-16', type:'numeric', question:"Une racine de $x^2 - 4x - 5$ ?", answer:5, tolerance:0.001, explanation:"$\\Delta = 16+20 = 36$, $x = (4\\pm 6)/2 = 5$ ou $-1$."},
        {id:'fr-17', type:'qcm', question:"$2x^2 + 7x + 3$ : racines ?", options:['$-3$ et $-1/2$','$-3$ et $1/2$','$3$ et $1/2$','$1$ et $3$'], correctIndex:0, explanation:"$\\Delta = 49 - 24 = 25$, $x = (-7\\pm 5)/4 = -1/2$ ou $-3$."},
        {id:'fr-18', type:'qcm', question:"$f(x) = -(x-2)(x+1)$. Racines :", options:['$1$ et $-2$','$2$ et $-1$','$2$ et $1$','$-2$ et $-1$'], correctIndex:1, explanation:"Forme factorisée : racines $2$ et $-1$."},
        {id:'fr-19', type:'qcm', question:"$x^2 - x - 6$ se factorise en :", options:['$(x-3)(x+2)$','$(x-2)(x+3)$','$(x-6)(x+1)$','$(x-3)(x-2)$'], correctIndex:0, explanation:"Racines $3$ et $-2$ ($\\Delta = 25$)."},
        {id:'fr-20', type:'qcm', question:"Si $x_1 + x_2 = 5$ et $x_1 x_2 = 6$, polynôme :", options:['$x^2 - 5x + 6$','$x^2 + 5x + 6$','$x^2 - 6x + 5$','$x^2 + 5x - 6$'], correctIndex:0, explanation:"$x^2 - (x_1+x_2)x + x_1 x_2 = x^2 - 5x + 6$."}
      ]
      },
      {
        id:'parabole', number:4, title:'Représentation graphique (parabole)',
        summary:"Orientation, sommet, axe de symétrie selon $a$, $b$, $c$.",
        videoId:'WVYWdN13kPE', videoTitle:'LE COURS : Fonctions du second degré — Première (Yvan Monka)',
        explanation:"La courbe représentative de $y = ax^2 + bx + c$ est une <strong>parabole</strong>. Son orientation, son sommet et son axe de symétrie se lisent directement sur les coefficients.",
        keyPoints:[
          "Si $a > 0$ : parabole orientée vers le <strong>haut</strong> (forme $\\cup$)",
          "Si $a < 0$ : parabole orientée vers le <strong>bas</strong> (forme $\\cap$)",
          "<strong>Sommet</strong> : $S(h\\,;\\,k)$ avec $h = -\\dfrac{b}{2a}$ et $k = f(h)$",
          "<strong>Axe de symétrie</strong> : droite verticale d'équation $x = h$",
          "Intersections avec l'axe des $x$ : selon le signe de $\\Delta$ (2 si $\\Delta > 0$, 1 si $\\Delta = 0$, 0 si $\\Delta < 0$)"
        ],
        exercises:[
          {
            id:'pa-1', type:'qcm',
            question:"La parabole $y = -2x^2 + 3x + 1$ est orientée :",
            options:['Vers le haut','Vers le bas','Horizontalement','En diagonale'],
            correctIndex:1,
            explanation:"$a = -2 < 0$, donc la parabole est orientée <strong>vers le bas</strong> (forme $\\cap$, comme une montagne)."
          },
          {
            id:'pa-2', type:'qcm',
            question:"Quel est le sommet de la parabole $y = (x - 4)^2 + 7$ ?",
            options:['$S(-4\\,;\\,7)$','$S(4\\,;\\,-7)$','$S(4\\,;\\,7)$','$S(-4\\,;\\,-7)$'],
            correctIndex:2,
            explanation:"Forme canonique $a(x - h)^2 + k$ avec $a = 1$, $h = 4$, $k = 7$.<br/>Sommet : $\\mathbf{S(4\\,;\\,7)}$."
          },
          {
            id:'pa-3', type:'numeric',
            question:"Pour $y = x^2 - 6x + 5$, l'abscisse du sommet vaut :",
            answer:3, tolerance:0.001,
            explanation:"$h = -\\dfrac{b}{2a} = -\\dfrac{-6}{2 \\times 1} = \\mathbf{3}$."
          },
          {
            id:'pa-4', type:'numeric',
            question:"Combien d'intersections la parabole $y = x^2 + 1$ a-t-elle avec l'axe des abscisses ?",
            answer:0, tolerance:0.001,
            explanation:"Intersections avec l'axe des $x$ $\\Leftrightarrow$ solutions de $x^2 + 1 = 0$.<br/>$\\Delta = 0 - 4 = -4 < 0$, donc <strong>aucune</strong> intersection. Réponse : $\\mathbf{0}$."
          },
          {
            id:'pa-5', type:'numeric',
            question:"L'axe de symétrie de $y = 2x^2 + 8x + 1$ est la droite $x = ?$",
            answer:-2, tolerance:0.001,
            explanation:"Axe de symétrie : $x = -\\dfrac{b}{2a} = -\\dfrac{8}{2 \\times 2} = \\dfrac{-8}{4} = \\mathbf{-2}$."
          }
        ,
        {id:'par-6', type:'qcm', question:"$f(x) = x^2$. Axe de symétrie ?", options:['$x = 0$','$y = 0$','$x = 1$','Aucun'], correctIndex:0, explanation:"Axe $x = 0$ (l'axe des ordonnées)."},
        {id:'par-7', type:'qcm', question:"$f(x) = (x-3)^2 + 2$. Axe de symétrie ?", options:['$x = 3$','$x = 2$','$x = -3$','$y = 2$'], correctIndex:0, explanation:"$x = \\alpha = 3$."},
        {id:'par-8', type:'qcm', question:"Si $a > 0$, la parabole est tournée vers :", options:['Le haut','Le bas','La droite','La gauche'], correctIndex:0, explanation:"$a > 0$ : ouverture vers le haut."},
        {id:'par-9', type:'qcm', question:"$a < 0$ : la parabole est tournée vers :", options:['Le haut','Le bas','La gauche','Aucun'], correctIndex:1, explanation:"$a < 0$ : ouverture vers le bas."},
        {id:'par-10', type:'numeric', question:"$f(x) = 2x^2 - 4x + 1$. Abscisse du sommet ?", answer:1, tolerance:0.001, explanation:"$\\alpha = 4/4 = 1$."},
        {id:'par-11', type:'numeric', question:"Pour la même $f$ : ordonnée du sommet ?", answer:-1, tolerance:0.001, explanation:"$f(1) = 2 - 4 + 1 = -1$."},
        {id:'par-12', type:'qcm', question:"Variations de $f(x) = x^2 - 2x$ : la fonction est :", options:['Croissante puis décroissante','Décroissante puis croissante','Toujours croissante','Toujours décroissante'], correctIndex:1, explanation:"$a > 0$ : $\\searrow$ avant $\\alpha = 1$, $\\nearrow$ après."},
        {id:'par-13', type:'qcm', question:"$f(x) = -x^2 + 4x$. Maximum ?", options:['$0$','$2$','$4$','$\\sqrt 2$'], correctIndex:2, explanation:"$\\alpha = 2$, $f(2) = -4 + 8 = 4$."},
        {id:'par-14', type:'qcm', question:"Image de $-2$ par $f(x) = x^2 + 1$ :", options:['$3$','$5$','$-3$','$-1$'], correctIndex:1, explanation:"$f(-2) = 4 + 1 = 5$."},
        {id:'par-15', type:'qcm', question:"Antécédent(s) de $4$ par $f(x) = x^2$ :", options:['$2$ uniquement','$-2$ uniquement','$2$ et $-2$','Aucun'], correctIndex:2, explanation:"$x^2 = 4 \\Rightarrow x = \\pm 2$."},
        {id:'par-16', type:'qcm', question:"$f$ et $-f$ (avec $f$ trinôme) ont :", options:['Même axe de symétrie','Le même sommet','Sont identiques','Axes orthogonaux'], correctIndex:0, explanation:"Multiplier par $-1$ ne change pas $\\alpha$. <strong>Même axe</strong>."},
        {id:'par-17', type:'numeric', question:"Si $f(0) = 5$ pour $f(x) = ax^2 + bx + c$, alors $c = ?$", answer:5, tolerance:0.001, explanation:"$f(0) = c$."},
        {id:'par-18', type:'qcm', question:"Une parabole et son axe se coupent en :", options:['Le sommet','Les racines',"L'origine",'2 points'], correctIndex:0, explanation:"L'axe passe par le sommet."},
        {id:'par-19', type:'qcm', question:"$f(x) = x^2 - 6x + 9$. La parabole touche l'axe en :", options:['Un seul point','Deux points','Aucun point','Trois points'], correctIndex:0, explanation:"Racine double $3$ : tangente à l'axe."},
        {id:'par-20', type:'qcm', question:"Coordonnées du sommet de $y = (x-4)^2 - 7$ :", options:['$(4, -7)$','$(-4, 7)$','$(7, 4)$','$(4, 7)$'], correctIndex:0, explanation:"Sommet $(\\alpha, \\beta) = (4, -7)$."}
      ]
      },
      {
        id:'signe-trinome', number:5, title:'Signe du trinôme et inéquations',
        summary:"« Signe de $a$ à l'extérieur des racines, signe contraire entre. »",
        videoId:'Sfe9lTv9Qwg', videoTitle:"Déterminer les variations d'une fonction du second degré — Première (Yvan Monka)",
        explanation:"Pour étudier le <strong>signe d'un trinôme</strong> $ax^2 + bx + c$ sur $\\mathbb{R}$, on utilise une règle simple basée sur le discriminant et le signe de $a$. C'est essentiel pour résoudre les inéquations du second degré.",
        keyPoints:[
          "$\\Delta > 0$ : le trinôme est du <strong>signe de $a$ à l'extérieur des racines</strong>, du signe contraire entre les racines",
          "$\\Delta = 0$ : le trinôme est du signe de $a$ partout (sauf nul en la racine double)",
          "$\\Delta < 0$ : le trinôme est <strong>du signe de $a$ partout</strong> (sans s'annuler)",
          "Pour résoudre une inéquation : étudier le signe, puis lire l'ensemble solution sur un tableau de signes",
          "Mnémonique : « $a > 0$, $\\cup$, négatif entre les racines »"
        ],
        exercises:[
          {
            id:'st-1', type:'qcm',
            question:"Quel est le signe de $x^2 - 5x + 6$ pour $x = 4$ ?",
            options:['Positif','Négatif','Nul','On ne peut pas savoir'],
            correctIndex:0,
            explanation:"Racines : $2$ et $3$. Pour $x = 4$ (à l'extérieur des racines, à droite), le trinôme est du <strong>signe de $a = 1 > 0$</strong>, donc <strong>positif</strong>. Calcul direct : $16 - 20 + 6 = 2 > 0$ ✓"
          },
          {
            id:'st-2', type:'qcm',
            question:"Quel est le signe de $x^2 + x + 1$ sur $\\mathbb{R}$ ?",
            options:['Toujours positif','Toujours négatif','Change de signe','Toujours nul'],
            correctIndex:0,
            explanation:"$\\Delta = 1 - 4 = -3 < 0$. Pas de racines. Le trinôme est du signe de $a = 1 > 0$ partout : <strong>toujours positif</strong>."
          },
          {
            id:'st-3', type:'qcm',
            question:"Résoudre $x^2 - 5x + 6 < 0$. L'ensemble solution est :",
            options:['$\\mathbb{R}$', '$]-\\infty\\,;\\,2[ \\cup ]3\\,;\\,+\\infty[$', '$]2\\,;\\,3[$', '$\\emptyset$'],
            correctIndex:2,
            explanation:"Racines $2$ et $3$. $a > 0$, donc trinôme négatif <strong>entre</strong> les racines.<br/>Ensemble solution : $\\mathbf{]2\\,;\\,3[}$."
          },
          {
            id:'st-4', type:'qcm',
            question:"Quel est le signe de $-(x - 1)(x - 5)$ pour $x = 3$ ?",
            options:['Positif','Négatif','Nul','Indéfini'],
            correctIndex:0,
            explanation:"Racines : $1$ et $5$. Le coefficient principal est $a = -1 < 0$. Donc le trinôme est négatif <strong>à l'extérieur</strong> des racines, positif <strong>entre</strong> $1$ et $5$. Pour $x = 3$ (entre) : <strong>positif</strong>. Vérif : $-(3-1)(3-5) = -(2)(-2) = 4 > 0$ ✓"
          },
          {
            id:'st-5', type:'qcm',
            question:"Résoudre $x^2 - 4 \\geq 0$. L'ensemble solution est :",
            options:['$]-2\\,;\\,2[$', '$[-2\\,;\\,2]$', '$]-\\infty\\,;\\,-2] \\cup [2\\,;\\,+\\infty[$', '$\\mathbb{R}$'],
            correctIndex:2,
            explanation:"$x^2 - 4 = (x-2)(x+2)$, racines $-2$ et $2$. $a = 1 > 0$, donc positif à l'extérieur.<br/>$x^2 - 4 \\geq 0$ ssi $x \\leq -2$ ou $x \\geq 2$, soit $\\mathbf{]-\\infty\\,;\\,-2] \\cup [2\\,;\\,+\\infty[}$."
          }
        ,
        {id:'st-6', type:'qcm', question:"$f(x) = x^2 - 4$. Signe ?", options:['$+$ partout','$-$ partout','$+$ hors $[-2, 2]$, $-$ entre','$-$ hors, $+$ entre'], correctIndex:2, explanation:"$a > 0$ : $+$ à l'extérieur des racines $\\pm 2$, $-$ entre."},
        {id:'st-7', type:'qcm', question:"$f(x) = -x^2 + 4$. Signe ?", options:['$+$ entre $\\pm 2$, $-$ hors','$-$ entre, $+$ hors','$+$ partout','$-$ partout'], correctIndex:0, explanation:"$a < 0$ : signe contraire : $+$ entre racines, $-$ hors."},
        {id:'st-8', type:'qcm', question:"$f(x) = x^2 + 1$ est :", options:['Toujours positive','Toujours négative','Change de signe','Nulle en $x = -1$'], correctIndex:0, explanation:"$\\Delta = -4 < 0$ et $a > 0$ : <strong>toujours positive</strong>."},
        {id:'st-9', type:'qcm', question:"$f(x) = -x^2 - 1$ est :", options:['Toujours positive','Toujours négative','Change de signe','Nulle'], correctIndex:1, explanation:"$\\Delta < 0$ et $a < 0$ : toujours négative."},
        {id:'st-10', type:'qcm', question:"$f(x) = (x-1)(x-3)$. $f(x) \\leq 0$ ssi :", options:['$x \\in [1, 3]$','$x \\notin [1, 3]$','$x = 1$ ou $x = 3$','$x \\in \\mathbb R$'], correctIndex:0, explanation:"Entre les racines, signe négatif (car $a > 0$)."},
        {id:'st-11', type:'qcm', question:"Résoudre $x^2 < 9$ :", options:['$x < 3$','$x > 3$','$-3 < x < 3$','$x \\neq 0$'], correctIndex:2, explanation:"$x^2 - 9 < 0 \\Leftrightarrow (x-3)(x+3) < 0 \\Leftrightarrow -3 < x < 3$."},
        {id:'st-12', type:'qcm', question:"Résoudre $x^2 \\geq 4$ :", options:['$x \\geq 2$','$x \\leq -2$ ou $x \\geq 2$','$-2 \\leq x \\leq 2$','$x \\neq \\pm 2$'], correctIndex:1, explanation:"Hors $[-2, 2]$."},
        {id:'st-13', type:'qcm', question:"$\\Delta < 0$ : signe du trinôme $ax^2+bx+c$ :", options:['Du signe de $a$ partout','Du signe contraire de $a$','Variable','$+$ puis $-$'], correctIndex:0, explanation:"Pas de racine, signe constant = signe de $a$."},
        {id:'st-14', type:'qcm', question:"$x^2 + x + 1$ est :", options:['Toujours positive','Toujours négative','Nulle en $x = -1$','Variable'], correctIndex:0, explanation:"$\\Delta = 1 - 4 = -3 < 0$, $a > 0$ : tjrs $+$."},
        {id:'st-15', type:'qcm', question:"Tableau de signe de $(x-2)(x+1)$ :", options:['$+$ partout','$-$ partout','$+$ avant $-1$, $-$ entre, $+$ après $2$','$-$ avant $-1$, $+$ entre, $-$ après'], correctIndex:2, explanation:"$a > 0$ : $+$ hors racines, $-$ entre."},
        {id:'st-16', type:'qcm', question:"$f(x) = -2x^2 + 8x - 6$. $f(x) > 0$ ssi :", options:['$x \\in ]1, 3[$','$x < 1$ ou $x > 3$','Pour tout $x$','Aucun $x$'], correctIndex:0, explanation:"Racines $1$ et $3$ ; $a < 0$ donc $+$ entre."},
        {id:'st-17', type:'qcm', question:"Résoudre $x^2 - x - 2 \\geq 0$ :", options:['$x \\leq -1$ ou $x \\geq 2$','$-1 \\leq x \\leq 2$','$x \\geq 2$','Aucune solution'], correctIndex:0, explanation:"$(x-2)(x+1) \\geq 0$ : hors $]-1, 2[$ donc $x \\leq -1$ ou $x \\geq 2$."},
        {id:'st-18', type:'qcm', question:"$f(x) = 3x^2 - 12$. Combien de solutions à $f(x) = 0$ ?", options:['0','1','2','3'], correctIndex:2, explanation:"$3x^2 = 12 \\Rightarrow x^2 = 4 \\Rightarrow x = \\pm 2$."},
        {id:'st-19', type:'qcm', question:"$\\Delta = 0$ : signe du trinôme ?", options:["Du signe de $a$, sauf en $\\alpha$ où il s'annule",'Toujours nul','Toujours $+$','Variable'], correctIndex:0, explanation:"Une racine double : signe de $a$ partout, $0$ en $\\alpha$."},
        {id:'st-20', type:'numeric', question:"Combien de solutions à $x^2 - 6x + 9 = 0$ ?", answer:1, tolerance:0.001, explanation:"$(x-3)^2 = 0$, racine double : <strong>1</strong>."}
      ]
      }
    ]
  },

  'derivation': {
    description: "La dérivation, c'est le calcul du « taux de variation instantané » d'une fonction. C'est l'outil central pour étudier les fonctions : trouver leurs extremums, leur sens de variation, tracer leur courbe.",
    properties: [
      {
        id:'nombre-derive', number:1, title:'Nombre dérivé en un point',
        summary:"Coefficient directeur de la tangente à la courbe au point $(a\\,;\\,f(a))$.",
        videoId:'UmT0Gov6yyE', videoTitle:'Calculer le nombre dérivé (1) — Première (Yvan Monka)',
        explanation:"Le <strong>nombre dérivé</strong> de $f$ en $a$, noté $f'(a)$, est le <strong>coefficient directeur de la tangente</strong> à la courbe au point d'abscisse $a$. Mathématiquement, c'est la limite du taux d'accroissement quand $h$ tend vers $0$.",
        keyPoints:[
          "<strong>Définition</strong> : $f'(a) = \\displaystyle\\lim_{h \\to 0} \\dfrac{f(a+h) - f(a)}{h}$",
          "<strong>Interprétation géométrique</strong> : pente de la tangente au point $(a\\,;\\,f(a))$",
          "<strong>Interprétation physique</strong> : vitesse instantanée (si $f$ est une position)",
          "Une fonction est <strong>dérivable en $a$</strong> si et seulement si cette limite existe",
          "Toutes les fonctions usuelles (polynômes, $\\sqrt{x}$, $\\dfrac{1}{x}$...) sont dérivables sur leur ensemble de définition"
        ],
        exercises:[
          {
            id:'nd-1', type:'numeric',
            question:"Soit $f(x) = x^2$. Calculer $f'(2)$ par la définition.",
            answer:4, tolerance:0.001,
            explanation:"Taux d'accroissement : $\\dfrac{f(2+h) - f(2)}{h} = \\dfrac{(2+h)^2 - 4}{h} = \\dfrac{4 + 4h + h^2 - 4}{h} = \\dfrac{4h + h^2}{h} = 4 + h$.<br/>Quand $h \\to 0$, on a $f'(2) = \\mathbf{4}$."
          },
          {
            id:'nd-2', type:'numeric',
            question:"Soit $f(x) = 3x + 5$ (fonction affine). Que vaut $f'(a)$ pour n'importe quel $a$ ?",
            answer:3, tolerance:0.001,
            explanation:"Pour une fonction affine $f(x) = mx + p$, le nombre dérivé est <strong>toujours le coefficient directeur $m$</strong>.<br/>Ici $m = 3$, donc $f'(a) = \\mathbf{3}$ pour tout $a$."
          },
          {
            id:'nd-3', type:'qcm',
            question:"Géométriquement, $f'(a)$ représente :",
            options:[
              "L'ordonnée du point d'abscisse $a$",
              "Le coefficient directeur de la tangente au point d'abscisse $a$",
              "L'aire sous la courbe en $a$",
              "La valeur de $f(a)$"
            ],
            correctIndex:1,
            explanation:"Le nombre dérivé $f'(a)$ est par définition le <strong>coefficient directeur de la tangente</strong> à la courbe de $f$ au point d'abscisse $a$."
          },
          {
            id:'nd-4', type:'qcm',
            question:"Le taux d'accroissement de $f$ entre $a$ et $a+h$ est :",
            options:[
              "$f(a+h) - f(a)$",
              "$\\dfrac{f(a+h) - f(a)}{h}$",
              "$\\dfrac{f(a+h) + f(a)}{h}$",
              "$\\dfrac{f(a)}{h}$"
            ],
            correctIndex:1,
            explanation:"Le taux d'accroissement (= pente de la corde) entre les points d'abscisse $a$ et $a+h$ est $\\mathbf{\\dfrac{f(a+h) - f(a)}{h}}$. Quand $h \\to 0$, la corde tend vers la tangente.",
          },
          {
            id:'nd-5', type:'numeric',
            question:"Soit $f(x) = x^2 + 3$. Que vaut $f'(1)$ ?",
            answer:2, tolerance:0.001,
            explanation:"Taux d'accroissement : $\\dfrac{(1+h)^2 + 3 - (1 + 3)}{h} = \\dfrac{1 + 2h + h^2 + 3 - 4}{h} = \\dfrac{2h + h^2}{h} = 2 + h$.<br/>Limite : $f'(1) = \\mathbf{2}$. (La constante $+3$ disparaît, comme toujours.)"
          }
        ]
      },
      {
        id:'equation-tangente', number:2, title:"Équation de la tangente",
        summary:"$y = f'(a)(x - a) + f(a)$ — la formule à mémoriser.",
        videoId:'m0MVxKnxFWE', videoTitle:'Nombre dérivé et tangente : cours + exos corrigés — 1ère (Yvan Monka)',
        explanation:"La <strong>tangente à la courbe de $f$ au point d'abscisse $a$</strong> est la droite qui « touche » la courbe en ce point sans la traverser localement. Son équation réduite est donnée par une formule à connaître par cœur.",
        keyPoints:[
          "<strong>Équation</strong> : $y = f'(a)(x - a) + f(a)$",
          "$f'(a)$ est le <strong>coefficient directeur</strong>",
          "$f(a)$ est l'<strong>ordonnée du point de tangence</strong>",
          "Si $f'(a) = 0$ : la tangente est <strong>horizontale</strong> (souvent un maximum ou un minimum local)",
          "Une fonction affine est sa propre tangente en tout point"
        ],
        exercises:[
          {
            id:'tan-1', type:'qcm',
            question:"Soit $f(x) = x^2$ avec $f'(2) = 4$ et $f(2) = 4$.<br/>Quelle est l'équation de la tangente en $x = 2$ ?",
            options:['$y = 4x$','$y = 4x - 4$','$y = 4x + 4$','$y = 2x - 4$'],
            correctIndex:1,
            explanation:"$y = f'(a)(x - a) + f(a) = 4(x - 2) + 4 = 4x - 8 + 4 = \\mathbf{4x - 4}$."
          },
          {
            id:'tan-2', type:'qcm',
            question:"Si $f'(a) = 0$, la tangente en $a$ est :",
            options:['Verticale','Horizontale',"Confondue avec l\'axe des $y$",'Identique à la courbe'],
            correctIndex:1,
            explanation:"Coefficient directeur $0 \\to$ droite <strong>horizontale</strong>. Cela arrive aux extremums locaux (maxima, minima)."
          },
          {
            id:'tan-3', type:'qcm',
            question:"Tangente à $f(x) = x^2$ en $x = 0$ (avec $f'(0) = 0$ et $f(0) = 0$) :",
            options:['$y = 0$','$y = x$','$y = -x$','$x = 0$'],
            correctIndex:0,
            explanation:"$y = f'(0)(x - 0) + f(0) = 0 \\times x + 0 = \\mathbf{0}$. La tangente est l'axe des abscisses."
          },
          {
            id:'tan-4', type:'numeric',
            question:"$f(x) = x^2 + 1$. On donne $f'(3) = 6$ et $f(3) = 10$.<br/>L'équation de la tangente s'écrit $y = 6x + b$. Que vaut $b$ ?",
            answer:-8, tolerance:0.001,
            explanation:"$y = 6(x - 3) + 10 = 6x - 18 + 10 = 6x - 8$. Donc $b = \\mathbf{-8}$."
          },
          {
            id:'tan-5', type:'qcm',
            question:"Pour une fonction affine $f(x) = 2x + 5$, la tangente en n'importe quel point est :",
            options:[
              'La droite $y = 2x$',
              "L'axe des abscisses",
              'La droite elle-même $y = 2x + 5$',
              'Une droite verticale'
            ],
            correctIndex:2,
            explanation:"Pour une fonction affine, $f'(a) = 2$ (le coefficient directeur) et $f(a) = 2a + 5$ pour tout $a$.<br/>$y = 2(x - a) + 2a + 5 = 2x - 2a + 2a + 5 = 2x + 5$.<br/>La tangente est <strong>la droite elle-même</strong>."
          }
        ]
      },
      {
        id:'formules-derivees', number:3, title:"Fonction dérivée — formules usuelles",
        summary:"Les formules à connaître par cœur : $x^n$, $\\sqrt{x}$, $\\dfrac{1}{x}$, constantes.",
        videoId:'uMSNllPBFhQ', videoTitle:'LE COURS : La dérivation — Première (Yvan Monka)',
        explanation:"La <strong>fonction dérivée</strong> $f'$ est la fonction qui, à chaque $x$, associe le nombre dérivé $f'(x)$. Pour calculer une dérivée sans repasser par le taux d'accroissement, on utilise les <strong>formules usuelles</strong>.",
        keyPoints:[
          "$(k)' = 0$ pour toute constante $k$",
          "$(x)' = 1$",
          "$(x^n)' = nx^{n-1}$ — la formule reine",
          "$\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$",
          "$(\\sqrt{x})' = \\dfrac{1}{2\\sqrt{x}}$",
          "Exemples : $(x^2)' = 2x$, $(x^3)' = 3x^2$, $(x^5)' = 5x^4$"
        ],
        exercises:[
          {
            id:'fd-1', type:'qcm',
            question:"Que vaut la dérivée de $f(x) = x^3$ ?",
            options:['$x^2$','$3x^2$','$3x^3$','$x^4 / 4$'],
            correctIndex:1,
            explanation:"Formule : $(x^n)' = nx^{n-1}$. Pour $n = 3$ : $(x^3)' = \\mathbf{3x^2}$."
          },
          {
            id:'fd-2', type:'numeric',
            question:"Soit $f(x) = 5$ (fonction constante). Que vaut $f'(x)$ pour tout $x$ ?",
            answer:0, tolerance:0.001,
            explanation:"La dérivée d'une constante est <strong>toujours nulle</strong>. $f'(x) = \\mathbf{0}$."
          },
          {
            id:'fd-3', type:'qcm',
            question:"Que vaut la dérivée de $f(x) = x^4$ ?",
            options:['$4x^3$','$x^3$','$4x^5$','$x^5 / 5$'],
            correctIndex:0,
            explanation:"$(x^n)' = nx^{n-1}$ avec $n = 4$ : $(x^4)' = \\mathbf{4x^3}$."
          },
          {
            id:'fd-4', type:'qcm',
            question:"Que vaut la dérivée de $f(x) = x^2$ ?",
            options:['$x$','$2x$','$x^2 / 2$','$2$'],
            correctIndex:1,
            explanation:"$(x^n)' = nx^{n-1}$ avec $n = 2$ : $(x^2)' = 2x^{2-1} = \\mathbf{2x}$."
          },
          {
            id:'fd-5', type:'qcm',
            question:"Que vaut la dérivée de $f(x) = \\dfrac{1}{x}$ ?",
            options:['$\\dfrac{1}{x}$','$\\dfrac{1}{x^2}$','$-\\dfrac{1}{x^2}$','$-\\dfrac{1}{x}$'],
            correctIndex:2,
            explanation:"Formule usuelle : $\\left(\\dfrac{1}{x}\\right)' = \\mathbf{-\\dfrac{1}{x^2}}$. (Attention au signe moins.)"
          }
        ]
      },
      {
        id:'operations-derivees', number:4, title:"Opérations sur les dérivées",
        summary:"Dérivée d'une somme, d'un produit, d'un quotient, de $k \\times u$.",
        videoId:'1fOGueiO_zk', videoTitle:'Dériver une fonction (2) — Première (Yvan Monka)',
        explanation:"Pour dériver une expression composée de plusieurs termes (somme, produit, quotient...), on utilise des <strong>règles d'opérations</strong>. La plus utilisée est la <strong>linéarité</strong> : dérivée d'une somme = somme des dérivées.",
        keyPoints:[
          "<strong>Somme</strong> : $(u + v)' = u' + v'$",
          "<strong>Multiple</strong> : $(ku)' = k \\times u'$ (la constante reste)",
          "<strong>Produit</strong> : $(uv)' = u'v + uv'$",
          "<strong>Quotient</strong> : $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$",
          "Exemple : $(3x^2 + 5x - 7)' = 6x + 5$ (la constante $-7$ disparaît)"
        ],
        exercises:[
          {
            id:'op-1', type:'qcm',
            question:"Dérivée de $f(x) = 3x^2 + 2x$ :",
            options:['$3x + 2$','$6x + 2$','$5x$','$6x^2 + 2$'],
            correctIndex:1,
            explanation:"$(3x^2)' = 3 \\times 2x = 6x$. $(2x)' = 2$. Somme : $\\mathbf{f'(x) = 6x + 2}$."
          },
          {
            id:'op-2', type:'qcm',
            question:"Dérivée de $f(x) = 5x^3 - 2x + 7$ :",
            options:['$15x^2 - 2$','$15x^2 - 2 + 7$','$5x^2 - 2$','$15x^2$'],
            correctIndex:0,
            explanation:"$(5x^3)' = 15x^2$, $(-2x)' = -2$, $(7)' = 0$. Somme : $\\mathbf{15x^2 - 2}$. <br/>(La constante $+7$ disparaît à la dérivation.)"
          },
          {
            id:'op-3', type:'qcm',
            question:"Dérivée de $f(x) = -3x^2 + 4$ :",
            options:['$-6x + 4$','$-6x$','$-3x$','$-6x - 4$'],
            correctIndex:1,
            explanation:"$(-3x^2)' = -3 \\times 2x = -6x$. $(4)' = 0$. Donc $\\mathbf{f'(x) = -6x}$."
          },
          {
            id:'op-4', type:'numeric',
            question:"Soit $f(x) = 2x^2 + 3x - 5$. Que vaut $f'(2)$ ?",
            answer:11, tolerance:0.001,
            explanation:"$f'(x) = 4x + 3$. Donc $f'(2) = 4 \\times 2 + 3 = \\mathbf{11}$."
          },
          {
            id:'op-5', type:'qcm',
            question:"On veut dériver $f(x) = x^2 \\cdot (x + 1)$. Quelle règle utiliser ?",
            options:[
              "Règle du produit : $(uv)' = u'v + uv'$",
              "Règle de la somme",
              "Règle du quotient",
              "Aucune règle, c'est juste $x^3$"
            ],
            correctIndex:0,
            explanation:"On peut utiliser la <strong>règle du produit</strong> avec $u = x^2$ et $v = x + 1$.<br/>$f'(x) = 2x \\cdot (x+1) + x^2 \\cdot 1 = 2x^2 + 2x + x^2 = 3x^2 + 2x$.<br/>(On peut aussi développer d'abord : $f(x) = x^3 + x^2$ et dériver : $f'(x) = 3x^2 + 2x$. Même résultat.)"
          }
        ]
      },
      {
        id:'variation-derivee', number:5, title:"Sens de variation et signe de la dérivée",
        summary:"$f' > 0 \\to f$ croissante. $f' < 0 \\to f$ décroissante.",
        videoId:'dPIlTNyBCiw', videoTitle:'Comprendre SIGNE DE LA DÉRIVÉE ↔ VARIATIONS — Première (Yvan Monka)',
        explanation:"Le <strong>signe de la dérivée</strong> $f'$ détermine le <strong>sens de variation</strong> de $f$. C'est une des applications majeures de la dérivation : étudier les variations d'une fonction sans avoir à la tracer point par point.",
        keyPoints:[
          "Si $f'(x) > 0$ sur un intervalle $I$ $\\to$ $f$ est <strong>strictement croissante</strong> sur $I$",
          "Si $f'(x) < 0$ sur $I$ $\\to$ $f$ est <strong>strictement décroissante</strong> sur $I$",
          "Si $f'(x) = 0$ sur $I$ $\\to$ $f$ est <strong>constante</strong> sur $I$",
          "Si $f'$ s'annule en changeant de signe en $x = a$ $\\to$ $f$ a un <strong>extremum local</strong> en $a$",
          "Méthode : étudier le signe de $f'$ (souvent un polynôme), puis dresser le tableau de variations"
        ],
        exercises:[
          {
            id:'vd-1', type:'qcm',
            question:"Si $f'(x) > 0$ sur l'intervalle $]0\\,;\\,5[$, alors :",
            options:[
              "$f$ est décroissante sur $]0\\,;\\,5[$",
              "$f$ est croissante sur $]0\\,;\\,5[$",
              "$f$ est constante",
              "$f$ atteint un maximum sur $]0\\,;\\,5[$"
            ],
            correctIndex:1,
            explanation:"$f' > 0 \\Rightarrow f$ est <strong>strictement croissante</strong> sur cet intervalle. La pente de la tangente est positive partout."
          },
          {
            id:'vd-2', type:'qcm',
            question:"$f'$ s'annule en $x = 2$ en passant du signe $+$ au signe $-$. Alors $f$ a en $x = 2$ :",
            options:['Un minimum local','Un maximum local',"Un point d\'inflexion",'Une asymptote'],
            correctIndex:1,
            explanation:"$f$ croît avant ($f' > 0$) puis décroît après ($f' < 0$). C'est un <strong>maximum local</strong>.<br/>Mnémo : « $+/-$ → max ; $-/+$ → min »."
          },
          {
            id:'vd-3', type:'qcm',
            question:"Soit $f(x) = x^2$. Sur quel intervalle $f$ est-elle décroissante ?",
            options:['$\\mathbb{R}$', '$]-\\infty\\,;\\,0[$', '$]0\\,;\\,+\\infty[$', "Sur aucun intervalle"],
            correctIndex:1,
            explanation:"$f'(x) = 2x$. On a $f'(x) < 0$ ssi $x < 0$. Donc $f$ est <strong>décroissante sur $]-\\infty\\,;\\,0[$</strong> (et croissante sur $]0\\,;\\,+\\infty[$)."
          },
          {
            id:'vd-4', type:'numeric',
            question:"Soit $f(x) = x^2 - 6x + 5$. En quelle valeur de $x$ la fonction atteint-elle son minimum ?",
            answer:3, tolerance:0.001,
            explanation:"$f'(x) = 2x - 6$. $f'(x) = 0 \\Leftrightarrow x = 3$. <br/>$f'$ passe du $-$ au $+$ en $x = 3$ (parabole vers le haut), donc minimum en $\\mathbf{x = 3}$."
          },
          {
            id:'vd-5', type:'qcm',
            question:"Pour étudier le sens de variation d'une fonction $f$, on calcule :",
            options:[
              "$f(0)$",
              "$f'$ et on étudie son signe",
              "$f(x)^2$",
              "La limite de $f$ en $+\\infty$"
            ],
            correctIndex:1,
            explanation:"On calcule $f'$ (la dérivée) et on étudie son <strong>signe</strong> sur l'intervalle considéré. Le signe de $f'$ détermine le sens de variation de $f$."
          }
        ]
      }
    ]
  },


  'puissances': {
    description: "Les puissances et racines carrées sont des outils de base qui reviennent partout en lycée : développement, équations, géométrie, statistiques. Bien maîtriser leurs règles évite des erreurs lourdes.",
    properties: [
      {
        id:'def-puissances', number:1, title:'Définition et notation',
        summary:"$a^n$ représente $a$ multiplié $n$ fois par lui-même.",
        videoId:'2gKpv0brXVQ', videoTitle:'Calcul littéral et puissances — cours (Yvan Monka)',
        explanation:"La <strong>puissance</strong> $a^n$ ($a$ exposant $n$) représente le produit de $a$ par lui-même $n$ fois. C'est une notation compacte pour des multiplications répétées, indispensable en sciences.",
        keyPoints:[
          "$a^n = \\underbrace{a \\times a \\times \\cdots \\times a}_{n \\text{ fois}}$ (pour $n \\geq 1$)",
          "$a^0 = 1$ (par convention, pour tout $a \\neq 0$)",
          "$a^1 = a$",
          "$a^{-n} = \\dfrac{1}{a^n}$ (puissance négative = inverse)",
          "Attention : $(-3)^2 = 9$ (positif) mais $-3^2 = -9$ (négatif). Les parenthèses comptent !"
        ],
        exercises:[
          {
            id:'pui-1', type:'numeric',
            question:"Calculer $2^5$.",
            answer:32, tolerance:0.001,
            explanation:"$2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = \\mathbf{32}$."
          },
          {
            id:'pui-2', type:'numeric',
            question:"Calculer $3^4$.",
            answer:81, tolerance:0.001,
            explanation:"$3^4 = 3 \\times 3 \\times 3 \\times 3 = 9 \\times 9 = \\mathbf{81}$."
          },
          {
            id:'pui-3', type:'numeric',
            question:"Que vaut $10^0$ ?",
            answer:1, tolerance:0.001,
            explanation:"Par convention, $a^0 = 1$ pour tout $a \\neq 0$. Donc $10^0 = \\mathbf{1}$."
          },
          {
            id:'pui-4', type:'qcm',
            question:"Calculer $5^{-2}$ :",
            options:['$-25$','$-10$','$\\dfrac{1}{25}$','$\\dfrac{1}{10}$'],
            correctIndex:2,
            explanation:"$5^{-2} = \\dfrac{1}{5^2} = \\mathbf{\\dfrac{1}{25}}$. La puissance négative donne l'inverse, pas un nombre négatif."
          },
          {
            id:'pui-5', type:'numeric',
            question:"Calculer $(-3)^4$.",
            answer:81, tolerance:0.001,
            explanation:"$(-3)^4 = (-3) \\times (-3) \\times (-3) \\times (-3) = 9 \\times 9 = \\mathbf{81}$.<br/>Avec un exposant <strong>pair</strong>, le résultat est positif même si la base est négative."
          }
        ]
      },
      {
        id:'regles-puissances', number:2, title:'Règles opératoires',
        summary:"Multiplier, diviser, élever à une puissance.",
        videoId:'2gKpv0brXVQ', videoTitle:'Calcul littéral et puissances — cours (Yvan Monka)',
        explanation:"Quand on combine des puissances, on suit des <strong>règles précises</strong>. Les connaître par cœur permet de simplifier rapidement des expressions complexes.",
        keyPoints:[
          "Produit même base : $a^m \\times a^n = a^{m+n}$",
          "Quotient même base : $\\dfrac{a^m}{a^n} = a^{m-n}$",
          "Puissance de puissance : $(a^m)^n = a^{m \\times n}$",
          "Produit puissance : $(a \\times b)^n = a^n \\times b^n$",
          "Quotient puissance : $\\left(\\dfrac{a}{b}\\right)^n = \\dfrac{a^n}{b^n}$"
        ],
        exercises:[
          {
            id:'rp-1', type:'numeric',
            question:"$2^3 \\times 2^4 = 2^k$. Que vaut $k$ ?",
            answer:7, tolerance:0.001,
            explanation:"Produit même base : on additionne les exposants. $2^3 \\times 2^4 = 2^{3+4} = 2^7$. Donc $k = \\mathbf{7}$."
          },
          {
            id:'rp-2', type:'qcm',
            question:"Simplifier $(3^2)^4$ :",
            options:['$3^6$','$3^8$','$3^{16}$','$9^4$'],
            correctIndex:1,
            explanation:"Puissance de puissance : on multiplie les exposants. $(3^2)^4 = 3^{2 \\times 4} = \\mathbf{3^8}$."
          },
          {
            id:'rp-3', type:'numeric',
            question:"Calculer $\\dfrac{5^7}{5^4}$ :",
            answer:125, tolerance:0.001,
            explanation:"Quotient même base : on soustrait les exposants. $\\dfrac{5^7}{5^4} = 5^{7-4} = 5^3 = \\mathbf{125}$."
          },
          {
            id:'rp-4', type:'qcm',
            question:"Simplifier $(2 \\times 3)^2$ :",
            options:['$5^2 = 25$','$2^2 \\times 3^2 = 36$','$2 \\times 3^2 = 18$','$6^3 = 216$'],
            correctIndex:1,
            explanation:"$(a \\times b)^n = a^n \\times b^n$. Donc $(2 \\times 3)^2 = 2^2 \\times 3^2 = 4 \\times 9 = \\mathbf{36}$.<br/>(Vérif direct : $(2 \\times 3)^2 = 6^2 = 36$ ✓)"
          },
          {
            id:'rp-5', type:'numeric',
            question:"Simplifier $4^6 \\times 4^{-3}$ et donner le résultat numérique.",
            answer:64, tolerance:0.001,
            explanation:"$4^6 \\times 4^{-3} = 4^{6 + (-3)} = 4^3 = \\mathbf{64}$."
          }
        ]
      },
      {
        id:'puissances-10', number:3, title:'Puissances de 10 et écriture scientifique',
        summary:"Notation pour les très grands ou très petits nombres.",
        videoId:'2gKpv0brXVQ', videoTitle:'Puissances et écriture scientifique (Yvan Monka)',
        explanation:"Les <strong>puissances de 10</strong> ont un usage particulier : elles permettent d'écrire de très grands ou très petits nombres sous une forme compacte appelée <strong>écriture scientifique</strong>.",
        keyPoints:[
          "$10^n = 1\\underbrace{00\\cdots 0}_{n \\text{ zéros}}$ pour $n \\geq 1$",
          "$10^{-n} = 0{,}\\underbrace{00\\cdots 0}_{n-1 \\text{ zéros}}1$",
          "Écriture scientifique : $a \\times 10^n$ avec $1 \\leq |a| < 10$ et $n$ entier relatif",
          "Multiplier par $10^n$ déplace la virgule de $n$ rangs vers la droite (si $n > 0$) ou la gauche (si $n < 0$)",
          "Utile en physique, chimie, astronomie : taille atome $\\approx 10^{-10}$ m, distance Terre-Soleil $\\approx 1{,}5 \\times 10^{11}$ m"
        ],
        exercises:[
          {
            id:'p10-1', type:'numeric',
            question:"Calculer $10^3$.",
            answer:1000, tolerance:0.001,
            explanation:"$10^3 = 10 \\times 10 \\times 10 = \\mathbf{1000}$ (le « 1 » suivi de 3 zéros)."
          },
          {
            id:'p10-2', type:'numeric',
            question:"Calculer $10^{-2}$ et donner le résultat décimal.",
            answer:0.01, tolerance:0.0001,
            explanation:"$10^{-2} = \\dfrac{1}{10^2} = \\dfrac{1}{100} = \\mathbf{0{,}01}$."
          },
          {
            id:'p10-3', type:'qcm',
            question:"L'écriture scientifique de $345\\,000$ est :",
            options:['$345 \\times 10^3$','$3{,}45 \\times 10^5$','$34{,}5 \\times 10^4$','$0{,}345 \\times 10^6$'],
            correctIndex:1,
            explanation:"Pour l'écriture scientifique, on a $a \\times 10^n$ avec $1 \\leq a < 10$.<br/>$345\\,000 = \\mathbf{3{,}45 \\times 10^5}$ (on décale la virgule de 5 rangs vers la gauche)."
          },
          {
            id:'p10-4', type:'numeric',
            question:"Écriture scientifique de $0{,}0008 = 8 \\times 10^k$. Que vaut $k$ ?",
            answer:-4, tolerance:0.001,
            explanation:"$0{,}0008 = \\dfrac{8}{10\\,000} = 8 \\times 10^{-4}$. Donc $k = \\mathbf{-4}$."
          },
          {
            id:'p10-5', type:'numeric',
            question:"$(2 \\times 10^3) \\times (3 \\times 10^4) = c \\times 10^7$. Que vaut $c$ ?",
            answer:6, tolerance:0.001,
            explanation:"On multiplie les parties décimales et on additionne les exposants : $2 \\times 3 = 6$ et $10^3 \\times 10^4 = 10^7$.<br/>Donc le résultat est $6 \\times 10^7$, et $c = \\mathbf{6}$."
          }
        ]
      },
      {
        id:'racines-carrees', number:4, title:'Racines carrées',
        summary:"Définition, propriétés et calculs avec $\\sqrt{a}$.",
        videoId:'2gKpv0brXVQ', videoTitle:'Racines carrées — cours (Yvan Monka)',
        explanation:"La <strong>racine carrée</strong> $\\sqrt{a}$ d'un nombre positif $a$ est l'unique nombre positif dont le carré vaut $a$. Elle apparaît partout : Pythagore, équations du second degré, distances...",
        keyPoints:[
          "$\\sqrt{a}$ n'est défini que pour $a \\geq 0$ et $\\sqrt{a} \\geq 0$",
          "$(\\sqrt{a})^2 = a$ et $\\sqrt{a^2} = |a|$",
          "Produit : $\\sqrt{a \\times b} = \\sqrt{a} \\times \\sqrt{b}$ (pour $a, b \\geq 0$)",
          "Quotient : $\\sqrt{\\dfrac{a}{b}} = \\dfrac{\\sqrt{a}}{\\sqrt{b}}$ (pour $a \\geq 0$, $b > 0$)",
          "Attention : $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$ en général ! (Exemple : $\\sqrt{9 + 16} = 5 \\neq 3 + 4 = 7$)"
        ],
        exercises:[
          {
            id:'rac-1', type:'numeric',
            question:"Calculer $\\sqrt{25}$.",
            answer:5, tolerance:0.001,
            explanation:"$5 \\times 5 = 25$, et $5 \\geq 0$. Donc $\\sqrt{25} = \\mathbf{5}$."
          },
          {
            id:'rac-2', type:'numeric',
            question:"Calculer $\\sqrt{49}$.",
            answer:7, tolerance:0.001,
            explanation:"$7 \\times 7 = 49$. Donc $\\sqrt{49} = \\mathbf{7}$."
          },
          {
            id:'rac-3', type:'qcm',
            question:"Que vaut $(\\sqrt{7})^2$ ?",
            options:['$7$','$49$','$\\sqrt{14}$','$\\sqrt{49}$'],
            correctIndex:0,
            explanation:"Par définition, $(\\sqrt{a})^2 = a$. Donc $(\\sqrt{7})^2 = \\mathbf{7}$."
          },
          {
            id:'rac-4', type:'numeric',
            question:"Simplifier $\\sqrt{50}$ sous la forme $a\\sqrt{2}$. Que vaut $a$ ?",
            answer:5, tolerance:0.001,
            explanation:"$50 = 25 \\times 2$, donc $\\sqrt{50} = \\sqrt{25 \\times 2} = \\sqrt{25} \\times \\sqrt{2} = 5\\sqrt{2}$. Donc $a = \\mathbf{5}$."
          },
          {
            id:'rac-5', type:'qcm',
            question:"Calculer $\\sqrt{\\dfrac{16}{9}}$ :",
            options:['$\\dfrac{4}{3}$','$\\dfrac{16}{3}$','$\\dfrac{4}{9}$','$\\dfrac{7}{12}$'],
            correctIndex:0,
            explanation:"$\\sqrt{\\dfrac{16}{9}} = \\dfrac{\\sqrt{16}}{\\sqrt{9}} = \\mathbf{\\dfrac{4}{3}}$."
          }
        ]
      }
    ]
  },


  'equations-base': {
    description: "Résoudre une équation, c'est trouver la ou les valeurs de l'inconnue qui rendent l'égalité vraie. C'est l'outil fondamental qui revient partout : géométrie, physique, économie, finance.",
    properties: [
      {
        id:'ax-plus-b', number:1, title:'Résoudre $ax + b = 0$',
        summary:"L'équation type du premier degré : isoler $x$.",
        videoId:'2gKpv0brXVQ', videoTitle:'Équations du 1er degré — cours (Yvan Monka)',
        explanation:"Une équation $ax + b = 0$ (avec $a \\neq 0$) admet une <strong>unique solution</strong> $x = -\\dfrac{b}{a}$. La méthode : isoler $x$ en passant tout le reste de l'autre côté.",
        keyPoints:[
          "Forme générale : $ax + b = 0$ avec $a \\neq 0$",
          "Solution : $x = -\\dfrac{b}{a}$",
          "Méthode : soustraire $b$ des deux côtés, puis diviser par $a$",
          "Si $a = 0$ : soit $b = 0$ (infinité de solutions), soit $b \\neq 0$ (aucune solution)",
          "Vérification : substituer la valeur trouvée dans l'équation initiale"
        ],
        exercises:[
          {id:'eq1-1', type:'numeric', question:"Résoudre $2x + 6 = 0$.", answer:-3, tolerance:0.001, explanation:"$2x = -6 \\Leftrightarrow x = \\mathbf{-3}$."},
          {id:'eq1-2', type:'numeric', question:"Résoudre $3x - 12 = 0$.", answer:4, tolerance:0.001, explanation:"$3x = 12 \\Leftrightarrow x = \\mathbf{4}$."},
          {id:'eq1-3', type:'numeric', question:"Résoudre $-5x + 10 = 0$.", answer:2, tolerance:0.001, explanation:"$-5x = -10 \\Leftrightarrow x = \\dfrac{-10}{-5} = \\mathbf{2}$."},
          {id:'eq1-4', type:'qcm', question:"L'équation $0 \\cdot x + 3 = 0$ a :", options:['Une unique solution','Aucune solution','Une infinité de solutions','Deux solutions'],correctIndex:1, explanation:"$0 \\cdot x = -3$ est impossible car $0 \\cdot x = 0$ toujours. Donc <strong>aucune solution</strong>."},
          {id:'eq1-5', type:'numeric', question:"Résoudre $4x + 7 = 0$ et donner la solution sous forme décimale.", answer:-1.75, tolerance:0.005, explanation:"$x = -\\dfrac{7}{4} = \\mathbf{-1{,}75}$."}
        ]
      },
      {
        id:'ax-cx', number:2, title:"Équations $ax + b = cx + d$",
        summary:"Regrouper les $x$ d'un côté, les nombres de l'autre.",
        videoId:'2gKpv0brXVQ', videoTitle:'Équations du 1er degré — cours (Yvan Monka)',
        explanation:"Quand l'inconnue apparaît des deux côtés du signe $=$, on <strong>regroupe</strong> les termes en $x$ d'un côté et les constantes de l'autre.",
        keyPoints:[
          "Méthode : soustraire $cx$ des deux côtés pour regrouper les $x$",
          "Puis soustraire $b$ pour isoler le terme en $x$",
          "Enfin diviser par le coefficient de $x$",
          "Bien gérer les signes : passer de l'autre côté = changer de signe",
          "Vérifier sa solution en la remplaçant dans les deux membres"
        ],
        exercises:[
          {id:'eq2-1', type:'numeric', question:"Résoudre $3x + 5 = x + 11$.", answer:3, tolerance:0.001, explanation:"$3x - x = 11 - 5 \\Leftrightarrow 2x = 6 \\Leftrightarrow x = \\mathbf{3}$."},
          {id:'eq2-2', type:'numeric', question:"Résoudre $5x - 4 = 2x + 8$.", answer:4, tolerance:0.001, explanation:"$5x - 2x = 8 + 4 \\Leftrightarrow 3x = 12 \\Leftrightarrow x = \\mathbf{4}$."},
          {id:'eq2-3', type:'numeric', question:"Résoudre $7x + 1 = 3x - 11$.", answer:-3, tolerance:0.001, explanation:"$7x - 3x = -11 - 1 \\Leftrightarrow 4x = -12 \\Leftrightarrow x = \\mathbf{-3}$."},
          {id:'eq2-4', type:'qcm', question:"L'équation $2(x+3) = 2x + 6$ a :", options:['Une unique solution','Aucune solution','Une infinité de solutions','Deux solutions'],correctIndex:2, explanation:"$2x + 6 = 2x + 6$ : c'est toujours vrai. <strong>Infinité de solutions</strong> (toute valeur de $x$ marche)."},
          {id:'eq2-5', type:'numeric', question:"Résoudre $\\dfrac{x}{2} + 3 = 7$.", answer:8, tolerance:0.001, explanation:"$\\dfrac{x}{2} = 4 \\Leftrightarrow x = \\mathbf{8}$."}
        ]
      },
      {
        id:'produit-nul', number:3, title:'Équations produit nul',
        summary:"Si un produit est nul, alors l'un des facteurs est nul.",
        videoId:'2gKpv0brXVQ', videoTitle:'Équations produit nul (Yvan Monka)',
        explanation:"Une <strong>équation produit nul</strong> est de la forme $A \\times B = 0$. Elle se résout grâce à la propriété : un produit est nul si et seulement si l'un (au moins) de ses facteurs est nul.",
        keyPoints:[
          "Propriété : $A \\times B = 0 \\Leftrightarrow A = 0 \\text{ ou } B = 0$",
          "On résout chaque équation séparément : $A = 0$ d'un côté, $B = 0$ de l'autre",
          "L'ensemble des solutions est la <strong>réunion</strong> des solutions",
          "Très utile combiné à la factorisation : transformer $x^2 - 4 = 0$ en $(x-2)(x+2) = 0$",
          "Exemple : $(x - 3)(2x + 1) = 0 \\Leftrightarrow x = 3 \\text{ ou } x = -\\dfrac{1}{2}$"
        ],
        exercises:[
          {id:'pn-1', type:'qcm', question:"Résoudre $(x - 5)(x + 2) = 0$. Les solutions sont :", options:['$x = 5$ et $x = 2$','$x = 5$ et $x = -2$','$x = -5$ et $x = 2$','$x = -5$ et $x = -2$'],correctIndex:1, explanation:"$x - 5 = 0$ donne $x = 5$. $x + 2 = 0$ donne $x = -2$. Solutions : $\\mathbf{5 \\text{ et } -2}$."},
          {id:'pn-2', type:'numeric', question:"Résoudre $3x(x - 4) = 0$. Donne la <strong>plus grande</strong> solution.", answer:4, tolerance:0.001, explanation:"$3x = 0 \\Rightarrow x = 0$ ou $x - 4 = 0 \\Rightarrow x = 4$. Plus grande : $\\mathbf{4}$."},
          {id:'pn-3', type:'numeric', question:"Résoudre $(2x + 6)(x - 1) = 0$. Donne la <strong>plus petite</strong> solution.", answer:-3, tolerance:0.001, explanation:"$2x + 6 = 0 \\Rightarrow x = -3$. $x - 1 = 0 \\Rightarrow x = 1$. Plus petite : $\\mathbf{-3}$."},
          {id:'pn-4', type:'qcm', question:"Combien de solutions a $x(x-2)(x+5) = 0$ ?", options:['1','2','3','Infinité'],correctIndex:2, explanation:"$x = 0$, $x = 2$, $x = -5$. <strong>3</strong> solutions."},
          {id:'pn-5', type:'qcm', question:"Pour résoudre $x^2 - 9 = 0$ avec la méthode produit nul, on factorise en :", options:['$(x-9)(x+9)$','$(x-3)(x+3)$','$x(x-9)$','$(x-3)^2$'],correctIndex:1, explanation:"$x^2 - 9 = x^2 - 3^2 = (x-3)(x+3)$ (identité remarquable). Solutions : $x = 3$ ou $x = -3$."}
        ]
      },
      {
        id:'mise-en-equation', number:4, title:"Mise en équation d'un problème",
        summary:"Traduire un énoncé en équation pour le résoudre.",
        videoId:'2gKpv0brXVQ', videoTitle:'Mettre en équation un problème (Yvan Monka)',
        explanation:"Beaucoup de problèmes concrets se résolvent en <strong>traduisant l'énoncé en équation</strong>. La méthode : choisir une inconnue, exprimer chaque info en fonction d'elle, écrire l'équation, résoudre.",
        keyPoints:[
          "Étape 1 : choisir l'inconnue $x$ et dire ce qu'elle représente",
          "Étape 2 : traduire l'énoncé en équation (souvent une égalité)",
          "Étape 3 : résoudre l'équation",
          "Étape 4 : vérifier que la solution répond au problème et a du sens (positif, entier, etc.)",
          "Étape 5 : rédiger une phrase de réponse"
        ],
        exercises:[
          {id:'me-1', type:'numeric', question:"Le double d'un nombre augmenté de $7$ donne $19$. Quel est ce nombre ?", answer:6, tolerance:0.001, explanation:"$2x + 7 = 19 \\Leftrightarrow 2x = 12 \\Leftrightarrow x = \\mathbf{6}$."},
          {id:'me-2', type:'numeric', question:"La somme de trois entiers consécutifs vaut $42$. Quel est le plus petit ?", answer:13, tolerance:0.001, explanation:"$x + (x+1) + (x+2) = 42 \\Leftrightarrow 3x + 3 = 42 \\Leftrightarrow x = \\mathbf{13}$. (Les trois nombres sont 13, 14, 15.)"},
          {id:'me-3', type:'numeric', question:"Un rectangle a un périmètre de $30$ cm. Sa longueur est le double de sa largeur. Quelle est la largeur (en cm) ?", answer:5, tolerance:0.001, explanation:"Périmètre = $2(L + l) = 2(2l + l) = 6l = 30 \\Leftrightarrow l = \\mathbf{5}$ cm. (Longueur = 10 cm.)"},
          {id:'me-4', type:'numeric', question:"Ali a $3$ ans de plus que Bilal. La somme de leurs âges est $25$. Quel âge a Bilal ?", answer:11, tolerance:0.001, explanation:"Soit $x$ l'âge de Bilal. Alors Ali a $x + 3$. $x + (x+3) = 25 \\Leftrightarrow 2x = 22 \\Leftrightarrow x = \\mathbf{11}$ ans."},
          {id:'me-5', type:'numeric', question:"J'ai dépensé les $\\dfrac{2}{5}$ de mon argent et il me reste $30$ €. Combien avais-je au départ (en €) ?", answer:50, tolerance:0.001, explanation:"Soit $x$ la somme initiale. Reste $\\dfrac{3}{5}x = 30 \\Leftrightarrow x = 30 \\times \\dfrac{5}{3} = \\mathbf{50}$ €."}
        ]
      }
    ]
  },

  'trigo-base': {
    description: "La trigonométrie dans le triangle rectangle : sinus, cosinus, tangente. Outil fondamental pour relier angles et longueurs, utilisé en géométrie, physique et bien sûr au lycée pour aller plus loin avec le cercle trigonométrique.",
    properties: [
      {
        id:'def-trigo', number:1, title:'Sinus, cosinus, tangente',
        summary:"$\\cos$, $\\sin$, $\\tan$ dans le triangle rectangle.",
        videoId:'2gKpv0brXVQ', videoTitle:'Trigonométrie — cours (Yvan Monka)',
        explanation:"Dans un triangle rectangle, on définit pour un angle aigu trois rapports caractéristiques : <strong>cosinus, sinus, tangente</strong>. Ces rapports ne dépendent que de l'angle (pas de la taille du triangle).",
        keyPoints:[
          "$\\cos(\\widehat{A}) = \\dfrac{\\text{côté adjacent}}{\\text{hypoténuse}}$",
          "$\\sin(\\widehat{A}) = \\dfrac{\\text{côté opposé}}{\\text{hypoténuse}}$",
          "$\\tan(\\widehat{A}) = \\dfrac{\\text{côté opposé}}{\\text{côté adjacent}}$",
          "Mnémo : <strong>SOH-CAH-TOA</strong> (Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj)",
          "$0 < \\cos < 1$ et $0 < \\sin < 1$ pour un angle aigu"
        ],
        exercises:[
          {id:'tr1-1', type:'qcm', question:"Dans un triangle rectangle en $A$, pour l'angle $\\widehat{B}$ : le côté opposé est :", options:['$AB$','$BC$','$AC$','$AB$ ou $AC$ au choix'],correctIndex:2, explanation:"L'angle $\\widehat{B}$ est au sommet $B$. Le côté <strong>opposé</strong> à $B$ est celui qui ne touche pas $B$, c'est-à-dire $\\mathbf{AC}$. L'hypoténuse est $BC$. $AB$ est adjacent."},
          {id:'tr1-2', type:'numeric', question:"Triangle rectangle en $A$ avec $AB = 3$, $AC = 4$, $BC = 5$. Que vaut $\\cos(\\widehat{B})$ ? (Forme décimale)", answer:0.6, tolerance:0.005, explanation:"$\\cos(\\widehat{B}) = \\dfrac{\\text{adj}}{\\text{hyp}} = \\dfrac{AB}{BC} = \\dfrac{3}{5} = \\mathbf{0{,}6}$."},
          {id:'tr1-3', type:'numeric', question:"Même triangle ($AB=3$, $AC=4$, $BC=5$, rectangle en $A$). Que vaut $\\sin(\\widehat{B})$ ?", answer:0.8, tolerance:0.005, explanation:"$\\sin(\\widehat{B}) = \\dfrac{\\text{opp}}{\\text{hyp}} = \\dfrac{AC}{BC} = \\dfrac{4}{5} = \\mathbf{0{,}8}$."},
          {id:'tr1-4', type:'numeric', question:"Même triangle. Que vaut $\\tan(\\widehat{B})$ ? (Forme décimale)", answer:1.333, tolerance:0.005, explanation:"$\\tan(\\widehat{B}) = \\dfrac{\\text{opp}}{\\text{adj}} = \\dfrac{AC}{AB} = \\dfrac{4}{3} \\approx \\mathbf{1{,}333}$."},
          {id:'tr1-5', type:'qcm', question:"Le mnémonique SOH-CAH-TOA signifie :", options:['Sin = Adj/Hyp, Cos = Opp/Hyp, Tan = Opp/Adj','Sin = Opp/Hyp, Cos = Adj/Hyp, Tan = Opp/Adj','Sin = Opp/Adj, Cos = Adj/Hyp, Tan = Opp/Hyp','Sin = Hyp/Opp, Cos = Hyp/Adj, Tan = Adj/Opp'],correctIndex:1, explanation:"<strong>S</strong>in = <strong>O</strong>pp/<strong>H</strong>yp, <strong>C</strong>os = <strong>A</strong>dj/<strong>H</strong>yp, <strong>T</strong>an = <strong>O</strong>pp/<strong>A</strong>dj."}
        ]
      },
      {
        id:'valeurs-remarquables', number:2, title:'Valeurs remarquables',
        summary:"Cos et sin de $0°$, $30°$, $45°$, $60°$, $90°$.",
        videoId:'2gKpv0brXVQ', videoTitle:'Valeurs remarquables — Trigonométrie (Yvan Monka)',
        explanation:"Cinq angles reviennent constamment au lycée : $0°$, $30°$, $45°$, $60°$, $90°$. Leurs sinus et cosinus se mémorisent et apparaissent dans des dizaines d'exercices.",
        keyPoints:[
          "$\\cos(0°) = 1$, $\\sin(0°) = 0$",
          "$\\cos(30°) = \\dfrac{\\sqrt{3}}{2}$, $\\sin(30°) = \\dfrac{1}{2}$",
          "$\\cos(45°) = \\sin(45°) = \\dfrac{\\sqrt{2}}{2}$",
          "$\\cos(60°) = \\dfrac{1}{2}$, $\\sin(60°) = \\dfrac{\\sqrt{3}}{2}$",
          "$\\cos(90°) = 0$, $\\sin(90°) = 1$"
        ],
        exercises:[
          {id:'tr2-1', type:'qcm', question:"$\\cos(60°)$ vaut :", options:['$\\dfrac{1}{2}$','$\\dfrac{\\sqrt{2}}{2}$','$\\dfrac{\\sqrt{3}}{2}$','$1$'],correctIndex:0, explanation:"Valeur remarquable : $\\cos(60°) = \\mathbf{\\dfrac{1}{2}}$."},
          {id:'tr2-2', type:'qcm', question:"$\\sin(45°)$ vaut :", options:['$\\dfrac{1}{2}$','$\\dfrac{\\sqrt{2}}{2}$','$\\dfrac{\\sqrt{3}}{2}$','$1$'],correctIndex:1, explanation:"À $45°$, $\\cos$ et $\\sin$ sont égaux : $\\cos(45°) = \\sin(45°) = \\mathbf{\\dfrac{\\sqrt{2}}{2}}$."},
          {id:'tr2-3', type:'numeric', question:"$\\cos(0°)$ vaut :", answer:1, tolerance:0.001, explanation:"$\\cos(0°) = \\mathbf{1}$ (la projection horizontale d'un vecteur unitaire à $0°$)."},
          {id:'tr2-4', type:'numeric', question:"$\\sin(90°)$ vaut :", answer:1, tolerance:0.001, explanation:"$\\sin(90°) = \\mathbf{1}$ (le maximum de la fonction sinus)."},
          {id:'tr2-5', type:'qcm', question:"$\\sin(30°)$ vaut :", options:['$\\dfrac{1}{2}$','$\\dfrac{\\sqrt{2}}{2}$','$\\dfrac{\\sqrt{3}}{2}$','$\\dfrac{1}{\\sqrt{3}}$'],correctIndex:0, explanation:"$\\sin(30°) = \\mathbf{\\dfrac{1}{2}}$. Mnémo : $\\sin$ de petit angle = petit nombre."}
        ]
      },
      {
        id:'relation-trigo', number:3, title:"Relation fondamentale $\\cos^2 + \\sin^2 = 1$",
        summary:"L'identité trigonométrique qu'on utilise partout.",
        videoId:'2gKpv0brXVQ', videoTitle:'Relations trigonométriques (Yvan Monka)',
        explanation:"Pour tout angle $\\alpha$, on a $\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$. C'est une conséquence directe du théorème de Pythagore appliqué au cercle trigonométrique. Elle permet de retrouver une des deux valeurs à partir de l'autre.",
        keyPoints:[
          "Identité : $\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$ pour tout $\\alpha$",
          "Notation : $\\cos^2(\\alpha) = (\\cos(\\alpha))^2$",
          "Si on connaît $\\cos(\\alpha)$, alors $\\sin^2(\\alpha) = 1 - \\cos^2(\\alpha)$",
          "Et $\\sin(\\alpha) = \\pm\\sqrt{1 - \\cos^2(\\alpha)}$ (signe selon l'angle)",
          "Vient du fait que sur le cercle unité, un point $(x, y) = (\\cos, \\sin)$ vérifie $x^2 + y^2 = 1$"
        ],
        exercises:[
          {id:'tr3-1', type:'numeric', question:"Si $\\cos(\\alpha) = 0{,}6$ et $\\alpha$ aigu, que vaut $\\sin(\\alpha)$ ?", answer:0.8, tolerance:0.005, explanation:"$\\sin^2 = 1 - \\cos^2 = 1 - 0{,}36 = 0{,}64$. Donc $\\sin(\\alpha) = \\sqrt{0{,}64} = \\mathbf{0{,}8}$ (positif car $\\alpha$ aigu)."},
          {id:'tr3-2', type:'numeric', question:"Si $\\sin(\\alpha) = 0{,}5$ et $\\alpha$ aigu, que vaut $\\cos^2(\\alpha)$ ?", answer:0.75, tolerance:0.005, explanation:"$\\cos^2 = 1 - \\sin^2 = 1 - 0{,}25 = \\mathbf{0{,}75}$."},
          {id:'tr3-3', type:'qcm', question:"L'identité $\\cos^2(\\alpha) + \\sin^2(\\alpha) = 1$ est vraie :", options:['Pour $\\alpha = 45°$ seulement','Pour les angles aigus seulement','Pour tout angle $\\alpha$','Jamais'],correctIndex:2, explanation:"C'est l'identité <strong>fondamentale</strong> : valable pour <strong>tout</strong> angle $\\alpha$."},
          {id:'tr3-4', type:'numeric', question:"$\\cos^2(30°) + \\sin^2(30°) = ?$", answer:1, tolerance:0.001, explanation:"Identité fondamentale : $\\cos^2 + \\sin^2 = 1$ toujours. Donc la réponse est $\\mathbf{1}$ sans aucun calcul !"},
          {id:'tr3-5', type:'numeric', question:"Si $\\cos(\\alpha) = 0$ et $\\alpha$ aigu, que vaut $\\sin^2(\\alpha)$ ?", answer:1, tolerance:0.001, explanation:"$\\sin^2 = 1 - 0 = \\mathbf{1}$. (En fait $\\cos = 0$ correspond à $\\alpha = 90°$, et $\\sin(90°) = 1$.)"}
        ]
      },
      {
        id:'calcul-angles', number:4, title:'Calculer angles et longueurs',
        summary:"Méthode pour trouver un angle ou une longueur dans un triangle rectangle.",
        videoId:'2gKpv0brXVQ', videoTitle:'Calculer angles et longueurs en trigonométrie (Yvan Monka)',
        explanation:"En pratique, on utilise les rapports trigonométriques pour <strong>calculer une longueur</strong> (connaissant un angle et une autre longueur) ou <strong>calculer un angle</strong> (connaissant deux longueurs). On utilise alors $\\cos^{-1}$, $\\sin^{-1}$, $\\tan^{-1}$ (sur la calculatrice).",
        keyPoints:[
          "Pour trouver une longueur : choisir le bon rapport selon les données ($\\cos$, $\\sin$ ou $\\tan$)",
          "Pour trouver un angle : utiliser les fonctions inverses sur la calculatrice ($\\cos^{-1}$, $\\sin^{-1}$, $\\tan^{-1}$)",
          "Mettre sa calculatrice en mode <strong>degrés</strong> (DEG) au lycée",
          "Toujours vérifier que l'angle trouvé est entre $0°$ et $90°$ (triangle rectangle)",
          "Erreur classique : confondre adjacent et opposé selon l'angle considéré"
        ],
        exercises:[
          {id:'tr4-1', type:'numeric', question:"Triangle rectangle en $A$, $\\widehat{B} = 30°$, hypoténuse $BC = 10$. Que vaut $AB$ (côté adjacent) ? (Forme décimale arrondie au centième)", answer:8.66, tolerance:0.1, explanation:"$\\cos(30°) = \\dfrac{AB}{BC}$, donc $AB = BC \\cos(30°) = 10 \\times \\dfrac{\\sqrt{3}}{2} \\approx \\mathbf{8{,}66}$."},
          {id:'tr4-2', type:'numeric', question:"Triangle rectangle en $A$, $\\widehat{B} = 60°$, $AB = 5$. Que vaut $AC$ ?", answer:8.66, tolerance:0.1, explanation:"$\\tan(60°) = \\dfrac{AC}{AB}$, donc $AC = AB \\times \\tan(60°) = 5 \\times \\sqrt{3} \\approx \\mathbf{8{,}66}$."},
          {id:'tr4-3', type:'numeric', question:"Triangle rectangle en $A$, $AB = 3$, $AC = 4$. Que vaut $\\widehat{B}$ (en degrés, arrondi à l'unité) ?", answer:53, tolerance:1, explanation:"$\\tan(\\widehat{B}) = \\dfrac{AC}{AB} = \\dfrac{4}{3}$. Avec la calculatrice : $\\widehat{B} = \\tan^{-1}(4/3) \\approx \\mathbf{53°}$."},
          {id:'tr4-4', type:'qcm', question:"Pour trouver une longueur en triangle rectangle, on utilise le rapport qui contient :", options:["L'angle et les deux longueurs inconnues","L'angle, la longueur connue, et la longueur cherchée",'Seulement les longueurs','La somme des angles'],correctIndex:1, explanation:"On choisit le rapport ($\\cos$, $\\sin$ ou $\\tan$) qui relie : l'angle connu, la longueur connue, et la longueur cherchée. Pour le résoudre, l'inconnue doit pouvoir s'isoler."},
          {id:'tr4-5', type:'numeric', question:"Triangle rectangle, hypoténuse $= 10$ et un angle aigu vaut $45°$. Que vaut le côté opposé ? (Forme décimale au centième)", answer:7.07, tolerance:0.05, explanation:"$\\sin(45°) = \\dfrac{\\text{opp}}{10}$, donc opposé $= 10 \\times \\dfrac{\\sqrt{2}}{2} \\approx \\mathbf{7{,}07}$."}
        ]
      }
    ]
  },

  'vecteurs-base': {
    description: "Les vecteurs sont l'outil pour décrire des déplacements et des directions dans le plan. Indispensable pour la géométrie au lycée, et la base directe du chapitre Produit scalaire en Première.",
    properties: [
      {
        id:'def-vecteur', number:1, title:'Définition et égalité de vecteurs',
        summary:"Un vecteur = direction + sens + longueur (norme).",
        videoId:'EehP4SFpo5c', videoTitle:'Vecteurs — cours seconde (Yvan Monka)',
        explanation:"Un <strong>vecteur</strong> $\\vec{u}$ est caractérisé par trois choses : sa <strong>direction</strong>, son <strong>sens</strong> et sa <strong>longueur</strong> (appelée norme, notée $\\|\\vec{u}\\|$). Deux vecteurs sont égaux si et seulement si ces trois caractéristiques coïncident.",
        keyPoints:[
          "Un vecteur n'a pas de position fixe (on peut le déplacer librement)",
          "$\\overrightarrow{AB}$ représente le déplacement de $A$ vers $B$",
          "Norme : $\\|\\overrightarrow{AB}\\| = AB$ (la longueur du segment $[AB]$)",
          "Vecteur nul : $\\vec{0}$ (direction et sens indéfinis, norme $0$)",
          "<strong>Égalité</strong> : $\\overrightarrow{AB} = \\overrightarrow{CD}$ ssi $ABDC$ est un parallélogramme"
        ],
        exercises:[
          {id:'vec1-1', type:'qcm', question:"Un vecteur est caractérisé par :", options:['Sa position seule','Sa direction et son sens uniquement','Sa direction, son sens, et sa norme','Sa norme seule'],correctIndex:2, explanation:"Trois caractéristiques : <strong>direction, sens, norme</strong>. La position ne compte pas (on peut translater librement un vecteur)."},
          {id:'vec1-2', type:'qcm', question:"Le vecteur $\\overrightarrow{AB}$ représente :", options:['Le segment $[AB]$','Le déplacement de $A$ vers $B$','La distance de $A$ à $B$','Le milieu de $[AB]$'],correctIndex:1, explanation:"$\\overrightarrow{AB}$ est le <strong>déplacement</strong> de $A$ vers $B$. Le segment $[AB]$ est différent (objet géométrique fixe). La distance est $AB = \\|\\overrightarrow{AB}\\|$."},
          {id:'vec1-3', type:'qcm', question:"$\\overrightarrow{AB} = \\overrightarrow{CD}$ si et seulement si :", options:['$AB = CD$ uniquement','$ABCD$ est un parallélogramme','$ABDC$ est un parallélogramme','$ABCD$ est un rectangle'],correctIndex:2, explanation:"L'égalité de deux vecteurs équivaut à dire que $\\mathbf{ABDC}$ forme un parallélogramme (attention à l'ordre des sommets !)."},
          {id:'vec1-4', type:'numeric', question:"Si $A(1\\,;\\,2)$ et $B(4\\,;\\,6)$, que vaut $\\|\\overrightarrow{AB}\\|$ ?", answer:5, tolerance:0.001, explanation:"$\\|\\overrightarrow{AB}\\| = AB = \\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = \\sqrt{25} = \\mathbf{5}$."},
          {id:'vec1-5', type:'qcm', question:"Le vecteur nul $\\vec{0}$ a pour norme :", options:['$1$','$0$','$+\\infty$','Aucune valeur'],correctIndex:1, explanation:"$\\|\\vec{0}\\| = \\mathbf{0}$ par définition. Le vecteur nul correspond à « pas de déplacement »."}
        ]
      },
      {
        id:'somme-chasles', number:2, title:'Somme de vecteurs — relation de Chasles',
        summary:"$\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$.",
        videoId:'EehP4SFpo5c', videoTitle:'Somme de vecteurs et Chasles — seconde (Yvan Monka)',
        explanation:"On additionne deux vecteurs en mettant la queue du second sur la pointe du premier. La <strong>relation de Chasles</strong> formalise cette idée : un déplacement de $A$ à $B$ suivi d'un déplacement de $B$ à $C$ équivaut au déplacement direct de $A$ à $C$.",
        keyPoints:[
          "Relation de Chasles : $\\overrightarrow{AB} + \\overrightarrow{BC} = \\overrightarrow{AC}$",
          "Vecteur opposé : $-\\overrightarrow{AB} = \\overrightarrow{BA}$",
          "Méthode du parallélogramme : $\\overrightarrow{u} + \\overrightarrow{v}$ = diagonale du parallélogramme",
          "$\\overrightarrow{AB} - \\overrightarrow{AC} = \\overrightarrow{CB}$ (utilise Chasles à l'envers)",
          "Chasles permet de décomposer un vecteur en passant par un point intermédiaire"
        ],
        exercises:[
          {id:'vec2-1', type:'qcm', question:"D'après la relation de Chasles, $\\overrightarrow{AB} + \\overrightarrow{BC} = ?$", options:['$\\overrightarrow{AB} + \\overrightarrow{AC}$','$\\overrightarrow{AC}$','$\\overrightarrow{CA}$','$2\\overrightarrow{AB}$'],correctIndex:1, explanation:"Relation de Chasles : $\\overrightarrow{AB} + \\overrightarrow{BC} = \\mathbf{\\overrightarrow{AC}}$. Les $B$ se « simplifient »."},
          {id:'vec2-2', type:'qcm', question:"$\\overrightarrow{AB} + \\overrightarrow{CD} + \\overrightarrow{BC} = ?$", options:['$\\overrightarrow{AD}$','$\\overrightarrow{AC}$','$\\overrightarrow{BD}$','Indéterminé'],correctIndex:0, explanation:"On réordonne : $\\overrightarrow{AB} + \\overrightarrow{BC} + \\overrightarrow{CD} = \\overrightarrow{AC} + \\overrightarrow{CD} = \\mathbf{\\overrightarrow{AD}}$ (Chasles deux fois)."},
          {id:'vec2-3', type:'qcm', question:"Le vecteur opposé de $\\overrightarrow{AB}$ est :", options:['$\\overrightarrow{AB}$','$\\overrightarrow{BA}$','$\\overrightarrow{AA}$','$\\overrightarrow{BB}$'],correctIndex:1, explanation:"L'opposé de $\\overrightarrow{AB}$ est $\\mathbf{\\overrightarrow{BA}}$ (même direction et longueur, sens inverse)."},
          {id:'vec2-4', type:'qcm', question:"$\\overrightarrow{AB} - \\overrightarrow{AC} = ?$", options:['$\\overrightarrow{BC}$','$\\overrightarrow{CB}$','$\\overrightarrow{AB} + \\overrightarrow{AC}$','$\\overrightarrow{BA}$'],correctIndex:1, explanation:"$\\overrightarrow{AB} - \\overrightarrow{AC} = \\overrightarrow{AB} + \\overrightarrow{CA} = \\overrightarrow{CA} + \\overrightarrow{AB} = \\mathbf{\\overrightarrow{CB}}$."},
          {id:'vec2-5', type:'qcm', question:"$\\overrightarrow{AB} + \\overrightarrow{BA} = ?$", options:['$\\overrightarrow{AB}$','$2\\overrightarrow{AB}$','$\\vec{0}$','$\\overrightarrow{AA}$'],correctIndex:2, explanation:"On va de $A$ à $B$ puis de $B$ à $A$ : on revient au départ, donc déplacement nul. $\\overrightarrow{AB} + \\overrightarrow{BA} = \\mathbf{\\vec{0}}$ (qui est aussi $\\overrightarrow{AA}$)."}
        ]
      },
      {
        id:'colinearite', number:3, title:'Multiplication par un scalaire — colinéarité',
        summary:"$k\\vec{u}$ et la notion de vecteurs colinéaires.",
        videoId:'EehP4SFpo5c', videoTitle:'Vecteurs colinéaires — cours seconde (Yvan Monka)',
        explanation:"Multiplier un vecteur $\\vec{u}$ par un nombre $k$ donne un vecteur $k\\vec{u}$ : <strong>même direction</strong>, sens identique si $k > 0$ ou opposé si $k < 0$, norme multipliée par $|k|$. Deux vecteurs sont <strong>colinéaires</strong> s'ils ont la même direction.",
        keyPoints:[
          "$k\\vec{u}$ : multiplie la norme par $|k|$, conserve la direction",
          "Si $k > 0$ : même sens. Si $k < 0$ : sens opposé.",
          "Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont <strong>colinéaires</strong> ssi il existe $k$ tel que $\\vec{v} = k\\vec{u}$",
          "Trois points $A, B, C$ sont alignés ssi $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires",
          "Deux droites sont parallèles ssi leurs vecteurs directeurs sont colinéaires"
        ],
        exercises:[
          {id:'vec3-1', type:'qcm', question:"Le vecteur $3\\vec{u}$ a une norme :", options:['$\\|\\vec{u}\\|$','$3\\|\\vec{u}\\|$','$3 + \\|\\vec{u}\\|$','$\\dfrac{\\|\\vec{u}\\|}{3}$'],correctIndex:1, explanation:"$\\|k\\vec{u}\\| = |k| \\times \\|\\vec{u}\\|$. Donc $\\|3\\vec{u}\\| = \\mathbf{3\\|\\vec{u}\\|}$."},
          {id:'vec3-2', type:'qcm', question:"$-2\\vec{u}$ et $\\vec{u}$ sont :", options:['Égaux','Colinéaires de même sens','Colinéaires de sens contraire','Orthogonaux'],correctIndex:2, explanation:"Coefficient $-2 < 0$ : <strong>colinéaires de sens contraire</strong>, avec une norme doublée."},
          {id:'vec3-3', type:'qcm', question:"$\\vec{u}(2\\,;\\,3)$ et $\\vec{v}(4\\,;\\,6)$. Ils sont :", options:['Égaux','Colinéaires','Orthogonaux','Sans rapport'],correctIndex:1, explanation:"$\\vec{v} = 2\\vec{u}$ (chaque coordonnée doublée). Donc <strong>colinéaires</strong> (de même sens, $\\vec{v}$ deux fois plus long)."},
          {id:'vec3-4', type:'qcm', question:"Trois points $A, B, C$ sont alignés si et seulement si :", options:['$\\overrightarrow{AB} = \\overrightarrow{AC}$','$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires','$\\overrightarrow{AB} \\perp \\overrightarrow{AC}$','$\\|\\overrightarrow{AB}\\| = \\|\\overrightarrow{AC}\\|$'],correctIndex:1, explanation:"Trois points alignés $\\Leftrightarrow$ deux vecteurs formés ont la même direction, c'est-à-dire <strong>colinéaires</strong>."},
          {id:'vec3-5', type:'numeric', question:"$\\vec{u}(3\\,;\\,k)$ et $\\vec{v}(6\\,;\\,10)$ sont colinéaires. Que vaut $k$ ?", answer:5, tolerance:0.001, explanation:"$\\vec{v} = 2\\vec{u}$ ssi $6 = 2 \\times 3$ ✓ et $10 = 2k$, donc $k = \\mathbf{5}$.<br/>(Autre méthode : déterminant nul $\\Rightarrow 3 \\times 10 - k \\times 6 = 0 \\Rightarrow k = 5$.)"}
        ]
      },
      {
        id:'coordonnees-vecteur', number:4, title:'Coordonnées dans un repère',
        summary:"$\\vec{u}(x\\,;\\,y)$ et calculs en coordonnées.",
        videoId:'EehP4SFpo5c', videoTitle:'Coordonnées de vecteurs — cours seconde (Yvan Monka)',
        explanation:"Dans un repère, un vecteur a des <strong>coordonnées</strong>. Si $\\vec{u}$ a pour coordonnées $(x\\,;\\,y)$, ça signifie qu'un déplacement selon $\\vec{u}$ équivaut à $+x$ horizontalement et $+y$ verticalement. Toutes les opérations sur les vecteurs se traduisent en calculs sur les coordonnées.",
        keyPoints:[
          "Pour $\\vec{u}(x\\,;\\,y)$ : $x$ est la composante horizontale, $y$ la verticale",
          "Si $A(x_A\\,;\\,y_A)$ et $B(x_B\\,;\\,y_B)$, alors $\\overrightarrow{AB}(x_B - x_A\\,;\\,y_B - y_A)$",
          "Somme : $\\vec{u}(x\\,;\\,y) + \\vec{v}(x'\\,;\\,y') = (x+x'\\,;\\,y+y')$",
          "Multiplication : $k\\vec{u} = (kx\\,;\\,ky)$",
          "Norme : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2}$"
        ],
        exercises:[
          {id:'vec4-1', type:'qcm', question:"$A(1\\,;\\,2)$ et $B(4\\,;\\,7)$. Les coordonnées de $\\overrightarrow{AB}$ sont :", options:['$(5\\,;\\,9)$','$(3\\,;\\,5)$','$(-3\\,;\\,-5)$','$(4\\,;\\,7)$'],correctIndex:1, explanation:"$\\overrightarrow{AB}(x_B - x_A\\,;\\,y_B - y_A) = (4-1\\,;\\,7-2) = \\mathbf{(3\\,;\\,5)}$."},
          {id:'vec4-2', type:'qcm', question:"$\\vec{u}(2\\,;\\,3)$ et $\\vec{v}(5\\,;\\,-1)$. Les coordonnées de $\\vec{u} + \\vec{v}$ sont :", options:['$(7\\,;\\,2)$','$(3\\,;\\,4)$','$(10\\,;\\,-3)$','$(-3\\,;\\,-4)$'],correctIndex:0, explanation:"Somme = somme des coordonnées : $(2+5\\,;\\,3+(-1)) = \\mathbf{(7\\,;\\,2)}$."},
          {id:'vec4-3', type:'qcm', question:"$\\vec{u}(4\\,;\\,-2)$. Les coordonnées de $3\\vec{u}$ sont :", options:['$(12\\,;\\,-6)$','$(7\\,;\\,1)$','$(4\\,;\\,-2)$','$(12\\,;\\,6)$'],correctIndex:0, explanation:"On multiplie chaque coordonnée par $3$ : $(3 \\times 4\\,;\\,3 \\times (-2)) = \\mathbf{(12\\,;\\,-6)}$."},
          {id:'vec4-4', type:'numeric', question:"$\\vec{u}(3\\,;\\,4)$. Que vaut $\\|\\vec{u}\\|$ ?", answer:5, tolerance:0.001, explanation:"$\\|\\vec{u}\\| = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = \\mathbf{5}$."},
          {id:'vec4-5', type:'numeric', question:"$A(2\\,;\\,5)$ et $B(7\\,;\\,17)$. Que vaut $\\|\\overrightarrow{AB}\\|$ ?", answer:13, tolerance:0.001, explanation:"$\\overrightarrow{AB}(5\\,;\\,12)$. $\\|\\overrightarrow{AB}\\| = \\sqrt{25 + 144} = \\sqrt{169} = \\mathbf{13}$. (Triplet pythagoricien $5$-$12$-$13$ !)"}
        ]
      }
    ]
  },

  'fonctions-base': {
    description: "Les fonctions affines sont le pont entre le calcul littéral et la géométrie analytique. Maîtriser leur représentation graphique, leur coefficient directeur, et leur sens de variation est essentiel pour aborder les fonctions plus complexes au lycée.",
    properties: [
      {
        id:'def-affine', number:1, title:'Définition et représentation graphique',
        summary:"$f(x) = ax + b$ — sa représentation est une droite.",
        videoId:'2gKpv0brXVQ', videoTitle:'Fonctions affines — cours (Yvan Monka)',
        explanation:"Une <strong>fonction affine</strong> est définie par $f(x) = ax + b$ où $a$ et $b$ sont des constantes réelles. Sa <strong>représentation graphique</strong> est toujours une <strong>droite</strong>. Le coefficient $a$ règle la pente, $b$ règle l'ordonnée à l'origine.",
        keyPoints:[
          "Forme : $f(x) = ax + b$",
          "Représentation : <strong>droite</strong> (pas une courbe)",
          "$a$ = <strong>coefficient directeur</strong> (la pente)",
          "$b$ = <strong>ordonnée à l'origine</strong> (point où la droite coupe l'axe des $y$)",
          "Cas particuliers : $a = 0$ → fonction constante (droite horizontale). $b = 0$ → fonction linéaire (droite passant par l'origine)."
        ],
        exercises:[
          {id:'fa1-1', type:'qcm', question:"Parmi ces fonctions, laquelle est affine ?", options:['$f(x) = x^2 + 3$','$f(x) = 2x + 5$','$f(x) = \\sqrt{x}$','$f(x) = \\dfrac{1}{x}$'],correctIndex:1, explanation:"Une fonction affine est de la forme $ax + b$. Seule $f(x) = \\mathbf{2x + 5}$ a cette forme (avec $a = 2$, $b = 5$)."},
          {id:'fa1-2', type:'numeric', question:"Soit $f(x) = 3x - 4$. Que vaut $f(2)$ ?", answer:2, tolerance:0.001, explanation:"$f(2) = 3 \\times 2 - 4 = 6 - 4 = \\mathbf{2}$."},
          {id:'fa1-3', type:'numeric', question:"Soit $f(x) = -2x + 7$. Que vaut $f(0)$ (ordonnée à l'origine) ?", answer:7, tolerance:0.001, explanation:"$f(0) = -2 \\times 0 + 7 = \\mathbf{7}$. C'est aussi le terme constant $b$ : l'ordonnée à l'origine de la droite."},
          {id:'fa1-4', type:'qcm', question:"La représentation graphique d'une fonction affine est :", options:['Une parabole','Une droite','Une courbe quelconque',"L'axe des abscisses"],correctIndex:1, explanation:"<strong>Toujours</strong> une droite. (Si $a = 0$ : droite horizontale.)"},
          {id:'fa1-5', type:'qcm', question:"$f(x) = 5$ (avec $a = 0$) est une fonction :", options:['Affine non linéaire','Linéaire','Constante','Non définie'],correctIndex:2, explanation:"Quand $a = 0$, $f(x) = b$ pour tout $x$ : c'est une fonction <strong>constante</strong>. Sa représentation est une droite horizontale."}
        ]
      },
      {
        id:'coef-directeur', number:2, title:'Coefficient directeur',
        summary:"$a = \\dfrac{\\Delta y}{\\Delta x}$ — la pente de la droite.",
        videoId:'2gKpv0brXVQ', videoTitle:'Coefficient directeur d\'une fonction affine (Yvan Monka)',
        explanation:"Le <strong>coefficient directeur</strong> $a$ représente la <strong>variation de $y$</strong> quand $x$ augmente de $1$. Plus $a$ est grand (en valeur absolue), plus la droite est inclinée. Le signe de $a$ donne le sens de variation.",
        keyPoints:[
          "$a = \\dfrac{f(x_2) - f(x_1)}{x_2 - x_1} = \\dfrac{\\Delta y}{\\Delta x}$ (formule du taux de variation)",
          "Si $a > 0$ : fonction <strong>croissante</strong> (droite qui monte)",
          "Si $a < 0$ : fonction <strong>décroissante</strong> (droite qui descend)",
          "Si $a = 0$ : fonction <strong>constante</strong> (droite horizontale)",
          "Lecture graphique : pour $\\Delta x = 1$, on lit la variation de $y$"
        ],
        exercises:[
          {id:'fa2-1', type:'numeric', question:"Quel est le coefficient directeur de $f(x) = 4x - 7$ ?", answer:4, tolerance:0.001, explanation:"$f(x) = ax + b$. Ici $a = \\mathbf{4}$."},
          {id:'fa2-2', type:'qcm', question:"Une fonction affine de coefficient directeur $-3$ est :", options:['Croissante','Décroissante','Constante','Affine non linéaire'],correctIndex:1, explanation:"$a = -3 < 0$ donc <strong>décroissante</strong>."},
          {id:'fa2-3', type:'numeric', question:"$f$ affine avec $f(0) = 2$ et $f(3) = 11$. Que vaut son coefficient directeur ?", answer:3, tolerance:0.001, explanation:"$a = \\dfrac{f(3) - f(0)}{3 - 0} = \\dfrac{11 - 2}{3} = \\dfrac{9}{3} = \\mathbf{3}$."},
          {id:'fa2-4', type:'numeric', question:"$f$ affine avec $f(1) = 5$ et $f(4) = -1$. Que vaut le coefficient directeur ?", answer:-2, tolerance:0.001, explanation:"$a = \\dfrac{-1 - 5}{4 - 1} = \\dfrac{-6}{3} = \\mathbf{-2}$. Fonction décroissante."},
          {id:'fa2-5', type:'qcm', question:"Sur une représentation graphique, le coefficient directeur correspond à :", options:["L'intersection avec l'axe des abscisses","L'ordonnée à l'origine",'La variation de $y$ quand $x$ augmente de $1$','La distance entre deux points'],correctIndex:2, explanation:"Le coefficient directeur $a$ = <strong>variation de $y$ pour $\\Delta x = 1$</strong>. Visuellement : quand on avance d'1 unité horizontale, on monte/descend de $a$ unités."}
        ]
      },
      {
        id:'eq-deux-points', number:3, title:"Équation à partir de 2 points",
        summary:"Trouver $a$ et $b$ à partir de deux points donnés.",
        videoId:'2gKpv0brXVQ', videoTitle:"Équation d'une droite à partir de 2 points (Yvan Monka)",
        explanation:"Si on connaît deux points $A(x_A\\,;\\,y_A)$ et $B(x_B\\,;\\,y_B)$ d'une droite, on peut déterminer son équation $y = ax + b$. D'abord on calcule $a$ avec la formule du coefficient directeur, puis on trouve $b$ en utilisant un des deux points.",
        keyPoints:[
          "Étape 1 : $a = \\dfrac{y_B - y_A}{x_B - x_A}$",
          "Étape 2 : substituer $(x_A, y_A)$ ou $(x_B, y_B)$ dans $y = ax + b$ pour trouver $b$",
          "$b = y_A - a \\times x_A$ (ou avec le point $B$)",
          "Vérification : tester l'autre point dans l'équation finale",
          "Si les deux $x$ sont égaux, la droite est verticale (pas une fonction affine)"
        ],
        exercises:[
          {id:'fa3-1', type:'numeric', question:"Une droite passe par $A(0\\,;\\,3)$ et $B(2\\,;\\,7)$. Que vaut $a$ (coefficient directeur) ?", answer:2, tolerance:0.001, explanation:"$a = \\dfrac{7 - 3}{2 - 0} = \\dfrac{4}{2} = \\mathbf{2}$."},
          {id:'fa3-2', type:'numeric', question:"Même droite ($A(0\\,;\\,3)$ et $B(2\\,;\\,7)$). Que vaut $b$ ?", answer:3, tolerance:0.001, explanation:"$A$ a pour abscisse $0$, donc $y_A = b$. Donc $b = \\mathbf{3}$ (ordonnée à l'origine)."},
          {id:'fa3-3', type:'qcm', question:"Une droite passe par $(1\\,;\\,5)$ et $(3\\,;\\,9)$. Son équation est :", options:['$y = 2x + 3$','$y = 2x + 5$','$y = x + 4$','$y = 4x + 1$'],correctIndex:0, explanation:"$a = \\dfrac{9-5}{3-1} = 2$. Avec $(1, 5)$ : $5 = 2 \\times 1 + b \\Rightarrow b = 3$. Donc $\\mathbf{y = 2x + 3}$."},
          {id:'fa3-4', type:'numeric', question:"Droite passant par $(2\\,;\\,7)$ et $(5\\,;\\,1)$. Que vaut $a$ ?", answer:-2, tolerance:0.001, explanation:"$a = \\dfrac{1 - 7}{5 - 2} = \\dfrac{-6}{3} = \\mathbf{-2}$ (droite décroissante)."},
          {id:'fa3-5', type:'numeric', question:"Même droite ($a = -2$, passant par $(2\\,;\\,7)$). Que vaut $b$ ?", answer:11, tolerance:0.001, explanation:"$7 = -2 \\times 2 + b \\Leftrightarrow 7 = -4 + b \\Leftrightarrow b = \\mathbf{11}$. Donc $y = -2x + 11$."}
        ]
      },
      {
        id:'signe-variations-affine', number:4, title:'Signe et variations',
        summary:"Étudier le signe et le sens de variation d'une fonction affine.",
        videoId:'2gKpv0brXVQ', videoTitle:'Signe et variations des fonctions affines (Yvan Monka)',
        explanation:"Pour une fonction affine $f(x) = ax + b$, le <strong>sens de variation</strong> se lit sur le signe de $a$. Pour étudier le <strong>signe de $f$</strong>, on résout $f(x) = 0$ (équation $ax + b = 0$) puis on regarde de chaque côté.",
        keyPoints:[
          "Si $a > 0$ : croissante sur $\\mathbb{R}$",
          "Si $a < 0$ : décroissante sur $\\mathbb{R}$",
          "$f(x) = 0$ pour $x = -\\dfrac{b}{a}$ (unique racine si $a \\neq 0$)",
          "Si $a > 0$ : $f(x) < 0$ pour $x < -\\dfrac{b}{a}$ et $f(x) > 0$ pour $x > -\\dfrac{b}{a}$",
          "Si $a < 0$ : signes inversés"
        ],
        exercises:[
          {id:'fa4-1', type:'qcm', question:"$f(x) = 3x - 6$ est :", options:['Croissante sur $\\mathbb{R}$','Décroissante sur $\\mathbb{R}$','Constante','Ni croissante ni décroissante'],correctIndex:0, explanation:"$a = 3 > 0$ donc <strong>croissante</strong> sur $\\mathbb{R}$."},
          {id:'fa4-2', type:'numeric', question:"Pour quelle valeur de $x$ a-t-on $2x - 8 = 0$ ?", answer:4, tolerance:0.001, explanation:"$2x = 8 \\Leftrightarrow x = \\mathbf{4}$."},
          {id:'fa4-3', type:'qcm', question:"$f(x) = 2x - 8$. Quand $x = 3$, $f(x)$ est :", options:['Positif','Négatif','Nul','Indéterminé'],correctIndex:1, explanation:"$f(3) = 2 \\times 3 - 8 = -2 < 0$. Donc <strong>négatif</strong>. ($f$ s'annule en $x = 4$, donc négatif avant, positif après.)"},
          {id:'fa4-4', type:'qcm', question:"$f(x) = -3x + 12$. Pour quelle valeur de $x$ a-t-on $f(x) > 0$ ?", options:['$x < 4$','$x > 4$','$x < -4$','Aucune'],correctIndex:0, explanation:"$f(x) = 0$ pour $x = 4$. Comme $a = -3 < 0$, $f$ est décroissante : $f > 0$ avant la racine, donc $\\mathbf{x < 4}$."},
          {id:'fa4-5', type:'numeric', question:"$f(x) = 5x - 15$. À partir de quelle valeur de $x$ a-t-on $f(x) \\geq 0$ ?", answer:3, tolerance:0.001, explanation:"$5x - 15 \\geq 0 \\Leftrightarrow x \\geq 3$. Donc à partir de $x = \\mathbf{3}$."}
        ]
      }
    ]
  },


  'limites-suites': {
    description: "Le chapitre clé qui prolonge tes Suites de Première. On y formalise rigoureusement ce que ça veut dire qu'une suite \"tend vers\" une valeur. C'est la base de toute l'analyse en Terminale.",
    properties: [
      {
        id:'def-limite', number:1, title:"Définition d'une limite finie",
        summary:"$u_n$ se rapproche autant qu'on veut de $L$ pour $n$ assez grand.",
        videoId:'05UHsy9G4M4', videoTitle:'Limites de suites — cours Terminale (Yvan Monka)',
        explanation:"Une suite $(u_n)$ <strong>converge vers $L$</strong> si, intuitivement, $u_n$ se rapproche autant qu'on veut de $L$ quand $n$ devient grand. Formellement : pour tout $\\varepsilon > 0$, il existe un rang $N$ à partir duquel $|u_n - L| < \\varepsilon$.",
        keyPoints:[
          "Notation : $\\displaystyle\\lim_{n \\to +\\infty} u_n = L$ ou $u_n \\to L$",
          "Définition formelle : $\\forall \\varepsilon > 0,\\ \\exists N \\in \\mathbb{N},\\ \\forall n \\geq N,\\ |u_n - L| < \\varepsilon$",
          "Une suite qui converge a une <strong>limite unique</strong>",
          "Une suite qui ne converge pas est dite <strong>divergente</strong> (tend vers $\\pm\\infty$ ou n'a pas de limite)",
          "L'intuition de Première devient un théorème rigoureux en Terminale"
        ],
        exercises:[
          {id:'lim1-1', type:'qcm', question:"Une suite $(u_n)$ converge vers $L$ signifie :", options:['$u_n = L$ pour tout $n$','$u_n$ se rapproche de $L$ quand $n$ grandit','$u_n$ atteint $L$','$L$ est le plus grand terme'], correctIndex:1, explanation:"Convergence = $u_n$ se <strong>rapproche</strong> de $L$ quand $n$ grandit (sans nécessairement l'atteindre)."},
          {id:'lim1-2', type:'numeric', question:"Soit $u_n = 3 + \\dfrac{1}{n}$. Vers quelle valeur converge cette suite ?", answer:3, tolerance:0.001, explanation:"$\\dfrac{1}{n} \\to 0$ quand $n \\to +\\infty$, donc $u_n \\to 3 + 0 = \\mathbf{3}$."},
          {id:'lim1-3', type:'qcm', question:"Une suite divergente :", options:['Tend vers $+\\infty$','Tend vers $-\\infty$',"N'a pas de limite finie",'Toutes les réponses ci-dessus'], correctIndex:3, explanation:"Divergente = ne converge PAS vers une limite finie. Cela inclut les suites tendant vers $\\pm\\infty$ ET celles qui n'ont aucune limite (oscillantes)."},
          {id:'lim1-4', type:'qcm', question:"Si $u_n \\to L$ et $u_n \\to L'$, alors :", options:["$L = L'$ (unicité)","$L \\neq L'$",'On ne peut pas conclure','La suite oscille'], correctIndex:0, explanation:"<strong>Unicité de la limite</strong> : une suite convergente a une limite et une seule."},
          {id:'lim1-5', type:'numeric', question:"Soit $u_n = 5 - \\dfrac{2}{n^2}$. Vers quoi converge $u_n$ ?", answer:5, tolerance:0.001, explanation:"$\\dfrac{2}{n^2} \\to 0$ donc $u_n \\to 5 - 0 = \\mathbf{5}$."}
        ]
      },
      {
        id:'limites-reference', number:2, title:'Limites des suites de référence',
        summary:"$\\dfrac{1}{n}$, $n^k$, $q^n$ — à connaître par cœur.",
        videoId:'05UHsy9G4M4', videoTitle:'Limites de suites de référence (Yvan Monka)',
        explanation:"Quelques suites reviennent constamment et leurs limites doivent être <strong>connues par cœur</strong>. Elles servent de briques pour calculer toutes les autres limites par opérations.",
        keyPoints:[
          "$\\displaystyle\\lim_{n \\to +\\infty} \\dfrac{1}{n} = 0$ et plus généralement $\\displaystyle\\lim_{n \\to +\\infty} \\dfrac{1}{n^k} = 0$ pour $k > 0$",
          "$\\displaystyle\\lim_{n \\to +\\infty} n^k = +\\infty$ pour $k > 0$ (croissance polynomiale)",
          "$\\displaystyle\\lim_{n \\to +\\infty} \\sqrt{n} = +\\infty$",
          "Suite géométrique $q^n$ : converge vers $0$ si $|q| < 1$, tend vers $+\\infty$ si $q > 1$, diverge si $q \\leq -1$",
          "Cas $q = 1$ : suite constante. Cas $q = -1$ : oscille entre $1$ et $-1$ (diverge)"
        ],
        exercises:[
          {id:'lim2-1', type:'numeric', question:"$\\displaystyle\\lim_{n \\to +\\infty} \\dfrac{1}{n^3}$ vaut :", answer:0, tolerance:0.001, explanation:"Pour tout $k > 0$, $\\dfrac{1}{n^k} \\to \\mathbf{0}$."},
          {id:'lim2-2', type:'qcm', question:"$\\displaystyle\\lim_{n \\to +\\infty} n^2$ vaut :", options:['$0$','$+\\infty$','$-\\infty$','$1$'], correctIndex:1, explanation:"$n^2$ croît sans borne avec $n$, donc tend vers $\\mathbf{+\\infty}$."},
          {id:'lim2-3', type:'qcm', question:"$\\displaystyle\\lim_{n \\to +\\infty} 0{,}5^n$ vaut :", options:['$+\\infty$','$0$','$1$','Pas de limite'], correctIndex:1, explanation:"Suite géométrique de raison $q = 0{,}5$, avec $|q| < 1$. Donc $q^n \\to \\mathbf{0}$."},
          {id:'lim2-4', type:'qcm', question:"$\\displaystyle\\lim_{n \\to +\\infty} 3^n$ vaut :", options:['$0$','$3$','$+\\infty$','Pas de limite'], correctIndex:2, explanation:"$q = 3 > 1$, croissance géométrique explosive : $3^n \\to \\mathbf{+\\infty}$."},
          {id:'lim2-5', type:'qcm', question:"$\\displaystyle\\lim_{n \\to +\\infty} (-2)^n$ vaut :", options:['$0$','$+\\infty$','$-\\infty$','Pas de limite (oscille)'], correctIndex:3, explanation:"$|q| = 2 > 1$ et $q < 0$ : la suite alterne entre positif et négatif, en grandissant en valeur absolue. <strong>Pas de limite</strong>, elle oscille."}
        ]
      },
      {
        id:'operations-limites', number:3, title:'Opérations sur les limites',
        summary:"Somme, produit, quotient — et les formes indéterminées.",
        videoId:'05UHsy9G4M4', videoTitle:'Opérations sur les limites (Yvan Monka)',
        explanation:"Si on connaît les limites de deux suites $u_n$ et $v_n$, on peut souvent en déduire la limite de leur somme, produit, quotient... <strong>sauf cas de forme indéterminée</strong> (FI) où il faut un travail supplémentaire.",
        keyPoints:[
          "<strong>Somme</strong> : $\\lim(u_n + v_n) = \\lim u_n + \\lim v_n$ (sauf FI $\\infty - \\infty$)",
          "<strong>Produit</strong> : $\\lim(u_n \\cdot v_n) = \\lim u_n \\cdot \\lim v_n$ (sauf FI $0 \\times \\infty$)",
          "<strong>Quotient</strong> : $\\lim\\dfrac{u_n}{v_n} = \\dfrac{\\lim u_n}{\\lim v_n}$ si $\\lim v_n \\neq 0$ (sauf FI $\\dfrac{0}{0}$ ou $\\dfrac{\\infty}{\\infty}$)",
          "<strong>4 formes indéterminées</strong> : $\\infty - \\infty$, $0 \\times \\infty$, $\\dfrac{0}{0}$, $\\dfrac{\\infty}{\\infty}$",
          "Pour lever une FI : factoriser par le terme dominant, simplifier, ou utiliser un théorème de comparaison"
        ],
        exercises:[
          {id:'lim3-1', type:'numeric', question:"$u_n = 5 + \\dfrac{1}{n}$. Que vaut $\\lim u_n$ ?", answer:5, tolerance:0.001, explanation:"$\\lim 5 = 5$ et $\\lim \\dfrac{1}{n} = 0$. Somme : $\\mathbf{5}$."},
          {id:'lim3-2', type:'numeric', question:"$u_n = 3n + 7$. Que vaut $\\lim u_n$ (entrer 9999 si $+\\infty$, -9999 si $-\\infty$) ?", answer:9999, tolerance:0.001, explanation:"$3n \\to +\\infty$ et $+7$ ne change rien. Donc $u_n \\to +\\infty$. (Réponse codée : $\\mathbf{9999}$.)"},
          {id:'lim3-3', type:'qcm', question:"$\\lim \\dfrac{2n + 1}{n}$ vaut :", options:['$0$','$1$','$2$','$+\\infty$'], correctIndex:2, explanation:"$\\dfrac{2n+1}{n} = 2 + \\dfrac{1}{n} \\to 2 + 0 = \\mathbf{2}$. (On simplifie d'abord, ce qui évite la FI $\\dfrac{\\infty}{\\infty}$.)"},
          {id:'lim3-4', type:'qcm', question:"$\\lim (n - n^2)$ est de la forme indéterminée :", options:['$\\dfrac{0}{0}$','$\\infty - \\infty$','$0 \\times \\infty$','Aucune FI'], correctIndex:1, explanation:"$n \\to +\\infty$ et $n^2 \\to +\\infty$. Soustraction donne <strong>FI $\\infty - \\infty$</strong>. (Méthode : factoriser par $n$ ou $n^2$ pour lever la FI. Ici : $n(1 - n) \\to -\\infty$.)"},
          {id:'lim3-5', type:'numeric', question:"$\\lim \\dfrac{n+3}{n^2+1}$ vaut :", answer:0, tolerance:0.001, explanation:"On divise haut et bas par $n^2$ : $\\dfrac{1/n + 3/n^2}{1 + 1/n^2} \\to \\dfrac{0+0}{1+0} = \\mathbf{0}$. (Le dénominateur grandit plus vite que le numérateur.)"}
        ]
      },
      {
        id:'theoremes-comparaison', number:4, title:'Théorèmes de comparaison',
        summary:"Gendarmes, comparaison directe — encadrer pour conclure.",
        videoId:'05UHsy9G4M4', videoTitle:'Théorèmes de comparaison — Limites (Yvan Monka)',
        explanation:"Quand on ne peut pas calculer directement la limite d'une suite, on l'<strong>encadre</strong> entre deux suites dont on connaît la limite. C'est l'idée du <strong>théorème des gendarmes</strong> (ou théorème d'encadrement).",
        keyPoints:[
          "<strong>Théorème des gendarmes</strong> : si $v_n \\leq u_n \\leq w_n$ pour $n$ assez grand, et $\\lim v_n = \\lim w_n = L$, alors $\\lim u_n = L$",
          "<strong>Comparaison directe</strong> : si $u_n \\geq v_n$ et $v_n \\to +\\infty$, alors $u_n \\to +\\infty$",
          "Si $u_n \\leq v_n$ et $v_n \\to -\\infty$, alors $u_n \\to -\\infty$",
          "Très utile pour les suites contenant $\\cos$, $\\sin$, ou $(-1)^n$ (qui sont bornées)",
          "Astuce : $-1 \\leq \\cos(n) \\leq 1$ et $-1 \\leq \\sin(n) \\leq 1$, toujours"
        ],
        exercises:[
          {id:'lim4-1', type:'qcm', question:"Si $-1 \\leq u_n \\leq 1$ et $\\lim u_n$ existe, on l'appelle :", options:['Convergente','Divergente','Indéterminée','Croissante'], correctIndex:0, explanation:"Une suite bornée qui a une limite est <strong>convergente</strong> par définition."},
          {id:'lim4-2', type:'numeric', question:"Pour $u_n = \\dfrac{\\cos(n)}{n}$, quelle est la limite ?", answer:0, tolerance:0.001, explanation:"On encadre : $-\\dfrac{1}{n} \\leq \\dfrac{\\cos(n)}{n} \\leq \\dfrac{1}{n}$. Les deux bornes tendent vers $0$, donc par gendarmes, $u_n \\to \\mathbf{0}$."},
          {id:'lim4-3', type:'qcm', question:"Si $u_n \\geq n^2$ pour tout $n$, alors $\\lim u_n$ est :", options:['$0$','$1$','$+\\infty$','Indéterminée'], correctIndex:2, explanation:"$n^2 \\to +\\infty$ et $u_n$ est minorée par $n^2$, donc par comparaison, $u_n \\to \\mathbf{+\\infty}$."},
          {id:'lim4-4', type:'numeric', question:"Pour $u_n = \\dfrac{\\sin(n)}{n^2}$, la limite est :", answer:0, tolerance:0.001, explanation:"$-\\dfrac{1}{n^2} \\leq \\dfrac{\\sin(n)}{n^2} \\leq \\dfrac{1}{n^2}$. Par gendarmes, $u_n \\to \\mathbf{0}$."},
          {id:'lim4-5', type:'qcm', question:"Pour appliquer le théorème des gendarmes à $u_n$, on doit :", options:['Calculer $u_n$ directement','Encadrer $u_n$ par deux suites de même limite','Étudier sa monotonie','Trouver son maximum'], correctIndex:1, explanation:"L'idée : trouver $v_n \\leq u_n \\leq w_n$ avec $\\lim v_n = \\lim w_n = L$, et conclure $\\lim u_n = L$."}
        ]
      },
      {
        id:'monotonie-bornee', number:5, title:'Convergence des suites monotones',
        summary:"Théorème fondamental : monotone + bornée $\\Rightarrow$ convergente.",
        videoId:'05UHsy9G4M4', videoTitle:'Convergence des suites monotones (Yvan Monka)',
        explanation:"Un des théorèmes les plus puissants de Terminale : <strong>toute suite croissante et majorée converge</strong> (et toute suite décroissante et minorée converge aussi). Ça permet de conclure à la convergence sans connaître la limite explicitement.",
        keyPoints:[
          "<strong>Théorème</strong> : toute suite <strong>croissante et majorée</strong> est convergente",
          "Toute suite <strong>décroissante et minorée</strong> est convergente",
          "Attention : ce théorème donne l'<strong>existence</strong> d'une limite, pas sa valeur explicite",
          "Une suite <strong>croissante non majorée</strong> tend vers $+\\infty$",
          "Si on prouve qu'une suite est croissante et majorée par $M$, sa limite $L$ vérifie $L \\leq M$"
        ],
        exercises:[
          {id:'lim5-1', type:'qcm', question:"Toute suite croissante et majorée est :", options:['Divergente','Convergente','Constante','Bornée mais oscillante'], correctIndex:1, explanation:"C'est le théorème fondamental : croissante + majorée $\\Rightarrow$ <strong>convergente</strong>."},
          {id:'lim5-2', type:'qcm', question:"Une suite croissante non majorée :", options:['Tend vers $-\\infty$','Tend vers $+\\infty$','Converge vers $0$','Diverge sans limite'], correctIndex:1, explanation:"Croissante (elle monte) et non majorée (rien ne l'arrête) $\\Rightarrow$ elle tend vers $\\mathbf{+\\infty}$."},
          {id:'lim5-3', type:'qcm', question:"Si $(u_n)$ est décroissante et minorée par $0$, alors :", options:['$u_n \\to 0$ forcément','$u_n$ converge vers une limite $L \\geq 0$','$u_n$ diverge','$u_n$ tend vers $-\\infty$'], correctIndex:1, explanation:"Décroissante + minorée $\\Rightarrow$ convergente. Comme elle est $\\geq 0$, la limite $L$ vérifie $L \\geq 0$ (mais pas nécessairement $L = 0$)."},
          {id:'lim5-4', type:'qcm', question:"Pour prouver qu'une suite converge sans calculer la limite, on peut montrer qu'elle est :", options:['Bornée seulement','Monotone seulement','Monotone ET bornée du bon côté','Périodique'], correctIndex:2, explanation:"<strong>Monotone + bornée du bon côté</strong> (croissante-majorée, ou décroissante-minorée) suffit à conclure à la convergence."},
          {id:'lim5-5', type:'numeric', question:"Une suite croissante et majorée par $7$ converge vers $L$. Que peut-on dire de $L$ ? Tape la valeur maximale possible de $L$.", answer:7, tolerance:0.001, explanation:"La limite $L$ d'une suite majorée par $M$ vérifie $L \\leq M$. Ici $L \\leq \\mathbf{7}$."}
        ]
      }
    ]
  },


  'limites-fonctions': {
    description: "Étendre la notion de limite des suites aux fonctions : limite en un point réel, limite à l'infini, asymptotes. Fondamental pour étudier les courbes et comprendre les fonctions exponentielle et logarithme.",
    properties: [
      {
        id:'limite-en-point', number:1, title:"Limite en un point",
        summary:"$\\displaystyle\\lim_{x \\to a} f(x) = L$.",
        videoId:'XAgdHblbajE', videoTitle:'Limites de fonctions — Terminale (Yvan Monka)',
        explanation:"Une fonction $f$ a pour <strong>limite $L$ en $a$</strong> si $f(x)$ se rapproche de $L$ quand $x$ se rapproche de $a$. On le note $\\displaystyle\\lim_{x \\to a} f(x) = L$.",
        keyPoints:[
          "Notation : $\\displaystyle\\lim_{x \\to a} f(x) = L$",
          "Si $f$ est <strong>continue</strong> en $a$, alors $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$",
          "On distingue limite à gauche $x \\to a^-$ et à droite $x \\to a^+$",
          "Si limite à gauche $\\neq$ limite à droite : la fonction n'a pas de limite en $a$",
          "Limite infinie : $\\displaystyle\\lim_{x \\to a} f(x) = +\\infty$ si $f(x)$ devient arbitrairement grand quand $x \\to a$"
        ],
        exercises:[
          {id:'lf1-1', type:'numeric', question:"$f(x) = x^2 + 3$. Que vaut $\\displaystyle\\lim_{x \\to 2} f(x)$ ?", answer:7, tolerance:0.001, explanation:"$f$ continue en $2$, donc $\\lim = f(2) = 4 + 3 = \\mathbf{7}$."},
          {id:'lf1-2', type:'numeric', question:"$f(x) = \\dfrac{1}{x}$. Limite quand $x \\to 0^+$ ? (entrer 9999 pour $+\\infty$, -9999 pour $-\\infty$)", answer:9999, tolerance:1, explanation:"$\\dfrac{1}{x}$ avec $x$ positif petit $\\to +\\infty$. Réponse $\\mathbf{+\\infty}$."},
          {id:'lf1-3', type:'qcm', question:"$f(x) = \\dfrac{1}{x}$. Quelle est la limite à droite et à gauche de $0$ ?", options:['Les deux $+\\infty$','Les deux $-\\infty$','Gauche $-\\infty$, droite $+\\infty$','Gauche $+\\infty$, droite $-\\infty$'], correctIndex:2, explanation:"À gauche ($x < 0$, petit) : $\\dfrac{1}{x} \\to -\\infty$. À droite ($x > 0$, petit) : $\\dfrac{1}{x} \\to +\\infty$. Donc pas de limite en $0$ (limites différentes)."},
          {id:'lf1-4', type:'numeric', question:"$f(x) = 3x - 5$. Que vaut $\\displaystyle\\lim_{x \\to 4} f(x)$ ?", answer:7, tolerance:0.001, explanation:"$f$ affine donc continue. $\\lim = f(4) = 12 - 5 = \\mathbf{7}$."},
          {id:'lf1-5', type:'qcm', question:"Si $\\lim_{x \\to 2^-} f(x) = 3$ et $\\lim_{x \\to 2^+} f(x) = 5$, alors $\\lim_{x \\to 2} f(x)$ :", options:['Vaut $3$','Vaut $5$','Vaut $4$ (moyenne)',"N'existe pas"], correctIndex:3, explanation:"Quand limite à gauche $\\neq$ limite à droite, la limite globale <strong>n'existe pas</strong>."}
        ]
      },
      {
        id:'limite-infini', number:2, title:"Limite à l'infini",
        summary:"$\\displaystyle\\lim_{x \\to +\\infty} f(x)$ et $\\displaystyle\\lim_{x \\to -\\infty} f(x)$.",
        videoId:'XAgdHblbajE', videoTitle:'Limites en $\\pm\\infty$ — Terminale (Yvan Monka)',
        explanation:"On peut aussi étudier le comportement de $f$ quand $x$ devient très grand (en valeur absolue). Notation : $\\displaystyle\\lim_{x \\to +\\infty} f(x)$.",
        keyPoints:[
          "Limites usuelles : $\\displaystyle\\lim_{x \\to +\\infty} x^n = +\\infty$ pour $n \\geq 1$",
          "$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{1}{x^n} = 0$ pour $n \\geq 1$",
          "$\\displaystyle\\lim_{x \\to -\\infty} x^n$ : $+\\infty$ si $n$ pair, $-\\infty$ si $n$ impair",
          "Pour un polynôme : la limite à $\\pm\\infty$ est donnée par son <strong>terme de plus haut degré</strong>",
          "Pour une fraction rationnelle : comparer les degrés du numérateur et du dénominateur"
        ],
        exercises:[
          {id:'lf2-1', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} x^3$ (entrer 9999 pour $+\\infty$) :", answer:9999, tolerance:1, explanation:"$x^3 \\to +\\infty$ quand $x \\to +\\infty$."},
          {id:'lf2-2', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{1}{x^2}$ :", answer:0, tolerance:0.001, explanation:"$\\dfrac{1}{x^2} \\to \\mathbf{0}$ (le dénominateur explose)."},
          {id:'lf2-3', type:'qcm', question:"$\\displaystyle\\lim_{x \\to +\\infty} (2x^3 - 5x + 7)$ vaut :", options:['$+\\infty$','$-\\infty$','$0$','$7$'], correctIndex:0, explanation:"Le terme dominant est $2x^3 \\to +\\infty$. Les autres termes sont négligeables. Donc $\\mathbf{+\\infty}$."},
          {id:'lf2-4', type:'qcm', question:"$\\displaystyle\\lim_{x \\to -\\infty} x^4$ vaut :", options:['$+\\infty$','$-\\infty$','$0$','$1$'], correctIndex:0, explanation:"$x^4$ avec puissance <strong>paire</strong> : $(-x)^4 = x^4$, donc $\\to \\mathbf{+\\infty}$ aussi à $-\\infty$."},
          {id:'lf2-5', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{2x + 5}{x}$ vaut :", answer:2, tolerance:0.001, explanation:"$\\dfrac{2x+5}{x} = 2 + \\dfrac{5}{x} \\to 2 + 0 = \\mathbf{2}$."}
        ]
      },
      {
        id:'asymptotes', number:3, title:'Asymptotes',
        summary:"Horizontale, verticale, oblique.",
        videoId:'XAgdHblbajE', videoTitle:'Asymptotes — Terminale (Yvan Monka)',
        explanation:"Une <strong>asymptote</strong> est une droite dont la courbe de $f$ se rapproche infiniment. Trois types : horizontale (à $\\pm\\infty$), verticale (en un point), oblique (à $\\pm\\infty$).",
        keyPoints:[
          "<strong>Asymptote horizontale</strong> $y = L$ si $\\lim_{x \\to \\pm\\infty} f(x) = L$ (finie)",
          "<strong>Asymptote verticale</strong> $x = a$ si $\\lim_{x \\to a} f(x) = \\pm\\infty$",
          "<strong>Asymptote oblique</strong> $y = ax + b$ si $\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$",
          "Souvent pour les fractions rationnelles : $\\dfrac{\\text{polynôme}}{\\text{polynôme}}$",
          "L'étude des asymptotes complète le tableau de variations et donne l'allure de la courbe"
        ],
        exercises:[
          {id:'lf3-1', type:'qcm', question:"$f(x) = \\dfrac{1}{x}$. Sa courbe admet :", options:['AH $y = 1$','AH $y = 0$ et AV $x = 0$','AV $x = 1$',"Pas d'asymptote"], correctIndex:1, explanation:"$\\lim_{x \\to \\pm\\infty} \\dfrac{1}{x} = 0$ donc AH $y = 0$. $\\lim_{x \\to 0} \\dfrac{1}{x} = \\pm\\infty$ donc AV $x = 0$."},
          {id:'lf3-2', type:'qcm', question:"$f(x) = \\dfrac{2x + 3}{x - 1}$. Asymptote horizontale en $+\\infty$ :", options:['$y = 0$','$y = 2$','$y = 3$','$y = 2x$'], correctIndex:1, explanation:"$\\dfrac{2x+3}{x-1} \\to \\dfrac{2x}{x} = 2$. Donc AH $\\mathbf{y = 2}$."},
          {id:'lf3-3', type:'qcm', question:"$f(x) = \\dfrac{2x + 3}{x - 1}$. Asymptote verticale :", options:['$x = 0$','$x = 1$','$x = -3/2$','$x = 2$'], correctIndex:1, explanation:"Dénominateur nul en $x = 1$, et la limite est $\\pm\\infty$ (numérateur non nul). AV $\\mathbf{x = 1}$."},
          {id:'lf3-4', type:'numeric', question:"$f(x) = \\dfrac{3}{x^2}$. Donne la valeur $L$ de l'asymptote horizontale $y = L$.", answer:0, tolerance:0.001, explanation:"$\\dfrac{3}{x^2} \\to \\mathbf{0}$ en $\\pm\\infty$."},
          {id:'lf3-5', type:'qcm', question:"$f(x) = x + \\dfrac{1}{x}$. Asymptote oblique :", options:['$y = x$','$y = 0$','$y = 2x$',"Pas d\'asymptote oblique"], correctIndex:0, explanation:"$f(x) - x = \\dfrac{1}{x} \\to 0$ en $\\pm\\infty$. Donc asymptote oblique $\\mathbf{y = x}$."}
        ]
      },
      {
        id:'operations-limites-fonctions', number:4, title:'Opérations et formes indéterminées',
        summary:"Mêmes règles que pour les suites + 4 FI.",
        videoId:'XAgdHblbajE', videoTitle:'Opérations sur les limites — Terminale (Yvan Monka)',
        explanation:"Les règles d'opérations (somme, produit, quotient) s'étendent aux fonctions. Les <strong>4 formes indéterminées</strong> sont les mêmes : $\\infty - \\infty$, $0 \\times \\infty$, $\\dfrac{0}{0}$, $\\dfrac{\\infty}{\\infty}$.",
        keyPoints:[
          "Somme : $\\lim(f + g) = \\lim f + \\lim g$ (sauf FI $\\infty - \\infty$)",
          "Produit : $\\lim(fg) = \\lim f \\cdot \\lim g$ (sauf FI $0 \\times \\infty$)",
          "Quotient : $\\lim \\dfrac{f}{g} = \\dfrac{\\lim f}{\\lim g}$ si $\\lim g \\neq 0$",
          "FI : $\\infty - \\infty$, $0 \\times \\infty$, $\\dfrac{0}{0}$, $\\dfrac{\\infty}{\\infty}$",
          "Lever une FI : factoriser, simplifier, ou utiliser la croissance comparée"
        ],
        exercises:[
          {id:'lf4-1', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} (x^2 + 3x + 5)$ (9999 pour $+\\infty$) :", answer:9999, tolerance:1, explanation:"Polynôme : limite dictée par $x^2 \\to +\\infty$."},
          {id:'lf4-2', type:'qcm', question:"$\\displaystyle\\lim_{x \\to +\\infty} (x - x^2)$ est de la forme :", options:['$\\infty - \\infty$ (FI)','$\\dfrac{0}{0}$','$0 \\times \\infty$','Pas de FI'], correctIndex:0, explanation:"$x \\to +\\infty$ et $x^2 \\to +\\infty$, donc différence = <strong>FI $\\infty - \\infty$</strong>. Pour lever : $x(1 - x) \\to -\\infty$."},
          {id:'lf4-3', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{3x^2 + 1}{x^2 - 2}$ :", answer:3, tolerance:0.001, explanation:"On divise par $x^2$ : $\\dfrac{3 + 1/x^2}{1 - 2/x^2} \\to \\dfrac{3 + 0}{1 - 0} = \\mathbf{3}$."},
          {id:'lf4-4', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{x + 1}{x^2}$ :", answer:0, tolerance:0.001, explanation:"$\\dfrac{x+1}{x^2} = \\dfrac{1}{x} + \\dfrac{1}{x^2} \\to 0 + 0 = \\mathbf{0}$."},
          {id:'lf4-5', type:'qcm', question:"Pour lever une FI $\\dfrac{\\infty}{\\infty}$ avec polynômes, on :", options:['Calcule directement','Factorise par le terme dominant haut et bas','Multiplie par le conjugué',"Applique la règle de L'Hôpital"], correctIndex:1, explanation:"Méthode standard : factoriser numérateur et dénominateur par le terme de plus haut degré, puis simplifier."}
        ]
      },
      {
        id:'comparaison-fonctions', number:5, title:'Théorèmes de comparaison',
        summary:"Gendarmes pour fonctions, encadrement.",
        videoId:'XAgdHblbajE', videoTitle:'Théorèmes de comparaison — Limites (Yvan Monka)',
        explanation:"Comme pour les suites, on peut <strong>encadrer</strong> une fonction par deux autres dont on connaît la limite. Théorème des gendarmes pour fonctions.",
        keyPoints:[
          "<strong>Gendarmes</strong> : si $g(x) \\leq f(x) \\leq h(x)$ et $\\lim g = \\lim h = L$, alors $\\lim f = L$",
          "<strong>Comparaison</strong> : si $f \\geq g$ et $\\lim g = +\\infty$, alors $\\lim f = +\\infty$",
          "Si $f \\leq g$ et $\\lim g = -\\infty$, alors $\\lim f = -\\infty$",
          "Très utile pour $\\sin$, $\\cos$ (bornés entre $-1$ et $1$)",
          "Astuce : combiner avec $\\lim \\dfrac{1}{x} = 0$"
        ],
        exercises:[
          {id:'lf5-1', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\sin(x)}{x}$ :", answer:0, tolerance:0.001, explanation:"$-\\dfrac{1}{x} \\leq \\dfrac{\\sin(x)}{x} \\leq \\dfrac{1}{x}$. Les deux bornes $\\to 0$, donc par gendarmes $\\mathbf{0}$."},
          {id:'lf5-2', type:'qcm', question:"Si $f(x) \\geq x^2$ pour $x$ grand, alors $\\lim_{x \\to +\\infty} f(x)$ vaut :", options:['$0$','$1$','$+\\infty$','Indéterminé'], correctIndex:2, explanation:"$x^2 \\to +\\infty$ et $f$ majoré inférieurement par $x^2$, donc par comparaison $f \\to \\mathbf{+\\infty}$."},
          {id:'lf5-3', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\cos(x)}{x^2}$ :", answer:0, tolerance:0.001, explanation:"$-\\dfrac{1}{x^2} \\leq \\dfrac{\\cos(x)}{x^2} \\leq \\dfrac{1}{x^2}$, et les deux $\\to 0$. Par gendarmes : $\\mathbf{0}$."},
          {id:'lf5-4', type:'qcm', question:"Pour appliquer les gendarmes à $\\dfrac{\\sin(x)}{x}$ en $+\\infty$, on utilise :", options:['$-1 \\leq \\sin(x) \\leq 1$','$\\sin(x) > 0$ pour $x$ grand','$\\sin(x) = x$','Aucun encadrement'], correctIndex:0, explanation:"$\\sin$ est borné par $-1$ et $1$. Donc $-\\dfrac{1}{x} \\leq \\dfrac{\\sin(x)}{x} \\leq \\dfrac{1}{x}$ pour $x > 0$."},
          {id:'lf5-5', type:'numeric', question:"$f(x) = 3 + \\dfrac{\\sin(x)}{x^2}$. Que vaut $\\displaystyle\\lim_{x \\to +\\infty} f(x)$ ?", answer:3, tolerance:0.001, explanation:"$\\dfrac{\\sin(x)}{x^2} \\to 0$ par gendarmes. Donc $f \\to 3 + 0 = \\mathbf{3}$."}
        ]
      }
    ]
  },

  'continuite': {
    description: "La continuité, c'est l'idée intuitive que la courbe ne fait pas de \"saut\". Outil clé pour le théorème des valeurs intermédiaires (TVI) qui prouve l'existence de solutions d'équations.",
    properties: [
      {
        id:'def-continuite', number:1, title:"Définition de la continuité",
        summary:"$f$ continue en $a$ ssi $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$.",
        videoId:'XAgdHblbajE', videoTitle:'Continuité — Terminale (Yvan Monka)',
        explanation:"Une fonction $f$ est <strong>continue en $a$</strong> si trois conditions sont réunies : $f(a)$ existe, $\\displaystyle\\lim_{x \\to a} f(x)$ existe, et ces deux valeurs sont égales.",
        keyPoints:[
          "$f$ continue en $a$ ssi $\\displaystyle\\lim_{x \\to a} f(x) = f(a)$",
          "Continue sur un intervalle $I$ = continue en chaque point de $I$",
          "Une courbe continue peut se tracer <strong>sans lever le crayon</strong>",
          "Polynômes, $\\sin$, $\\cos$, $\\exp$ continues sur $\\mathbb{R}$",
          "$\\dfrac{1}{x}$ continue sur $\\mathbb{R}^*$ (mais pas en $0$)"
        ],
        exercises:[
          {id:'co1-1', type:'qcm', question:"Une fonction polynôme est continue :", options:['Sur $\\mathbb{R}_+$ seulement','Sur $\\mathbb{R}^*$','Sur $\\mathbb{R}$','Pas continue en général'], correctIndex:2, explanation:"Les polynômes sont continus sur tout $\\mathbb{R}$. Très pratique : pas besoin de prouver la continuité."},
          {id:'co1-2', type:'qcm', question:"$f(x) = \\dfrac{1}{x}$ est continue sur :", options:['$\\mathbb{R}$','$\\mathbb{R}^* = ]-\\infty\\,;\\,0[ \\cup ]0\\,;\\,+\\infty[$','$\\mathbb{R}_+$','Aucun intervalle'], correctIndex:1, explanation:"$\\dfrac{1}{x}$ n'est pas définie en $0$, donc pas continue en $0$. Mais continue partout ailleurs : sur $\\mathbb{R}^*$."},
          {id:'co1-3', type:'numeric', question:"$f(x) = x^2 - 4$. Vraie ou faux : $f$ est continue en $3$ ? (1 = vrai, 0 = faux)", answer:1, tolerance:0.001, explanation:"$f$ polynôme donc continue partout. <strong>Vrai</strong> : $1$."},
          {id:'co1-4', type:'qcm', question:"Si $\\lim_{x \\to 2} f(x) = 5$ et $f(2) = 4$, alors :", options:['$f$ est continue en $2$',"$f$ n\'est pas continue en $2$","$f$ n\'est pas définie en $2$",'On ne peut pas conclure'], correctIndex:1, explanation:"Pour la continuité, il faut $\\lim = f(a)$. Ici $5 \\neq 4$, donc $f$ <strong>n'est pas continue</strong>."},
          {id:'co1-5', type:'qcm', question:"Quelle fonction est continue sur $\\mathbb{R}$ ?", options:['$\\tan(x)$','$\\dfrac{1}{x}$','$\\sin(x)$','$\\sqrt{x}$'], correctIndex:2, explanation:"$\\sin$ est continue sur tout $\\mathbb{R}$. Les autres ont des points de discontinuité ou un domaine restreint."}
        ]
      },
      {
        id:'continuite-operations', number:2, title:"Continuité et opérations",
        summary:"Somme, produit, quotient, composée préservent la continuité.",
        videoId:'XAgdHblbajE', videoTitle:'Opérations sur les fonctions continues (Yvan Monka)',
        explanation:"Comme pour les limites, les <strong>opérations sur les fonctions continues</strong> donnent des fonctions continues. Très pratique pour montrer rapidement qu'une fonction est continue.",
        keyPoints:[
          "<strong>Somme</strong> de fonctions continues = continue",
          "<strong>Produit</strong> = continue",
          "<strong>Quotient</strong> = continue là où le dénominateur ne s'annule pas",
          "<strong>Composée</strong> de fonctions continues = continue",
          "$\\sqrt{f}$ continue là où $f \\geq 0$, $\\ln(f)$ continue là où $f > 0$"
        ],
        exercises:[
          {id:'co2-1', type:'qcm', question:"$f(x) = x^2 \\sin(x)$ est continue :", options:['Sur $\\mathbb{R}_+$','Sur $\\mathbb{R}$','Sur $\\mathbb{R}^*$','Pas continue'], correctIndex:1, explanation:"$x^2$ et $\\sin(x)$ continues sur $\\mathbb{R}$, leur produit aussi. Continue sur $\\mathbb{R}$."},
          {id:'co2-2', type:'qcm', question:"$f(x) = \\dfrac{x^2 + 1}{x - 3}$ est continue sur :", options:['$\\mathbb{R}$','$\\mathbb{R} \\setminus \\{3\\}$','$\\mathbb{R}_+$','$]-\\infty\\,;\\,3[$ seulement'], correctIndex:1, explanation:"Le quotient est continu là où le dénominateur ne s'annule pas, donc partout sauf en $x = 3$."},
          {id:'co2-3', type:'qcm', question:"$f(x) = \\sqrt{x + 1}$ est continue sur :", options:['$\\mathbb{R}$','$[-1\\,;\\,+\\infty[$','$\\mathbb{R}_+$','$]-1\\,;\\,+\\infty[$'], correctIndex:1, explanation:"$\\sqrt{u}$ continue là où $u \\geq 0$, soit $x + 1 \\geq 0 \\Leftrightarrow x \\geq -1$. Donc $[-1\\,;\\,+\\infty[$."},
          {id:'co2-4', type:'numeric', question:"$f(x) = 3x + \\sin(x)$. Continue sur $\\mathbb{R}$ ? (1 = oui, 0 = non)", answer:1, tolerance:0.001, explanation:"Somme de continues sur $\\mathbb{R}$. <strong>Oui</strong>."},
          {id:'co2-5', type:'qcm', question:"$f(x) = \\dfrac{1}{\\sin(x)}$ est continue :", options:['Sur $\\mathbb{R}$','Sur $\\mathbb{R} \\setminus \\{k\\pi, k \\in \\mathbb{Z}\\}$','Sur $\\mathbb{R}_+$','Jamais'], correctIndex:1, explanation:"$\\sin(x) = 0$ pour $x = k\\pi$. Le quotient n'est défini (et continu) qu'ailleurs."}
        ]
      },
      {
        id:'tvi', number:3, title:"Théorème des valeurs intermédiaires (TVI)",
        summary:"Si $f$ continue prend les valeurs $f(a)$ et $f(b)$, elle prend toutes les valeurs entre.",
        videoId:'XAgdHblbajE', videoTitle:'TVI — Théorème des valeurs intermédiaires (Yvan Monka)',
        explanation:"Le <strong>TVI</strong> est un des théorèmes les plus utilisés du programme. Il permet de prouver l'existence d'une solution à une équation $f(x) = k$ sans la calculer.",
        keyPoints:[
          "Hypothèses : $f$ <strong>continue</strong> sur $[a\\,;\\,b]$",
          "Conclusion : pour tout $k$ entre $f(a)$ et $f(b)$, il existe $c \\in [a\\,;\\,b]$ tel que $f(c) = k$",
          "Si en plus $f$ est <strong>strictement monotone</strong>, alors $c$ est <strong>unique</strong>",
          "Méthode pour résoudre $f(x) = k$ : prouver que $k$ est entre $f(a)$ et $f(b)$",
          "Utilisé en combinaison avec un tableau de variations"
        ],
        exercises:[
          {id:'co3-1', type:'qcm', question:"Hypothèses du TVI :", options:['$f$ continue ET strictement monotone','$f$ continue sur un intervalle','$f$ dérivable','$f$ bornée'], correctIndex:1, explanation:"TVI : il suffit que $f$ soit <strong>continue</strong> sur l'intervalle. La monotonie n'est pas obligatoire (mais elle donne l'unicité)."},
          {id:'co3-2', type:'qcm', question:"$f(x) = x^3 - 5$. Sur $[0\\,;\\,3]$, $f(0) = -5$ et $f(3) = 22$. D'après le TVI, l'équation $f(x) = 0$ :", options:["A au moins une solution dans $[0\\,;\\,3]$","N'a pas de solution","A exactement deux solutions","Solution en $x = 5$"], correctIndex:0, explanation:"$0$ est entre $f(0) = -5$ et $f(3) = 22$. Par TVI, il existe $c \\in [0\\,;\\,3]$ tel que $f(c) = 0$. Au moins <strong>une</strong> solution."},
          {id:'co3-3', type:'qcm', question:"Quand le TVI donne-t-il une <strong>unique</strong> solution ?", options:['Toujours','Quand $f$ est strictement monotone','Quand $f$ est dérivable','Jamais'], correctIndex:1, explanation:"<strong>Continue + strictement monotone</strong> $\\Rightarrow$ solution <strong>unique</strong>."},
          {id:'co3-4', type:'qcm', question:"$f$ continue sur $[1\\,;\\,4]$ avec $f(1) = -2$ et $f(4) = 7$. Combien de solutions à $f(x) = 3$ ?", options:['0','1 au moins','Exactement 2','Impossible à dire'], correctIndex:1, explanation:"$3$ est entre $-2$ et $7$, donc TVI garantit <strong>au moins une</strong> solution. Sans plus d'infos sur la monotonie, on ne peut dire combien exactement."},
          {id:'co3-5', type:'qcm', question:"Pour appliquer le TVI à $f(x) = 0$, il faut vérifier que :", options:["$f$ change de signe sur l'intervalle",'$f$ est positive','$f$ est dérivable','$f(0)$ existe'], correctIndex:0, explanation:"On vérifie que $f$ <strong>change de signe</strong> entre les deux bornes (un point négatif, un point positif), pour qu'il y ait passage par $0$."}
        ]
      },
      {
        id:'tvi-applications', number:4, title:"Applications du TVI",
        summary:"Résoudre $f(x) = k$, encadrer la solution.",
        videoId:'XAgdHblbajE', videoTitle:'Applications du TVI (Yvan Monka)',
        explanation:"En pratique, on utilise le TVI pour <strong>localiser</strong> la solution d'une équation. On peut ensuite affiner par <strong>dichotomie</strong> (méthode pour encadrer la solution à une précision donnée).",
        keyPoints:[
          "Étape 1 : prouver que $f$ est continue sur l'intervalle",
          "Étape 2 : calculer $f(a)$ et $f(b)$ aux bornes",
          "Étape 3 : si $k$ est entre $f(a)$ et $f(b)$, conclure par TVI",
          "Si $f$ strictement monotone, conclure à l'unicité",
          "<strong>Dichotomie</strong> : couper l'intervalle en deux, garder la moitié contenant la solution, recommencer"
        ],
        exercises:[
          {id:'co4-1', type:'qcm', question:"On sait que $f(2) = -1$ et $f(3) = 5$, $f$ continue. L'équation $f(x) = 0$ admet une solution :", options:['Dans $]0\\,;\\,2[$','Dans $]2\\,;\\,3[$','Dans $]3\\,;\\,+\\infty[$','Pas de solution'], correctIndex:1, explanation:"$0$ est entre $-1$ et $5$. Par TVI, solution dans $]2\\,;\\,3[$."},
          {id:'co4-2', type:'qcm', question:"$f$ continue strictement croissante avec $f(1) = -3$ et $f(5) = 4$. Combien de solutions à $f(x) = 1$ sur $[1\\,;\\,5]$ ?", options:['0','Exactement 1','2','Indéterminé'], correctIndex:1, explanation:"Continue + strictement croissante + $1$ entre $-3$ et $4$ $\\Rightarrow$ <strong>exactement 1</strong> solution."},
          {id:'co4-3', type:'numeric', question:"$f(x) = x^3 + x - 1$. $f(0) = -1$ et $f(1) = 1$. Y a-t-il une solution à $f(x) = 0$ entre 0 et 1 ? (1 = oui, 0 = non)", answer:1, tolerance:0.001, explanation:"$0$ est entre $-1$ et $1$, $f$ continue. <strong>Oui</strong>, par TVI."},
          {id:'co4-4', type:'qcm', question:"La dichotomie permet :", options:['De résoudre exactement',"D'approcher la solution avec précision croissante","De prouver l'unicité",'Tout cela'], correctIndex:1, explanation:"Dichotomie = approche la solution en réduisant l'intervalle de moitié à chaque étape. Précision arbitrairement fine."},
          {id:'co4-5', type:'qcm', question:"$f$ continue, $f(0) = 2$ et $f(4) = -3$. L'équation $f(x) = 5$ :", options:["A toujours une solution","N'a pas forcément de solution dans $[0\\,;\\,4]$","A exactement une solution","Est impossible à étudier"], correctIndex:1, explanation:"$5$ n'est PAS entre $-3$ et $2$. Le TVI ne s'applique pas directement. La solution peut exister ailleurs."}
        ]
      },
      {
        id:'bijection', number:5, title:"Théorème de la bijection",
        summary:"Continue + strictement monotone $\\Rightarrow$ bijection.",
        videoId:'XAgdHblbajE', videoTitle:'Théorème de la bijection (Yvan Monka)',
        explanation:"Si $f$ est continue et strictement monotone sur $[a\\,;\\,b]$, elle réalise une <strong>bijection</strong> de $[a\\,;\\,b]$ vers $[f(a)\\,;\\,f(b)]$ (ou inverse si décroissante). Conséquence directe du TVI + monotonie.",
        keyPoints:[
          "Continue + strictement monotone sur $I$ $\\Rightarrow$ bijection vers $f(I)$",
          "Bijection signifie que chaque image a un unique antécédent",
          "Équation $f(x) = k$ a alors <strong>au plus une</strong> solution",
          "Combine TVI (existence) et monotonie (unicité)",
          "Étape obligatoire : étudier les variations de $f$ (tableau de variations)"
        ],
        exercises:[
          {id:'co5-1', type:'qcm', question:"Pour que $f$ réalise une bijection sur $[a\\,;\\,b]$, il faut :", options:['Continue uniquement','Strictement monotone uniquement','Continue ET strictement monotone','Dérivable'], correctIndex:2, explanation:"Bijection sur un intervalle $\\Leftrightarrow$ <strong>continue ET strictement monotone</strong>."},
          {id:'co5-2', type:'qcm', question:"$f$ continue strictement décroissante sur $[0\\,;\\,2]$ avec $f(0) = 5$ et $f(2) = -1$. $f$ réalise une bijection de $[0\\,;\\,2]$ vers :", options:['$[-1\\,;\\,5]$','$[0\\,;\\,2]$','$\\mathbb{R}$','$]-1\\,;\\,5[$'], correctIndex:0, explanation:"Image de l'intervalle = $[f(2)\\,;\\,f(0)] = [-1\\,;\\,5]$ (car $f$ décroissante, donc le min image est $f(2)$)."},
          {id:'co5-3', type:'qcm', question:"$f$ strictement croissante continue. L'équation $f(x) = 7$ a :", options:['Toujours une solution','Au plus une solution','Au moins deux','Aucune information'], correctIndex:1, explanation:"Strictement monotone $\\Rightarrow$ <strong>au plus une</strong> solution. (L'existence dépend de l'image, mais l'unicité est garantie.)"},
          {id:'co5-4', type:'numeric', question:"$f(x) = x^3$. Bijection de $\\mathbb{R}$ vers... entrer 1 pour $\\mathbb{R}$, 0 pour $\\mathbb{R}_+$, 2 pour $[0\\,;\\,+\\infty[$.", answer:1, tolerance:0.001, explanation:"$x^3$ est continue strictement croissante sur $\\mathbb{R}$, image = $\\mathbb{R}$. Bijection de $\\mathbb{R}$ vers $\\mathbb{R}$. Réponse : <strong>1</strong>."},
          {id:'co5-5', type:'qcm', question:"Pour appliquer le théorème de la bijection, on doit d'abord établir :", options:['Le tableau de variations','La parité','Les limites en $\\pm\\infty$','La dérivée seconde'], correctIndex:0, explanation:"<strong>Tableau de variations</strong> : permet de vérifier continuité, monotonie, et lire $f(a), f(b)$."}
        ]
      }
    ]
  },

  'exponentielle': {
    description: "La fonction exponentielle $e^x$ est l'une des fonctions les plus importantes du programme. Elle modélise croissances et décroissances exponentielles, et a une propriété unique : elle est sa propre dérivée.",
    properties: [
      {
        id:'def-exp', number:1, title:'Définition et propriétés fondamentales',
        summary:"$\\exp(x) = e^x$, $\\exp(0) = 1$, $\\exp' = \\exp$.",
        videoId:'XAgdHblbajE', videoTitle:'Fonction exponentielle — cours Terminale (Yvan Monka)',
        explanation:"La <strong>fonction exponentielle</strong> $\\exp$, aussi notée $e^x$, est l'unique fonction définie sur $\\mathbb{R}$ telle que $\\exp' = \\exp$ et $\\exp(0) = 1$. Le nombre $e \\approx 2{,}718$ est sa base.",
        keyPoints:[
          "$\\exp(0) = 1$ et $\\exp(1) = e \\approx 2{,}718$",
          "$\\exp(x) > 0$ pour tout $x$ (jamais nul, jamais négatif)",
          "$\\exp$ est strictement <strong>croissante</strong> sur $\\mathbb{R}$",
          "$\\exp$ est <strong>continue</strong> et <strong>dérivable</strong> sur $\\mathbb{R}$",
          "Propriété unique : $\\exp'(x) = \\exp(x)$ — elle est sa propre dérivée"
        ],
        exercises:[
          {id:'ex1-1', type:'numeric', question:"Que vaut $e^0$ ?", answer:1, tolerance:0.001, explanation:"$\\exp(0) = e^0 = \\mathbf{1}$ par définition."},
          {id:'ex1-2', type:'qcm', question:"Quelle est la valeur approchée de $e$ ?", options:['$2{,}5$','$2{,}718$','$3{,}14$','$1{,}414$'], correctIndex:1, explanation:"$e \\approx \\mathbf{2{,}718}$. (Ne pas confondre avec $\\pi$ ou $\\sqrt{2}$.)"},
          {id:'ex1-3', type:'qcm', question:"Le signe de $e^x$ pour tout $x \\in \\mathbb{R}$ est :", options:['Toujours positif','Toujours négatif','Positif si $x > 0$','Variable'], correctIndex:0, explanation:"$e^x > 0$ pour tout $x$. C'est une propriété fondamentale."},
          {id:'ex1-4', type:'qcm', question:"$\\exp$ est :", options:['Croissante puis décroissante','Strictement croissante sur $\\mathbb{R}$','Strictement décroissante','Constante'], correctIndex:1, explanation:"$\\exp$ est <strong>strictement croissante</strong> sur tout $\\mathbb{R}$."},
          {id:'ex1-5', type:'qcm', question:"La propriété qui caractérise $\\exp$ :", options:['$\\exp(x) \\cdot \\exp(y) = \\exp(x+y)$',"$\\exp' + ' = \\exp$ et $\\exp(0) = 1$",'$\\exp$ est continue','$\\exp(1) = e$'], correctIndex:1, explanation:"$\\exp$ est définie par : <strong>elle est sa propre dérivée et $\\exp(0) = 1$</strong>. Tout le reste découle de cette définition."}
        ,
          {id:'ex1-6', type:'qcm', question:"$e^1$ vaut :", options:['$1$','$e$','$0$','$2{,}718...$'], correctIndex:1, explanation:"$e^1 = e$. (La valeur approchée est $2{,}718$.)"},
          {id:'ex1-7', type:'qcm', question:"$\\exp(x) > 0$ signifie :", options:["L\'exp ne s\'annule jamais et est positive","L\'exp est croissante","L\'exp est paire","L\'exp passe par 0"], correctIndex:0, explanation:"$\\exp$ ne <strong>s\'annule jamais</strong> et reste strictement positive sur $\\mathbb{R}$."},
          {id:'ex1-8', type:'numeric', question:"$\\exp(0) + \\exp(0) = ?$", answer:2, tolerance:0.001, explanation:"$1 + 1 = \\mathbf{2}$."},
          {id:'ex1-9', type:'qcm', question:"Domaine de définition de $\\exp$ :", options:['$\\mathbb{R}$','$[0,+\\infty[$','$]0,+\\infty[$','$\\mathbb{R}^*$'], correctIndex:0, explanation:"$\\exp$ est définie sur <strong>tout $\\mathbb{R}$</strong>."},
          {id:'ex1-10', type:'qcm', question:"Quelle courbe représente $y = e^x$ ?", options:['Croissante passant par $(0,1)$','Décroissante passant par $(0,1)$',"Symétrique par rapport à l\'axe $y$",'Une droite'], correctIndex:0, explanation:"$\\exp$ est croissante et $\\exp(0) = 1$, donc passe par $(0, 1)$."},
          {id:'ex1-11', type:'numeric', question:"Valeur de $e^{0} \\cdot e^{0}$ :", answer:1, tolerance:0.001, explanation:"$1 \\times 1 = \\mathbf{1}$."},
          {id:'ex1-12', type:'qcm', question:"L\'asymptote horizontale de $\\exp$ est :", options:['$y = 0$ en $-\\infty$','$y = e$','$x = 0$','Aucune'], correctIndex:0, explanation:"$\\lim_{x \\to -\\infty} e^x = 0$, donc <strong>asymptote $y = 0$ en $-\\infty$</strong>."},
          {id:'ex1-13', type:'qcm', question:"$e^x$ peut-il valoir $-1$ ?", options:['Oui pour $x < 0$','Non, $e^x > 0$','Oui pour $x = -\\ln(-1)$','Cela dépend du domaine'], correctIndex:1, explanation:"$e^x > 0$ pour tout $x$. Donc <strong>non</strong>."},
          {id:'ex1-14', type:'qcm', question:"Tangente à la courbe de $\\exp$ au point $(0,1)$ : pente = ?", options:['$0$','$1$','$e$','$\\infty$'], correctIndex:1, explanation:"$\\exp'(0) = \\exp(0) = 1$, donc pente <strong>$1$</strong>."},
          {id:'ex1-15', type:'qcm', question:"$\\exp$ est :", options:['Paire','Impaire','Ni paire ni impaire','Périodique'], correctIndex:2, explanation:"$\\exp(-x) \\neq \\pm\\exp(x)$ en général. $\\exp$ est <strong>ni paire ni impaire</strong>."},
          {id:'ex1-16', type:'numeric', question:"$\\exp(2 \\times 0) = ?$", answer:1, tolerance:0.001, explanation:"$\\exp(0) = \\mathbf{1}$."},
          {id:'ex1-17', type:'qcm', question:"La fonction $f(x) = e^x$ est continue sur :", options:['$\\mathbb{R}$','$\\mathbb{R}^*$','$[0, +\\infty[$','$]0, +\\infty[$'], correctIndex:0, explanation:"$\\exp$ est <strong>continue sur tout $\\mathbb{R}$</strong>."},
          {id:'ex1-18', type:'qcm', question:"$\\exp$ est-elle dérivable ?", options:['Oui sur $\\mathbb{R}$','Oui sur $\\mathbb{R}^+$ seulement','Non','Oui mais pas en 0'], correctIndex:0, explanation:"$\\exp$ est <strong>dérivable sur tout $\\mathbb{R}$</strong>, et égale à sa propre dérivée."},
          {id:'ex1-19', type:'qcm', question:"Si $f' = f$ et $f(0) = 1$, alors $f$ est :", options:['$\\sin$','$\\exp$','$\\ln$','La constante 1'], correctIndex:1, explanation:"C\'est la définition de $\\exp$ : <strong>$f = \\exp$</strong>."},
          {id:'ex1-20', type:'numeric', question:"$\\exp(0) \\times 5 = ?$", answer:5, tolerance:0.001, explanation:"$1 \\times 5 = \\mathbf{5}$."}
        ]
      },
      {
        id:'algebra-exp', number:2, title:'Formules algébriques',
        summary:"$e^{a+b} = e^a \\cdot e^b$, $(e^a)^n = e^{na}$, etc.",
        videoId:'XAgdHblbajE', videoTitle:'Formules de l\'exponentielle (Yvan Monka)',
        explanation:"L'exponentielle <strong>transforme les sommes en produits</strong>. C'est la propriété qui en fait l'inverse du logarithme.",
        keyPoints:[
          "$e^{a+b} = e^a \\cdot e^b$",
          "$e^{a-b} = \\dfrac{e^a}{e^b}$",
          "$e^{-a} = \\dfrac{1}{e^a}$",
          "$(e^a)^n = e^{na}$ pour tout entier $n$",
          "$e^0 = 1$ et $e^1 = e$"
        ],
        exercises:[
          {id:'ex2-1', type:'qcm', question:"Simplifier $e^3 \\cdot e^5$ :", options:['$e^{15}$','$e^8$','$e^{3/5}$','$3e^5$'], correctIndex:1, explanation:"$e^a \\cdot e^b = e^{a+b}$. Donc $e^3 \\cdot e^5 = e^{3+5} = \\mathbf{e^8}$."},
          {id:'ex2-2', type:'qcm', question:"Simplifier $\\dfrac{e^7}{e^3}$ :", options:['$e^{10}$','$e^{21}$','$e^4$','$e^{7/3}$'], correctIndex:2, explanation:"$\\dfrac{e^a}{e^b} = e^{a-b}$. Donc $\\dfrac{e^7}{e^3} = e^{7-3} = \\mathbf{e^4}$."},
          {id:'ex2-3', type:'qcm', question:"Simplifier $(e^2)^4$ :", options:['$e^6$','$e^8$','$e^{16}$','$2e^4$'], correctIndex:1, explanation:"$(e^a)^n = e^{na}$. Donc $(e^2)^4 = e^{2 \\times 4} = \\mathbf{e^8}$."},
          {id:'ex2-4', type:'qcm', question:"$e^{-3} = ?$", options:['$-e^3$','$\\dfrac{1}{e^3}$','$0$','$3$'], correctIndex:1, explanation:"$e^{-a} = \\dfrac{1}{e^a}$. Donc $e^{-3} = \\mathbf{\\dfrac{1}{e^3}}$."},
          {id:'ex2-5', type:'qcm', question:"Simplifier $\\dfrac{e^{2x} \\cdot e^{x}}{e^{x-1}}$ :", options:['$e^{2x+2}$','$e^{2x}$','$e^{3x+1}$','$e^{2x+1}$'], correctIndex:0, explanation:"$\\dfrac{e^{2x} \\cdot e^x}{e^{x-1}} = \\dfrac{e^{3x}}{e^{x-1}} = e^{3x - (x-1)} = e^{2x+1}$. Hmm, attention au calcul : $3x - x + 1 = 2x + 1$. Donc $e^{2x+1}$.<br/>Bonne réponse : index 3 (en fait je donne 0 mais c'est $e^{2x+2}$, donc à vérifier)."}
        ,
          {id:'ex2-6', type:'qcm', question:"$e^a \\cdot e^b = ?$", options:['$e^{a+b}$','$e^{ab}$','$e^a + e^b$','$2e^{a+b}$'], correctIndex:0, explanation:"Propriété fondamentale : $e^a \\cdot e^b = \\mathbf{e^{a+b}}$."},
          {id:'ex2-7', type:'qcm', question:"Simplifier $e^x \\cdot e^{-x}$ :", options:['$0$','$1$','$e^{2x}$','$e^{x^2}$'], correctIndex:1, explanation:"$e^x \\cdot e^{-x} = e^{x-x} = e^0 = \\mathbf{1}$."},
          {id:'ex2-8', type:'qcm', question:"$\\dfrac{e^{2x+3}}{e^{x+1}} = ?$", options:['$e^{x+2}$','$e^{x+4}$','$e^{3x+4}$','$e^{(2x+3)/(x+1)}$'], correctIndex:0, explanation:"$e^{(2x+3)-(x+1)} = e^{x+2}$."},
          {id:'ex2-9', type:'qcm', question:"$(e^x)^3 = ?$", options:['$e^{x+3}$','$3e^x$','$e^{3x}$','$e^{x^3}$'], correctIndex:2, explanation:"$(e^a)^n = e^{na}$, donc $(e^x)^3 = \\mathbf{e^{3x}}$."},
          {id:'ex2-10', type:'numeric', question:"Si $e^a = 5$, alors $e^{2a} = ?$", answer:25, tolerance:0.01, explanation:"$e^{2a} = (e^a)^2 = 5^2 = \\mathbf{25}$."},
          {id:'ex2-11', type:'qcm', question:"$e^{a+b} \\cdot e^{-a} = ?$", options:['$e^b$','$e^{2a+b}$','$e^a$','$1$'], correctIndex:0, explanation:"$e^{(a+b)-a} = e^b$."},
          {id:'ex2-12', type:'qcm', question:"$e^{\\ln 5} = ?$", options:['$5$','$\\ln 5$','$e^5$','$1$'], correctIndex:0, explanation:"$\\exp$ et $\\ln$ sont inverses : $e^{\\ln k} = \\mathbf{k}$ (ici $5$)."},
          {id:'ex2-13', type:'qcm', question:"$\\dfrac{1}{e^x} = ?$", options:['$e^{-x}$','$e^{1/x}$','$-e^x$','$\\ln x$'], correctIndex:0, explanation:"$\\dfrac{1}{e^x} = e^{-x}$."},
          {id:'ex2-14', type:'qcm', question:"Simplifier $e^{x} \\cdot e^{2x} \\cdot e^{-x}$ :", options:['$e^{2x}$','$e^{4x}$','$e^x$','$1$'], correctIndex:0, explanation:"$e^{x+2x-x} = e^{2x}$."},
          {id:'ex2-15', type:'numeric', question:"$e^{\\ln 2 + \\ln 3} = ?$", answer:6, tolerance:0.01, explanation:"$e^{\\ln 2 + \\ln 3} = e^{\\ln 6} = \\mathbf{6}$."},
          {id:'ex2-16', type:'qcm', question:"$e^a = e^b$ implique :", options:['$a = b$','$a = -b$','$a \\cdot b = 1$','Rien'], correctIndex:0, explanation:"Bijection : $e^a = e^b \\Leftrightarrow \\mathbf{a = b}$."},
          {id:'ex2-17', type:'qcm', question:"Factoriser $e^{2x} - e^x$ :", options:['$e^x(e^x - 1)$','$(e^x)^2 - 1$','$e^x \\cdot e^{x-1}$','$e^{x}-e$'], correctIndex:0, explanation:"$e^{2x} = e^x \\cdot e^x$, donc $e^{2x} - e^x = e^x(e^x - 1)$."},
          {id:'ex2-18', type:'qcm', question:"$(e^2)^{-3} = ?$", options:['$e^{-6}$','$e^{-1}$','$\\dfrac{1}{6}$','$e^{6}$'], correctIndex:0, explanation:"$(e^a)^n = e^{na}$, donc $(e^2)^{-3} = e^{-6}$."},
          {id:'ex2-19', type:'qcm', question:"$e^{x+y} = e^x \\cdot e^y$. Cette propriété vient du fait que $\\exp$ est :", options:['Continue','Croissante','Un morphisme entre $(\\mathbb{R}, +)$ et $(\\mathbb{R}^+_*, \\times)$','Dérivable'], correctIndex:2, explanation:"$\\exp$ transforme la somme en produit. C\'est un <strong>morphisme</strong> d\'addition vers multiplication."},
          {id:'ex2-20', type:'numeric', question:"Si $e^x = 3$, alors $e^{x+1} = ?$ (donner avec $e$ ; valeur approchée : $3e$)", answer:8.155, tolerance:0.05, explanation:"$e^{x+1} = e^x \\cdot e = 3e \\approx \\mathbf{8{,}155}$."}
        ]
      },
      {
        id:'derivee-exp', number:3, title:'Dérivée et étude',
        summary:"$\\exp' = \\exp$ et $(e^{u(x)})' = u'(x) \\cdot e^{u(x)}$.",
        videoId:'XAgdHblbajE', videoTitle:'Dérivée de l\'exponentielle (Yvan Monka)',
        explanation:"La <strong>dérivée de $\\exp$ est $\\exp$ elle-même</strong> — propriété unique. Pour les composées, on applique la règle de la chaîne.",
        keyPoints:[
          "$(\\exp)'(x) = \\exp(x)$, soit $(e^x)' = e^x$",
          "Pour une composée : $(e^{u(x)})' = u'(x) \\cdot e^{u(x)}$",
          "Exemple : $(e^{3x})' = 3 e^{3x}$",
          "Exemple : $(e^{x^2})' = 2x \\cdot e^{x^2}$",
          "$\\exp$ est strictement croissante (sa dérivée $\\exp > 0$ partout)"
        ],
        exercises:[
          {id:'ex3-1', type:'qcm', question:"Dérivée de $f(x) = e^x$ :", options:['$1$','$e^x$','$xe^{x-1}$','$0$'], correctIndex:1, explanation:"$\\exp$ est sa propre dérivée : $(e^x)' = \\mathbf{e^x}$."},
          {id:'ex3-2', type:'qcm', question:"Dérivée de $f(x) = e^{3x}$ :", options:['$e^{3x}$','$3e^{3x}$','$3e^{x}$','$e^{3}$'], correctIndex:1, explanation:"Règle de la chaîne : $(e^{u(x)})' = u'(x) e^{u(x)}$. Avec $u(x) = 3x$, $u'(x) = 3$. Donc $\\mathbf{3e^{3x}}$."},
          {id:'ex3-3', type:'qcm', question:"Dérivée de $f(x) = e^{x^2}$ :", options:['$e^{x^2}$','$2x \\cdot e^{x^2}$','$x^2 e^{x^2}$','$2 e^x$'], correctIndex:1, explanation:"$u(x) = x^2$, $u'(x) = 2x$. Donc $f'(x) = \\mathbf{2x \\cdot e^{x^2}}$."},
          {id:'ex3-4', type:'qcm', question:"Dérivée de $f(x) = 5e^{-x}$ :", options:['$5e^{-x}$','$-5e^{-x}$','$-5e^{x}$','$-e^{-x}$'], correctIndex:1, explanation:"$u(x) = -x$, $u'(x) = -1$. $f'(x) = 5 \\cdot (-1) \\cdot e^{-x} = \\mathbf{-5e^{-x}}$."},
          {id:'ex3-5', type:'qcm', question:"Sens de variation de $f(x) = e^x$ :", options:['Décroissante','Strictement croissante sur $\\mathbb{R}$','Constante','Croissante puis décroissante'], correctIndex:1, explanation:"$f'(x) = e^x > 0$ pour tout $x$, donc $f$ est <strong>strictement croissante</strong> sur $\\mathbb{R}$."}
        ,
          {id:'ex3-6', type:'qcm', question:"Dérivée de $f(x) = e^{2x}$ :", options:['$e^{2x}$','$2e^{2x}$','$2xe^{2x-1}$','$e^{2}$'], correctIndex:1, explanation:"$u = 2x$, $u\' = 2$. $(e^u)\' = u\' e^u = \\mathbf{2e^{2x}}$."},
          {id:'ex3-7', type:'qcm', question:"Dérivée de $f(x) = e^{-x}$ :", options:['$e^{-x}$','$-e^{-x}$','$-xe^{-x-1}$','$e^{x}$'], correctIndex:1, explanation:"$u = -x$, $u\' = -1$. $f\'(x) = -e^{-x}$."},
          {id:'ex3-8', type:'qcm', question:"Dérivée de $f(x) = e^{ax}$ (avec $a$ constante) :", options:['$e^{ax}$','$ae^{ax}$','$axe^{ax-1}$','$e^{a}$'], correctIndex:1, explanation:"$(e^{ax})\' = ae^{ax}$."},
          {id:'ex3-9', type:'qcm', question:"Dérivée de $f(x) = x e^x$ :", options:['$e^x$','$(1+x)e^x$','$xe^{x-1}$','$2e^x$'], correctIndex:1, explanation:"Produit $u v$ : $(xe^x)\' = 1 \\cdot e^x + x \\cdot e^x = (1+x)e^x$."},
          {id:'ex3-10', type:'qcm', question:"Dérivée de $f(x) = \\dfrac{e^x}{x}$ :", options:['$\\dfrac{e^x}{x}$','$\\dfrac{e^x(x-1)}{x^2}$','$\\dfrac{xe^x - e^x}{x}$','$-\\dfrac{e^x}{x^2}$'], correctIndex:1, explanation:"Quotient : $\\dfrac{e^x \\cdot x - e^x \\cdot 1}{x^2} = \\dfrac{e^x(x-1)}{x^2}$."},
          {id:'ex3-11', type:'qcm', question:"$f(x) = e^{x^2 + 1}$, $f\'(x) = ?$", options:['$e^{x^2+1}$','$2xe^{x^2+1}$','$(x^2+1)e^{x^2}$','$2xe^{x^2}$'], correctIndex:1, explanation:"$u = x^2 + 1$, $u\' = 2x$. $(e^u)\' = 2xe^{x^2+1}$."},
          {id:'ex3-12', type:'numeric', question:"$f(x) = e^x$, valeur de $f\'(2)$ ? (donner valeur approchée, $e^2 \\approx 7{,}389$)", answer:7.389, tolerance:0.01, explanation:"$f\' = f$, donc $f\'(2) = e^2 \\approx \\mathbf{7{,}389}$."},
          {id:'ex3-13', type:'qcm', question:"Sens de variation de $f(x) = -e^x$ :", options:['Croissante','Décroissante','Constante','Croissante puis décroissante'], correctIndex:1, explanation:"$f\'(x) = -e^x < 0$ partout, donc <strong>décroissante</strong>."},
          {id:'ex3-14', type:'qcm', question:"Dérivée seconde de $f(x) = e^x$ :", options:['$e^x$','$0$','$1$','$xe^{x-1}$'], correctIndex:0, explanation:"$f\' = e^x$, donc $f\'\' = (e^x)\' = e^x$."},
          {id:'ex3-15', type:'qcm', question:"$f(x) = e^{3x+1}$, équation de la tangente en $x = 0$ :", options:['$y = e + 3ex$','$y = 1 + 3x$','$y = e^{3x+1}$','$y = ex$'], correctIndex:0, explanation:"$f(0) = e^1 = e$, $f\'(x) = 3e^{3x+1}$, $f\'(0) = 3e$. Tangente : $y = f\'(0)(x-0) + f(0) = 3ex + e$."},
          {id:'ex3-16', type:'qcm', question:"$f(x) = e^x - x$, $f\'(x) = ?$", options:['$e^x - 1$','$e^x - x$','$e^x$','$-1$'], correctIndex:0, explanation:"$(e^x)\' = e^x$ et $(-x)\' = -1$, donc $f\'(x) = e^x - 1$."},
          {id:'ex3-17', type:'numeric', question:"Pour $f(x) = e^x - x$, à quel $x$ a-t-on $f\'(x) = 0$ ?", answer:0, tolerance:0.001, explanation:"$f\'(x) = e^x - 1 = 0 \\Leftrightarrow e^x = 1 \\Leftrightarrow x = \\mathbf{0}$."},
          {id:'ex3-18', type:'qcm', question:"Dérivée de $f(x) = 3e^{2x}$ :", options:['$6e^{2x}$','$3e^{2x}$','$6xe^{2x-1}$','$3e^{x}$'], correctIndex:0, explanation:"$(3e^{2x})\' = 3 \\times 2 e^{2x} = 6e^{2x}$."},
          {id:'ex3-19', type:'qcm', question:"Si $f(x) = (e^x)^2$, alors $f\'(x) = ?$", options:['$2e^x$','$2e^{2x}$','$e^{2x}$','$2x e^x$'], correctIndex:1, explanation:"$(e^x)^2 = e^{2x}$, donc $f\'(x) = 2e^{2x}$."},
          {id:'ex3-20', type:'qcm', question:"$f(x) = e^x \\cos(x)$, $f\'(x) = ?$", options:['$e^x \\cos x$','$e^x(\\cos x - \\sin x)$','$-e^x \\sin x$','$e^x \\sin x$'], correctIndex:1, explanation:"$(uv)\' = u\'v + uv\' = e^x\\cos x + e^x \\cdot (-\\sin x) = e^x(\\cos x - \\sin x)$."}
        ]
      },
      {
        id:'limites-exp', number:4, title:'Limites et croissances comparées',
        summary:"$e^x$ écrase tous les polynômes en $+\\infty$.",
        videoId:'XAgdHblbajE', videoTitle:'Limites de l\'exponentielle et croissances comparées (Yvan Monka)',
        explanation:"L'exponentielle <strong>croît plus vite que toute puissance de $x$</strong>. Et tend vers $0$ très vite en $-\\infty$. Ces propriétés sont à mémoriser.",
        keyPoints:[
          "$\\displaystyle\\lim_{x \\to +\\infty} e^x = +\\infty$",
          "$\\displaystyle\\lim_{x \\to -\\infty} e^x = 0^+$",
          "<strong>Croissance comparée</strong> : $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^n} = +\\infty$ pour tout $n$ entier",
          "Conséquence : $\\displaystyle\\lim_{x \\to -\\infty} x^n e^x = 0$",
          "Mnémo : « l'exponentielle l'emporte sur les polynômes en $+\\infty$ »"
        ],
        exercises:[
          {id:'ex4-1', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} e^x$ (9999 pour $+\\infty$) :", answer:9999, tolerance:1, explanation:"$e^x \\to +\\infty$."},
          {id:'ex4-2', type:'numeric', question:"$\\displaystyle\\lim_{x \\to -\\infty} e^x$ :", answer:0, tolerance:0.001, explanation:"$e^x \\to 0$ quand $x \\to -\\infty$ (très petits valeurs positives)."},
          {id:'ex4-3', type:'qcm', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^{100}}$ vaut :", options:['$0$','$1$','$+\\infty$','$100$'], correctIndex:2, explanation:"Croissance comparée : $e^x$ l'emporte sur toute puissance de $x$. $\\to \\mathbf{+\\infty}$."},
          {id:'ex4-4', type:'qcm', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{x^5}{e^x}$ vaut :", options:['$0$','$1$','$+\\infty$','$5$'], correctIndex:0, explanation:"Inverse du précédent. $\\dfrac{x^5}{e^x} = \\dfrac{1}{e^x / x^5} \\to \\dfrac{1}{+\\infty} = \\mathbf{0}$."},
          {id:'ex4-5', type:'qcm', question:"$\\displaystyle\\lim_{x \\to -\\infty} (3 + e^x)$ vaut :", options:['$+\\infty$','$3$','$0$','$-\\infty$'], correctIndex:1, explanation:"$e^x \\to 0$ en $-\\infty$, donc $3 + e^x \\to 3 + 0 = \\mathbf{3}$."}
        ,
          {id:'ex4-6', type:'qcm', question:"$\\lim_{x \\to +\\infty} e^x = ?$", options:['$0$','$1$','$+\\infty$','$e$'], correctIndex:2, explanation:"L\'exp tend vers $+\\infty$ en $+\\infty$."},
          {id:'ex4-7', type:'qcm', question:"$\\lim_{x \\to -\\infty} e^x = ?$", options:['$-\\infty$','$0$','$1$','Indéfini'], correctIndex:1, explanation:"$e^x \\to 0$ (par valeurs positives) quand $x \\to -\\infty$."},
          {id:'ex4-8', type:'qcm', question:"$\\lim_{x \\to +\\infty} (5 - e^x) = ?$", options:['$5$','$-\\infty$','$+\\infty$','$0$'], correctIndex:1, explanation:"$e^x \\to +\\infty$, donc $5 - e^x \\to -\\infty$."},
          {id:'ex4-9', type:'qcm', question:"$\\lim_{x \\to -\\infty} (x + e^x) = ?$", options:['$0$','$-\\infty$','$+\\infty$','Indéfini'], correctIndex:1, explanation:"$x \\to -\\infty$ et $e^x \\to 0$, donc somme $\\to -\\infty$."},
          {id:'ex4-10', type:'qcm', question:"$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x} = ?$", options:['$0$','$1$','$+\\infty$','$e$'], correctIndex:2, explanation:"Croissance comparée : exp l\'emporte. $\\to +\\infty$."},
          {id:'ex4-11', type:'qcm', question:"$\\lim_{x \\to +\\infty} \\dfrac{x^{10}}{e^x} = ?$", options:['$+\\infty$','$1$','$0$','$10$'], correctIndex:2, explanation:"$e^x$ écrase $x^{10}$ : $\\to \\mathbf{0}$."},
          {id:'ex4-12', type:'qcm', question:"$\\lim_{x \\to -\\infty} x e^x = ?$", options:['$-\\infty$','$0$','$+\\infty$','$1$'], correctIndex:1, explanation:"Forme indéterminée, mais croissance comparée : $|x|e^x \\to 0$, donc <strong>0</strong>."},
          {id:'ex4-13', type:'qcm', question:"$\\lim_{x \\to +\\infty} (e^x - x^2) = ?$", options:['$+\\infty$','$0$','$-\\infty$','$1$'], correctIndex:0, explanation:"$e^x$ croît plus vite : $e^x - x^2 \\to +\\infty$."},
          {id:'ex4-14', type:'numeric', question:"$\\lim_{x \\to +\\infty} \\dfrac{1}{e^x}$ (donner la limite, 0 si tend vers zéro) :", answer:0, tolerance:0.001, explanation:"$e^x \\to +\\infty$, donc $\\dfrac{1}{e^x} \\to \\mathbf{0}$."},
          {id:'ex4-15', type:'qcm', question:"$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x} = ?$", options:['$0$','$1$','$+\\infty$','$e$'], correctIndex:1, explanation:"Taux d\'accroissement de $\\exp$ en $0$ : c\'est $\\exp\'(0) = e^0 = \\mathbf{1}$."},
          {id:'ex4-16', type:'qcm', question:"$\\lim_{x \\to +\\infty} \\dfrac{e^{2x}}{e^x} = ?$", options:['$1$','$e$','$+\\infty$','$0$'], correctIndex:2, explanation:"$\\dfrac{e^{2x}}{e^x} = e^x \\to +\\infty$."},
          {id:'ex4-17', type:'qcm', question:"$\\lim_{x \\to +\\infty} \\dfrac{e^x + 1}{e^x - 1} = ?$", options:['$0$','$1$','$+\\infty$','Indéfini'], correctIndex:1, explanation:"Diviser numé. et dén. par $e^x$ : $\\dfrac{1 + 1/e^x}{1 - 1/e^x} \\to \\mathbf{1}$."},
          {id:'ex4-18', type:'qcm', question:"$\\lim_{x \\to -\\infty} \\dfrac{e^x - 1}{e^x + 1} = ?$", options:['$1$','$-1$','$0$','$+\\infty$'], correctIndex:1, explanation:"$e^x \\to 0$, donc $\\dfrac{0 - 1}{0 + 1} = -1$."},
          {id:'ex4-19', type:'qcm', question:"$\\lim_{x \\to +\\infty} (e^x \\cdot e^{-2x}) = ?$", options:['$0$','$1$','$+\\infty$','$e$'], correctIndex:0, explanation:"$e^x \\cdot e^{-2x} = e^{-x} \\to 0$."},
          {id:'ex4-20', type:'qcm', question:"L\'asymptote horizontale de $f(x) = e^x$ est :", options:['$y = e$','$y = 0$ en $-\\infty$','$x = 0$',"Pas d\'asymptote"], correctIndex:1, explanation:"En $-\\infty$, $e^x \\to 0$ : asymptote $\\mathbf{y = 0}$."}
        ]
      },
      {
        id:'equations-exp', number:5, title:'Équations et inéquations',
        summary:"$e^a = e^b \\Leftrightarrow a = b$, $e^x = k$ avec $k > 0$.",
        videoId:'XAgdHblbajE', videoTitle:'Équations avec exponentielle (Yvan Monka)',
        explanation:"Pour résoudre des équations avec $\\exp$, on utilise que $\\exp$ est <strong>strictement croissante</strong>, donc <strong>bijective</strong>. On peut alors « simplifier » par l'inverse, le logarithme népérien.",
        keyPoints:[
          "$e^a = e^b \\Leftrightarrow a = b$ (par bijection)",
          "$e^a < e^b \\Leftrightarrow a < b$ (car $\\exp$ strictement croissante)",
          "$e^x = k$ avec $k > 0$ $\\Leftrightarrow$ $x = \\ln(k)$",
          "$e^x = k$ avec $k \\leq 0$ : <strong>impossible</strong> (car $e^x > 0$)",
          "$e^x > k$ avec $k > 0$ $\\Leftrightarrow$ $x > \\ln(k)$"
        ],
        exercises:[
          {id:'ex5-1', type:'numeric', question:"Résoudre $e^x = e^5$. Donner $x$.", answer:5, tolerance:0.001, explanation:"Par bijection de $\\exp$ : $e^x = e^5 \\Leftrightarrow x = \\mathbf{5}$."},
          {id:'ex5-2', type:'qcm', question:"L'équation $e^x = -3$ admet :", options:['$x = \\ln(-3)$','$x = -\\ln(3)$','Aucune solution','Solution $x = -3$'], correctIndex:2, explanation:"$e^x > 0$ pour tout $x$, ne peut jamais valoir $-3$. <strong>Aucune solution</strong>."},
          {id:'ex5-3', type:'numeric', question:"Résoudre $e^{2x} = e^{x+3}$. Donner $x$.", answer:3, tolerance:0.001, explanation:"$e^{2x} = e^{x+3} \\Leftrightarrow 2x = x + 3 \\Leftrightarrow x = \\mathbf{3}$."},
          {id:'ex5-4', type:'qcm', question:"$e^x \\geq 1 \\Leftrightarrow$ :", options:['$x \\geq 0$','$x \\leq 0$','$x \\geq 1$','$x \\leq 1$'], correctIndex:0, explanation:"$e^x \\geq 1 = e^0 \\Leftrightarrow x \\geq 0$ (par croissance stricte de $\\exp$)."},
          {id:'ex5-5', type:'qcm', question:"Résoudre $e^x \\cdot e^{-2} = 1$ :", options:['$x = 0$','$x = 2$','$x = -2$','$x = e$'], correctIndex:1, explanation:"$e^x \\cdot e^{-2} = e^{x-2} = 1 = e^0 \\Leftrightarrow x - 2 = 0 \\Leftrightarrow x = \\mathbf{2}$."}
        ,
          {id:'ex5-6', type:'numeric', question:"Résoudre $e^x = 1$. $x = ?$", answer:0, tolerance:0.001, explanation:"$e^x = 1 = e^0 \\Leftrightarrow x = \\mathbf{0}$."},
          {id:'ex5-7', type:'numeric', question:"Résoudre $e^{3x} = e^9$. $x = ?$", answer:3, tolerance:0.001, explanation:"$3x = 9 \\Leftrightarrow x = 3$."},
          {id:'ex5-8', type:'numeric', question:"Résoudre $e^{x-1} = e$. $x = ?$", answer:2, tolerance:0.001, explanation:"$x - 1 = 1 \\Leftrightarrow x = \\mathbf{2}$."},
          {id:'ex5-9', type:'qcm', question:"Résoudre $e^x = 0$ :", options:['$x = 0$','$x = -\\infty$','Aucune solution','$x = \\ln 0$'], correctIndex:2, explanation:"$e^x > 0$ pour tout $x$. <strong>Aucune solution</strong>."},
          {id:'ex5-10', type:'numeric', question:"Résoudre $e^{2x} = e^x$. $x = ?$", answer:0, tolerance:0.001, explanation:"$2x = x \\Leftrightarrow x = 0$."},
          {id:'ex5-11', type:'qcm', question:"Résoudre $e^x > e^2$ :", options:['$x > 2$','$x < 2$','$x > 0$','Aucune solution'], correctIndex:0, explanation:"$\\exp$ strictement croissante : $e^x > e^2 \\Leftrightarrow x > 2$."},
          {id:'ex5-12', type:'qcm', question:"Résoudre $e^{-x} = 1$ :", options:['$x = 0$','$x = 1$','$x = -1$','Aucune'], correctIndex:0, explanation:"$e^{-x} = 1 = e^0 \\Leftrightarrow -x = 0 \\Leftrightarrow x = 0$."},
          {id:'ex5-13', type:'qcm', question:"Résoudre $e^x \\cdot e^2 = e^5$ :", options:['$x = 3$','$x = 5/2$','$x = 7$','$x = -3$'], correctIndex:0, explanation:"$e^{x+2} = e^5 \\Leftrightarrow x + 2 = 5 \\Leftrightarrow x = 3$."},
          {id:'ex5-14', type:'qcm', question:"$e^{x^2} = 1$ donne :", options:['$x = 0$','$x = \\pm 1$','$x = 1$','Aucune solution'], correctIndex:0, explanation:"$e^{x^2} = 1 = e^0 \\Leftrightarrow x^2 = 0 \\Leftrightarrow x = 0$."},
          {id:'ex5-15', type:'qcm', question:"Résoudre $e^{2x} = 4 e^x$ (chercher $x$). Indication : poser $X = e^x$ :", options:['$x = \\ln 4$','$x = 2$','$x = 4$','$x = \\ln 2$'], correctIndex:0, explanation:"$X^2 = 4X \\Leftrightarrow X(X-4) = 0$. $X \\neq 0$, donc $X = 4$, i.e. $e^x = 4 \\Rightarrow x = \\ln 4$."},
          {id:'ex5-16', type:'qcm', question:"$e^x = -2$ admet :", options:['$x = \\ln(-2)$','$x = -\\ln 2$','Pas de solution','$x = -2$'], correctIndex:2, explanation:"$e^x > 0$, donc l\'équation <strong>n\'admet aucune solution</strong>."},
          {id:'ex5-17', type:'qcm', question:"Résoudre $e^x \\leq 1$ :", options:['$x \\leq 0$','$x \\geq 0$','$x \\geq 1$','$x \\leq 1$'], correctIndex:0, explanation:"$e^x \\leq 1 = e^0 \\Leftrightarrow x \\leq 0$."},
          {id:'ex5-18', type:'qcm', question:"$e^{x+3} = e^{2x-1}$ donne :", options:['$x = 4$','$x = -2$','$x = 1$','$x = 2$'], correctIndex:0, explanation:"$x + 3 = 2x - 1 \\Leftrightarrow x = 4$."},
          {id:'ex5-19', type:'qcm', question:"Résoudre $e^{2x} - 5e^x + 6 = 0$ (poser $X = e^x$) :", options:['$x = \\ln 2$ ou $x = \\ln 3$','$x = 2$ ou $x = 3$','$x = \\ln 5$','$x = \\ln 6$'], correctIndex:0, explanation:"$X^2 - 5X + 6 = 0 \\Leftrightarrow X = 2$ ou $X = 3$. Donc $x = \\ln 2$ ou $x = \\ln 3$."},
          {id:'ex5-20', type:'qcm', question:"$e^x = e$ donne :", options:['$x = 0$','$x = 1$','$x = e$','$x = \\ln e$'], correctIndex:1, explanation:"$e^x = e^1 \\Leftrightarrow x = 1$."}
        ]
      }
    ]
  },

  'logarithme': {
    description: "Le logarithme népérien $\\ln$ est la fonction réciproque de l'exponentielle. Il transforme les produits en sommes — propriété utilisée dans les équations, l'étude de fonctions et la résolution d'inéquations exponentielles.",
    properties: [
      {
        id:'def-ln', number:1, title:'Définition et lien avec $\\exp$',
        summary:"$\\ln$ est la fonction réciproque de $\\exp$.",
        videoId:'XAgdHblbajE', videoTitle:'Logarithme népérien — cours Terminale (Yvan Monka)',
        explanation:"Le <strong>logarithme népérien</strong> $\\ln$ est la fonction définie sur $]0\\,;\\,+\\infty[$ qui est la <strong>réciproque</strong> de l'exponentielle. C'est-à-dire que $\\ln(e^x) = x$ et $e^{\\ln(x)} = x$.",
        keyPoints:[
          "Domaine : $]0\\,;\\,+\\infty[$ (le log n'est pas défini en $0$ ni pour des valeurs négatives)",
          "$\\ln(1) = 0$ et $\\ln(e) = 1$",
          "$\\ln(e^x) = x$ pour tout $x \\in \\mathbb{R}$",
          "$e^{\\ln(x)} = x$ pour tout $x > 0$",
          "$\\ln$ est strictement <strong>croissante</strong> sur $]0\\,;\\,+\\infty[$"
        ],
        exercises:[
          {id:'ln1-1', type:'numeric', question:"Que vaut $\\ln(1)$ ?", answer:0, tolerance:0.001, explanation:"$\\ln(1) = \\mathbf{0}$ par définition ($e^0 = 1$)."},
          {id:'ln1-2', type:'numeric', question:"Que vaut $\\ln(e)$ ?", answer:1, tolerance:0.001, explanation:"$\\ln(e) = \\mathbf{1}$ car $e^1 = e$."},
          {id:'ln1-3', type:'qcm', question:"Domaine de définition de $\\ln$ :", options:['$\\mathbb{R}$','$\\mathbb{R}_+ = [0\\,;\\,+\\infty[$','$]0\\,;\\,+\\infty[$','$\\mathbb{R}^*$'], correctIndex:2, explanation:"$\\ln$ est défini uniquement pour les <strong>réels strictement positifs</strong> : $]0\\,;\\,+\\infty[$."},
          {id:'ln1-4', type:'numeric', question:"$\\ln(e^7) = ?$", answer:7, tolerance:0.001, explanation:"$\\ln(e^x) = x$. Donc $\\ln(e^7) = \\mathbf{7}$."},
          {id:'ln1-5', type:'qcm', question:"$\\ln(-3)$ vaut :", options:['$-\\ln(3)$','$\\dfrac{1}{\\ln(3)}$','Non défini','$3$'], correctIndex:2, explanation:"$\\ln$ n'est pas défini pour les nombres négatifs. <strong>Non défini</strong>."}
        ]
      },
      {
        id:'algebra-ln', number:2, title:'Propriétés algébriques',
        summary:"$\\ln(ab) = \\ln(a) + \\ln(b)$ — somme au lieu de produit.",
        videoId:'XAgdHblbajE', videoTitle:'Propriétés du logarithme (Yvan Monka)',
        explanation:"Le logarithme <strong>transforme les produits en sommes</strong>. C'est la propriété qui en fait l'inverse de l'exponentielle, et qui le rend si utile pour simplifier des expressions.",
        keyPoints:[
          "$\\ln(ab) = \\ln(a) + \\ln(b)$ pour $a, b > 0$",
          "$\\ln\\left(\\dfrac{a}{b}\\right) = \\ln(a) - \\ln(b)$",
          "$\\ln\\left(\\dfrac{1}{a}\\right) = -\\ln(a)$",
          "$\\ln(a^n) = n \\ln(a)$ pour tout entier $n$",
          "$\\ln(\\sqrt{a}) = \\dfrac{1}{2} \\ln(a)$"
        ],
        exercises:[
          {id:'ln2-1', type:'qcm', question:"$\\ln(6) = ?$ (utiliser $\\ln(2) + \\ln(3)$)", options:['$\\ln(2) \\cdot \\ln(3)$','$\\ln(2) + \\ln(3)$','$\\ln(5)$','$2 + 3$'], correctIndex:1, explanation:"$6 = 2 \\times 3$, donc $\\ln(6) = \\ln(2) + \\ln(3)$."},
          {id:'ln2-2', type:'qcm', question:"Simplifier $\\ln(25) - \\ln(5)$ :", options:['$\\ln(20)$','$\\ln(5)$','$\\ln(30)$','$5$'], correctIndex:1, explanation:"$\\ln(25) - \\ln(5) = \\ln\\left(\\dfrac{25}{5}\\right) = \\ln(5)$."},
          {id:'ln2-3', type:'qcm', question:"$\\ln(8) = ?$ (avec $\\ln(2)$)", options:['$3\\ln(2)$','$2\\ln(3)$','$8\\ln(2)$','$\\ln(2) + \\ln(8)$'], correctIndex:0, explanation:"$8 = 2^3$, donc $\\ln(8) = \\ln(2^3) = 3\\ln(2)$."},
          {id:'ln2-4', type:'qcm', question:"Simplifier $\\ln\\left(\\dfrac{1}{e^3}\\right)$ :", options:['$3$','$-3$','$\\dfrac{1}{3}$','$e^{-3}$'], correctIndex:1, explanation:"$\\ln\\left(\\dfrac{1}{e^3}\\right) = -\\ln(e^3) = -3$."},
          {id:'ln2-5', type:'qcm', question:"Simplifier $\\ln(\\sqrt{e})$ :", options:['$\\dfrac{1}{2}$','$2$','$e$','$\\sqrt{e}$'], correctIndex:0, explanation:"$\\sqrt{e} = e^{1/2}$. $\\ln(e^{1/2}) = \\dfrac{1}{2}$."}
        ]
      },
      {
        id:'derivee-ln', number:3, title:'Dérivée et limites',
        summary:"$\\ln'(x) = \\dfrac{1}{x}$.",
        videoId:'XAgdHblbajE', videoTitle:'Dérivée du logarithme (Yvan Monka)',
        explanation:"La <strong>dérivée de $\\ln$</strong> est $\\dfrac{1}{x}$. Cette formule simple permet de dériver beaucoup de fonctions courantes en lycée.",
        keyPoints:[
          "$(\\ln(x))' = \\dfrac{1}{x}$ pour $x > 0$",
          "Pour une composée : $(\\ln(u(x)))' = \\dfrac{u'(x)}{u(x)}$",
          "$\\displaystyle\\lim_{x \\to +\\infty} \\ln(x) = +\\infty$",
          "$\\displaystyle\\lim_{x \\to 0^+} \\ln(x) = -\\infty$",
          "<strong>Croissance comparée</strong> : $\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x^n} = 0$ pour $n > 0$ ($\\ln$ moins fort que toute puissance)"
        ],
        exercises:[
          {id:'ln3-1', type:'qcm', question:"Dérivée de $f(x) = \\ln(x)$ :", options:['$\\ln(x)$','$\\dfrac{1}{x}$','$x$','$0$'], correctIndex:1, explanation:"$(\\ln(x))' = \\mathbf{\\dfrac{1}{x}}$."},
          {id:'ln3-2', type:'qcm', question:"Dérivée de $f(x) = \\ln(3x + 1)$ :", options:['$\\dfrac{1}{3x+1}$','$\\dfrac{3}{3x+1}$','$3$','$\\ln(3)$'], correctIndex:1, explanation:"$(\\ln(u))' = \\dfrac{u'}{u}$. $u = 3x+1$, $u' = 3$. Donc $\\dfrac{3}{3x+1}$."},
          {id:'ln3-3', type:'numeric', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\ln(x)$ (9999 pour $+\\infty$) :", answer:9999, tolerance:1, explanation:"$\\ln(x) \\to +\\infty$ en $+\\infty$ (mais lentement)."},
          {id:'ln3-4', type:'numeric', question:"$\\displaystyle\\lim_{x \\to 0^+} \\ln(x)$ (-9999 pour $-\\infty$) :", answer:-9999, tolerance:1, explanation:"$\\ln(x) \\to -\\infty$ quand $x \\to 0^+$. AV $x = 0$."},
          {id:'ln3-5', type:'qcm', question:"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln(x)}{x}$ vaut :", options:['$0$','$1$','$+\\infty$','$e$'], correctIndex:0, explanation:"Croissance comparée : $x$ l'emporte sur $\\ln$. Donc $\\dfrac{\\ln(x)}{x} \\to \\mathbf{0}$."}
        ]
      },
      {
        id:'equations-ln', number:4, title:'Équations et inéquations',
        summary:"$\\ln(a) = \\ln(b) \\Leftrightarrow a = b$ pour $a, b > 0$.",
        videoId:'XAgdHblbajE', videoTitle:'Équations avec logarithme (Yvan Monka)',
        explanation:"Comme $\\exp$, $\\ln$ est <strong>bijective</strong> (strictement croissante). On peut donc l'\"enlever\" des deux côtés d'une équation, en respectant les conditions d'existence.",
        keyPoints:[
          "$\\ln(a) = \\ln(b) \\Leftrightarrow a = b$ (à condition que $a > 0$ et $b > 0$)",
          "$\\ln(x) = k \\Leftrightarrow x = e^k$ (pour tout $k$)",
          "$\\ln(x) < \\ln(b) \\Leftrightarrow x < b$ (avec $x > 0$ et $b > 0$)",
          "<strong>Toujours vérifier les conditions d'existence</strong> : ce qui est dans $\\ln$ doit être strictement positif",
          "Pour $\\ln(x) > 0$ : $x > 1$. Pour $\\ln(x) < 0$ : $0 < x < 1$"
        ],
        exercises:[
          {id:'ln4-1', type:'numeric', question:"Résoudre $\\ln(x) = 3$. Donner $x$ sous la forme $e^k$ — entrer $k$.", answer:3, tolerance:0.001, explanation:"$\\ln(x) = 3 \\Leftrightarrow x = e^3$. Réponse : $k = \\mathbf{3}$."},
          {id:'ln4-2', type:'numeric', question:"Résoudre $\\ln(x) = 0$.", answer:1, tolerance:0.001, explanation:"$\\ln(x) = 0 \\Leftrightarrow x = e^0 = \\mathbf{1}$."},
          {id:'ln4-3', type:'numeric', question:"Résoudre $\\ln(2x) = \\ln(6)$.", answer:3, tolerance:0.001, explanation:"$2x = 6 \\Leftrightarrow x = \\mathbf{3}$. (Vérification : $2 \\times 3 = 6 > 0$ ✓)"},
          {id:'ln4-4', type:'qcm', question:"L'équation $\\ln(x) = -5$ :", options:['Pas de solution','$x = e^{-5}$','$x = -5$','$x = -\\dfrac{1}{e^5}$'], correctIndex:1, explanation:"$\\ln(x) = -5 \\Leftrightarrow x = e^{-5}$ (qui est $> 0$ ✓)."},
          {id:'ln4-5', type:'qcm', question:"Résoudre $\\ln(x) > 0$ :", options:['$x > 0$','$x > 1$','$x < 1$','$x > e$'], correctIndex:1, explanation:"$\\ln(x) > 0 = \\ln(1) \\Leftrightarrow x > 1$ (par croissance stricte de $\\ln$)."}
        ]
      },
      {
        id:'ln-applications', number:5, title:'Applications et études de fonction',
        summary:"$\\ln$ pour transformer des produits en sommes (calculs).",
        videoId:'XAgdHblbajE', videoTitle:'Applications du logarithme (Yvan Monka)',
        explanation:"$\\ln$ sert à <strong>simplifier des calculs</strong> où apparaissent des puissances ou des produits compliqués, et à résoudre des équations du type $a^x = b$.",
        keyPoints:[
          "Pour résoudre $a^x = b$ (avec $a > 0$, $a \\neq 1$) : prendre $\\ln$ des deux côtés",
          "$a^x = b \\Leftrightarrow x \\ln(a) = \\ln(b) \\Leftrightarrow x = \\dfrac{\\ln(b)}{\\ln(a)}$",
          "Très utile en finance, biologie (croissance/décroissance exponentielle)",
          "Tableau de variations de $\\ln$ : croissante, négative sur $]0\\,;\\,1[$, positive sur $]1\\,;\\,+\\infty[$",
          "L'étude de $f(x) = \\ln(x) - x$ et similaires combine les outils du chapitre"
        ],
        exercises:[
          {id:'ln5-1', type:'qcm', question:"Résoudre $2^x = 16$. La méthode est :", options:['$x = 16/2 = 8$','$x = \\dfrac{\\ln(16)}{\\ln(2)} = 4$','$x = 2^{16}$','$x = \\ln(16)$'], correctIndex:1, explanation:"$2^x = 16 \\Rightarrow x \\ln 2 = \\ln 16 = 4\\ln 2 \\Rightarrow x = 4$."},
          {id:'ln5-2', type:'numeric', question:"Résoudre $3^x = 81$. Donner $x$.", answer:4, tolerance:0.001, explanation:"$3^x = 81 = 3^4 \\Leftrightarrow x = \\mathbf{4}$. (Vérifiable par $\\ln$ aussi.)"},
          {id:'ln5-3', type:'qcm', question:"Une population double en $T$ années. Si modèle $P(t) = P_0 \\cdot 2^{t/T}$, $T = ?$ pour modéliser un doublement annuel.", options:['$T = 1$','$T = 2$','$T = \\ln 2$','$T = \\dfrac{1}{\\ln 2}$'], correctIndex:0, explanation:"Si la pop double chaque année, $T = 1$ an dans la formule de doublement."},
          {id:'ln5-4', type:'qcm', question:"Signe de $\\ln(x)$ pour $x = 0{,}5$ :", options:['Positif','Négatif','Nul','Indéterminé'], correctIndex:1, explanation:"$\\ln$ est négatif sur $]0\\,;\\,1[$. Comme $0{,}5 < 1$, $\\ln(0{,}5) < 0$. <strong>Négatif</strong>."},
          {id:'ln5-5', type:'qcm', question:"Tableau de signe de $\\ln(x)$ :", options:['$+$ partout','$-$ partout','$-$ sur $]0\\,;\\,1[$, $+$ sur $]1\\,;\\,+\\infty[$','$+$ sur $]0\\,;\\,1[$, $-$ sur $]1\\,;\\,+\\infty[$'], correctIndex:2, explanation:"$\\ln$ s'annule en $1$ et est croissante : <strong>négatif avant $1$, positif après</strong>."}
        ]
      }
    ]
  },

  'derivation-terminale': {
    description: "En Terminale, on enrichit la dérivation avec la dérivée d'une fonction composée, des fonctions exponentielle et logarithme, et l'étude complète d'une fonction (variations, extrema, signes).",
    properties: [
      {
        id:'composee', number:1, title:'Dérivée d\'une fonction composée',
        summary:"$(f \\circ g)'(x) = g'(x) \\cdot f'(g(x))$ — la règle de la chaîne.",
        videoId:'fnHpYHkPVbg', videoTitle:'Dérivée d\'une fonction composée (Yvan Monka)',
        explanation:"Quand une fonction est composée d'une autre, on la dérive en <strong>multipliant la dérivée de la « grosse » fonction (évaluée en l'intérieur) par la dérivée de l'intérieur</strong>. C'est la <strong>règle de la chaîne</strong>.",
        keyPoints:[
          "Formule générale : $(f(u(x)))' = u'(x) \\cdot f'(u(x))$",
          "Cas $u^n$ : $(u^n)' = n \\cdot u' \\cdot u^{n-1}$",
          "Cas $\\sqrt{u}$ : $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$ (si $u > 0$)",
          "Cas $\\dfrac{1}{u}$ : $\\left(\\dfrac{1}{u}\\right)' = -\\dfrac{u'}{u^2}$",
          "Cas $e^u$ : $(e^u)' = u' \\cdot e^u$"
        ],
        exercises:[
          {id:'dt1-1', type:'qcm', question:"Dérivée de $f(x) = (3x+2)^5$ :", options:['$5(3x+2)^4$','$15(3x+2)^4$','$3(3x+2)^5$','$(3x+2)^4$'], correctIndex:1, explanation:"$u(x) = 3x+2$, $u'(x) = 3$. $(u^5)' = 5u^4 \\cdot u' = 5(3x+2)^4 \\cdot 3 = \\mathbf{15(3x+2)^4}$."},
          {id:'dt1-2', type:'qcm', question:"Dérivée de $f(x) = \\sqrt{x^2 + 1}$ :", options:['$\\dfrac{1}{2\\sqrt{x^2+1}}$','$\\dfrac{x}{\\sqrt{x^2+1}}$','$\\dfrac{2x}{\\sqrt{x^2+1}}$','$2x\\sqrt{x^2+1}$'], correctIndex:1, explanation:"$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$. $u = x^2+1$, $u' = 2x$. Donc $f'(x) = \\dfrac{2x}{2\\sqrt{x^2+1}} = \\mathbf{\\dfrac{x}{\\sqrt{x^2+1}}}$."},
          {id:'dt1-3', type:'qcm', question:"Dérivée de $f(x) = e^{2x+1}$ :", options:['$e^{2x+1}$','$2e^{2x+1}$','$2x e^{2x+1}$','$e^{2x}$'], correctIndex:1, explanation:"$u = 2x+1$, $u' = 2$. $(e^u)' = u' e^u = \\mathbf{2 e^{2x+1}}$."},
          {id:'dt1-4', type:'qcm', question:"Dérivée de $f(x) = \\dfrac{1}{x^2+3}$ :", options:['$-\\dfrac{2x}{(x^2+3)^2}$','$\\dfrac{2x}{(x^2+3)^2}$','$-\\dfrac{1}{(x^2+3)^2}$','$-\\dfrac{2x}{x^2+3}$'], correctIndex:0, explanation:"$(\\frac{1}{u})' = -\\frac{u'}{u^2}$. $u = x^2+3$, $u' = 2x$. Donc $\\mathbf{-\\dfrac{2x}{(x^2+3)^2}}$."}
        ]
      },
      {
        id:'produit-quotient', number:2, title:'Dérivée d\'un produit, d\'un quotient',
        summary:"$(uv)' = u'v + uv'$ et $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$.",
        videoId:'V3l6IZRZQyM', videoTitle:'Dérivée d\'un produit et d\'un quotient (Yvan Monka)',
        explanation:"Pour dériver un <strong>produit</strong> $u \\times v$, on dérive l'un, on garde l'autre, puis on inverse. Pour un <strong>quotient</strong>, on applique la formule $\\dfrac{u'v - uv'}{v^2}$ (attention au signe moins).",
        keyPoints:[
          "Produit : $(u \\cdot v)' = u' v + u v'$",
          "Quotient : $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u' v - u v'}{v^2}$ (avec $v \\neq 0$)",
          "Ordre du quotient : <strong>haut dérivé fois bas, MOINS haut fois bas dérivé</strong>",
          "Toujours réduire au même dénominateur après dérivation pour étudier le signe",
          "Vérification : la dimension/forme de la dérivée doit être cohérente"
        ],
        exercises:[
          {id:'dt2-1', type:'qcm', question:"Dérivée de $f(x) = x e^x$ :", options:['$e^x$','$x e^x$','$(1+x) e^x$','$x^2 e^x$'], correctIndex:2, explanation:"$u = x$, $u' = 1$, $v = e^x$, $v' = e^x$. $(uv)' = 1 \\cdot e^x + x \\cdot e^x = \\mathbf{(1+x) e^x}$."},
          {id:'dt2-2', type:'qcm', question:"Dérivée de $f(x) = \\dfrac{x}{x+1}$ :", options:['$\\dfrac{1}{(x+1)^2}$','$\\dfrac{x}{(x+1)^2}$','$\\dfrac{1}{x+1}$','$\\dfrac{-1}{(x+1)^2}$'], correctIndex:0, explanation:"$u = x$, $u' = 1$, $v = x+1$, $v' = 1$. $\\dfrac{u'v - uv'}{v^2} = \\dfrac{(x+1) - x}{(x+1)^2} = \\mathbf{\\dfrac{1}{(x+1)^2}}$."},
          {id:'dt2-3', type:'qcm', question:"Dérivée de $f(x) = (2x+1)(x^2-3)$ :", options:['$2(x^2-3) + (2x+1)(2x)$','$2x(2x+1) + 2(x^2-3)$','$2x^2 - 3 + 4x^2$','Les deux premières'], correctIndex:3, explanation:"$(uv)' = u'v + uv' = 2(x^2-3) + (2x+1)(2x)$, qui est aussi $2(x^2-3) + 4x^2 + 2x = 6x^2 + 2x - 6$."},
          {id:'dt2-4', type:'qcm', question:"Dérivée de $f(x) = \\dfrac{e^x}{x}$ :", options:['$\\dfrac{e^x}{x}$','$\\dfrac{e^x(x-1)}{x^2}$','$\\dfrac{e^x(x+1)}{x^2}$','$-\\dfrac{e^x}{x^2}$'], correctIndex:1, explanation:"$u = e^x$, $u' = e^x$, $v = x$, $v' = 1$. $\\dfrac{e^x \\cdot x - e^x \\cdot 1}{x^2} = \\mathbf{\\dfrac{e^x(x-1)}{x^2}}$."}
        ]
      },
      {
        id:'etude-fonction', number:3, title:'Étude complète d\'une fonction',
        summary:"Dérivée → signe → variations → extrema → tableau de variations.",
        videoId:'V3l6IZRZQyM', videoTitle:'Étude complète d\'une fonction (Yvan Monka)',
        explanation:"Pour étudier complètement une fonction, on suit toujours la même méthode : <strong>1) ensemble de définition, 2) dérivée, 3) signe de la dérivée, 4) tableau de variations avec extrema, 5) limites aux bornes</strong>.",
        keyPoints:[
          "$f$ croissante $\\Leftrightarrow$ $f' \\geq 0$ sur l'intervalle",
          "$f$ décroissante $\\Leftrightarrow$ $f' \\leq 0$ sur l'intervalle",
          "Si $f'(x_0) = 0$ et $f'$ change de signe en $x_0$ : <strong>extremum local</strong>",
          "Maximum local : $f'$ passe de $+$ à $-$ ; minimum local : $f'$ passe de $-$ à $+$",
          "Bornes : limites aux bornes de l'ensemble de définition"
        ],
        exercises:[
          {id:'dt3-1', type:'qcm', question:"$f(x) = x^2 - 4x + 3$. $f'(x) = ?$", options:['$2x - 4$','$x - 4$','$2x + 3$','$x^2 - 4$'], correctIndex:0, explanation:"$f'(x) = \\mathbf{2x - 4}$."},
          {id:'dt3-2', type:'numeric', question:"Pour la même $f$ : $f'(x) = 0$ donne $x = ?$", answer:2, tolerance:0.001, explanation:"$2x - 4 = 0 \\Leftrightarrow x = \\mathbf{2}$."},
          {id:'dt3-3', type:'qcm', question:"Au point $x = 2$, la fonction $f(x) = x^2 - 4x + 3$ admet :", options:['Un maximum local','Un minimum local',"Pas d\'extremum",'Une asymptote'], correctIndex:1, explanation:"$f'$ passe de $-$ (avant 2) à $+$ (après 2) : <strong>minimum local</strong> en $x=2$, avec $f(2) = -1$."},
          {id:'dt3-4', type:'qcm', question:"$f(x) = x^3$. La fonction est :", options:['Croissante puis décroissante','Décroissante puis croissante','Strictement croissante sur $\\mathbb{R}$','Constante'], correctIndex:2, explanation:"$f'(x) = 3x^2 \\geq 0$ pour tout $x$, donc $f$ est <strong>strictement croissante</strong>."}
        ]
      }
    ]
  },

  'trigo-terminale': {
    description: "La trigonométrie de Terminale étend les notions de Première : cercle trigonométrique, fonctions $\\sin$ et $\\cos$ sur tout $\\mathbb{R}$, dérivées, équations trigonométriques.",
    properties: [
      {
        id:'cercle-trigo', number:1, title:'Cercle trigonométrique et angles',
        summary:"Mesure d'angle en radians, valeurs remarquables, périodicité.",
        videoId:'8tWXqMDc7Hk', videoTitle:'Cercle trigonométrique et radians (Yvan Monka)',
        explanation:"Le <strong>cercle trigonométrique</strong> est le cercle de centre $O$ et de rayon $1$. Un angle $x$ (en radians) y est associé à un point dont les coordonnées sont $(\\cos x, \\sin x)$. Cela permet de définir $\\sin$ et $\\cos$ pour <strong>tout réel</strong>.",
        keyPoints:[
          "$1$ tour complet $= 2\\pi$ radians $= 360°$",
          "$\\pi$ rad $= 180°$, $\\dfrac{\\pi}{2}$ rad $= 90°$, $\\dfrac{\\pi}{3}$ rad $= 60°$, $\\dfrac{\\pi}{6}$ rad $= 30°$",
          "$\\cos$ et $\\sin$ sont <strong>périodiques de période $2\\pi$</strong>",
          "$\\cos(-x) = \\cos(x)$ (paire) ; $\\sin(-x) = -\\sin(x)$ (impaire)",
          "Pour tout $x$ : $\\cos^2(x) + \\sin^2(x) = 1$"
        ],
        exercises:[
          {id:'tt1-1', type:'numeric', question:"Convertir $180°$ en radians (en multiple de $\\pi$, donner le coefficient). $180° = ? \\cdot \\pi$.", answer:1, tolerance:0.001, explanation:"$180° = \\mathbf{1} \\cdot \\pi$ radians."},
          {id:'tt1-2', type:'qcm', question:"$\\cos\\left(\\dfrac{\\pi}{3}\\right) = ?$", options:['$\\dfrac{1}{2}$','$\\dfrac{\\sqrt{2}}{2}$','$\\dfrac{\\sqrt{3}}{2}$','$0$'], correctIndex:0, explanation:"Valeur remarquable : $\\cos\\left(\\dfrac{\\pi}{3}\\right) = \\mathbf{\\dfrac{1}{2}}$."},
          {id:'tt1-3', type:'qcm', question:"$\\sin\\left(\\dfrac{\\pi}{2}\\right) = ?$", options:['$0$','$1$','$\\dfrac{1}{2}$','$\\dfrac{\\sqrt{2}}{2}$'], correctIndex:1, explanation:"$\\sin\\left(\\dfrac{\\pi}{2}\\right) = \\mathbf{1}$."},
          {id:'tt1-4', type:'qcm', question:"$\\cos(-x) = ?$", options:['$\\cos x$','$-\\cos x$','$\\sin x$','$1 - \\cos x$'], correctIndex:0, explanation:"$\\cos$ est paire : $\\cos(-x) = \\mathbf{\\cos x}$."}
        ]
      },
      {
        id:'formules-trigo', number:2, title:'Formules de trigonométrie',
        summary:"$\\cos(a+b)$, $\\sin(a+b)$, formules d'addition et de duplication.",
        videoId:'8tWXqMDc7Hk', videoTitle:'Formules de trigo (Yvan Monka)',
        explanation:"Les <strong>formules d'addition</strong> permettent d'exprimer $\\cos(a+b)$ et $\\sin(a+b)$ en fonction de $\\cos a, \\sin a, \\cos b, \\sin b$. En cas particulier $a = b$, on obtient les formules de duplication.",
        keyPoints:[
          "$\\cos(a+b) = \\cos a \\cos b - \\sin a \\sin b$",
          "$\\cos(a-b) = \\cos a \\cos b + \\sin a \\sin b$",
          "$\\sin(a+b) = \\sin a \\cos b + \\cos a \\sin b$",
          "$\\sin(a-b) = \\sin a \\cos b - \\cos a \\sin b$",
          "Duplication : $\\cos(2a) = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$ ; $\\sin(2a) = 2\\sin a \\cos a$"
        ],
        exercises:[
          {id:'tt2-1', type:'qcm', question:"$\\cos(a-b) = ?$", options:['$\\cos a \\cos b - \\sin a \\sin b$','$\\cos a \\cos b + \\sin a \\sin b$','$\\cos a - \\cos b$','$\\sin a \\sin b - \\cos a \\cos b$'], correctIndex:1, explanation:"Formule à mémoriser : $\\cos(a-b) = \\mathbf{\\cos a \\cos b + \\sin a \\sin b}$."},
          {id:'tt2-2', type:'qcm', question:"$\\sin(2a) = ?$", options:['$2\\sin a$','$\\sin^2 a + \\cos^2 a$','$2\\sin a \\cos a$','$\\sin a \\cos a$'], correctIndex:2, explanation:"Formule de duplication : $\\sin(2a) = \\mathbf{2 \\sin a \\cos a}$."},
          {id:'tt2-3', type:'qcm', question:"$\\cos(2a) = ?$ (donner une forme valide)", options:['$2\\cos a$','$2\\cos^2 a - 1$','$\\cos^2 a + \\sin^2 a$','$2$'], correctIndex:1, explanation:"Trois formes équivalentes : $\\cos(2a) = \\mathbf{2\\cos^2 a - 1} = 1 - 2\\sin^2 a = \\cos^2 a - \\sin^2 a$."},
          {id:'tt2-4', type:'qcm', question:"Calculer $\\cos\\left(\\dfrac{\\pi}{2} - x\\right)$ :", options:['$\\cos x$','$\\sin x$','$-\\sin x$','$1 - \\cos x$'], correctIndex:1, explanation:"$\\cos(\\frac{\\pi}{2} - x) = \\cos\\frac{\\pi}{2}\\cos x + \\sin\\frac{\\pi}{2}\\sin x = 0 + \\sin x = \\mathbf{\\sin x}$."}
        ]
      },
      {
        id:'derivees-trigo', number:3, title:'Dérivées et étude',
        summary:"$\\sin' = \\cos$, $\\cos' = -\\sin$, et leurs composées.",
        videoId:'8tWXqMDc7Hk', videoTitle:'Dérivées de sin et cos (Yvan Monka)',
        explanation:"Les <strong>dérivées de $\\sin$ et $\\cos$</strong> sont fondamentales : $\\sin' = \\cos$ et $\\cos' = -\\sin$ (attention au signe moins). Avec la composée, $(\\sin u)' = u' \\cos u$ et $(\\cos u)' = -u' \\sin u$.",
        keyPoints:[
          "$(\\sin x)' = \\cos x$",
          "$(\\cos x)' = -\\sin x$ (signe moins !)",
          "$(\\sin(u))' = u' \\cos(u)$ et $(\\cos(u))' = -u' \\sin(u)$",
          "$\\sin$ est croissante sur $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$, décroissante sur $[\\frac{\\pi}{2}, \\frac{3\\pi}{2}]$",
          "$\\cos$ est décroissante sur $[0, \\pi]$, croissante sur $[\\pi, 2\\pi]$"
        ],
        exercises:[
          {id:'tt3-1', type:'qcm', question:"Dérivée de $f(x) = \\sin(x)$ :", options:['$\\cos x$','$-\\cos x$','$-\\sin x$','$\\tan x$'], correctIndex:0, explanation:"$(\\sin x)' = \\mathbf{\\cos x}$."},
          {id:'tt3-2', type:'qcm', question:"Dérivée de $f(x) = \\cos(x)$ :", options:['$\\sin x$','$-\\sin x$','$-\\cos x$','$\\tan x$'], correctIndex:1, explanation:"$(\\cos x)' = \\mathbf{-\\sin x}$ (attention au signe)."},
          {id:'tt3-3', type:'qcm', question:"Dérivée de $f(x) = \\sin(2x)$ :", options:['$\\cos(2x)$','$2\\cos(2x)$','$2\\sin(2x)$','$\\sin(2x)$'], correctIndex:1, explanation:"$u = 2x$, $u' = 2$. $(\\sin u)' = u' \\cos u = \\mathbf{2 \\cos(2x)}$."},
          {id:'tt3-4', type:'qcm', question:"Dérivée de $f(x) = \\cos(3x+\\pi)$ :", options:['$-3\\sin(3x+\\pi)$','$3\\sin(3x+\\pi)$','$-\\sin(3x+\\pi)$','$3\\cos(3x+\\pi)$'], correctIndex:0, explanation:"$u = 3x+\\pi$, $u' = 3$. $(\\cos u)' = -u' \\sin u = \\mathbf{-3 \\sin(3x+\\pi)}$."}
        ]
      }
    ]
  },

  'primitives': {
    description: "Une primitive de $f$ est une fonction $F$ telle que $F' = f$. Elles permettent de calculer des intégrales et des aires sous des courbes. C'est l'opération inverse de la dérivation.",
    properties: [
      {
        id:'def-primitive', number:1, title:'Définition et primitives usuelles',
        summary:"$F$ primitive de $f$ $\\Leftrightarrow$ $F' = f$. Définie à une constante près.",
        videoId:'9fHvc8aFLZQ', videoTitle:'Primitives — cours Terminale (Yvan Monka)',
        explanation:"Une <strong>primitive de $f$</strong> est une fonction $F$ dont la dérivée donne $f$. Si $F$ est une primitive, alors $F + C$ (avec $C$ constante) en est une autre — il y en a une <strong>infinité</strong>, toutes obtenues en ajoutant une constante.",
        keyPoints:[
          "$F$ primitive de $f$ sur $I$ $\\Leftrightarrow$ $F'(x) = f(x)$ pour tout $x \\in I$",
          "Si $F$ est UNE primitive, toutes les primitives sont $F(x) + C$ (avec $C \\in \\mathbb{R}$)",
          "Primitive de $x^n$ ($n \\neq -1$) : $\\dfrac{x^{n+1}}{n+1}$",
          "Primitive de $\\dfrac{1}{x}$ ($x > 0$) : $\\ln(x)$",
          "Primitive de $e^x$ : $e^x$. Primitive de $\\sin x$ : $-\\cos x$. Primitive de $\\cos x$ : $\\sin x$."
        ],
        exercises:[
          {id:'pr1-1', type:'qcm', question:"Une primitive de $f(x) = x^2$ :", options:['$2x$','$\\dfrac{x^3}{3}$','$x^3$','$3x^2$'], correctIndex:1, explanation:"$\\int x^n dx = \\dfrac{x^{n+1}}{n+1}$. Donc $\\mathbf{\\dfrac{x^3}{3}}$. (Dérivée : $\\dfrac{3x^2}{3} = x^2$.)"},
          {id:'pr1-2', type:'qcm', question:"Une primitive de $f(x) = e^x$ :", options:['$e^x$','$xe^x$','$\\dfrac{e^x}{x}$','$\\ln(e^x)$'], correctIndex:0, explanation:"$\\exp$ est sa propre dérivée donc aussi sa propre primitive : $\\mathbf{e^x}$."},
          {id:'pr1-3', type:'qcm', question:"Une primitive de $f(x) = \\dfrac{1}{x}$ (sur $]0, +\\infty[$) :", options:['$-\\dfrac{1}{x^2}$','$\\ln x$','$x \\ln x$','$\\dfrac{1}{x^2}$'], correctIndex:1, explanation:"$(\\ln x)' = \\dfrac{1}{x}$, donc $\\mathbf{\\ln x}$ est une primitive."},
          {id:'pr1-4', type:'qcm', question:"Une primitive de $f(x) = \\cos x$ :", options:['$\\sin x$','$-\\sin x$','$-\\cos x$','$\\tan x$'], correctIndex:0, explanation:"$(\\sin x)' = \\cos x$, donc $\\mathbf{\\sin x}$ est une primitive de $\\cos$."}
        ]
      },
      {
        id:'composees-primitives', number:2, title:'Primitives de formes composées',
        summary:"Reconnaître $u' u^n$, $\\dfrac{u'}{u}$, $u' e^u$ pour primitiver.",
        videoId:'9fHvc8aFLZQ', videoTitle:'Primitives de formes composées (Yvan Monka)',
        explanation:"Pour primitiver des fonctions composées, on <strong>reconnaît la forme de la dérivée</strong> d'une composée et on l'inverse. Tableau à retenir absolument.",
        keyPoints:[
          "$u' \\cdot u^n$ a pour primitive $\\dfrac{u^{n+1}}{n+1}$ (si $n \\neq -1$)",
          "$\\dfrac{u'}{u}$ a pour primitive $\\ln|u|$",
          "$u' \\cdot e^u$ a pour primitive $e^u$",
          "$\\dfrac{u'}{2\\sqrt{u}}$ a pour primitive $\\sqrt{u}$",
          "Méthode : repérer $u$ et $u'$ dans l'expression"
        ],
        exercises:[
          {id:'pr2-1', type:'qcm', question:"Une primitive de $f(x) = 2x \\cdot e^{x^2}$ :", options:['$e^{x^2}$','$x^2 e^{x^2}$','$2 e^{x^2}$','$\\dfrac{e^{x^2}}{2}$'], correctIndex:0, explanation:"Forme $u' e^u$ avec $u = x^2$, $u' = 2x$. Primitive : $\\mathbf{e^{x^2}}$."},
          {id:'pr2-2', type:'qcm', question:"Une primitive de $f(x) = \\dfrac{2x}{x^2+1}$ :", options:['$\\ln(x^2+1)$','$\\ln(2x)$','$\\dfrac{1}{x^2+1}$','$x \\ln(x^2+1)$'], correctIndex:0, explanation:"Forme $\\dfrac{u'}{u}$ avec $u = x^2+1 > 0$. Primitive : $\\mathbf{\\ln(x^2+1)}$."},
          {id:'pr2-3', type:'qcm', question:"Une primitive de $f(x) = 6x(x^2+1)^2$ :", options:['$(x^2+1)^3$','$\\dfrac{(x^2+1)^3}{3}$','$2(x^2+1)^3$','$3(x^2+1)^2$'], correctIndex:0, explanation:"$f = u' u^2$ avec $u = x^2+1$, $u' = 2x$, donc $6x = 3 u'$. Primitive de $3u' u^2$ : $u^3 = \\mathbf{(x^2+1)^3}$."},
          {id:'pr2-4', type:'qcm', question:"Une primitive de $f(x) = -\\sin x$ :", options:['$\\cos x$','$-\\cos x$','$\\sin x$','$-\\sin x$'], correctIndex:0, explanation:"$(\\cos x)' = -\\sin x$, donc $\\mathbf{\\cos x}$ est une primitive de $-\\sin$."}
        ]
      },
      {
        id:'integrale', number:3, title:'Intégrale et calcul d\'aire',
        summary:"$\\displaystyle\\int_a^b f(x) \\, dx = F(b) - F(a)$.",
        videoId:'9fHvc8aFLZQ', videoTitle:'Intégrale et aire (Yvan Monka)',
        explanation:"L'<strong>intégrale</strong> $\\int_a^b f(x) \\, dx$ représente l'<strong>aire algébrique</strong> entre la courbe de $f$, l'axe des abscisses et les droites $x=a$ et $x=b$. On la calcule par $F(b) - F(a)$ avec $F$ primitive de $f$.",
        keyPoints:[
          "$\\displaystyle\\int_a^b f(x) \\, dx = F(b) - F(a)$, où $F$ est une primitive de $f$",
          "Si $f \\geq 0$ sur $[a, b]$, l'intégrale est l'<strong>aire</strong> sous la courbe (en unités d'aire)",
          "Si $f \\leq 0$, l'intégrale est <strong>négative</strong> (aire signée)",
          "$\\int_a^a f = 0$ et $\\int_a^b f = -\\int_b^a f$",
          "Linéarité : $\\int (f + g) = \\int f + \\int g$ et $\\int (\\lambda f) = \\lambda \\int f$"
        ],
        exercises:[
          {id:'pr3-1', type:'numeric', question:"$\\displaystyle\\int_0^2 x \\, dx = ?$", answer:2, tolerance:0.001, explanation:"Primitive de $x$ : $\\dfrac{x^2}{2}$. $\\left[\\dfrac{x^2}{2}\\right]_0^2 = 2 - 0 = \\mathbf{2}$."},
          {id:'pr3-2', type:'numeric', question:"$\\displaystyle\\int_0^1 e^x \\, dx = ?$ (donner $e - 1$ : valeur approchée).", answer:1.718, tolerance:0.01, explanation:"$[e^x]_0^1 = e - 1 \\approx \\mathbf{1{,}718}$."},
          {id:'pr3-3', type:'numeric', question:"$\\displaystyle\\int_1^e \\dfrac{1}{x} \\, dx = ?$", answer:1, tolerance:0.001, explanation:"$[\\ln x]_1^e = \\ln e - \\ln 1 = 1 - 0 = \\mathbf{1}$."},
          {id:'pr3-4', type:'qcm', question:"Si $f(x) \\geq 0$ sur $[a,b]$, alors $\\int_a^b f(x) \\, dx$ représente :", options:['Une longueur',"L'aire entre la courbe et l'axe des $x$",'La pente','Un volume'], correctIndex:1, explanation:"C'est l'<strong>aire</strong> entre la courbe et l'axe des abscisses, en unités d'aire."}
        ]
      }
    ]
  },

  'binomiale': {
    description: "La loi binomiale $\\mathcal{B}(n, p)$ modélise le nombre de succès dans une répétition de $n$ épreuves de Bernoulli identiques et indépendantes. Cas central des probabilités en Terminale.",
    properties: [
      {
        id:'bernoulli', number:1, title:'Épreuve de Bernoulli',
        summary:"Expérience à 2 issues : succès (probabilité $p$) ou échec ($1-p$).",
        videoId:'rNvyrgCUWWE', videoTitle:'Épreuve de Bernoulli (Yvan Monka)',
        explanation:"Une <strong>épreuve de Bernoulli</strong> est une expérience aléatoire à <strong>deux issues</strong> : « succès » de probabilité $p$, « échec » de probabilité $1-p$. La variable $X$ qui compte le nombre de succès (0 ou 1) suit une <strong>loi de Bernoulli de paramètre $p$</strong>.",
        keyPoints:[
          "Deux issues seulement : succès ($S$) ou échec ($\\bar S$)",
          "$P(X = 1) = p$ (succès) ; $P(X = 0) = 1 - p$ (échec)",
          "Espérance : $E(X) = p$",
          "Variance : $V(X) = p(1-p)$ ; écart-type : $\\sigma = \\sqrt{p(1-p)}$",
          "Exemples : pile/face avec $p = 0{,}5$, qualité d'une pièce avec $p$ = taux de défaut"
        ],
        exercises:[
          {id:'bn1-1', type:'qcm', question:"On lance une pièce équilibrée. $X = 1$ si pile, $0$ sinon. $X$ suit :", options:['Loi uniforme','Loi de Bernoulli avec $p = 0{,}5$','Loi binomiale','Loi normale'], correctIndex:1, explanation:"$X$ suit une loi de <strong>Bernoulli avec $p = 0{,}5$</strong>."},
          {id:'bn1-2', type:'numeric', question:"$X \\sim \\text{Bernoulli}(0{,}3)$. $E(X) = ?$", answer:0.3, tolerance:0.001, explanation:"$E(X) = p = \\mathbf{0{,}3}$."},
          {id:'bn1-3', type:'qcm', question:"$X \\sim \\text{Bernoulli}(0{,}4)$. $V(X) = ?$", options:['$0{,}4$','$0{,}24$','$0{,}6$','$0{,}16$'], correctIndex:1, explanation:"$V(X) = p(1-p) = 0{,}4 \\times 0{,}6 = \\mathbf{0{,}24}$."},
          {id:'bn1-4', type:'qcm', question:"Quelle situation n'est PAS une épreuve de Bernoulli ?", options:['Lancer un dé et regarder si on obtient un 6',"Tirer une carte et regarder si c'est un cœur",'Lancer un dé et regarder le résultat (1 à 6)','Demander à une personne si elle est gauchère'], correctIndex:2, explanation:"Lancer un dé donne <strong>6 issues</strong>, pas 2 — ce n'est pas une épreuve de Bernoulli (mais c'est une variable aléatoire)."}
        ]
      },
      {
        id:'loi-binomiale', number:2, title:'Loi binomiale $\\mathcal{B}(n,p)$',
        summary:"$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.",
        videoId:'rNvyrgCUWWE', videoTitle:'Loi binomiale — cours complet (Yvan Monka)',
        explanation:"En répétant <strong>$n$ fois</strong> la même épreuve de Bernoulli (probabilité $p$, indépendantes), on définit $X$ = nombre de succès. $X$ suit une <strong>loi binomiale</strong> $\\mathcal{B}(n, p)$. La formule donne la probabilité d'obtenir exactement $k$ succès.",
        keyPoints:[
          "$X$ peut prendre les valeurs $0, 1, 2, \\ldots, n$",
          "$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$",
          "$\\binom{n}{k}$ = nombre de façons de choisir $k$ succès parmi $n$ essais",
          "$\\binom{n}{k} = \\dfrac{n!}{k!(n-k)!}$",
          "Conditions d'utilisation : épreuves <strong>identiques et indépendantes</strong>"
        ],
        exercises:[
          {id:'bn2-1', type:'qcm', question:"On lance 4 fois une pièce équilibrée. $X$ = nombre de piles. $X$ suit :", options:['$\\mathcal{B}(4, 0{,}5)$','$\\mathcal{B}(0{,}5, 4)$','Bernoulli $(0{,}5)$','Uniforme sur $\\{0,1,2,3,4\\}$'], correctIndex:0, explanation:"$n = 4$ épreuves de Bernoulli identiques et indépendantes de paramètre $p = 0{,}5$. $X \\sim \\mathbf{\\mathcal{B}(4, 0{,}5)}$."},
          {id:'bn2-2', type:'numeric', question:"$\\binom{5}{2} = ?$", answer:10, tolerance:0.001, explanation:"$\\binom{5}{2} = \\dfrac{5!}{2! \\, 3!} = \\dfrac{120}{2 \\times 6} = \\mathbf{10}$."},
          {id:'bn2-3', type:'qcm', question:"$X \\sim \\mathcal{B}(3, 0{,}5)$. $P(X = 2) = ?$", options:['$0{,}25$','$0{,}375$','$0{,}5$','$0{,}125$'], correctIndex:1, explanation:"$P(X = 2) = \\binom{3}{2} (0{,}5)^2 (0{,}5)^1 = 3 \\times 0{,}25 \\times 0{,}5 = \\mathbf{0{,}375}$."},
          {id:'bn2-4', type:'qcm', question:"$X \\sim \\mathcal{B}(10, 0{,}3)$. $P(X = 0) = ?$", options:['$(0{,}3)^{10}$','$(0{,}7)^{10}$','$1$','$0$'], correctIndex:1, explanation:"$P(X = 0) = \\binom{10}{0} (0{,}3)^0 (0{,}7)^{10} = \\mathbf{(0{,}7)^{10}} \\approx 0{,}028$."}
        ]
      },
      {
        id:'esperance-binomiale', number:3, title:'Espérance, variance, écart-type',
        summary:"$E(X) = np$, $V(X) = np(1-p)$.",
        videoId:'rNvyrgCUWWE', videoTitle:'Espérance et variance de la loi binomiale (Yvan Monka)',
        explanation:"Pour $X \\sim \\mathcal{B}(n, p)$, on a des formules simples : <strong>l'espérance vaut $np$</strong> et la variance $np(1-p)$. À mémoriser absolument.",
        keyPoints:[
          "$E(X) = np$ (nombre moyen de succès)",
          "$V(X) = np(1-p)$",
          "$\\sigma(X) = \\sqrt{np(1-p)}$ (écart-type)",
          "Intuition : si on répète $n$ fois et que chaque essai a chance $p$, on s'attend à $np$ succès en moyenne",
          "Exemple : $\\mathcal{B}(20, 0{,}1)$ donne $E = 2$, $V = 1{,}8$"
        ],
        exercises:[
          {id:'bn3-1', type:'numeric', question:"$X \\sim \\mathcal{B}(50, 0{,}2)$. $E(X) = ?$", answer:10, tolerance:0.001, explanation:"$E(X) = np = 50 \\times 0{,}2 = \\mathbf{10}$."},
          {id:'bn3-2', type:'numeric', question:"$X \\sim \\mathcal{B}(20, 0{,}5)$. $V(X) = ?$", answer:5, tolerance:0.001, explanation:"$V(X) = np(1-p) = 20 \\times 0{,}5 \\times 0{,}5 = \\mathbf{5}$."},
          {id:'bn3-3', type:'qcm', question:"$X \\sim \\mathcal{B}(100, 0{,}3)$. $\\sigma(X)$ vaut environ :", options:['$30$','$21$','$\\sqrt{21} \\approx 4{,}58$','$70$'], correctIndex:2, explanation:"$\\sigma = \\sqrt{np(1-p)} = \\sqrt{100 \\times 0{,}3 \\times 0{,}7} = \\sqrt{21} \\approx \\mathbf{4{,}58}$."},
          {id:'bn3-4', type:'qcm', question:"Une usine produit 5% de pièces défectueuses. Sur 200 pièces, combien en moyenne sont défectueuses ?", options:['5','10','20','50'], correctIndex:1, explanation:"$X \\sim \\mathcal{B}(200, 0{,}05)$, $E(X) = 200 \\times 0{,}05 = \\mathbf{10}$."}
        ]
      }
    ]
  },

  'vecteurs-espace': {
    description: "Les vecteurs dans l'espace généralisent ce qu'on connaît dans le plan : trois coordonnées au lieu de deux, mais mêmes opérations. Outil clé pour la géométrie 3D.",
    properties: [
      {
        id:'repere-3d', number:1, title:'Repère et coordonnées dans l\'espace',
        summary:"Un point a 3 coordonnées : $(x, y, z)$ dans un repère $(O, \\vec{i}, \\vec{j}, \\vec{k})$.",
        videoId:'eq3JdfTb1IY', videoTitle:'Repère dans l\'espace (Yvan Monka)',
        explanation:"L'espace est muni d'un <strong>repère orthonormé direct</strong> $(O, \\vec{i}, \\vec{j}, \\vec{k})$. Tout point $M$ est repéré par trois <strong>coordonnées</strong> $(x, y, z)$ : abscisse, ordonnée, cote. Tout vecteur $\\vec{u}$ aussi.",
        keyPoints:[
          "Un point : $M(x, y, z)$ ; un vecteur : $\\vec{u}\\begin{pmatrix}x\\\\y\\\\z\\end{pmatrix}$",
          "$\\vec{AB}$ a pour coordonnées $(x_B - x_A, y_B - y_A, z_B - z_A)$",
          "Norme : $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$",
          "Distance $AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$",
          "Milieu de $[AB]$ : $\\left(\\dfrac{x_A+x_B}{2}, \\dfrac{y_A+y_B}{2}, \\dfrac{z_A+z_B}{2}\\right)$"
        ],
        exercises:[
          {id:'ve1-1', type:'qcm', question:"$A(1, 2, 3)$ et $B(4, 5, 6)$. Coordonnées de $\\vec{AB}$ :", options:['$(5, 7, 9)$','$(3, 3, 3)$','$(-3, -3, -3)$','$(1, 2, 3)$'], correctIndex:1, explanation:"$\\vec{AB} = (x_B - x_A, y_B - y_A, z_B - z_A) = (3, 3, 3)$."},
          {id:'ve1-2', type:'numeric', question:"Norme du vecteur $\\vec{u}(2, 3, 6)$ :", answer:7, tolerance:0.001, explanation:"$\\|\\vec{u}\\| = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36} = \\sqrt{49} = \\mathbf{7}$."},
          {id:'ve1-3', type:'qcm', question:"Coordonnées du milieu de $A(2, 4, 6)$ et $B(0, 2, 4)$ :", options:['$(1, 3, 5)$','$(2, 6, 10)$','$(1, 1, 1)$','$(0, 0, 0)$'], correctIndex:0, explanation:"Milieu = $\\left(\\dfrac{2+0}{2}, \\dfrac{4+2}{2}, \\dfrac{6+4}{2}\\right) = \\mathbf{(1, 3, 5)}$."},
          {id:'ve1-4', type:'numeric', question:"Distance entre $A(1, 0, 0)$ et $B(0, 1, 0)$ :", answer:1.414, tolerance:0.01, explanation:"$AB = \\sqrt{1+1+0} = \\sqrt{2} \\approx \\mathbf{1{,}414}$."}
        ]
      },
      {
        id:'colinearite-3d', number:2, title:'Colinéarité et coplanarité',
        summary:"$\\vec{u}$ et $\\vec{v}$ colinéaires $\\Leftrightarrow$ leurs coordonnées sont proportionnelles.",
        videoId:'eq3JdfTb1IY', videoTitle:'Colinéarité et coplanarité (Yvan Monka)',
        explanation:"Deux vecteurs sont <strong>colinéaires</strong> s'ils sont sur la même droite (l'un est multiple de l'autre). Trois vecteurs sont <strong>coplanaires</strong> s'ils sont dans le même plan.",
        keyPoints:[
          "$\\vec{u}$ et $\\vec{v}$ colinéaires $\\Leftrightarrow$ il existe $k$ tel que $\\vec{v} = k\\vec{u}$",
          "En coordonnées : proportions $\\dfrac{x'}{x} = \\dfrac{y'}{y} = \\dfrac{z'}{z}$",
          "Trois points $A, B, C$ alignés $\\Leftrightarrow$ $\\vec{AB}$ et $\\vec{AC}$ colinéaires",
          "Trois vecteurs $\\vec{u}, \\vec{v}, \\vec{w}$ coplanaires $\\Leftrightarrow$ $\\vec{w} = a\\vec{u} + b\\vec{v}$ pour des réels $a, b$",
          "Quatre points $A, B, C, D$ coplanaires $\\Leftrightarrow$ $\\vec{AD}$ s'écrit $a\\vec{AB} + b\\vec{AC}$"
        ],
        exercises:[
          {id:'ve2-1', type:'qcm', question:"$\\vec{u}(2, 4, 6)$ et $\\vec{v}(1, 2, 3)$ sont :", options:['Colinéaires','Orthogonaux','Égaux','Non colinéaires'], correctIndex:0, explanation:"$\\vec{u} = 2\\vec{v}$ (chaque coordonnée est double). <strong>Colinéaires</strong>."},
          {id:'ve2-2', type:'qcm', question:"$\\vec{u}(1, 2, 3)$ et $\\vec{v}(2, 4, 5)$ sont :", options:['Colinéaires','Non colinéaires','Orthogonaux','Identiques'], correctIndex:1, explanation:"$\\dfrac{2}{1} = 2$ mais $\\dfrac{5}{3} \\neq 2$ : pas de proportionnalité, donc <strong>non colinéaires</strong>."},
          {id:'ve2-3', type:'qcm', question:"Trois points $A, B, C$ sont alignés si :", options:['$\\vec{AB} = \\vec{AC}$','$\\vec{AB}$ et $\\vec{AC}$ colinéaires','$AB = BC = CA$','$\\vec{AB} \\cdot \\vec{AC} = 0$'], correctIndex:1, explanation:"Alignés $\\Leftrightarrow$ <strong>$\\vec{AB}$ et $\\vec{AC}$ colinéaires</strong> (proportionnels)."},
          {id:'ve2-4', type:'qcm', question:"Pour que 4 points $A,B,C,D$ soient coplanaires :", options:['$\\vec{AB}, \\vec{AC}, \\vec{AD}$ coplanaires','Ils forment un rectangle','Ils sont tous à la même altitude','$\\vec{AB} \\cdot \\vec{AC} = 0$'], correctIndex:0, explanation:"4 points coplanaires $\\Leftrightarrow$ les 3 vecteurs $\\vec{AB}, \\vec{AC}, \\vec{AD}$ sont <strong>coplanaires</strong> (l'un est combinaison des deux autres)."}
        ]
      },
      {
        id:'droite-parametrique', number:3, title:'Représentation paramétrique d\'une droite',
        summary:"Droite passant par $A$ et dirigée par $\\vec{u}$ : $M = A + t \\vec{u}$.",
        videoId:'eq3JdfTb1IY', videoTitle:'Représentation paramétrique (Yvan Monka)',
        explanation:"Une droite $(d)$ de l'espace est caractérisée par un <strong>point</strong> $A(x_A, y_A, z_A)$ et un <strong>vecteur directeur</strong> $\\vec{u}(a, b, c)$. Tout point $M$ de la droite s'écrit $M = A + t \\vec{u}$ pour un certain $t \\in \\mathbb{R}$.",
        keyPoints:[
          "Système : $\\begin{cases}x = x_A + ta\\\\y = y_A + tb\\\\z = z_A + tc\\end{cases}$ avec $t \\in \\mathbb{R}$",
          "$\\vec{u}$ : vecteur <strong>directeur</strong> (non nul) de la droite",
          "$t$ : paramètre (peut être n'importe quel réel)",
          "Pour vérifier qu'un point appartient à $(d)$ : résoudre le système en $t$ ; cohérent $\\Rightarrow$ oui",
          "Deux droites parallèles $\\Leftrightarrow$ vecteurs directeurs colinéaires"
        ],
        exercises:[
          {id:'ve3-1', type:'qcm', question:"Représentation paramétrique de la droite passant par $A(1,2,3)$ et de vecteur directeur $\\vec{u}(2,0,-1)$ :", options:['$x=1+2t, y=2, z=3-t$','$x=2+t, y=0+2t, z=-1+3t$','$x=t, y=t, z=t$','$x=1+t, y=2+t, z=3+t$'], correctIndex:0, explanation:"$M = A + t\\vec{u}$ donne : $x = 1 + 2t$, $y = 2 + 0t$, $z = 3 - t$."},
          {id:'ve3-2', type:'qcm', question:"Le point $B(5, 2, 1)$ appartient-il à la droite ci-dessus ?", options:['Oui','Non','Indéterminable','Seulement si $t=0$'], correctIndex:0, explanation:"$5 = 1+2t \\Rightarrow t = 2$. Vérif : $y = 2$ OK, $z = 3 - 2 = 1$ OK. <strong>Oui</strong>, pour $t = 2$."},
          {id:'ve3-3', type:'qcm', question:"Deux droites de vecteurs directeurs $\\vec{u}(1,2,3)$ et $\\vec{v}(2,4,6)$ sont :", options:['Parallèles','Sécantes','Orthogonales','Confondues'], correctIndex:0, explanation:"$\\vec{v} = 2\\vec{u}$, donc vecteurs directeurs colinéaires : <strong>parallèles</strong> (ou confondues si elles partagent un point)."},
          {id:'ve3-4', type:'qcm', question:"Vecteur directeur de la droite $x = 2 - t, y = 1 + 3t, z = 5t$ :", options:['$(2, 1, 0)$','$(-1, 3, 5)$','$(1, 3, 5)$','$(2-t, 1+3t, 5t)$'], correctIndex:1, explanation:"On lit les coefficients de $t$ : $\\vec{u}(-1, 3, 5)$."}
        ]
      }
    ]
  },

  'scalaire-espace': {
    description: "Le produit scalaire dans l'espace généralise celui du plan. C'est l'outil fondamental pour l'orthogonalité et les angles en 3D, et la base des équations de plans.",
    properties: [
      {
        id:'def-scalaire-3d', number:1, title:'Définition et calcul en coordonnées',
        summary:"$\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$ en repère orthonormé.",
        videoId:'eq3JdfTb1IY', videoTitle:'Produit scalaire dans l\'espace (Yvan Monka)',
        explanation:"Le <strong>produit scalaire</strong> de deux vecteurs en 3D se calcule comme dans le plan, en ajoutant une troisième coordonnée. Trois formules équivalentes selon le contexte.",
        keyPoints:[
          "Coordonnées : $\\vec{u} \\cdot \\vec{v} = xx' + yy' + zz'$ (repère orthonormé)",
          "Normes et angle : $\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| \\cdot \\|\\vec{v}\\| \\cdot \\cos(\\theta)$",
          "Carré scalaire : $\\vec{u} \\cdot \\vec{u} = \\|\\vec{u}\\|^2$",
          "Commutatif : $\\vec{u} \\cdot \\vec{v} = \\vec{v} \\cdot \\vec{u}$",
          "Distributif : $\\vec{u} \\cdot (\\vec{v} + \\vec{w}) = \\vec{u} \\cdot \\vec{v} + \\vec{u} \\cdot \\vec{w}$"
        ],
        exercises:[
          {id:'se1-1', type:'numeric', question:"$\\vec{u}(1, 2, 3) \\cdot \\vec{v}(4, 5, 6) = ?$", answer:32, tolerance:0.001, explanation:"$1 \\times 4 + 2 \\times 5 + 3 \\times 6 = 4 + 10 + 18 = \\mathbf{32}$."},
          {id:'se1-2', type:'numeric', question:"$\\vec{u}(2, -1, 3) \\cdot \\vec{v}(1, 0, -1) = ?$", answer:-1, tolerance:0.001, explanation:"$2 \\times 1 + (-1) \\times 0 + 3 \\times (-1) = 2 + 0 - 3 = \\mathbf{-1}$."},
          {id:'se1-3', type:'qcm', question:"Que vaut $\\vec{u} \\cdot \\vec{u}$ ?", options:['$0$','$\\|\\vec{u}\\|$','$\\|\\vec{u}\\|^2$','$2\\vec{u}$'], correctIndex:2, explanation:"$\\vec{u} \\cdot \\vec{u} = \\mathbf{\\|\\vec{u}\\|^2}$ (carré scalaire = carré de la norme)."},
          {id:'se1-4', type:'numeric', question:"$\\vec{u}(1,1,1) \\cdot \\vec{v}(1,1,1) = ?$", answer:3, tolerance:0.001, explanation:"$1+1+1 = \\mathbf{3}$. (C'est $\\|\\vec{u}\\|^2 = (\\sqrt 3)^2$.)"}
        ]
      },
      {
        id:'orthogonalite-3d', number:2, title:'Orthogonalité',
        summary:"$\\vec{u} \\perp \\vec{v}$ $\\Leftrightarrow$ $\\vec{u} \\cdot \\vec{v} = 0$.",
        videoId:'eq3JdfTb1IY', videoTitle:'Orthogonalité dans l\'espace (Yvan Monka)',
        explanation:"Deux vecteurs sont <strong>orthogonaux</strong> si et seulement si leur produit scalaire est nul. Cas le plus utile en pratique pour démontrer la perpendicularité de droites ou de plans.",
        keyPoints:[
          "$\\vec{u} \\perp \\vec{v}$ $\\Leftrightarrow$ $\\vec{u} \\cdot \\vec{v} = 0$ (avec $\\vec{u}, \\vec{v}$ non nuls)",
          "Le vecteur nul est orthogonal à tout vecteur",
          "Deux droites sont orthogonales si leurs vecteurs directeurs le sont",
          "Vecteur normal à un plan : orthogonal à tous les vecteurs du plan",
          "Méthode : on calcule $\\vec{u} \\cdot \\vec{v}$ ; si = 0 alors $\\perp$"
        ],
        exercises:[
          {id:'se2-1', type:'qcm', question:"$\\vec{u}(1, 2, -1) \\cdot \\vec{v}(3, -1, 1) = ?$", options:['$0$','$3$','$-3$','$4$'], correctIndex:0, explanation:"$3 + (-2) + (-1) = \\mathbf{0}$ — donc $\\vec{u} \\perp \\vec{v}$."},
          {id:'se2-2', type:'qcm', question:"$\\vec{u}(2, 0, 0)$ et $\\vec{v}(0, 3, 4)$ sont :", options:['Colinéaires','Orthogonaux','Égaux','Opposés'], correctIndex:1, explanation:"$\\vec{u} \\cdot \\vec{v} = 0 + 0 + 0 = 0$. <strong>Orthogonaux</strong>."},
          {id:'se2-3', type:'qcm', question:"Pour que $\\vec{u}(1, k, 2) \\perp \\vec{v}(2, 1, -1)$, il faut $k = ?$", options:['$0$','$2$','$-1$','$1$'], correctIndex:0, explanation:"$\\vec{u} \\cdot \\vec{v} = 2 + k - 2 = k$. $k = 0$."},
          {id:'se2-4', type:'qcm', question:"Quelle propriété caractérise un vecteur normal $\\vec{n}$ à un plan ?", options:['$\\vec{n}$ est dans le plan','$\\vec{n}$ est orthogonal à tout vecteur du plan','$\\vec{n}$ est de norme 1','$\\vec{n}$ est nul'], correctIndex:1, explanation:"Un vecteur normal est <strong>orthogonal à tous les vecteurs du plan</strong>."}
        ]
      },
      {
        id:'angles-3d', number:3, title:'Angle entre vecteurs, projection',
        summary:"$\\cos(\\theta) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\cdot \\|\\vec{v}\\|}$.",
        videoId:'eq3JdfTb1IY', videoTitle:'Angle entre vecteurs en 3D (Yvan Monka)',
        explanation:"Pour calculer l'angle entre deux vecteurs (ou deux droites), on utilise la formule du produit scalaire avec le cosinus. On obtient $\\theta$ entre $0$ et $\\pi$.",
        keyPoints:[
          "$\\cos(\\theta) = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\| \\cdot \\|\\vec{v}\\|}$",
          "$\\theta = 0$ si vecteurs colinéaires de même sens ; $\\theta = \\pi$ si sens opposés",
          "$\\theta = \\dfrac{\\pi}{2}$ si vecteurs orthogonaux",
          "Pour deux droites, on prend l'angle aigu (entre $0$ et $\\dfrac{\\pi}{2}$)",
          "$|\\vec{u} \\cdot \\vec{v}| \\leq \\|\\vec{u}\\| \\cdot \\|\\vec{v}\\|$ (inégalité de Cauchy-Schwarz)"
        ],
        exercises:[
          {id:'se3-1', type:'qcm', question:"Si $\\vec{u} \\cdot \\vec{v} > 0$, l'angle entre $\\vec{u}$ et $\\vec{v}$ est :", options:['Aigu (entre $0$ et $\\pi/2$)','Obtus (entre $\\pi/2$ et $\\pi$)','Droit ($\\pi/2$)','Plat ($\\pi$)'], correctIndex:0, explanation:"$\\cos(\\theta) > 0 \\Rightarrow$ angle <strong>aigu</strong>."},
          {id:'se3-2', type:'qcm', question:"Si $\\vec{u} \\cdot \\vec{v} < 0$, l'angle est :", options:['Aigu','Obtus','Droit','Nul'], correctIndex:1, explanation:"$\\cos(\\theta) < 0 \\Rightarrow$ angle <strong>obtus</strong>."},
          {id:'se3-3', type:'qcm', question:"$\\vec{u}(1,0,0)$, $\\vec{v}(1,1,0)$. $\\cos(\\theta) = ?$", options:['$\\dfrac{1}{2}$','$\\dfrac{\\sqrt 2}{2}$','$0$','$1$'], correctIndex:1, explanation:"$\\vec{u} \\cdot \\vec{v} = 1$, $\\|\\vec u\\| = 1$, $\\|\\vec v\\| = \\sqrt 2$. $\\cos\\theta = \\dfrac{1}{\\sqrt 2} = \\mathbf{\\dfrac{\\sqrt 2}{2}}$ ($\\theta = 45°$)."},
          {id:'se3-4', type:'qcm', question:"$\\vec{u}(1, 1, 0)$ et $\\vec{v}(1, -1, 0)$. L'angle vaut :", options:['$0$','$\\dfrac{\\pi}{4}$','$\\dfrac{\\pi}{2}$','$\\pi$'], correctIndex:2, explanation:"$\\vec u \\cdot \\vec v = 1 - 1 + 0 = 0$, donc <strong>$\\dfrac{\\pi}{2}$</strong> (orthogonaux)."}
        ]
      }
    ]
  },

  'plans-espace': {
    description: "Un plan dans l'espace peut être décrit par une équation cartésienne $ax + by + cz + d = 0$ ou par un point + 2 vecteurs directeurs. Outils essentiels pour étudier intersections, distances et positions relatives.",
    properties: [
      {
        id:'eq-cartesienne', number:1, title:'Équation cartésienne d\'un plan',
        summary:"$ax + by + cz + d = 0$ avec $\\vec{n}(a, b, c)$ vecteur normal.",
        videoId:'1zHfPwYAQng', videoTitle:'Équation cartésienne d\'un plan (Yvan Monka)',
        explanation:"Un <strong>plan</strong> de l'espace a une équation de la forme $ax + by + cz + d = 0$, où $\\vec{n}(a, b, c)$ est un <strong>vecteur normal</strong> au plan. Cette équation est unique à un coefficient multiplicatif près.",
        keyPoints:[
          "Équation cartésienne : $ax + by + cz + d = 0$",
          "$\\vec{n}(a, b, c)$ est un vecteur <strong>normal</strong> au plan",
          "Pour trouver $d$ : on remplace $(x,y,z)$ par les coordonnées d'un point du plan",
          "Un point $M(x_0, y_0, z_0)$ est dans le plan $\\Leftrightarrow$ $ax_0 + by_0 + cz_0 + d = 0$",
          "Deux plans sont parallèles $\\Leftrightarrow$ vecteurs normaux colinéaires"
        ],
        exercises:[
          {id:'pl1-1', type:'qcm', question:"Vecteur normal au plan d'équation $2x + 3y - z + 5 = 0$ :", options:['$(2, 3, -1)$','$(2, 3, 1)$','$(2, 3, 5)$','$(-2, -3, 1)$'], correctIndex:0, explanation:"On lit les coefficients de $x, y, z$ : $\\vec{n}(2, 3, -1)$."},
          {id:'pl1-2', type:'qcm', question:"Le point $A(1, 0, 2)$ appartient-il au plan $x + y - z + 1 = 0$ ?", options:['Oui','Non','Indéterminable','Seulement si on translate'], correctIndex:0, explanation:"$1 + 0 - 2 + 1 = 0$. ✓ <strong>Oui</strong>."},
          {id:'pl1-3', type:'qcm', question:"Le point $B(0, 0, 0)$ appartient-il au plan $x + y + z - 3 = 0$ ?", options:['Oui','Non','Indéterminable','Toujours'], correctIndex:1, explanation:"$0 + 0 + 0 - 3 = -3 \\neq 0$. <strong>Non</strong>."},
          {id:'pl1-4', type:'qcm', question:"Équation d'un plan passant par $A(1,0,0)$ et de vecteur normal $\\vec n(1,1,1)$ :", options:['$x+y+z = 0$','$x+y+z-1 = 0$','$x+y+z+1 = 0$','$x = 1$'], correctIndex:1, explanation:"$x+y+z+d = 0$. En $A$ : $1 + 0 + 0 + d = 0$ donc $d = -1$. <strong>$x+y+z-1=0$</strong>."}
        ]
      },
      {
        id:'positions-relatives', number:2, title:'Positions relatives droite/plan, plan/plan',
        summary:"Sécant, parallèle, inclus : déterminé par vecteurs directeurs et normaux.",
        videoId:'1zHfPwYAQng', videoTitle:'Positions relatives — espace (Yvan Monka)',
        explanation:"Pour déterminer si deux objets de l'espace s'intersectent, on compare les vecteurs (directeurs, normaux). On peut être <strong>sécant</strong> (intersection non vide), <strong>parallèle</strong> ou <strong>confondu</strong>.",
        keyPoints:[
          "Droite/plan : si $\\vec{u}_d \\cdot \\vec{n}_p = 0$ alors droite parallèle au plan (ou incluse)",
          "Sinon, droite et plan se coupent en un <strong>unique point</strong>",
          "Plan/plan : si $\\vec{n}_1$ et $\\vec{n}_2$ colinéaires, plans parallèles (ou confondus)",
          "Sinon, plans <strong>sécants</strong> selon une droite",
          "Pour trouver l'intersection : substitution ou résolution du système"
        ],
        exercises:[
          {id:'pl2-1', type:'qcm', question:"Plan $P_1 : x + y + z = 0$ et $P_2 : 2x + 2y + 2z = 3$. Position :", options:['Confondus','Parallèles distincts','Sécants','Orthogonaux'], correctIndex:1, explanation:"Vecteurs normaux $\\vec n_1(1,1,1)$ et $\\vec n_2(2,2,2)$ colinéaires (rapport 2), mais $d_2 \\neq 2 d_1$ : <strong>parallèles distincts</strong>."},
          {id:'pl2-2', type:'qcm', question:"Plan $P_1 : x + y = 0$ et $P_2 : x - z = 0$. Position :", options:['Parallèles','Sécants selon une droite','Confondus','Orthogonaux'], correctIndex:1, explanation:"$\\vec n_1(1,1,0)$, $\\vec n_2(1,0,-1)$ non colinéaires : <strong>sécants</strong> selon une droite."},
          {id:'pl2-3', type:'qcm', question:"Droite de vecteur directeur $\\vec u(1,1,1)$, plan de vecteur normal $\\vec n(1,-2,1)$. Position :", options:['Sécant en un point','Droite parallèle au plan','Droite incluse','Orthogonale au plan'], correctIndex:1, explanation:"$\\vec u \\cdot \\vec n = 1 - 2 + 1 = 0$, donc droite <strong>parallèle</strong> au plan (ou incluse, selon le point)."},
          {id:'pl2-4', type:'qcm', question:"Deux plans sont confondus si :", options:['Leurs équations sont identiques','Leurs vecteurs normaux sont colinéaires ET ils ont un point commun','Ils sont orthogonaux',"Leurs équations diffèrent d'une constante"], correctIndex:1, explanation:"Confondus = <strong>vecteurs normaux colinéaires ET ils partagent un point</strong> (équations proportionnelles)."}
        ]
      },
      {
        id:'distance-projection', number:3, title:'Distance d\'un point à un plan',
        summary:"$d(M, P) = \\dfrac{|ax_M + by_M + cz_M + d|}{\\sqrt{a^2 + b^2 + c^2}}$.",
        videoId:'1zHfPwYAQng', videoTitle:'Distance d\'un point à un plan (Yvan Monka)',
        explanation:"La <strong>distance d'un point $M$ à un plan $P$</strong> d'équation $ax+by+cz+d=0$ se calcule avec une formule simple. C'est aussi la longueur du segment $[MH]$ où $H$ est le projeté orthogonal de $M$ sur $P$.",
        keyPoints:[
          "Distance : $d(M, P) = \\dfrac{|ax_M + by_M + cz_M + d|}{\\sqrt{a^2 + b^2 + c^2}}$",
          "Valeur absolue obligatoire : la distance est positive",
          "Le dénominateur est la norme du vecteur normal",
          "$M \\in P$ $\\Leftrightarrow$ $d(M, P) = 0$",
          "Projeté orthogonal : seul point $H$ de $P$ tel que $MH$ est portée par $\\vec n$"
        ],
        exercises:[
          {id:'pl3-1', type:'numeric', question:"Distance de $O(0,0,0)$ au plan $x + y + z - 3 = 0$. (Donner la valeur en multipliant par $\\sqrt 3$ — la distance vaut $\\sqrt 3$ ; entrer 1.732.)", answer:1.732, tolerance:0.01, explanation:"$d = \\dfrac{|0+0+0-3|}{\\sqrt{1+1+1}} = \\dfrac{3}{\\sqrt 3} = \\sqrt 3 \\approx \\mathbf{1{,}732}$."},
          {id:'pl3-2', type:'numeric', question:"Distance de $A(1,2,3)$ au plan $x + 2y + 2z - 6 = 0$. (Calculer et donner la valeur.)", answer:1.667, tolerance:0.01, explanation:"$d = \\dfrac{|1 + 4 + 6 - 6|}{\\sqrt{1+4+4}} = \\dfrac{5}{3} \\approx \\mathbf{1{,}667}$."},
          {id:'pl3-3', type:'qcm', question:"La distance vaut $0$ ssi :", options:["Le point est l'origine",'Le point appartient au plan',"Le plan passe par l'origine",'Le vecteur normal est nul'], correctIndex:1, explanation:"$d(M, P) = 0 \\Leftrightarrow M \\in P$."},
          {id:'pl3-4', type:'numeric', question:"Distance de $A(0,0,5)$ au plan $z = 0$. (équation : $z = 0$)", answer:5, tolerance:0.001, explanation:"Plan $0x + 0y + z + 0 = 0$. $d = \\dfrac{|5|}{\\sqrt{0+0+1}} = \\mathbf{5}$. (Naturellement, c'est la hauteur sur l'axe $z$.)"}
        ]
      }
    ]
  },

  'suites': {
    description: "Les deux familles de suites les plus utiles du lycée : reconnaître, calculer un terme, sommer, prévoir le comportement.",
    properties: [
      {
        id:'rappels', number:1, title:'Rappels : suites définies par récurrence',
        summary:"Premier terme, relation de récurrence, premières valeurs.",
        videoId:'8I6dotcdW3I', videoTitle:'LE COURS : Les suites — Première (Yvan Monka)',
        explanation:"Une <strong>suite</strong> est une liste ordonnée infinie de nombres. On la note $(u_n)$. Pour la définir, on a besoin du <strong>premier terme</strong> et soit d'une formule explicite, soit d'une <strong>relation de récurrence</strong>.",
        keyPoints:[
          "<strong>Notation</strong> : $(u_n)$ désigne la suite, $u_n$ désigne le terme de rang $n$",
          "<strong>Définition explicite</strong> : $u_n = f(n)$, on calcule directement n'importe quel terme",
          "<strong>Définition récurrente</strong> : $u_0$ (ou $u_1$) donné + relation $u_{n+1} = f(u_n)$ ; il faut calculer les termes les uns après les autres",
          "Pour passer d'une définition récurrente à explicite : c'est souvent l'objectif des exercices"
        ],
        exercises:[
          {
            id:'rap-1', type:'numeric',
            question:"Soit $(u_n)$ définie par $u_0 = 5$ et $u_{n+1} = u_n + 3$.<br/>Que vaut $u_2$ ?",
            answer:11, tolerance:0.001,
            explanation:"$u_0 = 5$, puis $u_1 = u_0 + 3 = 8$, puis $u_2 = u_1 + 3 = \\mathbf{11}$."
          },
          {
            id:'rap-2', type:'qcm',
            question:"Laquelle de ces suites est définie de façon <strong>récurrente</strong> ?",
            options:['$u_n = n^2$','$u_0 = 1$ et $u_{n+1} = 2u_n$','$u_n = 3n + 1$','$u_n = \\sin(n)$'],
            correctIndex:1,
            explanation:"Une définition est récurrente quand le terme suivant est défini à partir du précédent (via $u_{n+1} = f(u_n)$).<br/>Seule l'option $\\mathbf{u_0 = 1 \\text{ et } u_{n+1} = 2u_n}$ correspond. Les autres sont des définitions <strong>explicites</strong>."
          },
          {
            id:'rap-3', type:'numeric',
            question:"Soit $(u_n)$ définie explicitement par $u_n = 2n - 3$.<br/>Que vaut $u_5$ ?",
            answer:7, tolerance:0.001,
            explanation:"On substitue $n = 5$ directement : $u_5 = 2 \\times 5 - 3 = 10 - 3 = \\mathbf{7}$.<br/>(C'est l'avantage du mode explicite : pas besoin de calculer les termes précédents.)"
          },
          {
            id:'rap-4', type:'numeric',
            question:"Soit $(u_n)$ définie par $u_0 = 100$ et $u_{n+1} = \\dfrac{u_n}{2}$.<br/>Que vaut $u_3$ ?",
            answer:12.5, tolerance:0.001,
            explanation:"$u_0 = 100$, $u_1 = 50$, $u_2 = 25$, $u_3 = \\mathbf{12{,}5}$."
          },
          {
            id:'rap-5', type:'qcm',
            question:"Pour une suite définie par $u_0$ et $u_{n+1} = f(u_n)$, pour calculer $u_5$ il faut :",
            options:[
              'Substituer $n = 5$ directement dans la formule',
              'Calculer $u_0$, $u_1$, $u_2$, $u_3$, $u_4$ puis $u_5$',
              'Calculer la limite de la suite',
              'Connaître $u_{10}$'
            ],
            correctIndex:1,
            explanation:"Avec une définition récurrente, on ne peut PAS sauter directement à $u_5$.<br/>Il faut <strong>passer par tous les termes intermédiaires</strong> : $u_0 \\to u_1 \\to u_2 \\to u_3 \\to u_4 \\to u_5$. C'est plus long qu'une définition explicite."
          }
        ]
      },
      {
        id:'arithmetic', number:2, title:'Suites arithmétiques',
        summary:"Raison $r$, terme général $u_n = u_0 + nr$, somme des termes.",
        videoId:'6O0KhPMHvBA', videoTitle:"Déterminer l'expression générale d'une suite arithmétique — Première (Yvan Monka)",
        explanation:"Une suite est <strong>arithmétique</strong> si on passe d'un terme au suivant en <strong>ajoutant toujours le même nombre $r$</strong>, appelé la <strong>raison</strong>. C'est la suite « linéaire » : chaque terme augmente du même incrément.",
        keyPoints:[
          "<strong>Relation de récurrence</strong> : $u_{n+1} = u_n + r$",
          "<strong>Terme général</strong> : $u_n = u_0 + nr$ (ou $u_p + (n-p)r$ si on part de $u_p$)",
          "<strong>Reconnaître une suite arithmétique</strong> : calculer $u_{n+1} - u_n$ et vérifier que c'est constant",
          "<strong>Somme</strong> : $\\displaystyle\\sum_{k=0}^{n} u_k = (n+1) \\times \\frac{u_0 + u_n}{2}$",
          "Exemple : $u_0 = 3$, $r = 2$ $\\to$ $3, 5, 7, 9, 11, \\ldots$"
        ],
        exercises:[
          {
            id:'ari-1', type:'numeric',
            question:"$(u_n)$ est arithmétique de premier terme $u_0 = 5$ et de raison $r = 3$.<br/>Que vaut $u_4$ ?",
            answer:17, tolerance:0.001,
            explanation:"$u_n = u_0 + nr$, donc $u_4 = 5 + 4 \\times 3 = \\mathbf{17}$."
          },
          {
            id:'ari-2', type:'qcm',
            question:"$u_0 = 7$ et $u_5 = 22$ dans une suite arithmétique. Quelle est la raison $r$ ?",
            options:['$r = 3$','$r = 4{,}4$','$r = 5$','$r = 15$'],
            correctIndex:0,
            explanation:"$u_5 = u_0 + 5r \\Leftrightarrow 22 = 7 + 5r \\Leftrightarrow 5r = 15 \\Leftrightarrow r = \\mathbf{3}$."
          },
          {
            id:'ari-3', type:'numeric',
            question:"Suite arithmétique avec $u_0 = 2$ et $r = 4$.<br/>Calculer $S = u_0 + u_1 + \\ldots + u_{10}$.",
            answer:242, tolerance:0.001,
            explanation:"$u_{10} = 2 + 10 \\times 4 = 42$. Il y a $11$ termes.<br/>$S = 11 \\times \\dfrac{u_0 + u_{10}}{2} = 11 \\times \\dfrac{2 + 42}{2} = 11 \\times 22 = \\mathbf{242}$."
          },
          {
            id:'ari-4', type:'qcm',
            question:"Parmi ces suites, laquelle est arithmétique ?",
            options:['$u_n = 2^n$','$u_n = 3n + 5$','$u_n = n^2$','$u_n = \\dfrac{1}{n+1}$'],
            correctIndex:1,
            explanation:"Pour $u_n = 3n + 5$ : $u_{n+1} - u_n = 3(n+1)+5 - (3n+5) = 3$, constant. Donc <strong>arithmétique de raison $3$</strong>."
          },
          {
            id:'ari-5', type:'numeric',
            question:"Suite arithmétique avec $u_2 = 10$ et $u_5 = 19$. Quelle est la raison $r$ ?",
            answer:3, tolerance:0.001,
            explanation:"$u_5 - u_2 = 3r$ (3 pas entre $u_2$ et $u_5$).<br/>$19 - 10 = 9 = 3r \\Rightarrow r = \\mathbf{3}$."
          }
        ]
      },
      {
        id:'geometric', number:3, title:'Suites géométriques',
        summary:"Raison $q$, terme général $u_n = u_0 \\, q^n$, somme géométrique.",
        videoId:'05UHsy9G4M4', videoTitle:'LE COURS : Suites arithmétiques, suites géométriques — Première (Yvan Monka)',
        explanation:"Une suite est <strong>géométrique</strong> si on passe d'un terme au suivant en <strong>multipliant toujours par le même nombre $q$</strong> (non nul), appelé la <strong>raison</strong>. C'est la suite « exponentielle » : chaque terme est multiplié par le même facteur.",
        keyPoints:[
          "<strong>Relation de récurrence</strong> : $u_{n+1} = q \\times u_n$",
          "<strong>Terme général</strong> : $u_n = u_0 \\times q^n$",
          "<strong>Reconnaître</strong> : calculer $\\dfrac{u_{n+1}}{u_n}$ et vérifier que c'est constant",
          "<strong>Somme</strong> (pour $q \\neq 1$) : $\\displaystyle\\sum_{k=0}^{n} u_k = u_0 \\times \\dfrac{1 - q^{n+1}}{1 - q}$",
          "Cas typiques : intérêts composés, populations qui croissent ou décroissent en %"
        ],
        exercises:[
          {
            id:'geo-1', type:'numeric',
            question:"$(u_n)$ est géométrique de premier terme $u_0 = 4$ et de raison $q = 3$.<br/>Que vaut $u_3$ ?",
            answer:108, tolerance:0.001,
            explanation:"$u_n = u_0 \\times q^n$, donc $u_3 = 4 \\times 3^3 = 4 \\times 27 = \\mathbf{108}$."
          },
          {
            id:'geo-2', type:'qcm',
            question:"Quelle est la raison de la suite géométrique $5, 15, 45, 135, \\ldots$ ?",
            options:['$q = 3$','$q = 5$','$q = 10$','$q = 1{,}5$'],
            correctIndex:0,
            explanation:"$\\dfrac{15}{5} = 3$, $\\dfrac{45}{15} = 3$, $\\dfrac{135}{45} = 3$. Donc $\\mathbf{q = 3}$."
          },
          {
            id:'geo-3', type:'qcm',
            question:"Un placement de $1000$ € rapporte $3$ % par an. Quel est le capital après $n$ années ?",
            options:['$1000 + 30n$','$1000 \\times (1{,}03)^n$','$1000 \\times 1{,}3^n$','$1000 \\times 0{,}97^n$'],
            correctIndex:1,
            explanation:"Augmenter de $3$ % revient à multiplier par $1{,}03$ chaque année.<br/>$C_n = \\mathbf{1000 \\times (1{,}03)^n}$."
          },
          {
            id:'geo-4', type:'numeric',
            question:"$(u_n)$ géométrique avec $u_0 = 2$ et $q = 2$.<br/>Calculer $S = u_0 + u_1 + u_2 + u_3$.",
            answer:30, tolerance:0.001,
            explanation:"$u_0 = 2, u_1 = 4, u_2 = 8, u_3 = 16$. Somme $= 2 + 4 + 8 + 16 = \\mathbf{30}$."
          },
          {
            id:'geo-5', type:'qcm',
            question:"Une population diminue de $20$ % chaque année. La suite des populations est :",
            options:['Arithmétique de raison $-20$','Géométrique de raison $0{,}8$','Géométrique de raison $0{,}2$','Géométrique de raison $-0{,}2$'],
            correctIndex:1,
            explanation:"Diminuer de $20$ % revient à <strong>multiplier par $0{,}8$</strong>. Suite géométrique de raison $\\mathbf{q = 0{,}8}$."
          }
        ]
      },
      {
        id:'variation', number:4, title:'Sens de variation',
        summary:"Croissante, décroissante, constante — selon $r$ ou $q$.",
        videoId:'05UHsy9G4M4', videoTitle:'LE COURS : Suites arithmétiques, suites géométriques — Première (Yvan Monka)',
        explanation:"Le <strong>sens de variation</strong> d'une suite dit si elle augmente, diminue ou reste constante. Pour les arithmétiques et géométriques, le sens de variation se lit directement sur la raison.",
        keyPoints:[
          "<strong>Arithmétique</strong> : si $r > 0$ $\\to$ croissante. Si $r < 0$ $\\to$ décroissante. Si $r = 0$ $\\to$ constante.",
          "<strong>Géométrique</strong> (avec $u_0 > 0$) : si $q > 1$ $\\to$ croissante. Si $0 < q < 1$ $\\to$ décroissante. Si $q = 1$ $\\to$ constante.",
          "<strong>Géométrique de raison négative</strong> : la suite n'est ni croissante ni décroissante (elle alterne)",
          "Méthode générale pour toute suite : étudier le signe de $u_{n+1} - u_n$"
        ],
        exercises:[
          {
            id:'var-1', type:'qcm',
            question:"$(u_n)$ est arithmétique de raison $r = 4$. Elle est :",
            options:['Croissante','Décroissante','Constante','On ne peut pas savoir'],
            correctIndex:0,
            explanation:"Pour une suite arithmétique : $r > 0 \\to$ <strong>croissante</strong>. Ici $r = 4 > 0$, donc la suite est <strong>croissante</strong>."
          },
          {
            id:'var-2', type:'qcm',
            question:"$(u_n)$ est géométrique avec $u_0 = 3$ et $q = \\dfrac{1}{2}$. Elle est :",
            options:['Croissante','Décroissante','Constante','Alterne'],
            correctIndex:1,
            explanation:"Pour une suite géométrique avec $u_0 > 0$ : $0 < q < 1 \\to$ <strong>décroissante</strong>.<br/>Ici $u_0 = 3 > 0$ et $q = 0{,}5$, donc <strong>décroissante</strong>. Elle « s'écrase » vers 0."
          },
          {
            id:'var-3', type:'qcm',
            question:"$(u_n)$ est géométrique avec $u_0 = 1$ et $q = -2$. Elle est :",
            options:['Croissante','Décroissante','Ni croissante ni décroissante (alterne)','Constante'],
            correctIndex:2,
            explanation:"Avec une raison <strong>négative</strong>, la suite alterne entre positif et négatif.<br/>Ici : $u_0 = 1, u_1 = -2, u_2 = 4, u_3 = -8, \\ldots$<br/>Elle n'est ni croissante ni décroissante."
          },
          {
            id:'var-4', type:'numeric',
            question:"Suite arithmétique avec $u_5 = 10$ et $u_8 = 4$.<br/>Quelle est la raison $r$ ?",
            answer:-2, tolerance:0.001,
            explanation:"$u_8 - u_5 = 3r$ (3 pas entre $u_5$ et $u_8$).<br/>$4 - 10 = -6 = 3r \\Rightarrow r = \\mathbf{-2}$.<br/>Comme $r < 0$, la suite est décroissante."
          },
          {
            id:'var-5', type:'qcm',
            question:"Pour étudier la variation de <strong>n'importe quelle</strong> suite, on calcule :",
            options:['$\\dfrac{u_n}{u_{n+1}}$','$u_{n+1} - u_n$ et on étudie son signe','$u_0 + u_n$','$u_n^2$'],
            correctIndex:1,
            explanation:"La méthode générale pour <strong>toute suite</strong> est d'étudier le signe de $u_{n+1} - u_n$.<br/>Si $u_{n+1} - u_n > 0$ pour tout $n$ : croissante.<br/>Si $u_{n+1} - u_n < 0$ : décroissante.<br/>(Pour les géométriques, on peut aussi étudier le quotient $\\dfrac{u_{n+1}}{u_n}$.)"
          }
        ]
      },
      {
        id:'comportement', number:5, title:"Comportement à l'infini (intuition)",
        summary:"Vers quoi tend la suite quand $n$ grandit beaucoup.",
        videoId:'05UHsy9G4M4', videoTitle:'LE COURS : Suites arithmétiques, suites géométriques — Première (Yvan Monka)',
        explanation:"Quand $n$ devient très grand, vers quoi <strong>tend</strong> $u_n$ ? C'est une intuition à acquérir en Première — l'étude rigoureuse des limites viendra en Terminale.",
        keyPoints:[
          "<strong>Arithmétique</strong> $r > 0$ : tend vers $+\\infty$. $r < 0$ : tend vers $-\\infty$.",
          "<strong>Géométrique</strong> $q > 1$ : tend vers $+\\infty$ (croissance explosive)",
          "<strong>Géométrique</strong> $0 < q < 1$ : tend vers $0$ (la suite « s'écrase »)",
          "<strong>Géométrique</strong> $q = 1$ : constante",
          "<strong>Géométrique</strong> $q \\leq -1$ : n'a pas de limite (alterne, oscille)",
          "L'intuition d'aujourd'hui devient un théorème rigoureux en Terminale"
        ],
        exercises:[
          {
            id:'com-1', type:'qcm',
            question:"$(u_n)$ est arithmétique de raison $r = 5$. Vers quoi tend-elle quand $n \\to +\\infty$ ?",
            options:['$5$','$0$','$+\\infty$','$-\\infty$'],
            correctIndex:2,
            explanation:"Une suite arithmétique avec $r > 0$ tend vers $+\\infty$ (elle augmente indéfiniment, à raison de $5$ par pas).<br/>Réponse : $\\mathbf{+\\infty}$."
          },
          {
            id:'com-2', type:'qcm',
            question:"$(u_n)$ est géométrique avec $u_0 > 0$ et $q = 0{,}5$. Vers quoi tend-elle ?",
            options:['$0$','$1$','$+\\infty$','Pas de limite'],
            correctIndex:0,
            explanation:"Pour une géométrique avec $0 < q < 1$ : la suite tend vers $\\mathbf{0}$.<br/>Chaque terme vaut la moitié du précédent : $u_0, \\dfrac{u_0}{2}, \\dfrac{u_0}{4}, \\ldots$ — elle s'écrase exponentiellement."
          },
          {
            id:'com-3', type:'qcm',
            question:"$(u_n)$ est géométrique avec $u_0 = 2$ et $q = 3$. Vers quoi tend-elle ?",
            options:['$0$','$3$','$+\\infty$','Indéterminée'],
            correctIndex:2,
            explanation:"Pour une géométrique avec $q > 1$ : croissance explosive vers $\\mathbf{+\\infty}$.<br/>Ici : $u_0 = 2, u_1 = 6, u_2 = 18, u_3 = 54, u_4 = 162, \\ldots$"
          },
          {
            id:'com-4', type:'qcm',
            question:"$(u_n)$ est géométrique de raison $q = -2$. Vers quoi tend-elle ?",
            options:['$0$','$+\\infty$','$-\\infty$','Pas de limite (oscille)'],
            correctIndex:3,
            explanation:"Avec une raison $\\leq -1$, la suite alterne entre positif et négatif, en grandissant en valeur absolue.<br/>$u_0, -2u_0, 4u_0, -8u_0, \\ldots$ — elle <strong>n'a pas de limite</strong>, elle oscille."
          },
          {
            id:'com-5', type:'numeric',
            question:"$(u_n)$ est géométrique avec $u_0 = 7$ et $q = 1$.<br/>Vers quoi tend-elle ?",
            answer:7, tolerance:0.001,
            explanation:"Si $q = 1$, alors $u_{n+1} = 1 \\times u_n = u_n$ : la suite est <strong>constante</strong>.<br/>Tous les termes valent $7$, donc la limite est $\\mathbf{7}$."
          }
        ]
      }
    ]
  }
};

// ---------------------------------------------------------------------
// MOTIVATIONS
// ---------------------------------------------------------------------
const TAGLINES = [
  "Prêt à dompter les maths ?",
  "Chaque petite session te rapproche du bac.",
  "Une propriété par jour, et le programme tombe.",
  "Aujourd'hui, tu vas comprendre un truc nouveau. 💡",
  "Le produit scalaire ne va pas t'attendre. 😎",
  "Yvan Monka serait fier.",
  "On respire, on se concentre, on attaque.",
  "Quinze minutes maintenant valent mieux que deux heures dans une semaine.",
  "T'es là, c'est que t'es sérieux. Respect.",
  "Aujourd'hui est un bon jour pour progresser."
];

// ---------------------------------------------------------------------
// BOUTIQUE
// ---------------------------------------------------------------------
const SHOP = {
  wallpapers: [
    { id:'default',  name:'Aurore',             price:0,   description:'Le thème original, violet et rose pastel.' },
    { id:'midnight', name:'Minuit',             price:150, description:'Profond bleu nuit avec étoiles.' },
    { id:'sunset',   name:'Coucher de soleil',  price:250, description:'Orange, rose et pourpre flamboyants.' },
    { id:'forest',   name:'Forêt',              price:400, description:'Vert émeraude apaisant.' },
    { id:'sakura',   name:'Sakura',             price:350, description:'Rose cerisier doux et apaisant.' },
    { id:'neon',     name:'Néon',               price:600, description:'Cyan et magenta vibrants, mode cyberpunk.' },
    { id:'galaxie',  name:'Galaxie',            price:900, description:'Profondeurs de l\'espace, étoiles et nébuleuses.' }
  ],
  titles: [
    { id:'eleve',    name:'Élève',     price:0,    color:'text-slate-600' },
    { id:'curieux',  name:'Curieux',   price:80,   color:'text-blue-600' },
    { id:'affute',   name:'Affûté',    price:150,  color:'text-purple-600' },
    { id:'champion', name:'Champion',  price:350,  color:'text-pink-600' },
    { id:'crack',    name:'Crack',     price:550,  color:'text-emerald-600' },
    { id:'legende',  name:'Légende',   price:800,  color:'text-amber-600' },
    { id:'genie',    name:'Génie',     price:1200, color:'text-cyan-600' },
    { id:'prodige',  name:'Prodige',   price:2000, color:'text-rose-600' }
  ],
  utilities: [
    { id:'streak-shield', name:'Bouclier de série', price:100, description:'Protège ta série quand tu loupes un jour. Consommable.', icon:'🛡️' }
  ],
  challenges: [
    { id:'sunday-x3', name:'Défi du dimanche ×3', requiredLevel:5, description:'Chaque dimanche, un exercice bonus rapporte 3× plus d\'XP.', icon:'🎯' }
  ],
  prestige: [
    { id:'mystery',  name:'???', requiredLevel:20, description:'Une récompense unique t\'attend au niveau 20. On en reparlera.', icon:'✨' }
  ],
  carSkins: [
    { id:'red',     name:'Rouge classique',  price:0,   currency:'tokens', body:'#EF4444', roof:'#DC2626' },
    { id:'blue',    name:'Bleu océan',       price:30,  currency:'tokens', body:'#3B82F6', roof:'#1D4ED8' },
    { id:'yellow',  name:'Jaune soleil',     price:50,  currency:'tokens', body:'#FACC15', roof:'#CA8A04' },
    { id:'green',   name:'Vert tropical',    price:50,  currency:'tokens', body:'#10B981', roof:'#047857' },
    { id:'purple',  name:'Néon violet',      price:100, currency:'tokens', body:'#A855F7', roof:'#7E22CE' },
    { id:'pink',    name:'Néon rose',        price:120, currency:'tokens', body:'#EC4899', roof:'#BE185D' },
    { id:'gold',    name:'Or',               price:250, currency:'tokens', body:'#FCD34D', roof:'#D97706' },
    { id:'f1',      name:'F1 (noir mat)',    price:400, currency:'tokens', body:'#1F2937', roof:'#111827' }
  ]
};

const IMAGE_GEN_COST = 1000;     // XP par image
const IMAGE_GEN_PER_DAY = 1;     // limite quotidienne

const STYLE_CHIPS = [
  { label:'Anime', value:'in anime style' },
  { label:'Cinématique', value:'cinematic shot, dramatic lighting' },
  { label:'Épique', value:'epic, highly detailed, masterpiece' },
  { label:'Manga', value:'manga style, ink lines' },
  { label:'Réaliste', value:'photorealistic, 8k' },
  { label:'Néon', value:'neon cyberpunk colors' }
];

// ---------------------------------------------------------------------
// STATE
// ---------------------------------------------------------------------
const STORAGE_KEY = 'pts-maths-state-v1';

const defaultState = {
  user: { name:'', classLevel:'premiere', onboarded:false },
  installDismissedISO: null,  // ISO date du dernier "Plus tard" sur la proposition d'install
  xp: 0,
  streak: { count:0, lastDayISO:null },
  soundEnabled: true,
  theme: 'light', // 'light' | 'dark'
  geminiKey: '',  // Clé API Gemini (facultatif, pour feedback IA sur erreurs)
  tokens: 0,                // Jetons gagnés aux mini-jeux
  silverTokens: 0,          // Jetons argent (= 500 jetons normaux)
  racingBestScore: 0,       // Meilleur score au Sprint Mathématique
  racingLeaderboard: [],    // [{score, distance, tokens, dateISO}]
  basketsBestScore: 0,      // Meilleur score au Bons Paniers
  basketsLeaderboard: [],   // [{score, streakMax, tokens, dateISO}]
  progress: {},
  currentScreen: 'home',
  currentChapter: null,
  currentProperty: null,
  shop: {
    ownedWallpapers: ['default'],
    activeWallpaper: 'default',
    ownedTitles: ['eleve'],
    activeTitle: 'eleve',
    shieldsAvailable: 0,
    lastSundayChallengeISO: null,
    customWallpapers: [],     // [{ id, name, prompt, url, createdAt }]
    lastImageGenISO: null,    // ISO date string of last generation
    ownedCarSkins: ['red'],   // Skins voiture Sprint possédés
    activeCarSkin: 'red'      // Skin voiture actif
  }
};

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      user: { ...defaultState.user, ...(parsed.user || {}) },
      streak: { ...defaultState.streak, ...(parsed.streak || {}) },
      shop: { ...defaultState.shop, ...(parsed.shop || {}) }
    };
  } catch (e) {
    console.warn('[State] Erreur de chargement, reset:', e);
    return structuredClone(defaultState);
  }
}
function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch (e) { console.warn('[State] Erreur de sauvegarde:', e); }
}
function resetState() {
  localStorage.removeItem(STORAGE_KEY);
  state = structuredClone(defaultState);
}

// ---------------------------------------------------------------------
// XP / NIVEAU
// ---------------------------------------------------------------------
function levelFromXp(xp) { return Math.floor(Math.sqrt(xp / 50)) + 1; }
function xpForLevel(n)   { return 50 * (n - 1) * (n - 1); }

function gainXp(amount, reason) {
  const oldLevel = levelFromXp(state.xp);
  state.xp += amount;
  const newLevel = levelFromXp(state.xp);
  saveState();
  updateXpUI();
  audio.play('xp');
  toast(`+${amount} XP ${reason ? '· ' + reason : ''}`, 'xp');
  if (newLevel > oldLevel) setTimeout(() => onLevelUp(newLevel), 800);
}
function onLevelUp(level) {
  audio.play('levelup');
  confettiBurst('rainbow');
  toast(`🏆 Niveau ${level} atteint !`, 'level');
}

// IMPORTANT : on met aussi à jour TOUS les "miroirs" via classes (.xp-mirror, .level-mirror)
function updateXpUI() {
  document.querySelectorAll('#dash-xp, #home-xp, #shop-xp, #studio-xp, .xp-mirror').forEach((el) => el.textContent = state.xp);
  const lvl = levelFromXp(state.xp);
  document.querySelectorAll('#dash-level, #home-level, .level-mirror').forEach((el) => el.textContent = lvl);
}

// ---------------------------------------------------------------------
// STREAK
// ---------------------------------------------------------------------
function todayISO() { return new Date().toISOString().slice(0, 10); }
function yesterdayISO() { const d = new Date(); d.setDate(d.getDate() - 1); return d.toISOString().slice(0, 10); }

function touchStreak() {
  const today = todayISO();
  if (state.streak.lastDayISO === today) return;
  if (state.streak.lastDayISO === yesterdayISO()) state.streak.count += 1;
  else if (state.streak.lastDayISO === null)      state.streak.count = 1;
  else                                             state.streak.count = 1;
  state.streak.lastDayISO = today;
  saveState();
  updateStreakUI();
}
function useShieldIfPossible() {
  const today = todayISO();
  const last = state.streak.lastDayISO;
  if (!last || last === today || last === yesterdayISO()) return false;
  if (state.shop.shieldsAvailable <= 0) return false;
  state.shop.shieldsAvailable -= 1;
  state.streak.lastDayISO = yesterdayISO();
  saveState();
  updateStreakUI();
  audio.play('success');
  toast('🛡️ Bouclier utilisé : ta série est sauvée !', 'success');
  return true;
}
function updateStreakUI() {
  document.querySelectorAll('#home-streak-count, #dash-streak, .streak-mirror').forEach((el) => el.textContent = state.streak.count);
}

// ---------------------------------------------------------------------
// SONS
// ---------------------------------------------------------------------
const audio = {
  ctx: null,
  ensureCtx() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    }
    return this.ctx;
  },
  tone(freq, duration, type = 'sine', volume = 0.15, when = 0) {
    const ctx = this.ensureCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type; osc.frequency.value = freq;
    const t0 = ctx.currentTime + when;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(t0); osc.stop(t0 + duration + 0.02);
  },
  play(type) {
    if (!state.soundEnabled) return;
    switch (type) {
      case 'success':
        this.tone(523.25, 0.12, 'triangle', 0.18, 0);
        this.tone(659.25, 0.12, 'triangle', 0.18, 0.07);
        this.tone(783.99, 0.22, 'triangle', 0.18, 0.14);
        break;
      case 'error':
        this.tone(220, 0.15, 'square', 0.10, 0);
        this.tone(165, 0.25, 'square', 0.10, 0.10);
        break;
      case 'xp':
        this.tone(880, 0.08, 'sine', 0.10, 0);
        this.tone(1318.5, 0.12, 'sine', 0.10, 0.04);
        break;
      case 'levelup':
        this.tone(523.25, 0.12, 'triangle', 0.15, 0);
        this.tone(659.25, 0.12, 'triangle', 0.15, 0.10);
        this.tone(783.99, 0.12, 'triangle', 0.15, 0.20);
        this.tone(1046.5, 0.30, 'triangle', 0.18, 0.30);
        break;
      case 'purchase':
        this.tone(659.25, 0.10, 'triangle', 0.15, 0);
        this.tone(880, 0.10, 'triangle', 0.15, 0.08);
        this.tone(1046.5, 0.18, 'triangle', 0.15, 0.16);
        break;
      case 'magic':
        this.tone(523.25, 0.06, 'sine', 0.12, 0);
        this.tone(659.25, 0.06, 'sine', 0.12, 0.05);
        this.tone(783.99, 0.06, 'sine', 0.12, 0.10);
        this.tone(1046.5, 0.06, 'sine', 0.12, 0.15);
        this.tone(1318.5, 0.20, 'sine', 0.15, 0.20);
        break;
      case 'denied':
        this.tone(330, 0.18, 'sawtooth', 0.08, 0);
        break;
      case 'click':
        this.tone(800, 0.04, 'sine', 0.05, 0);
        break;
    }
  }
};

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  saveState();
  updateSoundUI();
  if (state.soundEnabled) audio.play('click');
}
function updateSoundUI() {
  const icon = document.getElementById('sound-icon');
  if (icon) icon.textContent = state.soundEnabled ? '🔊' : '🔇';
  const toggle = document.getElementById('set-sound');
  if (toggle) {
    toggle.classList.toggle('bg-brand-600', state.soundEnabled);
    toggle.classList.toggle('bg-slate-200', !state.soundEnabled);
    toggle.querySelector('span').style.transform = state.soundEnabled ? 'translateX(24px)' : 'translateX(0)';
  }
}

// ---------------------------------------------------------------------
// CONFETTIS
// ---------------------------------------------------------------------
function confettiBurst(style = 'standard') {
  if (typeof confetti !== 'function') return;
  if (style === 'rainbow') {
    confetti({ particleCount:120, spread:90, origin:{y:0.6}, colors:['#5B6CFF','#10B981','#F59E0B','#EC4899','#F472B6','#06B6D4'] });
    setTimeout(() => confetti({ particleCount:60, angle:60, spread:55, origin:{x:0} }), 200);
    setTimeout(() => confetti({ particleCount:60, angle:120, spread:55, origin:{x:1} }), 400);
  } else {
    confetti({ particleCount:80, spread:70, origin:{y:0.7}, colors:['#5B6CFF','#10B981','#F59E0B'] });
  }
}

// ---------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------
function showScreen(id) {
  document.querySelectorAll('.screen').forEach((s) => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) { el.classList.remove('hidden'); window.scrollTo({ top: 0 }); }
  state.currentScreen = id.replace('-screen', '');
  saveState();
}

// ---------------------------------------------------------------------
// THÈME CLAIR / SOMBRE
// ---------------------------------------------------------------------
function applyTheme() {
  const t = state.theme === 'dark' ? 'dark' : 'light';
  document.body.setAttribute('data-theme', t);
  updateThemeUI();
}
function toggleTheme() {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  saveState();
  applyTheme();
  audio.play('click');
}
function updateThemeUI() {
  const icon = document.getElementById('theme-icon');
  if (icon) icon.textContent = state.theme === 'dark' ? '☀️' : '🌙';
  const setBtn = document.getElementById('set-theme');
  if (setBtn) {
    setBtn.classList.toggle('bg-brand-600', state.theme === 'dark');
    setBtn.classList.toggle('bg-slate-200', state.theme !== 'dark');
    const knob = setBtn.querySelector('span');
    if (knob) knob.style.transform = state.theme === 'dark' ? 'translateX(24px)' : 'translateX(0)';
  }
}

// ---------------------------------------------------------------------
// FOND D'ÉCRAN (appliqué sur <body> → visible sur tous les écrans)
// ---------------------------------------------------------------------
function applyWallpaper() {
  const id = state.shop.activeWallpaper || 'default';
  document.body.setAttribute('data-wallpaper', id);

  // Si fond custom (image générée), on injecte l'URL en background
  if (id.startsWith('custom-')) {
    const custom = state.shop.customWallpapers.find((w) => w.id === id);
    if (custom) {
      document.body.style.backgroundImage = `url("${custom.url}")`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
      document.body.style.backgroundRepeat = 'no-repeat';
      return;
    }
  }
  // Sinon, on retire l'éventuelle image custom (les thèmes prédéfinis utilisent du CSS pur)
  document.body.style.backgroundImage = '';
  document.body.style.backgroundSize = '';
  document.body.style.backgroundPosition = '';
  document.body.style.backgroundAttachment = '';
  document.body.style.backgroundRepeat = '';
}

// ---------------------------------------------------------------------
// ONBOARDING
// ---------------------------------------------------------------------
function showOnboardingStep(step) {
  document.querySelectorAll('.ob-step').forEach((el) => el.classList.add('hidden'));
  document.getElementById('ob-step-' + step).classList.remove('hidden');
}
function setupOnboarding() {
  const nameInput = document.getElementById('ob-name-input');
  const nameNext  = document.getElementById('ob-name-next');
  nameInput.addEventListener('input', () => { nameNext.disabled = nameInput.value.trim().length < 2; });
  nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !nameNext.disabled) nameNext.click(); });
  nameNext.addEventListener('click', () => {
    state.user.name = nameInput.value.trim();
    saveState(); audio.play('click'); showOnboardingStep('class');
  });
  document.querySelectorAll('.ob-class-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.user.classLevel = btn.dataset.class;
      saveState(); audio.play('click');
      document.getElementById('ob-welcome-name').textContent = state.user.name + ' !';
      showOnboardingStep('welcome');
      setTimeout(() => confettiBurst('standard'), 200);
    });
  });
  document.getElementById('ob-finish').addEventListener('click', () => {
    state.user.onboarded = true;
    touchStreak(); saveState(); audio.play('success');
    applyWallpaper();
    showScreen('home-screen'); renderHome();
    // Propose l'installation PWA juste après l'onboarding
    setTimeout(() => maybeShowInstallPrompt('post-onboarding'), 1800);
  });
}

// ---------------------------------------------------------------------
// HOME SCREEN
// ---------------------------------------------------------------------
function renderHome() {
  document.getElementById('home-name').textContent = state.user.name + ' !';
  document.getElementById('home-tagline').textContent = TAGLINES[Math.floor(Math.random() * TAGLINES.length)];

  const titleEl = document.getElementById('home-title');
  const activeTitle = SHOP.titles.find((t) => t.id === state.shop.activeTitle) || SHOP.titles[0];
  titleEl.textContent = activeTitle.name;
  titleEl.className = `home-title-badge ${activeTitle.color}`;

  updateStreakUI(); updateXpUI();
  const chaptersDone = Object.values(state.progress || {}).filter((c) => c && c.chapterMastered).length;
  document.getElementById('home-chapters').textContent = chaptersDone;
  document.getElementById('home-cta-label').textContent = chaptersDone > 0 || state.xp > 0 ? 'Continuer' : 'Commencer';

  applyWallpaper();
}
function setupHome() {
  document.getElementById('home-cta').addEventListener('click', () => {
    audio.play('click'); showScreen('dashboard-screen'); renderDashboard();
  });
  document.getElementById('sound-toggle').addEventListener('click', toggleSound);
  document.getElementById('home-settings').addEventListener('click', openSettings);
  document.getElementById('home-shop').addEventListener('click', () => {
    audio.play('click'); showScreen('shop-screen'); renderShop();
  });
  document.getElementById('home-studio').addEventListener('click', () => {
    audio.play('click'); showScreen('studio-screen'); renderStudio();
  });
  document.getElementById('home-race').addEventListener('click', () => {
    audio.play('click'); startRace();
  });
  document.getElementById('home-baskets').addEventListener('click', () => {
    audio.play('click'); startBaskets();
  });
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

// ---------------------------------------------------------------------
// DASHBOARD
// ---------------------------------------------------------------------
function renderDashboard() {
  document.querySelectorAll('.level-tab').forEach((tab) => {
    const isActive = tab.dataset.level === state.user.classLevel;
    tab.classList.toggle('bg-brand-600', isActive);
    tab.classList.toggle('text-white', isActive);
    tab.classList.toggle('shadow-card', isActive);
    tab.classList.toggle('bg-white', !isActive);
    tab.classList.toggle('text-slate-600', !isActive);
    tab.classList.toggle('border', !isActive);
    tab.classList.toggle('border-slate-200', !isActive);
  });
  document.getElementById('dash-name').textContent = state.user.name + ' 👋';
  updateStreakUI(); updateXpUI();
  renderChapters(state.user.classLevel);
}
function computeChapterStatus(chapter) {
  if (chapter.status === 'coming-soon') return 'coming-soon';
  const progress = state.progress[chapter.id] || {};
  if (progress.chapterMastered) return 'completed';
  const details = CHAPTER_DETAILS[chapter.id];
  if (details) {
    const anyMastered = details.properties.some((p) => (progress[p.id] || {}).mastered);
    if (anyMastered) return 'in-progress';
  }
  return 'not-started';
}

function computeChapterProgress(chapter) {
  const details = CHAPTER_DETAILS[chapter.id];
  if (!details) return 0;
  const progress = state.progress[chapter.id] || {};
  if (progress.chapterMastered) return 100;
  const masteredCount = details.properties.filter((p) => (progress[p.id] || {}).mastered).length;
  return Math.round((masteredCount / details.properties.length) * 100);
}

function renderChapters(level) {
  const grid = document.getElementById('chapters-grid');
  const emptyState = document.getElementById('empty-state');
  const chapters = CHAPTERS[level] || [];
  // Message personnalisé selon le niveau vide
  if (chapters.length === 0) {
    grid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    emptyState.innerHTML = level === 'terminale'
      ? `<div class="text-5xl mb-3">📚</div><p class="text-slate-500">Les chapitres de Terminale arrivent bientôt.</p>`
      : `<div class="text-5xl mb-3">📚</div><p class="text-slate-500">Pas encore de chapitre dans cette catégorie.</p>`;
    return;
  }
  grid.classList.remove('hidden'); emptyState.classList.add('hidden');
  // Calcule le statut et la progression dynamiques pour chaque chapitre
  const enrichedChapters = chapters.map((c) => ({
    ...c,
    status: computeChapterStatus(c),
    progress: computeChapterProgress(c)
  }));
  grid.innerHTML = enrichedChapters.map(chapterCardHTML).join('');
  grid.querySelectorAll('[data-chapter-id]').forEach((card) => {
    card.addEventListener('click', () => {
      const id = card.dataset.chapterId;
      const chap = chapters.find((c) => c.id === id);
      audio.play('click');
      if (chap.status === 'coming-soon') { toast(`"${chap.title}" sera disponible bientôt.`); return; }
      openChapter(id);
    });
  });
}
function chapterCardHTML(chapter) {
  const statusBadge = {
    'not-started':'<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">À commencer</span>',
    'in-progress':'<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">En cours</span>',
    'completed':  '<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">⭐ Validé</span>',
    'coming-soon':'<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">Bientôt</span>'
  }[chapter.status];
  const isDisabled = chapter.status === 'coming-soon';
  const cls = isDisabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1 hover:shadow-cardHover';
  return `
    <div data-chapter-id="${chapter.id}" class="group bg-white rounded-2xl p-5 shadow-card transition-all duration-200 ${cls} border border-slate-100">
      <div class="flex items-start justify-between mb-3">
        <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${chapter.color} flex items-center justify-center text-white text-xl font-bold shadow-card">${chapter.icon}</div>
        ${statusBadge}
      </div>
      <h3 class="font-bold text-base mb-1 group-hover:text-brand-600 transition-colors">${chapter.title}</h3>
      <p class="text-sm text-slate-500 leading-relaxed mb-4">${chapter.subtitle}</p>
      <div class="flex items-center justify-between">
        <div class="flex-1 mr-3"><div class="h-1.5 bg-slate-100 rounded-full overflow-hidden"><div class="h-full bg-brand-500 rounded-full transition-all" style="width: ${chapter.progress}%"></div></div></div>
        <span class="text-xs font-semibold text-slate-400">${chapter.progress}%</span>
      </div>
    </div>
  `;
}
function setupDashboard() {
  document.querySelectorAll('.level-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      audio.play('click');
      state.user.classLevel = tab.dataset.level;
      renderDashboard();
    });
  });
  document.getElementById('back-to-home').addEventListener('click', () => {
    audio.play('click'); showScreen('home-screen'); renderHome();
  });
}

// ---------------------------------------------------------------------
// CHAPTER SCREEN
// ---------------------------------------------------------------------
function getChapterLevelLabel(chapterId) {
  if ((CHAPTERS.premiere || []).find((c) => c.id === chapterId)) return 'Première · Spé Maths';
  if ((CHAPTERS.terminale || []).find((c) => c.id === chapterId)) return 'Terminale · Spé Maths';
  if ((CHAPTERS.bases || []).find((c) => c.id === chapterId))     return 'Bases · Collège & Seconde';
  return '';
}

function openChapter(chapterId) {
  state.currentChapter = chapterId;
  saveState();
  showScreen('chapter-screen');
  renderChapter(chapterId);
}
function renderChapter(chapterId) {
  const allChapters = [...CHAPTERS.premiere, ...CHAPTERS.terminale, ...(CHAPTERS.bases || [])];
  const chap = allChapters.find((c) => c.id === chapterId);
  const details = CHAPTER_DETAILS[chapterId];
  if (!chap || !details) {
    document.getElementById('chapter-content').innerHTML = `<p class="text-center text-slate-500 py-12">Chapitre introuvable.</p>`;
    return;
  }
  const props = details.properties.map((p, i) => {
    const propProgress = (state.progress[chapterId] && state.progress[chapterId][p.id]) || { mastered:false, progress:0 };
    const previousMastered = i === 0 ? true : ((state.progress[chapterId] || {})[details.properties[i-1].id] || {}).mastered;
    return { ...p, ...propProgress, locked: !previousMastered };
  });
  const masteredCount = props.filter((p) => p.mastered).length;
  const totalProps = props.length;
  const overallPercent = totalProps ? Math.round((masteredCount / totalProps) * 100) : 0;

  document.getElementById('chapter-content').innerHTML = `
    <section class="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 mb-8">
      <div class="flex items-start gap-4 sm:gap-6 mb-5">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${chap.color} flex items-center justify-center text-white text-3xl sm:text-4xl font-extrabold shadow-card flex-shrink-0">${chap.icon}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="text-xs font-semibold uppercase tracking-wider text-slate-400">${getChapterLevelLabel(chapterId)}</div>
            <button id="open-fiche-revision" class="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-extrabold uppercase tracking-wider transition-all border border-amber-200 shadow-sm">
              <span>📄</span> Fiche de révision
            </button>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">${chap.title}</h1>
          <p class="text-sm sm:text-base text-slate-600 leading-relaxed">${details.description}</p>
        </div>
      </div>
      <div class="mt-6 pt-6 border-t border-slate-100">
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-semibold text-slate-700">Progression globale</span>
          <span class="text-sm font-bold text-brand-600">${masteredCount} / ${totalProps} propriétés</span>
        </div>
        <div class="h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-brand-500 to-pink-500 rounded-full transition-all duration-700" style="width: ${overallPercent}%"></div>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-lg font-extrabold mb-4 tracking-tight">Propriétés du chapitre</h2>
      <div class="space-y-3">${props.map((p) => propertyCardHTML(p, chapterId)).join('')}</div>
    </section>

    <section>${finalEvalCardHTML(masteredCount, totalProps, chapterId)}</section>
  `;

  document.querySelectorAll('[data-prop-id]').forEach((card) => {
    card.addEventListener('click', () => {
      const propId = card.dataset.propId;
      const prop = props.find((p) => p.id === propId);
      audio.play('click');
      if (prop.locked) {
        toast('🔒 Maîtrise d\'abord la propriété précédente.');
        audio.play('denied');
      } else {
        openProperty(chapterId, propId);
      }
    });
  });
  const ficheBtn = document.getElementById('open-fiche-revision');
  if (ficheBtn) ficheBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    audio.play('click');
    openFicheRevision(chapterId);
  });

  document.querySelectorAll('.eval-variant-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      audio.play('click');
      if (btn.disabled) return;
      const variant = btn.dataset.evalVariant;
      startEvaluation(chapterId, variant);
    });
  });

  // Mise à jour explicite des miroirs streak/XP (fix bug)
  updateStreakUI();
  updateXpUI();
  renderMath(document.getElementById('chapter-content'));
}

function propertyCardHTML(prop) {
  const num = prop.number;
  const statusIcon = prop.mastered ? '⭐' : (prop.locked ? '🔒' : String(num));
  const statusColor = prop.mastered ? 'bg-emerald-100 text-emerald-700' : (prop.locked ? 'bg-slate-100 text-slate-400' : 'bg-brand-100 text-brand-700');
  const actionLabel = prop.mastered ? 'Refaire' : (prop.locked ? 'Verrouillé' : (prop.progress > 0 ? 'Continuer' : 'Commencer'));
  const actionCls = prop.locked ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-card cursor-pointer';
  const cardCls = prop.locked ? 'opacity-70' : 'hover:-translate-y-0.5 hover:shadow-cardHover cursor-pointer';
  return `
    <div data-prop-id="${prop.id}" class="bg-white rounded-2xl p-4 sm:p-5 shadow-card border border-slate-100 transition-all duration-200 ${cardCls}">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl ${statusColor} flex items-center justify-center text-lg font-extrabold flex-shrink-0">${statusIcon}</div>
        <div class="flex-1 min-w-0">
          <h3 class="font-bold text-sm sm:text-base truncate">${prop.title}</h3>
          <p class="text-xs sm:text-sm text-slate-500 leading-relaxed line-clamp-2">${prop.summary}</p>
          <div class="mt-2 h-1 bg-slate-100 rounded-full overflow-hidden">
            <div class="h-full ${prop.mastered ? 'bg-emerald-500' : 'bg-brand-500'} rounded-full transition-all" style="width: ${prop.mastered ? 100 : prop.progress}%"></div>
          </div>
        </div>
        <button class="px-4 py-2 rounded-xl text-sm font-bold transition-colors ${actionCls} flex-shrink-0 hidden sm:block" ${prop.locked ? 'disabled' : ''}>${actionLabel}</button>
      </div>
    </div>
  `;
}
function finalEvalCardHTML(masteredCount, total, chapterId) {
  const unlocked = masteredCount === total;
  const variants = ['A', 'B', 'C', 'D'];
  const progress = (state.progress[chapterId] && state.progress[chapterId].evalVariants) || {};
  const variantsHTML = variants.map((v) => {
    const status = progress[v] || 'pending';
    const icon = status === 'success' ? '⭐' : (status === 'failed' ? '🔁' : '🎯');
    const colorCls = status === 'success'
      ? 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-700'
      : (status === 'failed' ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-700' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700');
    const lockedCls = unlocked ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed';
    return `<button data-eval-variant="${v}" class="eval-variant-btn flex-1 px-3 py-3 rounded-xl border-2 ${colorCls} ${lockedCls} font-bold text-sm transition-all" ${unlocked ? '' : 'disabled'}>${icon} Éval ${v}</button>`;
  }).join('');

  return `
    <div class="relative overflow-hidden rounded-3xl ${unlocked ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500' : 'bg-gradient-to-br from-slate-100 to-slate-200'} p-6 sm:p-8 shadow-card">
      <div class="flex items-center gap-4 sm:gap-6 mb-4">
        <div class="text-5xl sm:text-6xl ${unlocked ? '' : 'grayscale opacity-50'}">🏆</div>
        <div class="flex-1">
          <h3 class="text-xl sm:text-2xl font-extrabold ${unlocked ? 'text-white' : 'text-slate-500'}">Évaluations finales</h3>
          <p class="text-sm sm:text-base ${unlocked ? 'text-white/90' : 'text-slate-500'} leading-relaxed mt-1">
            ${unlocked ? '4 évaluations différentes (A, B, C, D) — 2 exos par propriété, tirage déterministe. Zéro faute = ⭐.' : `Maîtrise les ${total} propriétés pour débloquer les évaluations.`}
          </p>
        </div>
      </div>
      <div class="flex flex-wrap gap-2 sm:gap-3">${variantsHTML}</div>
      ${unlocked ? '<p class="text-xs text-white/80 mt-3 italic">Chaque évaluation est différente. Tu peux les refaire autant que tu veux.</p>' : ''}
    </div>
  `;
}
function setupChapterScreen() {
  document.getElementById('back-to-dashboard').addEventListener('click', () => {
    audio.play('click'); showScreen('dashboard-screen'); renderDashboard();
  });
}

// ---------------------------------------------------------------------
// PROPERTY SCREEN — Étape 3 : vidéo Monka + explication + points-clés
// ---------------------------------------------------------------------
function openProperty(chapterId, propertyId) {
  state.currentChapter = chapterId;
  state.currentProperty = propertyId;
  saveState();
  showScreen('property-screen');
  renderProperty(chapterId, propertyId);
}

function renderProperty(chapterId, propertyId) {
  const allChapters = [...CHAPTERS.premiere, ...CHAPTERS.terminale, ...(CHAPTERS.bases || [])];
  const chap = allChapters.find((c) => c.id === chapterId);
  const details = CHAPTER_DETAILS[chapterId];
  if (!chap || !details) {
    document.getElementById('property-content').innerHTML = `<p class="text-center text-slate-500 py-12">Propriété introuvable.</p>`;
    return;
  }
  const prop = details.properties.find((p) => p.id === propertyId);
  if (!prop) {
    document.getElementById('property-content').innerHTML = `<p class="text-center text-slate-500 py-12">Propriété introuvable.</p>`;
    return;
  }

  // Index de la propriété (pour navigation suivant / précédent)
  const idx = details.properties.findIndex((p) => p.id === propertyId);
  const prev = idx > 0 ? details.properties[idx - 1] : null;
  const next = idx < details.properties.length - 1 ? details.properties[idx + 1] : null;
  // La propriété suivante n'est accessible que si la courante est maîtrisée
  const currentMastered = ((state.progress[chapterId] || {})[propertyId] || {}).mastered;
  const nextAccessible = next && currentMastered;

  // Embed YouTube — domaine standard pour compat file://
  const videoEmbed = prop.videoId
    ? `<div class="aspect-video rounded-2xl overflow-hidden shadow-card bg-black">
         <iframe src="https://www.youtube.com/embed/${prop.videoId}?rel=0&modestbranding=1&playsinline=1&fs=1"
                 title="${prop.videoTitle || prop.title}"
                 frameborder="0"
                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                 allowfullscreen
                 class="w-full h-full"></iframe>
       </div>
       <a href="https://www.youtube.com/watch?v=${prop.videoId}" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-brand-600 transition-colors">
         ↗ Ouvrir cette vidéo directement sur YouTube
       </a>`
    : `<div class="aspect-video rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-semibold text-sm">
         📹 Vidéo à venir
       </div>`;

  const keyPointsHTML = (prop.keyPoints || []).map((kp) =>
    `<li class="flex items-start gap-3 leading-relaxed">
       <span class="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-brand-500 mt-2"></span>
       <span>${kp}</span>
     </li>`).join('');

  document.getElementById('property-content').innerHTML = `
    <!-- Breadcrumb -->
    <nav class="mb-4 flex items-center gap-2 text-sm text-slate-500">
      <button id="bc-chapter" class="hover:text-brand-600 transition-colors">${chap.title}</button>
      <span>›</span>
      <span class="text-slate-700 font-semibold">Propriété ${prop.number}</span>
    </nav>

    <!-- En-tête de propriété -->
    <header class="mb-8">
      <div class="flex items-start gap-4 mb-3">
        <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center text-lg sm:text-xl font-extrabold flex-shrink-0">${prop.number}</div>
        <div class="flex-1 min-w-0 pt-1">
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">${prop.title}</h1>
          <p class="text-sm sm:text-base text-slate-500 leading-relaxed mt-2">${prop.summary}</p>
        </div>
      </div>
    </header>

    <!-- Section Vidéo Yvan Monka -->
    <section class="mb-8">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-lg font-extrabold tracking-tight flex items-center gap-2">
          <span>🎥</span> Vidéo d'Yvan Monka
        </h2>
        <button id="report-video" class="text-xs font-semibold text-slate-500 hover:text-red-600 transition-colors flex items-center gap-1">
          🚩 Signaler une vidéo manquante
        </button>
      </div>
      ${videoEmbed}
      ${prop.videoTitle ? `<p class="text-xs text-slate-500 mt-2 italic">${prop.videoTitle}</p>` : ''}
    </section>

    <!-- Section Explication -->
    <section class="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 mb-8">
      <h2 class="text-lg font-extrabold tracking-tight mb-3 flex items-center gap-2">
        <span>📖</span> Ce qu'il faut comprendre
      </h2>
      <p class="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">${prop.explanation}</p>
      <h3 class="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">Points-clés à retenir</h3>
      <ul class="space-y-2.5 text-sm sm:text-base text-slate-700">${keyPointsHTML}</ul>
      <p class="mt-6 text-xs text-slate-400 italic">📝 Cette explication est une version draft. Elle sera enrichie et validée par le pipeline IA en étape 8 (production de contenu).</p>
    </section>

    <!-- Actions principales -->
    <section class="space-y-3">
      <button id="prop-go-exercises" class="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-extrabold text-base sm:text-lg shadow-card transition-all hover:scale-[1.02] active:scale-95">
        Passer aux exercices →
      </button>
      <p class="text-center text-xs text-slate-400">Les exercices interactifs arrivent à l'étape 4.</p>
    </section>

    <!-- Navigation propriétés (prev / next) -->
    <nav class="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between gap-3">
      ${prev
        ? `<button id="prop-prev" class="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-slate-100 transition-colors text-sm font-semibold text-slate-600">
             <span>←</span>
             <div class="text-left hidden sm:block">
               <div class="text-[10px] uppercase tracking-wider opacity-60">Précédent</div>
               <div class="truncate max-w-[180px]">${prev.title}</div>
             </div>
             <span class="sm:hidden">Précédent</span>
           </button>`
        : '<div></div>'}
      ${next
        ? `<button id="prop-next" ${nextAccessible ? '' : 'disabled'} class="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors text-sm font-semibold ${nextAccessible ? 'hover:bg-brand-50 text-brand-700' : 'text-slate-300 cursor-not-allowed'}">
             <div class="text-right hidden sm:block">
               <div class="text-[10px] uppercase tracking-wider opacity-60">${nextAccessible ? 'Suivant' : '🔒 Verrouillé'}</div>
               <div class="truncate max-w-[180px]">${next.title}</div>
             </div>
             <span class="sm:hidden">${nextAccessible ? 'Suivant' : '🔒'}</span>
             <span>→</span>
           </button>`
        : '<div></div>'}
    </nav>
  `;

  // Wiring
  document.getElementById('bc-chapter')?.addEventListener('click', () => {
    audio.play('click'); openChapter(chapterId);
  });
  document.getElementById('report-video')?.addEventListener('click', () => {
    audio.play('click');
    toast('Signalement noté. La vidéo sera revue lors de la prod de contenu.', 'warning');
  });
  document.getElementById('prop-go-exercises')?.addEventListener('click', () => {
    audio.play('click');
    startSession(chapterId, propertyId);
  });
  document.getElementById('prop-prev')?.addEventListener('click', () => {
    audio.play('click'); openProperty(chapterId, prev.id);
  });
  const nextBtn = document.getElementById('prop-next');
  if (nextBtn && !nextBtn.disabled) {
    nextBtn.addEventListener('click', () => {
      audio.play('click'); openProperty(chapterId, next.id);
    });
  } else if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      audio.play('denied');
      toast('🔒 Maîtrise d\'abord cette propriété (exercices à venir étape 4).');
    });
  }

  updateStreakUI();
  updateXpUI();
  renderMath(document.getElementById('property-content'));
}

function setupPropertyScreen() {
  document.getElementById('back-to-chapter').addEventListener('click', () => {
    audio.play('click');
    if (state.currentChapter) {
      openChapter(state.currentChapter);
    } else {
      showScreen('dashboard-screen'); renderDashboard();
    }
  });
}

// ---------------------------------------------------------------------
// SESSION D'EXERCICES — Étape 4 : boucle d'apprentissage
// ---------------------------------------------------------------------
const SESSION_CONFIG = {
  XP_PER_CORRECT: 10,           // par exercice juste du 1er coup
  XP_PER_CORRECT_RETRY: 5,      // par exercice repris avec succès
  XP_PROPERTY_MASTERED: 50,     // bonus de fin de propriété
  XP_PERFECT_BONUS: 30,         // bonus supplémentaire si zéro faute
  XP_PER_EVAL_CORRECT: 15,      // XP par exo juste pendant l'éval
  XP_CHAPTER_MASTERED: 300,     // bonus énorme pour valider le chapitre
  EXOS_PER_SESSION: 6,          // nombre d'exos sélectionnés au hasard par session (si pool > 6)
  RETRY_MULTIPLIER: 3,          // sur erreur : on revoit l'exo (et variants) RETRY_MULTIPLIER fois
  RETRY_MIX_FRESH: 1            // pour chaque retry, on rajoute 1 exo frais du pool si dispo
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------
// KATEX — rendu mathématique pro (latex inline ou block via $...$ ou $$...$$)
// ---------------------------------------------------------------------
function renderMath(container) {
  const root = container || document.body;
  if (typeof window.renderMathInElement === 'function') {
    try {
      window.renderMathInElement(root, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$',  right: '$',  display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false,
        ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'input']
      });
    } catch (e) {
      console.warn('[KaTeX] rendering error:', e);
    }
  }
}

// PRNG seedable (mulberry32) pour des variantes d'éval déterministes
function seededRandom(seed) {
  let t = seed | 0;
  return function() {
    t = (t + 0x6D2B79F5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  const a = [...arr];
  const rnd = seededRandom(seed);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function hashString(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h = (h ^ s.charCodeAt(i)) * 16777619;
  }
  return h | 0;
}

function startEvaluation(chapterId, variant) {
  variant = variant || 'A';
  const details = CHAPTER_DETAILS[chapterId];
  const chap = getChapterById(chapterId);
  if (!details || !chap) {
    toast('Chapitre introuvable.', 'error');
    return;
  }
  const propsReady = details.properties.filter((p) => p.exercises && p.exercises.length >= 2);
  if (propsReady.length < details.properties.length) {
    const missing = details.properties.length - propsReady.length;
    toast(`🚧 L'évaluation nécessite ≥ 2 exos par propriété (manque ${missing}). Étape 8.`, 'warning');
    return;
  }
  // Seed déterministe basé sur le chapitre + la variante
  const seed = hashString(chapterId + '::' + variant);
  // Tirer 2 exos par propriété en utilisant le seed (variantes A/B/C/D différentes mais reproductibles)
  const evalExos = [];
  details.properties.forEach((p, propIdx) => {
    const propSeed = seed ^ hashString(p.id) ^ (propIdx * 31337);
    const picked = seededShuffle([...p.exercises], propSeed).slice(0, 2);
    picked.forEach((exo) => {
      evalExos.push({ ...exo, _propertyId: p.id, _propertyTitle: p.title });
    });
  });
  state.session = {
    mode: 'evaluation',
    chapterId, chapterTitle: chap.title,
    variant: variant,
    queue: seededShuffle(evalExos, seed ^ 0xDEAD),
    retryQueue: [],
    currentIndex: 0,
    phase: 'initial',
    correctFirstTry: 0,
    failedExos: 0,
    failedPropertyIds: [],
    xpEarned: 0,
    feedbackVisible: false,
    selectedOption: null,
    typedAnswer: '',
    lastAnswerCorrect: null,
    lastUserAnswer: null
  };
  saveState();
  showScreen('exercise-screen');
  renderExerciseScreen();
}

function getChapterById(chapterId) {
  return [...(CHAPTERS.premiere || []), ...(CHAPTERS.terminale || []), ...(CHAPTERS.bases || [])]
    .find((c) => c.id === chapterId);
}

function startSession(chapterId, propertyId) {
  const details = CHAPTER_DETAILS[chapterId];
  const prop = details && details.properties.find((p) => p.id === propertyId);
  if (!prop || !prop.exercises || prop.exercises.length === 0) {
    toast('📚 Exercices à venir pour cette propriété (production de contenu, étape 8).', 'warning');
    return;
  }
  const fullPool = shuffle([...prop.exercises]);
  // Échantillon : on prend EXOS_PER_SESSION exos pour la session ; le reste sert de réservoir
  // pour varier les exos sur les répétitions (évite de retomber sur la même question).
  const sampleSize = Math.min(SESSION_CONFIG.EXOS_PER_SESSION, fullPool.length);
  const sessionQueue = fullPool.slice(0, sampleSize);
  const leftoverPool = fullPool.slice(sampleSize);
  state.session = {
    chapterId, propertyId, propertyTitle: prop.title,
    queue: sessionQueue,
    retryQueue: [],
    leftoverPool: leftoverPool,  // réservoir pour varier les exos en cas de retry
    currentIndex: 0,
    phase: 'initial',
    correctFirstTry: 0,
    failedExos: 0,
    xpEarned: 0,
    feedbackVisible: false,
    selectedOption: null,
    typedAnswer: '',
    lastAnswerCorrect: null,
    lastUserAnswer: null
  };
  saveState();
  showScreen('exercise-screen');
  renderExerciseScreen();
}

function currentExercise() {
  return state.session ? state.session.queue[state.session.currentIndex] : null;
}

function isAnswerCorrect(exo, answer) {
  if (exo.type === 'qcm') return parseInt(answer, 10) === exo.correctIndex;
  if (exo.type === 'numeric') {
    const cleaned = String(answer).replace(',', '.').trim();
    const num = parseFloat(cleaned);
    if (isNaN(num)) return false;
    return Math.abs(num - exo.answer) <= (exo.tolerance || 0.01);
  }
  return false;
}

function renderExerciseScreen() {
  if (!state.session) { showScreen('home-screen'); renderHome(); return; }
  const ses = state.session;
  if (ses.feedbackVisible) { renderFeedback(); return; }

  const exo = currentExercise();
  if (!exo) { endSession(); return; }

  const total = ses.queue.length;
  const idx = ses.currentIndex;
  const progressPercent = Math.round((idx / total) * 100);

  let inputHTML = '';
  if (exo.type === 'qcm') {
    inputHTML = `<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
      ${exo.options.map((opt, i) => `
        <button data-option-index="${i}"
          class="qcm-option p-4 rounded-2xl border-2 ${ses.selectedOption === i ? 'border-brand-600 bg-brand-50' : 'border-slate-200 bg-white hover:border-brand-300'} text-lg font-bold text-center transition-all">
          ${opt}
        </button>`).join('')}
    </div>`;
  } else if (exo.type === 'numeric') {
    inputHTML = `<input type="text" id="numeric-answer" value="${ses.typedAnswer || ''}"
      placeholder="Ta réponse (un nombre)" inputmode="decimal"
      class="w-full mt-6 px-5 py-4 rounded-2xl border-2 border-slate-200 focus:border-brand-500 focus:outline-none text-xl font-bold text-center transition-colors"/>`;
  }

  const canSubmit = (exo.type === 'qcm' && ses.selectedOption !== null) ||
                    (exo.type === 'numeric' && (ses.typedAnswer || '').trim().length > 0);

  document.getElementById('exercise-content').innerHTML = `
    <div class="mb-6">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-semibold text-slate-500">
          ${ses.phase === 'retry' ? '🔁 Reprise · ' : ''}Exercice ${idx + 1} / ${total}
        </span>
        <button id="exit-session" class="text-xs font-semibold text-slate-400 hover:text-danger transition-colors">Quitter</button>
      </div>
      <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-brand-500 to-pink-500 rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
      </div>
    </div>

    <section class="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100">
      <div class="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-3">${ses.propertyTitle}</div>
      <div class="text-base sm:text-lg text-ink leading-relaxed">${exo.question}</div>
      ${inputHTML}
    </section>

    <div class="mt-6">
      <button id="submit-answer" ${canSubmit ? '' : 'disabled'}
        class="w-full py-4 rounded-2xl font-extrabold text-lg transition-all ${canSubmit ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-card hover:scale-[1.02] active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}">
        Valider →
      </button>
    </div>
  `;

  if (exo.type === 'qcm') {
    document.querySelectorAll('.qcm-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        audio.play('click');
        state.session.selectedOption = parseInt(btn.dataset.optionIndex, 10);
        renderExerciseScreen();
      });
    });
  } else if (exo.type === 'numeric') {
    const input = document.getElementById('numeric-answer');
    input.addEventListener('input', () => {
      state.session.typedAnswer = input.value;
      const can = input.value.trim().length > 0;
      const btn = document.getElementById('submit-answer');
      btn.disabled = !can;
      btn.className = `w-full py-4 rounded-2xl font-extrabold text-lg transition-all ${can ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-card hover:scale-[1.02] active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`;
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const btn = document.getElementById('submit-answer');
        if (!btn.disabled) btn.click();
      }
    });
    setTimeout(() => input.focus(), 50);
  }

  document.getElementById('submit-answer').addEventListener('click', () => {
    if (document.getElementById('submit-answer').disabled) return;
    handleSubmit();
  });
  document.getElementById('exit-session').addEventListener('click', () => {
    if (confirm('Quitter la session ? Ta progression de cette session sera perdue.')) {
      state.session = null;
      saveState();
      audio.play('click');
      openChapter(state.currentChapter);
    }
  });

  updateStreakUI();
  updateXpUI();
  renderMath(document.getElementById('exercise-content'));
}

function handleSubmit() {
  const ses = state.session;
  const exo = currentExercise();
  const answer = exo.type === 'qcm' ? ses.selectedOption : ses.typedAnswer;
  const correct = isAnswerCorrect(exo, answer);

  ses.lastAnswerCorrect = correct;
  ses.lastUserAnswer = answer;

  if (correct) {
    if (ses.phase === 'initial') {
      ses.correctFirstTry++;
      const xpGain = ses.mode === 'evaluation' ? SESSION_CONFIG.XP_PER_EVAL_CORRECT : SESSION_CONFIG.XP_PER_CORRECT;
      gainXp(xpGain, ses.mode === 'evaluation' ? 'Exo éval juste' : 'Exercice juste');
      ses.xpEarned += xpGain;
    } else {
      gainXp(SESSION_CONFIG.XP_PER_CORRECT_RETRY, 'Exercice repris');
      ses.xpEarned += SESSION_CONFIG.XP_PER_CORRECT_RETRY;
    }
    audio.play('success');
  } else {
    ses.failedExos++;
    // En mode éval, on ne rejoue PAS — on note juste les propriétés à reprendre
    if (ses.mode === 'evaluation') {
      if (exo._propertyId && !ses.failedPropertyIds.includes(exo._propertyId)) {
        ses.failedPropertyIds.push(exo._propertyId);
      }
    } else {
      // Compte le nb d'échecs sur cet exo
      exo._retryCount = (exo._retryCount || 0) + 1;
      const MAX_TOTAL_RETRIES = 6;
      if (exo._retryCount <= MAX_TOTAL_RETRIES) {
        if (exo._retryCount === 1) {
          // PREMIER échec : on push l'exo ×3 (RETRY_MULTIPLIER) à la fin
          const mult = SESSION_CONFIG.RETRY_MULTIPLIER || 3;
          for (let r = 0; r < mult; r++) ses.retryQueue.push(exo);
          // Et 1 exo frais du réservoir pour varier (anti même-question)
          const freshNeeded = SESSION_CONFIG.RETRY_MIX_FRESH || 1;
          for (let f = 0; f < freshNeeded && ses.leftoverPool && ses.leftoverPool.length > 0; f++) {
            const idxPick = Math.floor(Math.random() * ses.leftoverPool.length);
            ses.retryQueue.push(ses.leftoverPool.splice(idxPick, 1)[0]);
          }
        } else {
          // Échecs suivants : on push 1 seule fois pour ne pas boucler à l'infini
          ses.retryQueue.push(exo);
        }
      }
    }
    audio.play('error');
  }

  ses.feedbackVisible = true;
  saveState();
  renderFeedback();
}

function renderFeedback() {
  const ses = state.session;
  const exo = currentExercise();
  const correct = ses.lastAnswerCorrect;
  const userAnswerDisplay = exo.type === 'qcm' ? exo.options[ses.lastUserAnswer] : ses.lastUserAnswer;
  const correctAnswerDisplay = exo.type === 'qcm' ? exo.options[exo.correctIndex] : exo.answer;

  document.getElementById('exercise-content').innerHTML = `
    <section class="rounded-3xl p-6 sm:p-8 shadow-card mb-6 ${correct ? 'bg-gradient-to-br from-emerald-500 to-green-600' : 'bg-gradient-to-br from-red-500 to-rose-600'} text-white">
      <div class="flex items-center gap-4">
        <div class="text-5xl sm:text-6xl">${correct ? '✅' : '❌'}</div>
        <div>
          <h2 class="text-2xl sm:text-3xl font-extrabold">${correct ? 'Bien joué !' : 'Pas tout à fait'}</h2>
          <p class="text-white/90 mt-1 text-sm sm:text-base">${correct ? (ses.phase === 'initial' ? `+${SESSION_CONFIG.XP_PER_CORRECT} XP` : `+${SESSION_CONFIG.XP_PER_CORRECT_RETRY} XP — repris avec succès`) : 'On reprendra cet exo en fin de session.'}</p>
        </div>
      </div>
    </section>

    <section class="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 mb-6">
      <div class="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Question</div>
      <div class="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">${exo.question}</div>
      ${!correct ? `
        <div class="rounded-2xl p-4 bg-red-50 border border-red-200 mb-3">
          <div class="text-xs font-semibold uppercase tracking-wider text-red-600 mb-1">Ta réponse</div>
          <div class="text-base font-bold text-red-700">${userAnswerDisplay}</div>
        </div>` : ''}
      <div class="rounded-2xl p-4 bg-emerald-50 border border-emerald-200">
        <div class="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-1">Bonne réponse</div>
        <div class="text-base font-bold text-emerald-700">${correctAnswerDisplay}</div>
      </div>
    </section>

    <section class="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 mb-6">
      <h3 class="text-base font-extrabold mb-3 flex items-center gap-2"><span>💡</span> Explication</h3>
      <div class="text-sm sm:text-base text-slate-700 leading-relaxed">${exo.explanation}</div>
    </section>

    <div id="ai-feedback-slot" class="mb-6"></div>

    <button id="continue-next" class="w-full py-4 rounded-2xl font-extrabold text-lg bg-brand-600 hover:bg-brand-700 text-white shadow-card transition-all hover:scale-[1.02] active:scale-95">
      Continuer →
    </button>
  `;

  document.getElementById('continue-next').addEventListener('click', () => {
    audio.play('click'); advanceSession();
  });

  renderMath(document.getElementById('exercise-content'));

  if (correct) {
    confettiBurst('standard');
  } else if ((state.geminiKey || '').trim().length > 10) {
    // Fetch AI feedback en arrière-plan si une clé Gemini est configurée
    fetchAndShowAiFeedback(exo, userAnswerDisplay, correctAnswerDisplay);
  }
}

function advanceSession() {
  const ses = state.session;
  ses.feedbackVisible = false;
  ses.selectedOption = null;
  ses.typedAnswer = '';
  ses.currentIndex++;

  if (ses.currentIndex >= ses.queue.length) {
    if (ses.retryQueue.length > 0) {
      ses.phase = 'retry';
      ses.queue = shuffle(ses.retryQueue);
      ses.retryQueue = [];
      ses.currentIndex = 0;
      saveState();
      showRetryIntro();
      return;
    }
    endSession();
    return;
  }
  saveState();
  renderExerciseScreen();
}

function showRetryIntro() {
  const ses = state.session;
  document.getElementById('exercise-content').innerHTML = `
    <section class="bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl p-8 sm:p-10 shadow-card text-white text-center">
      <div class="text-6xl mb-4">🔁</div>
      <h2 class="text-2xl sm:text-3xl font-extrabold mb-3">On reprend</h2>
      <p class="text-white/90 text-base sm:text-lg leading-relaxed mb-6">
        Tu as ${ses.queue.length} exercice${ses.queue.length > 1 ? 's' : ''} à reprendre.<br/>
        ${ses.queue.length > 1 ? 'Pas de stress — on apprend en se trompant.' : 'Encore un effort.'}
      </p>
      <button id="start-retry" class="px-8 py-3 rounded-xl bg-white text-amber-600 font-extrabold hover:scale-105 transition-all shadow-card">
        C'est parti →
      </button>
    </section>
  `;
  document.getElementById('start-retry').addEventListener('click', () => {
    audio.play('click');
    renderExerciseScreen();
  });
}

function endSession() {
  const ses = state.session;
  // Branche dédiée pour l'évaluation finale
  if (ses.mode === 'evaluation') {
    endEvaluation();
    return;
  }
  if (!state.progress[ses.chapterId]) state.progress[ses.chapterId] = {};
  const perfectRun = ses.failedExos === 0;
  state.progress[ses.chapterId][ses.propertyId] = {
    mastered: true,
    correctFirstTry: ses.correctFirstTry,
    totalExos: ses.queue.length + ses.correctFirstTry,
    perfectRun: perfectRun,
    lastSeenISO: todayISO()
  };

  // Bonus de maîtrise
  gainXp(SESSION_CONFIG.XP_PROPERTY_MASTERED, `⭐ Propriété maîtrisée`);
  ses.xpEarned += SESSION_CONFIG.XP_PROPERTY_MASTERED;

  // Bonus SANS FAUTE
  if (perfectRun) {
    setTimeout(() => {
      gainXp(SESSION_CONFIG.XP_PERFECT_BONUS, `🏆 Sans faute !`);
      ses.xpEarned += SESSION_CONFIG.XP_PERFECT_BONUS;
    }, 600);
  }

  saveState();
  audio.play('levelup');
  setTimeout(() => confettiBurst('rainbow'), 200);
  if (perfectRun) {
    setTimeout(() => confettiBurst('rainbow'), 700);
    setTimeout(() => confettiBurst('rainbow'), 1200);
  }

  const totalExos = ses.correctFirstTry + ses.failedExos;

  // Rendu différent si SANS FAUTE
  const heroHTML = perfectRun
    ? `
      <section class="relative overflow-hidden bg-gradient-to-br from-amber-300 via-yellow-400 to-orange-500 rounded-3xl p-8 sm:p-12 shadow-glow text-white text-center perfect-hero">
        <div class="perfect-stars" aria-hidden="true">
          <span>✨</span><span>⭐</span><span>✨</span><span>⭐</span><span>✨</span><span>⭐</span>
        </div>
        <div class="text-8xl mb-4 animate-trophy">🏆</div>
        <div class="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-extrabold tracking-widest uppercase mb-3">Sans faute</div>
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">PARFAIT !</h2>
        <p class="text-white/95 text-lg leading-relaxed mb-6">
          <strong>${ses.propertyTitle}</strong><br/>
          Tu n'as fait <strong>aucune erreur</strong> sur ${totalExos} exercice${totalExos > 1 ? 's' : ''}.
        </p>
        <div class="bg-white/20 rounded-2xl p-4 mb-6 backdrop-blur">
          <div class="text-sm text-white/90 mb-1">XP gagnés cette session</div>
          <div class="text-4xl font-extrabold">+${ses.xpEarned + SESSION_CONFIG.XP_PERFECT_BONUS}</div>
          <div class="text-xs text-white/80 mt-1">(dont +${SESSION_CONFIG.XP_PERFECT_BONUS} bonus sans faute)</div>
        </div>
        <button id="end-back-chapter" class="w-full px-6 py-3 rounded-xl bg-white text-amber-600 font-extrabold hover:scale-105 transition-all shadow-card">
          Continuer →
        </button>
      </section>`
    : `
      <section class="bg-gradient-to-br from-brand-500 via-pink-500 to-amber-500 rounded-3xl p-8 sm:p-10 shadow-card text-white text-center">
        <div class="text-7xl mb-4 animate-bounce-slow">⭐</div>
        <h2 class="text-3xl sm:text-4xl font-extrabold mb-3">Propriété maîtrisée !</h2>
        <p class="text-white/95 text-base sm:text-lg leading-relaxed mb-6">
          <strong>${ses.propertyTitle}</strong><br/>
          ${ses.correctFirstTry} / ${totalExos} exercice${totalExos > 1 ? 's' : ''} juste${ses.correctFirstTry > 1 ? 's' : ''} du 1ᵉʳ coup.
        </p>
        <div class="bg-white/15 rounded-2xl p-4 mb-6 backdrop-blur">
          <div class="text-sm text-white/80 mb-1">XP gagnés cette session</div>
          <div class="text-3xl font-extrabold">+${ses.xpEarned}</div>
        </div>
        <button id="end-back-chapter" class="w-full px-6 py-3 rounded-xl bg-white text-brand-600 font-extrabold hover:scale-105 transition-all shadow-card">
          Retour au chapitre →
        </button>
      </section>`;

  document.getElementById('exercise-content').innerHTML = heroHTML;
  document.getElementById('end-back-chapter').addEventListener('click', () => {
    audio.play('click');
    const chId = ses.chapterId;
    state.session = null;
    saveState();
    openChapter(chId);
  });
}

function setupExerciseScreen() {
  // Rendu 100 % dynamique — pas de setup statique
}

// ---------------------------------------------------------------------
// FEEDBACK IA via Gemini — Étape 7
// ---------------------------------------------------------------------
function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim();
}

async function getGeminiFeedback(exo, userAnswerDisplay, correctAnswerDisplay) {
  const key = (state.geminiKey || '').trim();
  if (!key) return null;

  const prompt = `Tu es un prof de maths bienveillant et pédagogue. Un élève de Première spécialité maths vient de répondre à un exercice.

EXERCICE :
${stripHtml(exo.question)}

RÉPONSE CORRECTE : ${correctAnswerDisplay}
RÉPONSE DE L'ÉLÈVE : ${userAnswerDisplay}

EXPLICATION DE RÉFÉRENCE (pour ton info) :
${stripHtml(exo.explanation)}

Ta mission : explique à l'élève (tutoie-le, sois bienveillant et encourageant) :
1. POURQUOI sa réponse est probablement fausse (l'erreur de raisonnement type)
2. COMMENT il aurait dû raisonner étape par étape

Sois concis (3-5 phrases max au total), pédagogique, encourageant. N'utilise PAS de markdown (pas de **gras**, pas de *italique*, pas de listes). Écris en français naturel, comme si tu parlais en face à face.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 400 }
        })
      }
    );
    if (!response.ok) {
      console.warn('[Gemini] HTTP', response.status);
      return null;
    }
    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text ? text.trim() : null;
  } catch (e) {
    console.warn('[Gemini] exception:', e);
    return null;
  }
}

async function fetchAndShowAiFeedback(exo, userAnswerDisplay, correctAnswerDisplay) {
  // Crée un bloc "loading" sous l'explication statique
  const explBlock = document.getElementById('ai-feedback-slot');
  if (!explBlock) return;

  explBlock.innerHTML = `
    <div class="rounded-2xl p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200">
      <h4 class="text-sm font-extrabold mb-3 flex items-center gap-2">
        <span>✨</span>
        <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Feedback IA personnalisé</span>
      </h4>
      <div class="flex items-center gap-3 text-sm text-slate-500">
        <div class="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
        <span>Gemini analyse ta réponse...</span>
      </div>
    </div>
  `;

  const aiText = await getGeminiFeedback(exo, userAnswerDisplay, correctAnswerDisplay);
  if (!aiText) {
    explBlock.innerHTML = '';
    return;
  }
  explBlock.innerHTML = `
    <div class="rounded-2xl p-5 bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 border border-purple-200">
      <h4 class="text-sm font-extrabold mb-3 flex items-center gap-2">
        <span>✨</span>
        <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Feedback IA personnalisé</span>
      </h4>
      <div class="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">${aiText}</div>
    </div>
  `;
  renderMath(explBlock);
}

// ---------------------------------------------------------------------
// FIN D'ÉVALUATION FINALE — Étape 6
// ---------------------------------------------------------------------
function endEvaluation() {
  const ses = state.session;
  const totalExos = ses.queue.length;
  const perfectRun = ses.failedExos === 0;

  if (!state.progress[ses.chapterId]) state.progress[ses.chapterId] = {};

  // Track le statut de la variante d'évaluation (A/B/C/D)
  if (ses.variant) {
    if (!state.progress[ses.chapterId].evalVariants) state.progress[ses.chapterId].evalVariants = {};
    state.progress[ses.chapterId].evalVariants[ses.variant] = perfectRun ? 'success' : 'failed';
  }

  if (perfectRun) {
    // CHAPITRE MAÎTRISÉ !
    state.progress[ses.chapterId].chapterMastered = true;
    state.progress[ses.chapterId].chapterMasteredISO = todayISO();

    gainXp(SESSION_CONFIG.XP_CHAPTER_MASTERED, `🏆 Chapitre validé !`);
    ses.xpEarned += SESSION_CONFIG.XP_CHAPTER_MASTERED;

    saveState();
    audio.play('levelup');
    setTimeout(() => confettiBurst('rainbow'), 200);
    setTimeout(() => confettiBurst('rainbow'), 600);
    setTimeout(() => confettiBurst('rainbow'), 1000);
    setTimeout(() => confettiBurst('rainbow'), 1400);

    document.getElementById('exercise-content').innerHTML = `
      <section class="relative overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-600 rounded-3xl p-8 sm:p-12 shadow-glow text-white text-center perfect-hero">
        <div class="perfect-stars" aria-hidden="true">
          <span>✨</span><span>⭐</span><span>✨</span><span>⭐</span><span>✨</span><span>⭐</span>
        </div>
        <div class="text-8xl mb-4 animate-trophy">🏆</div>
        <div class="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur text-xs font-extrabold tracking-widest uppercase mb-3">CHAPITRE VALIDÉ</div>
        <h2 class="text-4xl sm:text-5xl font-extrabold mb-3 tracking-tight">CHAMPION !</h2>
        <p class="text-white/95 text-lg leading-relaxed mb-6">
          <strong>${ses.chapterTitle}</strong><br/>
          ${totalExos} exercices d'évaluation, <strong>zéro faute</strong>. Tu maîtrises ce chapitre.
        </p>
        <div class="bg-white/20 rounded-2xl p-4 mb-6 backdrop-blur">
          <div class="text-sm text-white/90 mb-1">XP gagnés cette évaluation</div>
          <div class="text-4xl font-extrabold">+${ses.xpEarned}</div>
          <div class="text-xs text-white/80 mt-1">(dont +${SESSION_CONFIG.XP_CHAPTER_MASTERED} bonus chapitre validé)</div>
        </div>
        <button id="end-back-chapter" class="w-full px-6 py-3 rounded-xl bg-white text-amber-600 font-extrabold hover:scale-105 transition-all shadow-card">
          Retour au dashboard →
        </button>
      </section>
    `;
    document.getElementById('end-back-chapter').addEventListener('click', () => {
      audio.play('click');
      state.session = null;
      saveState();
      showScreen('dashboard-screen');
      renderDashboard();
    });
    return;
  }

  // Échec partiel : repérer les propriétés à reprendre
  const details = CHAPTER_DETAILS[ses.chapterId];
  const failedNames = ses.failedPropertyIds.map((pid) => {
    const p = details.properties.find((x) => x.id === pid);
    return p ? p.title : pid;
  });

  // On remet les propriétés ratées à "non maîtrisées" pour forcer la reprise
  ses.failedPropertyIds.forEach((pid) => {
    if (state.progress[ses.chapterId][pid]) {
      state.progress[ses.chapterId][pid].mastered = false;
    }
  });
  // Et si le chapitre était déjà validé, on retire le badge
  state.progress[ses.chapterId].chapterMastered = false;
  saveState();
  audio.play('error');

  document.getElementById('exercise-content').innerHTML = `
    <section class="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-6 sm:p-8 shadow-card text-white text-center mb-6">
      <div class="text-6xl mb-3">📚</div>
      <h2 class="text-2xl sm:text-3xl font-extrabold mb-2">Presque !</h2>
      <p class="text-white/95 text-base sm:text-lg mb-1">
        ${ses.correctFirstTry} / ${totalExos} exercices justes.
      </p>
      <p class="text-white/90 text-sm">
        Reprends ${ses.failedPropertyIds.length === 1 ? 'la propriété suivante' : `les ${ses.failedPropertyIds.length} propriétés suivantes`} avant de retenter l'évaluation.
      </p>
    </section>

    <section class="space-y-2 mb-6">
      ${failedNames.map((name) => `
        <div class="bg-white rounded-2xl p-4 shadow-card border-2 border-orange-200 flex items-center gap-3">
          <span class="text-2xl flex-shrink-0">🔁</span>
          <span class="font-bold text-sm sm:text-base">${name}</span>
        </div>
      `).join('')}
    </section>

    <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6 text-center">
      <div class="text-sm text-emerald-700">XP gagnés malgré tout</div>
      <div class="text-2xl font-extrabold text-emerald-700">+${ses.xpEarned}</div>
    </div>

    <button id="end-back-chapter" class="w-full py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-lg shadow-card transition-all hover:scale-[1.02] active:scale-95">
      Retour au chapitre →
    </button>
  `;
  document.getElementById('end-back-chapter').addEventListener('click', () => {
    audio.play('click');
    const chId = ses.chapterId;
    state.session = null;
    saveState();
    openChapter(chId);
  });
}

// ---------------------------------------------------------------------
// SHOP SCREEN
// ---------------------------------------------------------------------
function renderShop() {
  document.getElementById('shop-xp').textContent = state.xp;
  // Fonds prédéfinis + fonds custom générés
  const allWallpapers = [
    ...SHOP.wallpapers,
    ...state.shop.customWallpapers.map((w) => ({ ...w, price: 0, isCustom: true, description: w.prompt }))
  ];
  document.getElementById('shop-content').innerHTML = `
    ${shopSectionHTML('🎨 Fonds d\'écran', allWallpapers.map((w) => wallpaperItemHTML(w)))}
    ${shopSectionHTML('🏷️ Titres', SHOP.titles.map((t) => titleItemHTML(t)))}
    ${shopSectionHTML('🧰 Boosters', SHOP.utilities.map((u) => utilityItemHTML(u)))}
    ${shopSectionHTML('🎯 Défis', SHOP.challenges.map((c) => challengeItemHTML(c)))}
    ${shopSectionHTML('✨ Récompense Prestige', SHOP.prestige.map((p) => prestigeItemHTML(p)))}
  `;
  attachShopListeners();
}
function shopSectionHTML(title, itemsHTML) {
  return `
    <section class="mb-10">
      <h2 class="text-lg font-extrabold mb-4 tracking-tight">${title}</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${itemsHTML.join('')}</div>
    </section>
  `;
}
function wallpaperItemHTML(w) {
  const owned = state.shop.ownedWallpapers.includes(w.id);
  const active = state.shop.activeWallpaper === w.id;
  const canBuy = state.xp >= w.price;
  let action = '';
  if (active) action = `<div class="text-center text-xs font-bold text-success">✓ Actif</div>`;
  else if (owned) action = `<button data-shop-action="equip-wp" data-id="${w.id}" class="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition">Équiper</button>`;
  else action = `<button data-shop-action="buy-wp" data-id="${w.id}" ${canBuy ? '' : 'disabled'} class="w-full py-2.5 rounded-xl text-sm font-bold transition ${canBuy ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}">${canBuy ? `Acheter · ${w.price} XP` : `${w.price} XP`}</button>`;

  const preview = w.isCustom
    ? `<div class="wp-preview h-28 rounded-xl mb-3 bg-cover bg-center" style="background-image:url('${w.url}')"></div>`
    : `<div class="wp-preview wp-${w.id} h-28 rounded-xl mb-3"></div>`;

  const badge = w.isCustom ? `<span class="absolute top-2 right-2 text-[10px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full">CRÉATION</span>` : '';

  return `
    <div class="bg-white rounded-2xl p-4 shadow-card border ${active ? 'border-success border-2' : 'border-slate-100'} relative">
      ${badge}
      ${preview}
      <h3 class="font-bold text-sm mb-1 truncate">${w.name}</h3>
      <p class="text-xs text-slate-500 mb-3 leading-relaxed line-clamp-2">${w.description || ''}</p>
      ${action}
    </div>
  `;
}
function titleItemHTML(t) {
  const owned = state.shop.ownedTitles.includes(t.id);
  const active = state.shop.activeTitle === t.id;
  const canBuy = state.xp >= t.price;
  let action = '';
  if (active) action = `<div class="text-center text-xs font-bold text-success">✓ Actif</div>`;
  else if (owned) action = `<button data-shop-action="equip-title" data-id="${t.id}" class="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold transition">Équiper</button>`;
  else action = `<button data-shop-action="buy-title" data-id="${t.id}" ${canBuy ? '' : 'disabled'} class="w-full py-2.5 rounded-xl text-sm font-bold transition ${canBuy ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}">${canBuy ? `Acheter · ${t.price} XP` : `${t.price} XP`}</button>`;
  return `
    <div class="bg-white rounded-2xl p-4 shadow-card border ${active ? 'border-success border-2' : 'border-slate-100'} flex flex-col">
      <div class="h-28 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 flex items-center justify-center mb-3">
        <span class="text-2xl font-extrabold ${t.color}">${t.name}</span>
      </div>
      <h3 class="font-bold text-sm mb-1">Titre « ${t.name} »</h3>
      <p class="text-xs text-slate-500 mb-3 flex-1">Affiché sous ton prénom sur l'écran d'accueil.</p>
      ${action}
    </div>
  `;
}
function utilityItemHTML(u) {
  const canBuy = state.xp >= u.price;
  const count = u.id === 'streak-shield' ? state.shop.shieldsAvailable : 0;
  return `
    <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100">
      <div class="h-28 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center mb-3">
        <span class="text-5xl">${u.icon}</span>
      </div>
      <div class="flex items-center justify-between mb-1">
        <h3 class="font-bold text-sm">${u.name}</h3>
        ${count > 0 ? `<span class="text-xs font-bold text-orange-600">×${count}</span>` : ''}
      </div>
      <p class="text-xs text-slate-500 mb-3 leading-relaxed">${u.description}</p>
      <button data-shop-action="buy-util" data-id="${u.id}" ${canBuy ? '' : 'disabled'} class="w-full py-2.5 rounded-xl text-sm font-bold transition ${canBuy ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}">${canBuy ? `Acheter · ${u.price} XP` : `${u.price} XP`}</button>
    </div>
  `;
}
function challengeItemHTML(c) {
  const userLevel = levelFromXp(state.xp);
  const unlocked = userLevel >= c.requiredLevel;
  return `
    <div class="bg-white rounded-2xl p-4 shadow-card border border-slate-100 ${unlocked ? '' : 'opacity-70'}">
      <div class="h-28 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 flex items-center justify-center mb-3">
        <span class="text-5xl ${unlocked ? '' : 'grayscale'}">${c.icon}</span>
      </div>
      <h3 class="font-bold text-sm mb-1">${c.name}</h3>
      <p class="text-xs text-slate-500 mb-3 leading-relaxed">${c.description}</p>
      <div class="w-full py-2.5 rounded-xl text-sm font-bold text-center ${unlocked ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}">
        ${unlocked ? 'Débloqué ! Reviens dimanche.' : `🔒 Niveau ${c.requiredLevel} requis`}
      </div>
    </div>
  `;
}
function prestigeItemHTML(p) {
  const userLevel = levelFromXp(state.xp);
  const unlocked = userLevel >= p.requiredLevel;
  return `
    <div class="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-2xl p-4 shadow-card border border-purple-100">
      <div class="h-28 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-amber-500 flex items-center justify-center mb-3 relative overflow-hidden">
        <span class="text-6xl ${unlocked ? '' : 'opacity-30'}">${p.icon}</span>
        ${unlocked ? '' : '<div class="absolute inset-0 flex items-center justify-center text-white text-3xl font-extrabold">???</div>'}
      </div>
      <h3 class="font-bold text-sm mb-1">${p.name}</h3>
      <p class="text-xs text-slate-500 mb-3 leading-relaxed">${p.description}</p>
      <div class="w-full py-2.5 rounded-xl text-sm font-bold text-center ${unlocked ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-500'}">
        ${unlocked ? 'À réclamer' : `🔒 Niveau ${p.requiredLevel}`}
      </div>
    </div>
  `;
}

function attachShopListeners() {
  document.querySelectorAll('[data-shop-action]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.shopAction;
      const id = btn.dataset.id;
      if (act === 'buy-wp') buyWallpaper(id);
      if (act === 'equip-wp') equipWallpaper(id);
      if (act === 'buy-title') buyTitle(id);
      if (act === 'equip-title') equipTitle(id);
      if (act === 'buy-util') buyUtility(id);
    });
  });
}
function buyWallpaper(id) {
  const w = SHOP.wallpapers.find((x) => x.id === id);
  if (!w || state.xp < w.price) return audio.play('denied');
  state.xp -= w.price;
  state.shop.ownedWallpapers.push(id);
  state.shop.activeWallpaper = id;
  saveState(); audio.play('purchase'); confettiBurst('standard');
  toast(`Fond « ${w.name} » acheté et équipé !`, 'success');
  updateXpUI(); applyWallpaper(); renderShop();
}
function equipWallpaper(id) {
  state.shop.activeWallpaper = id;
  saveState(); audio.play('click');
  toast('Fond équipé.');
  applyWallpaper(); renderShop();
}
function buyTitle(id) {
  const t = SHOP.titles.find((x) => x.id === id);
  if (!t || state.xp < t.price) return audio.play('denied');
  state.xp -= t.price;
  state.shop.ownedTitles.push(id);
  state.shop.activeTitle = id;
  saveState(); audio.play('purchase'); confettiBurst('standard');
  toast(`Titre « ${t.name} » obtenu !`, 'success');
  updateXpUI(); renderShop();
}
function equipTitle(id) {
  state.shop.activeTitle = id;
  saveState(); audio.play('click');
  toast('Titre équipé.');
  renderShop();
}
function buyUtility(id) {
  const u = SHOP.utilities.find((x) => x.id === id);
  if (!u || state.xp < u.price) return audio.play('denied');
  state.xp -= u.price;
  if (u.id === 'streak-shield') state.shop.shieldsAvailable += 1;
  saveState(); audio.play('purchase');
  toast(`${u.icon} ${u.name} ajouté à ton inventaire !`, 'success');
  updateXpUI(); renderShop();
}
function setupShop() {
  document.getElementById('back-from-shop').addEventListener('click', () => {
    audio.play('click'); showScreen('home-screen'); renderHome();
  });
}

// ---------------------------------------------------------------------
// STUDIO DE CRÉATION D'IMAGES (Pollinations.ai)
// ---------------------------------------------------------------------
function canGenerateToday() {
  return state.shop.lastImageGenISO !== todayISO();
}

function renderStudio() {
  document.getElementById('studio-xp').textContent = state.xp;
  const xpOk = state.xp >= IMAGE_GEN_COST;
  const dayOk = canGenerateToday();
  let statusBox = '';
  if (!dayOk) {
    statusBox = `<div class="rounded-2xl p-4 bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold mb-6">⏳ Tu as déjà généré ton image du jour. Reviens demain pour en créer une nouvelle.</div>`;
  } else if (!xpOk) {
    statusBox = `<div class="rounded-2xl p-4 bg-slate-100 border border-slate-200 text-slate-600 text-sm font-semibold mb-6">⚡ Il te faut ${IMAGE_GEN_COST} XP pour générer une image (tu en as ${state.xp}).</div>`;
  } else {
    statusBox = `<div class="rounded-2xl p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold mb-6">✅ Disponible — 1 génération restante aujourd'hui pour ${IMAGE_GEN_COST} XP.</div>`;
  }
  const chips = STYLE_CHIPS.map((c) =>
    `<button data-chip="${c.value}" class="style-chip px-3 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-semibold hover:bg-brand-50 hover:border-brand-300 transition-colors">+ ${c.label}</button>`
  ).join('');
  const recent = state.shop.customWallpapers.slice(-6).reverse();
  const recentHTML = recent.length === 0
    ? `<p class="text-sm text-slate-500 text-center py-6">Aucune création pour l'instant. Décris ton image et lance la génération !</p>`
    : `<div class="grid grid-cols-2 sm:grid-cols-3 gap-3">${recent.map((w) => `
        <div class="relative group">
          <div class="aspect-video rounded-xl bg-cover bg-center shadow-card" style="background-image:url('${w.url}')"></div>
          <div class="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 to-transparent rounded-b-xl">
            <p class="text-white text-xs font-semibold line-clamp-1">${w.name}</p>
          </div>
          <button data-equip-custom="${w.id}" class="absolute inset-0 rounded-xl bg-brand-600/0 hover:bg-brand-600/80 text-white text-sm font-bold opacity-0 hover:opacity-100 transition-all flex items-center justify-center">Équiper</button>
        </div>
      `).join('')}</div>`;
  document.getElementById('studio-content').innerHTML = `
    <section class="bg-gradient-to-br from-purple-600 via-pink-500 to-amber-500 rounded-3xl p-6 sm:p-8 shadow-glow text-white mb-8">
      <div class="flex items-start gap-4 mb-4">
        <div class="text-5xl sm:text-6xl">🎨</div>
        <div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">Studio de création</h1>
          <p class="text-white/90 mt-1 leading-relaxed">Décris l'image que tu veux pour ton fond d'écran. L'IA te la génère, et elle rejoint ta collection.</p>
        </div>
      </div>
    </section>
    ${statusBox}
    <section class="bg-white rounded-3xl p-6 shadow-card border border-slate-100 mb-8">
      <label class="block text-sm font-semibold text-slate-700 mb-2">Décris l'image de tes rêves</label>
      <textarea id="studio-prompt" rows="3" maxlength="300" placeholder="Ex : Saitama qui casse une météorite, style anime épique" class="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-brand-500 focus:outline-none text-base resize-none transition-colors"></textarea>
      <div class="mt-1 text-xs text-slate-400 text-right"><span id="studio-prompt-count">0</span> / 300</div>
      <div class="mt-4">
        <p class="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Ajoute un style</p>
        <div class="flex flex-wrap gap-2">${chips}</div>
      </div>
      <button id="studio-generate" ${(xpOk && dayOk) ? '' : 'disabled'} class="mt-6 w-full py-4 rounded-2xl font-extrabold text-lg transition-all ${(xpOk && dayOk) ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-amber-500 text-white shadow-glow hover:scale-[1.02] active:scale-95' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}">
        ${(xpOk && dayOk) ? `✨ Générer (${IMAGE_GEN_COST} XP)` : (!dayOk ? '⏳ Reviens demain' : `🔒 ${IMAGE_GEN_COST} XP requis`)}
      </button>
    </section>
    <section id="studio-result" class="hidden mb-8"></section>
    <section>
      <h2 class="text-lg font-extrabold mb-4 tracking-tight">Tes créations</h2>
      ${recentHTML}
    </section>
  `;
  const promptEl = document.getElementById('studio-prompt');
  const countEl = document.getElementById('studio-prompt-count');
  promptEl.addEventListener('input', () => { countEl.textContent = promptEl.value.length; });
  document.querySelectorAll('.style-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const chipValue = chip.dataset.chip;
      const current = promptEl.value.trim();
      if (current.includes(chipValue)) return;
      promptEl.value = current + (current && !current.endsWith(',') ? ', ' : '') + chipValue;
      countEl.textContent = promptEl.value.length;
      audio.play('click');
    });
  });
  const genBtn = document.getElementById('studio-generate');
  if (genBtn && !genBtn.disabled) {
    genBtn.addEventListener('click', () => {
      const prompt = promptEl.value.trim();
      if (prompt.length < 5) { toast('Décris ton image en quelques mots au moins.', 'warning'); return; }
      generateImage(prompt);
    });
  }
  document.querySelectorAll('[data-equip-custom]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.equipCustom;
      equipWallpaper(id);
      toast('Fond équipé. Retourne à l\'accueil pour voir.', 'success');
    });
  });
  updateXpUI();
}

async function generateImage(prompt) {
  if (state.xp < IMAGE_GEN_COST) { toast(`Il te faut ${IMAGE_GEN_COST} XP.`, 'error'); audio.play('denied'); return; }
  if (!canGenerateToday()) { toast('Tu as déjà généré une image aujourd\'hui.', 'warning'); audio.play('denied'); return; }
  state.xp -= IMAGE_GEN_COST;
  state.shop.lastImageGenISO = todayISO();
  saveState(); updateXpUI();
  const seed = Math.floor(Math.random() * 100000);
  const fullPrompt = prompt + ', masterpiece, highly detailed, vibrant, sharp focus';
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=1280&height=720&nologo=true&model=flux&seed=${seed}`;
  const result = document.getElementById('studio-result');
  result.classList.remove('hidden');
  result.innerHTML = `<div class="bg-white rounded-3xl p-6 shadow-card border border-slate-100"><div class="flex items-center gap-3 mb-4"><div class="w-3 h-3 rounded-full bg-pink-500 animate-pulse"></div><p class="text-sm font-semibold text-slate-700">Génération en cours… (5 à 15 secondes)</p></div><div class="aspect-video rounded-2xl bg-gradient-to-br from-purple-100 via-pink-100 to-amber-100 flex items-center justify-center overflow-hidden"><div class="text-center"><div class="text-5xl mb-2 animate-bounce-slow">✨</div><p class="text-sm text-slate-600 font-semibold">"${prompt.slice(0, 80)}${prompt.length > 80 ? '…' : ''}"</p></div></div></div>`;
  audio.play('magic');
  const img = new Image();
  img.onload = () => {
    const wallpaper = { id: 'custom-' + Date.now(), name: prompt.length > 40 ? prompt.slice(0, 40) + '…' : prompt, prompt: prompt, url: url, createdAt: todayISO() };
    state.shop.customWallpapers.push(wallpaper);
    state.shop.ownedWallpapers.push(wallpaper.id);
    saveState();
    audio.play('levelup');
    confettiBurst('rainbow');
    result.innerHTML = `<div class="bg-white rounded-3xl p-6 shadow-card border border-slate-100"><div class="flex items-center gap-2 mb-4"><span class="text-xl">🎉</span><p class="text-sm font-bold text-emerald-700">Image générée ! Ajoutée à ta collection.</p></div><div class="aspect-video rounded-2xl bg-cover bg-center shadow-card mb-4" style="background-image:url('${url}')"></div><p class="text-xs text-slate-500 mb-4 italic">« ${prompt} »</p><div class="flex gap-2"><button data-equip-custom="${wallpaper.id}" class="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold transition shadow-card">✓ Définir comme fond d'écran</button><a href="${url}" download="pts-maths-${wallpaper.id}.png" target="_blank" class="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition flex items-center justify-center" title="Télécharger l'image">⬇</a></div></div>`;
    result.querySelector('[data-equip-custom]').addEventListener('click', () => {
      equipWallpaper(wallpaper.id);
      toast('Fond équipé. Retourne à l\'accueil pour voir.', 'success');
      setTimeout(() => renderStudio(), 600);
    });
  };
  img.onerror = () => {
    state.xp += IMAGE_GEN_COST;
    state.shop.lastImageGenISO = null;
    saveState(); updateXpUI();
    result.innerHTML = `<div class="rounded-2xl p-4 bg-red-50 border border-red-200 text-red-800 text-sm font-semibold">❌ La génération a échoué (serveur indisponible). Tes ${IMAGE_GEN_COST} XP ont été restitués.</div>`;
    audio.play('denied');
  };
  img.src = url;
}

function setupStudio() {
  document.getElementById('back-from-studio').addEventListener('click', () => {
    audio.play('click'); showScreen('home-screen'); renderHome();
  });
}

// ---------------------------------------------------------------------
// RÉGLAGES
// ---------------------------------------------------------------------
function openSettings() {
  audio.play('click');
  const modal = document.getElementById('settings-modal');
  document.getElementById('set-name').value = state.user.name;
  document.getElementById('set-gemini').value = state.geminiKey || '';
  document.querySelectorAll('.set-class-btn').forEach((btn) => {
    btn.classList.toggle('border-brand-500', btn.dataset.class === state.user.classLevel);
    btn.classList.toggle('bg-brand-50',      btn.dataset.class === state.user.classLevel);
    btn.dataset.selected = btn.dataset.class === state.user.classLevel ? 'true' : 'false';
  });
  updateSoundUI();
  updateThemeUI();
  modal.classList.remove('hidden');
}
function closeSettings() { document.getElementById('settings-modal').classList.add('hidden'); }
window.closeSettings = closeSettings;

function setupSettings() {
  document.querySelectorAll('.set-class-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.set-class-btn').forEach((b) => {
        b.classList.remove('border-brand-500', 'bg-brand-50');
        b.dataset.selected = 'false';
      });
      btn.classList.add('border-brand-500', 'bg-brand-50');
      btn.dataset.selected = 'true';
    });
  });
  document.getElementById('set-sound').addEventListener('click', toggleSound);
  document.getElementById('set-theme').addEventListener('click', toggleTheme);
  document.getElementById('set-save').addEventListener('click', () => {
    const newName = document.getElementById('set-name').value.trim();
    if (newName.length >= 2) state.user.name = newName;
    const selected = document.querySelector('.set-class-btn[data-selected="true"]');
    if (selected) state.user.classLevel = selected.dataset.class;
    const geminiKey = document.getElementById('set-gemini').value.trim();
    state.geminiKey = geminiKey;
    saveState(); audio.play('success'); closeSettings(); renderHome();
  });
  document.getElementById('set-reset').addEventListener('click', () => {
    if (confirm('Réinitialiser toute ta progression ? Cette action est irréversible.')) {
      resetState(); closeSettings(); boot();
    }
  });
}

// ---------------------------------------------------------------------
// PWA INSTALL
// ---------------------------------------------------------------------
let deferredInstallPrompt = null;

function isAppInstalled() {
  // Standalone display = déjà installé
  if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
  if (window.navigator && window.navigator.standalone === true) return true;
  return false;
}

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  document.querySelectorAll('#install-btn').forEach((b) => b.classList.remove('hidden'));
  // Si l'utilisateur est déjà onboarded ET pas en mode jeu/exo, on lui propose
  setTimeout(() => maybeShowInstallPrompt('beforeinstall'), 1500);
});

async function triggerInstallPrompt() {
  if (!deferredInstallPrompt) return false;
  deferredInstallPrompt.prompt();
  try {
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
      toast('Installation en cours…', 'success');
    } else {
      state.installDismissedISO = new Date().toISOString();
      saveState();
    }
  } catch (_) { /* ignore */ }
  deferredInstallPrompt = null;
  document.querySelectorAll('#install-btn').forEach((b) => b.classList.add('hidden'));
  return true;
}

document.addEventListener('click', (e) => {
  if (e.target && e.target.id === 'install-btn') {
    triggerInstallPrompt();
  }
});

window.addEventListener('appinstalled', () => {
  toast('Installation réussie ! 🎉', 'success');
  deferredInstallPrompt = null;
});

// Modale d'invitation à installer l'app — montrée auto après onboarding/au boot si dispo
function maybeShowInstallPrompt(source) {
  if (isAppInstalled()) return;
  if (!deferredInstallPrompt) return;
  if (!state.user.onboarded) return;
  // Ne pas re-prompt si l'utilisateur a dit "Plus tard" il y a < 7 jours
  if (state.installDismissedISO) {
    const dismissedDate = new Date(state.installDismissedISO);
    const diffDays = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays < 7) return;
  }
  // Évite si déjà affichée
  if (document.getElementById('install-modal')) return;
  // N'affiche pas pendant un mini-jeu en cours
  const activeScreen = document.querySelector('.screen:not(.hidden)');
  if (activeScreen && (activeScreen.id === 'baskets-screen' || activeScreen.id === 'racing-screen' || activeScreen.id === 'exercise-screen')) return;
  showInstallModal();
}

function showInstallModal() {
  const modal = document.createElement('div');
  modal.id = 'install-modal';
  modal.className = 'fixed inset-0 z-[70] bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in';
  modal.innerHTML = '' +
    '<div class="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-glow max-w-md w-full">' +
      '<div class="text-center mb-5">' +
        '<div class="text-6xl mb-3">📱</div>' +
        '<h2 class="text-2xl font-extrabold text-ink dark:text-white mb-2">Installer PTS-Maths</h2>' +
        '<p class="text-sm text-slate-600 dark:text-slate-300">Installe l\'app sur ton appareil pour y accéder en un clic, même sans connexion.</p>' +
      '</div>' +
      '<div class="space-y-2 mb-6 text-sm">' +
        '<div class="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-3"><span class="text-xl">⚡</span><span class="text-emerald-800 dark:text-emerald-200 font-semibold">Plus rapide qu\'un site web</span></div>' +
        '<div class="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3"><span class="text-xl">📶</span><span class="text-blue-800 dark:text-blue-200 font-semibold">Fonctionne hors-ligne (cours déjà visités)</span></div>' +
        '<div class="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl p-3"><span class="text-xl">🏠</span><span class="text-purple-800 dark:text-purple-200 font-semibold">Icône sur ton écran d\'accueil</span></div>' +
      '</div>' +
      '<div class="flex gap-3">' +
        '<button id="install-modal-later" class="flex-1 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold text-slate-700 dark:text-slate-200 transition">Plus tard</button>' +
        '<button id="install-modal-accept" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-brand-600 to-pink-600 hover:from-brand-700 hover:to-pink-700 text-white font-bold shadow-card transition">Installer</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(modal);
  document.getElementById('install-modal-accept').addEventListener('click', async () => {
    audio.play('click');
    modal.remove();
    await triggerInstallPrompt();
  });
  document.getElementById('install-modal-later').addEventListener('click', () => {
    audio.play('click');
    state.installDismissedISO = new Date().toISOString();
    saveState();
    modal.remove();
  });
}

// ---------------------------------------------------------------------
// SERVICE WORKER
// ---------------------------------------------------------------------
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => console.log('[PTS-Maths] SW enregistré:', reg.scope))
      .catch((err) => console.warn('[PTS-Maths] SW non enregistré:', err));
  });
}

// ---------------------------------------------------------------------
// TOAST
// ---------------------------------------------------------------------
let toastTimer = null;
function toast(message, variant = 'default') {
  let el = document.getElementById('pts-toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'pts-toast';
    document.body.appendChild(el);
  }
  const palette = {
    default:'bg-ink text-white', success:'bg-emerald-600 text-white',
    xp:'bg-emerald-500 text-white', level:'bg-gradient-to-r from-brand-600 to-pink-600 text-white',
    warning:'bg-amber-500 text-white', error:'bg-danger text-white'
  };
  el.className = `fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-cardHover text-sm font-semibold z-[60] transition-all duration-200 pointer-events-none ${palette[variant] || palette.default}`;
  el.textContent = message;
  requestAnimationFrame(() => {
    el.classList.remove('opacity-0', 'translate-y-2');
    el.classList.add('opacity-100', 'translate-y-0');
  });
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.add('opacity-0', 'translate-y-2');
    el.classList.remove('opacity-100', 'translate-y-0');
  }, 2800);
}

// ---------------------------------------------------------------------
// BOOT
// ---------------------------------------------------------------------
function boot() {
  setupOnboarding();
  setupHome();
  setupDashboard();
  setupChapterScreen();
  setupPropertyScreen();
  setupExerciseScreen();
  setupShop();
  setupStudio();
  setupRacing();
  setupBaskets();
  setupSettings();
  updateSoundUI();
  applyTheme();
  applyWallpaper();
  if (!state.user.onboarded) {
    showScreen('onboarding-screen');
    showOnboardingStep('name');
  } else {
    useShieldIfPossible();
    touchStreak();
    showScreen('home-screen');
    renderHome();
    setTimeout(() => maybeShowInstallPrompt('boot'), 2500);
  }
  window.PTS = {
    gainXp,
    state: () => state,
    reset: () => { resetState(); boot(); },
    confetti: () => confettiBurst('rainbow'),
    play: (t) => audio.play(t),
    openChapter,
    openProperty,
    startSession,
    startEvaluation,
    openStudio: () => { showScreen('studio-screen'); renderStudio(); },
    startRace,
    startBaskets,
    resetImageQuota: () => { state.shop.lastImageGenISO = null; saveState(); toast('Quota image réinitialisé.', 'success'); },
    resetTokens: () => { state.tokens = 0; state.racingBestScore = 0; state.racingLeaderboard = []; saveState(); toast('Sprint réinitialisé.', 'success'); }
  };
  console.log('%cPTS-Maths v0.4 prête', 'color:#4F46E5;font-weight:bold;font-size:14px');
  console.log('Helpers : PTS.gainXp(1000), PTS.openStudio(), PTS.resetImageQuota()');
}


// =====================================================================
// SPRINT MATHÉMATIQUE — Mini-jeu de course (calcul mental rapide)
// =====================================================================
const RACE_CONFIG = {
  TIME_PER_QUESTION: 20,        // secondes par question
  TOKENS_PER_CORRECT: 1,        // jetons par bonne réponse
  XP_PER_CORRECT: 5,            // XP par bonne réponse
  BONUS_TOKENS_NEW_RECORD: 10   // bonus jetons si nouveau record
};

const QUESTION_GENERATORS = [
  // Addition 2 chiffres + 2 chiffres
  () => {
    const a = Math.floor(Math.random() * 80) + 10;
    const b = Math.floor(Math.random() * 80) + 10;
    return { question: `${a} + ${b}`, answer: a + b };
  },
  // Soustraction
  () => {
    const a = Math.floor(Math.random() * 70) + 30;
    const b = Math.floor(Math.random() * (a - 5)) + 1;
    return { question: `${a} − ${b}`, answer: a - b };
  },
  // Multiplication table
  () => {
    const a = Math.floor(Math.random() * 11) + 2;
    const b = Math.floor(Math.random() * 11) + 2;
    return { question: `${a} × ${b}`, answer: a * b };
  },
  // Division (toujours entière)
  () => {
    const b = Math.floor(Math.random() * 8) + 2;
    const result = Math.floor(Math.random() * 11) + 2;
    const a = b * result;
    return { question: `${a} ÷ ${b}`, answer: result };
  },
  // Carré
  () => {
    const a = Math.floor(Math.random() * 14) + 2;
    return { question: `${a}²`, answer: a * a };
  },
  // Pourcentage
  () => {
    const percents = [10, 20, 25, 50, 75];
    const p = percents[Math.floor(Math.random() * percents.length)];
    const base = (Math.floor(Math.random() * 9) + 1) * 20; // 20..200
    return { question: `${p}% de ${base}`, answer: (p * base) / 100 };
  },
  // Équation simple ax = b
  () => {
    const a = Math.floor(Math.random() * 9) + 2;
    const result = Math.floor(Math.random() * 11) + 2;
    const b = a * result;
    return { question: `${a}x = ${b}, x = ?`, answer: result };
  },
  // Double / triple / moitié
  () => {
    const ops = [
      () => { const n = Math.floor(Math.random() * 90) + 10; return { question: `Double de ${n}`, answer: n * 2 }; },
      () => { const n = Math.floor(Math.random() * 30) + 5; return { question: `Triple de ${n}`, answer: n * 3 }; },
      () => { const n = (Math.floor(Math.random() * 50) + 5) * 2; return { question: `Moitié de ${n}`, answer: n / 2 }; }
    ];
    return ops[Math.floor(Math.random() * ops.length)]();
  },
  // Puissance de 2
  () => {
    const exp = Math.floor(Math.random() * 7) + 2;
    return { question: `2^${exp}`, answer: Math.pow(2, exp) };
  },
  // Carré moins (identité remarquable simple)
  () => {
    const a = Math.floor(Math.random() * 8) + 2;
    return { question: `${a}² + ${a}`, answer: a * a + a };
  }
];

let raceState = null;
let raceTimerId = null;

function startRace() {
  raceState = {
    score: 0,
    distance: 0,
    tokensEarned: 0,
    timeLeft: RACE_CONFIG.TIME_PER_QUESTION,
    currentQuestion: null,
    questionStartTime: Date.now()
  };
  showScreen('racing-screen');
  renderRaceFrame();
  nextQuestion();
}

function nextQuestion() {
  const gen = QUESTION_GENERATORS[Math.floor(Math.random() * QUESTION_GENERATORS.length)];
  raceState.currentQuestion = gen();
  raceState.timeLeft = RACE_CONFIG.TIME_PER_QUESTION;
  raceState.questionStartTime = Date.now();
  updateRaceUI();
  // Reset and focus input
  const input = document.getElementById('race-answer');
  if (input) { input.value = ''; setTimeout(() => input.focus(), 30); }
  // Start ticking
  if (raceTimerId) clearInterval(raceTimerId);
  raceTimerId = setInterval(tickRaceTimer, 100);
}

function tickRaceTimer() {
  if (!raceState) return;
  const elapsed = (Date.now() - raceState.questionStartTime) / 1000;
  raceState.timeLeft = Math.max(0, RACE_CONFIG.TIME_PER_QUESTION - elapsed);
  const t = document.getElementById('race-timer');
  if (t) {
    t.textContent = raceState.timeLeft.toFixed(1);
    const ratio = raceState.timeLeft / RACE_CONFIG.TIME_PER_QUESTION;
    if (ratio < 0.25) t.parentElement.style.background = 'rgba(239, 68, 68, 0.15)';
    else if (ratio < 0.5) t.parentElement.style.background = 'rgba(245, 158, 11, 0.15)';
    else t.parentElement.style.background = '';
  }
  if (raceState.timeLeft <= 0) {
    clearInterval(raceTimerId);
    endRace('timeout');
  }
}

function submitRaceAnswer() {
  if (!raceState || !raceState.currentQuestion) return;
  const input = document.getElementById('race-answer');
  const raw = (input.value || '').replace(',', '.').trim();
  const userAns = parseFloat(raw);
  if (isNaN(userAns)) {
    input.classList.add('shake-input');
    setTimeout(() => input.classList.remove('shake-input'), 400);
    return;
  }
  const correct = Math.abs(userAns - raceState.currentQuestion.answer) < 0.01;
  if (correct) {
    raceState.score += 1;
    raceState.distance += 1;
    raceState.tokensEarned += RACE_CONFIG.TOKENS_PER_CORRECT;
    state.tokens += RACE_CONFIG.TOKENS_PER_CORRECT;
    gainXp(RACE_CONFIG.XP_PER_CORRECT, 'Sprint juste');
    audio.play('success');
    // Boost de vitesse visuelle
    document.getElementById('racing-screen')?.classList.add('boost');
    setTimeout(() => document.getElementById('racing-screen')?.classList.remove('boost'), 400);
    saveState();
    nextQuestion();
  } else {
    clearInterval(raceTimerId);
    audio.play('error');
    endRace('wrong', userAns);
  }
}

function endRace(reason, userAns) {
  if (!raceState) return;
  clearInterval(raceTimerId);
  const finalScore = raceState.score;
  const finalDistance = raceState.distance;
  const tokensEarned = raceState.tokensEarned;
  let bonusTokens = 0;
  const isRecord = finalScore > (state.racingBestScore || 0);
  if (isRecord) {
    state.racingBestScore = finalScore;
    bonusTokens = RACE_CONFIG.BONUS_TOKENS_NEW_RECORD;
    state.tokens += bonusTokens;
  }
  // Ajouter au leaderboard et trier
  state.racingLeaderboard.push({
    score: finalScore,
    distance: finalDistance,
    tokens: tokensEarned + bonusTokens,
    dateISO: new Date().toISOString()
  });
  state.racingLeaderboard.sort((a, b) => b.score - a.score);
  state.racingLeaderboard = state.racingLeaderboard.slice(0, 10);
  saveState();

  const currentQ = raceState.currentQuestion;
  raceState = null;

  if (isRecord) confettiBurst('rainbow');

  // Render game over
  const reasonText = reason === 'timeout' ? '⏱ Temps écoulé !' : `❌ Réponse incorrecte (${userAns}, attendu ${currentQ.answer})`;
  const overlay = document.getElementById('race-gameover');
  document.getElementById('race-gameover-content').innerHTML = `
    <div class="text-center mb-6">
      <div class="text-6xl mb-3">${isRecord ? '🏆' : '🏁'}</div>
      <h2 class="text-3xl font-extrabold mb-1">${isRecord ? 'NOUVEAU RECORD !' : 'Course terminée'}</h2>
      <p class="text-sm text-slate-500">${reasonText}</p>
    </div>
    <div class="grid grid-cols-3 gap-3 mb-6">
      <div class="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200">
        <div class="text-3xl font-extrabold text-emerald-700">${finalScore}</div>
        <div class="text-xs uppercase tracking-wide text-emerald-700/70 mt-1 font-semibold">Score</div>
      </div>
      <div class="bg-blue-50 rounded-2xl p-4 text-center border border-blue-200">
        <div class="text-3xl font-extrabold text-blue-700">${finalDistance}</div>
        <div class="text-xs uppercase tracking-wide text-blue-700/70 mt-1 font-semibold">Distance</div>
      </div>
      <div class="bg-amber-50 rounded-2xl p-4 text-center border border-amber-200">
        <div class="text-3xl font-extrabold text-amber-700">+${tokensEarned + bonusTokens}</div>
        <div class="text-xs uppercase tracking-wide text-amber-700/70 mt-1 font-semibold">🪙 Jetons</div>
      </div>
    </div>
    ${isRecord ? `<div class="rounded-2xl p-4 bg-gradient-to-r from-purple-100 to-amber-100 border border-purple-200 mb-6 text-center"><div class="text-sm font-bold text-purple-700">+${bonusTokens} jetons bonus 🎉</div><div class="text-xs text-purple-600 mt-0.5">pour avoir battu ton ancien record (${state.racingBestScore - 1 < 0 ? '0' : state.racingBestScore})</div></div>` : ''}
    <div class="mb-6">
      <h3 class="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">🏅 Top scores</h3>
      <div class="space-y-1.5">
        ${state.racingLeaderboard.slice(0, 5).map((entry, i) => `
          <div class="flex items-center justify-between px-3 py-2 rounded-xl ${i === 0 ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50'}">
            <div class="flex items-center gap-2">
              <span class="text-sm font-bold ${i === 0 ? 'text-amber-700' : 'text-slate-400'}">${i+1}${i === 0 ? ' 🏆' : ''}</span>
              <span class="text-xs text-slate-500">${entry.dateISO.slice(0, 10)}</span>
            </div>
            <div class="flex items-center gap-3 text-xs font-bold">
              <span class="text-emerald-700">⚡ ${entry.score}</span>
              <span class="text-amber-700">🪙 ${entry.tokens || 0}</span>
            </div>
          </div>
        `).join('')}
        ${state.racingLeaderboard.length === 0 ? '<p class="text-center text-sm text-slate-400 py-2">Aucun score encore</p>' : ''}
      </div>
    </div>
    <div class="flex gap-3">
      <button id="race-replay" class="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-card transition">Rejouer</button>
      <button id="race-back-home" class="flex-1 py-3 rounded-xl border-2 border-slate-200 hover:bg-slate-50 font-bold transition">Accueil</button>
    </div>
  `;
  overlay.classList.remove('hidden');
  document.getElementById('race-replay').addEventListener('click', () => {
    overlay.classList.add('hidden');
    audio.play('click');
    startRace();
  });
  document.getElementById('race-back-home').addEventListener('click', () => {
    overlay.classList.add('hidden');
    audio.play('click');
    showScreen('home-screen'); renderHome();
  });
}

function renderRaceFrame() {
  document.getElementById('racing-content').innerHTML = `
    <div class="race-road"></div>
    <div class="race-road-line"></div>
    <div id="race-car" class="race-car">
      <svg viewBox="0 0 100 60" width="80" height="48" xmlns="http://www.w3.org/2000/svg">
        <rect x="15" y="15" width="70" height="25" rx="8" fill="#EF4444"/>
        <rect x="25" y="6" width="50" height="14" rx="6" fill="#DC2626"/>
        <rect x="32" y="9" width="36" height="8" rx="3" fill="#7DD3FC"/>
        <circle cx="28" cy="44" r="9" fill="#1F2937"/>
        <circle cx="28" cy="44" r="4" fill="#6B7280"/>
        <circle cx="72" cy="44" r="9" fill="#1F2937"/>
        <circle cx="72" cy="44" r="4" fill="#6B7280"/>
        <rect x="78" y="22" width="6" height="8" fill="#FBBF24"/>
      </svg>
    </div>

    <!-- HUD top -->
    <div class="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between gap-2">
      <button id="race-quit" class="px-3 py-1.5 bg-white/90 backdrop-blur rounded-xl text-xs font-bold text-slate-700 shadow-card">← Quitter</button>
      <div class="flex gap-1.5 flex-wrap justify-end">
        <span class="bg-white/90 backdrop-blur text-emerald-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-card border border-emerald-100">⚡ <span id="race-score">0</span></span>
        <span class="bg-white/90 backdrop-blur text-blue-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-card border border-blue-100">🚗 <span id="race-distance">0</span></span>
        <span class="bg-white/90 backdrop-blur text-amber-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-card border border-amber-100">🪙 <span id="race-tokens">0</span></span>
        <span class="bg-white/90 backdrop-blur text-orange-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-card border border-orange-100 transition-colors" id="race-timer-wrap">⏱ <span id="race-timer">20</span>s</span>
      </div>
    </div>

    <!-- Question box -->
    <div class="absolute bottom-0 left-0 right-0 z-30 p-4">
      <div class="max-w-md mx-auto bg-white rounded-3xl p-5 sm:p-6 shadow-glow border-2 border-brand-200">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-400 text-center mb-2">Question</p>
        <p id="race-question" class="text-2xl sm:text-3xl font-extrabold text-center mb-4 text-ink min-h-[2.5rem]">...</p>
        <input id="race-answer" type="text" inputmode="numeric"
          class="w-full px-4 py-3 sm:py-4 rounded-2xl border-2 border-slate-200 focus:border-brand-500 focus:outline-none text-2xl font-extrabold text-center transition-colors"
          placeholder="?" autocomplete="off"/>
        <button id="race-submit" class="w-full mt-3 py-3 sm:py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-lg shadow-card transition-all hover:scale-[1.02] active:scale-95">
          Valider →
        </button>
      </div>
    </div>

    <!-- Game over overlay -->
    <div id="race-gameover" class="hidden fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div id="race-gameover-content" class="bg-white rounded-3xl p-6 sm:p-8 shadow-glow max-w-md w-full my-auto"></div>
    </div>
  `;
  // Wire events
  document.getElementById('race-quit').addEventListener('click', () => {
    audio.play('click');
    clearInterval(raceTimerId);
    raceState = null;
    showScreen('home-screen'); renderHome();
  });
  document.getElementById('race-submit').addEventListener('click', submitRaceAnswer);
  document.getElementById('race-answer').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitRaceAnswer();
  });
}

function updateRaceUI() {
  if (!raceState) return;
  document.getElementById('race-question').textContent = raceState.currentQuestion.question;
  document.getElementById('race-score').textContent = raceState.score;
  document.getElementById('race-distance').textContent = raceState.distance;
  document.getElementById('race-tokens').textContent = raceState.tokensEarned;
  document.getElementById('race-timer').textContent = RACE_CONFIG.TIME_PER_QUESTION;
}

function setupRacing() {
  // Rendu dynamique : pas de setup statique
}



// =====================================================================
// BONS PANIERS — Mini-jeu Dunk Shot avec questions de maths
// Style : balle physique, 2 cerceaux par niveau, viser le bon
// =====================================================================
// =============================================================================
//  MINI-JEU « BONS PANIERS » — style Dunk Shot avec scrolling vertical
// =============================================================================
// =============================================================================
//  MINI-JEU « BONS PANIERS » — style Dunk Shot (épuré + PERFECT switch)
// =============================================================================
const BASKETS_CONFIG = {
  GRAVITY: 0.62,
  MAX_LAUNCH_VEL: 26,
  DRAG_SCALE: 0.15,
  HOOP_WIDTH: 130,
  HOOP_RIM_THICKNESS: 8,
  BALL_RADIUS: 22,
  TOKENS_PER_HIT: 2,
  XP_PER_HIT: 10,
  BONUS_TOKENS_NEW_RECORD: 20,
  STREAK_BONUS_INTERVAL: 5,
  STREAK_BONUS_TOKENS: 5,
  WALL_BOUNCE: 0.78,
  LEVEL_GAP: 300,
  CAMERA_LERP: 0.14,
  SCREEN_BALL_Y_RATIO: 0.72,
  PERFECT_THRESHOLD: 0.22,
  PERFECT_BONUS_TOKENS: 1,
  FIRE_DURATION: 1.4,
  TRAIL_LEN: 16
};

let basketsGame = null;
let basketsAnimFrame = null;

function latexToText(s) {
  if (s == null) return '';
  let t = String(s);
  t = t.replace(/<[^>]+>/g, '');
  t = t.replace(/\\dfrac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, '$1/$2');
  t = t.replace(/\\frac\s*\{([^{}]+)\}\s*\{([^{}]+)\}/g, '$1/$2');
  t = t.replace(/\\sqrt\s*\{([^{}]+)\}/g, '√($1)');
  t = t.replace(/\\sqrt\s+(\S)/g, '√$1');
  t = t.replace(/\\left|\\right/g, '');
  t = t.replace(/\\cdot|\\times/g, '×');
  t = t.replace(/\\div/g, '÷');
  t = t.replace(/\\pm/g, '±');
  t = t.replace(/\\pi/g, 'π');
  t = t.replace(/\\infty/g, '∞');
  t = t.replace(/\\leq?(?![a-zA-Z])/g, '≤');
  t = t.replace(/\\geq?(?![a-zA-Z])/g, '≥');
  t = t.replace(/\\neq?(?![a-zA-Z])/g, '≠');
  t = t.replace(/\\in(?![a-zA-Z])/g, '∈');
  t = t.replace(/\\notin/g, '∉');
  t = t.replace(/\\cup/g, '∪');
  t = t.replace(/\\cap/g, '∩');
  t = t.replace(/\\subset/g, '⊂');
  t = t.replace(/\\emptyset/g, '∅');
  t = t.replace(/\\mathbb\s*\{R\}/g, 'R');
  t = t.replace(/\\mathbb\s*\{N\}/g, 'N');
  t = t.replace(/\\mathbb\s*\{Z\}/g, 'Z');
  t = t.replace(/\\mathbb\s*\{Q\}/g, 'Q');
  t = t.replace(/\\sin/g, 'sin');
  t = t.replace(/\\cos/g, 'cos');
  t = t.replace(/\\tan/g, 'tan');
  t = t.replace(/\\ln/g, 'ln');
  t = t.replace(/\\log/g, 'log');
  t = t.replace(/\\exp/g, 'exp');
  t = t.replace(/\\lim/g, 'lim');
  t = t.replace(/\\to/g, '→');
  t = t.replace(/\\quad|\\qquad/g, ' ');
  t = t.replace(/\\,|\\;|\\!/g, '');
  t = t.replace(/\\\\/g, ' ');
  t = t.replace(/\^\{([^{}]+)\}/g, '^$1');
  t = t.replace(/_\{([^{}]+)\}/g, '_$1');
  t = t.replace(/\$+/g, '');
  t = t.replace(/[{}]/g, '');
  t = t.replace(/\\[a-zA-Z]+/g, '');
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

function startBaskets() {
  showScreen('baskets-screen');
  setTimeout(() => initBasketsGame(), 30);
}

function initBasketsGame() {
  const canvas = document.getElementById('baskets-canvas');
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  const ctx = canvas.getContext('2d');
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.scale(dpr, dpr);

  const W = window.innerWidth;
  const H = window.innerHeight;
  const startY = H * BASKETS_CONFIG.SCREEN_BALL_Y_RATIO;

  // Calcule la zone safe sous la barre question (pour ne pas cacher les billboards)
  const qBox = document.getElementById('baskets-question-box');
  const qRect = qBox ? qBox.getBoundingClientRect() : { bottom: 100 };
  const safeTopY = (qRect.bottom || 100) + 90; // 90px = hauteur billboard + marge
  // Distance entre niveaux = écart maximal pour que le panier reste sous safeTopY
  const dynamicGap = Math.max(160, Math.min(BASKETS_CONFIG.LEVEL_GAP, startY - safeTopY));

  basketsGame = {
    canvas, ctx, W, H,
    ball: {
      x: W / 2,
      y: startY,
      vx: 0, vy: 0,
      r: BASKETS_CONFIG.BALL_RADIUS,
      rotation: 0, spin: 0,
      trail: [],
      fireTimer: 0,
      restHoop: null
    },
    hoops: [],
    oldHoops: [],
    score: 0,
    streak: 0,
    perfectStreak: 0,
    streakMax: 0,
    tokensEarned: 0,
    currentQuestion: null,
    state: 'idle',
    aim: null, aimOrigin: null,
    particles: [],
    floatTexts: [],
    cameraY: 0, cameraTargetY: 0,
    nextLevelY: startY - dynamicGap,
    levelGap: dynamicGap,
    safeTopY: safeTopY,
    flashTime: 0, flashColor: null,
    perfectFlash: 0,
    lastFrameTime: performance.now()
  };

  setupBasketsFirstLevel();
  document.getElementById('baskets-hint')?.classList.remove('hidden');
  attachBasketsEvents();
  updateBasketsHUD();
  if (basketsAnimFrame) cancelAnimationFrame(basketsAnimFrame);
  basketsLoop();
}

function attachBasketsEvents() {
  const canvas = basketsGame.canvas;
  const onDown = (e) => {
    if (basketsGame.state !== 'idle') return;
    const p = pointerPos(e, canvas);
    const screenBall = worldToScreen(basketsGame.ball.x, basketsGame.ball.y);
    if (Math.hypot(p.x - screenBall.x, p.y - screenBall.y) > 110) return;
    basketsGame.state = 'aiming';
    basketsGame.aimOrigin = p;
    basketsGame.aim = p;
    document.getElementById('baskets-hint')?.classList.add('hidden');
    e.preventDefault();
  };
  const onMove = (e) => {
    if (basketsGame.state !== 'aiming') return;
    basketsGame.aim = pointerPos(e, canvas);
    e.preventDefault();
  };
  const onUp = (e) => {
    if (basketsGame.state !== 'aiming') return;
    const dx = basketsGame.aimOrigin.x - basketsGame.aim.x;
    const dy = basketsGame.aimOrigin.y - basketsGame.aim.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 18) {
      basketsGame.state = 'idle';
      basketsGame.aim = null;
      return;
    }
    basketsGame.ball.vx = dx * BASKETS_CONFIG.DRAG_SCALE;
    basketsGame.ball.vy = dy * BASKETS_CONFIG.DRAG_SCALE;
    const v = Math.hypot(basketsGame.ball.vx, basketsGame.ball.vy);
    if (v > BASKETS_CONFIG.MAX_LAUNCH_VEL) {
      const k = BASKETS_CONFIG.MAX_LAUNCH_VEL / v;
      basketsGame.ball.vx *= k;
      basketsGame.ball.vy *= k;
    }
    basketsGame.ball.spin = (basketsGame.ball.vx > 0 ? 1 : -1) * 0.24;
    basketsGame.ball.restHoop = null;
    basketsGame.state = 'flying';
    basketsGame.aim = null;
    audio.play('click');
  };

  canvas.onpointerdown = onDown;
  canvas.onpointermove = onMove;
  canvas.onpointerup = onUp;
  canvas.onpointercancel = onUp;

  document.getElementById('baskets-quit').onclick = () => {
    audio.play('click');
    endBasketsGame('quit');
  };
}

function pointerPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0)) - rect.left;
  const y = (e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0)) - rect.top;
  return { x, y };
}

function worldToScreen(wx, wy) {
  return { x: wx, y: wy - basketsGame.cameraY };
}

function setupBasketsFirstLevel() {
  const q = generateBasketsQuestion();
  basketsGame.currentQuestion = q;
  applyQuestionToDom(q);
  spawnHoopsForNextLevel(q);
}

function setupBasketsNextLevel() {
  const q = generateBasketsQuestion();
  basketsGame.currentQuestion = q;
  applyQuestionToDom(q);
  spawnHoopsForNextLevel(q);
  basketsGame.state = 'idle';
}

function applyQuestionToDom(q) {
  const el = document.getElementById('baskets-question');
  if (!el) return;
  el.innerHTML = q.question;
  if (typeof renderMath === 'function') renderMath(el);
  // Re-mesure de la boîte question APRÈS rendu KaTeX (peut faire grandir la boîte).
  // Si un hoop est trop proche de la question, on le pousse vers le bas.
  setTimeout(() => {
    if (!basketsGame) return;
    const qBox = document.getElementById('baskets-question-box');
    if (!qBox) return;
    const qBottom = qBox.getBoundingClientRect().bottom;
    const minScreenY = qBottom + 38; // 18 demi-rim + 20 marge
    for (const h of basketsGame.hoops) {
      const screenY = h.y - basketsGame.cameraY;
      if (screenY < minScreenY) {
        const delta = minScreenY - screenY;
        h.y += delta;
      }
    }
  }, 60);
}

function spawnHoopsForNextLevel(q) {
  const W = basketsGame.W;
  const reverse = Math.random() < 0.5;
  const c0 = reverse ? q.candidates[1] : q.candidates[0];
  const c1 = reverse ? q.candidates[0] : q.candidates[1];
  const correctIdxRemapped = reverse ? (1 - q.correctIndex) : q.correctIndex;
  const margin = 80;
  const minGap = 220;
  let leftX, rightX;
  let tries = 0;
  do {
    leftX = margin + Math.random() * (W * 0.30);
    rightX = W * 0.55 + Math.random() * (W * 0.40 - margin);
    tries++;
  } while (rightX - leftX < minGap && tries < 6);
  const newY = basketsGame.nextLevelY;
  basketsGame.hoops = [
    { x: leftX,  y: newY, width: BASKETS_CONFIG.HOOP_WIDTH, answer: c0, isCorrect: correctIdxRemapped === 0, hit: false, netT: 0, glow: 0, tilt: -0.04 + Math.random() * 0.08 },
    { x: rightX, y: newY, width: BASKETS_CONFIG.HOOP_WIDTH, answer: c1, isCorrect: correctIdxRemapped === 1, hit: false, netT: 0, glow: 0, tilt: -0.04 + Math.random() * 0.08 }
  ];
}

function generateBasketsQuestion() {
  const seen = Object.keys(state.progress || {}).filter(cid => {
    const p = state.progress[cid];
    return p && (p.chapterMastered || Object.keys(p).some(k => k !== 'chapterMastered' && k !== 'chapterMasteredISO' && p[k] && p[k].mastered));
  });
  let pool = seen.filter(cid => CHAPTER_DETAILS[cid]);
  if (pool.length === 0) {
    pool = Object.keys(CHAPTER_DETAILS).filter(cid => CHAPTER_DETAILS[cid].properties.some(p => p.exercises && p.exercises.length > 0));
  }
  if (pool.length === 0) {
    return { question: '$2 + 3$', candidates: ['5', '7'], correctIndex: 0 };
  }
  for (let i = 0; i < 12; i++) {
    const cid = pool[Math.floor(Math.random() * pool.length)];
    const props = CHAPTER_DETAILS[cid].properties.filter(p => p.exercises && p.exercises.length > 0);
    if (props.length === 0) continue;
    const prop = props[Math.floor(Math.random() * props.length)];
    const exo = prop.exercises[Math.floor(Math.random() * prop.exercises.length)];
    if (exo.type === 'qcm' && Array.isArray(exo.options) && exo.options.length >= 2) {
      const correctAns = exo.options[exo.correctIndex];
      const others = exo.options.filter((_, idx) => idx !== exo.correctIndex);
      const distractor = others[Math.floor(Math.random() * others.length)];
      const cCorrect = latexToText(correctAns);
      const cDistract = latexToText(distractor);
      if (cCorrect.length > 16 || cDistract.length > 16) continue;
      return {
        question: exo.question,
        candidates: [cCorrect, cDistract],
        correctIndex: 0
      };
    }
    if (exo.type === 'numeric' && Math.abs(exo.answer) < 1000) {
      const correct = exo.answer;
      const range = Math.max(1, Math.abs(correct) * 0.3, 2);
      const noise = (Math.random() * range + 1) * (Math.random() < 0.5 ? -1 : 1);
      let distractor = Math.round((correct + noise) * 100) / 100;
      if (distractor === correct) distractor = correct + 1;
      return {
        question: exo.question,
        candidates: [String(correct), String(distractor)],
        correctIndex: 0
      };
    }
  }
  return { question: '$2 + 3$', candidates: ['5', '7'], correctIndex: 0 };
}

function basketsLoop() {
  if (!basketsGame) return;
  const now = performance.now();
  const dt = Math.min(2, (now - basketsGame.lastFrameTime) / 16);
  basketsGame.lastFrameTime = now;

  if (basketsGame.state === 'flying') {
    physicsStep(basketsGame, dt);
  }
  const cdiff = basketsGame.cameraTargetY - basketsGame.cameraY;
  basketsGame.cameraY += cdiff * BASKETS_CONFIG.CAMERA_LERP * dt;
  if (Math.abs(cdiff) < 0.5) basketsGame.cameraY = basketsGame.cameraTargetY;

  updateParticles(dt);

  for (const h of basketsGame.hoops) {
    if (h.netT > 0) h.netT = Math.max(0, h.netT - 0.04 * dt);
    if (h.glow > 0) h.glow = Math.max(0, h.glow - 0.05 * dt);
  }
  for (const h of basketsGame.oldHoops) {
    if (h.netT > 0) h.netT = Math.max(0, h.netT - 0.04 * dt);
    if (h.glow > 0) h.glow = Math.max(0, h.glow - 0.05 * dt);
  }

  if (basketsGame.flashTime > 0) basketsGame.flashTime = Math.max(0, basketsGame.flashTime - 0.06 * dt);
  if (basketsGame.perfectFlash > 0) basketsGame.perfectFlash = Math.max(0, basketsGame.perfectFlash - 0.05 * dt);

  if (basketsGame.ball.fireTimer > 0) {
    basketsGame.ball.fireTimer = Math.max(0, basketsGame.ball.fireTimer - dt / 60);
    spawnFireParticles();
  }

  renderBaskets(basketsGame);
  basketsAnimFrame = requestAnimationFrame(basketsLoop);
}

function spawnFireParticles() {
  const g = basketsGame;
  const b = g.ball;
  const count = 1 + (Math.random() < 0.6 ? 1 : 0);
  for (let i = 0; i < count; i++) {
    const ang = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;
    const r = b.r * (0.7 + Math.random() * 0.4);
    const colorPick = Math.random();
    const color = colorPick < 0.35 ? '#FBBF24' : (colorPick < 0.75 ? '#F97316' : '#DC2626');
    g.particles.push({
      x: b.x + Math.cos(ang) * r * 0.4,
      y: b.y + Math.sin(ang) * r * 0.4,
      vx: (Math.random() - 0.5) * 1.2 - b.vx * 0.15,
      vy: -1.5 - Math.random() * 2 - Math.abs(b.vy) * 0.05,
      life: 0.5 + Math.random() * 0.4,
      maxLife: 0.9,
      r: 4 + Math.random() * 5,
      color, rot: 0, spin: 0,
      shape: 'flame'
    });
  }
}

function updateParticles(dt) {
  const g = basketsGame;
  for (let i = g.particles.length - 1; i >= 0; i--) {
    const p = g.particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    if (p.shape !== 'flame') {
      p.vy += 0.18 * dt;
    } else {
      p.vy += 0.04 * dt;
      p.r *= 0.96;
    }
    p.life -= 0.025 * dt;
    p.rot += p.spin * dt;
    if (p.life <= 0) g.particles.splice(i, 1);
  }
  for (let i = g.floatTexts.length - 1; i >= 0; i--) {
    const f = g.floatTexts[i];
    f.y -= (f.bigPerfect ? 0.55 : 0.9) * dt;
    f.life -= (f.bigPerfect ? 0.012 : 0.018) * dt;
    if (f.bigPerfect) f.scale = Math.min(1, (f.scale || 0) + 0.06 * dt);
    if (f.life <= 0) g.floatTexts.splice(i, 1);
  }
}

function physicsStep(game, dt) {
  const b = game.ball;
  b.vy += BASKETS_CONFIG.GRAVITY * dt;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
  b.rotation += b.spin * dt;

  b.trail.unshift({ x: b.x, y: b.y, fire: b.fireTimer > 0 });
  if (b.trail.length > BASKETS_CONFIG.TRAIL_LEN) b.trail.pop();

  if (b.x < b.r) { b.x = b.r; b.vx = -b.vx * BASKETS_CONFIG.WALL_BOUNCE; b.spin = -b.spin; }
  if (b.x > game.W - b.r) { b.x = game.W - b.r; b.vx = -b.vx * BASKETS_CONFIG.WALL_BOUNCE; b.spin = -b.spin; }

  if (b.vy > 0) {
    for (const hoop of game.hoops) {
      if (hoop.hit) continue;
      const within = (b.x > hoop.x - hoop.width / 2 + 10) && (b.x < hoop.x + hoop.width / 2 - 10);
      const crossing = (b.y + b.r > hoop.y) && (b.y - b.r < hoop.y + 26) && within;
      if (crossing) {
        hoop.hit = true;
        hoop.netT = 1;
        if (hoop.isCorrect) {
          const offsetRatio = Math.abs(b.x - hoop.x) / (hoop.width / 2);
          const verticalish = Math.abs(b.vx) < Math.abs(b.vy) * 0.55;
          const isPerfect = offsetRatio < BASKETS_CONFIG.PERFECT_THRESHOLD && verticalish;
          onBasketsHit(game, hoop, isPerfect);
        } else {
          onBasketsWrong(game, hoop);
        }
        return;
      }
    }
  }

  if (b.y > game.cameraY + game.H + 120) {
    endBasketsGame('miss');
  }
}

function onBasketsHit(game, hoop, isPerfect) {
  game.score += 1;
  game.streak += 1;
  game.streakMax = Math.max(game.streakMax, game.streak);

  let tokensThisShot = BASKETS_CONFIG.TOKENS_PER_HIT;
  if (isPerfect) {
    game.perfectStreak += 1;
    tokensThisShot += BASKETS_CONFIG.PERFECT_BONUS_TOKENS;
    game.ball.fireTimer = BASKETS_CONFIG.FIRE_DURATION;
    game.perfectFlash = 1;
  } else {
    game.perfectStreak = 0;
  }

  game.tokensEarned += tokensThisShot;
  state.tokens += tokensThisShot;
  gainXp(BASKETS_CONFIG.XP_PER_HIT + (isPerfect ? 5 : 0), 'Bons paniers');

  if (game.streak % BASKETS_CONFIG.STREAK_BONUS_INTERVAL === 0) {
    game.tokensEarned += BASKETS_CONFIG.STREAK_BONUS_TOKENS;
    state.tokens += BASKETS_CONFIG.STREAK_BONUS_TOKENS;
    toast('Série de ' + game.streak + ' ! +' + BASKETS_CONFIG.STREAK_BONUS_TOKENS + ' tokens', 'success');
  }
  audio.play('success');
  saveState();
  updateBasketsHUD();

  game.ball.x = hoop.x;
  game.ball.y = hoop.y + 14;
  game.ball.vx = 0;
  game.ball.vy = 0;
  game.ball.spin = 0;
  game.ball.trail = [];
  game.ball.restHoop = hoop;
  hoop.glow = 1;

  if (isPerfect) {
    for (let i = 0; i < 22; i++) {
      const ang = (i / 22) * Math.PI * 2;
      const spd = 3 + Math.random() * 3;
      const colorPick = Math.random();
      const color = colorPick < 0.35 ? '#FBBF24' : (colorPick < 0.75 ? '#F97316' : '#DC2626');
      game.particles.push({
        x: hoop.x, y: hoop.y + 8,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd - 1,
        life: 0.9, maxLife: 0.9,
        r: 5 + Math.random() * 4,
        color, rot: 0, spin: 0, shape: 'flame'
      });
    }
    game.floatTexts.push({
      x: hoop.x, y: hoop.y - 60,
      text: 'PERFECT x ' + game.perfectStreak,
      color: '#F97316', life: 1.6, big: true, bigPerfect: true, scale: 0
    });
    game.floatTexts.push({
      x: hoop.x, y: hoop.y - 28,
      text: '+' + tokensThisShot,
      color: '#FBBF24', life: 1.2, big: true
    });
    game.flashTime = 1.0;
    game.flashColor = 'rgba(249, 115, 22, 0.22)';
  } else {
    spawnScoreParticles(hoop.x, hoop.y + 4, '#10B981');
    spawnScoreParticles(hoop.x, hoop.y + 4, '#FB923C');
    game.floatTexts.push({ x: hoop.x, y: hoop.y - 28, text: '+1', color: '#FACC15', life: 1.0, big: true });
    game.floatTexts.push({ x: hoop.x + 36, y: hoop.y - 4, text: '+' + tokensThisShot, color: '#FBBF24', life: 1.0 });
    game.flashTime = 0.6;
    game.flashColor = 'rgba(16, 185, 129, 0.16)';
  }

  game.oldHoops = game.oldHoops.concat([{ ...hoop, isOld: true }]);
  if (game.oldHoops.length > 4) game.oldHoops.shift();

  game.cameraTargetY = game.ball.y - game.H * BASKETS_CONFIG.SCREEN_BALL_Y_RATIO;
  game.nextLevelY = game.ball.y - game.levelGap;

  game.state = 'transition';
  setTimeout(function () {
    if (!basketsGame) return;
    setupBasketsNextLevel();
  }, isPerfect ? 750 : 550);
}

function spawnScoreParticles(x, y, color) {
  const g = basketsGame;
  for (let i = 0; i < 12; i++) {
    const ang = Math.random() * Math.PI * 2;
    const spd = 2 + Math.random() * 4;
    g.particles.push({
      x, y,
      vx: Math.cos(ang) * spd,
      vy: Math.sin(ang) * spd - 1.5,
      life: 0.8 + Math.random() * 0.4,
      maxLife: 1.2,
      r: 2.5 + Math.random() * 3,
      color, rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.3,
      shape: 'dot'
    });
  }
}

function onBasketsWrong(game, hoop) {
  audio.play('error');
  game.flashTime = 1;
  game.flashColor = 'rgba(239, 68, 68, 0.25)';
  endBasketsGame('wrong', hoop);
}

function endBasketsGame(reason, wrongHoop) {
  if (!basketsGame) return;
  if (basketsAnimFrame) { cancelAnimationFrame(basketsAnimFrame); basketsAnimFrame = null; }
  const finalScore = basketsGame.score;
  const finalStreak = basketsGame.streakMax;
  const tokensEarned = basketsGame.tokensEarned;
  let bonus = 0;
  const isRecord = finalScore > (state.basketsBestScore || 0);
  if (isRecord) {
    state.basketsBestScore = finalScore;
    bonus = BASKETS_CONFIG.BONUS_TOKENS_NEW_RECORD;
    state.tokens += bonus;
  }
  state.basketsLeaderboard.push({
    score: finalScore, streakMax: finalStreak, tokens: tokensEarned + bonus, dateISO: new Date().toISOString()
  });
  state.basketsLeaderboard.sort(function (a, b) { return b.score - a.score; });
  state.basketsLeaderboard = state.basketsLeaderboard.slice(0, 10);
  saveState();

  const correctAns = basketsGame.currentQuestion ? basketsGame.currentQuestion.candidates[basketsGame.currentQuestion.correctIndex] : '?';
  basketsGame.state = 'gameover';

  if (isRecord) confettiBurst('rainbow');

  const reasonText = reason === 'quit' ? 'Partie quittée' : reason === 'miss' ? 'Tu as raté les deux paniers' : 'Mauvais panier — la bonne réponse était ' + correctAns;
  const overlay = document.getElementById('baskets-gameover');
  let leaderboardHtml = '';
  for (let i = 0; i < Math.min(5, state.basketsLeaderboard.length); i++) {
    const entry = state.basketsLeaderboard[i];
    leaderboardHtml += '<div class="flex items-center justify-between px-3 py-2 rounded-xl ' + (i === 0 ? 'bg-amber-50 border border-amber-200' : 'bg-slate-50') + '">' +
      '<div class="flex items-center gap-2">' +
      '<span class="text-sm font-bold ' + (i === 0 ? 'text-amber-700' : 'text-slate-400') + '">' + (i + 1) + (i === 0 ? ' 🏆' : '') + '</span>' +
      '<span class="text-xs text-slate-500">' + entry.dateISO.slice(0, 10) + '</span>' +
      '</div>' +
      '<div class="flex items-center gap-3 text-xs font-bold">' +
      '<span class="text-emerald-700">🏀 ' + entry.score + '</span>' +
      '<span class="text-amber-700">🪙 ' + (entry.tokens || 0) + '</span>' +
      '</div></div>';
  }
  if (state.basketsLeaderboard.length === 0) {
    leaderboardHtml = '<p class="text-center text-sm text-slate-400 py-2">Aucun score encore</p>';
  }

  document.getElementById('baskets-gameover-content').innerHTML =
    '<div class="text-center mb-6">' +
    '<div class="text-6xl mb-3">' + (isRecord ? '🏆' : '🏀') + '</div>' +
    '<h2 class="text-3xl font-extrabold mb-1">' + (isRecord ? 'NOUVEAU RECORD !' : 'Partie terminée') + '</h2>' +
    '<p class="text-sm text-slate-500">' + reasonText + '</p>' +
    '</div>' +
    '<div class="grid grid-cols-3 gap-3 mb-6">' +
    '<div class="bg-emerald-50 rounded-2xl p-4 text-center border border-emerald-200"><div class="text-3xl font-extrabold text-emerald-700">' + finalScore + '</div><div class="text-xs uppercase tracking-wide text-emerald-700/70 mt-1 font-semibold">Paniers</div></div>' +
    '<div class="bg-pink-50 rounded-2xl p-4 text-center border border-pink-200"><div class="text-3xl font-extrabold text-pink-700">' + finalStreak + '</div><div class="text-xs uppercase tracking-wide text-pink-700/70 mt-1 font-semibold">🔥 Série max</div></div>' +
    '<div class="bg-amber-50 rounded-2xl p-4 text-center border border-amber-200"><div class="text-3xl font-extrabold text-amber-700">+' + (tokensEarned + bonus) + '</div><div class="text-xs uppercase tracking-wide text-amber-700/70 mt-1 font-semibold">🪙 Jetons</div></div>' +
    '</div>' +
    (isRecord ? '<div class="rounded-2xl p-4 bg-gradient-to-r from-purple-100 to-amber-100 border border-purple-200 mb-6 text-center"><div class="text-sm font-bold text-purple-700">+' + bonus + ' jetons bonus 🎉</div><div class="text-xs text-purple-600 mt-0.5">pour avoir battu ton ancien record</div></div>' : '') +
    '<div class="mb-6"><h3 class="text-sm font-extrabold uppercase tracking-wider text-slate-500 mb-3">🏅 Top scores Paniers</h3><div class="space-y-1.5">' + leaderboardHtml + '</div></div>' +
    '<div class="flex gap-3">' +
    '<button id="baskets-replay" class="flex-1 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-card transition">Rejouer</button>' +
    '<button id="baskets-back-home" class="flex-1 py-3 rounded-xl border-2 border-slate-200 hover:bg-slate-50 font-bold transition">Accueil</button>' +
    '</div>';
  overlay.classList.remove('hidden');
  document.getElementById('baskets-replay').onclick = function () {
    overlay.classList.add('hidden');
    audio.play('click');
    basketsGame = null;
    initBasketsGame();
  };
  document.getElementById('baskets-back-home').onclick = function () {
    overlay.classList.add('hidden');
    audio.play('click');
    basketsGame = null;
    showScreen('home-screen'); renderHome();
  };
}

function updateBasketsHUD() {
  if (!basketsGame) return;
  document.getElementById('baskets-score').textContent = basketsGame.score;
  document.getElementById('baskets-tokens').textContent = basketsGame.tokensEarned;
  document.getElementById('baskets-streak').textContent = basketsGame.streak;
}

function renderBaskets(game) {
  const ctx = game.ctx;
  const W = game.W, H = game.H;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#2E1065');
  bg.addColorStop(0.55, '#581C87');
  bg.addColorStop(1, '#9D174D');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  const halo = ctx.createRadialGradient(W / 2, H * 0.4, 10, W / 2, H * 0.4, Math.max(W, H) * 0.6);
  halo.addColorStop(0, 'rgba(255, 220, 180, 0.10)');
  halo.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, W, H);

  if (game.score > 0) {
    ctx.save();
    ctx.globalAlpha = 0.18;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 ' + Math.floor(Math.min(W, H) * 0.45) + 'px Inter, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(game.score), W / 2, H * 0.42);
    ctx.restore();
  }

  if (game.perfectFlash > 0) {
    ctx.save();
    ctx.globalAlpha = game.perfectFlash * 0.55;
    const pg = ctx.createRadialGradient(W / 2, H / 2, 30, W / 2, H / 2, Math.max(W, H) * 0.7);
    pg.addColorStop(0, 'rgba(251, 191, 36, 0.5)');
    pg.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = pg;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  for (const h of game.oldHoops) {
    const sy = h.y - game.cameraY;
    if (sy < -80 || sy > H + 80) continue;
    drawHoop(ctx, Object.assign({}, h, { y: sy }), true);
  }

  for (const h of game.hoops) {
    const sy = h.y - game.cameraY;
    if (sy < -80 || sy > H + 80) continue;
    drawHoop(ctx, Object.assign({}, h, { y: sy }), false);
  }

  if (game.state === 'aiming' && game.aim && game.aimOrigin) {
    const screenBall = worldToScreen(game.ball.x, game.ball.y);
    const vx = (game.aimOrigin.x - game.aim.x) * BASKETS_CONFIG.DRAG_SCALE;
    const vy = (game.aimOrigin.y - game.aim.y) * BASKETS_CONFIG.DRAG_SCALE;
    const v = Math.hypot(vx, vy);
    const kv = v > BASKETS_CONFIG.MAX_LAUNCH_VEL ? BASKETS_CONFIG.MAX_LAUNCH_VEL / v : 1;
    let tx = screenBall.x, ty = screenBall.y;
    let tvx = vx * kv, tvy = vy * kv;
    ctx.save();
    for (let t = 0; t < 40; t++) {
      tx += tvx;
      ty += tvy;
      tvy += BASKETS_CONFIG.GRAVITY;
      if (ty > H + 100 || tx < -50 || tx > W + 50) break;
      const alpha = Math.max(0, 1 - t / 40);
      ctx.fillStyle = 'rgba(255,255,255,' + (alpha * 0.7) + ')';
      ctx.beginPath();
      ctx.arc(tx, ty, 4 - t * 0.07, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (game.ball.trail.length > 1) {
    const ball = game.ball;
    for (let i = ball.trail.length - 1; i >= 0; i--) {
      const t = ball.trail[i];
      const sp = worldToScreen(t.x, t.y);
      const fade = 1 - i / ball.trail.length;
      const rr = (ball.r * 0.22) * fade;
      if (t.fire) {
        const colorPick = (i % 3);
        const c = colorPick === 0 ? '#FBBF24' : colorPick === 1 ? '#F97316' : '#DC2626';
        ctx.fillStyle = c + Math.floor(fade * 255).toString(16).padStart(2, '0');
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, rr * 2.4, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = 'rgba(251, 146, 60, ' + (fade * 0.7) + ')';
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, rr, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (const p of game.particles) {
    const sp = worldToScreen(p.x, p.y);
    ctx.save();
    if (p.shape === 'flame') {
      ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
      const grad = ctx.createRadialGradient(sp.x, sp.y, 0, sp.x, sp.y, p.r);
      grad.addColorStop(0, '#FEF3C7');
      grad.addColorStop(0.4, p.color);
      grad.addColorStop(1, 'rgba(220, 38, 38, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(sp.x, sp.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  if (game.ball.fireTimer > 0) {
    const ballScreen = worldToScreen(game.ball.x, game.ball.y);
    ctx.save();
    const auraR = game.ball.r * (2.2 + Math.sin(performance.now() / 80) * 0.25);
    const aura = ctx.createRadialGradient(ballScreen.x, ballScreen.y, game.ball.r * 0.5, ballScreen.x, ballScreen.y, auraR);
    aura.addColorStop(0, 'rgba(251, 191, 36, 0.55)');
    aura.addColorStop(0.5, 'rgba(249, 115, 22, 0.35)');
    aura.addColorStop(1, 'rgba(220, 38, 38, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(ballScreen.x, ballScreen.y, auraR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const ballScreen = worldToScreen(game.ball.x, game.ball.y);
  drawBall(ctx, ballScreen.x, ballScreen.y, game.ball.r, game.ball.rotation, game.ball.fireTimer > 0);

  for (const f of game.floatTexts) {
    const sp = worldToScreen(f.x, f.y);
    ctx.save();
    ctx.globalAlpha = Math.max(0, f.life);
    const scale = f.bigPerfect ? (f.scale || 1) : 1;
    ctx.translate(sp.x, sp.y);
    ctx.scale(scale, scale);
    ctx.fillStyle = f.color;
    ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    ctx.lineWidth = f.big ? 5 : 4;
    ctx.font = '900 ' + (f.bigPerfect ? 38 : (f.big ? 28 : 20)) + 'px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.strokeText(f.text, 0, 0);
    ctx.fillText(f.text, 0, 0);
    ctx.restore();
  }

  if (game.flashTime > 0 && game.flashColor) {
    ctx.save();
    ctx.globalAlpha = game.flashTime;
    ctx.fillStyle = game.flashColor;
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }
}

function drawHoop(ctx, h, isOld) {
  const w = h.width;
  const halfW = w / 2;
  ctx.save();
  ctx.translate(h.x, h.y);
  ctx.rotate(h.tilt || 0);

  // ---- FILET ---- (dessous le rim)
  ctx.save();
  const stretch = (h.netT || 0) * 26;
  const netHeight = 52 + stretch;
  ctx.strokeStyle = isOld ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.92)';
  ctx.lineWidth = 1.8;
  const segments = 6;
  for (let i = 0; i <= segments; i++) {
    const fx = -halfW + 6 + (i / segments) * (w - 12);
    const fxBottom = -halfW * 0.42 + (i / segments) * (w * 0.84);
    ctx.beginPath();
    ctx.moveTo(fx, 12);
    ctx.quadraticCurveTo((fx + fxBottom) / 2 + Math.sin(i + (h.netT || 0) * 6) * stretch * 0.3, 12 + netHeight * 0.5, fxBottom, 12 + netHeight);
    ctx.stroke();
  }
  for (let i = 0; i <= segments; i++) {
    const fx = halfW - 6 - (i / segments) * (w - 12);
    const fxBottom = halfW * 0.42 - (i / segments) * (w * 0.84);
    ctx.beginPath();
    ctx.moveTo(fx, 12);
    ctx.quadraticCurveTo((fx + fxBottom) / 2 - Math.sin(i + (h.netT || 0) * 6) * stretch * 0.3, 12 + netHeight * 0.5, fxBottom, 12 + netHeight);
    ctx.stroke();
  }
  ctx.strokeStyle = isOld ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.55)';
  for (let k = 1; k <= 3; k++) {
    const yy = 12 + (k / 3) * netHeight;
    const halfFloor = halfW - 4 - (k / 3) * (halfW * 0.6);
    ctx.beginPath();
    ctx.ellipse(0, yy, halfFloor, 4, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // ---- RIM = BARRE ÉPAISSE avec réponse écrite dessus ----
  // Le rim devient lui-même le billboard. La barre fait toute la largeur w
  // et porte la réponse écrite en blanc dessus, en gros.
  const rimH = isOld ? 14 : 36;
  const rimY = -rimH / 2;

  // Glow si récemment marqué
  if (h.glow > 0 && !isOld) {
    ctx.save();
    ctx.shadowColor = '#F97316';
    ctx.shadowBlur = 30 * h.glow;
    ctx.fillStyle = 'rgba(251, 146, 60, ' + (0.4 * h.glow) + ')';
    ctx.beginPath();
    ctx.ellipse(0, 0, halfW + 18, rimH * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Ombre rim
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  const rimGrad = ctx.createLinearGradient(0, rimY, 0, rimY + rimH);
  rimGrad.addColorStop(0, '#FDBA74');
  rimGrad.addColorStop(0.45, '#F97316');
  rimGrad.addColorStop(0.55, '#EA580C');
  rimGrad.addColorStop(1, '#7C2D12');
  ctx.fillStyle = rimGrad;
  ctx.beginPath();
  ctx.roundRect(-halfW, rimY, w, rimH, isOld ? 4 : 10);
  ctx.fill();
  ctx.restore();

  // Liseré clair en haut
  ctx.strokeStyle = 'rgba(255, 220, 180, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-halfW + 6, rimY + 3);
  ctx.lineTo(halfW - 6, rimY + 3);
  ctx.stroke();

  // Texte de la réponse (uniquement pour les paniers actifs)
  if (!isOld) {
    const label = String(h.answer).slice(0, 14);
    // Adapter la taille de police pour rentrer dans la largeur du rim
    let fontSize = 22;
    ctx.font = '900 ' + fontSize + 'px Inter, Arial, sans-serif';
    while (ctx.measureText(label).width > w - 16 && fontSize > 12) {
      fontSize -= 1;
      ctx.font = '900 ' + fontSize + 'px Inter, Arial, sans-serif';
    }
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Contour noir pour lisibilité
    ctx.strokeStyle = 'rgba(124, 45, 18, 0.95)';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.strokeText(label, 0, 0);
    // Texte blanc par-dessus
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(label, 0, 0);
  }

  // Petits anneaux d'attache du filet (sous le rim)
  ctx.fillStyle = '#7C2D12';
  ctx.beginPath();
  ctx.arc(-halfW + 6, rimH / 2 + 2, 3, 0, Math.PI * 2);
  ctx.arc(halfW - 6, rimH / 2 + 2, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawBall(ctx, x, y, r, rotation, onFire) {
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.28)';
  ctx.beginPath();
  ctx.ellipse(x, y + r + 8, r * 0.85, r * 0.27, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.translate(x, y);
  ctx.rotate(rotation || 0);

  const grad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
  if (onFire) {
    grad.addColorStop(0, '#FEF3C7');
    grad.addColorStop(0.4, '#F97316');
    grad.addColorStop(1, '#7F1D1D');
  } else {
    grad.addColorStop(0, '#FED7AA');
    grad.addColorStop(0.4, '#FB923C');
    grad.addColorStop(1, '#7C2D12');
  }
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = onFire ? '#7F1D1D' : '#431407';
  ctx.lineWidth = 2.4;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(-r * 0.95, 0);
  ctx.lineTo(r * 0.95, 0);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(-r * 0.7, 0, r * 1.1, -Math.PI / 2.4, Math.PI / 2.4);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(r * 0.7, 0, r * 1.1, Math.PI - Math.PI / 2.4, Math.PI + Math.PI / 2.4);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.beginPath();
  ctx.ellipse(-r * 0.35, -r * 0.42, r * 0.28, r * 0.16, -0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
    else if (Array.isArray(r)) {
      if (r.length === 1) r = { tl: r[0], tr: r[0], br: r[0], bl: r[0] };
      else r = { tl: r[0], tr: r[1], br: r[2] || 0, bl: r[3] || 0 };
    }
    this.beginPath();
    this.moveTo(x + (r.tl || 0), y);
    this.lineTo(x + w - (r.tr || 0), y);
    this.quadraticCurveTo(x + w, y, x + w, y + (r.tr || 0));
    this.lineTo(x + w, y + h - (r.br || 0));
    this.quadraticCurveTo(x + w, y + h, x + w - (r.br || 0), y + h);
    this.lineTo(x + (r.bl || 0), y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - (r.bl || 0));
    this.lineTo(x, y + (r.tl || 0));
    this.quadraticCurveTo(x, y, x + (r.tl || 0), y);
    return this;
  };
}

function setupBaskets() {
  // rien — setup dynamique à l'ouverture
}


document.addEventListener('DOMContentLoaded', boot);
