import { fireEvent, render, screen } from "@testing-library/react"
import { Todo } from "./todo"


function addNewTodoItem (value: string): {input: HTMLInputElement} {
  render(<Todo items={[]} />)
  const input: HTMLInputElement = screen.getByRole('textbox')

  fireEvent.change(input, {target: {value}})
  fireEvent.keyDown(input, {key: 'Enter', charCode: 13})

  return { input }
}

describe('first', () => { 
  test('should render the items passed as prop', () => {
    const items = [{value: 'buy milk', isDone: false}]
    render(<Todo items={items}/>)

    expect(screen.getByText(items[0].value)).toBeInTheDocument()
  })

  test('should render every item in the items passed prop', () => {
    const items = [
      {value: 'buy milk', isDone: false}, 
      {value: 'buy coffe', isDone: false}, 
      {value: 'pay light bill', isDone: false}
    ]
    render(<Todo items={items}/>)

    items.forEach((item) => {
      expect(screen.getByText(item.value)).toBeInTheDocument()
    })
  })

  test('should render a new item pressing the enter key', () => {
    const newItem = 'buy a new shoes'
    addNewTodoItem(newItem)

    expect(screen.getByText(newItem)).toBeInTheDocument()
  })

  test('should clear the input after adding a new todo item', () => {
    const newItem = 'buy a new shoes'
    const { input } = addNewTodoItem(newItem)

    expect(input.value).toBe('')
  })

  test('should render as many checkbox as items passed as props', () => {
    const items = [
      {value: 'buy milk', isDone: false}, 
      {value: 'buy coffe', isDone: false}, 
      {value: 'pay light bill', isDone: false}
    ]
    render(<Todo items={items}/>)
    const checkboxs = screen.getAllByRole('checkbox')

    expect(checkboxs).toHaveLength(items.length)
  })

  test('should render the checkbox with the right checked value', () => {
    const items = [
      {value: 'buy milk', isDone: true}, 
      {value: 'buy coffe', isDone: false}, 
      {value: 'pay light bill', isDone: true}
    ]
    render(<Todo items={items}/>)

    items.forEach((item) => {
      const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${item.value.replace(/ /g, '-')}`)
      expect(checkboxElement.defaultChecked).toBe(item.isDone)
    })
  })

  test('should add a class to the todo item container if this is marked as done', () => {
    const items = [
      {value: 'buy milk', isDone: true}, 
      {value: 'buy coffe', isDone: false}, 
      {value: 'pay light bill', isDone: true}
    ]
    render(<Todo items={items}/>)

    items.filter((item) => item.isDone).forEach((item) => {
      const containerElement: HTMLElement = screen.getByTestId(`container-${item.value.replace(/ /g, '-')}`)
      expect(containerElement).toHaveClass('isDone')
    })
  })
  
  test('should add the isDone class if a todo item gets clicked and this one does not have the class', () => {
    const items = [{value: 'buy coffe', isDone: false}]
    render(<Todo items={items}/>)

    const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${items[0].value.replace(/ /g, '-')}`)

    fireEvent.click(checkboxElement)

    const containerElement: HTMLElement = screen.getByTestId(`container-${items[0].value.replace(/ /g, '-')}`)

    expect(containerElement).toHaveClass('isDone')
  })

  test('should remove the isDone class if a todo item gets clicked and this one has the class', () => {
    const items = [{value: 'buy coffe', isDone: true}]
    render(<Todo items={items}/>)

    const checkboxElement: HTMLInputElement = screen.getByTestId(`checkbox-${items[0].value.replace(/ /g, '-')}`)

    fireEvent.click(checkboxElement)

    const containerElement: HTMLElement = screen.getByTestId(`container-${items[0].value.replace(/ /g, '-')}`)

    expect(containerElement).not.toHaveClass('isDone')
  })
})