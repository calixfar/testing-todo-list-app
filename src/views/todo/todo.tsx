import React from 'react'
import TodoItem from '../../components/todo-item'
import { Item } from './interfaces'
interface Props {
  items: Item[]
  onDeleteItem: (id: string) => void
}

export const Todo = ({ items, onDeleteItem = (id: string) => {} }: Props) => {
  const [value, setValue] = React.useState('')
  const [todoItems, setTodoItems] = React.useState(items)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value) {
      setTodoItems((oldTodoItems) => [...oldTodoItems, { id: `${oldTodoItems.length + 1}`, value, isDone: false }])
      setValue('')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => { setValue(() => event.target.value) }

  function handleCheckBoxChange (this: { item: Item }) {
    setTodoItems((oldTodoItems) => oldTodoItems.map((todoItem) => todoItem.value === this.item.value ? { ...todoItem, isDone: !todoItem.isDone } : todoItem))
  }

  const handleDeleteItem = (id: string) => {
    onDeleteItem(id)
    setTodoItems((items) => items.filter(item => item.id !== id))
  }

  return (
    <div>
      <div>
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div>
        {todoItems.map((item) => (
          <TodoItem key={item.id} item={item} handleCheckBoxChange={handleCheckBoxChange} handleDeleteItem={handleDeleteItem} />
        ))}
      </div>
    </div>
  )
}
