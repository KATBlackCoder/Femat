export function useNavLinks() {
  return [
    { label: 'nav.home', href: '/', icon: 'i-lucide-home' },
    { label: 'nav.about', href: '/about', icon: 'i-lucide-info' },
    { label: 'nav.news', href: '/news', icon: 'i-lucide-newspaper' },
    { label: 'nav.events', href: '/events', icon: 'i-lucide-calendar' },
    { label: 'nav.athletes', href: '#', icon: 'i-lucide-user' }, // TODO: add athletes page
    { label: 'nav.clubs', href: '#', icon: 'i-lucide-users' }, // TODO: add clubs page
    { label: 'nav.gallery', href: '/gallery', icon: 'i-lucide-image' },
    { label: 'nav.contact', href: '/contact', icon: 'i-lucide-mail' },
    { label: 'nav.privacy', href: '/privacy', icon: 'i-lucide-shield' },
    { label: 'nav.terms', href: '/terms', icon: 'i-lucide-file-text' },
  ]
}
