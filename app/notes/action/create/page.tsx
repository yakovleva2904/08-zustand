import type { Metadata } from 'next';

import NoteForm from '@/components/NoteForm/NoteForm';

import css from './CreateNotePage.module.css';

export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create a new note',

  openGraph: {
    title: 'Create note',
    description: 'Create a new note',

    url: 'https://08-zustand-nine-dun.vercel.app/notes/action/create',

    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'Create note page preview',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>

        <NoteForm />
      </div>
    </main>
  );
}