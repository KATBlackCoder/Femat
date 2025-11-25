# Plan d'Implémentation: Déploiement avec cPanel

**Feature ID**: `003-deploiement-cpanel`  
**Date**: 2025-01-27  
**Status**: Draft

## Vue d'ensemble

Ce document détaille le plan d'implémentation pour déployer le site web FEMAT sur un hébergement cPanel en utilisant la génération statique (SSG) de Nuxt.

## Approche Générale

### Méthode de Déploiement

**Choix**: Déploiement de site statique (SSG) via upload de fichiers

**Justification**:
- Simple et direct
- Pas besoin de configuration Node.js sur le serveur
- Performance optimale (fichiers statiques servis directement)
- Compatible avec tous les hébergements cPanel
- Coût réduit (pas besoin de ressources serveur pour Node.js)

### Workflow de Déploiement

1. **Génération locale** des fichiers statiques
2. **Upload** des fichiers sur cPanel via File Manager ou FTP
3. **Configuration** du fichier `.htaccess` pour le routing
4. **Vérification** du fonctionnement du site

**Note importante** : Pour un site statique (SSG), nous n'utilisons **PAS** le Gestionnaire d'applications (Application Manager). Nous utilisons uniquement le **File Manager** pour uploader les fichiers statiques.

## Étapes Détaillées

### Phase 1: Préparation (30 min)

#### 1.1 Vérification de la Configuration Nuxt
- [ ] Vérifier `nuxt.config.ts` pour SSG
- [ ] Confirmer que `nitro.prerender` est configuré
- [ ] Vérifier les optimisations de production

#### 1.2 Préparation de l'Environnement Local
- [ ] S'assurer que Node.js et pnpm sont installés
- [ ] Installer les dépendances (`pnpm install`)
- [ ] Vérifier qu'il n'y a pas d'erreurs

### Phase 2: Génération des Fichiers Statiques (15 min)

#### 2.1 Génération
```bash
pnpm generate
```

#### 2.2 Vérification
- [ ] Vérifier que `.output/public` contient tous les fichiers
- [ ] Vérifier la présence de `index.html`
- [ ] Vérifier que les routes sont générées (blog, événements)
- [ ] Vérifier que les assets sont copiés

#### 2.3 Test Local
```bash
pnpm preview
```
- [ ] Tester toutes les pages localement
- [ ] Vérifier la navigation
- [ ] Vérifier les images et assets

### Phase 3: Création du Fichier `.htaccess` (10 min)

#### 3.1 Création du Fichier
- [ ] Créer le fichier `.htaccess` avec les règles de réécriture
- [ ] Configurer les headers de sécurité
- [ ] Configurer le cache pour les assets
- [ ] Configurer la compression GZIP

#### 3.2 Copie dans le Build
- [ ] Copier `.htaccess` dans `.output/public`
- [ ] Vérifier que le fichier est présent

### Phase 4: Upload sur cPanel (30 min)

#### 4.1 Accès à cPanel
- [ ] Se connecter à cPanel
- [ ] Accéder au **File Manager** (Files → File Manager)
- [ ] Identifier le répertoire racine (`public_html` ou `public_html/femat.ml`)
- Documentation : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

#### 4.2 Préparation du Répertoire
- [ ] Sauvegarder les fichiers existants (si nécessaire)
- [ ] Nettoyer le répertoire (si nécessaire)
- [ ] Vérifier les permissions

#### 4.3 Upload des Fichiers
**Option A: File Manager cPanel**
- [ ] Upload du contenu de `.output/public` (ou créer une archive ZIP)
- [ ] Si archive ZIP, la décompresser dans cPanel
- [ ] Vérifier que tous les fichiers sont uploadés
- [ ] Vérifier la structure de fichiers
- Documentation : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

**Option B: FTP/SFTP**
- [ ] Se connecter via client FTP (FileZilla, WinSCP, etc.)
- [ ] Upload du contenu de `.output/public`
- [ ] Vérifier la structure de fichiers
- Documentation : [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)

#### 4.4 Vérification des Permissions
- [ ] Vérifier les permissions des fichiers (644 pour fichiers, 755 pour dossiers)
- [ ] Vérifier les permissions du fichier `.htaccess` (644)

### Phase 5: Configuration du Domaine (15 min)

#### 5.1 Vérification du Domaine
- [ ] Vérifier que `femat.ml` est configuré dans cPanel (Domains → Domains)
- [ ] Vérifier le répertoire racine associé
- [ ] Vérifier les DNS si nécessaire
- Documentation : [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/)

#### 5.2 Configuration SSL
- [ ] Accéder à **Security** → **SSL/TLS Status** dans cPanel
- [ ] Sélectionner `femat.ml` et cliquer sur **Run AutoSSL** ou **Issue** pour Let's Encrypt
- [ ] Vérifier que HTTPS fonctionne
- Documentation : [cPanel Let's Encrypt](https://docs.cpanel.net/cpanel/security/lets-encrypt/)

#### 5.3 Redirection www (Optionnel)
- [ ] Décider: www → non-www ou non-www → www
- [ ] Configurer la redirection dans `.htaccess` ou cPanel
- [ ] Tester la redirection

### Phase 6: Tests et Vérifications (30 min)

#### 6.1 Tests Fonctionnels
- [ ] Accéder à `https://www.femat.ml`
- [ ] Tester toutes les pages principales
- [ ] Tester la navigation
- [ ] Tester les routes dynamiques (blog, événements)
- [ ] Vérifier les images et assets

#### 6.2 Tests de Performance
- [ ] Exécuter Lighthouse (Chrome DevTools)
- [ ] Vérifier le score (> 90)
- [ ] Vérifier les métriques de performance
- [ ] Optimiser si nécessaire

#### 6.3 Tests de Sécurité
- [ ] Vérifier que HTTPS fonctionne
- [ ] Vérifier les headers de sécurité (via DevTools)
- [ ] Tester la protection XSS
- [ ] Tester la protection clickjacking

#### 6.4 Tests Cross-Browser
- [ ] Tester sur Chrome
- [ ] Tester sur Firefox
- [ ] Tester sur Safari
- [ ] Tester sur mobile

### Phase 7: Documentation et Maintenance (15 min)

#### 7.1 Documentation
- [ ] Documenter le processus de déploiement
- [ ] Documenter les modifications nécessaires pour futurs déploiements
- [ ] Créer un guide de dépannage

#### 7.2 Scripts de Déploiement (Optionnel)
- [ ] Créer un script pour automatiser la génération
- [ ] Créer un script pour automatiser l'upload (si FTP disponible)
- [ ] Documenter l'utilisation des scripts

## Risques et Mitigation

### Risque 1: Erreurs lors de la Génération
**Probabilité**: Faible  
**Impact**: Élevé  
**Mitigation**: 
- Tester la génération localement avant l'upload
- Vérifier les logs d'erreur
- Corriger les erreurs avant le déploiement

### Risque 2: Problèmes de Routing après Déploiement
**Probabilité**: Moyenne  
**Impact**: Élevé  
**Mitigation**: 
- Vérifier que le fichier `.htaccess` est correctement configuré
- Tester toutes les routes après déploiement
- Vérifier les permissions du fichier `.htaccess`

### Risque 3: Problèmes de Performance
**Probabilité**: Faible  
**Impact**: Moyen  
**Mitigation**: 
- Optimiser les images avant la génération
- Configurer le cache dans `.htaccess`
- Vérifier les performances avec Lighthouse

### Risque 4: Problèmes de Certificat SSL
**Probabilité**: Faible  
**Impact**: Moyen  
**Mitigation**: 
- Utiliser Let's Encrypt (gratuit et automatique)
- Vérifier la configuration DNS
- Renouveler le certificat si nécessaire

## Timeline Estimé

- **Phase 1**: 30 minutes
- **Phase 2**: 15 minutes
- **Phase 3**: 10 minutes
- **Phase 4**: 30 minutes
- **Phase 5**: 15 minutes
- **Phase 6**: 30 minutes
- **Phase 7**: 15 minutes

**Total**: ~2h30

## Commandes Utiles

### Génération
```bash
# Générer les fichiers statiques
pnpm generate

# Prévisualiser localement
pnpm preview
```

### Vérification
```bash
# Vérifier la taille du build
du -sh .output/public

# Lister les fichiers générés
ls -la .output/public

# Vérifier les routes générées
find .output/public -name "*.html" | head -20
```

### Upload (si SSH disponible)
```bash
# Se connecter au serveur
ssh user@femat.ml

# Naviguer vers le répertoire
cd public_html

# Upload via rsync (depuis local)
rsync -avz --delete .output/public/ user@femat.ml:~/public_html/
```

## Checklist de Déploiement Rapide

### Avant
- [ ] Code prêt
- [ ] Tests locaux OK
- [ ] `.htaccess` créé

### Pendant
- [ ] `pnpm generate` exécuté
- [ ] Fichiers uploadés
- [ ] `.htaccess` uploadé

### Après
- [ ] Site accessible
- [ ] Toutes les pages fonctionnent
- [ ] HTTPS OK
- [ ] Performance OK

## Notes

- Le site est déjà accessible sur `https://www.femat.ml` avec un message "Site will launch soon"
- Il faudra remplacer ce contenu par les fichiers générés
- Sauvegarder les fichiers existants avant de les remplacer
- Tester en local avant chaque déploiement
- Documenter toute modification spécifique au serveur
- **Important** : Pour un site statique (SSG), nous n'utilisons **PAS** le Gestionnaire d'applications (Application Manager). Nous utilisons uniquement le **File Manager**.

## Ressources

### Documentation cPanel
- [cPanel Documentation Home](https://docs.cpanel.net/)
- [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)
- [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)
- [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/)
- [cPanel Subdomains](https://docs.cpanel.net/cpanel/domains/subdomains/)
- [cPanel DNS Zone Editor](https://docs.cpanel.net/cpanel/domains/dns-zone-editor/)
- [cPanel Let's Encrypt SSL](https://docs.cpanel.net/cpanel/security/lets-encrypt/)
- [cPanel Terminal](https://docs.cpanel.net/cpanel/advanced/terminal/)
- [cPanel Error Log](https://docs.cpanel.net/cpanel/metrics/errors/)

### Documentation Nuxt
- [Nuxt SSG Deployment](https://nuxt.com/docs/getting-started/deployment#static-hosting)
- [Nuxt Static Site Generation](https://nuxt.com/docs/guide/concepts/static-site-generation)

### Apache et .htaccess
- [Apache .htaccess Guide](https://httpd.apache.org/docs/current/howto/htaccess.html)
- [Apache mod_rewrite](https://httpd.apache.org/docs/current/mod/mod_rewrite.html)

