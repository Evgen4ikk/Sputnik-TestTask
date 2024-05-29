import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { useFavoritesStore } from './favoriteStore'

test('add task to favorites list', () => {
  const { result } = renderHook(() => useFavoritesStore())

  const task = {
    id: 1,
    attributes: {
      title: 'Task 1',
      description: 'Description 1'
    }
  }

  act(() => {
    result.current.addFavorite(task)
  })

  expect(result.current.favorites).toHaveLength(1)
  expect(result.current.favorites[0].id).toEqual(task.id)
  expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([task])
})

test('remove task from favorites list', () => {
  const { result } = renderHook(() => useFavoritesStore())

  const task = {
    id: 1,
    attributes: {
      title: 'Task 1',
      description: 'Description 1'
    }
  }

  act(() => {
    result.current.addFavorite(task)
  })

  act(() => {
    result.current.removeFavorite(task.id)
  })

  expect(result.current.isTaskInFavorites(task.id)).toBe(false)

  expect(JSON.parse(localStorage.getItem('favorites')!)).toEqual([])
})

test('check if task is in favorites list', () => {
  const { result } = renderHook(() => useFavoritesStore())

  const task = {
    id: 1,
    attributes: {
      title: 'Task 1',
      description: 'Description 1'
    }
  }

  act(() => {
    result.current.addFavorite(task)
  })

  expect(result.current.isTaskInFavorites(task.id)).toBe(true)
  expect(result.current.isTaskInFavorites(2)).toBe(false)
})
