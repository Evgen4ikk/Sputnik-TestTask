import type { FC } from 'react'

import { Button } from '@/components/Button'
import { Input } from '@/components/Input'

export const AddTaskForm: FC = () => {
  return (
    <div>
      <form>
        <Input placeholder='asdasdasdasd' />
        <Input />
        <Button>Создать задачу</Button>
      </form>
    </div>
  )
}
