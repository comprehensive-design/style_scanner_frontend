import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FeedStore = create(
  persist(
    (set) => ({
      feeds: [],
      totalCount: 0,
      setFeeds: (feeds) => set({ feeds }),
      setTotalCount: (totalCount) => set({ totalCount }),
    }),
    {
      name: 'feed-storage',
      getStorage: () => localStorage, 
    }
  )
);

export default FeedStore;
