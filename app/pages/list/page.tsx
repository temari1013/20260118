'use client';
import { useQuery } from '@tanstack/react-query';
import { definitions } from '@/types/api';

export type Book=definitions['outputs.BookResponse'];

export default function BookListPage() {
  
  return (
    <main >
      <h1 >一覧</h1>
      {/* リスト表示部分 */}
    </main>
  );
}