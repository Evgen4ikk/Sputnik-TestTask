import { useQuery } from '@tanstack/react-query'

import { $api } from './api'

type TaskData = {
  id: number
  attributes: {
    title: string
    description: string
    status: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

type TaskMeta = {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export type Tasks = {
  data: TaskData[]
  meta: TaskMeta
}

export const useGetTasks = () => {
  return useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await $api.get<Tasks>('/tasks')
      return response.data
    }
  })
}
