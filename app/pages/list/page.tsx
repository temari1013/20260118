'use client';

import { useMemo } from 'react';
import { useBooks } from '@/hooks/useBooks';
import { useTags } from '@/hooks/useTags';
import styles from './page.module.css';


export default function BookListPage() {

  const { data, isLoading, error } = useBooks();
  const { data: tags , isLoading: isLoading2} = useTags();
  const sortedBooks = useMemo(() => {
    return [...(data ?? [])].sort((a, b) => {
      if (a.state === 'lost' && b.state !== 'lost') return 1;
      if (a.state !== 'lost' && b.state === 'lost') return -1;
      return 0;
    });
  }, [data]);
  
  if (isLoading || isLoading2) return <div className={styles.message}>読み込み中...</div>;
  if (error) return <div className={styles.error}>エラーが発生しました</div>;
  console.log(tags);
  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>書籍一覧</h1>
  
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>ISBN</th>
              <th className={styles.th}>書籍名</th>
              <th className={styles.th}>著者</th>
              <th className={styles.th}>状態</th>
              <th className={styles.th}>説明</th>
              <th className={styles.th}>タグ</th>
              <th className={styles.th}>登録日</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book) => (
              <tr
                key={book.id}
                className={`${styles.tr} ${book.state === 'lost' ? styles.lostRow : ''}`}
              >
                <td className={styles.td}>{book.isbn}</td>
                <td className={styles.td}>{book.title}</td>
                <td className={styles.td}>{book.author}</td>
                <td className={styles.td}>{book.state}</td>
                <td className={styles.td}>{book.description}</td>
                <td className={styles.td}>
                  {book.tags && book.tags.length > 0 ? (
                    book.tags.map(tag => tag.name).join(', ')
                  ) : (
                    '—'
                  )}
                </td>
                <td className={styles.td}>{String(book.created_at)}</td>
              </tr>
            ))}
            {/* あとで、個別のidに対してページを生やすことを考えたほうがよいかも*/ }
          </tbody>
        </table>
      </div>
    </main>
  );
}
