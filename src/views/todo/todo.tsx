import React from 'react'

interface Item {
  value: string, isDone: boolean
}
interface Props {
  items: Item[]
}

export const Todo = ({ items }: Props) => {
  const [value, setValue] = React.useState('')
  const [todoItems, setTodoItems] = React.useState(items)

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && value) {
      setTodoItems((oldTodoItems) => [...oldTodoItems, {value, isDone: false}])
      setValue('')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(() => event.target.value)

  function handleCheckBoxChange (this: {item: Item}) {
    setTodoItems((oldTodoItems) => oldTodoItems.map((todoItem) => todoItem.value === this.item.value ? {...todoItem, isDone: !todoItem.isDone} : todoItem))
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
        {todoItems.map((item) => {
          const getCustomId = (section: string) => `${section}-${item.value.replace(/ /g, '-')}`
          const customCheckBoxId = getCustomId('checkbox')

          return (
            <div 
              key={item.value} 
              className={item.isDone ? 'isDone' : ''}
              data-testid={getCustomId('container')}
            >
              <input 
                type="checkbox" 
                id={customCheckBoxId}
                data-testid={customCheckBoxId}
                defaultChecked={item.isDone}
                onChange={handleCheckBoxChange.bind({item})}
              />
              <label htmlFor={customCheckBoxId}>{item.value}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
