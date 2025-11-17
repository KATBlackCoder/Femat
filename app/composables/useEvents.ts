import type { Event } from '~/types/event'

// queryCollection est auto-importé par Nuxt Content v3
declare const queryCollection: <T = any>(collection: string) => {
  where: (field: string, operator: string, value?: any) => any
  order: (field: string, direction: 'ASC' | 'DESC') => any
  path: (path: string) => any
  all: () => Promise<T[]>
  first: () => Promise<T | null>
}

/**
 * Composable pour gérer les événements de la FEMAT
 * Utilise Nuxt Content pour récupérer les événements depuis content/events/
 */
export const useEvents = () => {
  /**
   * Récupère tous les événements publiés
   */
  const getAllEvents = async (): Promise<Event[]> => {
    try {
      const events = await queryCollection<Event>('events')
        .where('published', '=', true)
        .order('date', 'DESC')
        .all()
      return events || []
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error)
      return []
    }
  }

  /**
   * Récupère les événements à venir
   */
  const getUpcomingEvents = async (): Promise<Event[]> => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const events = await queryCollection<Event>('events')
        .where('published', '=', true)
        .where('status', '=', 'upcoming')
        .order('date', 'ASC')
        .all()
      return events || []
    } catch (error) {
      console.error('Erreur lors de la récupération des événements à venir:', error)
      return []
    }
  }

  /**
   * Récupère les événements passés
   */
  const getPastEvents = async (): Promise<Event[]> => {
    try {
      const events = await queryCollection<Event>('events')
        .where('published', '=', true)
        .where('status', '=', 'past')
        .order('date', 'DESC')
        .all()
      return events || []
    } catch (error) {
      console.error('Erreur lors de la récupération des événements passés:', error)
      return []
    }
  }

  /**
   * Récupère un événement par son slug (chemin)
   */
  const getEventBySlug = async (slug: string): Promise<Event | null> => {
    try {
      // Normaliser le slug pour correspondre au format de path
      const path = slug.startsWith('/events/') ? slug : `/events/${slug}`
      const event = await queryCollection<Event>('events')
        .path(path)
        .where('published', '=', true)
        .first()
      return event
    } catch (error) {
      console.error(`Erreur lors de la récupération de l'événement ${slug}:`, error)
      return null
    }
  }

  // Pour compatibilité avec le code existant, utiliser des computed refs
  const upcomingEvents = ref<Event[]>([])
  const pastEvents = ref<Event[]>([])
  const allEvents = computed(() => [...upcomingEvents.value, ...pastEvents.value])

  // Charger les événements au montage
  onMounted(async () => {
    upcomingEvents.value = await getUpcomingEvents()
    pastEvents.value = await getPastEvents()
  })

  return {
    upcomingEvents,
    pastEvents,
    allEvents,
    getAllEvents,
    getUpcomingEvents,
    getPastEvents,
    getEventBySlug
  }
}

