import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

import { $api } from './api'

export const useGetTasksQuery = () => {
  return useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await $api.get<Tasks>('/tasks', {
        params: {
          pagination: {
            page: pageParam,
            pageSize: 10
          }
        }
      })
      return response.data
    },
    getNextPageParam: (lastPage: Tasks) => {
      const nextPage = lastPage.meta.pagination.page + 1
      return nextPage <= lastPage.meta.pagination.pageCount
        ? nextPage
        : undefined
    },
    initialPageParam: 1
  })
}

export const useCreateTaskMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newTask: CreateTask) => {
      const response = await $api.post('/tasks', newTask)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}

export const useDeleteTaskMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await $api.delete(`/tasks/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}

export const useChangeTaskStatusMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (args: { id: number; data: EditTask }) => {
      const { id, data } = args
      await $api.put(`/tasks/${id}`, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })
}
