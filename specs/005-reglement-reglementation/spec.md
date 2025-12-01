# Feature Specification: Page Règlement/Règlementation FEMAT

**Feature ID**: `005-reglement-reglementation`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P2 (Important - information réglementaire pour membres et visiteurs)

## Overview

Création d'une page dédiée aux règlements et règlementations de la Fédération Malienne de Taekwondo (FEMAT) et du Taekwondo en général. La page présentera trois sections distinctes : une pour les règlements spécifiques à la FEMAT (basés sur les statuts), une autre pour les règlementations générales du Taekwondo, et une section FAQ (Questions Fréquentes) pour la FEMAT et le Taekwondo.

## Context

La FEMAT a besoin d'une page accessible pour :
- Présenter les statuts et règlements internes de la fédération
- Informer sur les règlementations officielles du Taekwondo (WT, règles de compétition, etc.)
- Fournir des informations réglementaires aux membres, entraîneurs, et juges
- Faciliter l'accès aux documents officiels et aux règles de compétition
- Améliorer la transparence et la communication sur les règles

**Source de données** :
- `STATUTS FEMAT.pdf` - Document officiel contenant les statuts de la fédération
- `status.txt` - Contenu complet des statuts extrait et structuré (550 lignes)
- Règlementations WT (World Taekwondo) - À intégrer progressivement

## Functional Requirements

### FR-1: Structure de la Page avec Trois Sections
**Description**: Page avec trois sections principales séparées clairement : FEMAT, Taekwondo, et FAQ.

**Acceptance Criteria**:
- [ ] Page accessible via route `/rules` (fichier `pages/rules.vue`)
- [ ] Trois sections distinctes et clairement identifiées :
  - Section 1 : Règlements FEMAT (statuts, règlements internes)
  - Section 2 : Règlementations Taekwondo (règles WT, compétitions, etc.)
  - Section 3 : FAQ (Questions fréquentes pour FEMAT et Taekwondo)
- [ ] Navigation claire entre les trois sections (Tabs Nuxt UI)
- [ ] Composants séparés pour chaque section (RulesFemat.vue, RulesTaekwondo.vue, RulesFaq.vue)
- [ ] Design cohérent avec le reste du site
- [ ] Responsive sur tous les appareils

### FR-2: Section Règlements FEMAT
**Description**: Affichage des statuts et règlements de la FEMAT basés sur le document `STATUTS FEMAT.pdf`.

**Acceptance Criteria**:
- [ ] Contenu structuré et organisé des statuts FEMAT
- [ ] Sections principales des statuts affichées selon la structure officielle :
  - **PRÉAMBULE** : Principes fondamentaux et valeurs du Taekwondo
  - **TITRE I** : Constitution-Dénomination-Forme-Objet-Emblème-Sigle-Siège-Durée
    - Chapitre I : Constitution-Dénomination-Forme (Articles 1-2)
    - Chapitre II : Objet (Article 3)
    - Chapitre III : Emblème et Sigle (Articles 4-6)
    - Chapitre IV : Siège Social et Durée (Articles 7-8)
  - **TITRE II** : Composition-Affiliation
    - Chapitre I : Composition (Article 9)
    - Chapitre II : Affiliation (Articles 10-12)
  - **TITRE III** : Droits, Obligations et Perte de Qualité des Membres
    - Chapitre I : Droits des Membres (Article 13)
    - Chapitre II : Obligations des Membres (Article 14)
    - Chapitre III : Perte de Qualité de Membres (Article 15)
  - **TITRE IV** : Organes de la Fédération
    - Chapitre I : Assemblée Générale (Articles 17-40)
    - Chapitre II : Bureau Fédéral (Articles 41-54)
    - Chapitre III : Attributions des Principaux Responsables (Articles 55-69)
    - Chapitre IV : Organes Disciplinaires (Articles 70-78)
    - Chapitre V : Organes Centraux (Articles 79-98)
  - **TITRE V** : Ligue Professionnelle (Articles 99-102)
  - **TITRE VI** : Ligue Régionale et District (Articles 103-104)
  - **TITRE VII** : Incompatibilités (Articles 105-112)
  - **TITRE VIII** : Dispositions Financières et Comptables (Articles 113-126)
  - **TITRE IX** : Dispositions Diverses (Articles 127-131)
- [ ] Navigation interne avec table des matières (ContentToc Nuxt UI)
- [ ] Affichage hiérarchique des articles et paragraphes
- [ ] Design clair et lisible (typographie appropriée)
- [ ] Contenu complet visible directement sur la page (pas de téléchargement nécessaire)

### FR-3: Section Règlementations Taekwondo
**Description**: Affichage des règlementations générales du Taekwondo (World Taekwondo, règles de compétition, etc.).

**Acceptance Criteria**:
- [ ] Contenu organisé par catégories :
  - Règles de compétition WT
  - Système de grades (ceintures)
  - Règles d'arbitrage
  - Code d'éthique
  - (Autres catégories à définir)
- [ ] Navigation interne avec table des matières
- [ ] Liens vers ressources officielles WT (si disponibles)
- [ ] Design cohérent avec la section FEMAT
- [ ] Contenu extensible pour ajouter de nouvelles règlementations

### FR-4: Section FAQ (Questions Fréquentes)
**Description**: Affichage des questions fréquentes pour la FEMAT et le Taekwondo.

**Acceptance Criteria**:
- [ ] Deux fichiers Markdown séparés :
  - `faq-femat.md` : FAQ FEMAT (questions sur la fédération, adhésion, compétitions, etc.)
  - `faq-taekwondo.md` : FAQ Taekwondo (questions générales sur le sport, règles, grades, etc.)
- [ ] Utilisation d'UAccordion pour afficher les questions/réponses
- [ ] Affichage des deux sections FAQ dans le même tab (séparées visuellement)
- [ ] Design cohérent avec les autres sections
- [ ] Contenu extensible pour ajouter de nouvelles questions dans chaque fichier

### FR-5: Navigation et Table des Matières
**Description**: Navigation facilitée avec table des matières pour chaque section.

**Acceptance Criteria**:
- [ ] Table des matières (ContentToc) pour la section FEMAT
- [ ] Table des matières (ContentToc) pour la section Taekwondo
- [ ] Navigation par ancres (scroll vers sections)
- [ ] Indicateur visuel de la section active lors du scroll
- [ ] Navigation au clavier fonctionnelle
- [ ] Design sticky pour la table des matières (si approprié)

### FR-6: Affichage du Contenu
**Description**: Présentation claire et lisible du contenu réglementaire.

**Acceptance Criteria**:
- [ ] Typographie lisible et hiérarchique (titres, sous-titres, paragraphes)
- [ ] Espacement approprié pour la lisibilité
- [ ] Support des listes numérotées et à puces
- [ ] Mise en évidence des articles et paragraphes importants
- [ ] Support du contenu Markdown (si contenu géré via Nuxt Content)
- [ ] Design responsive (mobile, tablette, desktop)


## Non-Functional Requirements

### NFR-1: Performance
- Temps de chargement de la page < 3 secondes
- Lazy loading du contenu si volumineux
- Optimisation des images (si présentes)
- Code splitting pour les composants

### NFR-2: Accessibility
- Conformité WCAG 2.1 niveau AA
- Navigation au clavier fonctionnelle
- Support des lecteurs d'écran
- Contraste de couleurs suffisant
- Structure sémantique HTML appropriée

### NFR-3: SEO
- Meta tags appropriés pour la page
- URLs propres et descriptives (`/rules`)
- Structure sémantique HTML
- Sitemap incluant la page

### NFR-4: Responsive Design
- Fonctionne parfaitement sur mobile, tablette, et desktop
- Approche mobile-first
- Navigation adaptative selon la taille d'écran
- Table des matières adaptative (peut être masquée sur mobile)

## User Stories

### US-1: Membre cherche les statuts de la FEMAT
**As a** membre de la fédération  
**I want** consulter les statuts et règlements de la FEMAT  
**So that** je puisse comprendre les règles et procédures de la fédération

### US-2: Entraîneur cherche les règles de compétition
**As a** entraîneur  
**I want** consulter les règlementations du Taekwondo  
**So that** je puisse préparer mes athlètes selon les règles officielles

### US-3: Visiteur veut comprendre les règles
**As a** visiteur intéressé par le Taekwondo  
**I want** découvrir les règlementations générales du Taekwondo  
**So that** je puisse mieux comprendre ce sport

### US-4: Juge cherche les règles d'arbitrage
**As a** juge de compétition  
**I want** accéder rapidement aux règles d'arbitrage  
**So that** je puisse appliquer correctement les règles lors des compétitions

## Technical Considerations

### Solution Choisie: Nuxt Content + Nuxt UI ✅

**Décision**: Utilisation de **Nuxt Content** pour gérer le contenu des règlements (Markdown) et **Nuxt UI** pour les composants d'interface.

**Justification**:
- ✅ Intégration native avec Nuxt.js (déjà utilisé dans le projet)
- ✅ SSG compatible (performance optimale)
- ✅ Support Markdown pour le contenu structuré
- ✅ Composants Nuxt UI pour la navigation (Tabs, Accordion, ContentToc)
- ✅ Type-safe avec TypeScript
- ✅ Facile à maintenir et mettre à jour

### Architecture Technique

**Modules Nuxt requis**:
- `@nuxt/content` - Déjà installé et configuré
- `@nuxt/ui` - Déjà installé et configuré

**Composants Nuxt UI à utiliser**:
- `UTabs` - Pour séparer les trois sections (FEMAT / Taekwondo / FAQ)
- `UContentToc` - Pour la table des matières des sections FEMAT et Taekwondo
- `UPageHero` - Pour le header de la page
- `UPageSection` - Pour structurer les sections
- `UAccordion` - Pour afficher les questions/réponses dans la section FAQ

**Structure des fichiers**:
```
content/
└── rules/
    ├── femat.md          # Règlements FEMAT (extrait des statuts)
    ├── taekwondo.md      # Règlementations Taekwondo
    ├── faq-femat.md      # FAQ FEMAT
    └── faq-taekwondo.md  # FAQ Taekwondo

app/
├── pages/
│   └── rules.vue         # Page principale (URL: /rules)
└── components/
    └── rules/
        ├── RulesFemat.vue      # Composant section FEMAT
        ├── RulesTaekwondo.vue  # Composant section Taekwondo
        └── RulesFaq.vue        # Composant section FAQ (charge les 2 fichiers)
```

**Format du contenu**:
- Markdown avec frontmatter YAML
- Support des composants Vue (MDC syntax)
- Collections typées avec TypeScript

### Alternatives Considérées

**Option 1: Tabs horizontales (UTabs)**
- ✅ Navigation claire entre FEMAT et Taekwondo
- ✅ Design moderne et intuitif
- ✅ Support natif Nuxt UI
- **Recommandation**: Utiliser cette option

**Option 2: Accordion (UAccordion)**
- ✅ Permet d'afficher les deux sections côte à côte
- ✅ Peut être utilisé pour sous-sections
- ⚠️ Moins adapté pour séparer deux contenus distincts
- **Recommandation**: Utiliser pour organiser les sous-sections à l'intérieur de chaque section principale

**Option 3: Deux pages séparées**
- ✅ Séparation claire
- ❌ Navigation moins fluide
- ❌ Duplication de code
- **Recommandation**: Non retenue, préférer une seule page avec navigation par tabs

## Design Guidelines

- **Couleurs**: Cohérentes avec le reste du site (vert, jaune, rouge du drapeau malien)
- **Typographie**: Hiérarchie claire (titres, sous-titres, paragraphes)
- **Espacement**: Généreux pour améliorer la lisibilité du contenu réglementaire
- **Navigation**: Visible et accessible (tabs en haut, table des matières sur le côté)
- **Style**: Professionnel et formel (approprié pour du contenu réglementaire)

## Out of Scope (v1.0)

- Téléchargement du PDF des statuts (les règles sont visibles uniquement sur la page)
- Système de recherche dans le contenu (peut être ajouté plus tard)
- Version multilingue (français uniquement pour v1.0)
- Édition du contenu via interface (utiliser Markdown pour v1.0)
- Système de commentaires ou annotations
- Historique des modifications des règlements
- Comparaison de versions de règlements

## Dependencies

- Site web de base (001-site-web-femat) - ✅ Complété
- Module `@nuxt/content` - ✅ Déjà installé
- Module `@nuxt/ui` - ✅ Déjà installé
- Document `STATUTS FEMAT.pdf` - ✅ Disponible
- Contenu des statuts extrait - ✅ Disponible dans `status.txt` (550 lignes, structure complète identifiée)

## Open Questions

- [x] ~~Le contenu doit-il être géré via Nuxt Content (Markdown) ou directement dans le composant Vue ?~~ → **Nuxt Content (Markdown)** pour faciliter la maintenance
- [x] ~~Faut-il créer une collection Nuxt Content spécifique pour les règlements ?~~ → **Oui**, collection `rules` avec schéma TypeScript
- [x] ~~Comment structurer le contenu extrait du PDF (sections, articles, paragraphes) ?~~ → **Structure identifiée** : PRÉAMBULE + 9 Titres avec chapitres et articles (131 articles au total)
- [ ] Faut-il ajouter des images ou diagrammes pour illustrer certaines règles ? (Optionnel pour v1.0)
- [ ] Quelle est la source officielle pour les règlementations Taekwondo (WT) ? (À rechercher)
- [x] ~~Faut-il créer des sous-pages pour chaque section ou tout sur une seule page ?~~ → **Une seule page** avec navigation par tabs et table des matières

## Success Criteria

### Critères de Succès - v1.0
- [ ] Page `/rules` accessible et fonctionnelle (via `pages/rules.vue`)
- [ ] Trois sections distinctes (FEMAT, Taekwondo, FAQ) avec navigation claire
- [ ] Composants séparés créés (RulesFemat.vue, RulesTaekwondo.vue, RulesFaq.vue)
- [ ] Contenu des statuts FEMAT structuré et lisible
- [ ] Table des matières fonctionnelle pour les sections FEMAT et Taekwondo
- [ ] Section FAQ avec accordion fonctionnel
- [ ] Design responsive et accessible
- [ ] Navigation au clavier fonctionnelle
- [ ] Score Lighthouse > 90
- [ ] Conformité WCAG 2.1 niveau AA

### Critères de Succès - Améliorations Futures
- [ ] Contenu Taekwondo complet et à jour
- [ ] Système de recherche dans le contenu
- [ ] Support multilingue (français, bambara)
- [ ] Mise à jour automatique des règlements (si source disponible)

## Notes

- Le document `STATUTS FEMAT.pdf` a été analysé et le contenu complet est disponible dans `status.txt`
- Structure complète identifiée : PRÉAMBULE + 9 Titres avec chapitres et articles (131 articles au total)
- Le contenu doit être converti en Markdown structuré pour Nuxt Content
- La page doit être facilement maintenable pour ajouter de nouveaux règlements
- Le design doit être formel et professionnel (contenu réglementaire)
- Date d'approbation des statuts : 20 décembre 2023 (à mentionner dans le contenu)

