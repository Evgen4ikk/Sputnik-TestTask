import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

test('render Button test', () => {
  render(<Button>Click me</Button>)

  const buttonElement = screen.getByText('Click me')
  expect(buttonElement).toBeInTheDocument()
})

test('onClick test', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)

  const buttonElement = screen.getByText('Click me')
  fireEvent.click(buttonElement)

  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('renders Button with tooltip', async () => {
  render(<Button tooltipTitle='Tooltip text'>Hover me</Button>)

  const buttonElement = screen.getByText('Hover me')
  fireEvent.mouseOver(buttonElement)

  const tooltipElement = await screen.findByText('Tooltip text')
  expect(tooltipElement).toBeInTheDocument()
})
