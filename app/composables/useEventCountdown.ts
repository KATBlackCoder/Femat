/**
 * Composable pour calculer le temps restant avant le début et la fin d'un événement
 */
export const useEventCountdown = (event: { date: string; endDate?: string; startTime?: string; endTime?: string; status: 'upcoming' | 'ongoing' | 'past' }) => {
  /**
   * Crée une date complète à partir d'une date et d'une heure optionnelle
   * Parse manuellement pour éviter les problèmes de fuseau horaire
   */
  const createDateTime = (dateStr: string, timeStr?: string): Date => {
    // Parser la date au format YYYY-MM-DD manuellement pour éviter les problèmes de fuseau horaire
    const dateParts = dateStr.split('-').map(Number)
    const year = dateParts[0] ?? 0
    const month = dateParts[1] ?? 1
    const day = dateParts[2] ?? 1
    
    // Créer la date dans le fuseau horaire local (évite les conversions UTC)
    const date = new Date(year, month - 1, day)
    
    if (timeStr) {
      const [hours, minutes] = timeStr.split(':').map(Number)
      date.setHours(hours ?? 0, minutes ?? 0, 0, 0)
    } else {
      // Par défaut, utiliser minuit si pas d'heure spécifiée
      date.setHours(0, 0, 0, 0)
    }
    return date
  }

  // Mettre à jour toutes les secondes pour les événements à venir
  const now = ref(new Date())
  
  // Calculer les dates de début et fin pour déterminer si l'événement est à venir
  const startDateTime = computed(() => createDateTime(event.date, event.startTime))
  const endDateTime = computed(() => {
    // Utiliser la date de fin si disponible, sinon la date de début
    const eventEndDateStr = event.endDate || event.date
    
    // Parser la date manuellement pour éviter les problèmes de fuseau horaire
    const dateParts = eventEndDateStr.split('-').map(Number)
    const year = dateParts[0] ?? 0
    const month = dateParts[1] ?? 1
    const day = dateParts[2] ?? 1
    const endDate = new Date(year, month - 1, day)
    
    // Si l'événement a une heure de fin, l'utiliser, sinon utiliser la fin de journée
    // Cette logique doit correspondre exactement à isEventPast() dans useEvents.ts
    if (event.endTime) {
      const timeParts = event.endTime.split(':').map(Number)
      const hours = timeParts[0] ?? 23
      const minutes = timeParts[1] ?? 59
      endDate.setHours(hours, minutes, 59, 999)
    } else {
      // Sinon, utiliser la fin de journée (23:59:59)
      endDate.setHours(23, 59, 59, 999)
    }
    
    return endDate
  })
  
  // Vérifier si l'événement est terminé (pour décider si on met à jour le compteur)
  const isEventEnded = computed(() => {
    const currentTime = now.value
    return endDateTime.value.getTime() < currentTime.getTime()
  })
  
  // Mettre à jour le compteur toutes les secondes si l'événement n'est pas encore terminé
  const interval = setInterval(() => {
    now.value = new Date()
  }, 1000)

  onUnmounted(() => {
    clearInterval(interval)
  })

  /**
   * Calcule le temps restant jusqu'à une date cible
   */
  const calculateTimeRemaining = (targetDate: Date): {
    days: number
    hours: number
    minutes: number
    seconds: number
    total: number // en millisecondes
    isPast: boolean
  } => {
    const currentTime = now.value
    const diff = targetDate.getTime() - currentTime.getTime()
    const isPast = diff < 0

    const absDiff = Math.abs(diff)
    const days = Math.floor(absDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((absDiff % (1000 * 60)) / 1000)

    return {
      days,
      hours,
      minutes,
      seconds,
      total: diff,
      isPast
    }
  }

  /**
   * Formate le temps restant en texte lisible
   */
  const formatTimeRemaining = (timeRemaining: ReturnType<typeof calculateTimeRemaining>): string => {
    if (timeRemaining.isPast) {
      return 'Terminé'
    }

    if (timeRemaining.days > 0) {
      return `${timeRemaining.days} jour${timeRemaining.days > 1 ? 's' : ''}`
    }

    if (timeRemaining.hours > 0) {
      return `${timeRemaining.hours} heure${timeRemaining.hours > 1 ? 's' : ''}`
    }

    if (timeRemaining.minutes > 0) {
      return `${timeRemaining.minutes} minute${timeRemaining.minutes > 1 ? 's' : ''}`
    }

    return `${timeRemaining.seconds} seconde${timeRemaining.seconds > 1 ? 's' : ''}`
  }

  /**
   * Formate le temps restant en texte détaillé
   */
  const formatTimeRemainingDetailed = (timeRemaining: ReturnType<typeof calculateTimeRemaining>): string => {
    if (timeRemaining.isPast) {
      return 'Terminé'
    }

    const parts: string[] = []

    if (timeRemaining.days > 0) {
      parts.push(`${timeRemaining.days} jour${timeRemaining.days > 1 ? 's' : ''}`)
    }
    if (timeRemaining.hours > 0) {
      parts.push(`${timeRemaining.hours} heure${timeRemaining.hours > 1 ? 's' : ''}`)
    }
    if (timeRemaining.minutes > 0 && timeRemaining.days === 0) {
      parts.push(`${timeRemaining.minutes} minute${timeRemaining.minutes > 1 ? 's' : ''}`)
    }

    return parts.length > 0 ? parts.join(', ') : 'Bientôt'
  }


  // Calculer le temps restant jusqu'au début (dépend de now pour se mettre à jour)
  const timeUntilStart = computed(() => {
    // Accéder à now.value pour créer une dépendance réactive
    const _ = now.value
    return calculateTimeRemaining(startDateTime.value)
  })
  
  // Calculer le temps restant jusqu'à la fin (dépend de now pour se mettre à jour)
  const timeUntilEnd = computed(() => {
    // Accéder à now.value pour créer une dépendance réactive
    const _ = now.value
    return calculateTimeRemaining(endDateTime.value)
  })

  // Vérifier si l'événement a commencé
  const hasStarted = computed(() => timeUntilStart.value.isPast)
  
  // Vérifier si l'événement est terminé
  const hasEnded = computed(() => timeUntilEnd.value.isPast)

  // Formater les temps restants
  const timeUntilStartFormatted = computed(() => formatTimeRemaining(timeUntilStart.value))
  const timeUntilStartDetailed = computed(() => formatTimeRemainingDetailed(timeUntilStart.value))
  const timeUntilEndFormatted = computed(() => formatTimeRemaining(timeUntilEnd.value))
  const timeUntilEndDetailed = computed(() => formatTimeRemainingDetailed(timeUntilEnd.value))

  return {
    timeUntilStart,
    timeUntilEnd,
    timeUntilStartFormatted,
    timeUntilStartDetailed,
    timeUntilEndFormatted,
    timeUntilEndDetailed,
    hasStarted,
    hasEnded,
    startDateTime,
    endDateTime
  }
}

