import React, { useEffect, useState } from 'react'
import { Item } from '../../components/interfaces'
import { Todo } from './todo'
import { getData as getDataService } from '../../services/getData'

interface Props {
  getData?: () => Promise<{ data: Item[] }>
}

const TodoContainer = ({ getData = getDataService }: Props) => {
  const [data, setData] = useState<Item[]>([])

  useEffect(() => {
    getData()
      .then((res) => setData(res.data))
      .catch(console.error)
  }, [])

  return (
    <Todo items={data} onDeleteItem={() => {}} />
  )
}

export default TodoContainer
