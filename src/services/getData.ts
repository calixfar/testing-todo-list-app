import { Item } from '../components/interfaces'

export const getData = async () => {
  const items = [] as Item[]
  
  return { data: items }
}
