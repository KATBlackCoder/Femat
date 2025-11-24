import type { Event } from '~/types/event'
import { useContentCollection } from '~/composables/useContentCollection'

/**
 * Composable pour gérer les événements de la FEMAT
 * Utilise Nuxt Content pour récupérer les événements depuis content/events/
 * 
 * Refactorisé pour utiliser useContentCollection (générique)
 */
export const useEvents = () => {
  // Créer une instance de la collection events avec options spécifiques
  const eventsCollection = useContentCollection<Event>('events', {
    pathPrefix: '/events',
    normalizePath: true,
    enableCache: true,
    cacheTTL: 300000 // 5 minutes
  })

  /**
   * Récupère tous les événements publiés
   */
  const getAllEvents = async (): Promise<Event[]> => {
    return eventsCollection.getAll({
      published: true,
      sortField: 'date',
      sortDirection: 'DESC'
    })
  }

  /**
   * Détermine si un événement est passé en fonction de sa date (ou date de fin)
   * Prend en compte l'heure de fin si disponible
   */
  const isEventPast = (event: Event): boolean => {
    const now = new Date()
    
    // Utiliser la date de fin si disponible, sinon la date de début
    const eventEndDateStr = event.endDate || event.date
    
    // Parser la date manuellement pour éviter les problèmes de fuseau horaire
    const dateParts = eventEndDateStr.split('-').map(Number)
    const year = dateParts[0] ?? 0
    const month = dateParts[1] ?? 1
    const day = dateParts[2] ?? 1
    const eventEndDate = new Date(year, month - 1, day)
    
    // Si l'événement a une heure de fin, l'utiliser, sinon utiliser la fin de journée
    if (event.endTime) {
      const timeParts = event.endTime.split(':').map(Number)
      const hours = timeParts[0] ?? 23
      const minutes = timeParts[1] ?? 59
      eventEndDate.setHours(hours, minutes, 59, 999)
    } else {
      // Sinon, utiliser la fin de journée (23:59:59)
      eventEndDate.setHours(23, 59, 59, 999)
    }
    
    // Comparer avec la date/heure actuelle
    return eventEndDate.getTime() < now.getTime()
  }

  /**
   * Récupère les événements à venir
   */
  const getUpcomingEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents()
    
    // Filtrer les événements qui ne sont pas encore passés et trier par date ASC
    return events
      .filter((event: Event) => !isEventPast(event))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB // ASC
      })
  }

  /**
   * Récupère les événements passés
   */
  const getPastEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents()
    
    // Filtrer les événements qui sont passés et trier par date DESC
    return events
      .filter((event: Event) => isEventPast(event))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA // DESC
      })
  }

  /**
   * Récupère un événement par son slug (chemin)
   */
  const getEventBySlug = async (slug: string): Promise<Event | null> => {
    return eventsCollection.getBySlug(slug, {
      enableFallback: true
    })
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

