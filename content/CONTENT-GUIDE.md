# Guide de Création de Contenu

Ce guide explique comment créer des articles de blog et des événements dans l'application FEMAT.

## Structure des dossiers

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

## Créer un article de blog

### Emplacement du fichier

Créez un fichier Markdown dans `content/blog/{année}/` avec un nom descriptif en minuscules et tirets.

**Exemple** : `content/blog/2025/championnat-national-2025.md`

### Format du frontmatter

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
image: "/content/blog/images/2025/championnat-2025.jpg"
published: true
---
```

### Champs obligatoires

- **`title`** (string) : Titre de l'article (minimum 1 caractère)
- **`description`** (string) : Description courte (minimum 1 caractère)
- **`date`** (string) : Date au format `YYYY-MM-DD` (ex: `2025-01-27`)
- **`author`** (string) : Nom de l'auteur (minimum 1 caractère)
- **`category`** (enum) : Une des catégories suivantes :
  - `competition`
  - `actualite`
  - `resultat`
  - `evenement`

### Champs optionnels

- **`tags`** (array de strings) : Liste de tags pour catégoriser l'article
- **`image`** (string) : URL ou chemin relatif vers l'image (ex: `/blog/images/image.jpg`)
- **`published`** (boolean) : Si `false`, l'article ne sera pas affiché publiquement (défaut: `true`)

### Exemple complet

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
image: "/content/blog/images/2025/championnat-2025.jpg"
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

### Validation

Le système valide automatiquement :
- Le format de la date (`YYYY-MM-DD`)
- La catégorie (doit être une des valeurs autorisées)
- La présence des champs obligatoires
- Le format de l'image (URL ou chemin commençant par `/`)

Si une erreur de validation se produit, vous verrez un message d'erreur clair dans la console.

---

## Créer un événement

### Emplacement du fichier

Créez un fichier Markdown dans `content/events/{année}/` avec un nom au format `YYYY-MM-DD-nom-evenement.md`.

**Exemple** : `content/events/2025/2025-12-20-stage-jeunes.md`

**Convention de nommage** : Utilisez le format `YYYY-MM-DD-slug.md` où :
- `YYYY-MM-DD` est la date de début de l'événement
- `slug` est un identifiant court en minuscules avec tirets

### Format du frontmatter

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
image: "/content/events/images/2025/stage-jeunes.jpg"
published: true
---
```

### Champs obligatoires

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

**Note** : Le statut peut être calculé automatiquement, mais il est recommandé de le définir dans le frontmatter pour la cohérence.

### Champs optionnels

- **`endDate`** (string) : Date de fin au format `YYYY-MM-DD` (pour événements multi-jours)
- **`startTime`** (string) : Heure de début au format `HH:mm` en 24h (ex: `09:00`, `18:30`)
- **`endTime`** (string) : Heure de fin au format `HH:mm` en 24h (ex: `17:00`, `22:00`)
- **`image`** (string) : URL ou chemin relatif vers l'image (ex: `/events/images/event.jpg`)
- **`published`** (boolean) : Si `false`, l'événement ne sera pas affiché publiquement (défaut: `true`)

### Exemple complet

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

### Calcul automatique du statut

Le statut peut être calculé automatiquement par le système. Cependant, il est recommandé de définir le statut dans le frontmatter pour :

1. **Performance** : Évite de recalculer le statut à chaque chargement
2. **Cohérence** : Le statut dans le fichier correspond au statut affiché
3. **SEO** : Les métadonnées sont disponibles immédiatement

**Recommandation** : Mettez à jour le statut manuellement dans le frontmatter quand l'événement change de statut.

### Validation

Le système valide automatiquement :
- Le format de la date (`YYYY-MM-DD`)
- Le format de l'heure (`HH:mm` en 24h)
- Le type d'événement (doit être une des valeurs autorisées)
- Le statut (doit être une des valeurs autorisées)
- La présence des champs obligatoires
- Le format de l'image (URL ou chemin commençant par `/`)

---

## Bonnes pratiques

### Nommage des fichiers

- **Blog** : Utilisez des noms descriptifs en minuscules avec tirets
  - ✅ `championnat-national-2025.md`
  - ❌ `Championnat National 2025.md`
  - ❌ `championnat_national_2025.md`

- **Événements** : Utilisez le format `YYYY-MM-DD-slug.md`
  - ✅ `2025-12-20-stage-jeunes.md`
  - ❌ `stage-jeunes-2025.md`
  - ❌ `2025/12/20-stage-jeunes.md`

### Organisation par année

Organisez vos fichiers par année dans des sous-dossiers :
- `content/blog/2024/` pour les articles de 2024
- `content/blog/2025/` pour les articles de 2025
- `content/events/2024/` pour les événements de 2024
- `content/events/2025/` pour les événements de 2025

### Images

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

### Contenu Markdown

Après le frontmatter, utilisez le Markdown standard pour le contenu :

- Titres avec `#`, `##`, `###`
- Listes avec `-` ou `*`
- **Gras** avec `**texte**`
- *Italique* avec `*texte*`
- Liens avec `[texte](url)`
- Images avec `![alt](url)`
- Code avec `` `code` `` ou blocs de code

### Publication

Pour masquer temporairement un article ou un événement sans le supprimer :

```yaml
published: false
```

L'article/événement ne sera pas affiché publiquement mais restera dans le système.

---

## Vérification après création

Après avoir créé un nouveau fichier :

1. **Redémarrer le serveur de développement** : Le système détecte automatiquement les nouveaux fichiers au démarrage
2. **Vérifier les erreurs** : Consultez la console pour les erreurs de validation
3. **Tester l'affichage** : Visitez la page correspondante pour vérifier que le contenu s'affiche correctement
4. **Vérifier le cache** : Si le contenu n'apparaît pas immédiatement, le cache peut être en cause (expire après 5 minutes ou redémarrez le serveur)

---

## Format des dates et heures

### Dates

- Format : `YYYY-MM-DD`
- Exemples :
  - ✅ `2025-01-27`
  - ✅ `2025-12-20`
  - ❌ `27/01/2025`
  - ❌ `2025-1-27` (mois et jour doivent avoir 2 chiffres)

### Heures

- Format : `HH:mm` en 24h
- Exemples :
  - ✅ `09:00` (9h00)
  - ✅ `18:30` (18h30)
  - ✅ `23:59` (23h59)
  - ❌ `9:00` (doit être `09:00`)
  - ❌ `18:30:00` (pas de secondes)

---

## Résumé rapide

### Article de blog

1. Créer `content/blog/{année}/nom-article.md`
2. Ajouter le frontmatter avec `title`, `description`, `date`, `author`, `category`
3. Ajouter le contenu Markdown
4. Redémarrer le serveur

### Événement

1. Créer `content/events/{année}/YYYY-MM-DD-nom-evenement.md`
2. Ajouter le frontmatter avec `title`, `date`, `location`, `description`, `type`, `status`
3. Ajouter le contenu Markdown
4. Redémarrer le serveur

---

Pour plus de détails sur l'utilisation des composables dans le code, consultez `specs/006-restructuration-content/USAGE.md`.

