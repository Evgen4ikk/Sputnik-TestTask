import type { FC } from 'react'
import { Select } from 'antd'

interface ISortSelect {
  sortValue: string
  handleSortChange: (value: string) => void
}

export const SortSelect: FC<ISortSelect> = (props) => {
  const { handleSortChange, sortValue } = props

  return (
    <Select
      value={sortValue}
      onChange={handleSortChange}
      style={{ width: 200 }}
    >
      <Select.Option value='Все'>Все</Select.Option>
      <Select.Option value='Выполненные'>Выполненные</Select.Option>
      <Select.Option value='Не выполненные'>Не выполненные</Select.Option>
      <Select.Option value='Избранное'>Избранное</Select.Option>
    </Select>
  )
}
