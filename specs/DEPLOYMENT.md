# Guide de Déploiement FEMAT

**Date**: 2025-01-27  
**Plateforme**: cPanel  
**Domaine**: https://www.femat.ml  
**Documentation**: Voir `specs/003-deploiement-cpanel/GUIDE-DEPLOIEMENT.md`

## Plateforme de Déploiement: cPanel ✅

**Décision**: Déploiement sur **cPanel** pour le site web FEMAT.

**Justification**:
- ✅ **Domaine existant** - Le domaine `femat.ml` est déjà configuré sur cPanel
- ✅ **Contrôle total** - Accès complet aux fichiers et configuration
- ✅ **SSG compatible** - Support parfait pour Static Site Generation
- ✅ **Hébergement traditionnel** - Solution éprouvée et fiable
- ✅ **HTTPS disponible** - Certificats SSL via Let's Encrypt (gratuit)
- ✅ **Support complet** - Documentation et support cPanel disponibles

## Configuration cPanel

### Prérequis

1. Compte cPanel avec accès FTP/SFTP ou Gestionnaire de fichiers
2. Domaine `femat.ml` configuré dans cPanel
3. Node.js et pnpm installés localement
4. Accès SSH (optionnel mais recommandé)

### Étapes de Déploiement

#### 1. Préparer le Projet

**Configuration Nuxt pour SSG** (`nuxt.config.ts`):
```typescript
export default defineNuxtConfig({
  // Configuration existante...
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true // Pré-rendre toutes les routes automatiquement
    }
  }
})
```

**Build Command**:
```bash
pnpm generate  # Pour SSG complet
```

**Output Directory**: `.output/public`

#### 2. Générer les Fichiers Statiques

```bash
# Générer les fichiers statiques
pnpm generate

# Prévisualiser localement
pnpm preview
```

#### 3. Créer le Fichier `.htaccess`

Le fichier `.htaccess` est nécessaire pour le routing côté client. Voir le fichier `.htaccess` à la racine du projet.

#### 4. Upload sur cPanel

**Option A: Gestionnaire de fichiers cPanel**
1. Accéder à cPanel → Gestionnaire de fichiers
2. Naviguer vers `public_html` (ou `public_html/femat.ml`)
3. Uploader tous les fichiers de `.output/public`

**Option B: FTP/SFTP**
1. Se connecter avec un client FTP (FileZilla, WinSCP, etc.)
2. Uploader le contenu de `.output/public`

**Option C: SSH + rsync** (si disponible)
```bash
rsync -avz --delete .output/public/ user@femat.ml:~/public_html/
```

#### 5. Configuration SSL/HTTPS

1. Dans cPanel, aller dans "Let's Encrypt" ou "SSL/TLS Status"
2. Générer/renouveler le certificat SSL pour `femat.ml`
3. Vérifier que HTTPS fonctionne

## Workflow de Déploiement

### Déploiement Manuel

1. **Local** : Générer les fichiers avec `pnpm generate`
2. **Upload** : Uploader les fichiers sur cPanel
3. **Vérification** : Tester le site

### Script de Déploiement (Optionnel)

Si SSH est disponible, créer un script `deploy.sh` :

```bash
#!/bin/bash
pnpm generate
rsync -avz --delete .output/public/ user@femat.ml:~/public_html/
scp .htaccess user@femat.ml:~/public_html/
echo "Déploiement terminé !"
```

## Optimisations cPanel

### Configuration `.htaccess`

Le fichier `.htaccess` configure :
- **Routing** : Redirection vers `index.html` pour le routing côté client
- **Cache** : Cache pour les assets statiques (1 an)
- **Compression** : Compression GZIP pour les fichiers texte
- **Sécurité** : Headers de sécurité (X-Content-Type-Options, X-Frame-Options, etc.)

### Performance

- **Cache des assets** : Configuré dans `.htaccess` pour améliorer les performances
- **Compression GZIP** : Réduit la taille des fichiers transférés
- **Optimisation des images** : Utiliser des formats modernes (AVIF, WebP)

### Métriques Attendues

- **First Contentful Paint (FCP)**: < 1.8s
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.8s
- **Lighthouse Score**: > 90 (objectif)

## Sécurité

### HTTPS avec Let's Encrypt

- ✅ Certificats SSL gratuits via Let's Encrypt
- ✅ Renouvellement automatique configuré dans cPanel
- ✅ Redirection HTTP → HTTPS dans `.htaccess`

### Headers de Sécurité

Configurés dans `.htaccess` :
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

## Checklist de Déploiement

### Avant le Déploiement

- [ ] Code prêt pour production
- [ ] `nuxt.config.ts` configuré pour SSG
- [ ] Tests locaux réussis (`pnpm generate`)
- [ ] Fichier `.htaccess` créé

### Configuration cPanel

- [ ] Accès à cPanel obtenu
- [ ] Répertoire racine identifié (`public_html` ou `public_html/femat.ml`)
- [ ] Domaine `femat.ml` configuré
- [ ] Fichiers existants sauvegardés

### Upload

- [ ] Fichiers générés avec `pnpm generate`
- [ ] Fichier `.htaccess` inclus
- [ ] Tous les fichiers uploadés sur cPanel
- [ ] Permissions vérifiées (644 pour fichiers, 755 pour dossiers)

### Après le Déploiement

- [ ] Site accessible sur `https://www.femat.ml`
- [ ] Toutes les pages fonctionnent
- [ ] Images et assets chargent correctement
- [ ] Performance vérifiée (Lighthouse)
- [ ] HTTPS fonctionne
- [ ] Headers de sécurité vérifiés

## Dépannage

### Routes 404

**Symptôme** : Les routes dynamiques retournent 404.

**Solution** :
1. Vérifier que le fichier `.htaccess` est présent et correctement configuré
2. Vérifier les permissions du fichier `.htaccess` (644)
3. Vérifier que `mod_rewrite` est activé sur le serveur

### Images ne chargent pas

**Solution** :
1. Vérifier que les fichiers images sont uploadés dans le bon répertoire
2. Vérifier les permissions des fichiers images (644)
3. Vérifier les chemins dans le code

### CSS/JS ne chargent pas

**Solution** :
1. Vérifier que les fichiers dans `_nuxt/` sont uploadés
2. Vérifier les permissions (644)
3. Vérifier la console du navigateur pour les erreurs 404

### HTTPS ne fonctionne pas

**Solution** :
1. Vérifier que le certificat SSL est généré dans cPanel
2. Vérifier la redirection HTTP → HTTPS dans `.htaccess`
3. Vérifier la configuration DNS

## Ressources

- [Documentation Nuxt SSG](https://nuxt.com/docs/getting-started/deployment#static-hosting)
- [Documentation cPanel](https://docs.cpanel.net/)
- [Guide Apache .htaccess](https://httpd.apache.org/docs/current/howto/htaccess.html)
- [Let's Encrypt sur cPanel](https://docs.cpanel.net/cpanel/security/lets-encrypt/)
- Guide détaillé : `specs/003-deploiement-cpanel/GUIDE-DEPLOIEMENT.md`

## Notes

- Le site est déjà accessible sur `https://www.femat.ml` avec un message "Site will launch soon"
- Il faudra remplacer ce contenu par les fichiers générés
- Sauvegarder toujours les fichiers existants avant de les remplacer
- Tester en local avant chaque déploiement
- Le fichier `.htaccess` est essentiel pour le routing côté client

