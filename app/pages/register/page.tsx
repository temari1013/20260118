'use client'
import { useCreateBook } from '@/hooks/useBooks'
import { useTags } from '@/hooks/useTags'
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
    const { data: tags, isLoading: tagsLoading } = useTags()
    const [state, setState] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState<number[]>([]);
    
    const handleStateChange = (event: SelectChangeEvent) => {
        setState(event.target.value as string);
    };

    const handleTagClick = (tagId: number) => {
        setSelectedTags((prev) => 
            prev.includes(tagId) 
                ? prev.filter(id => id !== tagId)
                : [...prev, tagId]
        );
    };

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const isbn = formData.get('isbn') as string
        const title = formData.get('title') as string
        const author = formData.get('author') as string
        const description = formData.get('description') as string
        const state = formData.get('state') as "default" | "damaged" | "lending" | "lost" | undefined
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
                <label className={styles.label}>タグ</label>
                {tagsLoading ? (
                    <div className={styles.tagsMessage}>読み込み中...</div>
                ) : tags && tags.length > 0 ? (
                    <div className={styles.tagsList}>
                        {tags.map((tag) => (
                            <button
                                key={tag.id}
                                type="button"
                                onClick={() => handleTagClick(tag.id)}
                                className={`${styles.tagBadge} ${
                                    selectedTags.includes(tag.id) ? styles.selected : ''
                                }`}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className={styles.tagsMessage}>タグがまだ登録されていません</div>
                )}
            </div>

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">State</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    name="state"
                    onChange={handleStateChange}
                >
                    <MenuItem value={"default"}>普通</MenuItem>
                    <MenuItem value={"damaged"}>損傷</MenuItem>
                    <MenuItem value={"lending"}>貸出中</MenuItem>
                    <MenuItem value={"lost"}>喪失</MenuItem>
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