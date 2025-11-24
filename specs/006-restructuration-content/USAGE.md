# Guide d'Utilisation des Composables de Content

Ce guide explique comment utiliser les composables refactorisés pour gérer le contenu (blog et événements) dans l'application FEMAT.

## Table des matières

1. [useContentCollection](#usecontentcollection) - Composable générique
2. [useBlog](#useblog) - Gestion des articles de blog
3. [useEvents](#useevents) - Gestion des événements
4. [Créer du contenu](#créer-du-contenu) - Guide pour ajouter des articles et événements
5. [Gestion d'erreurs](#gestion-derreurs)
6. [Optimisation et cache](#optimisation-et-cache)
7. [Exemples pratiques](#exemples-pratiques)

---

## useContentCollection

Composable générique pour gérer n'importe quelle collection Nuxt Content. Utilisé en interne par `useBlog` et `useEvents`.

### Utilisation de base

```typescript
import { useContentCollection } from '~/composables/useContentCollection'
import type { BlogPost } from '~/types/blog'

// Créer une instance de collection
const blogCollection = useContentCollection<BlogPost>('blog', {
  pathPrefix: '/blog',
  normalizePath: true,
  enableCache: true,
  cacheTTL: 300000 // 5 minutes
})

// Récupérer tous les éléments
const allPosts = await blogCollection.getAll({
  published: true,
  sortField: 'date',
  sortDirection: 'DESC'
})

// Récupérer un élément par slug
const post = await blogCollection.getBySlug('bienvenue-femat', {
  enableFallback: true
})

// Filtrer par champ
const competitionPosts = await blogCollection.getByField('category', 'competition', {
  sortField: 'date',
  sortDirection: 'DESC'
})
```

### Options de configuration

```typescript
interface ContentCollectionOptions {
  pathPrefix?: string        // Préfixe de chemin (défaut: `/${collection}`)
  defaultSortField?: string  // Champ de tri par défaut (défaut: 'date')
  defaultSortDirection?: 'ASC' | 'DESC'  // Direction de tri (défaut: 'DESC')
  normalizePath?: boolean    // Normaliser path → _path (défaut: false)
  enableCache?: boolean       // Activer le cache (défaut: true)
  cacheTTL?: number          // Durée de vie du cache en ms (défaut: 300000)
  onError?: (error: Error, context: string) => void  // Gestion d'erreurs personnalisée
}
```

### Méthodes disponibles

#### `getAll(options?)`

Récupère tous les éléments de la collection avec filtres et tri optionnels.

```typescript
const posts = await blogCollection.getAll({
  published: true,              // Filtrer uniquement les publiés
  sortField: 'date',            // Champ de tri
  sortDirection: 'DESC',        // Direction de tri
  filters: [                    // Filtres additionnels
    { field: 'category', operator: '=', value: 'competition' }
  ],
  skipCache: false              // Ignorer le cache
})
```

#### `getBySlug(slug, options?)`

Récupère un élément par son slug.

```typescript
const post = await blogCollection.getBySlug('bienvenue-femat', {
  enableFallback: true  // Essayer plusieurs variantes du slug
})
```

#### `getByField(field, value, options?)`

Filtre les éléments par champ.

```typescript
// Recherche exacte
const posts = await blogCollection.getByField('category', 'competition')

// Recherche avec LIKE
const posts = await blogCollection.getByField('tags', '%taekwondo%', {
  operator: 'LIKE'
})
```

#### `invalidateCache()`

Invalide le cache de la collection.

```typescript
blogCollection.invalidateCache()
```

#### `getStats()`

Récupère les statistiques de la collection.

```typescript
const stats = await blogCollection.getStats()
console.log(stats)
// {
//   total: 25,
//   published: 23,
//   unpublished: 2,
//   cacheSize: 5,
//   cacheHits: 42,
//   cacheMisses: 8
// }
```

---

## useBlog

Composable pour gérer les articles de blog de la FEMAT.

### Utilisation de base

```typescript
import { useBlog } from '~/composables/useBlog'

const {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
  getRelatedPosts,
  getAllTags,
  getPostsCountByCategory
} = useBlog()
```

### Exemples d'utilisation

#### Récupérer tous les articles

```typescript
const { getAllPosts } = useBlog()

// Dans un composant Vue
const posts = ref<BlogPost[]>([])
onMounted(async () => {
  posts.value = await getAllPosts()
})
```

#### Récupérer un article par slug

```typescript
const { getPostBySlug } = useBlog()

const post = await getPostBySlug('bienvenue-femat')
if (post) {
  console.log(post.title)
  console.log(post.description)
}
```

#### Filtrer par catégorie

```typescript
const { getPostsByCategory } = useBlog()

const competitionPosts = await getPostsByCategory('competition')
```

#### Filtrer par tag

```typescript
const { getPostsByTag } = useBlog()

const taekwondoPosts = await getPostsByTag('taekwondo')
```

#### Rechercher des articles

```typescript
const { searchPosts } = useBlog()

const results = await searchPosts('championnat')
// Recherche dans titre, description et tags
```

#### Récupérer des articles similaires

```typescript
const { getRelatedPosts } = useBlog()

const related = await getRelatedPosts(currentPost, 5)
// Retourne jusqu'à 5 articles similaires basés sur catégorie et tags
```

#### Obtenir tous les tags

```typescript
const { getAllTags } = useBlog()

const tags = await getAllTags()
// Retourne un tableau de tous les tags uniques utilisés
```

#### Compter les articles par catégorie

```typescript
const { getPostsCountByCategory } = useBlog()

const counts = await getPostsCountByCategory()
console.log(counts)
// {
//   competition: 10,
//   actualite: 8,
//   resultat: 5,
//   evenement: 2
// }
```

### Exemple complet dans un composant Vue

```vue
<template>
  <div>
    <div v-if="isLoading">Chargement...</div>
    <div v-else>
      <div v-for="post in posts" :key="post._path">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'

const { getAllPosts } = useBlog()
const posts = ref<BlogPost[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    posts.value = await getAllPosts()
  } finally {
    isLoading.value = false
  }
})
</script>
```

---

## useEvents

Composable pour gérer les événements de la FEMAT.

### Utilisation de base

```typescript
import { useEvents } from '~/composables/useEvents'

const {
  getAllEvents,
  getUpcomingEvents,
  getOngoingEvents,
  getPastEvents,
  getEventBySlug,
  isEventPast,
  isEventOngoing,
  upcomingEvents,    // ref réactif (chargé automatiquement)
  ongoingEvents,    // ref réactif (chargé automatiquement)
  pastEvents,       // ref réactif (chargé automatiquement)
  allEvents         // computed (tous les événements)
} = useEvents()
```

### Exemples d'utilisation

#### Utiliser les refs réactifs (recommandé)

Les refs `upcomingEvents`, `ongoingEvents`, `pastEvents` et le computed `allEvents` sont automatiquement chargés au montage du composable.

```vue
<template>
  <div>
    <h2>Événements à venir</h2>
    <div v-for="event in upcomingEvents" :key="event._path">
      {{ event.title }}
    </div>
    
    <h2>Événements en cours</h2>
    <div v-for="event in ongoingEvents" :key="event._path">
      {{ event.title }}
    </div>
    
    <h2>Événements passés</h2>
    <div v-for="event in pastEvents" :key="event._path">
      {{ event.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { upcomingEvents, ongoingEvents, pastEvents } = useEvents()
</script>
```

#### Récupérer tous les événements

```typescript
const { getAllEvents } = useEvents()

const events = await getAllEvents()
```

#### Récupérer les événements à venir

```typescript
const { getUpcomingEvents } = useEvents()

const upcoming = await getUpcomingEvents()
// Triés par date croissante (prochains en premier)
```

#### Récupérer les événements en cours

```typescript
const { getOngoingEvents } = useEvents()

const ongoing = await getOngoingEvents()
// Triés par date croissante
```

#### Récupérer les événements passés

```typescript
const { getPastEvents } = useEvents()

const past = await getPastEvents()
// Triés par date décroissante (plus récents en premier)
```

#### Récupérer un événement par slug

```typescript
const { getEventBySlug } = useEvents()

const event = await getEventBySlug('championnat-2025')
if (event) {
  console.log(event.title)
}
```

#### Vérifier le statut d'un événement

```typescript
const { isEventPast, isEventOngoing } = useEvents()

if (isEventPast(event)) {
  console.log('Cet événement est terminé')
}

if (isEventOngoing(event)) {
  console.log('Cet événement est actuellement en cours')
}
```

### Exemple complet dans un composant Vue

```vue
<template>
  <div>
    <div v-if="isLoading">Chargement...</div>
    <div v-else>
      <section>
        <h2>Événements à venir</h2>
        <EventCard
          v-for="event in upcomingEvents"
          :key="event._path"
          :event="event"
        />
      </section>
      
      <section>
        <h2>Événements en cours</h2>
        <EventCard
          v-for="event in ongoingEvents"
          :key="event._path"
          :event="event"
        />
      </section>
      
      <section>
        <h2>Événements passés</h2>
        <EventCard
          v-for="event in pastEvents"
          :key="event._path"
          :event="event"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import EventCard from '~/components/events/EventCard.vue'

const { upcomingEvents, ongoingEvents, pastEvents } = useEvents()
const isLoading = ref(true)

onMounted(async () => {
  await nextTick()
  isLoading.value = false
})
</script>
```

---

## Créer du contenu

Cette section explique comment créer des articles de blog et des événements dans le dossier `content/`.

### Structure des dossiers

```
content/
├── blog/
│   ├── 2024/
│   │   └── mon-article-2024.md
│   └── 2025/
│       └── mon-article-2025.md
└── events/
    ├── 2024/
    │   └── 2024-12-10-championnat-regional.md
    └── 2025/
        └── 2025-11-24-stage-technique.md
```

Les fichiers doivent être organisés par année dans des sous-dossiers. Le nom du fichier devient le slug de l'article/événement.

---

### Créer un article de blog

#### Emplacement du fichier

Créez un fichier Markdown dans `content/blog/{année}/` avec un nom descriptif en minuscules et tirets.

**Exemple** : `content/blog/2025/championnat-national-2025.md`

#### Format du frontmatter

Chaque article doit commencer par un bloc frontmatter YAML entre `---` :

```yaml
---
title: "Titre de l'article"
description: "Description courte de l'article (utilisée pour le SEO et les aperçus)"
date: 2025-01-27
author: "Nom de l'auteur"
category: competition
tags:
  - taekwondo
  - championnat
  - competition
image: "/blog/images/championnat-2025.jpg"
published: true
---
```

#### Champs obligatoires

- **`title`** (string) : Titre de l'article (minimum 1 caractère)
- **`description`** (string) : Description courte (minimum 1 caractère)
- **`date`** (string) : Date au format `YYYY-MM-DD` (ex: `2025-01-27`)
- **`author`** (string) : Nom de l'auteur (minimum 1 caractère)
- **`category`** (enum) : Une des catégories suivantes :
  - `competition`
  - `actualite`
  - `resultat`
  - `evenement`

#### Champs optionnels

- **`tags`** (array de strings) : Liste de tags pour catégoriser l'article
- **`image`** (string) : URL ou chemin relatif vers l'image (ex: `/blog/images/image.jpg`)
- **`published`** (boolean) : Si `false`, l'article ne sera pas affiché publiquement (défaut: `true`)

#### Exemple complet

```markdown
---
title: "Championnat National 2025"
description: "Le championnat national de Taekwondo 2025 se tiendra à Bamako du 15 au 17 mars."
date: 2025-03-15
author: "FEMAT"
category: competition
tags:
  - taekwondo
  - championnat
  - competition
  - bamako
image: "/blog/images/championnat-2025.jpg"
published: true
---

# Championnat National 2025

Le championnat national de Taekwondo 2025 se tiendra à Bamako du 15 au 17 mars.

## Informations pratiques

- **Date** : 15, 16 et 17 mars 2025
- **Lieu** : Palais des Sports, Bamako
- **Catégories** : Toutes les catégories d'âge

## Programme

### Jour 1 - Qualifications
- Compétitions par catégories d'âge
- Sélection des finalistes

### Jour 2 - Demi-finales
- Compétitions de haut niveau
- Sélection des finalistes

### Jour 3 - Finales
- Finales de toutes les catégories
- Cérémonie de remise des médailles

## Inscriptions

Les inscriptions sont ouvertes jusqu'au 1er mars 2025.
```

#### Validation

Le schéma Zod dans `content.config.ts` valide automatiquement :
- Le format de la date (`YYYY-MM-DD`)
- La catégorie (doit être une des valeurs autorisées)
- La présence des champs obligatoires
- Le format de l'image (URL ou chemin commençant par `/`)

Si une erreur de validation se produit, Nuxt Content affichera un message d'erreur clair.

---

### Créer un événement

#### Emplacement du fichier

Créez un fichier Markdown dans `content/events/{année}/` avec un nom au format `YYYY-MM-DD-nom-evenement.md`.

**Exemple** : `content/events/2025/2025-12-20-stage-jeunes.md`

**Convention de nommage** : Utilisez le format `YYYY-MM-DD-slug.md` où :
- `YYYY-MM-DD` est la date de début de l'événement
- `slug` est un identifiant court en minuscules avec tirets

#### Format du frontmatter

```yaml
---
title: "Titre de l'événement"
date: 2025-12-20
endDate: 2025-12-22
startTime: "09:00"
endTime: "17:00"
location: "Bamako"
description: "Description courte de l'événement"
type: training
status: upcoming
image: "/events/images/stage-jeunes.jpg"
published: true
---
```

#### Champs obligatoires

- **`title`** (string) : Titre de l'événement (minimum 1 caractère)
- **`date`** (string) : Date de début au format `YYYY-MM-DD` (ex: `2025-12-20`)
- **`location`** (string) : Lieu de l'événement (minimum 1 caractère)
- **`description`** (string) : Description courte (minimum 1 caractère)
- **`type`** (enum) : Type d'événement :
  - `competition` : Compétition
  - `training` : Entraînement/Stage
  - `ceremony` : Cérémonie
  - `social` : Événement social
- **`status`** (enum) : Statut de l'événement :
  - `upcoming` : À venir
  - `ongoing` : En cours
  - `past` : Passé

**Note** : Le statut peut être calculé dynamiquement par `isEventPast()` et `isEventOngoing()`, mais il est recommandé de le définir dans le frontmatter pour la cohérence.

#### Champs optionnels

- **`endDate`** (string) : Date de fin au format `YYYY-MM-DD` (pour événements multi-jours)
- **`startTime`** (string) : Heure de début au format `HH:mm` en 24h (ex: `09:00`, `18:30`)
- **`endTime`** (string) : Heure de fin au format `HH:mm` en 24h (ex: `17:00`, `22:00`)
- **`image`** (string) : URL ou chemin relatif vers l'image (ex: `/events/images/event.jpg`)
- **`published`** (boolean) : Si `false`, l'événement ne sera pas affiché publiquement (défaut: `true`)

#### Exemple complet

```markdown
---
title: "Stage Jeunes Talents"
date: 2025-12-20
endDate: 2025-12-22
startTime: "09:00"
endTime: "16:00"
location: "Bamako"
description: "Stage spécialisé pour les jeunes talents prometteurs. Détection et développement des futurs champions."
type: training
status: upcoming
published: true
---

# Stage Jeunes Talents

Stage spécialisé pour les jeunes talents prometteurs. Détection et développement des futurs champions.

## Informations pratiques

- **Date** : 20, 21 et 22 décembre 2025
- **Heure** : 9h00 - 16h00
- **Lieu** : Bamako
- **Type** : Formation
- **Statut** : À venir

## Public cible

- Jeunes de 10 à 16 ans
- Niveau ceinture jaune minimum
- Sélection sur dossier

## Programme

### Jour 1 - Fondamentaux avancés
- Révision des techniques de base perfectionnées
- Travail sur la précision et la vitesse
- Exercices de coordination

### Jour 2 - Techniques de combat
- Poomsae avancés
- Techniques de self-défense
- Sparring contrôlé

### Jour 3 - Perfectionnement
- Analyse vidéo des performances
- Corrections individuelles
- Évaluation finale

## Inscriptions

Les inscriptions sont ouvertes jusqu'au 5 décembre 2025. Places limitées.
```

#### Calcul automatique du statut

Le statut peut être calculé automatiquement par les fonctions `isEventPast()` et `isEventOngoing()` dans `useEvents()`. Cependant, il est recommandé de définir le statut dans le frontmatter pour :

1. **Performance** : Évite de recalculer le statut à chaque chargement
2. **Cohérence** : Le statut dans le fichier correspond au statut affiché
3. **SEO** : Les métadonnées sont disponibles immédiatement

**Recommandation** : Mettez à jour le statut manuellement dans le frontmatter quand l'événement change de statut.

#### Validation

Le schéma Zod dans `content.config.ts` valide automatiquement :
- Le format de la date (`YYYY-MM-DD`)
- Le format de l'heure (`HH:mm` en 24h)
- Le type d'événement (doit être une des valeurs autorisées)
- Le statut (doit être une des valeurs autorisées)
- La présence des champs obligatoires
- Le format de l'image (URL ou chemin commençant par `/`)

---

### Bonnes pratiques

#### Nommage des fichiers

- **Blog** : Utilisez des noms descriptifs en minuscules avec tirets
  - ✅ `championnat-national-2025.md`
  - ❌ `Championnat National 2025.md`
  - ❌ `championnat_national_2025.md`

- **Événements** : Utilisez le format `YYYY-MM-DD-slug.md`
  - ✅ `2025-12-20-stage-jeunes.md`
  - ❌ `stage-jeunes-2025.md`
  - ❌ `2025/12/20-stage-jeunes.md`

#### Organisation par année

Organisez vos fichiers par année dans des sous-dossiers :
- `content/blog/2024/` pour les articles de 2024
- `content/blog/2025/` pour les articles de 2025
- `content/events/2024/` pour les événements de 2024
- `content/events/2025/` pour les événements de 2025

#### Images

Placez les images dans les dossiers appropriés organisés par année :

- **Blog** : `/public/content/blog/images/{année}/` (ex: `/public/content/blog/images/2025/`)
- **Événements** : `/public/content/events/images/{année}/` (ex: `/public/content/events/images/2025/`)
- **Partagées** : `/public/content/shared/{année}/` (ex: `/public/content/shared/2025/`) - Pour les images utilisées à la fois dans les articles et les événements

Référencez-les avec un chemin relatif dans le frontmatter :

```yaml
# Pour un article de blog
image: "/content/blog/images/2025/championnat-2025.jpg"

# Pour un événement
image: "/content/events/images/2025/stage-jeunes.jpg"

# Pour une image partagée (utilisable dans blog et events)
image: "/content/shared/2025/logo-femat.jpg"
```

Ou utilisez une URL complète :

```yaml
image: "https://example.com/image.jpg"
```

**Structure recommandée** :
```
public/
└── content/
    ├── blog/
    │   ├── images/
    │   │   ├── 2024/
    │   │   └── 2025/
    │   └── videos/
    │       ├── 2024/
    │       └── 2025/
    ├── events/
    │   └── images/
    │       ├── 2024/
    │       └── 2025/
    └── shared/
        ├── 2024/
        └── 2025/
```

#### Contenu Markdown

Après le frontmatter, utilisez le Markdown standard pour le contenu :

- Titres avec `#`, `##`, `###`
- Listes avec `-` ou `*`
- **Gras** avec `**texte**`
- *Italique* avec `*texte*`
- Liens avec `[texte](url)`
- Images avec `![alt](url)`
- Code avec `` `code` `` ou blocs de code

#### Publication

Pour masquer temporairement un article ou un événement sans le supprimer :

```yaml
published: false
```

L'article/événement ne sera pas affiché publiquement mais restera dans le système.

---

### Vérification après création

Après avoir créé un nouveau fichier :

1. **Redémarrer le serveur de développement** : Nuxt Content détecte automatiquement les nouveaux fichiers au démarrage
2. **Vérifier les erreurs** : Consultez la console pour les erreurs de validation
3. **Tester l'affichage** : Visitez la page correspondante pour vérifier que le contenu s'affiche correctement
4. **Vérifier le cache** : Si le contenu n'apparaît pas immédiatement, le cache peut être en cause (expire après 5 minutes ou redémarrez le serveur)

---

## Gestion d'erreurs

Tous les composables gèrent les erreurs de manière gracieuse :

- **getAll()** et **getByField()** retournent un tableau vide `[]` en cas d'erreur
- **getBySlug()** retourne `null` en cas d'erreur ou si l'élément n'est pas trouvé
- Les erreurs sont loggées en développement avec des détails complets
- En production, seuls les messages d'erreur minimaux sont loggés

### Exemple de gestion d'erreurs

```typescript
const { getAllPosts } = useBlog()

try {
  const posts = await getAllPosts()
  if (posts.length === 0) {
    console.log('Aucun article trouvé')
  }
} catch (error) {
  console.error('Erreur lors de la récupération des articles:', error)
  // En production, getAllPosts() retournera [] au lieu de lancer une erreur
}
```

### Gestion d'erreurs personnalisée

Vous pouvez fournir une fonction de gestion d'erreurs personnalisée lors de la création de la collection :

```typescript
const blogCollection = useContentCollection<BlogPost>('blog', {
  onError: (error, context) => {
    // Votre logique personnalisée
    console.error(`Erreur dans ${context}:`, error)
    // Envoyer à un service de monitoring, etc.
  }
})
```

---

## Optimisation et cache

### Cache automatique

Toutes les requêtes sont mises en cache pendant 5 minutes par défaut. Le cache est partagé entre toutes les instances du même composable.

```typescript
// Première requête : va chercher les données
const posts1 = await getAllPosts()

// Deuxième requête (dans les 5 minutes) : utilise le cache
const posts2 = await getAllPosts() // Plus rapide !
```

### Invalidation du cache

```typescript
const { getAllPosts } = useBlog()
const blogCollection = useContentCollection<BlogPost>('blog')

// Invalider le cache manuellement
blogCollection.invalidateCache()

// Prochaine requête va chercher les données fraîches
const freshPosts = await getAllPosts()
```

### Ignorer le cache

```typescript
const posts = await blogCollection.getAll({
  skipCache: true  // Ignorer le cache pour cette requête
})
```

### Statistiques du cache

```typescript
const stats = await blogCollection.getStats()
console.log(`Cache hits: ${stats.cacheHits}`)
console.log(`Cache misses: ${stats.cacheMisses}`)
console.log(`Taux de succès: ${(stats.cacheHits / (stats.cacheHits + stats.cacheMisses) * 100).toFixed(1)}%`)
```

---

## Exemples pratiques

### Page de blog avec recherche et filtres

```vue
<template>
  <div>
    <BlogSearch @search="handleSearch" />
    <BlogFilters @category-change="handleCategoryChange" />
    
    <div v-for="post in filteredPosts" :key="post._path">
      <BlogCard :post="post" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost, BlogCategory } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'

const { getAllPosts, getPostsByCategory, searchPosts } = useBlog()
const filteredPosts = ref<BlogPost[]>([])
const activeCategory = ref<BlogCategory | null>(null)
const searchQuery = ref('')

const loadPosts = async () => {
  if (searchQuery.value) {
    filteredPosts.value = await searchPosts(searchQuery.value)
  } else if (activeCategory.value) {
    filteredPosts.value = await getPostsByCategory(activeCategory.value)
  } else {
    filteredPosts.value = await getAllPosts()
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  loadPosts()
}

const handleCategoryChange = (category: BlogCategory | null) => {
  activeCategory.value = category
  loadPosts()
}

onMounted(() => {
  loadPosts()
})
</script>
```

### Page d'article avec articles similaires

```vue
<template>
  <div>
    <article>
      <h1>{{ post?.title }}</h1>
      <div v-if="post?._body">
        <ContentRenderer :value="post" />
      </div>
    </article>
    
    <section v-if="relatedPosts.length > 0">
      <h2>Articles similaires</h2>
      <BlogCard
        v-for="relatedPost in relatedPosts"
        :key="relatedPost._path"
        :post="relatedPost"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import { useBlog } from '~/composables/useBlog'

const route = useRoute()
const { getPostBySlug, getRelatedPosts } = useBlog()

const post = ref<BlogPost | null>(null)
const relatedPosts = ref<BlogPost[]>([])

onMounted(async () => {
  const slug = route.params.slug as string
  post.value = await getPostBySlug(slug)
  
  if (post.value) {
    relatedPosts.value = await getRelatedPosts(post.value, 3)
  }
})
</script>
```

### Calendrier d'événements

```vue
<template>
  <div>
    <EventCalendar :events="allEvents" />
  </div>
</template>

<script setup lang="ts">
const { allEvents } = useEvents()
</script>
```

### Page d'événement avec statut dynamique

```vue
<template>
  <div>
    <div v-if="event">
      <h1>{{ event.title }}</h1>
      
      <UBadge
        :color="getStatusColor(eventStatus)"
        variant="subtle"
      >
        {{ getStatusLabel(eventStatus) }}
      </UBadge>
      
      <div v-if="eventStatus === 'upcoming'">
        <p>Cet événement commence bientôt</p>
      </div>
      <div v-else-if="eventStatus === 'ongoing'">
        <p>Cet événement est actuellement en cours</p>
      </div>
      <div v-else>
        <p>Cet événement est terminé</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Event, EventStatus } from '~/types/event'
import { useEvents } from '~/composables/useEvents'

const route = useRoute()
const { getEventBySlug, isEventPast, isEventOngoing } = useEvents()

const event = ref<Event | null>(null)
const eventStatus = computed<EventStatus>(() => {
  if (!event.value) return 'upcoming'
  
  if (isEventOngoing(event.value)) return 'ongoing'
  if (isEventPast(event.value)) return 'past'
  return 'upcoming'
})

const getStatusColor = (status: EventStatus) => {
  return status === 'upcoming' ? 'success' : status === 'ongoing' ? 'warning' : 'neutral'
}

const getStatusLabel = (status: EventStatus) => {
  return status === 'upcoming' ? 'À venir' : status === 'ongoing' ? 'En cours' : 'Passé'
}

onMounted(async () => {
  const slug = route.params.slug as string
  event.value = await getEventBySlug(slug)
})
</script>
```

---

## Bonnes pratiques

1. **Utiliser les refs réactifs** : Pour `useEvents()`, préférer utiliser `upcomingEvents`, `ongoingEvents`, `pastEvents` qui sont automatiquement chargés
2. **Gérer le chargement** : Toujours afficher un état de chargement pendant les requêtes asynchrones
3. **Gérer les erreurs** : Vérifier les valeurs de retour (`null`, tableaux vides)
4. **Utiliser le cache** : Ne pas invalider le cache trop souvent, laisser le TTL faire son travail
5. **TypeScript** : Toujours typer les variables avec les types fournis (`BlogPost`, `Event`)
6. **Performance** : Utiliser `skipCache` uniquement quand nécessaire (ex: après une mise à jour)

---

## Migration depuis l'ancienne version

L'API publique reste identique, donc aucune modification n'est nécessaire dans le code existant. Les améliorations sont transparentes :

- ✅ Cache automatique pour améliorer les performances
- ✅ Gestion d'erreurs améliorée
- ✅ Code réduit de ~70% dans les composables
- ✅ Types TypeScript stricts
- ✅ Documentation complète

---

## Références

- [Documentation Nuxt Content](https://content.nuxtjs.org/)
- [Documentation Nuxt 3](https://nuxt.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

