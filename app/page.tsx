
import Link from 'next/link';

export default function Home() {
  return (
    <>
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-8">書籍管理</h1>
      <nav className="flex gap-4">
        <Link 
          href="/pages/list" 
        >
          一覧を見る 
        </Link>
        <Link 
          href="/pages/register" 
          
        >
          登録する 
        </Link>
      </nav>
    </main>
    </>
  );
}
