import type { Event } from '~/types/event'

/**
 * Composable pour gérer les événements de la FEMAT
 * Centralise toutes les données d'événements pour éviter la duplication
 * 
 * NOTE FUTURE: Dans le futur (Phase 2 - Blog), les événements seront gérés via Nuxt Content
 * Les événements seront des articles de blog dans content/blog/ avec le type "event"
 * Voir: specs/002-blog-actualites/spec.md
 * 
 * Migration prévue:
 * - Remplacer les données statiques par queryContent('blog').where({ type: 'event' })
 * - Les événements seront créés/modifiés via Nuxt Studio
 * - Structure: content/blog/YYYY-MM-DD-nom-evenement.md avec frontmatter
 */
export const useEvents = () => {
  // Données d'événements temporaires (seront remplacées par Nuxt Content dans le futur)
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Championnat National de Taekwondo',
      date: '2025-03-15',
      location: 'Bamako',
      description: 'Compétition nationale ouverte à tous les niveaux. Inscriptions ouvertes jusqu\'au 1er mars.',
      type: 'competition',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Stage de Perfectionnement',
      date: '2025-02-20',
      location: 'Bamako',
      description: 'Stage intensif pour les ceintures avancées avec maîtres internationaux. Durée: 3 jours.',
      type: 'training',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Cérémonie de Remise de Ceintures',
      date: '2025-02-10',
      location: 'Bamako',
      description: 'Cérémonie officielle de passage de grades pour tous les dojos affiliés à la FEMAT.',
      type: 'ceremony',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Tournoi Inter-Dojos',
      date: '2025-04-05',
      location: 'Bamako',
      description: 'Tournoi amical entre les différents dojos de Bamako. Ouvert à tous les niveaux.',
      type: 'competition',
      status: 'upcoming'
    }
  ]

  const pastEvents: Event[] = [
    {
      id: 5,
      title: 'Championnat Régional 2024',
      date: '2024-12-10',
      location: 'Bamako',
      description: 'Compétition régionale qui a rassemblé plus de 100 participants de toute la région.',
      type: 'competition',
      status: 'past'
    },
    {
      id: 6,
      title: 'Séminaire Technique',
      date: '2024-11-15',
      location: 'Bamako',
      description: 'Séminaire sur les techniques avancées avec démonstrations et ateliers pratiques.',
      type: 'training',
      status: 'past'
    },
    {
      id: 7,
      title: 'Gala de la FEMAT',
      date: '2024-10-20',
      location: 'Bamako',
      description: 'Événement social annuel avec démonstrations, remises de prix et célébration de la communauté.',
      type: 'social',
      status: 'past'
    }
  ]

  const allEvents = computed(() => [...upcomingEvents, ...pastEvents])

  return {
    upcomingEvents,
    pastEvents,
    allEvents
  }
}

