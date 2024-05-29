/// <reference types="vite/client" />

type TaskData = {
  id: number
  attributes: {
    title: string
    description: string
    status?: string
    createdAt?: string
    updatedAt?: string
    publishedAt?: string
  }
}

type Tasks = {
  data: TaskData[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

type CreateTask = {
  data: {
    title: string
    description: string
    status: string
  }
}

type EditTask = {
  data: {
    title?: string
    description?: string
    status: string
  }
}
