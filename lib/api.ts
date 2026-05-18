import axios from 'axios';
import type { Note, NewNote } from '@/types/note';

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface fullResp {
    notes: Note[],
    totalPages: number
}

export const fetchNotes = async (search: string, page: number, tag?: string): Promise<fullResp> => {
    const response = await axios.get<fullResp>("https://notehub-public.goit.study/api/notes", {
        params: {
            search,
            perPage: 12,
        page,
            ...(tag ? {tag} : {}),
        },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    });
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const deleteResp = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`
    }
  });
  return deleteResp.data;
}

export const createNote = async (note: NewNote): Promise<Note> => {
  const createResp = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    note,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
    }
  );
  return createResp.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const singleNote = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${myKey}`
    },
  });
  return singleNote.data;
}