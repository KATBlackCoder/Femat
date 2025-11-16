# Guide de Test: Site Web FEMAT

**Feature**: 001-site-web-femat  
**Date**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

## Vue d'ensemble

Ce document fournit un guide complet pour tester toutes les fonctionnalités du site web FEMAT. Les tests sont organisés par catégorie et incluent des instructions détaillées pour chaque scénario.

## Prérequis pour les Tests

### Environnement de Développement

```bash
# 1. Installer les dépendances (si pas déjà fait)
pnpm install

# 2. Démarrer le serveur de développement
pnpm dev
```

Le site sera accessible sur `http://localhost:3000`

### Outils Recommandés

- **Navigateur**: Chrome, Firefox, Safari, ou Edge (dernières versions)
- **DevTools**: Chrome DevTools pour Lighthouse et responsive design
- **Outils d'accessibilité**: 
  - axe DevTools (extension Chrome)
  - WAVE (extension Chrome)
  - Lighthouse (intégré dans Chrome DevTools)

---

## Tests Fonctionnels

### Test 1: Navigation

**Objectif**: Vérifier que la navigation fonctionne correctement sur toutes les pages.

**Étapes**:
1. Ouvrir `http://localhost:3000`
2. Vérifier que le logo FEMAT s'affiche dans le header
3. Cliquer sur chaque lien du menu de navigation :
   - [ ] Accueil (`/`)
   - [ ] À propos (`/about`)
   - [ ] Événements (`/events`)
   - [ ] Calendrier (`/calendar`)
   - [ ] Contact (`/contact`)
4. Vérifier que chaque page se charge correctement
5. Vérifier que l'URL change correctement
6. Vérifier que le lien actif est mis en évidence dans le menu

**Navigation au clavier**:
1. Utiliser `Tab` pour naviguer entre les liens
2. Utiliser `Enter` pour activer un lien
3. Vérifier que le focus est visible sur chaque élément
4. Vérifier que `Escape` ferme le menu mobile (si ouvert)

**Résultat attendu**: 
- ✅ Tous les liens fonctionnent
- ✅ Navigation fluide entre les pages
- ✅ Navigation au clavier fonctionnelle
- ✅ Menu mobile se ferme avec Escape

---

### Test 2: Page d'accueil (`/`)

**Objectif**: Vérifier que la page d'accueil affiche correctement toutes les sections.

**Étapes**:
1. Ouvrir la page d'accueil
2. Vérifier la section Hero :
   - [ ] Logo FEMAT visible avec effet de blur
   - [ ] Titre "Bienvenue à la FEMAT" affiché
   - [ ] Description visible
   - [ ] Boutons "En savoir plus", "Nos événements", "Nous contacter" présents
3. Vérifier la section "À propos" :
   - [ ] Texte de présentation visible
   - [ ] Bouton "Découvrir notre histoire" fonctionne
4. Vérifier la section "Événements à venir" :
   - [ ] Au moins 3 événements affichés
   - [ ] Cartes EventCard visibles avec informations
   - [ ] Bouton "Voir tous les événements" fonctionne
5. Vérifier la section "Contact" :
   - [ ] Informations de contact affichées (adresse, email, téléphone)
   - [ ] Liens email et téléphone cliquables
   - [ ] Bouton "Envoyer un message" fonctionne
6. Vérifier les transitions entre sections (scroll)

**Résultat attendu**: 
- ✅ Toutes les sections s'affichent correctement
- ✅ Tous les boutons fonctionnent
- ✅ Transitions fluides

---

### Test 3: Page À propos (`/about`)

**Objectif**: Vérifier que la page À propos affiche correctement toutes les informations.

**Étapes**:
1. Naviguer vers `/about`
2. Vérifier la section Hero :
   - [ ] Titre "À propos de la FEMAT" affiché
   - [ ] Description visible
3. Vérifier la section "Histoire" :
   - [ ] Texte de l'histoire visible
   - [ ] Design avec UCard et gradients
4. Vérifier la section "Mission et Valeurs" :
   - [ ] Carte "Notre Mission" visible
   - [ ] Carte "Nos Valeurs" visible avec liste :
     - [ ] Respect
     - [ ] Discipline
     - [ ] Excellence
     - [ ] Cohésion
   - [ ] Icônes visibles pour chaque valeur
5. Vérifier la section "Le Taekwondo" :
   - [ ] Texte informatif visible
   - [ ] Design cohérent

**Résultat attendu**: 
- ✅ Toutes les sections s'affichent correctement
- ✅ Design cohérent avec Nuxt UI
- ✅ Contenu lisible et bien structuré

---

### Test 4: Page Événements (`/events`)

**Objectif**: Vérifier que la page Événements affiche correctement les listes d'événements.

**Étapes**:
1. Naviguer vers `/events`
2. Vérifier la section Hero :
   - [ ] Titre "Événements" affiché
   - [ ] Description visible
3. Vérifier la section "Événements à venir" :
   - [ ] Titre de section visible
   - [ ] Au moins 4 événements affichés
   - [ ] Chaque EventCard contient :
     - [ ] Titre de l'événement
     - [ ] Date formatée en français
     - [ ] Lieu
     - [ ] Description
     - [ ] Badge de type (Compétition, Entraînement, Cérémonie)
     - [ ] Badge de statut (À venir)
4. Vérifier la section "Événements passés" :
   - [ ] Titre de section visible
   - [ ] Au moins 3 événements passés affichés
   - [ ] Chaque EventCard contient :
     - [ ] Badge de statut (Passé)
     - [ ] Toutes les informations de l'événement
5. Vérifier le formatage des dates :
   - [ ] Dates au format français (ex: "15 mars 2025")
   - [ ] Dates passées correctement identifiées

**Résultat attendu**: 
- ✅ Tous les événements s'affichent correctement
- ✅ Badges de type et statut visibles
- ✅ Dates formatées en français
- ✅ Design responsive

---

### Test 5: Page Calendrier (`/calendar`)

**Objectif**: Vérifier que le calendrier interactif fonctionne correctement.

**Étapes**:
1. Naviguer vers `/calendar`
2. Vérifier la section Hero :
   - [ ] Titre "Calendrier des événements" affiché
   - [ ] Description visible
3. Vérifier le calendrier :
   - [ ] Mois et année affichés correctement
   - [ ] Boutons précédent/suivant fonctionnent
   - [ ] Jours de la semaine affichés (Lun, Mar, Mer, etc.)
   - [ ] Grille du calendrier visible
4. Vérifier les jours avec événements :
   - [ ] Jours avec événements sont colorés :
     - [ ] Rouge pour compétitions
     - [ ] Vert pour entraînements
     - [ ] Jaune pour cérémonies
   - [ ] Jours sans événements en gris/neutre
   - [ ] Jour actuel mis en évidence
5. Tester l'interaction :
   - [ ] Cliquer sur un jour avec événement
   - [ ] Vérifier que les événements du jour s'affichent en dessous
   - [ ] Cliquer à nouveau pour désélectionner
6. Vérifier la légende :
   - [ ] Légende visible en bas du calendrier
   - [ ] Couleurs correspondantes affichées
7. Tester la navigation entre mois :
   - [ ] Cliquer sur "Mois précédent"
   - [ ] Vérifier que le calendrier change
   - [ ] Cliquer sur "Mois suivant"
   - [ ] Vérifier que le calendrier revient

**Résultat attendu**: 
- ✅ Calendrier s'affiche correctement
- ✅ Navigation entre mois fonctionne
- ✅ Jours colorés selon type d'événement
- ✅ Affichage des événements du jour fonctionne
- ✅ Légende visible et claire

---

### Test 6: Page Contact (`/contact`)

**Objectif**: Vérifier que la page Contact et le formulaire fonctionnent correctement.

**Étapes**:
1. Naviguer vers `/contact`
2. Vérifier la section Hero :
   - [ ] Titre "Contactez-nous" affiché
   - [ ] Description visible
3. Vérifier les informations de contact :
   - [ ] Adresse "Bamako, Mali" affichée
   - [ ] Email `contact@femat.ml` avec lien mailto fonctionnel
   - [ ] Téléphone avec lien tel fonctionnel
   - [ ] Lien Facebook fonctionnel
4. Tester le formulaire de contact :

   **Champs du formulaire**:
   - [ ] Champ "Nom" (requis) avec icône
   - [ ] Champ "Prénom" avec icône
   - [ ] Champ "Email" (requis) avec icône et validation
   - [ ] Champ "Téléphone" avec icône
   - [ ] Champ "Sujet" (requis) avec sélecteur et icône
   - [ ] Champ "Message" (requis) avec textarea

   **Validation**:
   - [ ] Soumettre avec champs vides → erreurs affichées
   - [ ] Entrer email invalide → erreur "Email invalide"
   - [ ] Entrer message < 10 caractères → erreur "Minimum 10 caractères requis"
   - [ ] Entrer message > 1000 caractères → erreur "Ne peut pas dépasser 1000 caractères"
   - [ ] Sélectionner un sujet → pas d'erreur
   - [ ] Remplir tous les champs requis correctement → formulaire valide

   **Compteur de caractères**:
   - [ ] Compteur affiche "X/1000 caractères"
   - [ ] Barre de progression visible
   - [ ] Couleur change selon le nombre de caractères :
     - [ ] Vert pour < 900 caractères
     - [ ] Jaune pour 900-1000 caractères
     - [ ] Rouge pour > 1000 caractères

   **Soumission**:
   - [ ] Bouton "Envoyer le message" désactivé si formulaire invalide
   - [ ] Bouton activé si formulaire valide
   - [ ] Soumettre le formulaire valide
   - [ ] Vérifier console.log avec les données du formulaire
   - [ ] Message de succès affiché
   - [ ] Formulaire réinitialisé après succès

**Résultat attendu**: 
- ✅ Toutes les informations de contact affichées
- ✅ Formulaire valide correctement
- ✅ Messages d'erreur appropriés
- ✅ Compteur de caractères fonctionne
- ✅ Soumission fonctionne (console.log pour v1.0)

---

### Test 7: Header et Footer

**Objectif**: Vérifier que le header et le footer fonctionnent correctement sur toutes les pages.

**Header**:
1. Vérifier le logo :
   - [ ] Logo FEMAT visible (format AVIF)
   - [ ] Logo cliquable vers la page d'accueil
   - [ ] Alt text approprié
2. Vérifier la navigation desktop :
   - [ ] Tous les liens visibles (Accueil, À propos, Événements, Calendrier, Contact)
   - [ ] Lien actif mis en évidence
   - [ ] Hover effect fonctionne
3. Vérifier les actions :
   - [ ] Bouton de mode sombre/clair visible et fonctionne
   - [ ] Lien Facebook visible (desktop)
4. Vérifier le menu mobile :
   - [ ] Menu hamburger visible sur mobile
   - [ ] Cliquer ouvre le menu
   - [ ] Tous les liens visibles dans le menu mobile
   - [ ] Cliquer sur un lien ferme le menu
   - [ ] Bouton Facebook visible dans le menu mobile

**Footer**:
1. Vérifier la structure :
   - [ ] Logo FEMAT visible
   - [ ] Section Navigation avec tous les liens
   - [ ] Section Contact avec informations
   - [ ] Copyright avec année dynamique
2. Vérifier les liens :
   - [ ] Tous les liens de navigation fonctionnent
   - [ ] Lien email cliquable (mailto)
   - [ ] Lien téléphone cliquable (tel)
   - [ ] Lien Facebook fonctionne
3. Vérifier le copyright :
   - [ ] Année actuelle affichée dynamiquement

**Résultat attendu**: 
- ✅ Header fonctionne sur toutes les pages
- ✅ Footer fonctionne sur toutes les pages
- ✅ Navigation cohérente
- ✅ Mode sombre/clair fonctionne
- ✅ Menu mobile fonctionne

---

## Tests Responsive Design

### Test 8: Mobile (< 768px)

**Objectif**: Vérifier que le site fonctionne correctement sur mobile.

**Étapes**:
1. Ouvrir Chrome DevTools (F12)
2. Activer le mode responsive (Ctrl+Shift+M)
3. Sélectionner un appareil mobile (ex: iPhone 12, Pixel 5)
4. Tester chaque page :
   - [ ] Page d'accueil : contenu adapté, sections empilées
   - [ ] Page À propos : cartes empilées verticalement
   - [ ] Page Événements : grille en 1 colonne
   - [ ] Page Calendrier : calendrier lisible, légende adaptée
   - [ ] Page Contact : formulaire utilisable, colonnes empilées
5. Vérifier le menu mobile :
   - [ ] Menu hamburger visible
   - [ ] Menu s'ouvre correctement
   - [ ] Transitions fluides
   - [ ] Menu se ferme après clic sur lien
6. Vérifier les images :
   - [ ] Logo s'affiche correctement
   - [ ] Images optimisées pour mobile
7. Vérifier le formulaire :
   - [ ] Champs utilisables sur mobile
   - [ ] Clavier virtuel fonctionne correctement
   - [ ] Validation visible

**Résultat attendu**: 
- ✅ Site entièrement fonctionnel sur mobile
- ✅ Menu mobile fonctionne
- ✅ Contenu lisible et utilisable
- ✅ Formulaire utilisable

---

### Test 9: Tablette (768px - 1024px)

**Objectif**: Vérifier que le site fonctionne correctement sur tablette.

**Étapes**:
1. Ouvrir Chrome DevTools
2. Sélectionner une taille de tablette (ex: iPad, iPad Pro)
3. Tester chaque page :
   - [ ] Page d'accueil : layout adapté
   - [ ] Page Événements : grille en 2 colonnes
   - [ ] Page Calendrier : calendrier bien dimensionné
   - [ ] Page Contact : formulaire en 2 colonnes si possible
4. Vérifier la navigation :
   - [ ] Menu desktop visible
   - [ ] Tous les éléments accessibles

**Résultat attendu**: 
- ✅ Site fonctionne correctement sur tablette
- ✅ Layout adapté à la taille d'écran
- ✅ Navigation accessible

---

### Test 10: Desktop (> 1024px)

**Objectif**: Vérifier que le site fonctionne correctement sur desktop.

**Étapes**:
1. Ouvrir le site sur un écran desktop (1920x1080 ou similaire)
2. Tester chaque page :
   - [ ] Page d'accueil : sections bien espacées
   - [ ] Page Événements : grille en 3 colonnes
   - [ ] Page Calendrier : calendrier bien dimensionné
   - [ ] Page Contact : formulaire et informations côte à côte
3. Vérifier la navigation :
   - [ ] Menu horizontal visible
   - [ ] Tous les éléments accessibles
4. Vérifier l'espacement :
   - [ ] Contenu ne dépasse pas la largeur maximale
   - [ ] Espacement cohérent

**Résultat attendu**: 
- ✅ Site fonctionne correctement sur desktop
- ✅ Layout optimal pour grandes écrans
- ✅ Navigation horizontale fonctionne

---

## Tests d'Accessibilité

### Test 11: Navigation au Clavier

**Objectif**: Vérifier que le site est entièrement navigable au clavier.

**Étapes**:
1. Ouvrir le site sans utiliser la souris
2. Utiliser `Tab` pour naviguer :
   - [ ] Focus visible sur chaque élément interactif
   - [ ] Ordre de tabulation logique
   - [ ] Tous les liens accessibles
   - [ ] Tous les boutons accessibles
   - [ ] Tous les champs de formulaire accessibles
3. Utiliser `Enter` ou `Espace` pour activer :
   - [ ] Liens fonctionnent
   - [ ] Boutons fonctionnent
   - [ ] Menu mobile s'ouvre/ferme
4. Utiliser `Escape` :
   - [ ] Menu mobile se ferme
5. Utiliser les flèches dans les sélecteurs :
   - [ ] Sélecteur "Sujet" dans le formulaire navigable

**Résultat attendu**: 
- ✅ Site entièrement navigable au clavier
- ✅ Focus visible sur tous les éléments
- ✅ Ordre de tabulation logique
- ✅ Tous les éléments interactifs accessibles

---

### Test 12: ARIA et Sémantique HTML

**Objectif**: Vérifier que le site utilise correctement ARIA et les éléments sémantiques.

**Étapes**:
1. Ouvrir Chrome DevTools
2. Inspecter les éléments :
   - [ ] Attributs `aria-label` présents sur boutons icon-only
   - [ ] Attributs `aria-expanded` sur menu mobile
   - [ ] Attributs `aria-controls` sur bouton menu
   - [ ] Attributs `aria-hidden="true"` sur icônes décoratives
3. Vérifier les éléments sémantiques :
   - [ ] `<nav>` pour navigation
   - [ ] `<header>` pour header
   - [ ] `<footer>` pour footer
   - [ ] `<main>` pour contenu principal
   - [ ] `<address>` pour informations de contact
   - [ ] `<time>` pour dates d'événements
4. Vérifier les alt text :
   - [ ] Toutes les images ont un alt text approprié
   - [ ] Logo a un alt text descriptif

**Résultat attendu**: 
- ✅ Attributs ARIA appropriés présents
- ✅ Éléments sémantiques HTML utilisés
- ✅ Alt text sur toutes les images

---

### Test 13: Contraste de Couleurs

**Objectif**: Vérifier que le contraste de couleurs est suffisant pour l'accessibilité.

**Étapes**:
1. Utiliser l'outil WebAIM Contrast Checker ou axe DevTools
2. Vérifier le contraste sur chaque page :
   - [ ] Texte sur fond clair : ratio ≥ 4.5:1
   - [ ] Texte sur fond sombre : ratio ≥ 4.5:1
   - [ ] Liens : ratio ≥ 4.5:1
   - [ ] Boutons : ratio suffisant
3. Tester en mode sombre :
   - [ ] Contraste maintenu en mode sombre
   - [ ] Tous les textes lisibles

**Résultat attendu**: 
- ✅ Contraste suffisant partout (WCAG 2.1 AA)
- ✅ Mode sombre accessible

---

## Tests de Performance

### Test 14: Build de Production

**Objectif**: Vérifier que le build de production fonctionne correctement.

**Étapes**:
```bash
# 1. Générer le site statique
pnpm build

# 2. Prévisualiser le build
pnpm preview
```

1. Vérifier que le build réussit :
   - [ ] Pas d'erreurs dans la console
   - [ ] Build complété avec succès
2. Prévisualiser le build :
   - [ ] Site accessible sur l'URL de preview
   - [ ] Toutes les pages fonctionnent
   - [ ] Images chargent correctement
   - [ ] Styles appliqués correctement
3. Vérifier les fichiers générés :
   - [ ] Fichiers HTML générés
   - [ ] Assets optimisés
   - [ ] Images optimisées

**Résultat attendu**: 
- ✅ Build réussit sans erreur
- ✅ Site prévisualisé fonctionne
- ✅ Toutes les pages accessibles

---

### Test 15: Lighthouse

**Objectif**: Vérifier les scores Lighthouse pour performance, accessibilité, SEO.

**Étapes**:
1. Ouvrir Chrome DevTools (F12)
2. Aller dans l'onglet "Lighthouse"
3. Sélectionner :
   - [x] Performance
   - [x] Accessibilité
   - [x] Best Practices
   - [x] SEO
4. Sélectionner "Desktop" ou "Mobile"
5. Cliquer sur "Generate report"
6. Vérifier les scores :
   - [ ] Performance ≥ 90
   - [ ] Accessibilité ≥ 90
   - [ ] Best Practices ≥ 90
   - [ ] SEO ≥ 90
7. Examiner les recommandations :
   - [ ] Corriger les problèmes critiques
   - [ ] Noter les améliorations possibles

**Résultat attendu**: 
- ✅ Scores Lighthouse ≥ 90 dans toutes les catégories
- ✅ Peu ou pas de problèmes critiques

---

### Test 16: Images

**Objectif**: Vérifier que les images sont optimisées correctement.

**Étapes**:
1. Ouvrir Chrome DevTools > Network
2. Filtrer par "Img"
3. Recharger la page
4. Vérifier chaque image :
   - [ ] Format AVIF utilisé (ou WebP en fallback)
   - [ ] Taille de fichier raisonnable
   - [ ] Dimensions appropriées
   - [ ] Lazy loading pour images non critiques
   - [ ] Loading="eager" pour logo (image critique)
5. Vérifier dans le code :
   - [ ] `<NuxtImg>` utilisé au lieu de `<img>`
   - [ ] Attributs `width` et `height` spécifiés
   - [ ] Attribut `format="avif"` avec fallback
   - [ ] Alt text présent

**Résultat attendu**: 
- ✅ Images optimisées (AVIF/WebP)
- ✅ Taille de fichiers raisonnable
- ✅ Lazy loading configuré
- ✅ Alt text présent

---

## Tests de Couleurs Nuxt UI

### Test 17: Mode Clair/Sombre

**Objectif**: Vérifier que le changement de mode fonctionne correctement.

**Étapes**:
1. Ouvrir le site
2. Cliquer sur le bouton de changement de mode dans le header
3. Vérifier le mode sombre :
   - [ ] Couleurs s'adaptent correctement
   - [ ] Contraste maintenu
   - [ ] Tous les éléments visibles
   - [ ] Images toujours visibles
4. Cliquer à nouveau pour revenir en mode clair
5. Vérifier le mode clair :
   - [ ] Couleurs reviennent à la normale
   - [ ] Contraste maintenu
6. Recharger la page :
   - [ ] Préférence sauvegardée (si configuré)

**Résultat attendu**: 
- ✅ Changement de mode fonctionne
- ✅ Contraste maintenu dans les deux modes
- ✅ Tous les éléments visibles
- ✅ Préférence sauvegardée (si configuré)

---

### Test 18: Couleurs Sémantiques

**Objectif**: Vérifier que les couleurs Nuxt UI sont utilisées correctement.

**Étapes**:
1. Inspecter les éléments avec Chrome DevTools
2. Vérifier les classes CSS :
   - [ ] `text-neutral-*` au lieu de `text-gray-*`
   - [ ] `bg-neutral-*` au lieu de `bg-gray-*`
   - [ ] `border-neutral-*` au lieu de `border-gray-*`
   - [ ] Couleurs sémantiques utilisées : `primary`, `secondary`, `error`, `neutral`
3. Vérifier la configuration :
   - [ ] `app.config.ts` contient `ui.colors`
   - [ ] Couleurs configurées : primary=green, secondary=yellow, error=red, neutral=slate

**Résultat attendu**: 
- ✅ Couleurs Nuxt UI utilisées partout
- ✅ Pas de classes `gray` directes
- ✅ Configuration correcte dans `app.config.ts`

---

## Checklist Finale

### Fonctionnalités
- [ ] Toutes les pages fonctionnent
- [ ] Navigation complète fonctionne
- [ ] Formulaire de contact valide correctement
- [ ] Calendrier interactif fonctionne
- [ ] Mode sombre/clair fonctionne

### Performance
- [ ] Build de production réussi
- [ ] Lighthouse score ≥ 90
- [ ] Images optimisées (AVIF/WebP)

### Accessibilité
- [ ] Navigation au clavier fonctionnelle
- [ ] ARIA labels présents
- [ ] Contraste de couleurs suffisant
- [ ] Éléments sémantiques HTML utilisés

### Responsive
- [ ] Mobile fonctionnel
- [ ] Tablette fonctionnelle
- [ ] Desktop fonctionnel

### SEO
- [ ] Meta tags sur toutes les pages
- [ ] Alt text sur toutes les images
- [ ] Structure HTML sémantique

---

## Commandes de Test

```bash
# Développement
pnpm dev              # Serveur de développement (http://localhost:3000)

# Build et test
pnpm build            # Build pour production
pnpm preview          # Prévisualiser le build de production
pnpm generate         # Générer site statique (SSG)

# Maintenance
pnpm install          # Installer/mettre à jour les dépendances
```

---

## Outils de Test Recommandés

1. **Chrome DevTools** :
   - Lighthouse pour performance et accessibilité
   - Network pour vérifier les ressources
   - Elements pour inspecter le HTML/CSS

2. **Extensions Chrome** :
   - axe DevTools : Audit d'accessibilité
   - WAVE : Évaluation d'accessibilité web
   - Lighthouse : Intégré dans DevTools

3. **Outils en ligne** :
   - WebAIM Contrast Checker : Vérifier le contraste
   - PageSpeed Insights : Performance
   - W3C Validator : Valider le HTML

---

## Problèmes Courants et Solutions

### Problème: Le serveur ne démarre pas
- Vérifier que Node.js 18+ est installé
- Vérifier que les dépendances sont installées (`pnpm install`)
- Vérifier les ports disponibles (3000 par défaut)

### Problème: Les images ne s'affichent pas
- Vérifier que les images sont dans `/public/`
- Utiliser `<NuxtImg>` au lieu de `<img>`
- Vérifier le format (AVIF avec fallback WebP)

### Problème: Les couleurs ne s'appliquent pas
- Vérifier que `app.config.ts` existe
- Utiliser les couleurs sémantiques (neutral au lieu de gray)
- Vérifier la configuration Nuxt UI

### Problème: Le build échoue
- Vérifier les erreurs dans la console
- Vérifier que tous les imports sont corrects
- Vérifier la configuration dans `nuxt.config.ts`

---

## Notes

- Les tests doivent être effectués sur plusieurs navigateurs (Chrome, Firefox, Safari, Edge)
- Tester sur différents appareils si possible (mobile réel, tablette)
- Documenter tous les problèmes trouvés
- Prioriser les problèmes critiques (accessibilité, performance)

---

## Prochaines Étapes Après les Tests

1. Corriger tous les problèmes identifiés
2. Optimiser les performances si nécessaire
3. Améliorer l'accessibilité si nécessaire
4. Déployer sur Vercel (voir `specs/DEPLOYMENT.md`)

