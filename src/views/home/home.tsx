import type { FC } from 'react'
import styled from 'styled-components'

import { AddTaskForm } from './components/AddTaskForm'
import { TasksList } from './components/TaskList'

const Container = styled.div`
  margin-top: 56px;
`

export const Home: FC = () => {
  return (
    <Container>
      <AddTaskForm />
      <TasksList />
    </Container>
  )
}
