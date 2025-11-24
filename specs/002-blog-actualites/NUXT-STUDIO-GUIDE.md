# Guide d'utilisation Nuxt Studio - FEMAT

**Version**: 1.0  
**Date**: 2025-01-27  
**Pour**: Équipe éditoriale FEMAT

> ⚠️ **Note importante** : Ce guide est préparé pour référence future. Nuxt Studio est actuellement **reporté** car la version alpha (`v1.0.0-alpha.1`) présente des problèmes persistants avec l'authentification OAuth GitHub.  
> **Workflow actuel** : Édition directe des fichiers Markdown dans `content/blog/*.md` via VS Code/éditeur de texte.  
> **Réévaluation** : Prévue pour Phase 2 quand la version beta avec éditeur visuel sera disponible.

## Table des matières

1. [Introduction](#introduction)
2. [Accès à Nuxt Studio](#accès-à-nuxt-studio)
3. [Première connexion](#première-connexion)
4. [Créer un nouvel article](#créer-un-nouvel-article)
5. [Éditer un article existant](#éditer-un-article-existant)
6. [Gestion des images](#gestion-des-images)
7. [Format Markdown et Frontmatter](#format-markdown-et-frontmatter)
8. [Workflow de publication](#workflow-de-publication)
9. [Bonnes pratiques](#bonnes-pratiques)
10. [Dépannage](#dépannage)

---

## Introduction

Nuxt Studio est l'interface d'administration visuelle pour gérer le contenu du blog FEMAT. Il permet de créer, modifier et publier des articles sans avoir besoin de connaissances techniques approfondies.

**Avantages** :
- Interface visuelle intuitive
- Édition en temps réel avec aperçu
- Synchronisation automatique avec GitHub
- Gestion des images intégrée
- Pas besoin de connaître Git

---

## Workflow Actuel (Temporaire - En attendant Nuxt Studio Beta)

En attendant que Nuxt Studio soit stable, nous utilisons l'édition directe des fichiers Markdown :

### Édition d'un article existant

1. **Ouvrir le fichier** dans VS Code ou votre éditeur :
   ```
   content/blog/nom-article.md
   ```

2. **Modifier le contenu** :
   - Frontmatter YAML en haut du fichier
   - Contenu Markdown en dessous

3. **Prévisualiser** :
   ```bash
   pnpm dev
   # Accéder à http://localhost:3000/blog
   ```

4. **Sauvegarder et commiter** :
   ```bash
   git add content/blog/nom-article.md
   git commit -m "Update: nom-article"
   git push
   ```

### Créer un nouvel article

1. **Créer un nouveau fichier** dans `content/blog/` :
   ```
   content/blog/nouveau-article.md
   ```

2. **Ajouter le frontmatter** :
   ```yaml
   ---
   title: "Titre de l'article"
   description: "Description courte"
   date: "2025-01-27"
   author: "Votre nom"
   category: "actualite"
   tags: ["tag1", "tag2"]
   published: true
   ---
   ```

3. **Ajouter le contenu** en Markdown

4. **Sauvegarder et commiter** comme ci-dessus

### Avantages du workflow actuel

- ✅ **Simple** : Édition directe dans l'IDE
- ✅ **Rapide** : Pas de configuration OAuth complexe
- ✅ **Fiable** : Pas de problèmes de synchronisation
- ✅ **Versionné** : Tout passe par Git
- ✅ **Suffisant** pour les besoins actuels

---

## Accès à Nuxt Studio

### En développement local

1. Démarrer le serveur de développement :
   ```bash
   pnpm dev
   ```

2. Ouvrir votre navigateur et aller sur :
   ```
   http://localhost:3000/_studio
   ```

### En production

Une fois le site déployé, Nuxt Studio sera accessible sur :
```
https://votre-domaine.com/_studio
```

**⚠️ Important** : Pour la production, assurez-vous que les variables d'environnement `STUDIO_GITHUB_CLIENT_ID` et `STUDIO_GITHUB_CLIENT_SECRET` sont configurées sur votre plateforme d'hébergement.

---

## Première connexion

### Configuration requise

1. **Compte GitHub** : Vous devez avoir un compte GitHub et être membre du repository `KATBlackCoder/Femat`

2. **Permissions** : Vous devez avoir les droits d'écriture sur le repository

### Étapes de connexion

1. Accédez à `/_studio`
2. Cliquez sur **"Se connecter avec GitHub"**
3. Autorisez l'application à accéder à votre compte GitHub
4. Autorisez l'accès au repository `Femat`
5. Vous serez redirigé vers l'interface d'administration

**Note** : La première connexion peut prendre quelques secondes pour synchroniser les articles existants.

---

## Créer un nouvel article

### Méthode 1 : Via l'interface Nuxt Studio

1. Dans la liste des articles, cliquez sur **"New Post"** ou le bouton **"+"**
2. Remplissez le formulaire avec les informations suivantes :

#### Frontmatter obligatoire

```yaml
title: "Titre de l'article"
description: "Description courte pour le SEO (150-160 caractères)"
date: "2025-01-27" # Format: YYYY-MM-DD
author: "Votre nom"
category: "actualite" # actualite, competition, resultat, evenement
tags: ["tag1", "tag2", "tag3"]
image: "nom-image.jpg" # Optionnel, chemin relatif depuis /public/blog/images/
published: true # true pour publier, false pour brouillon
```

#### Catégories disponibles

- `actualite` : Actualités générales de la fédération
- `competition` : Compétitions et tournois
- `resultat` : Résultats de compétitions
- `evenement` : Événements et cérémonies

3. Écrivez le contenu en **Markdown** dans l'éditeur
4. Cliquez sur **"Save"** ou **"Publish"** pour sauvegarder

### Méthode 2 : Créer directement un fichier Markdown

1. Créez un nouveau fichier dans `content/blog/` avec un nom descriptif :
   ```
   nouveau-championnat-2025.md
   ```
   
2. Ajoutez le frontmatter et le contenu :
   ```markdown
   ---
   title: "Nouveau Championnat 2025"
   description: "Description de l'article"
   date: "2025-01-27"
   author: "Votre nom"
   category: "competition"
   tags: ["championnat", "competition"]
   published: true
   ---
   
   # Titre de l'article
   
   Contenu de l'article...
   ```

3. Le fichier apparaîtra automatiquement dans Nuxt Studio après synchronisation

---

## Éditer un article existant

1. Dans la liste des articles, cliquez sur l'article à modifier
2. L'éditeur s'ouvre avec deux panneaux :
   - **Gauche** : Éditeur Markdown avec frontmatter
   - **Droite** : Aperçu en temps réel

3. Modifiez le contenu ou le frontmatter
4. Cliquez sur **"Save"** pour sauvegarder les modifications

**Note** : Les modifications sont automatiquement synchronisées avec GitHub et apparaissent sur le site après quelques secondes.

---

## Gestion des images

### Upload d'images

1. Dans l'éditeur, placez votre curseur où vous voulez insérer l'image
2. Cliquez sur l'icône **image** dans la barre d'outils
3. Sélectionnez une image depuis votre ordinateur
4. L'image sera automatiquement :
   - Uploadée vers `/public/blog/images/`
   - Optimisée si possible
   - Le chemin relatif sera inséré dans le Markdown

### Format d'image recommandé

- **Formats** : WebP, AVIF (recommandés), JPG, PNG
- **Taille** : Maximum 1-2 MB par image
- **Dimensions** : Largeur recommandée : 1200px pour images de couverture
- **Nommage** : Utilisez des noms descriptifs en minuscules avec tirets :
  ```
  championnat-national-2025.jpg
  ceremonie-remise-ceintures.jpg
  ```

### Utilisation dans le Markdown

```markdown
![Description de l'image](/blog/images/nom-image.jpg)
```

### Image de couverture

Pour définir une image de couverture, ajoutez-la dans le frontmatter :

```yaml
image: "nom-image.jpg"
```

Le chemin est relatif depuis `/public/blog/images/`.

---

## Format Markdown et Frontmatter

### Structure complète d'un article

```markdown
---
title: "Titre de l'article"
description: "Description courte pour le SEO"
date: "2025-01-27"
author: "Nom de l'auteur"
category: "actualite"
tags: ["tag1", "tag2"]
image: "nom-image.jpg"
published: true
---

# Titre principal (H1)

Introduction de l'article...

## Section 1 (H2)

Contenu de la section...

### Sous-section (H3)

Plus de détails...

## Section 2

### Liste à puces

- Point 1
- Point 2
- Point 3

### Liste numérotée

1. Premier point
2. Deuxième point
3. Troisième point

### Formatage du texte

- **Gras** : `**texte**`
- *Italique* : `*texte*`
- [Lien](https://example.com) : `[texte](url)`

### Citations

> Ceci est une citation importante.

### Code

```javascript
const exemple = "code";
```

### Tableaux

| Colonne 1 | Colonne 2 |
|-----------|-----------|
| Donnée 1  | Donnée 2  |
```

### Champs du Frontmatter

| Champ | Type | Obligatoire | Description |
|-------|------|-------------|-------------|
| `title` | string | ✅ Oui | Titre de l'article |
| `description` | string | ✅ Oui | Description pour SEO (150-160 caractères) |
| `date` | string | ✅ Oui | Date de publication (format: YYYY-MM-DD) |
| `author` | string | ✅ Oui | Nom de l'auteur |
| `category` | enum | ✅ Oui | `actualite`, `competition`, `resultat`, `evenement` |
| `tags` | array | ❌ Non | Liste de tags (ex: `["tag1", "tag2"]`) |
| `image` | string | ❌ Non | Chemin relatif de l'image de couverture |
| `published` | boolean | ❌ Non | `true` pour publier, `false` pour brouillon (défaut: `true`) |

---

## Workflow de publication

### Checklist avant publication

- [ ] Titre clair et descriptif
- [ ] Description remplie (150-160 caractères)
- [ ] Date correcte (format YYYY-MM-DD)
- [ ] Auteur renseigné
- [ ] Catégorie sélectionnée
- [ ] Tags pertinents ajoutés
- [ ] Image de couverture ajoutée (recommandé)
- [ ] Contenu relu et corrigé
- [ ] Liens vérifiés
- [ ] `published: true` dans le frontmatter

### Processus de publication

1. **Créer/Éditer** l'article dans Nuxt Studio
2. **Vérifier** l'aperçu dans le panneau de droite
3. **Sauvegarder** avec le bouton "Save" ou "Publish"
4. **Vérifier** que l'article apparaît sur le site (`/blog`)
5. **Vérifier** sur GitHub que le commit a été créé

### Brouillons

Pour créer un brouillon sans le publier :

```yaml
published: false
```

Les articles avec `published: false` n'apparaîtront pas sur le site public mais seront visibles dans Nuxt Studio.

---

## Bonnes pratiques

### Rédaction

1. **Titres** : Utilisez des titres clairs et descriptifs
2. **Structure** : Organisez le contenu avec des sections (H2, H3)
3. **Longueur** : Articles recommandés entre 500-2000 mots
4. **Lisibilité** : Utilisez des paragraphes courts (3-4 phrases max)
5. **Liens** : Ajoutez des liens vers d'autres articles ou ressources pertinentes

### SEO

1. **Description** : Rédigez une description accrocheuse (150-160 caractères)
2. **Tags** : Utilisez 3-5 tags pertinents par article
3. **Images** : Ajoutez toujours une image de couverture avec description alt
4. **Mots-clés** : Intégrez naturellement les mots-clés dans le contenu

### Images

1. **Optimisation** : Compressez les images avant upload (outils: TinyPNG, Squoosh)
2. **Nommage** : Utilisez des noms descriptifs en minuscules avec tirets
3. **Taille** : Maximum 1-2 MB par image
4. **Format** : Préférez WebP ou AVIF pour de meilleures performances

### Nommage des fichiers

- Utilisez des **slugs** en minuscules avec des tirets
- Exemples :
  - ✅ `nouveau-championnat-2025.md`
  - ✅ `ceremonie-remise-ceintures.md`
  - ❌ `Nouveau Championnat 2025.md`
  - ❌ `ceremonie_remise_ceintures.md`

### Synchronisation Git

- Nuxt Studio crée automatiquement des commits sur GitHub
- Les messages de commit sont générés automatiquement
- Ne modifiez pas manuellement les fichiers dans `content/blog/` pendant que Nuxt Studio est ouvert (risque de conflits)

---

## Dépannage

### Problème : "OAuth access denied"

**Solution** :
- Vérifiez que vous êtes connecté avec le bon compte GitHub
- Vérifiez que vous avez les permissions sur le repository `KATBlackCoder/Femat`
- Contactez l'administrateur pour obtenir les permissions

### Problème : "Repository not found"

**Solution** :
- Vérifiez que le repository existe et est accessible
- Vérifiez la configuration dans `nuxt.config.ts` :
  ```typescript
  studio: {
    repository: {
      owner: 'KATBlackCoder',
      repo: 'Femat',
      branch: 'main'
    }
  }
  ```

### Problème : Interface vide (pas d'articles)

**Solution** :
- Vérifiez que le dossier `content/blog/` contient des fichiers `.md`
- Redémarrez le serveur de développement : `pnpm dev`
- Vérifiez la console du navigateur pour les erreurs

### Problème : Images ne s'uploadent pas

**Solution** :
- Vérifiez que le dossier `/public/blog/images/` existe
- Vérifiez les permissions d'écriture sur le dossier
- Vérifiez la taille de l'image (max 5-10 MB selon configuration)
- Essayez avec une image plus petite

### Problème : Modifications non sauvegardées

**Solution** :
- Vérifiez votre connexion Internet
- Vérifiez que vous avez les permissions d'écriture sur GitHub
- Vérifiez la console du navigateur pour les erreurs
- Essayez de rafraîchir la page et reconnectez-vous

### Problème : Article ne s'affiche pas sur le site

**Solution** :
- Vérifiez que `published: true` dans le frontmatter
- Vérifiez que la date n'est pas dans le futur
- Vérifiez que le fichier est bien dans `content/blog/`
- Attendez quelques secondes pour la synchronisation
- Rafraîchissez le cache du navigateur (Ctrl+F5)

---

## Structure des dossiers

```
femat/
├── content/
│   └── blog/
│       ├── bienvenue-femat.md
│       ├── championnat-national-2025.md
│       └── ...
├── public/
│   └── blog/
│       └── images/
│           ├── bienvenue.jpg
│           ├── championnat-2025.jpg
│           └── ...
└── .env.local (credentials GitHub OAuth)
```

---

## Support

Pour toute question ou problème :

1. Consultez ce guide en premier
2. Vérifiez la section [Dépannage](#dépannage)
3. Contactez l'équipe technique FEMAT

---

**Dernière mise à jour** : 2025-01-27

