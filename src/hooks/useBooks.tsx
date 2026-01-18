import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { definitions } from '@/types/api';

type Book = definitions['outputs.BookResponse'];

export const fetchBooks = async (): Promise<Array<Book>> => {
  const response = await fetch('/api/books');
  const data = await response.json()
  return data//.filter((x:  Book) => x.id <= limit)
}

export const useBooks = () => {
  return useQuery({
    queryKey: ['books', ],
    queryFn: () => fetchBooks(),
  })
}

const createBook = async (newBook: Book) => {
  const res = await fetch('/api/books', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // JSONとして送る宣言
    },
   body: JSON.stringify([ newBook ]),
  });

  if (!res.ok) {
    throw new Error('登録に失敗しました');
  }
  return res.json();
};

export const useCreateBook = ()=>{
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBook, 
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}
