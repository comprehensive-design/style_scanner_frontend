import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const FeedStore = create(
  persist(
    (set) => ({
      feeds: [],
      totalCount: 0,
      proxyImageUrls: [],
      proxyProfileImageUrl: [],

      setFeeds: (feeds) => set({ feeds }),
      setTotalCount: (totalCount) => set({ totalCount }),
      setProxyImageUrls: (urls) => set({ proxyImageUrls: urls }),
      setProxyProfileImageUrl: (pUrls) => set({ proxyProfileImageUrl: pUrls }),
    }),
    {
      name: 'feed-storage',
      getStorage: () => localStorage, 
    }
  )
);

export default FeedStore;
