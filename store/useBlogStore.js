'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

const EXPIRY_TIME = 15 * 60 * 1000; // 15 minutes

export const useBlogStore = create(
  persist(
    (set, get) => ({
      blogs: [],
      lastFetched: null,

      fetchBlogs: async () => {
        try {
          const { lastFetched } = get();
          const now = Date.now();

          // Use cache if valid
          if (lastFetched && now - lastFetched < EXPIRY_TIME) {
            console.log('✅ Using cached blogs');
            return;
          }

          // Fetch fresh blogs
          const res = await axios.get('/api/blog');
          set({
            blogs: res.data.blogs || [],
            lastFetched: now,
          });
          console.log('🆕 Blogs fetched from API');
        } catch (error) {
          console.error('Error fetching blogs:', error);
        }
      },

      clearBlogs: () => set({ blogs: [], lastFetched: null }),
    }),
    {
      name: 'blog-storage',
      skipHydration: true,
      getStorage: () =>
        typeof window !== 'undefined' ? localStorage : undefined,
    }
  )
);
