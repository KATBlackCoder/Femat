# Standardisation des Icônes - FEMAT

**Date**: 2025-01-27  
**Collection choisie**: Heroicons uniquement  
**Statut**: ✅ Standardisé

## Règle Principale

**Heroicons uniquement, aucune exception.**

Toutes les icônes du projet FEMAT utilisent exclusivement la collection Heroicons. Aucune autre collection d'icônes (Simple Icons, Material Design Icons, etc.) n'est autorisée.

## Collection Utilisée

### Heroicons
- **Package**: `@iconify-json/heroicons` (v1.2.3)
- **Installation**: Déjà installé dans `devDependencies`
- **Documentation**: [Heroicons](https://heroicons.com/)
- **Format**: `i-heroicons-{icon-name}`

## Configuration

### Installation

La collection Heroicons est déjà installée :

```json
{
  "devDependencies": {
    "@iconify-json/heroicons": "^1.2.3"
  }
}
```

### Configuration Nuxt

Nuxt UI gère automatiquement les icônes via Nuxt Icon. Aucune configuration supplémentaire n'est nécessaire dans `nuxt.config.ts` ou `app.config.ts`. Les icônes sont chargées automatiquement depuis le package installé.

## Utilisation

### Format Standard

Toutes les icônes utilisent le préfixe `i-heroicons-` :

```vue
<UIcon name="i-heroicons-calendar" />
<UButton icon="i-heroicons-share" />
```

### Exemples d'Utilisation

#### Dans un composant UIcon
```vue
<template>
  <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
</template>
```

#### Dans un composant UButton
```vue
<template>
  <UButton icon="i-heroicons-arrow-right" />
</template>
```

#### Dans une propriété dynamique
```vue
<script setup lang="ts">
const iconName = 'i-heroicons-user'
</script>

<template>
  <UIcon :name="iconName" />
</template>
```

## Icônes les Plus Utilisées

Voici les icônes Heroicons les plus fréquemment utilisées dans le projet :

### Navigation
- `i-heroicons-arrow-left` - Retour
- `i-heroicons-arrow-right` - Suivant
- `i-heroicons-chevron-left` - Précédent
- `i-heroicons-chevron-right` - Suivant

### Actions
- `i-heroicons-share` - Partager (réseaux sociaux)
- `i-heroicons-x-mark` - Fermer
- `i-heroicons-magnifying-glass` - Rechercher
- `i-heroicons-paper-airplane` - Envoyer

### Interface
- `i-heroicons-bars-3` - Menu hamburger
- `i-heroicons-arrow-path` - Chargement/spinner
- `i-heroicons-check-circle` - Succès
- `i-heroicons-exclamation-triangle` - Avertissement/erreur

### Contenu
- `i-heroicons-calendar` - Calendrier/événements
- `i-heroicons-document-text` - Document/article
- `i-heroicons-user` - Utilisateur
- `i-heroicons-clock` - Temps/horloge

### Contact
- `i-heroicons-map-pin` - Localisation/adresse
- `i-heroicons-envelope` - Email
- `i-heroicons-phone` - Téléphone

### Autres
- `i-heroicons-heart` - Favoris/aimer
- `i-heroicons-star` - Étoile/notation
- `i-heroicons-flag` - Drapeau/pays
- `i-heroicons-globe-alt` - Site web/internet

## Alternatives pour Cas Spécifiques

### Réseaux Sociaux

Pour les réseaux sociaux, utilisez des icônes génériques Heroicons plutôt que des icônes spécifiques :

- **Facebook** : `i-heroicons-share` (au lieu de `i-simple-icons-facebook`)
- **Twitter/X** : `i-heroicons-share` ou `i-heroicons-chat-bubble-left-right`
- **LinkedIn** : `i-heroicons-briefcase` ou `i-heroicons-share`
- **Instagram** : `i-heroicons-photo` ou `i-heroicons-share`

### Autres Collections (Non Autorisées)

Si vous avez besoin d'une icône qui n'existe pas dans Heroicons :

1. **Cherchez une alternative Heroicons** qui représente le même concept
2. **Utilisez une icône générique** (ex: `i-heroicons-share` pour réseaux sociaux)
3. **Contactez l'équipe** si aucune alternative n'est trouvée

## Migration Effectuée

### Icônes Remplacées

- ✅ `i-simple-icons-facebook` → `i-heroicons-share` (3 occurrences)
  - `app/pages/index.vue`
  - `app/components/Footer.vue`
  - `app/pages/contact.vue`

### Vérifications

- ✅ Aucune autre collection d'icônes utilisée
- ✅ Toutes les icônes utilisent le format `i-heroicons-*`
- ✅ Configuration Nuxt Icon automatique (pas de config manuelle nécessaire)

## Avantages de la Standardisation

1. **Cohérence visuelle** : Toutes les icônes suivent le même style
2. **Performance** : Une seule collection à charger
3. **Maintenance** : Plus facile de maintenir et mettre à jour
4. **Bundle size** : Réduction de la taille du bundle (une seule collection)
5. **Simplicité** : Pas besoin de gérer plusieurs collections

## Ressources

- [Documentation Heroicons](https://heroicons.com/)
- [Documentation Nuxt UI - Icônes](https://ui.nuxt.com/docs/getting-started/integrations/icons)
- [Iconify Collections](https://icon-sets.iconify.design/)

## Règles à Respecter

1. ✅ **Toujours utiliser Heroicons** pour toutes les nouvelles icônes
2. ✅ **Format standard** : `i-heroicons-{icon-name}`
3. ✅ **Pas d'exception** : Aucune autre collection autorisée
4. ✅ **Documenter** : Si une nouvelle icône est ajoutée, mettre à jour cette documentation

## Checklist pour Nouveaux Développements

Avant d'ajouter une nouvelle icône :

- [ ] Vérifier que l'icône existe dans Heroicons
- [ ] Si non, chercher une alternative Heroicons appropriée
- [ ] Utiliser le format `i-heroicons-{icon-name}`
- [ ] Tester que l'icône s'affiche correctement
- [ ] Vérifier l'accessibilité (ajouter `aria-hidden="true"` si décoratif)

