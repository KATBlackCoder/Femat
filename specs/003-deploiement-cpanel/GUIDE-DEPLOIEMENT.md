# Guide de Déploiement cPanel - Site FEMAT

**Date**: 2025-01-27  
**Domaine**: https://www.femat.ml

## Vue d'ensemble

Ce guide détaille les étapes pour déployer le site web FEMAT sur un hébergement cPanel en utilisant la génération statique (SSG) de Nuxt.

## Prérequis

- Compte cPanel avec accès FTP/SFTP ou Gestionnaire de fichiers
- Domaine `femat.ml` configuré dans cPanel
- Node.js et pnpm installés localement
- Accès SSH (optionnel mais recommandé)

## Étapes de Déploiement

### Étape 1: Préparation Locale

#### 1.1 Vérifier la Configuration

Vérifier que `nuxt.config.ts` est correctement configuré pour SSG :

```typescript
nitro: {
  prerender: {
    routes: ['/'],
    crawlLinks: true
  }
}
```

#### 1.2 Installer les Dépendances

```bash
pnpm install
```

#### 1.3 Tester le Build Local

```bash
pnpm generate
pnpm preview
```

Vérifier que le site fonctionne correctement en local avant de déployer.

### Étape 2: Génération des Fichiers Statiques

#### 2.1 Générer les Fichiers

```bash
pnpm generate
```

Cette commande génère tous les fichiers statiques dans `.output/public`.

#### 2.2 Vérifier les Fichiers Générés

```bash
# Vérifier la présence de index.html
ls -la .output/public/index.html

# Compter les fichiers HTML générés
find .output/public -name "*.html" | wc -l

# Vérifier la taille du build
du -sh .output/public
```

#### 2.3 Copier le Fichier `.htaccess`

Le fichier `.htaccess` doit être copié dans `.output/public` :

```bash
cp .htaccess .output/public/.htaccess
```

### Étape 3: Accès à cPanel

#### 3.1 Se Connecter à cPanel

1. Accéder à `https://www.femat.ml/cpanel` (ou l'URL fournie par l'hébergeur)
2. Se connecter avec les identifiants cPanel

**Documentation** : [cPanel Documentation](https://docs.cpanel.net/)

#### 3.2 Identifier le Répertoire Racine

Le répertoire racine peut être :
- `public_html` (domaine principal)
- `public_html/femat.ml` (sous-domaine ou addon domain)

**Comment vérifier** :
- Dans cPanel, aller dans **Domains** → **Domains** ou **Subdomains**
- Vérifier le répertoire associé à `femat.ml`
- Documentation : [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/) | [cPanel Subdomains](https://docs.cpanel.net/cpanel/domains/subdomains/)

### Étape 4: Sauvegarde des Fichiers Existants

**Important** : Sauvegarder les fichiers existants avant de les remplacer.

#### Option A: Via File Manager cPanel

1. Ouvrir **Files** → **File Manager** dans cPanel
2. Naviguer vers le répertoire racine (`public_html` ou `public_html/femat.ml`)
3. Sélectionner tous les fichiers existants
4. Cliquer sur **Compress** pour créer une archive
5. Renommer l'archive avec un timestamp (ex: `backup-2025-01-27.zip`)
6. Documentation : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

#### Option B: Via SSH

```bash
# Se connecter au serveur
ssh user@femat.ml

# Naviguer vers le répertoire
cd public_html

# Créer une sauvegarde
tar -czf backup-$(date +%Y%m%d).tar.gz .
```

### Étape 5: Upload des Fichiers

#### Option A: File Manager cPanel

**Important** : Pour un site statique (SSG), nous n'utilisons **PAS** le Gestionnaire d'applications (Application Manager). Nous utilisons uniquement le **File Manager**.

1. Ouvrir **Files** → **File Manager** dans cPanel
2. Naviguer vers le répertoire racine (`public_html` ou `public_html/femat.ml`)
3. Supprimer les fichiers existants (sauf la sauvegarde)
4. Cliquer sur **Upload** dans la barre d'outils
5. Sélectionner tous les fichiers de `.output/public` (ou créer une archive ZIP)
6. Attendre la fin de l'upload
7. Si vous avez uploadé une archive ZIP, la sélectionner et cliquer sur **Extract** pour la décompresser

**Note** : Pour uploader un dossier complet, il est recommandé de créer une archive ZIP, l'uploader, puis la décompresser dans cPanel.

**Documentation** : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

#### Option B: FTP/SFTP

**Avec FileZilla** :

1. Ouvrir FileZilla
2. Se connecter avec :
   - **Hôte** : `ftp.femat.ml` ou l'IP du serveur
   - **Utilisateur** : Identifiant cPanel (ou créer un compte FTP dans cPanel)
   - **Mot de passe** : Mot de passe cPanel (ou mot de passe du compte FTP)
   - **Port** : 21 (FTP) ou 22 (SFTP)
3. Naviguer vers `public_html` (ou `public_html/femat.ml`)
4. Uploader tous les fichiers de `.output/public`

**Documentation** : [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)

**Avec rsync (SSH)** :

```bash
rsync -avz --delete .output/public/ user@femat.ml:~/public_html/
```

#### Option C: SSH + Git (Recommandé pour automatisation)

Si SSH est disponible et Git est installé sur le serveur :

```bash
# Se connecter au serveur
ssh user@femat.ml

# Cloner le repository (si pas déjà fait)
cd ~
git clone https://github.com/votre-repo/femat.git
cd femat

# Installer les dépendances
pnpm install

# Générer les fichiers
pnpm generate

# Copier les fichiers vers public_html
cp -r .output/public/* ~/public_html/
cp .htaccess ~/public_html/
```

### Étape 6: Vérifier les Permissions

Les permissions doivent être :
- **Fichiers** : 644
- **Dossiers** : 755
- **`.htaccess`** : 644

**Via File Manager cPanel** :
1. Sélectionner tous les fichiers
2. Cliquer sur **Permissions** (ou **Change Permissions**) dans la barre d'outils
3. Définir : Fichiers = 644, Dossiers = 755
4. Cocher **Recurse into subdirectories** si nécessaire
5. Cliquer sur **Change Permissions**

**Documentation** : [cPanel File Manager - Permissions](https://docs.cpanel.net/cpanel/files/file-manager/#change-permissions)

**Via SSH** :

```bash
# Permissions pour fichiers
find ~/public_html -type f -exec chmod 644 {} \;

# Permissions pour dossiers
find ~/public_html -type d -exec chmod 755 {} \;

# Permission pour .htaccess
chmod 644 ~/public_html/.htaccess
```

### Étape 7: Configuration SSL/HTTPS

#### 7.1 Générer le Certificat SSL

1. Dans cPanel, aller dans **Security** → **SSL/TLS Status**
2. Sélectionner `femat.ml` dans la liste des domaines
3. Cliquer sur **Run AutoSSL** (pour renouveler automatiquement) ou **Issue** pour Let's Encrypt
4. Attendre la génération du certificat (peut prendre quelques minutes)
5. Vérifier que le certificat est actif (statut "Active")

**Documentation** : [cPanel Let's Encrypt](https://docs.cpanel.net/cpanel/security/lets-encrypt/)

#### 7.2 Vérifier HTTPS

1. Accéder à `https://www.femat.ml`
2. Vérifier que le cadenas vert apparaît dans le navigateur
3. Tester la redirection HTTP → HTTPS

### Étape 8: Configuration de la Redirection www (Optionnel)

Décider si vous voulez :
- `www.femat.ml` → `femat.ml` (recommandé)
- `femat.ml` → `www.femat.ml`

**Dans `.htaccess`**, décommenter la ligne appropriée :

```apache
# Rediriger www vers non-www
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

### Étape 9: Tests Post-Déploiement

#### 9.1 Tests Fonctionnels

Vérifier que toutes les pages fonctionnent :

- [ ] `https://www.femat.ml` (accueil)
- [ ] `https://www.femat.ml/about` (à propos)
- [ ] `https://www.femat.ml/blog` (liste des articles)
- [ ] `https://www.femat.ml/blog/[slug]` (article individuel)
- [ ] `https://www.femat.ml/events` (liste des événements)
- [ ] `https://www.femat.ml/events/[slug]` (événement individuel)
- [ ] `https://www.femat.ml/contact` (contact)
- [ ] `https://www.femat.ml/calendar` (calendrier)

#### 9.2 Tests de Performance

1. Ouvrir Chrome DevTools (F12)
2. Aller dans l'onglet "Lighthouse"
3. Sélectionner "Performance" et "Desktop"
4. Cliquer sur "Generate report"
5. Vérifier que le score est > 90

#### 9.3 Tests de Sécurité

1. Vérifier HTTPS : `https://www.femat.ml`
2. Vérifier les headers de sécurité :
   - Ouvrir DevTools → Network
   - Recharger la page
   - Cliquer sur une requête
   - Vérifier les headers : `X-Content-Type-Options`, `X-Frame-Options`, etc.
3. Tester sur [SecurityHeaders.com](https://securityheaders.com/)

#### 9.4 Tests Cross-Browser

Tester sur :
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Mobile (Chrome Mobile, Safari Mobile)

## Déploiements Futurs

Pour mettre à jour le site après des modifications :

### Méthode Rapide

1. **Local** :
   ```bash
   pnpm generate
   ```

2. **Upload** : Uploader uniquement les fichiers modifiés (ou tout le contenu de `.output/public`)

3. **Vérification** : Tester les pages modifiées

### Méthode Automatisée (si SSH disponible)

Créer un script `deploy.sh` :

```bash
#!/bin/bash

# Générer les fichiers
pnpm generate

# Uploader via rsync
rsync -avz --delete .output/public/ user@femat.ml:~/public_html/

# Copier .htaccess
scp .htaccess user@femat.ml:~/public_html/

echo "Déploiement terminé !"
```

Rendre le script exécutable :

```bash
chmod +x deploy.sh
```

Exécuter :

```bash
./deploy.sh
```

## Dépannage

### Problème : Routes 404

**Symptôme** : Les routes dynamiques (blog, événements) retournent 404.

**Solution** :
1. Vérifier que le fichier `.htaccess` est présent et correctement configuré
2. Vérifier les permissions du fichier `.htaccess` (644)
3. Vérifier que `mod_rewrite` est activé sur le serveur (généralement activé par défaut)

### Problème : Images ne chargent pas

**Symptôme** : Les images ne s'affichent pas.

**Solution** :
1. Vérifier que les fichiers images sont uploadés dans le bon répertoire
2. Vérifier les permissions des fichiers images (644)
3. Vérifier les chemins dans le code (doivent être relatifs ou commencer par `/`)

### Problème : CSS/JS ne chargent pas

**Symptôme** : Le site s'affiche sans styles.

**Solution** :
1. Vérifier que les fichiers dans `_nuxt/` sont uploadés
2. Vérifier les permissions (644)
3. Vérifier la console du navigateur pour les erreurs 404
4. Vérifier que le cache du navigateur n'est pas obsolète (Ctrl+F5)

### Problème : HTTPS ne fonctionne pas

**Symptôme** : Le site n'est accessible qu'en HTTP.

**Solution** :
1. Vérifier que le certificat SSL est généré dans cPanel
2. Vérifier la redirection HTTP → HTTPS dans `.htaccess`
3. Vérifier la configuration DNS (doit pointer vers le serveur)

### Problème : Performance médiocre

**Symptôme** : Le site est lent.

**Solution** :
1. Vérifier que le cache est configuré dans `.htaccess`
2. Optimiser les images avant la génération
3. Vérifier la compression GZIP dans `.htaccess`
4. Contacter l'hébergeur pour vérifier les ressources serveur

## Commandes Utiles

### Génération et Vérification

```bash
# Générer les fichiers statiques
pnpm generate

# Prévisualiser localement
pnpm preview

# Vérifier la taille du build
du -sh .output/public

# Lister les fichiers HTML générés
find .output/public -name "*.html"
```

### Upload via SSH

```bash
# Upload via rsync
rsync -avz --delete .output/public/ user@femat.ml:~/public_html/

# Upload du fichier .htaccess
scp .htaccess user@femat.ml:~/public_html/

# Vérifier les permissions
ssh user@femat.ml "ls -la ~/public_html/"
```

### Vérification sur le Serveur

```bash
# Se connecter au serveur
ssh user@femat.ml

# Vérifier les fichiers
ls -la ~/public_html/

# Vérifier les permissions
find ~/public_html -type f -ls | head -20

# Vérifier les logs d'erreur Apache
tail -f /usr/local/apache/logs/error_log
```

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

- Le site est déjà accessible sur `https://www.femat.ml` avec un message "Site will launch soon"
- Il faudra remplacer ce contenu par les fichiers générés
- Sauvegarder toujours les fichiers existants avant de les remplacer
- Tester en local avant chaque déploiement
- Documenter toute modification spécifique au serveur

## Support

En cas de problème :
1. Vérifier les logs d'erreur Apache dans cPanel (**Metrics** → **Errors** ou **Metrics** → **Raw Access Logs**)
2. Vérifier la console du navigateur (F12 → Console)
3. Vérifier les permissions des fichiers (doivent être 644 pour fichiers, 755 pour dossiers)
4. Vérifier que le fichier `.htaccess` est présent et correctement configuré
5. Vérifier que `mod_rewrite` est activé sur le serveur (généralement activé par défaut)
6. Contacter l'hébergeur si nécessaire

**Documentation** : [cPanel Error Log](https://docs.cpanel.net/cpanel/metrics/errors/)

