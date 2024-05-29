import { type FC, useState } from 'react'
import { Alert, Flex, Spin } from 'antd'
import styled from 'styled-components'

import { useCreateTaskMutation } from '@/api/tasks'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding-bottom: 24px;
`

export const AddTaskForm: FC = () => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const {
    mutate: CreateTask,
    isPending,
    isError,
    error
  } = useCreateTaskMutation()

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }

  const handleSubmit = async () => {
    await CreateTask({
      data: { title, description, status: 'Не выполненные' }
    })
    setTitle('')
    setDescription('')
  }

  return (
    <Container>
      <Flex vertical gap={16}>
        {isError && (
          <Alert
            message='Ошибка'
            description={
              error?.message || 'Произошла ошибка при создании задачи.'
            }
            type='error'
            showIcon
          />
        )}
        <Input
          placeholder='Введите название задачи'
          value={title}
          onChange={handleTitleChange}
        />
        <Input
          placeholder='Введите описание задачи'
          value={description}
          onChange={handleDescriptionChange}
        />
        <Button
          onClick={handleSubmit}
          disabled={isPending || (!title && !description)}
        >
          {isPending ? <Spin /> : 'Создать задачу'}
        </Button>
      </Flex>
    </Container>
  )
}
