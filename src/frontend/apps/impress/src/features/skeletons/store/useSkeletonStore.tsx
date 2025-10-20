import { create } from 'zustand';

interface SkeletonStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useSkeletonStore = create<SkeletonStore>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
}));
