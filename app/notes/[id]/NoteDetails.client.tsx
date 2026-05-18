'use client'

import css from './NoteDetails.module.css'
import { useQuery } from '@tanstack/react-query'
import { fetchNoteById } from '@/lib/api'
import { useParams } from 'next/navigation'
import type { Note } from '@/types/note';

const NoteDetailsClient = (): React.ReactElement => {

  const params = useParams < {id: string} > ();
  const id = params?.id;

  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
    enabled: Boolean(id),
  });

  if (!id) return <p>Note id is missing</p>

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
        <div className={css.item}>
        <div className={css.header}>
            <h2>{note.title}</h2>
        </div>
        <p className={css.tag}>{note.tag}</p>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
        </div>
    </div>

  )
}

export default NoteDetailsClient