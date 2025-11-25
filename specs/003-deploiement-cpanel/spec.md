# Feature Specification: Déploiement avec cPanel

**Feature ID**: `003-deploiement-cpanel`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P1 (Critique - nécessaire pour mise en ligne)

## Overview

Configuration et déploiement du site web FEMAT sur un hébergement cPanel avec génération statique (SSG), configuration des fichiers `.htaccess` pour le routing, et optimisation pour la production.

## Context

Le site web FEMAT est prêt pour la mise en production. L'hébergement cPanel a été choisi car :
- Le domaine `femat.ml` est déjà configuré sur cPanel
- Hébergement web traditionnel avec support cPanel
- Contrôle total sur les fichiers et la configuration
- Support des sites statiques et applications Node.js si nécessaire

## Functional Requirements

### FR-1: Configuration Nuxt pour SSG (Static Site Generation)
**Description**: Configurer Nuxt pour générer un site statique compatible avec cPanel.

**Acceptance Criteria**:
- [ ] Mode SSG configuré (`nitro.prerender` avec `crawlLinks: true`)
- [ ] Toutes les routes pré-rendues correctement
- [ ] Build génère les fichiers dans `.output/public`
- [ ] Optimisations de production activées
- [ ] Source maps désactivées en production
- [ ] Minification activée

### FR-2: Génération des Fichiers Statiques
**Description**: Générer les fichiers statiques du site pour le déploiement.

**Acceptance Criteria**:
- [ ] Commande `pnpm generate` fonctionne sans erreurs
- [ ] Tous les fichiers HTML générés dans `.output/public`
- [ ] Assets (CSS, JS, images) correctement copiés
- [ ] Routes dynamiques pré-rendues (blog, événements)
- [ ] Fichiers `.html` générés pour chaque route

### FR-3: Configuration `.htaccess` pour Routing
**Description**: Configurer le fichier `.htaccess` pour gérer le routing côté client de Nuxt.

**Acceptance Criteria**:
- [ ] Fichier `.htaccess` créé à la racine
- [ ] Rewrite rules configurées pour rediriger vers `index.html`
- [ ] Support des routes SPA (Single Page Application)
- [ ] Gestion des erreurs 404
- [ ] Headers de sécurité configurés
- [ ] Cache headers pour les assets statiques

### FR-4: Upload des Fichiers sur cPanel
**Description**: Téléverser les fichiers générés sur le serveur cPanel.

**Acceptance Criteria**:
- [ ] Accès au Gestionnaire de fichiers cPanel
- [ ] Navigation vers le répertoire racine (`public_html` ou sous-domaine)
- [ ] Upload de tous les fichiers de `.output/public`
- [ ] Structure de fichiers préservée
- [ ] Permissions de fichiers correctes

### FR-5: Configuration du Domaine
**Description**: Configurer le domaine `femat.ml` pour pointer vers le site.

**Acceptance Criteria**:
- [ ] Domaine configuré dans cPanel
- [ ] DNS configuré correctement
- [ ] Site accessible sur `https://www.femat.ml`
- [ ] Redirection `www` vers domaine principal (ou inversement)
- [ ] HTTPS configuré (certificat SSL)

### FR-6: Optimisations de Performance
**Description**: Optimiser les performances pour la production.

**Acceptance Criteria**:
- [ ] Images optimisées (formats modernes: AVIF, WebP)
- [ ] Assets statiques compressés
- [ ] Cache headers configurés dans `.htaccess`
- [ ] Score Lighthouse > 90
- [ ] Temps de chargement optimisé

### FR-7: Vérification Post-Déploiement
**Description**: Vérifier que le site fonctionne correctement après déploiement.

**Acceptance Criteria**:
- [ ] Toutes les pages accessibles
- [ ] Navigation fonctionnelle
- [ ] Images et assets chargent correctement
- [ ] Routes dynamiques fonctionnent (blog, événements)
- [ ] Formulaire de contact fonctionne (si applicable)
- [ ] Performance vérifiée (Lighthouse)

## Non-Functional Requirements

### NFR-1: Performance
- Score Lighthouse > 90
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3.8s
- Taille totale du site optimisée

### NFR-2: Disponibilité
- Site accessible 24/7
- Temps de réponse serveur < 500ms
- Gestion des erreurs 404 appropriée

### NFR-3: Sécurité
- HTTPS obligatoire
- Headers de sécurité configurés
- Protection contre les attaques courantes (XSS, clickjacking)
- Pas d'informations sensibles exposées

### NFR-4: Compatibilité
- Compatible avec tous les navigateurs modernes
- Responsive sur tous les appareils
- Accessibilité WCAG 2.1 AA

## Technical Considerations

### Configuration Nuxt pour SSG

**Configuration actuelle** (`nuxt.config.ts`):
```typescript
nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true // Pré-rendre toutes les routes trouvées automatiquement
  }
}
```

Cette configuration est déjà correcte pour SSG avec Nuxt Content. Nuxt Content nécessite un serveur pour accéder aux fichiers Markdown, donc `ssr: false` n'est pas utilisé. À la place, `nitro.prerender` avec `crawlLinks: true` pré-rend toutes les routes automatiquement.

### Génération des Fichiers Statiques

**Commande de génération**:
```bash
pnpm generate
```

Cette commande :
1. Build l'application Nuxt
2. Pré-rend toutes les routes trouvées
3. Génère les fichiers statiques dans `.output/public`
4. Copie tous les assets nécessaires

**Structure des fichiers générés**:
```
.output/public/
├── index.html
├── about.html
├── blog/
│   ├── index.html
│   └── [slug]/
│       └── article.html
├── events/
│   ├── index.html
│   └── [slug]/
│       └── event.html
├── _nuxt/          # Assets JS/CSS
└── [assets]        # Images, fonts, etc.
```

### Configuration `.htaccess`

**Fichier `.htaccess` à créer**:
```apache
# Activer le moteur de réécriture
RewriteEngine On
RewriteBase /

# Rediriger vers HTTPS (optionnel mais recommandé)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Rediriger www vers non-www (ou inversement selon préférence)
# RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
# RewriteRule ^(.*)$ https://%1/$1 [R=301,L]

# Si le fichier ou dossier existe, l'utiliser directement
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d

# Sinon, rediriger vers index.html pour le routing côté client
RewriteRule . /index.html [L]

# Headers de sécurité
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache pour les assets statiques
<IfModule mod_expires.c>
  ExpiresActive On
  
  # Images
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  
  # CSS et JavaScript
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType text/javascript "access plus 1 year"
  
  # Fonts
  ExpiresByType font/woff "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
  ExpiresByType application/font-woff "access plus 1 year"
  ExpiresByType application/font-woff2 "access plus 1 year"
  
  # HTML (pas de cache pour les pages HTML)
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Compression GZIP
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### Upload sur cPanel

**Important** : Pour un site statique (SSG), nous n'utilisons **PAS** le Gestionnaire d'applications (Application Manager). Nous utilisons uniquement le **File Manager** pour uploader les fichiers statiques.

**Méthodes d'upload**:
1. **File Manager cPanel** (recommandé pour petits sites)
   - Accéder à cPanel → **Files** → **File Manager**
   - Naviguer vers `public_html` (ou répertoire du domaine)
   - Upload des fichiers via interface web
   - Documentation : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

2. **FTP/SFTP** (recommandé pour gros sites)
   - Utiliser un client FTP (FileZilla, WinSCP, etc.)
   - Se connecter avec les identifiants cPanel
   - Upload du contenu de `.output/public`
   - Documentation : [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)

3. **SSH + Git** (si disponible)
   - Cloner le repository sur le serveur
   - Exécuter `pnpm install` et `pnpm generate`
   - Copier les fichiers de `.output/public` vers `public_html`
   - Documentation : [cPanel Terminal](https://docs.cpanel.net/cpanel/advanced/terminal/)

### Configuration du Domaine

**Dans cPanel**:
1. Accéder à **Domains** → **Domains** ou **Subdomains**
   - Documentation : [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/)
   - Documentation : [cPanel Subdomains](https://docs.cpanel.net/cpanel/domains/subdomains/)
2. Vérifier que `femat.ml` est configuré
3. Vérifier le répertoire racine (généralement `public_html` ou `public_html/femat.ml`)

**Configuration DNS** (si nécessaire):
- Enregistrement A pointant vers l'IP du serveur
- Enregistrement CNAME pour www (si utilisé)
- Documentation : [cPanel DNS Zone Editor](https://docs.cpanel.net/cpanel/domains/dns-zone-editor/)

**Certificat SSL**:
- Utiliser **Security** → **SSL/TLS Status** → **Let's Encrypt** dans cPanel (gratuit)
- Activer le renouvellement automatique
- Documentation : [cPanel Let's Encrypt](https://docs.cpanel.net/cpanel/security/lets-encrypt/)

### Variables d'Environnement

Pour un site statique (SSG), les variables d'environnement ne sont généralement pas nécessaires car tout est pré-rendu. Cependant, si des variables sont utilisées dans le code, elles doivent être définies au moment du build (`pnpm generate`).

**Note**: Les variables d'environnement doivent être définies localement avant la génération, ou via un script de build sur le serveur.

## Design Guidelines

- **Simplicité**: Déploiement simple et direct avec fichiers statiques
- **Performance**: Optimisations maximales pour vitesse de chargement
- **Sécurité**: Headers de sécurité configurés dans `.htaccess`
- **Maintenabilité**: Processus de déploiement documenté et reproductible

## Out of Scope (v1.0)

- Configuration d'une application Node.js sur cPanel (si SSG, pas nécessaire)
- CI/CD automatisé (peut être ajouté plus tard)
- Déploiement automatique via Git (nécessite configuration SSH)
- Monitoring avancé avec services tiers
- CDN externe (peut être ajouté plus tard)

## Dependencies

- Compte cPanel avec accès FTP/SFTP ou Gestionnaire de fichiers
- Domaine `femat.ml` configuré
- Code Nuxt.js prêt pour production
- Node.js et pnpm installés localement pour la génération

## Open Questions

- [ ] Quel est le répertoire racine exact sur cPanel ? (`public_html` ou `public_html/femat.ml`)
- [ ] Faut-il configurer une redirection www → non-www ou inversement ?
- [ ] Le certificat SSL est-il déjà configuré ?
- [ ] Y a-t-il accès SSH pour automatiser le déploiement ?
- [ ] Faut-il configurer un sous-domaine pour les tests (ex: `staging.femat.ml`) ?

## Implementation Plan

1. **Étape 1**: Préparer le projet pour la production
   - Vérifier la configuration Nuxt (`nuxt.config.ts`)
   - Tester le build local (`pnpm generate`)
   - Vérifier que tous les fichiers sont générés correctement

2. **Étape 2**: Créer le fichier `.htaccess`
   - Créer le fichier avec les règles de réécriture
   - Configurer les headers de sécurité
   - Configurer le cache pour les assets

3. **Étape 3**: Générer les fichiers statiques
   - Exécuter `pnpm generate`
   - Vérifier le contenu de `.output/public`
   - Copier le fichier `.htaccess` dans `.output/public`

4. **Étape 4**: Upload sur cPanel
   - Accéder au Gestionnaire de fichiers cPanel
   - Naviguer vers le répertoire racine
   - Upload de tous les fichiers de `.output/public`

5. **Étape 5**: Configuration du domaine
   - Vérifier la configuration du domaine dans cPanel
   - Configurer le certificat SSL si nécessaire
   - Vérifier les redirections

6. **Étape 6**: Tests et vérifications
   - Tester toutes les pages du site
   - Vérifier la navigation
   - Vérifier les performances (Lighthouse)
   - Vérifier le HTTPS

## Success Criteria

- [ ] Site déployé et accessible sur `https://www.femat.ml`
- [ ] Toutes les pages fonctionnent correctement
- [ ] Navigation et routing fonctionnels
- [ ] Images et assets chargent correctement
- [ ] Score Lighthouse > 90
- [ ] HTTPS configuré et fonctionnel
- [ ] Headers de sécurité configurés
- [ ] Performance optimale

## Checklist de Déploiement

### Avant le Déploiement
- [ ] Code prêt pour production
- [ ] `nuxt.config.ts` configuré pour SSG
- [ ] Tests locaux réussis (`pnpm generate`)
- [ ] Build fonctionne sans erreurs
- [ ] Fichier `.htaccess` créé et testé

### Configuration cPanel
- [ ] Accès au File Manager cPanel (Files → File Manager)
- [ ] Répertoire racine identifié (`public_html` ou `public_html/femat.ml`)
- [ ] Domaine configuré dans cPanel (Domains → Domains)
- [ ] Certificat SSL configuré (Security → SSL/TLS Status → Let's Encrypt)

### Upload des Fichiers
- [ ] Fichiers générés dans `.output/public`
- [ ] Fichier `.htaccess` inclus
- [ ] Tous les fichiers uploadés sur cPanel
- [ ] Structure de fichiers préservée
- [ ] Permissions de fichiers correctes

### Après le Déploiement
- [ ] Site accessible sur `https://www.femat.ml`
- [ ] Toutes les pages fonctionnent
- [ ] Images et assets chargent correctement
- [ ] Navigation fonctionnelle
- [ ] Routes dynamiques fonctionnent (blog, événements)
- [ ] Performance vérifiée (Lighthouse)
- [ ] HTTPS fonctionne
- [ ] Headers de sécurité vérifiés

## Ressources

### Documentation Nuxt
- [Nuxt SSG Deployment](https://nuxt.com/docs/getting-started/deployment#static-hosting)
- [Nuxt Static Site Generation](https://nuxt.com/docs/guide/concepts/static-site-generation)

### Documentation cPanel
- [cPanel Documentation Home](https://docs.cpanel.net/)
- [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)
- [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)
- [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/)
- [cPanel Subdomains](https://docs.cpanel.net/cpanel/domains/subdomains/)
- [cPanel DNS Zone Editor](https://docs.cpanel.net/cpanel/domains/dns-zone-editor/)
- [cPanel Let's Encrypt SSL](https://docs.cpanel.net/cpanel/security/lets-encrypt/)
- [cPanel Terminal](https://docs.cpanel.net/cpanel/advanced/terminal/)

### Apache et .htaccess
- [Apache .htaccess Guide](https://httpd.apache.org/docs/current/howto/htaccess.html)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

## Notes

- **SSG avec Nuxt Content**: Utiliser `nitro.prerender` avec `crawlLinks: true` au lieu de `ssr: false` pour préserver les fonctionnalités de Nuxt Content
- **Fichier `.htaccess`**: Essentiel pour le routing côté client de Nuxt en mode statique
- **Génération locale**: Générer les fichiers statiques localement avant l'upload (plus rapide et plus fiable)
- **Cache**: Configurer le cache pour les assets statiques pour améliorer les performances
- **HTTPS**: Utiliser Let's Encrypt (gratuit) pour le certificat SSL
- Le site est déjà accessible sur `https://www.femat.ml` avec un message "Site will launch soon"

