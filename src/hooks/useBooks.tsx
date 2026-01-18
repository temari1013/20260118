import { useQuery } from '@tanstack/react-query'
import { Book } from '../../app/pages/list/page'


const fetchBooks = async (): Promise<Array<Book>> => {
  const response = await fetch('localhost:8081')
  const data = await response.json()
  return data//.filter((x:  Book) => x.id <= limit)
}

const useBooks = (limit: number) => {
  return useQuery({
    queryKey: ['books', limit],
    queryFn: () => fetchBooks(),
  })
}

export { useBooks, fetchBooks}