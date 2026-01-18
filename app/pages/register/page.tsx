'use client'
import { useCreateBook } from '@/hooks/useBooks'
import { FormEvent } from 'react'

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
    <main>
        <form onSubmit={handleSubmit} >
        <div >
         <input type="text" name="title" />
         <input type="text" name="author" />
         <button
            type="submit"
            disabled={mutation.isPending}
        >
            {mutation.isPending ? '送信中...' : 'Send'}
        </button>
        </div>
      </form>
      
    </main>
  );
}