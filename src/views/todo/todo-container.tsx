import React, { useEffect, useState } from 'react'
import { Item } from './interfaces'
import { Todo } from './todo'

interface Props {
  getData: () => Promise<{ data: Item[] }>
}

const TodoContainer = ({ getData }: Props) => {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    getData()
      .then((res) => setData(res.data))
      .catch(console.error)
  }, [])

  return (
    <Todo items={data} />
  )
}

export default TodoContainer
