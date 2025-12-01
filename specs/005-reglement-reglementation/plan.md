# Implementation Plan: Page Règlement/Règlementation FEMAT

**Branch**: `005-reglement-reglementation` | **Date**: 2025-01-27 | **Spec**: `specs/005-reglement-reglementation/spec.md`
**Input**: Feature specification from `/specs/005-reglement-reglementation/spec.md`

## Summary

Création d'une page dédiée aux règlements et règlementations de la FEMAT et du Taekwondo. La page présentera trois sections distinctes (FEMAT, Taekwondo, et FAQ) avec navigation par tabs, table des matières pour les sections FEMAT et Taekwondo, et contenu structuré basé sur les statuts de la fédération. Utilisation de Nuxt Content pour gérer le contenu Markdown et Nuxt UI pour les composants d'interface (Tabs, ContentToc, PageHero, PageSection, Accordion).

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Nuxt.js 4.2.1, Nuxt UI 4.1.0, @nuxt/content 3.8.2  
**Storage**: Fichiers Markdown dans `/content/rules/` (versionnés avec Git)  
**Testing**: Tests manuels pour v1.0  
**Target Platform**: Web (modern browsers)  
**Project Type**: Web (SSG)  
**Deployment**: cPanel (SSG)  
**Performance Goals**: Lighthouse score > 90, temps de chargement < 3s  
**Constraints**: Accessible (WCAG 2.1 AA), responsive, contenu réglementaire structuré  
**Scale/Scope**: Page publique pour consultation des règlements (~500-1000 consultations/mois estimés)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] User-First Design: Feature aligns with user needs - Page conçue pour faciliter l'accès aux règlements pour membres, entraîneurs, juges
- [x] Performance & SEO: Optimizations planned - SSG pour performance, meta tags, structure sémantique
- [x] Maintainability: Code structure defined - Contenu Markdown structuré, composants réutilisables
- [x] Accessibility: WCAG compliance planned - Navigation clavier, lecteurs d'écran, contraste couleurs
- [x] Mobile-First: Responsive design considered - Design responsive avec Nuxt UI

## Project Structure

### Documentation (this feature)

```text
specs/005-reglement-reglementation/
├── plan.md              # This file
├── spec.md              # Original specification
├── research.md          # Recherche sur composants Nuxt UI
└── tasks.md             # Breakdown des tâches (à générer)
```

### Application Structure

```text
app/
├── pages/
│   └── rules.vue                # Page principale des règlements (URL: /rules)
├── components/
│   └── rules/
│       ├── RulesFemat.vue       # Composant section FEMAT
│       ├── RulesTaekwondo.vue   # Composant section Taekwondo
│       └── RulesFaq.vue         # Composant section FAQ (charge les 2 fichiers)
├── content/
│   └── rules/
│       ├── femat.md             # Contenu règlements FEMAT
│       ├── taekwondo.md         # Contenu règlementations Taekwondo
│       ├── faq-femat.md         # FAQ FEMAT
│       └── faq-taekwondo.md     # FAQ Taekwondo
└── public/
    └── STATUTS FEMAT.pdf        # PDF original (déjà présent)
```

## Phases

### Phase 0: Research & Planning ✅

**Recherches effectuées**:
- Documentation Nuxt UI Tabs et ContentToc
- Structure des collections Nuxt Content
- Meilleures pratiques pour contenu réglementaire
- Accessibilité pour navigation par tabs

**Décisions techniques**:
1. ✅ **UTabs** pour séparer les deux sections principales (FEMAT / Taekwondo)
2. ✅ **UContentToc** pour la table des matières de chaque section
3. ✅ **Nuxt Content** pour gérer le contenu Markdown structuré
4. ✅ Collection `rules` avec quatre fichiers (`femat.md`, `taekwondo.md`, `faq-femat.md`, `faq-taekwondo.md`)
5. ✅ Route `/rules` pour la page (via `app/pages/rules.vue`)
6. ✅ Composants séparés pour chaque section (RulesFemat.vue, RulesTaekwondo.vue, RulesFaq.vue)

### Phase 1: Extraction et Structuration du Contenu

**Étape 1.1: Analyser le contenu des statuts**

Le document `STATUTS FEMAT.pdf` a été analysé et le contenu complet est disponible dans `status.txt` (550 lignes). La structure complète est identifiée :
- **PRÉAMBULE** : Principes fondamentaux
- **9 Titres** avec chapitres et articles (131 articles au total)
- Date d'approbation : 20 décembre 2023

La structure complète est maintenant connue et doit être convertie en Markdown.

**Étape 1.2: Créer la structure Markdown pour FEMAT**

Créer le fichier `/content/rules/femat.md` avec la structure suivante :

```markdown
---
title: Règlements FEMAT
description: Statuts et règlements internes de la Fédération Malienne de Taekwondo
category: femat
order: 1
---

# Règlements de la Fédération Malienne de Taekwondo

## Titre I : Objet et siège

[Contenu extrait du PDF]

## Titre II : Membres

[Contenu extrait du PDF]

...
```

**Étape 1.3: Créer la structure Markdown pour Taekwondo**

Créer le fichier `/content/rules/taekwondo.md` avec la structure de base (contenu à compléter progressivement).

**Étape 1.4: Créer la structure Markdown pour FAQ (deux fichiers séparés)**

Créer deux fichiers Markdown séparés pour une meilleure organisation et maintenance :

**Fichier `/content/rules/faq-femat.md`** :
```markdown
---
title: FAQ FEMAT
description: Questions fréquentes sur la Fédération Malienne de Taekwondo
category: faq
order: 3
faq:
  - question: "Comment adhérer à la FEMAT ?"
    answer: |
      Pour adhérer à la FEMAT, vous devez :
      1. Contacter votre ligue régionale ou district
      2. Remplir le formulaire d'adhésion
      3. Fournir les documents requis (certificat médical, photos, etc.)
      4. Payer les frais d'adhésion annuels
      
      Pour plus de détails, consultez l'article 10 des statuts.
  - question: "Quels sont les droits et obligations des membres ?"
    answer: |
      Les droits et obligations des membres sont définis dans les statuts :
      - **Droits** : Droit de vote, droit de participer aux compétitions, etc.
      - **Obligations** : Respecter les statuts, payer les cotisations, etc.
      
      Voir les articles 13 et 14 des statuts pour plus de détails.
  - question: "Comment organiser une compétition ?"
    answer: |
      Pour organiser une compétition, vous devez :
      1. Obtenir l'autorisation du Bureau Fédéral
      2. Respecter le calendrier fédéral
      3. Suivre les règles de compétition WT
      4. Fournir les installations et équipements requis
      
      Contactez le Bureau Fédéral pour plus d'informations.
  - question: "Comment obtenir un grade ou une certification ?"
    answer: |
      Les grades et certifications sont délivrés selon les règles de la FEMAT :
      - Passage de grade : Organisé par les ligues régionales
      - Certification d'arbitre : Formation organisée par la commission d'arbitrage
      - Certification d'entraîneur : Formation organisée par la commission technique
      
      Consultez votre ligue régionale pour les prochaines sessions.
---

# FAQ FEMAT

Questions fréquentes sur la Fédération Malienne de Taekwondo.
```

**Fichier `/content/rules/faq-taekwondo.md`** :
```markdown
---
title: FAQ Taekwondo
description: Questions fréquentes sur le Taekwondo
category: faq
order: 4
faq:
  - question: "Qu'est-ce que le Taekwondo ?"
    answer: |
      Le Taekwondo est un art martial coréen qui signifie "la voie du pied et du poing".
      Il combine des techniques de combat, de self-défense, de sport et de philosophie.
      Le Taekwondo est également un sport olympique depuis 2000.
  - question: "Comment fonctionne le système de ceintures ?"
    answer: |
      Le système de ceintures suit une progression :
      - **Ceintures de couleur** : Blanc, Jaune, Vert, Bleu, Rouge
      - **Ceinture noire** : Du 1er au 9ème dan
      - Chaque grade nécessite un passage d'examen avec démonstration technique
  - question: "Quelles sont les règles de compétition ?"
    answer: |
      Les règles de compétition suivent les standards de World Taekwondo (WT) :
      - Combats en 3 rounds de 2 minutes
      - Système de points pour les coups valides
      - Zones de frappe autorisées : tronc et tête
      - Protection obligatoire : casque, protège-dents, plastron, etc.
  - question: "Comment devenir arbitre ?"
    answer: |
      Pour devenir arbitre :
      1. Avoir au minimum une ceinture noire 1er dan
      2. Suivre la formation d'arbitrage organisée par la FEMAT
      3. Passer l'examen théorique et pratique
      4. Obtenir la certification d'arbitre
      
      Contactez la commission d'arbitrage pour les prochaines formations.
---

# FAQ Taekwondo

Questions fréquentes sur le Taekwondo.
```

**Avantages de cette approche** :
- ✅ Séparation claire des préoccupations (FEMAT vs Taekwondo)
- ✅ Plus facile à maintenir (un fichier par domaine)
- ✅ Structure identique pour les deux fichiers (facilite le parsing)
- ✅ Compatible avec `UAccordion` de Nuxt UI
- ✅ Facile à éditer (YAML dans le frontmatter)
- ✅ Cohérent avec Nuxt Content

**Note** : Le contenu Taekwondo sera ajouté progressivement selon les sources officielles disponibles (WT, AFTU).

### Phase 2: Configuration Nuxt Content

**Étape 2.1: Vérifier configuration Nuxt Content**

Vérifier que `@nuxt/content` est bien configuré dans `nuxt.config.ts` :

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    // ...
  ],
  content: {
    // Configuration existante
  }
})
```

**Étape 2.2: Créer le schéma TypeScript pour la collection**

Créer ou mettre à jour `content.config.ts` pour typer la collection `rules` :

```typescript
// Dans content.config.ts, ajouter dans l'objet collections :
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

### Phase 3: Création des Composants et de la Page

**Étape 3.1: Créer les composants séparés**

Créer le dossier `app/components/rules/` et les trois composants :

**Composant `RulesFemat.vue`** :
```vue
<script setup lang="ts">
const { data: content } = await useAsyncData('rules-femat', () => 
  queryContent('/rules/femat').findOne()
)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Table des matières -->
    <aside class="lg:col-span-1">
      <div class="sticky top-24">
        <UContentToc :links="content?.body?.toc?.links" />
      </div>
    </aside>
    
    <!-- Contenu principal -->
    <main class="lg:col-span-3">
      <ContentRenderer :value="content" />
    </main>
  </div>
</template>
```

**Composant `RulesTaekwondo.vue`** :
```vue
<script setup lang="ts">
const { data: content } = await useAsyncData('rules-taekwondo', () => 
  queryContent('/rules/taekwondo').findOne()
)
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
    <!-- Table des matières -->
    <aside class="lg:col-span-1">
      <div class="sticky top-24">
        <UContentToc :links="content?.body?.toc?.links" />
      </div>
    </aside>
    
    <!-- Contenu principal -->
    <main class="lg:col-span-3">
      <ContentRenderer :value="content" />
    </main>
  </div>
</template>
```

**Composant `RulesFaq.vue`** :
```vue
<script setup lang="ts">
// Charger les deux fichiers FAQ séparément
const { data: faqFemat } = await useAsyncData('rules-faq-femat', () => 
  queryContent('/rules/faq-femat').findOne()
)

const { data: faqTaekwondo } = await useAsyncData('rules-faq-taekwondo', () => 
  queryContent('/rules/faq-taekwondo').findOne()
)

// Extraire les questions/réponses du frontmatter YAML
const faqFematItems = computed(() => {
  if (!faqFemat.value?.faq || !Array.isArray(faqFemat.value.faq)) return []
  
  return faqFemat.value.faq.map((item: { question: string; answer: string }) => ({
    label: item.question,
    defaultOpen: false,
    content: item.answer
  }))
})

const faqTaekwondoItems = computed(() => {
  if (!faqTaekwondo.value?.faq || !Array.isArray(faqTaekwondo.value.faq)) return []
  
  return faqTaekwondo.value.faq.map((item: { question: string; answer: string }) => ({
    label: item.question,
    defaultOpen: false,
    content: item.answer
  }))
})
</script>

<template>
  <div class="space-y-8">
    <!-- Section FAQ FEMAT -->
    <div v-if="faqFemat">
      <h2 class="text-2xl font-bold mb-4">{{ faqFemat.title }}</h2>
      <p v-if="faqFemat.description" class="text-gray-600 mb-4">{{ faqFemat.description }}</p>
      <UAccordion :items="faqFematItems" class="w-full" />
    </div>

    <!-- Section FAQ Taekwondo -->
    <div v-if="faqTaekwondo" class="mt-8">
      <h2 class="text-2xl font-bold mb-4">{{ faqTaekwondo.title }}</h2>
      <p v-if="faqTaekwondo.description" class="text-gray-600 mb-4">{{ faqTaekwondo.description }}</p>
      <UAccordion :items="faqTaekwondoItems" class="w-full" />
    </div>
  </div>
</template>
```

**Étape 3.2: Créer la page principale `/pages/rules.vue`**

```vue
<script setup lang="ts">
// Configuration des tabs
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

// Meta tags
useHead({
  title: 'Règlements et Règlementations - FEMAT',
  meta: [
    { name: 'description', content: 'Consultez les statuts de la FEMAT, les règlementations officielles du Taekwondo et les questions fréquentes' }
  ]
})
</script>

<template>
  <div>
    <UPageHero
      title="Règlements et Règlementations"
      description="Consultez les statuts de la FEMAT, les règlementations officielles du Taekwondo et les questions fréquentes"
    />

    <UPageSection>
      <UTabs :items="tabs" class="w-full">
        <template #femat>
          <RulesFemat />
        </template>

        <template #taekwondo>
          <RulesTaekwondo />
        </template>

        <template #faq>
          <RulesFaq />
        </template>
      </UTabs>
    </UPageSection>
  </div>
</template>
```

### Phase 4: Navigation et Intégration

**Étape 4.1: Ajouter le lien dans le menu de navigation**

Ajouter un lien vers `/rules` dans le header ou footer :

```vue
<!-- Dans app/components/Header.vue ou similaire -->
<ULink to="/rules">Règlements</ULink>
```

**Étape 4.2: Tester la navigation**

- Vérifier que la page est accessible depuis le menu
- Tester la navigation entre les tabs
- Vérifier que les ancres fonctionnent (table des matières)

### Phase 5: Styling et Accessibilité

**Étape 5.1: Ajuster le styling**

- Vérifier l'espacement et la typographie
- S'assurer que le contenu est lisible
- Adapter le design pour mobile

**Étape 5.2: Tester l'accessibilité**

- Navigation au clavier (Tab, Enter, Espace)
- Support des lecteurs d'écran
- Contraste de couleurs
- Structure sémantique HTML

### Phase 6: Optimisation et Tests

**Étape 6.1: Optimisation performance**

- Vérifier le temps de chargement
- Optimiser les images (si présentes)
- Vérifier le code splitting

**Étape 6.2: Tests complets**

- Tests sur différents navigateurs
- Tests responsive (mobile, tablette, desktop)
- Tests d'accessibilité (Lighthouse, WAVE)
- Tests de navigation

## Implementation Details

### Structure du Contenu Markdown

**Format recommandé pour `/content/rules/femat.md`** (basé sur `status.txt`) :

```markdown
---
title: Règlements FEMAT
description: Statuts et règlements internes de la Fédération Malienne de Taekwondo
category: femat
order: 1
dateApproved: 2023-12-20
---

# Statuts de la Fédération Malienne de Taekwondo

**Approuvés le 20 décembre 2023**

## PRÉAMBULE

Prenant en compte les dimensions morales, spirituelles et physiques du Taekwondo ;

Conscients de la nécessité de réaliser le regroupement de tous les pratiquants de Taekwondo dans un organisme d'unité doté d'un pouvoir de diffusion et de sauvegarde de l'esprit du Taekwondo : la courtoisie, l'intégrité, la persévérance, le self contrôle, un esprit indomptable.

Déterminés à poursuivre la noble mission de formation et d'épanouissement de la jeunesse malienne par la pratique du Taekwondo.

## TITRE I : CONSTITUTION-DENOMMINATION-FORME-OBJET-EMBLEME-SIGLE-SIEGE-DUREE

### CHAPITRE I : CONSTITUTION-DENOMMINATION-FORME

#### Article 1er

Il est constitué, entre les associations sportives, déclarées légalement, œuvrant dans le domaine du Taekwondo ou pratiquant du Taekwondo en République du Mali et qui adhèrent aux présents Statuts, une Fédération nationale régie par la Loi n°04-038 du 05 août 2004 relative aux associations et la Loi n°2017-037 du 14 juillet 2017 régissant les activités physiques et sportives, dénommée Fédération malienne de Taekwondo, en abrégé « FEMAT »

#### Article 2

La Fédération malienne de Taekwondo est apolitique, laïque et sociale. Elle proscrit toutes formes de discrimination notamment politique, religieuse, sexuelle, ethnique ou raciale.

### CHAPITRE II : OBJET

#### Article 3

La Fédération malienne de Taekwondo a pour objet de favoriser l'accès de tous à la pratique du Taekwondo, sous toutes ses formes.

[... Structure complète avec tous les 9 Titres, leurs chapitres et 131 articles ...]

## TITRE IX : DISPOSITIONS DIVERSES

### CHAPITRE I : REGLEMENTS GENERAUX

#### Article 127

Les modalités de fonctionnement et d'organisation des organes de la Fédération sont fixées dans ses propres Règlements.

[...]

#### Article 131

L'actif net est attribué à une ou plusieurs associations analogues ou reconnues d'utilité publique, conformément à la réglementation en vigueur.

Fait et approuvé à Bamako, le 20 décembre 2023
```

**Structure complète identifiée** :
- PRÉAMBULE
- 9 Titres (I à IX)
- Chapitres sous chaque Titre (quand applicable)
- 131 Articles au total
- Date d'approbation : 20 décembre 2023

**Format recommandé pour `/content/rules/taekwondo.md`** :

```markdown
---
title: Règlementations Taekwondo
description: Règles officielles du Taekwondo (World Taekwondo)
category: taekwondo
order: 2
---

# Règlementations du Taekwondo

## Règles de compétition WT

### Généralités

[Contenu]

### Système de points

[Contenu]

## Système de grades

[Contenu]

...
```

### Composants Nuxt UI Utilisés

1. **UTabs** : Navigation entre sections FEMAT et Taekwondo
2. **UContentToc** : Table des matières pour chaque section
3. **UPageHero** : Header de la page avec titre et description
4. **UPageSection** : Conteneur pour le contenu principal
6. **ContentRenderer** : Rendu du contenu Markdown

### Configuration Nuxt Content

La configuration existante de Nuxt Content devrait fonctionner. Vérifier que :
- Les fichiers Markdown sont bien détectés
- Le frontmatter est parsé correctement
- La table des matières (TOC) est générée automatiquement

## Dependencies

- ✅ Site web de base (001-site-web-femat) - Complété
- ✅ Blog & Actualités (002-blog-actualites) - Complété (Nuxt Content déjà configuré)
- ✅ Module `@nuxt/content` - Déjà installé (v3.8.2)
- ✅ Module `@nuxt/ui` - Déjà installé (v4.1.0)
- ⏳ Document `STATUTS FEMAT.pdf` - Disponible (à extraire et structurer)

## Open Questions

- [x] ~~Comment extraire le contenu du PDF de manière efficace ?~~ → **Résolu** : Contenu disponible dans `status.txt` (550 lignes)
- [x] ~~Quelle est la structure exacte des statuts dans le PDF ?~~ → **Identifiée** : PRÉAMBULE + 9 Titres avec chapitres et 131 articles
- [x] ~~Faut-il créer des sous-pages pour chaque section ou tout sur une seule page avec navigation par ancres ?~~ → **Décidé** : Une seule page avec navigation par tabs et table des matières
- [ ] Quelle est la source officielle pour les règlementations Taekwondo ? (site WT, documents officiels) - À rechercher
- [ ] Faut-il ajouter des images ou diagrammes pour illustrer certaines règles ? (Optionnel pour v1.0)

## Next Steps

### Étapes Prioritaires
1. ✅ ~~Analyser et extraire le contenu du PDF `STATUTS FEMAT.pdf`~~ → **Fait** : Contenu disponible dans `status.txt`
2. ⏳ Convertir le contenu de `status.txt` en Markdown structuré pour `/content/rules/femat.md`
   - Structurer les 9 Titres avec leurs chapitres et articles (131 articles)
   - Formater correctement les listes, paragraphes et citations
   - Ajouter les ancres pour la navigation
3. ⏳ Créer la structure de base pour `/content/rules/taekwondo.md`
4. ⏳ Créer la page `/pages/rules.vue` avec navigation par tabs (3 sections : FEMAT, Taekwondo, FAQ)
5. ⏳ Intégrer UContentToc pour la table des matières
6. ⏳ Ajouter le lien dans le menu de navigation
7. ⏳ Tester la page complète (navigation, responsive, accessibilité)
8. ⏳ Optimiser et finaliser

### Étapes Secondaires
9. ⏳ Ajouter du contenu pour les règlementations Taekwondo (si source disponible)
10. ⏳ Améliorer le styling et la présentation
11. ⏳ Ajouter des métadonnées SEO supplémentaires
12. ⏳ Documenter la structure du contenu pour maintenance future

## Progression Actuelle

**Phase 0: Research & Planning** ✅ Complétée
- Documentation Nuxt UI consultée
- Architecture technique définie
- Structure du contenu planifiée

**Phase 1: Extraction et Structuration** ⏳ En attente
- PDF à analyser et extraire
- Fichiers Markdown à créer

**Phase 2: Configuration** ⏳ En attente
- Configuration Nuxt Content à vérifier
- Schéma TypeScript à créer

**Phase 3: Création de la Page** ⏳ En attente
- Page Vue à créer
- Composants Nuxt UI à intégrer

**Phase 4-6: Intégration et Tests** ⏳ En attente

