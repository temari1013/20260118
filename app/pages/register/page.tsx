'use client'
import { useCreateBook } from '@/hooks/useBooks'
import { FormEvent } from 'react'
import styles from './page.module.css'

export default function BookRegisterPage() {
    const mutation = useCreateBook()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const title = formData.get('title') as string
        const author = formData.get('author') as string

        mutation.mutate(
            { title, author },
            {
                onSuccess: () => {
                    console.log('登録成功！')
                   
                }
            }
        )
    }

    return (
    <main className={styles.container}>
        <h1 className={styles.title}>書籍登録</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label className={styles.label}>ISBNコード</label>
                <input type="text" name="isbn" className={styles.input} placeholder="例: 978-4-xxx-xxxx-x" />
            </div>
            
            <div className={styles.formGroup}>
                <label className={styles.label}>書籍名</label>
                <input type="text" name="title" className={styles.input} required />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>書籍名（カナ）</label>
                <input type="text" name="title_kana" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>著者名</label>
                <input type="text" name="author" className={styles.input} required />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>著者名（カナ）</label>
                <input type="text" name="author_kana" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>説明</label>
                <input type="text" name="description" className={styles.input} />
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className={styles.button}
            >
                {mutation.isPending ? '送信中...' : '登録する'}
            </button>
      </form>
    </main>
  );
}