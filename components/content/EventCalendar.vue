<template>
  <div>
    <UCard class="mb-6">
      <template #header>
        <div class="flex items-center justify-between">
          <UButton
            icon="i-heroicons-chevron-left-20-solid"
            variant="ghost"
            color="neutral"
            :padded="false"
            @click="prevMonth"
          />
          <h2 class="text-2xl text-center font-bold text-primary capitalize">
            {{ calendarTitle }}
          </h2>
          <UButton
            icon="i-heroicons-chevron-right-20-solid"
            variant="ghost"
            color="neutral"
            :padded="false"
            @click="nextMonth"
          />
        </div>
      </template>
      <UCalendar
        v-model="currentDate"
        :month-controls="false"
        :year-controls="false"
        color="primary"
        size="xl"
      >
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

    <div v-if="eventsForVisibleMonth.length" class="space-y-4">
      <EventCard
        v-for="event in eventsForVisibleMonth"
        :key="event.path"
        :event="event"
      />
    </div>
    <div v-else class="text-muted text-center mt-8">
      {{ $t('events.calendar.no_events') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CalendarDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import type { Event } from '~/types/event'

const { locale } = useI18n()
const today = new Date()
const currentDate = shallowRef(new CalendarDate(today.getFullYear(), today.getMonth() + 1, today.getDate()))

const calendarTitle = computed(() => {
  return currentDate.value.toDate('UTC').toLocaleDateString(locale.value, {
    month: 'long',
    year: 'numeric'
  })
})

function prevMonth() {
  currentDate.value = currentDate.value.subtract({ months: 1 })
}

function nextMonth() {
  currentDate.value = currentDate.value.add({ months: 1 })
}

const { data: events } = await useAsyncData('events-calendar', () =>
  queryCollection('events')
    .where('path', 'LIKE', `/events/${locale.value}/%`)
    .all()
)

const eventsByDate = computed(() => {
  const map: Record<string, Event[]> = {}
  const eventList = (events.value || []) as Event[]
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

const visibleMonth = computed(() => currentDate.value.month)
const visibleYear = computed(() => currentDate.value.year)

const eventsForVisibleMonth = computed(() => {
  const eventList = (events.value || []) as Event[]
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
</script>

<style scoped>
</style>