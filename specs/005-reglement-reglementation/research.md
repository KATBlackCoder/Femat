# Research: Page Règlement/Règlementation FEMAT

**Feature**: `005-reglement-reglementation`  
**Date**: 2025-01-27

## Research Objectives

1. Identifier les meilleurs composants Nuxt UI pour la navigation et l'affichage du contenu
2. Déterminer la meilleure structure pour organiser le contenu réglementaire
3. Évaluer les options de navigation entre les deux sections (FEMAT et Taekwondo)
4. Rechercher les meilleures pratiques pour l'affichage de contenu réglementaire structuré

## Composants Nuxt UI Évalués

### 1. UTabs - Navigation par Onglets

**Documentation**: https://ui.nuxt.com/docs/components/tabs

**Caractéristiques**:
- Support de plusieurs onglets avec contenu personnalisé
- Support des slots personnalisés pour chaque onglet
- Variantes : `pill`, `link`
- Orientation : `horizontal` (par défaut) ou `vertical`
- Support des icônes et badges
- Accessible (navigation clavier, ARIA)

**Avantages**:
- ✅ Navigation claire entre deux sections distinctes
- ✅ Design moderne et intuitif
- ✅ Support natif Nuxt UI
- ✅ Accessible par défaut
- ✅ Responsive

**Inconvénients**:
- Aucun identifié pour ce cas d'usage

**Recommandation**: ✅ **Utiliser UTabs** pour séparer les sections FEMAT et Taekwondo

**Exemple d'utilisation**:
```vue
<UTabs :items="tabs">
  <template #femat>
    <!-- Contenu section FEMAT -->
  </template>
  <template #taekwondo>
    <!-- Contenu section Taekwondo -->
  </template>
</UTabs>
```

### 2. UAccordion - Panneaux Repliables

**Documentation**: https://ui.nuxt.com/docs/components/accordion

**Caractéristiques**:
- Panneaux repliables empilés
- Support `single` ou `multiple` (un ou plusieurs panneaux ouverts)
- Support des icônes et contenu personnalisé
- Accessible

**Avantages**:
- ✅ Permet d'afficher plusieurs sections côte à côte
- ✅ Utile pour organiser les sous-sections
- ✅ Design compact

**Inconvénients**:
- ⚠️ Moins adapté pour séparer deux contenus distincts de grande taille
- ⚠️ Navigation moins fluide que les tabs pour ce cas d'usage

**Recommandation**: ⚠️ **Utiliser pour les sous-sections** à l'intérieur de chaque section principale, mais pas pour séparer FEMAT et Taekwondo

### 3. UContentToc - Table des Matières

**Documentation**: https://ui.nuxt.com/docs/components/content-toc

**Caractéristiques**:
- Génération automatique depuis le contenu Nuxt Content
- Sticky (reste visible lors du scroll)
- Highlighting automatique de la section active
- Navigation par ancres

**Avantages**:
- ✅ Génération automatique depuis le contenu
- ✅ Navigation rapide vers les sections
- ✅ Indicateur visuel de la position dans le document
- ✅ Sticky pour rester accessible

**Recommandation**: ✅ **Utiliser UContentToc** pour chaque section (FEMAT et Taekwondo)

**Exemple d'utilisation**:
```vue
<UContentToc :links="content?.body?.toc?.links" />
```

### 4. UPageHero - En-tête de Page

**Documentation**: https://ui.nuxt.com/docs/components/page-hero

**Caractéristiques**:
- En-tête responsive avec titre et description
- Support des actions (boutons, liens)
- Design cohérent avec le reste du site

**Recommandation**: ✅ **Utiliser UPageHero** pour le header de la page

### 5. UPageSection - Section de Page

**Documentation**: https://ui.nuxt.com/docs/components/page-section

**Caractéristiques**:
- Conteneur responsive pour le contenu
- Espacement et padding appropriés
- Design cohérent

**Recommandation**: ✅ **Utiliser UPageSection** pour structurer le contenu principal

## Structure du Contenu

### Option 1: Nuxt Content avec Markdown ✅ (Recommandée)

**Avantages**:
- ✅ Contenu versionné avec Git
- ✅ Facile à éditer (Markdown)
- ✅ Support de la table des matières automatique
- ✅ Type-safe avec TypeScript
- ✅ SSG compatible (performance)

**Structure**:
```
content/
└── rules/
    ├── femat.md
    └── taekwondo.md
```

**Format**:
```markdown
---
title: Règlements FEMAT
description: Statuts et règlements internes
category: femat
order: 1
---

# Titre principal

## Section 1

### Sous-section 1.1

[Contenu]
```

### Option 2: Composant Vue avec données en dur

**Avantages**:
- ✅ Contrôle total sur le rendu
- ✅ Pas de dépendance à Nuxt Content

**Inconvénients**:
- ❌ Moins maintenable
- ❌ Pas de table des matières automatique
- ❌ Moins flexible pour ajouter du contenu

**Recommandation**: ❌ **Non retenue**, préférer Nuxt Content

## Navigation et Layout

### Layout Recommandé

```
┌─────────────────────────────────────────┐
│         UPageHero                       │
│    "Règlements et Règlementations"      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│         UTabs                            │
│  [FEMAT] [Taekwondo]                    │
├──────────────┬──────────────────────────┤
│ UContentToc  │  ContentRenderer         │
│ (Sticky)     │  (Contenu Markdown)      │
│              │                          │
│ - Section 1  │  # Titre                  │
│ - Section 2  │  ## Sous-section          │
│ - Section 3  │  [Contenu...]            │
└──────────────┴──────────────────────────┘
```

### Responsive Design

**Desktop (lg+)**:
- Tabs horizontales en haut
- Table des matières à gauche (sticky)
- Contenu principal à droite (3/4 de la largeur)

**Tablet (md)**:
- Tabs horizontales en haut
- Table des matières peut être masquée ou en overlay
- Contenu principal en pleine largeur

**Mobile (sm)**:
- Tabs horizontales en haut (scrollable si nécessaire)
- Table des matières masquée ou en drawer
- Contenu principal en pleine largeur

## Accessibilité

### Points Clés

1. **Navigation clavier**:
   - UTabs supporte la navigation au clavier (Tab, Arrow keys)
   - UContentToc supporte la navigation par ancres

2. **Lecteurs d'écran**:
   - Composants Nuxt UI incluent les attributs ARIA appropriés
   - Structure sémantique HTML (h1, h2, h3, etc.)

3. **Contraste**:
   - Utiliser les couleurs du thème Nuxt UI (respectent WCAG)

4. **Focus visible**:
   - Les composants Nuxt UI incluent les styles de focus appropriés

## Performance

### Optimisations

1. **Code splitting**:
   - Nuxt Content charge le contenu de manière lazy
   - Composants chargés à la demande

2. **SSG**:
   - Contenu pré-rendu au build
   - Pas de requêtes serveur en production

3. **Images**:
   - Utiliser NuxtImg si des images sont ajoutées
   - Lazy loading automatique

## Conclusion

### Solution Recommandée

1. **Navigation**: UTabs pour séparer FEMAT et Taekwondo
2. **Table des matières**: UContentToc pour chaque section
3. **Contenu**: Nuxt Content avec fichiers Markdown
4. **Layout**: UPageHero + UPageSection + Grid responsive
5. **Structure**: Deux fichiers Markdown (`femat.md`, `taekwondo.md`)

### Prochaines Étapes

1. Extraire le contenu du PDF `STATUTS FEMAT.pdf`
2. Structurer le contenu en Markdown
3. Créer les fichiers dans `/content/rules/`
4. Implémenter la page avec les composants Nuxt UI identifiés
5. Tester l'accessibilité et la performance

