'use client'
import { useCreateBook } from '@/hooks/useBooks'
import { FormEvent, useState } from 'react'
import styles from './page.module.css'
import { definitions } from '@/types/api'
import { GoogleLoginButton, type UserData } from '@/components/GoogleLoginButton'
import toast, { Toaster } from "react-hot-toast";

export default function BookRegisterPage() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const mutation = useCreateBook()
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const isbn = formData.get('isbn') as string
        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const description = formData.get('description') as string
        const state = formData.get('state') as definitions["inputs.BookStatus"]
        mutation.mutate(
            { 
                isbn, 
                title, 
                author, 
                description,
                state,
            },
            {
                onSuccess: () => {
                    toast.success("登録に成功しました");
                },
                onError: (error) => {
                    toast.error("登録に失敗しました。");
                    console.error("エラー:", error);
                },
            },
        )
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
                <label className={styles.label}>著者名</label>
                <input type="text" name="author" className={styles.input} required />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>説明</label>
                <input type="text" name="description" className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>状態</label>
                <input type="text" name="state" className={styles.input} />
            </div>

            <button
                type="submit"
                disabled={mutation.isPending}
                className={styles.button}
                onClick={async () => { 
              toast.error();
            }}
            >
                {mutation.isPending ? '送信中...' : '登録する'}

            </button>

        </form>
        </>
        )}
    </main>
  );
}