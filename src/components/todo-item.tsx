import React, { useMemo, useState } from 'react'
import { Item } from './interfaces'

interface Props {
  item: Item
  handleCheckBoxChange: (this: { item: Item }) => void
  handleDeleteItem: (id: string) => void
}

const TodoItem = ({ item, handleCheckBoxChange, handleDeleteItem }: Props) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateInputValue, setUpdateInputValue] = useState(item.value)

  const getCustomId = (section: string) => `${section}-${item.id.replace(/ /g, '-')}`
  const customCheckBoxId = getCustomId('checkbox')

  const updateButtonText = useMemo(() => {
    let value = 'Update'

    if (updateInputValue !== item.value) {
      value = 'Change'
    }

    return value
  }, [item.value, updateInputValue])

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
        <>
          <input 
            data-testid={getCustomId('update-input')} 
            defaultValue={item.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUpdateInputValue(event.target.value)
            }}
          />
          <button
            data-testid={getCustomId('cancel-button')}
            onClick={() => {
              setIsUpdating(false)
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <label htmlFor={customCheckBoxId}>{item.value}</label>
      )}
      {!item.isDone && (
        <button
          data-testid={getCustomId('update-button')}
          onClick={() => setIsUpdating(true)}
        >{updateButtonText}</button>
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
