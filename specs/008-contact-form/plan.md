# Plan d'Implémentation: Formulaire de Contact Fonctionnel

**Feature ID**: `008-contact-form`  
**Date**: 2025-01-27

## Vue d'ensemble

Ce document détaille le plan d'implémentation pour rendre le formulaire de contact complètement fonctionnel avec les meilleures pratiques Nuxt UI.

## Étapes d'Implémentation

### Phase 1: Préparation et Dépendances
- [ ] Vérifier que Zod est installé (déjà présent dans le projet)
- [ ] Installer Resend (`pnpm add resend`)
- [ ] Créer un compte Resend (gratuit sur https://resend.com)
- [ ] Obtenir la clé API Resend depuis le dashboard
- [ ] Vérifier un domaine d'envoi dans Resend (ou utiliser le domaine de test)
- [ ] Configurer les variables d'environnement pour Resend
- [ ] Vérifier la structure actuelle du composant `ContactForm.vue`

### Phase 2: Création du Schema de Validation
- [ ] Créer le fichier `app/composables/useContactForm.ts`
- [ ] Définir le schema Zod avec toutes les règles de validation
- [ ] Créer le state réactif pour le formulaire
- [ ] Tester le schema de validation localement

### Phase 3: Migration du Composant ContactForm
- [ ] Remplacer `<form>` par `<UForm>` avec le schema
- [ ] Migrer tous les `UFormField` pour utiliser le système de validation intégré
- [ ] Supprimer la validation manuelle (`isValidEmail`, `getMessageError`, etc.)
- [ ] Intégrer l'événement `@error` pour la gestion d'erreurs
- [ ] Améliorer le focus automatique sur les erreurs
- [ ] Conserver le compteur de caractères pour le message

### Phase 4: Création de l'API Route
- [ ] Créer `server/api/contact.post.ts`
- [ ] Implémenter la validation côté serveur (réutiliser le schema)
- [ ] Implémenter le rate limiting (3 soumissions/heure par IP)
- [ ] Vérifier le honeypot
- [ ] Intégrer EmailJS pour l'envoi d'email
- [ ] Gérer les erreurs et retourner des réponses appropriées
- [ ] Logger les soumissions pour debugging

### Phase 5: Amélioration du Feedback Utilisateur
- [ ] Intégrer `useToast` pour les notifications
- [ ] Remplacer `UAlert` par des Toast notifications
- [ ] Améliorer les états de chargement
- [ ] Ajouter des animations subtiles
- [ ] Améliorer les messages d'erreur/succès

### Phase 6: Protection Anti-Spam Renforcée
- [ ] Vérifier que le honeypot fonctionne correctement
- [ ] Tester le rate limiting
- [ ] Ajouter validation des données suspectes (si nécessaire)
- [ ] Documenter les mesures de protection

### Phase 7: Accessibilité et UX
- [ ] Vérifier les labels ARIA
- [ ] Tester la navigation au clavier
- [ ] Vérifier le focus visible
- [ ] Ajouter `aria-live` pour les messages d'erreur
- [ ] Tester avec un lecteur d'écran (optionnel)

### Phase 8: Tests et Optimisations
- [ ] Tester tous les cas de validation
- [ ] Tester l'envoi d'email (succès et erreur)
- [ ] Tester le rate limiting
- [ ] Tester le honeypot
- [ ] Tester sur différents navigateurs
- [ ] Tester sur mobile/tablette/desktop
- [ ] Vérifier les performances
- [ ] Optimiser le code si nécessaire

### Phase 9: Documentation
- [ ] Documenter le schema de validation
- [ ] Documenter l'API route
- [ ] Documenter la configuration EmailJS
- [ ] Ajouter des commentaires dans le code
- [ ] Mettre à jour le README si nécessaire

## Structure des Fichiers

```
app/
├── components/
│   └── ContactForm.vue          # Composant migré avec UForm
├── composables/
│   └── useContactForm.ts         # Schema et logique du formulaire
server/
└── api/
    └── contact.post.ts           # API route pour recevoir les soumissions
.env                              # Variables d'environnement EmailJS
```

## Configuration Resend

**Installation**:
```bash
pnpm add resend
```

**Variables d'environnement nécessaires**:
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**Destinataire email**:
- Email: `femat3@yahoo.fr`
- Poste: Secrétaire Général

**Configuration Resend**:
1. Créer un compte sur https://resend.com (gratuit)
2. Obtenir la clé API depuis le dashboard
3. Vérifier un domaine d'envoi (ou utiliser le domaine de test `onboarding@resend.dev` pour les tests)
4. Pour production, ajouter et vérifier votre domaine (ex: `femat.ml`)

**Exemple d'envoi avec Resend**:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const { data, error } = await resend.emails.send({
  from: 'FEMAT Contact <contact@femat.ml>', // Doit être vérifié dans Resend
  to: ['femat3@yahoo.fr'],
  subject: `Nouveau message de contact FEMAT - ${sujet}`,
  html: `
    <h2>Nouveau message de contact FEMAT</h2>
    <p><strong>Nom:</strong> ${nom} ${prenom || ''}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${telephone || 'Non fourni'}</p>
    <p><strong>Sujet:</strong> ${sujet}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
    <hr>
    <p><em>Ce message a été envoyé automatiquement depuis le site web FEMAT.</em></p>
  `
})
```

**Avantages de Resend**:
- ✅ Plan gratuit généreux : 3000 emails/mois (vs 200 pour EmailJS)
- ✅ Recommandé officiellement par Vercel
- ✅ API moderne et simple
- ✅ Meilleure délivrabilité
- ✅ Support des domaines personnalisés
- ✅ Webhooks pour le tracking

## Configuration des Informations de Contact

**Créer le composable `useContactInfo`** pour centraliser les informations:
```typescript
// composables/useContactInfo.ts
export const useContactInfo = () => {
  const config = useRuntimeConfig()
  
  return {
    email: config.public.contactEmail || 'femat3@yahoo.fr',
    phone: config.public.contactPhone || '+22377551985',
    phoneFormatted: config.public.contactPhoneFormatted || '+223 77 55 19 85',
    position: config.public.contactPosition || 'Secrétaire Général',
    address: config.public.contactAddress || 'Bamako, Mali',
    facebook: config.public.contactFacebook || 'https://www.facebook.com/taekwondomali'
  }
}
```

**Variables d'environnement (`.env`)**:
```env
# Informations de contact FEMAT
CONTACT_EMAIL=femat3@yahoo.fr
CONTACT_PHONE=+22377551985
CONTACT_PHONE_FORMATTED=+223 77 55 19 85
CONTACT_POSITION=Secrétaire Général
CONTACT_ADDRESS=Bamako, Mali
CONTACT_FACEBOOK=https://www.facebook.com/taekwondomali

# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
```

**Configuration dans `nuxt.config.ts`**:
```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      contactEmail: process.env.CONTACT_EMAIL || 'femat3@yahoo.fr',
      contactPhone: process.env.CONTACT_PHONE || '+22377551985',
      contactPhoneFormatted: process.env.CONTACT_PHONE_FORMATTED || '+223 77 55 19 85',
      contactPosition: process.env.CONTACT_POSITION || 'Secrétaire Général',
      contactAddress: process.env.CONTACT_ADDRESS || 'Bamako, Mali',
      contactFacebook: process.env.CONTACT_FACEBOOK || 'https://www.facebook.com/taekwondomali'
    }
  }
})
```

**Avantages**:
- ✅ Facilement modifiable via variables d'environnement
- ✅ Valeurs par défaut si variables non définies
- ✅ Centralisé dans un seul composable
- ✅ Réutilisable dans toute l'application (page contact, footer, etc.)

## Checklist de Validation

### Fonctionnalités Core
- [ ] Validation schema fonctionnelle avec Valibot
- [ ] Tous les champs validés correctement
- [ ] Messages d'erreur automatiques via UFormField
- [ ] Validation en temps réel (blur/change)
- [ ] Soumission fonctionnelle vers l'API
- [ ] Emails reçus correctement via EmailJS
- [ ] Rate limiting fonctionnel (3/heure/IP)
- [ ] Honeypot fonctionnel

### UX/UI
- [ ] Toast notifications pour succès/erreur
- [ ] États de chargement visibles
- [ ] Formulaire désactivé pendant soumission
- [ ] Formulaire réinitialisé après succès
- [ ] Compteur de caractères fonctionnel
- [ ] Focus automatique sur première erreur
- [ ] Scroll smooth vers les erreurs

### Sécurité
- [ ] Validation côté serveur implémentée
- [ ] Rate limiting actif
- [ ] Honeypot vérifié côté serveur
- [ ] Sanitization des données
- [ ] Protection CSRF (via Nuxt)
- [ ] Variables d'environnement sécurisées

### Accessibilité
- [ ] Labels ARIA appropriés
- [ ] Navigation clavier fonctionnelle
- [ ] Focus visible et logique
- [ ] Messages d'erreur accessibles (aria-live)
- [ ] Contraste des couleurs suffisant

### Performance
- [ ] Validation instantanée côté client
- [ ] Soumission < 2s
- [ ] Pas de re-render inutile
- [ ] Code optimisé

## Tests à Effectuer

### Tests de Validation
1. Soumettre avec nom vide → erreur
2. Soumettre avec email invalide → erreur
3. Soumettre avec message < 10 caractères → erreur
4. Soumettre avec message > 1000 caractères → erreur
5. Soumettre avec sujet non sélectionné → erreur
6. Soumettre avec honeypot rempli → rejet silencieux
7. Soumettre avec tous les champs valides → succès

### Tests d'Envoi
1. Soumettre un formulaire valide → email reçu
2. Soumettre avec erreur serveur → message d'erreur affiché
3. Soumettre plusieurs fois rapidement → rate limiting activé

### Tests UX
1. Focus sur premier champ en erreur après soumission
2. Scroll vers le premier champ en erreur
3. Toast notification affichée après succès
4. Formulaire réinitialisé après succès
5. Compteur de caractères mis à jour en temps réel

## Notes d'Implémentation

### Migration de la Validation

**Avant** (validation manuelle):
```vue
<UFormField 
  :error="form.nom && !form.nom.trim() ? 'Le nom est requis' : false"
>
```

**Après** (validation schema avec Zod):
```vue
<UForm :schema="schema" :state="state" @submit="onSubmit" @error="onError">
  <UFormField name="nom" label="Nom" required>
    <UInput v-model="state.nom" />
  </UFormField>
</UForm>
```

**Schema Zod**:
```typescript
import { z } from 'zod'

const contactSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').trim(),
  // ... autres champs
})
```

### Gestion des Erreurs

Utiliser l'événement `@error` pour focus automatique:
```typescript
function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
```

### Rate Limiting Simple

Pour v1.0, utiliser un Map en mémoire (sera réinitialisé au redémarrage):
```typescript
const submissions = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const hourAgo = now - 3600000
  const userSubmissions = submissions.get(ip) || []
  const recentSubmissions = userSubmissions.filter(time => time > hourAgo)
  
  if (recentSubmissions.length >= 3) {
    return false // Rate limit exceeded
  }
  
  recentSubmissions.push(now)
  submissions.set(ip, recentSubmissions)
  return true
}
```

## Ressources

- [Nuxt UI Form Documentation](https://ui.nuxt.com/docs/components/form)
- [Zod Documentation](https://zod.dev/)
- [Resend Documentation](https://resend.com/docs)
- [Resend Pricing](https://resend.com/pricing) - Plan gratuit: 3000 emails/mois
- [Vercel Guide: Sending Emails](https://vercel.com/guides/sending-emails-from-an-application-on-vercel)
- [Nuxt Server API Routes](https://nuxt.com/docs/guide/directory-structure/server#api-routes)

**Note**: Zod est déjà installé et utilisé dans le projet pour la validation de contenu, ce qui assure la cohérence.

## Prochaines Étapes Après v1.0

- Ajouter ReCAPTCHA v3 si nécessaire
- Envoyer un email de confirmation à l'utilisateur
- Créer un dashboard admin pour voir les messages
- Ajouter la possibilité d'exporter les messages
- Ajouter support des fichiers joints
- Multi-langue du formulaire

