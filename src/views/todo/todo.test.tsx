import { fireEvent, render, screen } from '@testing-library/react'
import { Todo } from './todo'

function makeSut ({
  items = [
    { id: '1', value: 'buy tea', isDone: true },
    { id: '2', value: 'buy coffe', isDone: false }
  ],
  onDeleteItem = jest.fn()
}) {
  render(<Todo items={items} onDeleteItem={onDeleteItem} />)

  return { items }
}

function addNewTodoItem (value: string): { input: HTMLInputElement } {
  const input: HTMLInputElement = screen.getByRole('textbox')

  fireEvent.change(input, { target: { value } })
  fireEvent.keyDown(input, { key: 'Enter', charCode: 13 })

  return { input }
}

describe('first', () => {
  test('should render the items passed as prop', () => {
    const items = [{ id: '1', value: 'buy milk', isDone: false }]
    render(<Todo items={items} onDeleteItem={jest.fn()}/>)

    expect(screen.getByText(items[0].value)).toBeInTheDocument()
  })

  test('should render every item in the items passed prop', () => {
    const items = [
      { id: '1', value: 'buy milk', isDone: false },
      { id: '2', value: 'buy coffe', isDone: false },
      { id: '3', value: 'pay light bill', isDone: false }
    ]
    
    makeSut({ items })

    items.forEach((item) => {
      expect(screen.getByText(item.value)).toBeInTheDocument()
    })
  })

  test('should render a new item pressing the enter key', () => {
    makeSut({})

    const newItem = 'buy a new shoes'
    addNewTodoItem(newItem)

    expect(screen.getByText(newItem)).toBeInTheDocument()
  })

  test('should clear the input after adding a new todo item', () => {
    makeSut({})

    const newItem = 'buy a new shoes'
    const { input } = addNewTodoItem(newItem)

    expect(input.value).toBe('')
  })

  test('should render as many checkbox as items passed as props', () => {
    const items = [
      { id: '1', value: 'buy milk', isDone: false },
      { id: '2', value: 'buy coffe', isDone: false },
      { id: '3', value: 'pay light bill', isDone: false }
    ]
    makeSut({ items })
    const checkboxs = screen.getAllByRole('checkbox')

    expect(checkboxs).toHaveLength(items.length)
  })

  test('should render the checkbox with the right checked value', () => {
    const items = [
      { id: '1', value: 'buy milk', isDone: true },
      { id: '2', value: 'buy coffe', isDone: false },
      { id: '3', value: 'pay light bill', isDone: true }
    ]
    makeSut({ items })

    items.forEach((item) => {
      const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${item.value.replace(/ /g, '-')}`)
      expect(checkboxElement.defaultChecked).toBe(item.isDone)
    })
  })

  test('should add a class to the todo item container if this is marked as done', () => {
    const items = [
      { id: '1', value: 'buy milk', isDone: true },
      { id: '2', value: 'buy coffe', isDone: false },
      { id: '3', value: 'pay light bill', isDone: true }
    ]
    render(<Todo items={items} onDeleteItem={jest.fn()}/>)

    items.filter((item) => item.isDone).forEach((item) => {
      const containerElement: HTMLElement = screen.getByTestId(`container-${item.value.replace(/ /g, '-')}`)
      expect(containerElement).toHaveClass('isDone')
    })
  })

  test('should add the isDone class if a todo item gets clicked and this one does not have the class', () => {
    const items = [{ id: '1', value: 'buy coffe', isDone: false }]
    makeSut({ items })

    const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${items[0].value.replace(/ /g, '-')}`)

    fireEvent.click(checkboxElement)

    const containerElement: HTMLElement = screen.getByTestId(`container-${items[0].value.replace(/ /g, '-')}`)

    expect(containerElement).toHaveClass('isDone')
  })

  test('should remove the isDone class if a todo item gets clicked and this one has the class', () => {
    const items = [{ id: '1', value: 'buy coffe', isDone: true }]
    makeSut({ items })

    const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${items[0].value.replace(/ /g, '-')}`)

    fireEvent.click(checkboxElement)

    const containerElement: HTMLElement = screen.getByTestId(`container-${items[0].value.replace(/ /g, '-')}`)

    expect(containerElement).not.toHaveClass('isDone')
  })

  test('should appear a button to delete the todo item if it gets marked as done ', () => {
    const items = [
      { id: '1', value: 'buy tea', isDone: true },
      { id: '2', value: 'buy coffe', isDone: false }
    ]
    makeSut({ items })
    
    items.forEach((item) => {
      if (!item.isDone) {
        const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${item.value.replace(/ /g, '-')}`)
    
        fireEvent.click(checkboxElement)
      }

      const deleteButton = screen.getByTestId(`delete-button-${item.value.replace(/ /g, '-')}`)
  
      expect(deleteButton).toBeInTheDocument()
    })
  })

  test('should delete the item if the delete button gets clicked', () => {
    const items = [
      { id: '1', value: 'buy tea', isDone: true },
      { id: '2', value: 'buy coffe', isDone: false }
    ]
    makeSut({ items })

    const deleteButton = screen.getByTestId(`delete-button-${items[0].value.replace(/ /g, '-')}`)

    fireEvent.click(deleteButton)

    const item = screen.queryByTestId(`container-${items[0].value.replace(/ /g, '-')}`)

    expect(item).not.toBeInTheDocument()
  })

  test('should call the onDeleteItem function if the delete button gets clicked', () => {
    const items = [
      { id: '1', value: 'buy tea', isDone: true },
      { id: '2', value: 'buy coffe', isDone: false }
    ]
    const handleDeleteItem = jest.fn()

    makeSut({ onDeleteItem: handleDeleteItem })

    const deleteButton = screen.getByTestId(`delete-button-${items[0].value.replace(/ /g, '-')}`)

    fireEvent.click(deleteButton)

    expect(handleDeleteItem.mock.calls).toHaveLength(1)
    expect(handleDeleteItem.mock.calls[0][0]).toBe(items[0].id)
  })

  test('should appear a button to update the content if the todo item has not been marked as done', () => {
    const { items } = makeSut({})

    items.forEach((item) => {
      const updateButton = screen.queryByTestId(`update-button-${item.value.replace(/ /g, '-')}`)

      const initialAssertion = expect(updateButton)

      if (item.isDone) {
        initialAssertion.not.toBeInTheDocument()
      } else {
        initialAssertion.toBeInTheDocument()
      }
    })
  })
})
