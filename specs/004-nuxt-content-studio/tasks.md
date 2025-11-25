# Implementation Tasks: Intégration Nuxt Content Studio

**Feature**: Intégration Nuxt Content Studio  
**Branch**: `004-nuxt-content-studio`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

## ⚠️ Approche de Développement

**IMPORTANT** : Tester et valider toutes les fonctionnalités **en local d'abord** avant de considérer le déploiement en production. Le déploiement en production est **conditionnel** et ne doit être effectué que si toutes les validations locales passent avec succès.

## Task Breakdown

### Phase 1: Installation et Configuration de Base

#### Task 1.1: Installer le module nuxt-studio
**File**: `package.json`  
**Description**: Installer le module Nuxt Content Studio  
**Dependencies**: None  
**Status**: ⏳ Pending

**Commandes**:
```bash
pnpm add nuxt-studio
```

**Détails**:
- [ ] Installer `nuxt-studio` via pnpm
- [ ] Vérifier que la dépendance est ajoutée dans `package.json`
- [ ] Vérifier la version installée (dernière stable)

#### Task 1.2: Configurer nuxt.config.ts pour Studio
**File**: `nuxt.config.ts`  
**Description**: Ajouter la configuration Studio dans nuxt.config.ts  
**Dependencies**: Task 1.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter `nuxt-studio` dans le tableau `modules`
- [ ] Ajouter la configuration `studio` avec route `/studio`
- [ ] Configurer le repository GitHub (owner, repo, branch)
- [ ] Configurer `nitro.prerender.exclude` pour exclure `/studio` du pré-rendu
- [ ] Vérifier que la configuration est valide

**Configuration à ajouter**:
```typescript
modules: [
  '@nuxt/ui',
  '@nuxt/image',
  '@nuxt/content',
  'nuxt-studio'  // Ajouté
],

studio: {
  route: '/studio',
  repository: {
    provider: 'github',
    owner: 'KATBlackCoder',  // À vérifier
    repo: 'Femat',           // À vérifier
    branch: 'main'
  }
},

nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true,
    exclude: ['/studio', '/studio/**']  // Exclure Studio du pré-rendu
  }
}
```

#### Task 1.3: Vérifier l'accès Studio en développement
**File**: N/A  
**Description**: Tester que Studio est accessible en développement  
**Dependencies**: Task 1.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Démarrer le serveur de développement: `pnpm dev`
- [ ] Accéder à `http://localhost:3000/studio`
- [ ] Vérifier que l'interface Studio s'affiche
- [ ] Vérifier que les collections `blog` et `events` sont visibles
- [ ] Documenter toute erreur ou problème rencontré

### Phase 2: Configuration OAuth GitHub

#### Task 2.1: Créer application OAuth GitHub
**File**: N/A (GitHub)  
**Description**: Créer une application OAuth sur GitHub pour l'authentification Studio  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Aller sur GitHub → Settings → Developer settings → OAuth Apps
- [ ] Cliquer sur "New OAuth App"
- [ ] Remplir les informations:
  - Application name: `FEMAT Nuxt Studio`
  - Homepage URL: `https://www.femat.ml`
  - Authorization callback URL: `https://www.femat.ml/studio/auth/callback`
- [ ] Enregistrer l'application
- [ ] Copier le **Client ID** et générer un **Client Secret**
- [ ] Documenter les credentials (à stocker de manière sécurisée)

#### Task 2.2: Configurer variables d'environnement locales
**File**: `.env.example`, `.env.local`  
**Description**: Ajouter les variables d'environnement pour OAuth GitHub  
**Dependencies**: Task 2.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter les variables dans `.env.example`:
  ```env
  # Nuxt Content Studio
  STUDIO_GITHUB_CLIENT_ID=your_client_id_here
  STUDIO_GITHUB_CLIENT_SECRET=your_client_secret_here
  ```
- [ ] Créer `.env.local` avec les vraies valeurs (ne pas commiter)
- [ ] Ajouter `.env.local` dans `.gitignore` si pas déjà présent
- [ ] Vérifier que les variables sont chargées correctement

#### Task 2.3: Tester l'authentification GitHub en développement
**File**: N/A  
**Description**: Tester que l'authentification OAuth fonctionne en développement  
**Dependencies**: Task 2.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Redémarrer le serveur de développement
- [ ] Accéder à `http://localhost:3000/studio`
- [ ] Cliquer sur "Se connecter avec GitHub"
- [ ] Vérifier que la redirection vers GitHub fonctionne
- [ ] Autoriser l'application OAuth
- [ ] Vérifier que la redirection de retour fonctionne
- [ ] Vérifier que l'utilisateur est connecté dans Studio
- [ ] Vérifier que seuls les utilisateurs avec write access peuvent accéder
- [ ] Documenter toute erreur ou problème rencontré

### Phase 3: Test Édition Collections

#### Task 3.1: Tester édition articles de blog
**File**: `content/blog/**/*.md`  
**Description**: Tester la création et modification d'articles de blog via Studio  
**Dependencies**: Task 2.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Accéder à Studio et naviguer vers la collection `blog`
- [ ] Créer un nouvel article de blog via l'interface
- [ ] Vérifier que le frontmatter est correctement rempli:
  - title, description, date, author, category, tags, image, published
- [ ] Ajouter du contenu Markdown
- [ ] Vérifier la prévisualisation en temps réel
- [ ] Sauvegarder l'article
- [ ] Vérifier que le fichier est créé dans `/content/blog/`
- [ ] Vérifier que l'article apparaît sur le site (`/blog`)
- [ ] Modifier un article existant
- [ ] Vérifier que les modifications sont sauvegardées
- [ ] Vérifier que les modifications apparaissent sur le site

#### Task 3.2: Tester édition événements
**File**: `content/events/**/*.md`  
**Description**: Tester la création et modification d'événements via Studio  
**Dependencies**: Task 2.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Accéder à Studio et naviguer vers la collection `events`
- [ ] Créer un nouvel événement via l'interface
- [ ] Vérifier que le frontmatter est correctement rempli:
  - title, date, endDate, startTime, endTime, location, description, type, status, image, published
- [ ] Ajouter du contenu Markdown
- [ ] Vérifier la prévisualisation en temps réel
- [ ] Sauvegarder l'événement
- [ ] Vérifier que le fichier est créé dans `/content/events/`
- [ ] Vérifier que l'événement apparaît sur le site (`/events`)
- [ ] Modifier un événement existant
- [ ] Vérifier que les modifications sont sauvegardées
- [ ] Vérifier que les modifications apparaissent sur le site

### Phase 4: Gestion des Images

#### Task 4.1: Vérifier structure dossiers images
**File**: `public/blog/images/`, `public/events/images/`  
**Description**: Vérifier que les dossiers pour images existent  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que `public/blog/images/` existe
- [ ] Vérifier que `public/events/images/` existe
- [ ] Créer les dossiers si nécessaire
- [ ] Vérifier les permissions d'écriture

#### Task 4.2: Tester upload d'images depuis Studio
**File**: `public/blog/images/`, `public/events/images/`  
**Description**: Tester l'upload d'images via Studio  
**Dependencies**: Task 4.1, Task 2.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Dans Studio, créer/modifier un article
- [ ] Utiliser la fonctionnalité d'upload d'image
- [ ] Sélectionner une image depuis l'ordinateur
- [ ] Vérifier que l'image est uploadée dans le bon dossier
- [ ] Vérifier que le chemin est inséré correctement dans le Markdown
- [ ] Vérifier que l'image s'affiche dans la prévisualisation
- [ ] Sauvegarder et vérifier que l'image s'affiche sur le site
- [ ] Tester avec différents formats (JPG, PNG, WebP)
- [ ] Tester avec différentes tailles d'images
- [ ] Documenter les limitations (taille max, formats supportés)

### Phase 5: Synchronisation Git

#### Task 5.1: Tester commits automatiques
**File**: N/A (Git)  
**Description**: Vérifier que les modifications créent des commits Git automatiques  
**Dependencies**: Task 3.1, Task 3.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer/modifier un article via Studio
- [ ] Sauvegarder les modifications
- [ ] Vérifier sur GitHub qu'un commit a été créé
- [ ] Vérifier que le message de commit est descriptif
- [ ] Vérifier que les modifications sont sur la branche `main`
- [ ] Vérifier que les fichiers modifiés sont correctement commités
- [ ] Documenter le format des messages de commit générés

#### Task 5.2: Documenter workflow pour éviter conflits
**File**: `specs/004-nuxt-content-studio/STUDIO-WORKFLOW.md`  
**Description**: Créer une documentation sur le workflow pour éviter les conflits Git  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter le workflow recommandé:
  - Ne pas éditer manuellement pendant qu'un autre utilise Studio
  - Vérifier les modifications récentes avant d'éditer
  - Comment résoudre les conflits si nécessaire
- [ ] Créer un guide pour l'équipe éditoriale
- [ ] Inclure des exemples de bonnes pratiques

### Phase 6: Validation Locale Complète (OBLIGATOIRE)

**⚠️ IMPORTANT** : Cette phase doit être complétée AVANT de considérer le déploiement en production.

#### Task 6.1: Checklist de validation locale
**File**: N/A  
**Description**: Valider que toutes les fonctionnalités fonctionnent correctement en local  
**Dependencies**: Task 5.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] ✅ Toutes les fonctionnalités testées et fonctionnelles en local
- [ ] ✅ Authentification OAuth fonctionne correctement
- [ ] ✅ Édition blog fonctionne sans erreur
- [ ] ✅ Édition events fonctionne sans erreur
- [ ] ✅ Upload d'images fonctionne correctement
- [ ] ✅ Synchronisation Git fonctionne (commits créés)
- [ ] ✅ Aucune régression sur les fonctionnalités existantes
- [ ] ✅ Documentation technique créée
- [ ] ✅ Tests manuels complets effectués
- [ ] ✅ Tous les problèmes identifiés et documentés

#### Task 6.2: Décision de déploiement
**File**: N/A  
**Description**: Décider si on procède au déploiement en production  
**Dependencies**: Task 6.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Évaluer les résultats de la validation locale
- [ ] Si toutes les validations passent → Procéder à Phase 7 (Déploiement)
- [ ] Si problèmes persistants → Documenter et utiliser Studio uniquement en local
- [ ] Documenter la décision et la justification

### Phase 7: Déploiement en Production (CONDITIONNEL)

**⚠️ PRÉREQUIS** : Phase 6 complétée avec succès. Ne déployer que si tout fonctionne en local.

#### Task 7.1: Vérifier compatibilité cPanel avec SSR
**File**: N/A  
**Description**: Vérifier si cPanel supporte Node.js/SSR pour la route Studio  
**Dependencies**: Task 6.2 (décision de déployer)  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier la documentation cPanel pour support Node.js
- [ ] Vérifier si Node.js est disponible sur le serveur cPanel
- [ ] Tester si une route SSR peut être déployée
- [ ] Documenter les résultats
- [ ] Décider de la stratégie de déploiement:
  - Option A: cPanel supporte SSR → Déployer directement
  - Option B: cPanel ne supporte pas SSR → Utiliser Studio uniquement en local (recommandé)

#### Task 7.2: Configurer variables d'environnement production
**File**: N/A (cPanel ou plateforme SSR)  
**Description**: Configurer les variables d'environnement pour Studio en production  
**Dependencies**: Task 7.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Si Option A (cPanel SSR):
  - [ ] Configurer variables d'environnement dans cPanel
  - [ ] Vérifier que les variables sont sécurisées
- [ ] Si Option B (déploiement hybride - non recommandé):
  - [ ] Configurer variables d'environnement sur plateforme SSR (Vercel/Netlify)
  - [ ] Vérifier que les variables sont sécurisées
- [ ] Documenter la configuration

#### Task 7.3: Déployer Studio en production
**File**: N/A  
**Description**: Déployer Studio sur la plateforme de production  
**Dependencies**: Task 7.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Si Option A (cPanel SSR):
  - [ ] Build avec `pnpm build` (génère SSG + route SSR pour Studio)
  - [ ] Uploader `.output/` sur cPanel
  - [ ] Configurer route SSR pour `/studio`
- [ ] Si Option B (déploiement hybride - non recommandé):
  - [ ] Déployer site statique sur cPanel (SSG)
  - [ ] Déployer Studio sur Vercel/Netlify (SSR)
  - [ ] Configurer domaine pour pointer vers les deux plateformes
- [ ] Tester l'accès à Studio en production
- [ ] Vérifier l'authentification OAuth
- [ ] Tester la création/modification d'un article
- [ ] Vérifier la synchronisation Git

### Phase 8: Documentation et Formation

#### Task 8.1: Créer documentation technique
**File**: `specs/004-nuxt-content-studio/TECHNICAL-DOCS.md`  
**Description**: Créer une documentation technique complète pour Studio  
**Dependencies**: Task 6.1 (validation locale)  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter la configuration Studio
- [ ] Documenter la configuration OAuth GitHub
- [ ] Documenter le déploiement (Option A ou B)
- [ ] Documenter le dépannage
- [ ] Inclure les commandes utiles
- [ ] Inclure les liens vers la documentation officielle

#### Task 8.2: Créer guide utilisateur équipe éditoriale
**File**: `specs/004-nuxt-content-studio/USER-GUIDE.md`  
**Description**: Créer un guide d'utilisation pour l'équipe éditoriale  
**Dependencies**: Task 6.1 (validation locale)  
**Status**: ⏳ Pending

**Détails**:
- [ ] Guide d'accès à Studio
- [ ] Guide de création d'articles de blog
- [ ] Guide de création d'événements
- [ ] Guide d'upload d'images
- [ ] Guide de gestion du frontmatter
- [ ] Guide de prévisualisation
- [ ] Guide de publication
- [ ] Guide de résolution de problèmes courants
- [ ] Inclure des captures d'écran si nécessaire

#### Task 8.3: Former l'équipe éditoriale
**File**: N/A  
**Description**: Présenter Studio à l'équipe éditoriale et faire une démonstration  
**Dependencies**: Task 8.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Présenter Studio en local (développement)
- [ ] Expliquer le workflow de publication
- [ ] Faire une démonstration pratique :
  - Création d'un article
  - Modification d'un article
  - Upload d'images
  - Publication
- [ ] Répondre aux questions
- [ ] Fournir le guide utilisateur
- [ ] Documenter les retours et questions

**Détails**:
- [ ] Organiser une session de formation
- [ ] Présenter l'interface Studio
- [ ] Faire une démonstration pratique:
  - Création d'un article
  - Modification d'un article
  - Upload d'images
  - Publication
- [ ] Répondre aux questions
- [ ] Fournir le guide utilisateur
- [ ] Documenter les retours et questions

## Checklist de Validation

### ✅ Validation Locale (OBLIGATOIRE)
- [ ] Studio fonctionne en développement local (`http://localhost:3000/studio`)
- [ ] Authentification OAuth fonctionne en local
- [ ] Édition blog fonctionne sans erreur
- [ ] Édition events fonctionne sans erreur
- [ ] Upload d'images fonctionne correctement
- [ ] Synchronisation Git fonctionne (commits créés)
- [ ] Aucune régression sur les fonctionnalités existantes
- [ ] Documentation technique créée
- [ ] Tous les tests manuels passent

### ⚠️ Déploiement Production (CONDITIONNEL - Seulement si validation locale OK)
- [ ] ✅ **PRÉREQUIS** : Toutes les validations locales passent
- [ ] Compatibilité cPanel vérifiée (ou décision d'utiliser Studio uniquement en local)
- [ ] Variables d'environnement production configurées (si déploiement)
- [ ] Studio accessible sur `/studio` en production (si déploiement)
- [ ] Authentification OAuth fonctionne en production (si déploiement)
- [ ] Édition fonctionne en production (si déploiement)
- [ ] Synchronisation Git fonctionne en production (si déploiement)
- [ ] Équipe éditoriale formée
- [ ] Documentation accessible

## Notes

### Approche de Développement
- **Priorité** : Tester et valider toutes les fonctionnalités en local d'abord
- **Production** : Déploiement conditionnel, seulement si tout fonctionne en local
- **Workflow alternatif** : Si cPanel ne supporte pas SSR, utiliser Studio uniquement en local pour créer/modifier le contenu, puis déployer manuellement via Git

### Points Critiques
- La compatibilité cPanel avec SSR est un point à vérifier, mais pas bloquant (Studio peut être utilisé uniquement en local)
- Si cPanel ne supporte pas SSR, **recommandation** : Utiliser Studio uniquement en développement local
- Les variables d'environnement doivent être sécurisées et non exposées publiquement
- Documenter le workflow pour éviter les conflits Git entre édition manuelle et Studio
- Former l'équipe éditoriale sur l'utilisation de Studio en local

### Workflow Recommandé
1. **Développement** : Utiliser Studio en local pour créer/modifier le contenu
2. **Validation** : Tester toutes les fonctionnalités en local
3. **Publication** : Commiter les modifications via Git et déployer le site statique
4. **Production** : Site statique déployé sur cPanel (SSG), Studio utilisé uniquement en local

