# Implementation Tasks: Page Règlement/Règlementation FEMAT

**Feature**: Page Règlement/Règlementation FEMAT  
**Branch**: `005-reglement-reglementation`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

## Task Breakdown

### Phase 1: Conversion et Structuration du Contenu

#### Task 1.1: Convertir status.txt en Markdown structuré
**File**: `content/rules/femat.md`  
**Description**: Convertir le contenu complet de `status.txt` (550 lignes) en fichier Markdown (`.md`) structuré avec frontmatter YAML, comme les autres fichiers du projet (`blog/*.md`, `events/*.md`)  
**Dependencies**: None  
**Status**: ✅ Completed

**Détails**:
- Créer le fichier `content/rules/femat.md` (format Markdown, pas YAML)
- Ajouter le frontmatter YAML au début du fichier (entre `---`) avec métadonnées :
  ```markdown
  ---
  title: Règlements FEMAT
  description: Statuts et règlements internes de la Fédération Malienne de Taekwondo
  category: femat
  order: 1
  dateApproved: 2023-12-20
  ---
  ```
- Convertir le PRÉAMBULE en section Markdown
- Structurer les 9 Titres avec leurs chapitres et articles (131 articles au total)
- Utiliser la hiérarchie Markdown appropriée :
  - `#` pour titre principal
  - `##` pour les Titres (I à IX)
  - `###` pour les Chapitres
  - `####` pour les Articles
- Préserver la numérotation des articles (Article 1er, Article 2, etc.)
- Formater les listes à puces et numérotées correctement
- Ajouter les ancres pour la navigation (IDs automatiques générés par Nuxt Content)
- Mentionner la date d'approbation (20 décembre 2023) dans le contenu
- **Format identique aux autres fichiers** : Markdown (`.md`) avec frontmatter YAML, comme `blog/*.md` et `events/*.md`

#### Task 1.2: Créer structure de base pour règlementations Taekwondo
**File**: `content/rules/taekwondo.md`  
**Description**: Créer le fichier Markdown (`.md`) avec structure de base pour les règlementations Taekwondo, format identique aux autres fichiers du projet  
**Dependencies**: None  
**Status**: ✅ Completed

**Détails**:
- Créer le fichier `content/rules/taekwondo.md` (format Markdown, pas YAML)
- Ajouter le frontmatter YAML au début du fichier (entre `---`) :
  ```markdown
  ---
  title: Règlementations Taekwondo
  description: Règles officielles du Taekwondo (World Taekwondo)
  category: taekwondo
  order: 2
  ---
  ```
- Ajouter les sections principales (structure de base) :
  - Règles de compétition WT
  - Système de grades (Ceintures)
  - Règles d'arbitrage
  - Code d'éthique
  - Règles techniques
- Ajouter des placeholders pour le contenu (à compléter progressivement)
- Préparer la structure pour ajouter du contenu officiel WT plus tard
- **Format identique aux autres fichiers** : Markdown (`.md`) avec frontmatter YAML

### Phase 2: Configuration Nuxt Content

#### Task 2.1: Vérifier configuration Nuxt Content existante
**File**: `nuxt.config.ts`, `content.config.ts`  
**Description**: Vérifier que Nuxt Content est bien configuré et ajouter la collection `rules` si nécessaire  
**Dependencies**: Task 1.1, Task 1.2  
**Status**: ✅ Completed

**Détails**:
- Vérifier que `@nuxt/content` est dans les modules de `nuxt.config.ts`
- Vérifier la configuration existante dans `content.config.ts`
- Ajouter la collection `rules` dans `content.config.ts` (dans l'objet `collections` de `defineContentConfig`) :
  ```typescript
  export default defineContentConfig({
    collections: {
      // ... collections existantes (blog, events)
      rules: defineCollection({
        type: 'page',
        source: 'rules/**/*.md',
      schema: z.object({
        title: z.string().min(1, { message: 'Le titre est obligatoire' }),
        description: z.string().optional(),
        category: z.enum(['femat', 'taekwondo', 'faq'], {
          errorMap: () => ({ message: 'La catégorie doit être: femat, taekwondo ou faq' })
        }),
        order: z.number().optional(),
        dateApproved: z.string().optional(),
        // Schéma pour FAQ (optionnel, seulement si category === 'faq')
        faq: z.array(z.object({
          question: z.string(),
          answer: z.string()
        })).optional(),
      }).catchall(z.any()) // Permettre les champs générés automatiquement par Nuxt Content
      })
    }
  })
  ```
- Vérifier que les fichiers Markdown sont bien détectés
- Tester la génération automatique de la table des matières (TOC)

#### Task 2.2: Vérifier les types TypeScript générés automatiquement
**File**: N/A  
**Description**: Nuxt Content génère automatiquement les types pour les collections. Vérifier que les types sont disponibles sans création manuelle  
**Dependencies**: Task 2.1  
**Status**: ✅ Completed

**Détails**:
- Nuxt Content génère automatiquement les types TypeScript pour les collections
- Les types sont disponibles via `queryContent()` sans fichier manuel
- **Note** : Pas besoin de créer `app/types/rules.ts` - les types sont générés automatiquement
- Si besoin de types personnalisés plus tard, on pourra créer le fichier, mais ce n'est pas nécessaire pour v1.0

### Phase 3: Création des Composants et de la Page

#### Task 3.1: Créer les composants séparés
**Files**: 
- `app/components/rules/RulesFemat.vue`
- `app/components/rules/RulesTaekwondo.vue`
- `app/components/rules/RulesFaq.vue`

**Description**: Créer trois composants séparés pour faciliter la maintenance et la réutilisabilité  
**Dependencies**: Phase 2  
**Status**: ✅ Completed

**Structure**:
```
app/components/
└── rules/
    ├── RulesFemat.vue      # Composant section FEMAT
    ├── RulesTaekwondo.vue   # Composant section Taekwondo
    └── RulesFaq.vue         # Composant section FAQ
```

**Détails**:
- **RulesFemat.vue** :
  - Récupérer le contenu avec `queryContent('/rules/femat').findOne()`
  - Layout en grille : table des matières (1/4) + contenu (3/4)
  - Utiliser `UContentToc` pour la navigation
  - Utiliser `ContentRenderer` pour afficher le Markdown
- **RulesTaekwondo.vue** :
  - Même structure que RulesFemat.vue
  - Récupérer le contenu avec `queryContent('/rules/taekwondo').findOne()`
- **RulesFaq.vue** :
  - Charger les deux fichiers séparément :
    - `queryContent('/rules/faq-femat').findOne()`
    - `queryContent('/rules/faq-taekwondo').findOne()`
  - Extraire les Q/R du frontmatter YAML (tableau `faq` de chaque fichier)
  - Utiliser `UAccordion` pour afficher les questions/réponses de chaque section
  - Afficher les deux sections séparément (FAQ FEMAT puis FAQ Taekwondo)
  - Structure : chaque question = item d'accordion avec label (question) et content (réponse)

#### Task 3.2: Créer la page principale
**File**: `app/pages/rules.vue`  
**Description**: Créer la page principale avec navigation par tabs et intégration des composants  
**Dependencies**: Task 3.1  
**Status**: ✅ Completed

**Note** : Contrairement à `blog/` et `events/` qui sont des collections dynamiques, `rules` utilise des fichiers uniques fixes, donc `pages/rules.vue` est plus approprié que `pages/rules/index.vue`.

**Détails**:
- Créer la page avec `UPageHero` pour le header
- Configurer les tabs avec `UTabs` (3 sections) :
  ```vue
  const tabs = [
    {
      label: 'Règlements FEMAT',
      icon: 'i-lucide-file-text',
      value: 'femat',
      slot: 'femat'
    },
    {
      label: 'Règlementations Taekwondo',
      icon: 'i-lucide-book-open',
      value: 'taekwondo',
      slot: 'taekwondo'
    },
    {
      label: 'FAQ',
      icon: 'i-lucide-help-circle',
      value: 'faq',
      slot: 'faq'
    }
  ]
  ```
- Importer et utiliser les composants :
  ```vue
  <template #femat>
    <RulesFemat />
  </template>
  <template #taekwondo>
    <RulesTaekwondo />
  </template>
  <template #faq>
    <RulesFaq />
  </template>
  ```
- Ajouter les meta tags SEO avec `useHead()`
- Gérer les états de chargement et d'erreur

#### Task 3.3: Styling et responsive design
**Files**: 
- `app/pages/rules.vue`
- `app/components/rules/*.vue`

**Description**: Ajuster le styling et s'assurer que le design est responsive  
**Dependencies**: Task 3.2  
**Status**: ✅ Completed

**Détails**:
- Vérifier l'espacement et la typographie du contenu dans chaque composant
- S'assurer que le contenu est lisible (taille de police, contraste)
- Adapter le layout pour mobile (table des matières masquée ou en drawer pour RulesFemat et RulesTaekwondo)
- Vérifier que les tabs sont scrollables sur mobile si nécessaire
- Tester sur différentes tailles d'écran (mobile, tablette, desktop)
- Ajuster les styles prose pour le contenu Markdown si nécessaire
- S'assurer que la table des matières est sticky sur desktop dans RulesFemat et RulesTaekwondo

### Phase 4: Navigation et Intégration

#### Task 4.1: Ajouter le lien dans le menu de navigation
**File**: `app/components/Header.vue`  
**Description**: Ajouter un lien "Règlements" dans le menu de navigation principal  
**Dependencies**: Phase 3  
**Status**: ✅ Completed

**Détails**:
- Ajouter le lien "Règlements" dans la navigation desktop
- Ajouter le lien dans le menu mobile (hamburger)
- Positionner après "Contact" ou selon la hiérarchie souhaitée
- Vérifier que le lien actif est mis en évidence avec `router-link-active`
- Utiliser l'icône appropriée (`i-lucide-file-text` ou similaire)

#### Task 4.2: Ajouter le lien dans le footer (optionnel)
**File**: `app/components/Footer.vue`  
**Description**: Ajouter le lien "Règlements" dans la navigation du footer si approprié  
**Dependencies**: Task 4.1  
**Status**: ✅ Completed

**Détails**:
- Évaluer si le lien doit être dans le footer
- Si oui, ajouter dans la section de navigation appropriée
- Vérifier la cohérence avec les autres liens

### Phase 5: Accessibilité et SEO

#### Task 5.1: Optimiser l'accessibilité
**File**: `app/pages/rules.vue`  
**Description**: Vérifier et améliorer l'accessibilité de la page  
**Dependencies**: Phase 3  
**Status**: ✅ Completed

**Détails**:
- Vérifier la navigation au clavier (Tab, Enter, Espace sur les tabs)
- S'assurer que les tabs ont les attributs ARIA appropriés (gérés par Nuxt UI)
- Vérifier que la table des matières est accessible au clavier
- Vérifier le contraste de couleurs (utiliser les couleurs Nuxt UI)
- Vérifier la structure sémantique HTML (h1, h2, h3, etc.)
- Tester avec un lecteur d'écran si possible
- Ajouter des labels ARIA si nécessaire

#### Task 5.2: Optimiser le SEO
**File**: `app/pages/rules.vue`  
**Description**: Ajouter les meta tags SEO appropriés pour la page  
**Dependencies**: Task 3.2  
**Status**: ✅ Completed

**Détails**:
- Utiliser `useSeoMeta()` pour les meta tags :
  ```vue
  useSeoMeta({
    title: 'Règlements et Règlementations - FEMAT',
    description: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
    ogTitle: 'Règlements et Règlementations - FEMAT',
    ogDescription: 'Consultez les statuts de la FEMAT et les règlementations officielles du Taekwondo',
    ogType: 'website',
  })
  ```
- Vérifier que l'URL est propre (`/rules`)
- Vérifier que la structure HTML est sémantique
- Vérifier que le sitemap inclut la page (génération automatique par Nuxt)

### Phase 6: Tests et Optimisations

#### Task 6.1: Tests fonctionnels
**File**: N/A  
**Description**: Tester toutes les fonctionnalités de la page  
**Dependencies**: Phase 4, Phase 5  
**Status**: ⏳ Pending

**Détails**:
- Tester la navigation entre les tabs (FEMAT / Taekwondo / FAQ)
- Tester la table des matières (navigation par ancres)
- Tester le responsive design (mobile, tablette, desktop)
- Tester la navigation au clavier
- Tester l'accessibilité (lecteur d'écran, contraste)
- Vérifier que le contenu s'affiche correctement
- Vérifier que les liens internes fonctionnent

#### Task 6.2: Optimisation des performances
**File**: `app/pages/rules.vue`  
**Description**: Optimiser les performances de la page  
**Dependencies**: Phase 3  
**Status**: ⏳ Pending

**Détails**:
- Vérifier le temps de chargement (doit être < 3 secondes)
- Vérifier que le code splitting fonctionne (Nuxt automatique)
- Vérifier que le contenu est pré-rendu en SSG
- Tester avec Lighthouse (score > 90)
- Optimiser les images si présentes
- Vérifier la taille du bundle

#### Task 6.3: Tests de validation finale
**File**: Tous les fichiers  
**Description**: Tests finaux et validation complète  
**Dependencies**: Task 6.1, Task 6.2  
**Status**: ⏳ Pending

**Détails**:
- Tester sur différents navigateurs (Chrome, Firefox, Safari, Edge)
- Tester sur différents appareils (mobile, tablette, desktop)
- Vérifier avec Lighthouse (score > 90)
- Vérifier l'accessibilité WCAG 2.1 niveau AA
- Vérifier que tous les liens fonctionnent
- Vérifier que le contenu est complet et correct
- Vérifier que la navigation est intuitive

## Checkpoints

### Checkpoint 1: Contenu Structuré
**After**: Phase 1  
**Validation**:
- [ ] Contenu de `status.txt` converti en Markdown structuré (`femat.md`)
- [ ] Structure de base créée pour `taekwondo.md`
- [ ] Fichiers FAQ créés (`faq-femat.md` et `faq-taekwondo.md`) avec structure frontmatter YAML
- [ ] Hiérarchie correcte (Titres, Chapitres, Articles)
- [ ] Frontmatter YAML correct avec métadonnées
- [ ] Date d'approbation mentionnée (20 décembre 2023)
- [ ] Tous les 131 articles présents et structurés

### Checkpoint 2: Configuration et Page de Base
**After**: Phase 2 & 3  
**Validation**:
- [ ] Collection `rules` configurée dans `content.config.ts`
- [ ] Page `/rules` créée et accessible (via `app/pages/rules.vue`)
- [ ] Navigation par tabs fonctionnelle (FEMAT / Taekwondo / FAQ)
- [ ] Contenu affiché avec `ContentRenderer`
- [ ] Meta tags SEO de base configurés
- [ ] États de chargement et d'erreur gérés

### Checkpoint 3: Fonctionnalités Complètes
**After**: Phase 3 & 4  
**Validation**:
- [ ] Table des matières fonctionnelle pour chaque section
- [ ] Navigation par ancres fonctionnelle
- [ ] Design responsive (mobile, tablette, desktop)
- [ ] Lien dans le menu de navigation ajouté
- [ ] Layout en grille avec table des matières sticky

### Checkpoint 4: Accessibilité et SEO
**After**: Phase 5  
**Validation**:
- [ ] Navigation au clavier fonctionnelle
- [ ] Attributs ARIA appropriés présents
- [ ] Contraste de couleurs suffisant (WCAG 2.1 AA)
- [ ] Structure sémantique HTML correcte
- [ ] Meta tags SEO complets et optimisés
- [ ] Sitemap inclut la page

### Checkpoint 5: Tests et Production
**After**: Phase 6  
**Validation**:
- [ ] Tous les tests fonctionnels passent
- [ ] Performance optimale (Lighthouse > 90)
- [ ] Accessibilité validée (WCAG 2.1 AA)
- [ ] Responsive design validé sur tous les appareils
- [ ] Contenu complet et correct
- [ ] Prêt pour production

## Notes d'implémentation

### Structure du Contenu

Le contenu des statuts est organisé comme suit :
- **PRÉAMBULE** : Principes fondamentaux
- **9 Titres** (I à IX) avec chapitres et articles
- **131 articles** au total
- **Date d'approbation** : 20 décembre 2023

### Conversion Markdown

Lors de la conversion de `status.txt` en Markdown :
- Préserver la numérotation exacte des articles
- Utiliser la hiérarchie Markdown appropriée
- Formater les listes correctement (puces et numérotées)
- Ajouter des sauts de ligne pour la lisibilité
- Préserver les références croisées entre articles (ex: "article 3 ci-dessus")

### Table des Matières

Nuxt Content génère automatiquement la table des matières (TOC) à partir des titres Markdown. La structure hiérarchique doit être correcte pour que la TOC soit précise.

### Responsive Design

- **Desktop** : Table des matières sticky à gauche, contenu à droite
- **Tablette** : Table des matières peut être masquée ou en overlay
- **Mobile** : Table des matières masquée par défaut, accessible via bouton

### Contenu Taekwondo

Le contenu pour les règlementations Taekwondo sera ajouté progressivement selon les sources officielles disponibles (World Taekwondo, AFTU). La structure de base est préparée pour faciliter l'ajout futur.

### Affichage des Règlements

Les règles sont affichées uniquement sur la page via le contenu Markdown. Pas de téléchargement PDF - tout le contenu est visible directement sur la page pour faciliter la consultation.

## Prochaines Étapes

1. **Phase 1** : Convertir `status.txt` en Markdown structuré + créer `taekwondo.md`, `faq-femat.md` et `faq-taekwondo.md` (priorité haute)
2. **Phase 2** : Configurer la collection Nuxt Content (ajouter 'faq' dans les catégories et schéma `faq`)
3. **Phase 3** : Créer les composants séparés (RulesFemat.vue, RulesTaekwondo.vue, RulesFaq.vue) et la page principale (`pages/rules.vue`)
4. **Phase 4** : Intégrer dans la navigation principale
5. **Phase 5** : Optimiser accessibilité et SEO
6. **Phase 6** : Tests et validation finale

## Fonctionnalités Futures

- Système de recherche dans le contenu des règlements
- Support multilingue (français, bambara)
- Comparaison de versions de règlements
- Annotations et commentaires sur les articles
- Export PDF généré dynamiquement depuis le Markdown

