import React from 'react'

interface Props {
  items: {value: string, isDone: boolean}[]
}

export const Todo = ({ items }: Props) => {
  const [value, setValue] = React.useState('')
  const [todoItems, setTodoItems] = React.useState(items)

  return (
    <div>
      <div>
        <input 
          type="text" 
          value={value} 
          onChange={(event) => setValue(() => event.target.value)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && value) {
              setTodoItems((oldTodoItems) => [...oldTodoItems, {value, isDone: false}])
              setValue('')
            }
          }}
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
                onChange={() => {
                  setTodoItems((oldTodoItems) => oldTodoItems.map((todoItem) => todoItem.value === item.value ? {...todoItem, isDone: !todoItem.isDone} : todoItem))
                }}
              />
              <label htmlFor={customCheckBoxId}>{item.value}</label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
