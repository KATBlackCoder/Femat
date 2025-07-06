<template>
    <footer class="bg-gray-50 border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
          <!-- Logo and description -->
          <div class="md:col-span-2">
            <div class="flex items-center space-x-2 mb-4">
              <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <span class="text-white font-bold text-sm">F</span>
              </div>
              <span class="font-bold text-gray-900 dark:text-white">FEMAT</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Fédération Malienne de Taekwondo - Promouvoir et développer le Taekwondo au Mali avec excellence et intégrité.
            </p>
            <div class="flex space-x-4">
              <!-- Social links placeholder -->
              <UButton 
                variant="ghost" 
                size="sm" 
                icon="i-simple-icons-facebook"
                class="text-gray-600 hover:text-blue-600 dark:text-gray-400"
              />
              <UButton 
                variant="ghost" 
                size="sm" 
                icon="i-simple-icons-twitter"
                class="text-gray-600 hover:text-blue-400 dark:text-gray-400"
              />
              <UButton 
                variant="ghost" 
                size="sm" 
                icon="i-simple-icons-instagram"
                class="text-gray-600 hover:text-pink-600 dark:text-gray-400"
              />
            </div>
          </div>
  
          <!-- Quick Links -->
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Liens rapides</h3>
            <ul class="space-y-2">
              <li v-for="item in quickLinks" :key="item.name">
                <NuxtLink 
                  :to="item.href"
                  class="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
                >
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>
  
          <!-- Contact Info -->
          <div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>Bamako, Mali</p>
              <p>contact@femat.ml</p>
              <p>+223 XX XX XX XX</p>
            </div>
          </div>
        </div>
  
        <!-- Bottom section -->
        <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div class="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              © 2025 FEMAT. Tous droits réservés.
            </p>
            <div class="flex space-x-6 text-sm">
              <NuxtLink 
                to="/privacy" 
                class="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
              >
                Politique de confidentialité
              </NuxtLink>
              <NuxtLink 
                to="/terms" 
                class="text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-400"
              >
                Conditions d'utilisation
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  // TODO: Replace with actual i18n translations when available
  const quickLinks = [
    { name: 'À propos', href: '/about' },
    { name: 'Actualités', href: '/news' },
    { name: 'Événements', href: '/events' },
    { name: 'Clubs', href: '/clubs' },
    { name: 'Contact', href: '/contact' }
  ]
  </script> 