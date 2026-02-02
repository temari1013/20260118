'use client'
import { useCreateBook } from '@/hooks/useBooks'
import { FormEvent, useState } from 'react'
import styles from './page.module.css'
import { GoogleLoginButton, type UserData } from '@/components/GoogleLoginButton'
import toast, { Toaster } from "react-hot-toast";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BookRegisterPage() {
    const [userData, setUserData] = useState<UserData | null>(null)
    const mutation = useCreateBook()
    const [state, setState] = React.useState('');
        const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const isbn = formData.get('isbn') as string
        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const description = formData.get('description') as string
        const state = formData.get('state') as "default" | "damage" | "lending" | "loss" | undefined
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

           <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    name="state"
                    onChange={handleChange}
                >
                    <MenuItem value={"default"}>普通</MenuItem>
                    <MenuItem value={"damage"}>損傷</MenuItem>
                    <MenuItem value={"lending"}>貸出中</MenuItem>
                    <MenuItem value={"loss"}>喪失</MenuItem>
                </Select>
            </FormControl>

            <button
                type="submit"
                disabled={mutation.isPending}
                className={styles.button}
            >
                {mutation.isPending ? '送信中...' : '登録する'}
            </button>
                <Toaster position="bottom-center" />
        </form>
        </>
        )}
    </main>
  );
}