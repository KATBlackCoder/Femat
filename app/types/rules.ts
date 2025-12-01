/**
 * Types TypeScript pour les règles et règlementations de la FEMAT
 * Compatible avec Nuxt Content v3
 * 
 * Les types sont alignés avec les schémas Zod définis dans `content.config.ts`
 */

/**
 * Catégories de règles disponibles
 */
export type RuleCategory = 'femat' | 'taekwondo' | 'faq'

/**
 * Interface pour une question/réponse FAQ
 */
export interface FaqItem {
  question: string
  answer: string
}

/**
 * Interface principale pour un document de règles
 * 
 * @example
 * ```typescript
 * const rule: RuleContent = {
 *   _path: '/rules/femat',
 *   title: 'Règlements FEMAT',
 *   description: 'Statuts et règlements internes',
 *   category: 'femat',
 *   order: 1,
 *   dateApproved: '2023-12-20'
 * }
 * ```
 */
export interface RuleContent {
  /** 
   * Chemin du document généré par Nuxt Content (ex: /rules/femat)
   * Nuxt Content v3 utilise `_path` pour le chemin
   */
  _path?: string
  
  /** Titre du document (obligatoire) */
  title: string
  
  /** Description du document (optionnel) */
  description?: string
  
  /** 
   * Catégorie du document (obligatoire)
   * @see RuleCategory
   */
  category: RuleCategory
  
  /** Ordre d'affichage (optionnel) */
  order?: number
  
  /** Date d'approbation au format ISO (optionnel) */
  dateApproved?: string
  
  /** 
   * Questions/réponses FAQ (optionnel, seulement si category === 'faq')
   */
  faq?: FaqItem[]
  
  /** 
   * Contenu Markdown du document (généré par Nuxt Content)
   * Nuxt Content v3 peut utiliser `body` ou `_body`
   */
  _body?: string
  body?: {
    toc?: {
      links?: Array<{
        id: string
        text: string
        depth: number
        children?: Array<any>
      }>
    }
    [key: string]: unknown
  }
  
  /** ID unique du document (généré par Nuxt Content) */
  _id?: string
  
  /** Type de contenu (généré par Nuxt Content) */
  _type?: string
  
  /** Date de création (générée par Nuxt Content) */
  createdAt?: string
  
  /** Date de mise à jour (générée par Nuxt Content) */
  updatedAt?: string
}

