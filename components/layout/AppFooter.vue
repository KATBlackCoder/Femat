<template>
    <footer class="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
          <!-- Logo and description -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <NuxtImg src="/images/femat.jpg" alt="FEMAT Logo" class="h-8 w-auto rounded-lg" />
              <span class="font-bold text-gray-900 dark:text-white">FEMAT</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              {{ $t('footer.description') }}
            </p>
            <div class="flex space-x-4">
              <!-- Facebook link -->
              <UButton 
                variant="ghost" 
                size="sm" 
                icon="i-simple-icons-facebook"
                class="text-gray-600 hover:text-blue-600 dark:text-gray-400"
                :to="'https://www.facebook.com/taekwondomali'"
                target="_blank"
                rel="noopener"
              />
            </div>
          </div>
  
          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.quick_links') }}</h3>
            <ul class="space-y-2">
              <li v-for="item in quickLinks" :key="item.label">
                <NuxtLink 
                  :to="item.href"
                  class="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
                >
                  {{ $t(item.label) }}
                </NuxtLink>
              </li>
            </ul>
          </div>
  
          <!-- Contact Info -->
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">{{ $t('footer.contact') }}</h3>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>{{ $t('contact.address_short') }}</p>
              <p>{{ $t('contact.email_value') }}</p>
              <p>{{ $t('contact.phone_value') }}</p>
            </div>
          </div>
        </div>
  
        <!-- Bottom section -->
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('footer.copyright') }}
            </p>
            <div class="flex space-x-6 text-sm">
              <NuxtLink 
                v-if="privacyLink"
                :to="localePath(privacyLink.href)" 
                class="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
              >
                {{ $t(privacyLink.label) }}
              </NuxtLink>
              <NuxtLink 
                v-if="termsLink"
                :to="localePath(termsLink.href)" 
                class="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
              >
                {{ $t(termsLink.label) }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  import { useNavLinks } from '@/composables/useNavLinks'
  import { useLocalePath } from '#imports'

  const localePath = useLocalePath()
  const quickLinks = useNavLinks()
    .filter(link => ['nav.about', 'nav.news', 'nav.events', 'nav.clubs', 'nav.contact'].includes(link.label))
    .map(link => ({ ...link, href: localePath(link.href) }))

  const navLinks = useNavLinks()
  const privacyLink = navLinks.find(link => link.label === 'nav.privacy')
  const termsLink = navLinks.find(link => link.label === 'nav.terms')
  </script> 