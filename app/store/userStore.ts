// store/useStore.ts
import { create } from 'zustand'

interface User {
    username: string | null;
    email: string | null;
    avator?: string | undefined;
    id?: number | null;
}

interface Store {
  darkMode: boolean
  toggleDarkMode: () => void
  user: User | null
  setUser: (user: User | null) => void
}

export const useStore = create<Store>(set => ({
  darkMode: false,
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
  user: null,
  setUser: (user) => set({ user }),
}))
