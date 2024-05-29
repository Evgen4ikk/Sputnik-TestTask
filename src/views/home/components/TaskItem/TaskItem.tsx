import type { FC } from 'react'
import { StarFilled } from '@ant-design/icons'
import { Flex } from 'antd'
import styled from 'styled-components'

import { useChangeTaskStatusMutation, useDeleteTaskMutation } from '@/api/tasks'
import { Button } from '@/components/Button'
import { useFavoritesStore } from '@/store/favoriteStore'

const FlexStyled = styled(Flex)`
  width: 100%;
  background-color: #15101c;
  padding: 8px 12px;
  border-radius: 6px;
  position: relative;
`

const FavoriteStar = styled.div`
  position: absolute;
  top: -16px;
  left: -8px;
`

const Item = styled.div`
  max-width: 350px;
  overflow: hidden;
`
interface TaskItemProps {
  task: TaskData
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { mutate: DeleteTask } = useDeleteTaskMutation()
  const { mutate: EditTask } = useChangeTaskStatusMutation()
  const { favorites, addFavorite, removeFavorite, isTaskInFavorites } =
    useFavoritesStore()

  const handleDelete = async () => {
    await DeleteTask(task.id)
  }

  const handleFavorite = () => {
    const index = favorites.findIndex((fav) => fav.id === task.id)

    if (index !== -1) {
      removeFavorite(task.id)
    } else {
      addFavorite(task)
    }
  }

  const handleEdit = async () => {
    await EditTask({
      id: task.id,
      data: {
        data: {
          status:
            task.attributes.status === 'Не выполненные'
              ? 'Выполненные'
              : 'Не выполненные'
        }
      }
    })
  }

  return (
    <FlexStyled justify='space-between'>
      <FavoriteStar>
        {isTaskInFavorites(task.id) && <StarFilled size={28} />}
      </FavoriteStar>
      <Flex vertical gap={8}>
        <Item>Title: {task.attributes.title}</Item>
        <Item>Description: {task.attributes.description}</Item>
        <Item>Status: {task.attributes.status}</Item>
      </Flex>
      <Flex vertical gap={8} justify='space-between'>
        <Button
          tooltipTitle='Изменить статус'
          type='text'
          onClick={handleEdit}
          size='small'
        >
          Изменить статус
        </Button>
        <Button
          tooltipTitle={
            isTaskInFavorites(task.id)
              ? 'Убрать из избранного'
              : 'Добавить в избранное'
          }
          type='text'
          onClick={handleFavorite}
          size='small'
        >
          {isTaskInFavorites(task.id)
            ? 'Убрать из избранного'
            : 'Добавить в избранное'}
        </Button>
        <Button
          tooltipTitle='Удалить'
          type='text'
          onClick={handleDelete}
          size='small'
        >
          Удалить
        </Button>
      </Flex>
    </FlexStyled>
  )
}
