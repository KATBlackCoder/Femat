<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <BlogPostCard
      v-for="post in posts as BlogPost[]"
      :key="post.link"
      :title="post.title"
      :excerpt="post.excerpt"
      :image="post.image"
      :date="post.date"
      :link="post.link"
    />
  </div>
</template>

<script setup lang="ts">
import BlogPostCard from './BlogPostCard.vue'

type BlogPost = {
  title: string
  excerpt: string
  image?: string
  date: string
  link: string
}

defineProps({
  posts: {
    type: Array as () => BlogPost[],
    default: () => [
      {
        title: 'Sample Blog Post',
        excerpt: 'This is a sample excerpt for the blog post.',
        image: '',
        date: '2025-01-01',
        link: '#'
      }
    ]
  }
})
</script> 