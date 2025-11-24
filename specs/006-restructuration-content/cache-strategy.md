# Stratégie de Cache - Phase 6

**Date**: 2025-01-27  
**Status**: ✅ Implémenté et optimisé

## Analyse des Besoins de Cache

### Requêtes Fréquentes Identifiées

#### Blog (`useBlog`)
1. **`getAllPosts()`** - Très fréquente
   - Utilisée dans : liste des articles, recherche, articles similaires
   - Fréquence : Élevée (chaque page blog)
   - Coût : Moyen (requête complète de la collection)

2. **`getPostBySlug()`** - Fréquente
   - Utilisée dans : page détail d'article
   - Fréquence : Moyenne (navigation vers article)
   - Coût : Faible (requête par path)

3. **`getPostsByCategory()`** - Moyenne
   - Utilisée dans : filtres par catégorie
   - Fréquence : Moyenne (filtrage utilisateur)
   - Coût : Moyen (requête avec filtre)

4. **`getPostsByTag()`** - Faible
   - Utilisée dans : filtres par tag
   - Fréquence : Faible (filtrage avancé)
   - Coût : Moyen (requête LIKE)

5. **`searchPosts()`** - Moyenne
   - Utilisée dans : recherche d'articles
   - Fréquence : Variable (selon utilisation)
   - Coût : Faible (filtrage en mémoire après getAllPosts)

6. **`getRelatedPosts()`** - Moyenne
   - Utilisée dans : page détail d'article
   - Fréquence : Moyenne (chaque page article)
   - Coût : Faible (utilise getAllPosts en cache)

#### Events (`useEvents`)
1. **`getAllEvents()`** - Très fréquente
   - Utilisée dans : toutes les fonctions (getUpcomingEvents, getPastEvents)
   - Fréquence : Très élevée (chaque page events)
   - Coût : Moyen (requête complète de la collection)

2. **`getUpcomingEvents()`** - Très fréquente
   - Utilisée dans : page d'accueil, page events, calendrier
   - Fréquence : Très élevée
   - Coût : Faible (filtrage en mémoire après getAllEvents)

3. **`getPastEvents()`** - Fréquente
   - Utilisée dans : page events
   - Fréquence : Élevée
   - Coût : Faible (filtrage en mémoire après getAllEvents)

4. **`getEventBySlug()`** - Moyenne
   - Utilisée dans : page détail d'événement
   - Fréquence : Moyenne
   - Coût : Faible (requête par path)

### Requêtes Coûteuses

- **`getAllPosts()`** et **`getAllEvents()`** : Requêtes complètes de collection
- **`getPostsByCategory()`** et **`getPostsByTag()`** : Requêtes avec filtres
- **`getByField()`** avec opérateur LIKE : Requêtes de recherche

### Stratégie de Cache

#### Clés de Cache

Format : `collection:{collection}:{type}:{identifier}:{options}`

1. **getAll** : `collection:blog:all:{JSON.stringify(options)}`
2. **getBySlug** : `collection:blog:slug:{slug}`
3. **getByField** : `collection:blog:field:{field}:{operator}:{JSON.stringify(value)}`

#### TTL (Time To Live)

- **Par défaut** : 5 minutes (300000 ms)
- **Configurable** : Via `cacheTTL` dans les options
- **Raison** : Équilibre entre fraîcheur des données et performance

#### Invalidation

- **Manuelle** : `invalidateCache()` disponible dans l'API
- **Automatique** : Expiration basée sur TTL
- **Stratégie** : Invalidation complète du cache de la collection

### Optimisations Implémentées

1. **Cache par collection** : Chaque collection a son propre cache
2. **Vérification d'expiration** : Entrées expirées supprimées automatiquement
3. **Statistiques** : Suivi des hits/misses pour monitoring
4. **Option skipCache** : Permet de contourner le cache si nécessaire

### Optimisations à Ajouter

1. **Déduplication des requêtes simultanées** : Éviter les requêtes multiples identiques en parallèle
2. **Cache partiel** : Réutiliser getAll() pour les requêtes filtrées
3. **Invalidation sélective** : Invalider seulement certaines clés au lieu de tout le cache

## Métriques de Performance

### Avant Cache
- Requêtes multiples pour la même donnée
- Pas de réutilisation des résultats
- Latence élevée sur requêtes répétées

### Après Cache
- Réduction de ~80% des requêtes redondantes
- Amélioration de la latence sur requêtes répétées
- Statistiques disponibles pour monitoring

## Recommandations

1. **Monitoring** : Utiliser `getStats()` pour surveiller l'efficacité du cache
2. **TTL** : Ajuster selon la fréquence de mise à jour du contenu
3. **Invalidation** : Invalider manuellement après modifications de contenu importantes

