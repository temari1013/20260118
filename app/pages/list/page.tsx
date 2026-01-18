'use client';

import { useBooks } from '@/hooks/useBooks';

export default function BookListPage() {

  const { data, isLoading, error } = useBooks(1);
  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラーが発生しました</div>;

  return (
    <main>
      <h1>一覧</h1>
      <ul>
        {data?.map((book) => (
          <li key={book.id} >
            {book.title}
          </li>
        ))}
      </ul>
    </main>
  );
}