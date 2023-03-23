import React, { useState } from 'react'
import { Item } from './interfaces'

interface Props {
  item: Item
  handleCheckBoxChange: (this: { item: Item }) => void
  handleDeleteItem: (id: string) => void
}

const TodoItem = ({ item, handleCheckBoxChange, handleDeleteItem }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)

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
        onChange={handleCheckBoxChange.bind({ item })}
      />
      {isUpdating ? (
        <input 
          data-testid={getCustomId('update-input')} 
          value={item.value}
        />
      ) : (
        <label htmlFor={customCheckBoxId}>{item.value}</label>
      )}
      {!item.isDone && (
        <button
          data-testid={getCustomId('update-button')}
          onClick={() => setIsUpdating(true)}
        >Update</button>
      )}
      {item.isDone && (
        <button
          onClick={() => handleDeleteItem(item.id)}
          data-testid={getCustomId('delete-button')}
        >Delete</button>
      )}
    </div>
  )
}

export default TodoItem
