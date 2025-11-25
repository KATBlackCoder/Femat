# Implementation Plan: Intégration Nuxt Content Studio

**Branch**: `004-nuxt-content-studio` | **Date**: 2025-01-27 | **Spec**: `specs/004-nuxt-content-studio/spec.md`
**Input**: Feature specification from `/specs/004-nuxt-content-studio/spec.md`

## Summary

Intégration de Nuxt Content Studio pour permettre l'édition visuelle du contenu (blog et événements). **Approche de développement** : Tester et valider toutes les fonctionnalités en local d'abord, puis déployer en production uniquement si tout fonctionne correctement. Studio offre une interface d'administration moderne accessible via `/studio` avec authentification GitHub OAuth, permettant la création, modification et gestion des articles et événements sans connaissances techniques approfondies. Synchronisation automatique avec le repository Git pour maintenir le workflow de versioning existant.

## Technical Context

**Language/Version**: TypeScript 5.x  
**Primary Dependencies**: Nuxt.js 4.2.1, Nuxt UI 4.1.0, @nuxt/content 3.8.2, nuxt-studio (à installer)  
**Storage**: Fichiers Markdown dans `/content/blog/` et `/content/events/` (versionnés avec Git)  
**Testing**: Tests manuels pour v1.0  
**Target Platform**: Web (modern browsers)  
**Project Type**: Web (SSG avec route SSR hybride pour Studio)  
**Deployment**: cPanel (SSG) + Route SSR pour Studio (à vérifier compatibilité)  
**Performance Goals**: Pas d'impact sur les performances du site public, Studio chargé uniquement sur demande  
**Constraints**: Compatibilité avec SSG existant, rétrocompatibilité avec édition manuelle, sécurité OAuth  
**Scale/Scope**: Interface d'administration pour équipe éditoriale (~2-5 utilisateurs)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] User-First Design: Feature aligns with user needs - Interface intuitive pour équipe éditoriale non-technique
- [x] Performance & SEO: Optimizations planned - SSG maintenu pour pages publiques, SSR uniquement pour route Studio
- [x] Maintainability: Code structure defined - Utilisation module officiel Nuxt, configuration standardisée
- [x] Accessibility: WCAG compliance planned - Interface Studio respecte les standards d'accessibilité
- [x] Mobile-First: Responsive design considered - Interface Studio responsive (gérée par le module)

## Project Structure

### Documentation (this feature)

```text
specs/004-nuxt-content-studio/
├── plan.md              # This file
├── spec.md              # Original specification
├── research.md          # Recherche sur Nuxt Content Studio
└── tasks.md             # Breakdown des tâches (à générer)
```

### Application Structure

```text
app/
├── nuxt.config.ts       # Configuration Studio ajoutée
├── .env.example         # Variables d'environnement Studio
└── (structure existante inchangée)
```

## Phases

### Phase 0: Research & Planning ✅

**Recherches effectuées**:
- Documentation officielle Nuxt Content Studio
- Configuration OAuth GitHub
- Compatibilité SSG/SSR hybride
- Déploiement sur cPanel avec route SSR

**Décisions techniques**:
1. ✅ **Nuxt Content Studio** choisi (module officiel, intégration native)
2. ✅ Route `/studio` pour l'interface d'administration
3. ✅ Authentification GitHub OAuth pour sécurité
4. ✅ Configuration hybride SSG/SSR (SSG pour pages publiques, SSR pour `/studio`)
5. ⚠️ **Défi**: Vérifier compatibilité cPanel avec SSR (peut nécessiter déploiement hybride)

### Phase 1: Installation et Configuration de Base

**Étape 1.1: Installation du module**
```bash
pnpm add nuxt-studio
```

**Étape 1.2: Configuration `nuxt.config.ts`**
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    'nuxt-studio'  // Ajouté
  ],
  
  studio: {
    route: '/studio',
    repository: {
      provider: 'github',
      owner: 'KATBlackCoder',  // À vérifier depuis git remote
      repo: 'Femat',           // À vérifier depuis git remote
      branch: 'main'
    }
  },
  
  // Configuration hybride SSG/SSR
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      // Exclure la route Studio du pré-rendu (nécessite SSR)
      exclude: ['/studio', '/studio/**']
    }
  }
})
```

**Étape 1.3: Vérification en développement**
- Démarrer le serveur de développement : `pnpm dev`
- Accéder à `http://localhost:3000/studio`
- Vérifier que l'interface Studio s'affiche

### Phase 2: Configuration OAuth GitHub

**Étape 2.1: Créer Application OAuth GitHub**

1. Aller sur GitHub → Settings → Developer settings → OAuth Apps
2. Cliquer sur "New OAuth App"
3. Remplir les informations :
   - **Application name**: `FEMAT Nuxt Studio`
   - **Homepage URL**: `https://www.femat.ml`
   - **Authorization callback URL**: `https://www.femat.ml/studio/auth/callback`
4. Enregistrer et copier le **Client ID** et **Client Secret**

**Étape 2.2: Configuration variables d'environnement**

Créer/mettre à jour `.env.example`:
```env
# Nuxt Content Studio
STUDIO_GITHUB_CLIENT_ID=your_client_id_here
STUDIO_GITHUB_CLIENT_SECRET=your_client_secret_here
```

Créer `.env.local` pour développement:
```env
STUDIO_GITHUB_CLIENT_ID=your_client_id_here
STUDIO_GITHUB_CLIENT_SECRET=your_client_secret_here
```

**Étape 2.3: Vérification authentification**
- Accéder à `http://localhost:3000/studio`
- Cliquer sur "Se connecter avec GitHub"
- Vérifier que l'authentification fonctionne
- Vérifier que seuls les utilisateurs avec write access au repository peuvent accéder

### Phase 3: Configuration Collections

**Étape 3.1: Vérifier collections existantes**

Les collections `blog` et `events` sont déjà configurées dans `content.config.ts`. Studio devrait les détecter automatiquement.

**Étape 3.2: Tester édition blog**
- Créer un nouvel article de blog via Studio
- Vérifier que le fichier est créé dans `/content/blog/`
- Vérifier que le frontmatter est correct
- Vérifier que l'article apparaît sur le site

**Étape 3.3: Tester édition events**
- Créer un nouvel événement via Studio
- Vérifier que le fichier est créé dans `/content/events/`
- Vérifier que le frontmatter est correct
- Vérifier que l'événement apparaît sur le site

### Phase 4: Gestion des Images

**Étape 4.1: Vérifier structure dossiers**
```bash
mkdir -p public/blog/images
mkdir -p public/events/images
```

**Étape 4.2: Tester upload images**
- Uploader une image depuis Studio
- Vérifier que l'image est sauvegardée dans le bon dossier
- Vérifier que le chemin est inséré correctement dans le Markdown
- Vérifier que l'image s'affiche correctement sur le site

### Phase 5: Synchronisation Git

**Étape 5.1: Tester commits automatiques**
- Créer/modifier un article via Studio
- Vérifier qu'un commit est créé sur GitHub
- Vérifier que le message de commit est descriptif
- Vérifier que les modifications sont sur la branche `main`

**Étape 5.2: Gestion des conflits**
- Documenter le workflow pour éviter les conflits
- Tester un scénario de conflit (modification manuelle + Studio)
- Documenter la résolution

### Phase 6: Validation Locale Complète (OBLIGATOIRE)

**⚠️ IMPORTANT** : Cette phase doit être complétée AVANT de considérer le déploiement en production.

**Étape 6.1: Checklist de validation locale**
- [ ] Toutes les fonctionnalités testées et fonctionnelles en local
- [ ] Authentification OAuth fonctionne correctement
- [ ] Édition blog fonctionne sans erreur
- [ ] Édition events fonctionne sans erreur
- [ ] Upload d'images fonctionne correctement
- [ ] Synchronisation Git fonctionne (commits créés)
- [ ] Aucune régression sur les fonctionnalités existantes
- [ ] Documentation technique créée
- [ ] Tests manuels complets effectués

**Étape 6.2: Décision de déploiement**
- Si toutes les validations passent → Procéder à Phase 7 (Déploiement)
- Si problèmes persistants → Documenter et utiliser Studio uniquement en local

### Phase 7: Déploiement en Production (CONDITIONNEL)

**⚠️ PRÉREQUIS** : Phase 6 complétée avec succès. Ne déployer que si tout fonctionne en local.

**Étape 7.1: Vérifier compatibilité cPanel avec SSR**

**Option A: cPanel supporte Node.js/SSR**
- Configurer Node.js dans cPanel
- Configurer les variables d'environnement
- Déployer avec route SSR pour `/studio`
- Tester l'accès à Studio en production

**Option B: cPanel ne supporte pas SSR**
- **Recommandation** : Utiliser Studio uniquement en développement local
- Workflow alternatif : Éditer le contenu en local avec Studio, puis déployer via Git
- Alternative : Déploiement hybride (site statique sur cPanel, Studio sur Vercel/Netlify)

**Étape 7.2: Configuration variables d'environnement production**
- Configurer `STUDIO_GITHUB_CLIENT_ID` sur cPanel (ou plateforme SSR)
- Configurer `STUDIO_GITHUB_CLIENT_SECRET` sur cPanel (ou plateforme SSR)
- Vérifier que les variables sont sécurisées (non exposées publiquement)

**Étape 7.3: Tester en production**
- Accéder à `https://www.femat.ml/studio`
- Vérifier l'authentification GitHub
- Tester la création/modification d'un article
- Vérifier la synchronisation Git

### Phase 8: Documentation et Formation

**Étape 8.1: Documentation technique**
- Documenter la configuration Studio
- Documenter la configuration OAuth
- Documenter le déploiement (si Phase 7 complétée)
- Documenter le dépannage
- Documenter le workflow local vs production

**Étape 8.2: Guide utilisateur équipe éditoriale**
- Créer guide d'utilisation Studio (local)
- Documenter le workflow de publication
- Documenter la gestion des images
- Documenter la résolution de problèmes courants
- Si production déployée : Guide pour utilisation en production

**Étape 8.3: Formation équipe**
- Présenter Studio à l'équipe éditoriale
- Faire une démonstration pratique (en local)
- Répondre aux questions
- Former sur le workflow de publication

## Implementation Details

### Configuration Nuxt Studio

**Fichier `nuxt.config.ts`** (modifications):
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    'nuxt-studio'  // Ajouté
  ],
  
  // Configuration Studio
  studio: {
    route: '/studio',
    repository: {
      provider: 'github',
      owner: 'KATBlackCoder',  // À vérifier
      repo: 'Femat',           // À vérifier
      branch: 'main'
    }
  },
  
  // Configuration hybride SSG/SSR
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      // Exclure Studio du pré-rendu (nécessite SSR pour OAuth)
      exclude: ['/studio', '/studio/**']
    }
  },
  
  // ... reste de la config existante
})
```

### Variables d'Environnement

**Fichier `.env.example`** (ajout):
```env
# Nuxt Content Studio
STUDIO_GITHUB_CLIENT_ID=your_client_id_here
STUDIO_GITHUB_CLIENT_SECRET=your_client_secret_here
```

**Fichier `.env.local`** (créer pour développement):
```env
STUDIO_GITHUB_CLIENT_ID=your_client_id_here
STUDIO_GITHUB_CLIENT_SECRET=your_client_secret_here
```

### Structure des Collections

Les collections existantes (`blog` et `events`) sont déjà configurées dans `content.config.ts`. Studio les détectera automatiquement et permettra leur édition.

**Collections supportées**:
- `blog` - Articles de blog dans `/content/blog/`
- `events` - Événements dans `/content/events/`

### Déploiement

**Scénario 1: cPanel supporte SSR**
1. Configurer Node.js dans cPanel
2. Configurer variables d'environnement
3. Déployer avec `pnpm build` (génère SSG + route SSR pour Studio)
4. Uploader `.output/` sur cPanel

**Scénario 2: cPanel ne supporte pas SSR (déploiement hybride)**
1. Site statique: Générer avec `pnpm generate` et uploader sur cPanel
2. Studio: Déployer sur Vercel/Netlify avec configuration SSR
3. Configurer domaine pour pointer vers les deux plateformes
4. Alternative: Utiliser Studio uniquement en développement, workflow manuel pour production

## Dependencies

- ✅ Site web de base (001-site-web-femat) - Complété
- ✅ Blog & Actualités (002-blog-actualites) - Complété
- ✅ Restructuration Content (006-restructuration-content) - Complété
- ✅ Déploiement cPanel (003-deploiement-cpanel) - Complété
- ✅ Module `@nuxt/content` - Déjà installé (v3.8.2)
- ⏳ Module `nuxt-studio` - À installer
- ✅ Compte GitHub avec repository - Existant
- ⏳ Application OAuth GitHub - À créer

## Open Questions

- [ ] Le cPanel supporte-t-il Node.js/SSR pour la route Studio ?
- [ ] Si non, faut-il considérer un déploiement hybride (Vercel pour Studio, cPanel pour site statique) ?
- [ ] Qui seront les utilisateurs autorisés à accéder à Studio ?
- [ ] Faut-il créer une documentation spécifique pour l'équipe éditoriale ?
- [ ] Comment gérer les conflits Git si quelqu'un édite manuellement pendant qu'un autre utilise Studio ?

## Next Steps - Approche Local d'Abord

### Étapes Prioritaires (Développement Local)
1. ⏳ Installer le module `nuxt-studio`
2. ⏳ Configurer `nuxt.config.ts` avec les informations du repository
3. ⏳ Créer l'application OAuth GitHub (pour développement local)
4. ⏳ Configurer les variables d'environnement locales (`.env.local`)
5. ⏳ Tester Studio en développement local (`http://localhost:3000/studio`)
6. ⏳ Valider toutes les fonctionnalités en local :
   - Authentification OAuth
   - Édition blog
   - Édition events
   - Upload d'images
   - Synchronisation Git
7. ⏳ Documenter les résultats et problèmes rencontrés

### Étapes Conditionnelles (Production)
8. ⏳ **SEULEMENT SI** toutes les validations locales passent
9. ⏳ Vérifier compatibilité cPanel avec SSR
10. ⏳ Décider de la stratégie de déploiement (SSR sur cPanel ou workflow local uniquement)
11. ⏳ Si déploiement : Configurer variables d'environnement production
12. ⏳ Si déploiement : Tester en production
13. ⏳ Documenter pour l'équipe éditoriale

## Progression Actuelle

**Phase 0: Research & Planning** ✅ Complétée
- Documentation Nuxt Content Studio consultée
- Architecture technique définie
- Défis identifiés (SSR sur cPanel)

**Phase 1: Installation et Configuration** ⏳ En attente
- Module à installer
- Configuration à ajouter

**Phase 2: Configuration OAuth** ⏳ En attente
- Application OAuth à créer
- Variables d'environnement à configurer

**Phase 3-5: Tests Locaux** ⏳ En attente
- Tests d'édition blog et events
- Tests upload d'images
- Tests synchronisation Git

**Phase 6: Validation Locale** ⏳ En attente
- Checklist de validation complète
- Décision de déploiement

**Phase 7: Déploiement Production** ⏳ Conditionnel
- Dépend de la validation locale
- Peut être reporté si problèmes ou incompatibilité cPanel

**Phase 8: Documentation** ⏳ En attente

