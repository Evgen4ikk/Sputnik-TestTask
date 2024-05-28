import type { FC } from 'react'

import { useGetTasks } from '@/api/tasks'

export const TasksList: FC = () => {
  const { data: tasks } = useGetTasks()

  return (
    <div>
      {tasks?.data.map((task) => (
        <div key={task.id}>{task.attributes.title}</div>
      ))}
    </div>
  )
}
