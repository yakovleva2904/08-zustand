'use client';

import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '@/lib/api';
import { useNoteStore } from '@/lib/store/noteStore';
import type { Tag } from '@/types/note';

import css from './NoteForm.module.css';

const tags: Tag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const draft = useNoteStore(state => state.draft);
  const setDraft = useNoteStore(state => state.setDraft);
  const clearDraft = useNoteStore(state => state.clearDraft);

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const title = String(formData.get('title') || '');
    const content = String(formData.get('content') || '');
    const tag = String(formData.get('tag') || 'Todo') as Tag;

    mutation.mutate({
      title,
      content,
      tag,
    });
  };

  return (
    <form className={css.form} action={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          defaultValue={draft.title}
          onChange={event => setDraft({ title: event.target.value })}
          className={css.input}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={draft.content}
          onChange={event => setDraft({ content: event.target.value })}
          className={css.textarea}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          defaultValue={draft.tag}
          onChange={event => setDraft({ tag: event.target.value as Tag })}
          className={css.select}
        >
          {tags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
}