'use client';

import { useBooks } from '@/hooks/useBooks';
import styles from './page.module.css';

export default function BookListPage() {

  const { data, isLoading, error } = useBooks();

  if (isLoading) return <div className={styles.message}>読み込み中...</div>;
  if (error) return <div className={styles.error}>エラーが発生しました</div>;

  return (
    <main className={styles.container}>
      <h1 className={styles.heading}>書籍一覧</h1>
      <ul className={styles.grid}>
        {data?.map((book) => (
          <li key={book.id} className={styles.card}>
            
            <div className={styles.bookHeader}>
              {book.title_kana && (
                <div className={styles.bookKana}>{book.title_kana}</div>
              )}
              <div className={styles.bookTitle}>{book.title}</div>
            </div>

            {book.author && (
              <div className={styles.metaRow}>
                <span className={styles.label}>著者</span>
                <span className={styles.text}>
                  {book.author}
                  {book.author_kana && ` (${book.author_kana})`}
                </span>
              </div>
            )}

            {book.isbn && (
              <div className={styles.metaRow}>
                <span className={styles.label}>ISBN</span>
                <span className={styles.text}>{book.isbn}</span>
              </div>
            )}

            {book.description && (
              <div className={styles.description}>
                {book.description}
              </div>
            )}
            
          </li>
        ))}
      </ul>
    </main>
  );
}