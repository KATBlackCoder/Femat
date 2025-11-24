# Feature Specification: Formulaire de Contact Fonctionnel

**Feature ID**: `008-contact-form`  
**Date**: 2025-01-27  
**Status**: Draft  
**Priority**: P1 (Critique - nécessaire avant déploiement)

## Overview

Rendre le formulaire de contact de la page `/contact` complètement fonctionnel en utilisant les meilleures pratiques Nuxt UI avec validation schema, gestion d'erreurs robuste, et intégration backend pour l'envoi des messages.

## Context

Le composant `ContactForm.vue` existe actuellement mais utilise une validation manuelle basique. Il doit être migré vers le système de validation recommandé par Nuxt UI (`UForm` avec schema) et intégrer un vrai backend pour l'envoi des messages.

**Informations de contact FEMAT**:
- **Email**: femat3@yahoo.fr
- **Téléphone**: +223 77 55 19 85 (Secrétaire Général)
- **Adresse**: Bamako, Mali
- **Poste**: Secrétaire Général

## Functional Requirements

### FR-1: Migration vers UForm avec Schema Validation
**Description**: Migrer le formulaire vers le composant `UForm` de Nuxt UI avec validation par schema.

**Acceptance Criteria**:
- [ ] Utilisation du composant `UForm` au lieu d'un `<form>` HTML
- [ ] Validation avec schema (Zod, déjà installé dans le projet)
- [ ] Messages d'erreur automatiques via `UFormField`
- [ ] Validation en temps réel sur `blur` et `change`
- [ ] Validation complète à la soumission

**Schema de validation**:
- Nom: requis, min 2 caractères
- Prénom: optionnel
- Email: requis, format email valide
- Téléphone: optionnel, format international si fourni
- Sujet: requis, sélection parmi les options
- Message: requis, min 10 caractères, max 1000 caractères
- Honeypot: doit rester vide (protection anti-spam)

### FR-2: Gestion d'Erreurs Améliorée
**Description**: Améliorer la gestion des erreurs avec les événements `@error` de `UForm`.

**Acceptance Criteria**:
- [ ] Écoute de l'événement `@error` pour gérer les erreurs de validation
- [ ] Focus automatique sur le premier champ en erreur
- [ ] Scroll smooth vers le premier champ en erreur
- [ ] Messages d'erreur clairs et contextuels
- [ ] Gestion des erreurs réseau/serveur

### FR-3: Intégration Backend pour l'Envoi
**Description**: Créer une API route Nuxt pour recevoir et traiter les soumissions du formulaire.

**Acceptance Criteria**:
- [ ] API route `/api/contact` créée
- [ ] Validation côté serveur des données
- [ ] Protection contre le spam (honeypot, rate limiting)
- [ ] Envoi d'email via service externe (EmailJS recommandé)
- [ ] Email envoyé à `femat3@yahoo.fr` (Secrétaire Général)
- [ ] Réponse JSON appropriée (succès/erreur)
- [ ] Gestion des erreurs serveur

**Destinataire email**:
- Email principal: `femat3@yahoo.fr`
- Poste: Secrétaire Général

### FR-4: Feedback Utilisateur Amélioré
**Description**: Améliorer le feedback utilisateur avec Toast notifications et états de chargement.

**Acceptance Criteria**:
- [ ] Toast notification pour succès/erreur (via `useToast`)
- [ ] État de chargement pendant la soumission
- [ ] Désactivation des champs pendant la soumission
- [ ] Réinitialisation du formulaire après succès
- [ ] Message de confirmation clair

### FR-5: Protection Anti-Spam
**Description**: Renforcer la protection anti-spam du formulaire.

**Acceptance Criteria**:
- [ ] Honeypot field (déjà présent, à maintenir)
- [ ] Rate limiting côté serveur (max 3 soumissions/heure par IP)
- [ ] Validation reCAPTCHA optionnelle (v3 recommandé)
- [ ] Validation des données suspectes

### FR-6: Accessibilité et UX
**Description**: Améliorer l'accessibilité et l'expérience utilisateur.

**Acceptance Criteria**:
- [ ] Labels ARIA appropriés
- [ ] Navigation au clavier fonctionnelle
- [ ] Focus visible et logique
- [ ] Messages d'erreur accessibles (aria-live)
- [ ] Compteur de caractères pour le message (déjà présent, à améliorer)
- [ ] Indicateurs visuels de validation

### FR-7: Configuration Centralisée des Informations de Contact
**Description**: Créer un système de configuration centralisé pour les informations de contact, facilement modifiable.

**Acceptance Criteria**:
- [ ] Composable `useContactInfo` créé pour centraliser les informations
- [ ] Informations stockées dans un fichier de configuration ou variables d'environnement
- [ ] Facilement modifiable sans toucher au code
- [ ] Utilisé dans la page contact et le formulaire
- [ ] Documentation claire pour les modifications futures

**Informations à configurer**:
- Email: `femat3@yahoo.fr`
- Téléphone: `+223 77 55 19 85`
- Poste: `Secrétaire Général`
- Adresse: `Bamako, Mali`

## Non-Functional Requirements

### NFR-1: Performance
- Soumission du formulaire < 2s (temps de réponse serveur)
- Validation côté client instantanée
- Pas de re-render inutile

### NFR-2: Sécurité
- Validation côté serveur obligatoire
- Protection CSRF
- Sanitization des données
- Rate limiting
- Protection contre l'injection

### NFR-3: Compatibilité
- Compatible avec tous les navigateurs modernes
- Responsive (mobile, tablette, desktop)
- Fonctionne sans JavaScript (graceful degradation)

## Technical Considerations

### Validation Schema avec Zod

**Note**: Zod est déjà installé dans le projet (`zod@^4.1.12`) et utilisé pour la validation de contenu. Nuxt UI Form supporte nativement Zod.

**Schema de validation**:
```typescript
import { z } from 'zod'

const contactSchema = z.object({
  nom: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .trim(),
  prenom: z.string().trim().optional(),
  email: z.string()
    .email('Email invalide')
    .trim()
    .toLowerCase(),
  telephone: z.string()
    .regex(/^\+?[\d\s-()]+$/, 'Format de téléphone invalide')
    .optional()
    .or(z.literal('')),
  sujet: z.enum(['general', 'inscription', 'events', 'other'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un sujet' })
  }),
  message: z.string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(1000, 'Le message ne peut pas dépasser 1000 caractères')
    .trim(),
  honeypot: z.string().max(0, '').optional().default('') // Doit être vide
})

type ContactFormData = z.infer<typeof contactSchema>
```

### API Route `/api/contact`

**Structure**:
```typescript
// server/api/contact.post.ts
export default defineEventHandler(async (event) => {
  // 1. Rate limiting
  // 2. Validation honeypot
  // 3. Validation des données
  // 4. Envoi email
  // 5. Réponse
})
```

**Options d'envoi d'email**:
1. **Resend** (recommandé par Vercel, 3000 emails/mois gratuits) ✅ **CHOISI**
2. **EmailJS** (200 emails/mois gratuits)
3. **SMTP direct** (via nodemailer)
4. **Formspree** (service tiers, pas de backend nécessaire)

**Recommandation**: **Resend** pour v1.0 - Recommandé par Vercel, plan gratuit généreux (3000 emails/mois), API moderne et simple.

### Composable `useContactForm`

Créer un composable pour centraliser la logique du formulaire:
```typescript
// composables/useContactForm.ts
export const useContactForm = () => {
  const state = reactive({...})
  const schema = contactSchema
  const toast = useToast()
  
  async function onSubmit(event: FormSubmitEvent) {
    // Logique de soumission
  }
  
  return { state, schema, onSubmit }
}
```

### Protection Rate Limiting

Utiliser `@nuxtjs/rate-limit` ou implémenter une solution simple avec stockage en mémoire (Map avec timestamp).

## Design Guidelines

- Utiliser les composants Nuxt UI (`UForm`, `UFormField`, `UInput`, `UTextarea`, `USelect`)
- Suivre les patterns de validation recommandés par Nuxt UI
- Messages d'erreur en français, clairs et actionnables
- Design cohérent avec le reste du site
- Animations subtiles pour les transitions

## Out of Scope (v1.0)

- ReCAPTCHA v3 (peut être ajouté plus tard si nécessaire)
- Notifications email de confirmation à l'utilisateur
- Dashboard admin pour voir les messages
- Export des messages
- Fichiers joints dans le formulaire
- Multi-langue du formulaire

## Dependencies

- `zod` pour la validation schema (déjà installé dans le projet)
- `resend` pour l'envoi d'emails (recommandé par Vercel, 3000 emails/mois gratuits)
- `@nuxtjs/rate-limit` ou solution custom pour rate limiting

## Open Questions

- [x] Quel service d'envoi d'email utiliser ? → **Resend (recommandé par Vercel)**
- [ ] Faut-il ajouter ReCAPTCHA v3 dès maintenant ?
- [x] Quelle adresse email recevra les messages ? → **femat3@yahoo.fr (Secrétaire Général)**
- [ ] Faut-il stocker les messages en base de données ?

**Informations de contact confirmées**:
- Email: `femat3@yahoo.fr`
- Téléphone: `+223 77 55 19 85`
- Poste: Secrétaire Général
- Adresse: Bamako, Mali

**Note**: Zod est déjà utilisé dans le projet pour la validation de contenu (`content.config.ts`, `composables/content/utils.ts`), ce qui assure la cohérence avec le reste du codebase.

## Implementation Plan

1. **Étape 1**: Configuration du service d'envoi d'email
   - Installer `resend` (`pnpm add resend`)
   - Créer un compte Resend (gratuit, 3000 emails/mois)
   - Obtenir la clé API Resend
   - Configurer les variables d'environnement
   - Note: Zod est déjà installé

2. **Étape 2**: Créer le schema de validation
   - Définir le schema Zod
   - Créer le composable `useContactForm`

3. **Étape 3**: Migrer le composant ContactForm
   - Remplacer `<form>` par `<UForm>`
   - Intégrer le schema de validation
   - Améliorer la gestion des erreurs

4. **Étape 4**: Créer l'API route
   - Créer `/api/contact.post.ts`
   - Implémenter la validation serveur
   - Implémenter le rate limiting
   - Intégrer l'envoi d'email

5. **Étape 5**: Améliorer le feedback utilisateur
   - Intégrer `useToast` pour les notifications
   - Améliorer les états de chargement
   - Améliorer les messages d'erreur

6. **Étape 6**: Tests et optimisations
   - Tester tous les cas d'usage
   - Tester la validation
   - Tester l'envoi d'email
   - Vérifier l'accessibilité

## Success Criteria

- [ ] Formulaire fonctionnel avec validation schema
- [ ] Messages envoyés avec succès via l'API
- [ ] Protection anti-spam efficace
- [ ] Feedback utilisateur clair et immédiat
- [ ] Accessibilité conforme (WCAG 2.1 AA)
- [ ] Performance optimale
- [ ] Code maintenable et bien documenté

## Checklist de Validation

### Fonctionnalités
- [ ] Validation schema fonctionnelle
- [ ] Tous les champs validés correctement
- [ ] Messages d'erreur appropriés
- [ ] Soumission fonctionnelle
- [ ] Emails reçus correctement
- [ ] Rate limiting fonctionnel
- [ ] Honeypot fonctionnel

### UX/UI
- [ ] Feedback visuel clair
- [ ] États de chargement visibles
- [ ] Messages de succès/erreur clairs
- [ ] Formulaire réinitialisé après succès
- [ ] Compteur de caractères fonctionnel

### Sécurité
- [ ] Validation côté serveur
- [ ] Protection CSRF
- [ ] Rate limiting actif
- [ ] Honeypot fonctionnel
- [ ] Sanitization des données

### Accessibilité
- [ ] Labels ARIA appropriés
- [ ] Navigation clavier fonctionnelle
- [ ] Focus visible
- [ ] Messages d'erreur accessibles

## Ressources

- [Documentation Nuxt UI Form](https://ui.nuxt.com/docs/components/form)
- [Documentation Zod](https://zod.dev/)
- [Resend Documentation](https://resend.com/docs)
- [Resend Pricing](https://resend.com/pricing) - Plan gratuit: 3000 emails/mois
- [Vercel Guide: Sending Emails](https://vercel.com/guides/sending-emails-from-an-application-on-vercel)
- [Nuxt Server API Routes](https://nuxt.com/docs/guide/directory-structure/server#api-routes)

## Notes

- Le formulaire actuel utilise une validation manuelle qui fonctionne mais n'est pas optimale
- La migration vers `UForm` avec schema Zod améliorera la maintenabilité et la robustesse
- Zod est déjà utilisé dans le projet pour la validation de contenu, assurant la cohérence
- **Resend est recommandé** car :
  - Recommandé officiellement par Vercel
  - Plan gratuit généreux : 3000 emails/mois (vs 200 pour EmailJS)
  - API moderne et simple à utiliser
  - Intégration facile avec Nuxt API routes
  - Meilleure délivrabilité et fonctionnalités avancées
- Le rate limiting est essentiel pour éviter le spam
- La validation côté serveur est obligatoire pour la sécurité

