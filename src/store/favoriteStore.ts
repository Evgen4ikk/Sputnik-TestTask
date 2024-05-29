import { create } from 'zustand'

type FavoritesState = {
  favorites: TaskData[]
}

type FavoritesActions = {
  addFavorite: (task: TaskData) => void
  removeFavorite: (taskId: number) => void
  isTaskInFavorites: (taskId: number) => boolean
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>(
  (set) => ({
    favorites: [],

    addFavorite: (task) =>
      set((state) => {
        const newFavorites = [...state.favorites, task]
        localStorage.setItem('favorites', JSON.stringify(newFavorites))

        return { favorites: newFavorites }
      }),

    removeFavorite: (taskId) =>
      set((state) => {
        const newFavorites = state.favorites.filter(
          (task) => task.id !== taskId
        )
        localStorage.setItem('favorites', JSON.stringify(newFavorites))

        return { favorites: newFavorites }
      }),

    isTaskInFavorites: (taskId) => {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')

      return favorites.some((task: TaskData) => task.id === taskId)
    }
  })
)
