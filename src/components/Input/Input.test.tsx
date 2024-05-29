import { fireEvent, render, screen } from '@testing-library/react'

import { Input } from './Input'

test('renders Input component', () => {
  render(<Input placeholder='text' />)

  const inputElement = screen.getByPlaceholderText('text')
  expect(inputElement).toBeInTheDocument()
})

test('update value test', () => {
  render(<Input placeholder='text' />)

  const inputElement = screen.getByPlaceholderText('text')
  fireEvent.change(inputElement, { target: { value: 'text' } })

  expect(inputElement).toHaveValue('text')
})

test('onChange test', () => {
  const handleChange = jest.fn()
  render(<Input placeholder='text' onChange={handleChange} />)

  const inputElement = screen.getByPlaceholderText('text')
  fireEvent.change(inputElement, { target: { value: 'text' } })

  expect(handleChange).toHaveBeenCalledTimes(1)
})
