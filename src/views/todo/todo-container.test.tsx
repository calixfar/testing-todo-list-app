import { render, act } from '@testing-library/react'
import TodoContainer from './todo-container'

describe('TodoContainer', () => {
  test('should execute once the function getData', () => {
    const fn = jest.fn().mockResolvedValue({ data: [] })

    act(() => {
      render(<TodoContainer getData={fn} />)
    })

    expect(fn.mock.calls).toHaveLength(1)
  })
})
