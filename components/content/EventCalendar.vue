<template>
  <div>
    <UCard class="mb-6">
      <template #header>
        <h2 class="text-2xl text-center font-bold text-primary">{{ $t('events.calendar.title') }}</h2>
      </template>
      <UCalendar v-model="selectedDate" color="primary" size="xl">
        <template #day="{ day }">
          <div class="relative flex flex-col items-center">
            <span>{{ day.day }}</span>
            <span
              v-if="hasEvents(day)"
              class="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full"
            />
          </div>
        </template>
      </UCalendar>
    </UCard>

    <div v-if="eventsForVisibleMonth.length">
      <UCard
        v-for="event in eventsForVisibleMonth"
        :key="event.path"
        class="mb-4"
      >
        <div class="flex flex-col md:flex-row gap-4">
          <NuxtImg v-if="event.image" :src="event.image" width="120" height="80" class="rounded-lg object-cover w-full md:w-32 h-24 md:h-auto mx-auto" loading="lazy" />
          <div class="flex-1">
            <NuxtLink :to="event.path" class="text-lg font-bold text-primary hover:underline">
              {{ event.title }}
            </NuxtLink>
            <div class="flex items-center gap-2 mt-1">
              <UBadge v-if="event.category" color="primary" variant="soft">{{ event.category }}</UBadge>
              <span class="text-xs text-muted">{{ formatDateRange(event.startDate, event.endDate) }}</span>
            </div>
            <div v-if="event.location" class="text-xs text-muted mt-1">
              <UIcon name="i-heroicons-map-pin" class="inline-block mr-1 text-primary" />{{ event.location }}
            </div>
            <p v-if="event.description" class="mt-2 text-muted">{{ event.description }}</p>
          </div>
        </div>
      </UCard>
    </div>
    <div v-else class="text-muted text-center mt-8">
      {{ $t('events.calendar.no_events') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CalendarDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'

interface EventItem {
  title: string
  startDate: string
  endDate?: string
  location?: string
  description?: string
  image?: string
  category?: string
  organizer?: string
  path: string
}

const { locale } = useI18n()
const today = new Date()
const selectedDate = shallowRef(new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()))

const { data: events } = await useAsyncData('events-calendar', () =>
  queryCollection('events')
    .where('path', 'LIKE', `/events/${locale.value}/%`)
    .all()
)

const eventsByDate = computed(() => {
  const map: Record<string, EventItem[]> = {}
  const eventList = Array.isArray(events.value) ? events.value : []
  for (const event of eventList) {
    // Support multi-day events: mark each day in the range
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : start
    for (
      let d = new Date(start);
      d <= end;
      d.setDate(d.getDate() + 1)
    ) {
      const key = d.toISOString().slice(0, 10)
      if (!map[key]) map[key] = []
      map[key].push(event)
    }
  }
  return map
})

function hasEvents(day: DateValue) {
  // Convert DateValue to CalendarDate if needed
  let calendarDate: CalendarDate
  if (day instanceof CalendarDate) {
    calendarDate = day
  } else if ('calendar' in day && 'era' in day && 'year' in day && 'month' in day && 'day' in day) {
    calendarDate = new CalendarDate(day.calendar, day.era, day.year, day.month, day.day)
  } else {
    return false
  }
  const key = calendarDate.toDate('UTC').toISOString().slice(0, 10)
  return !!eventsByDate.value[key]
}

const visibleMonth = computed(() => selectedDate.value.month)
const visibleYear = computed(() => selectedDate.value.year)

const eventsForVisibleMonth = computed(() => {
  const eventList = Array.isArray(events.value) ? events.value : []
  return eventList.filter(event => {
    // Support multi-day events: show if any part of the event is in the visible month/year
    const start = new Date(event.startDate)
    const end = event.endDate ? new Date(event.endDate) : start
    // If event is in the visible month/year
    return (
      (start.getFullYear() === visibleYear.value && start.getMonth() + 1 === visibleMonth.value) ||
      (end.getFullYear() === visibleYear.value && end.getMonth() + 1 === visibleMonth.value) ||
      // Or event spans the whole visible month
      (start < new Date(visibleYear.value, visibleMonth.value - 1, 1) && end > new Date(visibleYear.value, visibleMonth.value, 0))
    )
  })
})

function formatDateRange(start: string, end?: string) {
  const startDate = new Date(start)
  if (!end || end === start) return startDate.toLocaleDateString()
  const endDate = new Date(end)
  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
}
</script>

<style scoped>
</style>