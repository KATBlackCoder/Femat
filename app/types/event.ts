/**
 * Type partagé pour les événements de la FEMAT
 * Compatible avec Nuxt Content
 */
export interface Event {
  /** Chemin de l'événement (ex: /events/mon-evenement) */
  _path: string
  /** Titre de l'événement */
  title: string
  /** Date de l'événement (format: YYYY-MM-DD) */
  date: string
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

