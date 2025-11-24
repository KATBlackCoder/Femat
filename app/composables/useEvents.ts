import type { Event } from '~/types/event'
import { useContentCollection } from '~/composables/useContentCollection'

/**
 * Composable pour gérer les événements de la FEMAT
 * 
 * Utilise Nuxt Content pour récupérer les événements depuis `content/events/`.
 * Refactorisé pour utiliser `useContentCollection` (composable générique) afin de réduire
 * la duplication de code et améliorer les performances grâce au cache intégré.
 * 
 * **Performance** : Toutes les requêtes sont mises en cache pendant 5 minutes par défaut.
 * Le cache est automatiquement invalidé après expiration ou peut être invalidé manuellement.
 * 
 * **Logique métier** : Inclut des fonctions spécifiques pour déterminer le statut des événements
 * (`isEventPast`, `isEventOngoing`) basées sur les dates et heures de début/fin.
 * 
 * **Rétrocompatibilité** : L'API publique reste identique à l'ancienne version, garantissant
 * qu'aucun changement n'est nécessaire dans le code existant. Les computed refs (`upcomingEvents`,
 * `ongoingEvents`, `pastEvents`, `allEvents`) sont automatiquement chargées au montage.
 * 
 * @example
 * ```typescript
 * const { getAllEvents, getUpcomingEvents, isEventPast } = useEvents()
 * 
 * // Récupérer tous les événements
 * const events = await getAllEvents()
 * 
 * // Récupérer uniquement les événements à venir
 * const upcoming = await getUpcomingEvents()
 * 
 * // Vérifier si un événement est passé
 * const isPast = isEventPast(event)
 * ```
 * 
 * @returns Objet contenant toutes les méthodes pour interagir avec les événements
 * 
 * @see {@link useContentCollection} Pour comprendre le composable générique sous-jacent
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
   * 
   * Les résultats sont mis en cache pendant 5 minutes pour améliorer les performances.
   * Seuls les événements avec `published: true` sont retournés.
   * 
   * @returns Promise résolue avec un tableau d'événements triés par date décroissante
   * 
   * @example
   * ```typescript
   * const { getAllEvents } = useEvents()
   * const events = await getAllEvents()
   * // events est un tableau de Event triés du plus récent au plus ancien
   * ```
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
   * 
   * Prend en compte l'heure de fin si disponible. Si l'événement n'a pas d'heure de fin,
   * utilise la fin de journée (23:59:59) pour la comparaison.
   * 
   * **Logique** : Utilise `endDate` si disponible, sinon `date`. Compare avec l'heure actuelle
   * en tenant compte de l'heure de fin (`endTime`) si spécifiée.
   * 
   * @param event - L'événement à vérifier
   * @returns `true` si l'événement est passé, `false` sinon
   * 
   * @example
   * ```typescript
   * const { isEventPast } = useEvents()
   * if (isEventPast(event)) {
   *   console.log('Cet événement est terminé')
   * }
   * ```
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
   * Détermine si un événement est en cours
   * 
   * Un événement est considéré comme "en cours" si :
   * - La date de début est passée ou égale à maintenant
   * - ET la date de fin n'est pas encore passée
   * 
   * Prend en compte les heures de début (`startTime`) et de fin (`endTime`) si disponibles.
   * 
   * @param event - L'événement à vérifier
   * @returns `true` si l'événement est en cours, `false` sinon
   * 
   * @example
   * ```typescript
   * const { isEventOngoing } = useEvents()
   * if (isEventOngoing(event)) {
   *   console.log('Cet événement est actuellement en cours')
   * }
   * ```
   */
  const isEventOngoing = (event: Event): boolean => {
    const now = new Date()
    
    // Parser la date de début
    const startDateParts = event.date.split('-').map(Number)
    const startYear = startDateParts[0] ?? 0
    const startMonth = startDateParts[1] ?? 1
    const startDay = startDateParts[2] ?? 1
    const eventStartDate = new Date(startYear, startMonth - 1, startDay)
    
    // Si l'événement a une heure de début, l'utiliser, sinon utiliser le début de journée
    if (event.startTime) {
      const timeParts = event.startTime.split(':').map(Number)
      const hours = timeParts[0] ?? 0
      const minutes = timeParts[1] ?? 0
      eventStartDate.setHours(hours, minutes, 0, 0)
    } else {
      // Sinon, utiliser le début de journée (00:00:00)
      eventStartDate.setHours(0, 0, 0, 0)
    }
    
    // Utiliser la date de fin si disponible, sinon la date de début
    const eventEndDateStr = event.endDate || event.date
    const endDateParts = eventEndDateStr.split('-').map(Number)
    const endYear = endDateParts[0] ?? 0
    const endMonth = endDateParts[1] ?? 1
    const endDay = endDateParts[2] ?? 1
    const eventEndDate = new Date(endYear, endMonth - 1, endDay)
    
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
    
    // L'événement est en cours si :
    // - La date de début est passée ou égale à maintenant
    // - ET la date de fin n'est pas encore passée
    return eventStartDate.getTime() <= now.getTime() && eventEndDate.getTime() >= now.getTime()
  }

  /**
   * Récupère les événements à venir (pas encore commencés)
   * 
   * Filtre les événements dont la date de début est dans le futur.
   * Les résultats sont triés par date croissante (prochains événements en premier).
   * 
   * **Performance** : Utilise le cache de `getAllEvents()` pour éviter les requêtes redondantes.
   * 
   * @returns Promise résolue avec un tableau d'événements à venir triés par date croissante
   * 
   * @example
   * ```typescript
   * const { getUpcomingEvents } = useEvents()
   * const upcoming = await getUpcomingEvents()
   * // upcoming contient uniquement les événements futurs, triés du plus proche au plus lointain
   * ```
   */
  const getUpcomingEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents()
    const now = new Date()
    
    // Parser la date de début pour chaque événement
    return events
      .filter((event: Event) => {
        const startDateParts = event.date.split('-').map(Number)
        const startYear = startDateParts[0] ?? 0
        const startMonth = startDateParts[1] ?? 1
        const startDay = startDateParts[2] ?? 1
        const eventStartDate = new Date(startYear, startMonth - 1, startDay)
        
        // Si l'événement a une heure de début, l'utiliser
        if (event.startTime) {
          const timeParts = event.startTime.split(':').map(Number)
          const hours = timeParts[0] ?? 0
          const minutes = timeParts[1] ?? 0
          eventStartDate.setHours(hours, minutes, 0, 0)
        } else {
          eventStartDate.setHours(0, 0, 0, 0)
        }
        
        // Événement à venir si la date de début est dans le futur
        return eventStartDate.getTime() > now.getTime()
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB // ASC
      })
  }

  /**
   * Récupère les événements en cours
   * 
   * Filtre les événements qui sont actuellement en cours (début passé, fin non passée).
   * Les résultats sont triés par date croissante.
   * 
   * **Performance** : Utilise le cache de `getAllEvents()` pour éviter les requêtes redondantes.
   * 
   * @returns Promise résolue avec un tableau d'événements en cours triés par date croissante
   * 
   * @example
   * ```typescript
   * const { getOngoingEvents } = useEvents()
   * const ongoing = await getOngoingEvents()
   * // ongoing contient uniquement les événements actuellement en cours
   * ```
   */
  const getOngoingEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents()
    
    // Filtrer les événements en cours et trier par date ASC
    return events
      .filter((event: Event) => isEventOngoing(event))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateA - dateB // ASC
      })
  }

  /**
   * Récupère les événements passés
   * 
   * Filtre les événements dont la date de fin est passée, en excluant les événements en cours
   * pour éviter les doublons. Les résultats sont triés par date décroissante (plus récents en premier).
   * 
   * **Performance** : Utilise le cache de `getAllEvents()` pour éviter les requêtes redondantes.
   * 
   * @returns Promise résolue avec un tableau d'événements passés triés par date décroissante
   * 
   * @example
   * ```typescript
   * const { getPastEvents } = useEvents()
   * const past = await getPastEvents()
   * // past contient uniquement les événements terminés, triés du plus récent au plus ancien
   * ```
   */
  const getPastEvents = async (): Promise<Event[]> => {
    const events = await getAllEvents()
      
    // Filtrer les événements qui sont passés (mais pas en cours) et trier par date DESC
    return events
      .filter((event: Event) => isEventPast(event) && !isEventOngoing(event))
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        return dateB - dateA // DESC
      })
  }

  /**
   * Récupère un événement par son slug (chemin)
   * 
   * Le slug peut être fourni avec ou sans le préfixe `/events/`. La fonction gère
   * automatiquement la normalisation et tente plusieurs variantes si nécessaire.
   * 
   * @param slug - Le slug de l'événement (ex: 'championnat-2025' ou '/events/championnat-2025')
   * @returns Promise résolue avec l'événement trouvé ou `null` si non trouvé
   * 
   * @example
   * ```typescript
   * const { getEventBySlug } = useEvents()
   * const event = await getEventBySlug('championnat-2025')
   * if (event) {
   *   console.log(event.title)
   * }
   * ```
   */
  const getEventBySlug = async (slug: string): Promise<Event | null> => {
    return eventsCollection.getBySlug(slug, {
      enableFallback: true
    })
  }

  // Pour compatibilité avec le code existant, utiliser des computed refs
  const upcomingEvents = ref<Event[]>([])
  const ongoingEvents = ref<Event[]>([])
  const pastEvents = ref<Event[]>([])
  const allEvents = computed(() => [...upcomingEvents.value, ...ongoingEvents.value, ...pastEvents.value])

  // Charger les événements au montage
  onMounted(async () => {
    upcomingEvents.value = await getUpcomingEvents()
    ongoingEvents.value = await getOngoingEvents()
    pastEvents.value = await getPastEvents()
  })

  return {
    upcomingEvents,
    ongoingEvents,
    pastEvents,
    allEvents,
    getAllEvents,
    getUpcomingEvents,
    getOngoingEvents,
    getPastEvents,
    getEventBySlug,
    isEventPast,
    isEventOngoing
  }
}

