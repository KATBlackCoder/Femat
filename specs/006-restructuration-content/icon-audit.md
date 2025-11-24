# Audit des Icônes - FEMAT

**Date**: 2025-01-27  
**Objectif**: Standardiser toutes les icônes sur Heroicons uniquement

## Résultats de l'Audit

### Collections Identifiées

#### Heroicons ✅ (Collection principale)
- **Statut**: Déjà installée (`@iconify-json/heroicons` v1.2.3)
- **Utilisation**: ~75 occurrences dans le projet
- **Fichiers concernés**: Tous les composants et pages

#### Simple Icons ❌ (À remplacer)
- **Statut**: Utilisée uniquement pour Facebook (3 occurrences)
- **Fichiers concernés**:
  - `app/pages/index.vue` (2 occurrences)
  - `app/components/Footer.vue` (1 occurrence)
  - `app/pages/contact.vue` (2 occurrences)

### Détail des Icônes par Collection

#### Heroicons (75+ occurrences)
Icônes les plus utilisées :
- `i-heroicons-arrow-path` - Chargement/spinner
- `i-heroicons-calendar` - Calendrier/événements
- `i-heroicons-map-pin` - Localisation
- `i-heroicons-envelope` - Email
- `i-heroicons-phone` - Téléphone
- `i-heroicons-clock` - Temps/horloge
- `i-heroicons-user` - Utilisateur
- `i-heroicons-share` - Partage
- `i-heroicons-arrow-left` / `i-heroicons-arrow-right` - Navigation
- `i-heroicons-x-mark` - Fermer
- `i-heroicons-magnifying-glass` - Recherche
- Et bien d'autres...

#### Simple Icons (3 occurrences à remplacer)
- `i-simple-icons-facebook` - Facebook (3 occurrences)
  - `app/pages/index.vue` ligne 182 et 193
  - `app/components/Footer.vue` ligne 98
  - `app/pages/contact.vue` ligne 82 et 93

### Recommandations

1. **Remplacer `i-simple-icons-facebook`** par `i-heroicons-share` ou `i-heroicons-globe-alt`
   - `i-heroicons-share` : Plus approprié pour les réseaux sociaux
   - `i-heroicons-globe-alt` : Alternative si on veut représenter un lien web

2. **Vérifier qu'aucune autre collection n'est utilisée**
   - Aucune autre collection identifiée (pas de mdi, carbon, bx, fa, etc.)

3. **Standardisation**
   - Utiliser uniquement Heroicons pour toutes les icônes
   - Supprimer toute dépendance à Simple Icons si présente

## Plan d'Action

1. ✅ Audit complet effectué
2. ✅ Remplacer les 3 occurrences de `i-simple-icons-facebook` → `i-heroicons-share`
3. ✅ Vérifier la configuration Nuxt Icon (automatique via Nuxt UI)
4. ✅ Documenter la standardisation (`icon-standard.md` créé)
5. ✅ Valider que tout fonctionne (aucune erreur de linter, 0 référence à simple-icons restante)

## Résultat Final

- ✅ **Toutes les icônes utilisent Heroicons uniquement**
- ✅ **Aucune référence à Simple Icons restante** (0 occurrence trouvée)
- ✅ **78 occurrences d'icônes Heroicons** dans 17 fichiers
- ✅ **Standardisation complète** : Heroicons uniquement, aucune exception

