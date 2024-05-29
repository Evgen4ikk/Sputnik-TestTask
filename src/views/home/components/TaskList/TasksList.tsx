import { type FC, useState } from 'react'
import { Alert, Flex } from 'antd'
import styled from 'styled-components'

import { useGetTasksQuery } from '@/api/tasks'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useFavoritesStore } from '@/store/favoriteStore'

import { SortSelect } from '../SortSelect'
import { TaskItem } from '../TaskItem'

const Container = styled.div`
  max-width: 560px;
  margin: 0 auto;
  padding-bottom: 56px;
`

const FlexStyled = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 24px;
`

export const TasksList: FC = () => {
  const [sortValue, setSortValue] = useState('Все')
  const { isTaskInFavorites } = useFavoritesStore()

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error
  } = useGetTasksQuery()

  const { observerElem } = useIntersectionObserver(fetchNextPage, hasNextPage)

  const handleSortChange = (value: string) => {
    setSortValue(value)
  }

  const filterTasks = (task: TaskData) => {
    switch (sortValue) {
      case 'Все':
        return true
      case 'Выполненные':
        return task.attributes.status === 'Выполненные'
      case 'Не выполненные':
        return task.attributes.status === 'Не выполненные'
      case 'Избранное':
        return isTaskInFavorites(task.id)
      default:
        return true
    }
  }

  console.log(data?.pages.length)

  if (isError) {
    return (
      <Alert
        message='Ошибка'
        description={error?.message || 'Произошла ошибка при загрузке задач.'}
        type='error'
        showIcon
      />
    )
  }

  return (
    <Container>
      <Flex align='center' gap={12}>
        <div>Сортировать по:</div>
        <SortSelect sortValue={sortValue} handleSortChange={handleSortChange} />
      </Flex>

      <FlexStyled>
        {data?.pages.map((page, pageIndex) => (
          <div key={pageIndex}>
            <FlexStyled>
              {page.data.length === 0 ? (
                <div>Задач не найдено</div>
              ) : (
                <>
                  {page.data.filter(filterTasks).map((task) => (
                    <div key={task.id}>
                      <TaskItem task={task} />
                    </div>
                  ))}
                </>
              )}
            </FlexStyled>
          </div>
        ))}
        <div ref={observerElem} />
        {isFetchingNextPage && <div>Загрузка...</div>}
      </FlexStyled>
    </Container>
  )
}
