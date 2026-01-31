import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>書籍管理</h1>
      <nav className={styles.nav}>
        <Link href="/pages/list" className={styles.linkButton}>
          一覧を見る
        </Link>
        <Link href="/pages/register" className={styles.linkButton}>
          登録する
        </Link>
      </nav>
    </main>
  );
}