import { useQuery } from '@tanstack/react-query'
import { definitions } from '@/types/api';

type Book = definitions['outputs.BookResponse'];

export const fetchBooks = async (): Promise<Array<Book>> => {
  const response = await fetch('/api/books');
  const data = await response.json()
  return data//.filter((x:  Book) => x.id <= limit)
}

export const useBooks = (limit: number) => {
  return useQuery({
    queryKey: ['books', limit],
    queryFn: () => fetchBooks(),
  })
}

