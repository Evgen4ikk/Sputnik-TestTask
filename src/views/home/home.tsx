import type { FC } from 'react'

import { AddTaskForm } from './components/AddTaskForm'

export const Home: FC = () => {
  return (
    <div>
      <AddTaskForm />
      {/* <TasksList /> */}
    </div>
  )
}
