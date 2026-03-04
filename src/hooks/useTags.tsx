import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { definitions } from '@/types/api';

type TagResponse = definitions['outputs.TagResponse'];

export type Tag = TagResponse;

export const fetchTags = async (): Promise<Array<Tag>> => {
  const apiUrl = process.env.NEXT_PUBLIC_MODE === 'prod' 
    ? 'https://books-backend.shimaena.ga' 
    : 'http://localhost:8081';
  const response = await fetch(`${apiUrl}/tags`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('タグの取得に失敗しました');
  }
  const data: Array<TagResponse> = await response.json();
  return data;
};

export const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => fetchTags(),
  });
};

const createTag = async (tagName: string) => {
  const apiUrl = process.env.NEXT_PUBLIC_MODE === 'prod' 
    ? 'https://books-backend.shimaena.ga' 
    : 'http://localhost:8081';
  const res = await fetch(`${apiUrl}/tags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify([{ name: tagName }]),
  });

  if (!res.ok) {
    throw new Error('タグ登録に失敗しました');
  }
  return res.json();
};

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tags'] });
    },
  });
};

