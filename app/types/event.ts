/**
 * Types TypeScript pour les événements de la FEMAT
 * Compatible avec Nuxt Content v3
 * 
 * Les types sont alignés avec les schémas Zod définis dans `content.config.ts`
 */

/**
 * Types d'événements disponibles
 */
export type EventType = 'competition' | 'training' | 'ceremony' | 'social'

/**
 * Statut d'un événement
 * - `upcoming`: Événement à venir (date de début dans le futur)
 * - `ongoing`: Événement en cours (date de début passée/aujourd'hui et date de fin dans le futur/aujourd'hui)
 * - `past`: Événement passé (date de fin passée)
 * 
 * Note: Le statut peut être calculé dynamiquement avec `isEventPast()` et `isEventOngoing()`
 */
export type EventStatus = 'upcoming' | 'ongoing' | 'past'

/**
 * Interface principale pour un événement
 * 
 * @example
 * ```typescript
 * const event: Event = {
 *   _path: '/events/championnat-2025',
 *   title: 'Championnat National 2025',
 *   date: '2025-03-15',
 *   endDate: '2025-03-17',
 *   startTime: '09:00',
 *   endTime: '18:00',
 *   location: 'Bamako',
 *   description: 'Description de l\'événement',
 *   type: 'competition',
 *   status: 'ongoing',
 *   published: true
 * }
 * ```
 */
export interface Event {
  /** 
   * Chemin de l'événement généré par Nuxt Content (ex: /events/mon-evenement)
   * Nuxt Content v3 utilise `_path` pour le chemin
   */
  _path?: string
  
  /** Titre de l'événement (obligatoire) */
  title: string
  
  /** 
   * Date de début de l'événement au format ISO (YYYY-MM-DD)
   * @example '2025-03-15'
   */
  date: string
  
  /** 
   * Date de fin de l'événement au format ISO (YYYY-MM-DD, optionnel)
   * Pour les événements multi-jours
   * @example '2025-03-17'
   */
  endDate?: string
  
  /** 
   * Heure de début au format 24h (HH:mm, optionnel)
   * @example '09:00'
   */
  startTime?: string
  
  /** 
   * Heure de fin au format 24h (HH:mm, optionnel)
   * @example '18:00'
   */
  endTime?: string
  
  /** Lieu de l'événement (obligatoire) */
  location: string
  
  /** Description de l'événement (obligatoire) */
  description: string
  
  /** 
   * Type d'événement (obligatoire)
   * @see EventType
   */
  type: EventType
  
  /** 
   * Statut de l'événement (obligatoire dans le schéma, peut être calculé)
   * @see EventStatus
   * @see isEventPast() dans useEvents.ts
   */
  status: EventStatus
  
  /** 
   * Image de couverture (chemin relatif depuis /public, optionnel)
   * @example '/events/images/championnat-2025.jpg'
   */
  image?: string
  
  /** 
   * Statut de publication (optionnel, défaut: true)
   * @default true
   */
  published?: boolean
  
  /** 
   * Contenu Markdown de l'événement (généré par Nuxt Content)
   * Nuxt Content v3 peut utiliser `body` ou `_body`
   */
  _body?: string
  body?: any
  
  /** ID unique de l'événement (généré par Nuxt Content) */
  _id?: string
  
  /** Type de contenu (généré par Nuxt Content) */
  _type?: string
  
  /** Date de création (générée par Nuxt Content) */
  createdAt?: string
  
  /** Date de mise à jour (générée par Nuxt Content) */
  updatedAt?: string
}

