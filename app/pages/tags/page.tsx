'use client';

import { useCreateTag, useTags } from '@/hooks/useTags';
import { FormEvent, useState } from 'react';
import styles from './page.module.css';
import { GoogleLoginButton, type UserData } from '@/components/GoogleLoginButton';
import toast, { Toaster } from 'react-hot-toast';

export default function TagsPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [tagName, setTagName] = useState('');
  const { data: tags, isLoading, error } = useTags();
  const mutation = useCreateTag();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!tagName.trim()) {
      toast.error('タグ名を入力してください');
      return;
    }

    mutation.mutate(tagName, {
      onSuccess: () => {
        setTagName('');
        toast.success('タグが登録されました');
      },
      onError: (error) => {
        toast.error('タグ登録に失敗しました。');
        console.error('エラー:', error);
      },
    });
  }

  return (
    <main className={styles.container}>
      {!userData ? (
        <div className={styles.loginSection}>
          <h2>ログインしてください</h2>
          <GoogleLoginButton handleValueChange={setUserData} />
        </div>
      ) : (
        <>
          <p>ログイン中: {userData.email}</p>
          <h1 className={styles.heading}>タグ管理</h1>

          <div className={styles.formSection}>
            <h2 className={styles.subHeading}>タグを追加</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>タグ名</label>
                <input
                  type="text"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className={styles.input}
                  placeholder="例: SF、エッセイ、小説..."
                />
              </div>
              <button
                type="submit"
                disabled={mutation.isPending}
                className={styles.button}
              >
                {mutation.isPending ? '送信中...' : 'タグを追加'}
              </button>
            </form>
          </div>

          <div className={styles.tagsSection}>
            <h2 className={styles.subHeading}>タグ一覧</h2>

            {isLoading && <div className={styles.message}>読み込み中...</div>}
            {error && <div className={styles.error}>エラーが発生しました</div>}

            {tags && tags.length > 0 ? (
              <div className={styles.tagsList}>
                {tags.map((tag) => (
                  <div key={tag.id} className={styles.tagDisplay}>
                    {tag.name}
                  </div>
                ))}
              </div>
            ) : (
              !isLoading && (
                <div className={styles.message}>
                  タグがまだ登録されていません
                </div>
              )
            )}
          </div>
          <Toaster position="bottom-center" />
        </>
      )}
    </main>
  );
}
