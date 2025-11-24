# Implementation Tasks: Formulaire de Contact Fonctionnel

**Feature**: Formulaire de Contact Fonctionnel  
**Branch**: `008-contact-form`  
**Generated**: 2025-01-27  
**Dernière mise à jour**: 2025-01-27

## Task Breakdown

### Phase 1: Préparation et Dépendances

#### Task 1.1: Vérifier que Zod est installé
**File**: `package.json`  
**Description**: Vérifier que Zod est bien installé (déjà présent dans le projet)  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que `zod` est présent dans `package.json`
- [ ] Vérifier la version installée (^4.1.12)
- [ ] Vérifier que Zod fonctionne avec `import { z } from 'zod'`
- [ ] Note: Zod est déjà utilisé dans le projet pour la validation de contenu

**Note**: Pas besoin d'installer de nouvelle dépendance, Zod est déjà présent.

#### Task 1.2: Installer Resend
**File**: `package.json`  
**Description**: Installer le package Resend pour l'envoi d'emails  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Exécuter `pnpm add resend`
- [ ] Vérifier que `resend` est ajouté aux dépendances
- [ ] Vérifier la version installée (dernière stable recommandée)

**Commande**:
```bash
pnpm add resend
```

#### Task 1.3: Créer un compte Resend
**File**: Configuration externe  
**Description**: Créer un compte Resend et obtenir la clé API  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer un compte gratuit sur https://resend.com
- [ ] Vérifier l'email de confirmation
- [ ] Accéder au dashboard Resend
- [ ] Générer une nouvelle clé API
- [ ] Noter la clé API (commence par `re_`)
- [ ] Pour les tests, utiliser le domaine de test `onboarding@resend.dev`
- [ ] Pour la production, ajouter et vérifier votre domaine (ex: `femat.ml`)

**Note**: Resend offre 3000 emails/mois gratuits (vs 200 pour EmailJS)

#### Task 1.4: Configurer les variables d'environnement
**File**: `.env`, `.env.example`  
**Description**: Ajouter les variables d'environnement pour Resend et les informations de contact  
**Dependencies**: Task 1.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter `RESEND_API_KEY` dans `.env` (clé obtenue depuis Resend dashboard)
- [ ] Ajouter les variables d'informations de contact dans `.env`
- [ ] Créer `.env.example` avec les variables (sans valeurs réelles)
- [ ] Vérifier que `.env` est dans `.gitignore`
- [ ] Documenter les variables dans le README ou la documentation

**Variables à ajouter**:
```env
# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Informations de contact FEMAT
CONTACT_EMAIL=femat3@yahoo.fr
CONTACT_PHONE=+22377551985
CONTACT_PHONE_FORMATTED=+223 77 55 19 85
CONTACT_POSITION=Secrétaire Général
CONTACT_ADDRESS=Bamako, Mali
CONTACT_FACEBOOK=https://www.facebook.com/taekwondomali
```

#### Task 1.5: Analyser le composant ContactForm actuel
**File**: `app/components/ContactForm.vue`  
**Description**: Analyser la structure actuelle du formulaire pour préparer la migration  
**Dependencies**: None  
**Status**: ⏳ Pending

**Détails**:
- [ ] Lire et comprendre la structure actuelle du composant
- [ ] Identifier tous les champs du formulaire
- [ ] Identifier la validation manuelle actuelle
- [ ] Identifier les fonctions de validation (`isValidEmail`, `getMessageError`, etc.)
- [ ] Identifier les états de gestion (`isSubmitting`, `submitStatus`, etc.)
- [ ] Documenter les changements nécessaires

### Phase 2: Création du Schema de Validation et Configuration

#### Task 2.0: Créer le composable useContactInfo
**File**: `app/composables/useContactInfo.ts`  
**Description**: Créer un composable pour centraliser les informations de contact  
**Dependencies**: Task 1.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer le fichier `app/composables/useContactInfo.ts`
- [ ] Utiliser `useRuntimeConfig()` pour accéder aux variables d'environnement
- [ ] Retourner un objet avec toutes les informations de contact
- [ ] Inclure des valeurs par défaut si les variables ne sont pas définies
- [ ] Exporter le composable pour utilisation dans toute l'application

**Code à créer**:
```typescript
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

#### Task 2.1: Configurer nuxt.config.ts pour les informations de contact
**File**: `nuxt.config.ts`  
**Description**: Ajouter la configuration runtime pour les informations de contact  
**Dependencies**: Task 1.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter `runtimeConfig.public.contactEmail` dans `nuxt.config.ts`
- [ ] Ajouter `runtimeConfig.public.contactPhone` dans `nuxt.config.ts`
- [ ] Ajouter `runtimeConfig.public.contactPhoneFormatted` dans `nuxt.config.ts`
- [ ] Ajouter `runtimeConfig.public.contactPosition` dans `nuxt.config.ts`
- [ ] Ajouter `runtimeConfig.public.contactAddress` dans `nuxt.config.ts`
- [ ] Ajouter `runtimeConfig.public.contactFacebook` dans `nuxt.config.ts`
- [ ] Utiliser les variables d'environnement avec valeurs par défaut

**Code à ajouter**:
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

#### Task 2.2: Créer le composable useContactForm
**File**: `app/composables/useContactForm.ts`  
**Description**: Créer le composable avec le schema de validation Zod  
**Dependencies**: Task 1.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer le fichier `app/composables/useContactForm.ts`
- [ ] Importer Zod (`import { z } from 'zod'`)
- [ ] Définir le schema de validation avec toutes les règles
- [ ] Créer le state réactif pour le formulaire
- [ ] Exporter le schema et le state
- [ ] Ajouter les types TypeScript appropriés avec `z.infer`

**Schema à créer**:
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
  honeypot: z.string().max(0, '').optional().default('')
})

type ContactFormData = z.infer<typeof contactSchema>
```

#### Task 2.3: Définir les types TypeScript
**File**: `app/composables/useContactForm.ts`  
**Description**: Définir les types TypeScript pour le formulaire  
**Dependencies**: Task 2.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer le type `ContactFormData` à partir du schema
- [ ] Créer le type pour les options de sujet
- [ ] Exporter les types pour utilisation dans le composant
- [ ] Ajouter la documentation JSDoc

#### Task 2.4: Tester le schema de validation localement
**File**: `app/composables/useContactForm.ts`  
**Description**: Tester le schema de validation avec des données de test  
**Dependencies**: Task 2.2, Task 2.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer des données de test valides
- [ ] Créer des données de test invalides
- [ ] Tester la validation avec `safeParse` (Zod) ou `parse`
- [ ] Vérifier que les messages d'erreur sont corrects
- [ ] Vérifier que tous les cas de validation fonctionnent

**Exemple de test**:
```typescript
const result = contactSchema.safeParse({
  nom: 'Test',
  email: 'test@example.com',
  sujet: 'general',
  message: 'Message de test avec au moins 10 caractères'
})
```

### Phase 3: Migration du Composant ContactForm

#### Task 3.1: Remplacer le formulaire HTML par UForm
**File**: `app/components/ContactForm.vue`  
**Description**: Remplacer `<form>` par `<UForm>` avec le schema  
**Dependencies**: Task 2.1, Task 2.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Importer `useContactForm` dans le composant
- [ ] Remplacer `<form @submit.prevent="handleSubmit">` par `<UForm :schema="schema" :state="state" @submit="onSubmit" @error="onError">`
- [ ] Utiliser le schema et le state du composable
- [ ] Conserver la structure HTML existante (sections, grilles, etc.)
- [ ] Vérifier que le formulaire se compile sans erreurs

#### Task 3.2: Migrer les UFormField vers le système de validation intégré
**File**: `app/components/ContactForm.vue`  
**Description**: Migrer tous les UFormField pour utiliser la validation automatique  
**Dependencies**: Task 3.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Supprimer les props `:error` manuelles des UFormField
- [ ] Ajouter la prop `name` à chaque UFormField correspondant au schema
- [ ] Vérifier que chaque champ correspond au schema
- [ ] Conserver les labels, placeholders et icônes existants
- [ ] Conserver les props `required`, `size`, etc.

**Champs à migrer**:
- [ ] Nom (name="nom")
- [ ] Prénom (name="prenom")
- [ ] Email (name="email")
- [ ] Téléphone (name="telephone")
- [ ] Sujet (name="sujet")
- [ ] Message (name="message")
- [ ] Honeypot (name="honeypot", caché)

#### Task 3.3: Supprimer la validation manuelle
**File**: `app/components/ContactForm.vue`  
**Description**: Supprimer les fonctions de validation manuelle devenues inutiles  
**Dependencies**: Task 3.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Supprimer la fonction `isValidEmail`
- [ ] Supprimer la fonction `getMessageError`
- [ ] Supprimer le computed `isFormValid` (remplacé par la validation du schema)
- [ ] Supprimer la variable `hasAttemptedSubmit` si elle n'est plus nécessaire
- [ ] Nettoyer le code des commentaires obsolètes

#### Task 3.4: Implémenter la gestion d'erreurs avec @error
**File**: `app/components/ContactForm.vue`  
**Description**: Implémenter l'événement @error pour le focus automatique  
**Dependencies**: Task 3.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer la fonction `onError` qui écoute l'événement `@error`
- [ ] Implémenter le focus automatique sur le premier champ en erreur
- [ ] Implémenter le scroll smooth vers le premier champ en erreur
- [ ] Tester que le focus fonctionne correctement
- [ ] Tester que le scroll fonctionne correctement

**Code à implémenter**:
```typescript
function onError(event: FormErrorEvent) {
  if (event?.errors?.[0]?.id) {
    const element = document.getElementById(event.errors[0].id)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
```

#### Task 3.5: Conserver et améliorer le compteur de caractères
**File**: `app/components/ContactForm.vue`  
**Description**: Conserver le compteur de caractères pour le champ message  
**Dependencies**: Task 3.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que le compteur de caractères fonctionne toujours
- [ ] S'assurer qu'il utilise `state.message.length`
- [ ] Conserver la barre de progression
- [ ] Conserver les couleurs (warning à 900+, error à 1000+)
- [ ] Vérifier que le compteur se met à jour en temps réel

#### Task 3.6: Mettre à jour la fonction handleSubmit
**File**: `app/components/ContactForm.vue`  
**Description**: Adapter la fonction de soumission pour utiliser l'API route  
**Dependencies**: Task 3.1, Task 3.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Renommer `handleSubmit` en `onSubmit` pour correspondre à l'événement `@submit`
- [ ] Adapter la signature pour recevoir `FormSubmitEvent`
- [ ] Utiliser `event.data` pour obtenir les données validées
- [ ] Appeler l'API route `/api/contact` avec `$fetch` ou `useFetch`
- [ ] Gérer les réponses de succès et d'erreur
- [ ] Conserver la logique de réinitialisation du formulaire

### Phase 4: Création de l'API Route

#### Task 4.1: Créer l'API route contact.post.ts
**File**: `server/api/contact.post.ts`  
**Description**: Créer l'API route pour recevoir les soumissions du formulaire  
**Dependencies**: Task 1.3, Task 2.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer le fichier `server/api/contact.post.ts`
- [ ] Utiliser `defineEventHandler` pour créer le handler POST
- [ ] Extraire les données du body de la requête
- [ ] Importer et réutiliser le schema de validation
- [ ] Valider les données avec le schema
- [ ] Retourner une réponse JSON appropriée

**Structure de base**:
```typescript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // Validation, rate limiting, honeypot, envoi email
  return { success: true }
})
```

#### Task 4.2: Implémenter la validation côté serveur
**File**: `server/api/contact.post.ts`  
**Description**: Valider les données côté serveur avec le schema Zod  
**Dependencies**: Task 4.1, Task 2.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Importer le schema de validation Zod (ou le recréer côté serveur)
- [ ] Utiliser `safeParse` (Zod) pour valider les données
- [ ] Retourner une erreur 400 si la validation échoue
- [ ] Inclure les messages d'erreur dans la réponse
- [ ] Logger les erreurs de validation pour debugging

**Code à implémenter**:
```typescript
import { z } from 'zod'
// Importer ou recréer contactSchema

const result = contactSchema.safeParse(body)
if (!result.success) {
  throw createError({
    statusCode: 400,
    message: 'Données invalides',
    data: result.error.errors
  })
}
```

#### Task 4.3: Implémenter le rate limiting
**File**: `server/api/contact.post.ts`  
**Description**: Implémenter le rate limiting (3 soumissions/heure par IP)  
**Dependencies**: Task 4.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Créer un Map pour stocker les soumissions par IP
- [ ] Extraire l'IP de la requête (`getClientIP(event)`)
- [ ] Vérifier le nombre de soumissions dans la dernière heure
- [ ] Retourner une erreur 429 si la limite est dépassée
- [ ] Nettoyer les anciennes entrées périodiquement (optionnel)

**Code à implémenter**:
```typescript
const submissions = new Map<string, number[]>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const hourAgo = now - 3600000
  const userSubmissions = submissions.get(ip) || []
  const recentSubmissions = userSubmissions.filter(time => time > hourAgo)
  
  if (recentSubmissions.length >= 3) {
    return false
  }
  
  recentSubmissions.push(now)
  submissions.set(ip, recentSubmissions)
  return true
}
```

#### Task 4.4: Vérifier le honeypot
**File**: `server/api/contact.post.ts`  
**Description**: Vérifier que le champ honeypot est vide  
**Dependencies**: Task 4.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que `body.honeypot` est vide ou undefined
- [ ] Retourner une erreur silencieuse (200 OK mais ne pas traiter) si rempli
- [ ] Logger les tentatives de spam pour monitoring
- [ ] Ne pas révéler que c'est un honeypot dans la réponse

#### Task 4.5: Intégrer Resend pour l'envoi d'email
**File**: `server/api/contact.post.ts`  
**Description**: Intégrer Resend pour envoyer les emails à femat3@yahoo.fr  
**Dependencies**: Task 4.1, Task 1.3, Task 1.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Importer Resend dans l'API route (`import { Resend } from 'resend'`)
- [ ] Créer une instance Resend avec la clé API
- [ ] Créer le template HTML pour l'email
- [ ] Configurer l'expéditeur (utiliser domaine vérifié ou `onboarding@resend.dev` pour tests)
- [ ] Configurer le destinataire: `femat3@yahoo.fr` (Secrétaire Général)
- [ ] Envoyer l'email avec `resend.emails.send`
- [ ] Gérer les erreurs d'envoi d'email
- [ ] Logger les envois réussis et échoués

**Code à implémenter**:
```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const { data, error } = await resend.emails.send({
  from: 'FEMAT Contact <onboarding@resend.dev>', // Utiliser domaine vérifié en production
  to: ['femat3@yahoo.fr'],
  subject: `Nouveau message de contact FEMAT - ${body.sujet}`,
  html: `
    <h2>Nouveau message de contact FEMAT</h2>
    <p><strong>Nom:</strong> ${body.nom} ${body.prenom || ''}</p>
    <p><strong>Email:</strong> ${body.email}</p>
    <p><strong>Téléphone:</strong> ${body.telephone || 'Non fourni'}</p>
    <p><strong>Sujet:</strong> ${body.sujet}</p>
    <p><strong>Message:</strong></p>
    <p>${body.message}</p>
    <hr>
    <p><em>Ce message a été envoyé automatiquement depuis le site web FEMAT.</em></p>
  `
})

if (error) {
  throw createError({
    statusCode: 500,
    message: 'Erreur lors de l\'envoi de l\'email',
    data: error
  })
}
```

**Note**: 
- Pour les tests, utiliser `onboarding@resend.dev` comme expéditeur
- Pour la production, ajouter et vérifier votre domaine dans Resend (ex: `contact@femat.ml`)
- Resend offre 3000 emails/mois gratuits

#### Task 4.6: Gérer les erreurs et retourner des réponses appropriées
**File**: `server/api/contact.post.ts`  
**Description**: Gérer tous les cas d'erreur et retourner des réponses HTTP appropriées  
**Dependencies**: Task 4.2, Task 4.3, Task 4.5  
**Status**: ⏳ Pending

**Détails**:
- [ ] Gérer les erreurs de validation (400 Bad Request)
- [ ] Gérer les erreurs de rate limiting (429 Too Many Requests)
- [ ] Gérer les erreurs d'envoi d'email (500 Internal Server Error)
- [ ] Retourner des messages d'erreur clairs mais sécurisés
- [ ] Logger toutes les erreurs pour debugging
- [ ] Retourner 200 OK avec `{ success: true }` en cas de succès

#### Task 4.7: Logger les soumissions pour debugging
**File**: `server/api/contact.post.ts`  
**Description**: Logger les soumissions pour faciliter le debugging  
**Dependencies**: Task 4.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Logger les soumissions réussies (sans données sensibles)
- [ ] Logger les erreurs avec contexte
- [ ] Logger les tentatives de spam (honeypot rempli)
- [ ] Logger les rate limits dépassés
- [ ] Utiliser `console.log` ou un système de logging approprié

### Phase 5: Amélioration du Feedback Utilisateur

#### Task 5.1: Intégrer useToast pour les notifications
**File**: `app/components/ContactForm.vue`  
**Description**: Intégrer useToast pour remplacer UAlert  
**Dependencies**: Task 3.6  
**Status**: ⏳ Pending

**Détails**:
- [ ] Importer `useToast` dans le composant
- [ ] Créer une instance de toast: `const toast = useToast()`
- [ ] Remplacer les `UAlert` par des appels à `toast.add()`
- [ ] Configurer les toasts pour succès et erreur
- [ ] Tester que les toasts s'affichent correctement

**Code à implémenter**:
```typescript
const toast = useToast()

// Succès
toast.add({
  title: 'Message envoyé !',
  description: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
  color: 'success',
  icon: 'i-heroicons-check-circle'
})

// Erreur
toast.add({
  title: 'Erreur lors de l\'envoi',
  description: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.',
  color: 'error',
  icon: 'i-heroicons-exclamation-triangle'
})
```

#### Task 5.2: Supprimer UAlert du template
**File**: `app/components/ContactForm.vue`  
**Description**: Supprimer le composant UAlert remplacé par les toasts  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Supprimer le composant `<UAlert>` du template
- [ ] Supprimer les variables `submitStatus` et `submitMessage` si elles ne sont plus utilisées
- [ ] Nettoyer le code des références obsolètes

#### Task 5.3: Améliorer les états de chargement
**File**: `app/components/ContactForm.vue`  
**Description**: Améliorer les états de chargement pendant la soumission  
**Dependencies**: Task 3.6  
**Status**: ⏳ Pending

**Détails**:
- [ ] Conserver la variable `isSubmitting`
- [ ] S'assurer que tous les champs sont désactivés pendant la soumission
- [ ] S'assurer que le bouton de soumission affiche l'état de chargement
- [ ] Vérifier que le texte du bouton change pendant le chargement
- [ ] Tester que l'UX est fluide

#### Task 5.4: Ajouter des animations subtiles
**File**: `app/components/ContactForm.vue`  
**Description**: Ajouter des animations subtiles pour améliorer l'UX  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter des transitions sur les champs du formulaire
- [ ] Ajouter des animations sur les messages d'erreur
- [ ] Utiliser les classes Tailwind pour les transitions
- [ ] S'assurer que les animations sont subtiles et non intrusives

#### Task 5.5: Améliorer les messages d'erreur/succès
**File**: `app/components/ContactForm.vue`  
**Description**: Améliorer les messages d'erreur et de succès  
**Dependencies**: Task 5.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] S'assurer que les messages sont clairs et actionnables
- [ ] Personnaliser les messages selon le type d'erreur
- [ ] Ajouter des messages spécifiques pour le rate limiting
- [ ] Tester que tous les messages sont appropriés

### Phase 6: Protection Anti-Spam Renforcée

#### Task 6.1: Vérifier que le honeypot fonctionne correctement
**File**: `app/components/ContactForm.vue`, `server/api/contact.post.ts`  
**Description**: Vérifier et tester le honeypot  
**Dependencies**: Task 3.2, Task 4.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que le champ honeypot est bien caché (display: none)
- [ ] Vérifier que le champ honeypot a `tabindex="-1"` et `autocomplete="off"`
- [ ] Tester que remplir le honeypot ne soumet pas le formulaire
- [ ] Vérifier que le serveur rejette silencieusement les soumissions avec honeypot rempli
- [ ] Documenter le fonctionnement du honeypot

#### Task 6.2: Tester le rate limiting
**File**: `server/api/contact.post.ts`  
**Description**: Tester le rate limiting en conditions réelles  
**Dependencies**: Task 4.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester en soumettant 3 formulaires rapidement → succès
- [ ] Tester en soumettant un 4ème formulaire → erreur 429
- [ ] Tester après 1 heure → nouveau formulaire accepté
- [ ] Vérifier que le message d'erreur est approprié
- [ ] Vérifier que le rate limiting fonctionne par IP

#### Task 6.3: Ajouter validation des données suspectes (optionnel)
**File**: `server/api/contact.post.ts`  
**Description**: Ajouter des validations supplémentaires pour détecter le spam  
**Dependencies**: Task 4.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier les patterns suspects dans le message (liens, mots-clés spam)
- [ ] Vérifier la longueur excessive du message
- [ ] Vérifier les caractères suspects
- [ ] Logger les tentatives suspectes
- [ ] Retourner une erreur appropriée si nécessaire

#### Task 6.4: Documenter les mesures de protection
**File**: `specs/008-contact-form/` ou documentation  
**Description**: Documenter toutes les mesures de protection anti-spam  
**Dependencies**: Task 6.1, Task 6.2, Task 6.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter le honeypot
- [ ] Documenter le rate limiting
- [ ] Documenter les validations supplémentaires
- [ ] Expliquer comment ces mesures protègent contre le spam
- [ ] Ajouter des notes pour futures améliorations (ReCAPTCHA, etc.)

### Phase 7: Accessibilité et UX

#### Task 7.1: Vérifier les labels ARIA
**File**: `app/components/ContactForm.vue`  
**Description**: Vérifier que tous les champs ont des labels ARIA appropriés  
**Dependencies**: Task 3.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que chaque `UFormField` a un `label` approprié
- [ ] Vérifier que les champs ont des `id` uniques
- [ ] Vérifier que les messages d'erreur sont liés aux champs avec `aria-describedby`
- [ ] Vérifier que les champs requis ont `aria-required="true"`
- [ ] Tester avec un lecteur d'écran (optionnel)

#### Task 7.2: Tester la navigation au clavier
**File**: `app/components/ContactForm.vue`  
**Description**: Tester que la navigation au clavier fonctionne correctement  
**Dependencies**: Task 3.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester la navigation Tab entre les champs
- [ ] Tester Shift+Tab pour revenir en arrière
- [ ] Tester Enter pour soumettre le formulaire
- [ ] Vérifier que l'ordre de tabulation est logique
- [ ] Vérifier que le focus est visible

#### Task 7.3: Vérifier le focus visible
**File**: `app/components/ContactForm.vue`  
**Description**: Vérifier que le focus est visible sur tous les éléments interactifs  
**Dependencies**: Task 3.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que les champs ont un style de focus visible
- [ ] Vérifier que le bouton de soumission a un style de focus visible
- [ ] Tester avec différents navigateurs
- [ ] Vérifier le contraste du focus

#### Task 7.4: Ajouter aria-live pour les messages d'erreur
**File**: `app/components/ContactForm.vue`  
**Description**: Ajouter aria-live pour annoncer les messages d'erreur aux lecteurs d'écran  
**Dependencies**: Task 3.2  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter une région `aria-live="polite"` pour les messages d'erreur
- [ ] S'assurer que les messages d'erreur sont annoncés par les lecteurs d'écran
- [ ] Tester avec un lecteur d'écran (optionnel)
- [ ] Vérifier que les messages sont annoncés au bon moment

#### Task 7.5: Tester avec un lecteur d'écran (optionnel)
**File**: `app/components/ContactForm.vue`  
**Description**: Tester le formulaire avec un lecteur d'écran pour vérifier l'accessibilité  
**Dependencies**: Task 7.1, Task 7.2, Task 7.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Installer un lecteur d'écran (NVDA, JAWS, VoiceOver)
- [ ] Tester la navigation dans le formulaire
- [ ] Vérifier que les labels sont annoncés correctement
- [ ] Vérifier que les messages d'erreur sont annoncés
- [ ] Documenter les problèmes trouvés et les corriger

### Phase 8: Tests et Optimisations

#### Task 8.1: Tester tous les cas de validation
**File**: `app/components/ContactForm.vue`  
**Description**: Tester tous les cas de validation du formulaire  
**Dependencies**: Phase 3 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester avec nom vide → erreur
- [ ] Tester avec nom < 2 caractères → erreur
- [ ] Tester avec email invalide → erreur
- [ ] Tester avec message < 10 caractères → erreur
- [ ] Tester avec message > 1000 caractères → erreur
- [ ] Tester avec sujet non sélectionné → erreur
- [ ] Tester avec tous les champs valides → succès
- [ ] Vérifier que les messages d'erreur sont corrects

#### Task 8.2: Tester l'envoi d'email (succès et erreur)
**File**: `app/components/ContactForm.vue`, `server/api/contact.post.ts`  
**Description**: Tester l'envoi d'email dans différents scénarios  
**Dependencies**: Phase 4 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester avec un formulaire valide → email reçu à `femat3@yahoo.fr`
- [ ] Tester avec une erreur Resend → message d'erreur affiché
- [ ] Vérifier que l'email contient toutes les informations
- [ ] Vérifier le format HTML de l'email
- [ ] Tester avec différents sujets
- [ ] Vérifier que l'expéditeur est correct (domaine vérifié ou `onboarding@resend.dev`)

#### Task 8.3: Tester le rate limiting
**File**: `server/api/contact.post.ts`  
**Description**: Tester le rate limiting en conditions réelles  
**Dependencies**: Task 4.3  
**Status**: ⏳ Pending

**Détails**:
- [ ] Soumettre 3 formulaires rapidement → succès
- [ ] Soumettre un 4ème formulaire → erreur 429
- [ ] Vérifier que le message d'erreur est approprié
- [ ] Attendre 1 heure et tester à nouveau → succès
- [ ] Vérifier que le rate limiting fonctionne par IP

#### Task 8.4: Tester le honeypot
**File**: `app/components/ContactForm.vue`, `server/api/contact.post.ts`  
**Description**: Tester que le honeypot fonctionne correctement  
**Dependencies**: Task 6.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Remplir le champ honeypot manuellement (via DevTools)
- [ ] Soumettre le formulaire → rejet silencieux
- [ ] Vérifier qu'aucun email n'est envoyé
- [ ] Vérifier que le serveur retourne 200 OK (pour ne pas révéler le honeypot)
- [ ] Vérifier que les tentatives sont loggées

#### Task 8.5: Tester sur différents navigateurs
**File**: `app/components/ContactForm.vue`  
**Description**: Tester le formulaire sur différents navigateurs  
**Dependencies**: Phase 3 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester sur Chrome/Edge (Chromium)
- [ ] Tester sur Firefox
- [ ] Tester sur Safari (si disponible)
- [ ] Vérifier que le formulaire fonctionne sur tous les navigateurs
- [ ] Vérifier que les styles sont cohérents

#### Task 8.6: Tester sur mobile/tablette/desktop
**File**: `app/components/ContactForm.vue`  
**Description**: Tester le formulaire sur différentes tailles d'écran  
**Dependencies**: Phase 3 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Tester sur mobile (< 640px)
- [ ] Tester sur tablette (640px - 1024px)
- [ ] Tester sur desktop (> 1024px)
- [ ] Vérifier que le layout est responsive
- [ ] Vérifier que tous les éléments sont accessibles
- [ ] Vérifier que le formulaire est utilisable sur mobile

#### Task 8.7: Vérifier les performances
**File**: `app/components/ContactForm.vue`, `server/api/contact.post.ts`  
**Description**: Vérifier les performances du formulaire  
**Dependencies**: Phase 3, Phase 4 complétées  
**Status**: ⏳ Pending

**Détails**:
- [ ] Vérifier que la validation est instantanée
- [ ] Vérifier que la soumission est < 2s
- [ ] Vérifier qu'il n'y a pas de re-render inutile
- [ ] Utiliser les DevTools pour analyser les performances
- [ ] Optimiser si nécessaire

#### Task 8.8: Optimiser le code si nécessaire
**File**: Tous les fichiers modifiés  
**Description**: Optimiser le code pour améliorer les performances et la maintenabilité  
**Dependencies**: Task 8.7  
**Status**: ⏳ Pending

**Détails**:
- [ ] Réduire les re-renders inutiles
- [ ] Optimiser les imports
- [ ] Nettoyer le code mort
- [ ] Améliorer les commentaires
- [ ] Refactoriser si nécessaire

### Phase 9: Documentation

#### Task 9.1: Documenter le schema de validation
**File**: `app/composables/useContactForm.ts`  
**Description**: Ajouter la documentation JSDoc pour le schema Zod  
**Dependencies**: Task 2.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter des commentaires JSDoc pour le schema
- [ ] Documenter chaque règle de validation Zod
- [ ] Documenter les messages d'erreur
- [ ] Ajouter des exemples d'utilisation
- [ ] Mentionner que Zod est déjà utilisé dans le projet pour la cohérence

#### Task 9.2: Documenter l'API route
**File**: `server/api/contact.post.ts`  
**Description**: Ajouter la documentation pour l'API route  
**Dependencies**: Phase 4 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter les paramètres de la requête
- [ ] Documenter les réponses possibles
- [ ] Documenter les codes d'erreur
- [ ] Documenter le rate limiting
- [ ] Documenter la protection anti-spam

#### Task 9.3: Documenter la configuration Resend
**File**: Documentation ou README  
**Description**: Documenter la configuration Resend  
**Dependencies**: Task 1.2, Task 1.3, Task 1.4  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter comment créer un compte Resend (gratuit sur https://resend.com)
- [ ] Documenter comment obtenir la clé API depuis le dashboard
- [ ] Documenter comment vérifier un domaine d'envoi (pour production)
- [ ] Documenter l'utilisation du domaine de test `onboarding@resend.dev` pour les tests
- [ ] Documenter que le destinataire est `femat3@yahoo.fr` (Secrétaire Général)
- [ ] Documenter les variables d'environnement (`RESEND_API_KEY`)
- [ ] Documenter le plan gratuit (3000 emails/mois)
- [ ] Ajouter des exemples de configuration
- [ ] Mentionner que Resend est recommandé par Vercel

#### Task 9.6: Documenter la configuration des informations de contact
**File**: Documentation ou README  
**Description**: Documenter comment modifier les informations de contact  
**Dependencies**: Task 2.0, Task 2.1  
**Status**: ⏳ Pending

**Détails**:
- [ ] Documenter le composable `useContactInfo`
- [ ] Expliquer comment modifier les informations via variables d'environnement
- [ ] Documenter les valeurs par défaut actuelles:
  - Email: `femat3@yahoo.fr`
  - Téléphone: `+223 77 55 19 85`
  - Poste: `Secrétaire Général`
  - Adresse: `Bamako, Mali`
- [ ] Expliquer que les modifications se font dans `.env` ou `nuxt.config.ts`
- [ ] Ajouter des exemples de modification

#### Task 9.4: Ajouter des commentaires dans le code
**File**: Tous les fichiers modifiés  
**Description**: Ajouter des commentaires utiles dans le code  
**Dependencies**: Toutes les phases  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter des commentaires pour les parties complexes
- [ ] Expliquer les décisions de design
- [ ] Documenter les fonctions importantes
- [ ] Ajouter des TODO si nécessaire

#### Task 9.5: Mettre à jour le README si nécessaire
**File**: `README.md`  
**Description**: Mettre à jour le README avec les informations sur le formulaire de contact  
**Dependencies**: Phase 9 complétée  
**Status**: ⏳ Pending

**Détails**:
- [ ] Ajouter une section sur le formulaire de contact
- [ ] Documenter les variables d'environnement nécessaires
- [ ] Ajouter des instructions de configuration
- [ ] Mettre à jour les dépendances si nécessaire

## Checklist Globale

### Fonctionnalités Core
- [ ] Validation schema fonctionnelle avec Zod
- [ ] Tous les champs validés correctement
- [ ] Messages d'erreur automatiques via UFormField
- [ ] Validation en temps réel (blur/change)
- [ ] Soumission fonctionnelle vers l'API
- [ ] Emails reçus correctement via Resend
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

## Notes

- Toutes les tâches doivent être complétées dans l'ordre des phases
- Les dépendances entre tâches doivent être respectées
- Tester chaque phase avant de passer à la suivante
- Documenter les problèmes rencontrés et leurs solutions
- Mettre à jour ce fichier au fur et à mesure de l'avancement

## Ressources

- [Nuxt UI Form Documentation](https://ui.nuxt.com/docs/components/form)
- [Zod Documentation](https://zod.dev/)
- [Resend Documentation](https://resend.com/docs)
- [Resend Pricing](https://resend.com/pricing) - Plan gratuit: 3000 emails/mois
- [Vercel Guide: Sending Emails](https://vercel.com/guides/sending-emails-from-an-application-on-vercel)
- [Nuxt Server API Routes](https://nuxt.com/docs/guide/directory-structure/server#api-routes)

**Note**: 
- Zod est déjà installé et utilisé dans le projet pour la validation de contenu (`content.config.ts`, `composables/content/utils.ts`), ce qui assure la cohérence avec le reste du codebase.
- Resend est recommandé officiellement par Vercel et offre un plan gratuit généreux (3000 emails/mois vs 200 pour EmailJS).

**Informations de contact FEMAT**:
- Email: `femat3@yahoo.fr`
- Téléphone: `+223 77 55 19 85`
- Poste: `Secrétaire Général`
- Adresse: `Bamako, Mali`

**Modification des informations de contact**:
Pour modifier les informations de contact dans le futur, il suffit de:
1. Modifier les variables d'environnement dans `.env`
2. Ou modifier les valeurs par défaut dans `nuxt.config.ts`
3. Le composable `useContactInfo` récupérera automatiquement les nouvelles valeurs
4. Toutes les pages utilisant `useContactInfo` seront automatiquement mises à jour

