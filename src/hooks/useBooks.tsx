import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { definitions } from '@/types/api';

type BookResponse = definitions['outputs.BookResponse'];
export type Book = Omit<BookResponse, 'created_at'> & {
  created_at?: Date;
  tag_ids?: number[];
};

export const fetchBooks = async (): Promise<Array<Book>> => {

  const apiUrl = process.env.NEXT_PUBLIC_MODE === 'prod' 
    ? 'https://books-backend.shimaena.ga' 
    : 'http://localhost:8081';
  const response = await fetch(`${apiUrl}/books`, {
    credentials: 'include',
  });
  const data: Array<BookResponse> = await response.json();
  return data.map((book) => ({
    ...book,
    created_at: book.created_at ? new Date(book.created_at) : undefined,
  }));
};

export const useBooks = () => {
  return useQuery({
    queryKey: ['books', ],
    queryFn: () => fetchBooks(),
  })
}

const createBook = async (newBook: Book) => {
  console.log(newBook);
  const apiUrl = process.env.NEXT_PUBLIC_MODE === 'prod' 
    ? 'https://books-backend.shimaena.ga' 
    : 'http://localhost:8081';
  const res = await fetch(`${apiUrl}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    credentials: 'include',
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
