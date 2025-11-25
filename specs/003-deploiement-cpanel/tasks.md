# Tâches: Déploiement avec cPanel

**Feature ID**: `003-deploiement-cpanel`  
**Date**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27  
**Status**: En cours - Phase 1, 2 & 3 complétées

## Liste des Tâches

### Phase 1: Préparation

#### Tâche 1.1: Vérifier la Configuration Nuxt ✅
**Description**: Vérifier que `nuxt.config.ts` est correctement configuré pour SSG.

**Acceptance Criteria**:
- [x] `nitro.prerender` est configuré avec `crawlLinks: true`
- [x] Optimisations de production sont activées
- [x] Source maps sont désactivées en production

**Fichiers concernés**:
- `nuxt.config.ts`

**Estimation**: 10 min  
**Status**: ✅ Complété (2025-01-27)

---

#### Tâche 1.2: Préparer l'Environnement Local ✅
**Description**: S'assurer que l'environnement local est prêt pour la génération.

**Acceptance Criteria**:
- [x] Node.js et pnpm sont installés (Node.js v25.2.1, pnpm 10.23.0)
- [x] Dépendances installées (`pnpm install`)
- [x] Pas d'erreurs dans le projet

**Commandes**:
```bash
node --version
pnpm --version
pnpm install
```

**Estimation**: 10 min  
**Status**: ✅ Complété (2025-01-27)

---

#### Tâche 1.3: Tester le Build Local ✅
**Description**: Tester que le build fonctionne correctement en local.

**Acceptance Criteria**:
- [x] `pnpm generate` s'exécute sans erreurs
- [x] Fichiers générés dans `.output/public` (4.3 MB, 8 pages HTML)
- [x] Build testé avec succès (corrections Tailwind CSS appliquées)

**Commandes**:
```bash
pnpm generate
pnpm preview
```

**Résultats**:
- ✅ Build réussi : 8 pages HTML générées (index, about, blog, events, calendar, contact, 404, 200)
- ✅ Taille totale : 4.3 MB
- ✅ Corrections appliquées : `text-primary` remplacé par `text-primary-600 dark:text-primary-400` pour compatibilité Tailwind CSS v4
- ✅ Section `<style scoped>` problématique supprimée dans `events/[...slug].vue`

**Estimation**: 10 min  
**Status**: ✅ Complété (2025-01-27)

---

### Phase 2: Génération des Fichiers Statiques

#### Tâche 2.1: Générer les Fichiers Statiques ✅
**Description**: Générer tous les fichiers statiques du site.

**Acceptance Criteria**:
- [x] Commande `pnpm generate` exécutée avec succès
- [x] Tous les fichiers HTML générés (8 pages)
- [x] Assets (CSS, JS, images) copiés correctement
- [x] Routes dynamiques pré-rendues (blog, événements)

**Commandes**:
```bash
pnpm generate
```

**Vérifications**:
- ✅ `index.html` présent dans `.output/public`
- ✅ Routes blog et événements générées
- ✅ Assets présents (`_nuxt/`, images, etc.)

**Estimation**: 15 min  
**Status**: ✅ Complété (2025-01-27)

---

#### Tâche 2.2: Vérifier les Fichiers Générés ✅
**Description**: Vérifier que tous les fichiers nécessaires sont générés.

**Acceptance Criteria**:
- [x] `index.html` présent
- [x] Toutes les pages principales générées (8 pages HTML)
- [x] Routes dynamiques générées
- [x] Assets présents et accessibles (4.3 MB total)

**Commandes**:
```bash
ls -la .output/public
find .output/public -name "*.html" | wc -l
du -sh .output/public
```

**Résultats**:
- ✅ 8 fichiers HTML générés : index.html, about/index.html, blog/index.html, events/index.html, calendar/index.html, contact/index.html, 404.html, 200.html
- ✅ Taille totale : 4.3 MB
- ✅ Structure complète : `_nuxt/`, `_ipx/`, images, etc.

**Estimation**: 10 min  
**Status**: ✅ Complété (2025-01-27)

---

### Phase 3: Création du Fichier `.htaccess`

#### Tâche 3.1: Créer le Fichier `.htaccess` ✅
**Description**: Créer le fichier `.htaccess` avec les règles de réécriture et les headers de sécurité.

**Acceptance Criteria**:
- [x] Fichier `.htaccess` créé (existe déjà à la racine du projet)
- [x] Rewrite rules configurées pour le routing
- [x] Headers de sécurité configurés
- [x] Cache headers configurés pour les assets
- [x] Compression GZIP configurée

**Fichiers concernés**:
- `.htaccess` (à la racine du projet)
- `.output/public/.htaccess` (copié pour le déploiement)

**Contenu du fichier**: Voir `spec.md` section "Configuration `.htaccess`"

**Estimation**: 15 min  
**Status**: ✅ Complété (2025-01-27)

---

#### Tâche 3.2: Copier `.htaccess` dans le Build ✅
**Description**: S'assurer que le fichier `.htaccess` est inclus dans les fichiers à uploader.

**Acceptance Criteria**:
- [x] Fichier `.htaccess` présent dans `.output/public`
- [x] Permissions correctes (644 - rw-r--r--)

**Commandes**:
```bash
cp .htaccess .output/public/.htaccess
chmod 644 .output/public/.htaccess
```

**Résultats**:
- ✅ Fichier `.htaccess` copié dans `.output/public/`
- ✅ Permissions vérifiées : 644 (rw-r--r--)
- ✅ Taille : 1996 octets
- ✅ Contenu vérifié : toutes les règles présentes (routing, sécurité, cache, compression)

**Estimation**: 5 min  
**Status**: ✅ Complété (2025-01-27)

---

### Phase 4: Upload sur cPanel

#### Tâche 4.1: Accéder au File Manager cPanel
**Description**: Se connecter à cPanel et accéder au File Manager.

**Acceptance Criteria**:
- [ ] Connexion à cPanel réussie
- [ ] File Manager ouvert (Files → File Manager)
- [ ] Répertoire racine identifié (`public_html` ou `public_html/femat.ml`)

**Note importante** : Pour un site statique (SSG), nous n'utilisons **PAS** le Gestionnaire d'applications (Application Manager). Nous utilisons uniquement le **File Manager**.

**Documentation** : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)

**Estimation**: 10 min

---

#### Tâche 4.2: Sauvegarder les Fichiers Existants
**Description**: Sauvegarder les fichiers existants avant de les remplacer.

**Acceptance Criteria**:
- [ ] Fichiers existants sauvegardés (si nécessaire)
- [ ] Backup créé avec timestamp

**Estimation**: 10 min

---

#### Tâche 4.3: Upload des Fichiers
**Description**: Uploader tous les fichiers de `.output/public` sur le serveur cPanel.

**Acceptance Criteria**:
- [ ] Tous les fichiers uploadés
- [ ] Structure de fichiers préservée
- [ ] Fichier `.htaccess` uploadé
- [ ] Permissions correctes (644 pour fichiers, 755 pour dossiers)

**Méthodes possibles**:
1. **File Manager cPanel**: Upload via interface web (Files → File Manager → Upload)
   - Documentation : [cPanel File Manager](https://docs.cpanel.net/cpanel/files/file-manager/)
2. **FTP/SFTP**: Upload via client FTP (FileZilla, WinSCP, etc.)
   - Documentation : [cPanel FTP Accounts](https://docs.cpanel.net/cpanel/files/ftp-accounts/)
3. **SSH + rsync**: Si SSH disponible
   - Documentation : [cPanel Terminal](https://docs.cpanel.net/cpanel/advanced/terminal/)

**Estimation**: 20 min

---

#### Tâche 4.4: Vérifier les Permissions
**Description**: Vérifier et corriger les permissions des fichiers si nécessaire.

**Acceptance Criteria**:
- [ ] Permissions des fichiers: 644
- [ ] Permissions des dossiers: 755
- [ ] Fichier `.htaccess` accessible (644)

**Via File Manager cPanel**:
1. Sélectionner les fichiers
2. Cliquer sur **Permissions** (ou **Change Permissions**)
3. Définir : Fichiers = 644, Dossiers = 755
4. Cocher **Recurse into subdirectories** si nécessaire

**Documentation** : [cPanel File Manager - Permissions](https://docs.cpanel.net/cpanel/files/file-manager/#change-permissions)

**Estimation**: 10 min

---

### Phase 5: Configuration du Domaine

#### Tâche 5.1: Vérifier la Configuration du Domaine
**Description**: Vérifier que le domaine `femat.ml` est correctement configuré dans cPanel.

**Acceptance Criteria**:
- [ ] Domaine `femat.ml` configuré dans cPanel (Domains → Domains)
- [ ] Répertoire racine associé correctement
- [ ] DNS configuré correctement (si nécessaire)

**Documentation** : [cPanel Domains](https://docs.cpanel.net/cpanel/domains/domains/) | [cPanel DNS Zone Editor](https://docs.cpanel.net/cpanel/domains/dns-zone-editor/)

**Estimation**: 10 min

---

#### Tâche 5.2: Configurer le Certificat SSL
**Description**: Configurer ou renouveler le certificat SSL avec Let's Encrypt.

**Acceptance Criteria**:
- [ ] Certificat SSL généré/renouvelé pour `femat.ml`
- [ ] HTTPS fonctionne
- [ ] Renouvellement automatique configuré

**Dans cPanel**:
- Accéder à **Security** → **SSL/TLS Status**
- Sélectionner `femat.ml` dans la liste
- Cliquer sur **Run AutoSSL** (pour renouvellement automatique) ou **Issue** pour Let's Encrypt
- Attendre la génération du certificat

**Documentation** : [cPanel Let's Encrypt](https://docs.cpanel.net/cpanel/security/lets-encrypt/)

**Estimation**: 10 min

---

#### Tâche 5.3: Configurer la Redirection www (Optionnel)
**Description**: Configurer la redirection entre www et non-www selon préférence.

**Acceptance Criteria**:
- [ ] Décision prise: www → non-www ou non-www → www
- [ ] Redirection configurée dans `.htaccess` ou cPanel
- [ ] Redirection testée et fonctionnelle

**Estimation**: 10 min

---

### Phase 6: Tests et Vérifications

#### Tâche 6.1: Tests Fonctionnels
**Description**: Tester que toutes les fonctionnalités du site fonctionnent correctement.

**Acceptance Criteria**:
- [ ] Site accessible sur `https://www.femat.ml`
- [ ] Page d'accueil s'affiche correctement
- [ ] Navigation fonctionne
- [ ] Toutes les pages principales accessibles
- [ ] Routes dynamiques fonctionnent (blog, événements)
- [ ] Images et assets chargent correctement
- [ ] Formulaire de contact fonctionne (si applicable)

**Pages à tester**:
- `/` (accueil)
- `/about` (à propos)
- `/blog` (liste des articles)
- `/blog/[slug]` (article individuel)
- `/events` (liste des événements)
- `/events/[slug]` (événement individuel)
- `/contact` (contact)
- `/calendar` (calendrier)

**Estimation**: 20 min

---

#### Tâche 6.2: Tests de Performance
**Description**: Vérifier les performances du site avec Lighthouse.

**Acceptance Criteria**:
- [ ] Score Lighthouse > 90
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s

**Outils**:
- Chrome DevTools → Lighthouse
- PageSpeed Insights

**Estimation**: 15 min

---

#### Tâche 6.3: Tests de Sécurité
**Description**: Vérifier que les headers de sécurité sont correctement configurés.

**Acceptance Criteria**:
- [ ] HTTPS fonctionne et redirige HTTP → HTTPS
- [ ] Headers de sécurité présents (X-Content-Type-Options, X-Frame-Options, etc.)
- [ ] Protection XSS active
- [ ] Protection clickjacking active

**Vérification**:
- Chrome DevTools → Network → Headers
- [SecurityHeaders.com](https://securityheaders.com/)

**Estimation**: 10 min

---

#### Tâche 6.4: Tests Cross-Browser
**Description**: Tester le site sur différents navigateurs et appareils.

**Acceptance Criteria**:
- [ ] Site fonctionne sur Chrome
- [ ] Site fonctionne sur Firefox
- [ ] Site fonctionne sur Safari
- [ ] Site fonctionne sur mobile (responsive)

**Estimation**: 15 min

---

### Phase 7: Documentation et Maintenance

#### Tâche 7.1: Documenter le Processus de Déploiement
**Description**: Créer une documentation claire du processus de déploiement pour les futurs déploiements.

**Acceptance Criteria**:
- [ ] Guide de déploiement créé
- [ ] Étapes documentées clairement
- [ ] Commandes documentées
- [ ] Problèmes courants et solutions documentés

**Fichiers concernés**:
- `GUIDE-DEPLOIEMENT.md` (à créer)

**Estimation**: 20 min

---

#### Tâche 7.2: Créer des Scripts de Déploiement (Optionnel)
**Description**: Créer des scripts pour automatiser le processus de déploiement.

**Acceptance Criteria**:
- [ ] Script de génération créé
- [ ] Script d'upload créé (si FTP disponible)
- [ ] Scripts documentés

**Scripts possibles**:
- `scripts/generate.sh` - Génération des fichiers
- `scripts/deploy.sh` - Upload via FTP/SFTP
- `scripts/deploy-ssh.sh` - Upload via SSH/rsync

**Estimation**: 30 min (optionnel)

---

## Checklist Globale

### Avant le Déploiement
- [x] Code prêt pour production
- [x] Configuration Nuxt vérifiée
- [x] Tests locaux réussis
- [x] Fichier `.htaccess` créé et copié dans `.output/public`

### Configuration cPanel
- [ ] Accès à cPanel obtenu
- [ ] Répertoire racine identifié
- [ ] Domaine configuré
- [ ] Certificat SSL configuré

### Upload
- [ ] Fichiers générés
- [ ] Fichiers uploadés
- [ ] Permissions vérifiées

### Après le Déploiement
- [ ] Site accessible
- [ ] Toutes les pages fonctionnent
- [ ] Performance OK
- [ ] Sécurité OK
- [ ] Documentation créée

## Timeline

- **Phase 1**: ~30 min
- **Phase 2**: ~25 min
- **Phase 3**: ~20 min
- **Phase 4**: ~50 min
- **Phase 5**: ~30 min
- **Phase 6**: ~60 min
- **Phase 7**: ~50 min (optionnel)

**Total**: ~4h30 (avec documentation et scripts)

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

