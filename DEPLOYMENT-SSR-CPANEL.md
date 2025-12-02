# Guide de Déploiement SSR avec Nuxt Studio sur cPanel

**Date**: 2025-12-02  
**Domaine**: https://www.femat.ml  
**Route Studio**: `/admin`

## Vue d'ensemble

Ce guide détaille les étapes complètes pour déployer une application Nuxt avec SSR hybride (SSG + SSR) sur cPanel avec CloudLinux Node.js Selector, permettant l'utilisation de Nuxt Studio pour éditer le contenu en production.

## Architecture

- **Pages publiques** : SSG (Static Site Generation) - servies depuis `public_html`
- **Route `/admin`** : SSR (Server-Side Rendering) - servie par Node.js via CloudLinux Node.js Selector
- **Nuxt Studio** : Interface d'administration accessible sur `/admin` avec authentification GitHub OAuth

---

## Phase 1 : Préparation Locale

### 1.1 Configuration Nuxt

Vérifiez que `nuxt.config.ts` contient :

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/image', '@nuxt/content', 'nuxt-studio'],
  
  // Configuration hybride SSG/SSR
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true // Pré-rendre toutes les routes trouvées automatiquement
      // La route /admin sera automatiquement exclue du pré-rendu (nécessite SSR)
    }
  },
  
  // Configuration Nuxt Studio (route personnalisée: /admin)
  studio: {
    route: '/admin',
    repository: {
      provider: 'github',
      owner: 'KATBlackCoder',
      repo: 'Femat',
      branch: 'main'
    }
  }
})
```

### 1.2 Variables d'environnement

Créez un fichier `.env` local (ne pas commiter) :

```env
STUDIO_GITHUB_CLIENT_ID=Ov23licqq166dbfg4JGz
STUDIO_GITHUB_CLIENT_SECRET=ee0648b116f080c35132fd0e70054ecff9e73fd6
```

### 1.3 Build avec SSR

Générez le build avec SSR activé :

```bash
pnpm build
```

Cela crée :
- `.output/public/` → Pages statiques (SSG)
- `.output/server/` → Serveur SSR pour `/admin`

---

## Phase 2 : Configuration OAuth GitHub

### 2.1 Créer l'application OAuth GitHub

1. Accédez à GitHub → **Settings** → **Developer settings** → **OAuth Apps**
2. Cliquez sur **New OAuth App**
3. Remplissez :
   - **Application name** : `FEMAT Nuxt Studio`
   - **Homepage URL** : `https://www.femat.ml`
   - **Authorization callback URL** : `https://www.femat.ml/admin/auth/callback`
4. Cliquez sur **Register application**
5. Copiez le **Client ID** et **Client Secret**

### 2.2 Variables d'environnement

Notez ces valeurs pour la configuration dans cPanel :
- `STUDIO_GITHUB_CLIENT_ID`
- `STUDIO_GITHUB_CLIENT_SECRET`

---

## Phase 3 : Upload sur cPanel

### 3.1 Upload des fichiers statiques (SSG)

1. Accédez à cPanel → **File Manager**
2. Naviguez vers `public_html`
3. Uploader **tout le contenu** de `.output/public/` dans `public_html/`
   - Tous les fichiers HTML
   - Le dossier `_nuxt/` (assets JS/CSS)
   - Les images et autres assets
4. Copiez aussi le fichier `.htaccess` dans `public_html/`

### 3.2 Upload du serveur Node.js (SSR)

1. Dans File Manager, créez un dossier à la racine : `/home/femat/server/`
2. Uploader **tout le contenu** de `.output/server/` dans `/home/femat/server/`
   - `index.mjs`
   - `package.json`
   - **IMPORTANT** : Ne pas uploader `node_modules/` (CloudLinux le gérera)

### 3.3 Vérification

Assurez-vous que `/home/femat/server/` contient :
- ✅ `index.mjs`
- ✅ `package.json`
- ❌ **PAS** de `node_modules/` (sera créé par CloudLinux)

---

## Phase 4 : Configuration CloudLinux Node.js Selector

### 4.1 Accéder à Node.js Selector

1. Dans cPanel, accédez à **Node.js Selector** (ou **Application Manager**)
2. Si une application existe déjà pour `/home/femat/server/`, cliquez sur l'icône **Edit** (crayon)
3. Sinon, cliquez sur **CREATE APPLICATION**

### 4.2 Configuration de l'application

Configurez les paramètres suivants :

- **Node.js version** : `24.6.0` (ou version recommandée)
- **Application mode** : `Production`
- **Application root** : `/home/femat/server` (chemin complet)
- **Application URL** : `/admin` (ou `/` si vous voulez que Node.js gère toutes les routes)
- **Application startup file** : `index.mjs`
- **Passenger log file** : `/home/femat/logs/passenger.log` (optionnel)

### 4.3 Variables d'environnement

Dans la section **Environment Variables**, ajoutez :

```
STUDIO_GITHUB_CLIENT_ID=Ov23licqq166dbfg4JGz
STUDIO_GITHUB_CLIENT_SECRET=ee0648b116f080c35132fd0e70054ecff9e73fd6
NODE_ENV=production
```

### 4.4 Installation des dépendances

1. Cliquez sur **Run NPM Install**
   - CloudLinux créera automatiquement l'environnement virtuel
   - Installera les dépendances dans l'environnement virtuel
   - Créera un symlink `node_modules` pointant vers l'environnement virtuel

**⚠️ Important** : Si vous avez une erreur "node_modules already exists", supprimez le dossier `node_modules` dans `/home/femat/server/` avant de cliquer sur "Run NPM Install".

**⚠️ Erreur EBADPLATFORM** : Si vous avez une erreur concernant `@img/sharp-libvips-linuxmusl-x64` (plateforme non supportée), c'est normal. Ce package est pour Alpine Linux (musl), mais votre serveur utilise glibc. Vous pouvez :

**Option A** : Installer en ignorant les erreurs de plateforme (recommandé)
- Dans cPanel Node.js Selector, après l'erreur, utilisez SSH pour exécuter :
  ```bash
  cd /home/femat/server
  npm install --ignore-scripts --no-optional
  ```
- Ou modifiez `package.json` pour exclure les dépendances optionnelles problématiques

**Option B** : Forcer l'installation
- Utilisez SSH pour exécuter :
  ```bash
  cd /home/femat/server
  npm install --force
  ```

**Note** : Cette erreur n'empêche généralement pas l'application de fonctionner, car `sharp` utilisera automatiquement la bonne version pour votre plateforme (glibc).

### 4.5 Démarrer l'application

1. Cliquez sur l'icône **Start** (play) ou **Restart** (flèche circulaire)
2. Vérifiez que le statut affiche **started (v24.6.0)**

---

## Phase 5 : Configuration `.htaccess` (si nécessaire)

### 5.1 Vérification automatique

Si CloudLinux Node.js Selector configure automatiquement le reverse proxy, vous n'avez **rien à faire**.

### 5.2 Configuration manuelle (si nécessaire)

Si `/admin` retourne une erreur 404, ajoutez dans `public_html/.htaccess` **AVANT** la règle de routing côté client :

```apache
# Reverse proxy pour /admin (route SSR Node.js)
# Remplacez PORT par le port assigné par Node.js Selector
RewriteCond %{REQUEST_URI} ^/admin
RewriteRule ^(.*)$ http://localhost:PORT$1 [P,L]
```

**Note** : Le port est généralement visible dans l'interface Node.js Selector ou dans les logs.

### 5.3 Modules Apache requis

Assurez-vous que ces modules sont activés (contactez votre hébergeur si nécessaire) :
- `mod_proxy`
- `mod_proxy_http`
- `mod_rewrite`

---

## Phase 6 : Vérification et Tests

### 6.1 Test du site statique

1. Accédez à `https://www.femat.ml`
2. Vérifiez que toutes les pages fonctionnent correctement
3. Vérifiez que les assets (CSS, JS, images) se chargent

### 6.2 Test de Nuxt Studio

1. Accédez à `https://www.femat.ml/admin`
2. Vous devriez être redirigé vers l'authentification GitHub OAuth
3. Autorisez l'application OAuth
4. Vous serez redirigé vers l'interface Nuxt Studio

### 6.3 Test de l'édition de contenu

1. Dans Nuxt Studio, testez la création/modification d'un article de blog
2. Vérifiez que les modifications sont sauvegardées
3. Vérifiez que les modifications apparaissent sur le site

---

## Dépannage

### Problème : Erreur 404 sur `/admin`

**Solutions** :
1. Vérifiez que l'application Node.js est démarrée dans cPanel
2. Vérifiez que l'Application URL est bien `/admin`
3. Vérifiez la configuration du reverse proxy dans `.htaccess`
4. Vérifiez les logs dans `/home/femat/logs/passenger.log`

### Problème : "node_modules already exists"

**Solution** :
1. Supprimez le dossier `node_modules` dans `/home/femat/server/`
2. Cliquez sur "Run NPM Install" dans cPanel
3. CloudLinux créera le symlink automatiquement

### Problème : Erreur EBADPLATFORM avec @img/sharp-libvips-linuxmusl-x64

**Cause** : Le package est pour Alpine Linux (musl), mais le serveur utilise glibc.

**Solutions** :

**Option 1** : Installer via SSH en ignorant les erreurs (recommandé)

**Étape 1** : Accéder à SSH via cPanel

Selon la [documentation officielle cPanel](https://docs.cpanel.net/cpanel/security/ssh-access/#connect-to-your-server-via-ssh), vous avez plusieurs options :

**A. Terminal intégré cPanel (RECOMMANDÉ - si disponible)**
- Dans cPanel, cherchez "Terminal" dans la barre de recherche
- Si disponible, utilisez-le directement (pas besoin de connexion externe)
- C'est la solution la plus simple et évite les problèmes de firewall

**B. SSH Access dans cPanel - Vérifier les informations**

**Où trouver l'hostname et le port SSH** :

1. **Dans cPanel → Security → SSH Access**
   - Les informations de connexion peuvent être affichées en haut de la page
   - Cherchez "Connection Information" ou "SSH Connection Details"

2. **Dans cPanel → Server Information** (ou **Server Status**)
   - L'hostname du serveur est généralement affiché
   - Format : `server.femat.ml` ou une IP comme `192.0.2.0`

3. **Dans cPanel → Account Information**
   - L'hostname peut être affiché dans les détails du compte

4. **Dans l'email de bienvenue de votre hébergeur**
   - Les informations de connexion SSH sont souvent mentionnées

**Informations à noter** :
  - **Hostname** : peut être différent de `femat.ml` (ex: `server.femat.ml`, `femat.ml`, ou une IP)
  - **Port** : peut être différent de `22` (ex: `2222`, `2200`, etc.)
  - **Username** : `femat` (confirmé)

**C. Si "Connection timed out"**
- Le port 22 est peut-être bloqué par le firewall
- Vérifiez dans cPanel → SSH Access le port réel à utiliser
- Certains hébergeurs utilisent un port non-standard (2222, 2200, etc.)
- Contactez votre hébergeur pour confirmer le port SSH et l'accès externe

**C. Connexion depuis votre terminal local**

**Trouver votre nom d'utilisateur cPanel** :

1. **Méthode 1** : Dans cPanel, regardez en haut à droite
   - Le nom d'utilisateur est généralement affiché dans l'en-tête
   - Format : `femat` ou `femat_xxx` (où xxx est un identifiant)

2. **Méthode 2** : Dans cPanel → **SSH Access**
   - Les informations de connexion peuvent être affichées
   - Ou regardez dans les logs/notifications

3. **Méthode 3** : Vérifiez l'email de bienvenue de votre hébergeur
   - Le nom d'utilisateur cPanel est généralement mentionné dans l'email de création de compte

4. **Méthode 4** : Dans cPanel → **User Manager** ou **Account Information**
   - Votre nom d'utilisateur principal est affiché

**Sur macOS ou Linux** :

**Méthode 1 : Utiliser l'IP du serveur** (recommandé si le domaine ne fonctionne pas)
```bash
# Utilisez l'IP partagée trouvée dans Server Information
ssh -p 22 femat@196.200.59.135

# Ou avec votre clé SSH
ssh -p 22 -i ~/.ssh/id_rsa femat@196.200.59.135
```

**Méthode 2 : Utiliser le domaine**
```bash
# Si le port est 22 (par défaut) :
ssh -p 22 femat@femat.ml

# Si le port est différent (ex: 2222) :
ssh -p 2222 femat@femat.ml
```

**Méthode 3 : Utiliser le nom du serveur**
```bash
# Basé sur Server Name: cpanel01
ssh -p 22 femat@cpanel01
# ou
ssh -p 22 femat@cpanel01.femat.ml
```

**⚠️ Si "Connection timed out"** :
1. Utilisez le **Terminal intégré cPanel** (Option A) - c'est la meilleure solution
2. Vérifiez le port SSH dans cPanel → SSH Access
3. Contactez votre hébergeur pour activer l'accès SSH externe si nécessaire

**Note** : Le nom d'utilisateur est souvent le même que le nom de domaine principal ou un préfixe de celui-ci. Pour `femat.ml`, il est probablement `femat` ou similaire.

**Sur Windows** :
- Utilisez PuTTY (téléchargeable depuis [putty.org](https://www.putty.org/))
- Entrez le hostname : `femat.ml`
- Port : `22` (ou le port spécifié par votre hébergeur)
- Cliquez sur "Open"
- Entrez votre nom d'utilisateur et mot de passe cPanel

**Étape 2** : Installer les dépendances
```bash
cd /home/femat/server
npm install --ignore-scripts --no-optional
```

**Explication des flags** :
- `--ignore-scripts` : Ignore les scripts post-install (évite les erreurs de compilation)
- `--no-optional` : Ignore les dépendances optionnelles (comme les packages musl pour Alpine Linux)

**Étape 3** : Redémarrer l'application
- Retournez dans cPanel → Node.js Selector
- Cliquez sur l'icône **Restart** (flèche circulaire) de votre application

**Option 2** : Forcer l'installation (si SSH disponible)

**Via Terminal cPanel ou SSH** :
```bash
cd /home/femat/server
npm install --force
```

**Note** : Cette option force l'installation même en cas d'erreurs de plateforme. Moins propre que l'Option 1, mais fonctionne généralement.

**Option 3** : Modifier package.json pour exclure les dépendances problématiques
- Éditez `/home/femat/server/package.json`
- Supprimez ou commentez les dépendances `@img/sharp-libvips-linuxmusl-*`
- Exécutez `npm install` à nouveau

**Note** : Cette erreur n'empêche généralement pas l'application de fonctionner. `sharp` utilisera automatiquement la version correcte pour votre plateforme.

### Problème : Erreur d'authentification OAuth

**Solutions** :
1. Vérifiez que les variables d'environnement sont correctement configurées
2. Vérifiez que l'URL de callback dans GitHub OAuth est : `https://www.femat.ml/admin/auth/callback`
3. Vérifiez les logs de l'application Node.js

### Problème : Le site statique ne fonctionne pas

**Solutions** :
1. Vérifiez que tous les fichiers de `.output/public/` sont dans `public_html/`
2. Vérifiez que `.htaccess` est présent dans `public_html/`
3. Vérifiez les permissions des fichiers (755 pour les dossiers, 644 pour les fichiers)

---

## Structure Finale sur le Serveur

```
/home/femat/
├── public_html/              # Fichiers statiques (SSG)
│   ├── index.html
│   ├── _nuxt/
│   ├── blog/
│   ├── events/
│   └── .htaccess
│
└── server/                   # Serveur Node.js (SSR pour /admin)
    ├── index.mjs
    ├── package.json
    └── node_modules -> /home/femat/nodevenv/server/24/... (symlink)
```

---

## Mise à Jour du Site

### Pour mettre à jour le contenu statique :

1. En local : `pnpm build`
2. Uploader le contenu de `.output/public/` dans `public_html/`
3. C'est tout ! Les pages statiques sont mises à jour

### Pour mettre à jour le serveur Node.js :

1. En local : `pnpm build`
2. Uploader le contenu de `.output/server/` dans `/home/femat/server/`
3. **Supprimer** `node_modules/` dans `/home/femat/server/` (si présent)
4. Dans cPanel : Cliquer sur **Run NPM Install**
5. Redémarrer l'application Node.js

### Pour mettre à jour via Nuxt Studio :

1. Accédez à `https://www.femat.ml/admin`
2. Connectez-vous avec GitHub
3. Éditez le contenu directement dans l'interface
4. Les modifications sont automatiquement commitées dans Git
5. **Note** : Pour que les modifications apparaissent sur le site, vous devrez peut-être régénérer les pages statiques avec `pnpm generate` ou `pnpm build`

---

## Sécurité

### ⚠️ Points importants :

1. **Ne jamais commiter** le fichier `.env` dans Git (déjà dans `.gitignore`)
2. Les variables d'environnement doivent être configurées uniquement dans cPanel
3. L'application OAuth GitHub doit avoir les bonnes permissions (accès au repository)
4. Utilisez HTTPS uniquement (déjà configuré dans `.htaccess`)

---

## Résumé des Commandes

```bash
# Build local avec SSR
pnpm build

# Génération statique uniquement (pour test)
pnpm generate

# Prévisualisation locale
pnpm preview
```

---

## Support

En cas de problème :
1. Vérifiez les logs dans `/home/femat/logs/passenger.log`
2. Vérifiez les logs de l'application Node.js dans cPanel
3. Vérifiez la documentation Nuxt Studio : https://content.nuxt.com/docs/studio/setup
4. Vérifiez la documentation CloudLinux Node.js Selector

---

**Dernière mise à jour** : 2025-12-02

