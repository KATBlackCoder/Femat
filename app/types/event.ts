/**
 * Type partagé pour les événements de la FEMAT
 * Compatible avec Nuxt Content
 */
export interface Event {
  /** Chemin de l'événement (ex: /events/mon-evenement) */
  _path: string
  /** Titre de l'événement */
  title: string
  /** Date de début de l'événement (format: YYYY-MM-DD) */
  date: string
  /** Date de fin de l'événement (format: YYYY-MM-DD, optionnel) */
  endDate?: string
  /** Heure de début (format: HH:mm, optionnel) */
  startTime?: string
  /** Heure de fin (format: HH:mm, optionnel) */
  endTime?: string
  /** Lieu de l'événement */
  location: string
  /** Description de l'événement */
  description: string
  /** Type d'événement */
  type: 'competition' | 'training' | 'ceremony' | 'social'
  /** Statut de l'événement */
  status: 'upcoming' | 'past'
  /** Image de couverture (optionnel) */
  image?: string
  /** Statut de publication */
  published?: boolean
  /** Contenu Markdown de l'événement (Nuxt Content) */
  _body?: string
  /** ID unique de l'événement (Nuxt Content) */
  _id?: string
}

