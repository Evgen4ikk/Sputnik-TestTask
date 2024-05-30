import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, renderHook } from '@testing-library/react'

import { $api } from '../api'

import {
  useChangeTaskStatusMutation,
  useCreateTaskMutation,
  useDeleteTaskMutation
} from './tasks'

jest.mock('../api')
const mockedAxios = $api as jest.Mocked<typeof $api>
const queryClient = new QueryClient()

describe('useCreateTaskMutation', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('create task', async () => {
    const newTask = {
      data: {
        title: 'New Task',
        description: 'This is a new task',
        status: 'Не выполненные'
      }
    }
    const response = {
      data: {
        id: 1,
        ...newTask
      }
    }
    mockedAxios.post.mockResolvedValueOnce(response)

    const { result } = renderHook(() => useCreateTaskMutation(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    })

    const mutation = result.current

    await act(async () => {
      const data = await mutation.mutateAsync(newTask)
      expect(data).toEqual(response.data)
    })

    expect(mockedAxios.post).toHaveBeenCalledWith('/tasks', newTask)
  })
})

describe('useDeleteTaskMutation', () => {
  const invalidateQueriesMock = jest.fn()

  beforeAll(() => {
    queryClient.invalidateQueries = invalidateQueriesMock
  })

  afterEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  test('delete task', async () => {
    const taskId = 1
    mockedAxios.delete.mockResolvedValueOnce({})

    const { result } = renderHook(() => useDeleteTaskMutation(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    })

    const mutation = result.current

    await act(async () => {
      await mutation.mutateAsync(taskId)
    })

    expect(mockedAxios.delete).toHaveBeenCalledWith(`/tasks/${taskId}`)
    expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['tasks'] })
  })
})

describe('useChangeTaskStatusMutation', () => {
  const invalidateQueriesMock = jest.fn()

  beforeAll(() => {
    queryClient.invalidateQueries = invalidateQueriesMock
  })

  afterEach(() => {
    jest.clearAllMocks()
    queryClient.clear()
  })

  test('change task status', async () => {
    const taskId = 1
    const updateData = {
      data: {
        status: 'Выполненные'
      }
    }
    mockedAxios.put.mockResolvedValueOnce({})

    const { result } = renderHook(() => useChangeTaskStatusMutation(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    })

    const mutation = result.current

    await act(async () => {
      await mutation.mutateAsync({ id: taskId, data: updateData })
    })

    expect(mockedAxios.put).toHaveBeenCalledWith(`/tasks/${taskId}`, updateData)
    expect(invalidateQueriesMock).toHaveBeenCalledWith({ queryKey: ['tasks'] })
  })
})
