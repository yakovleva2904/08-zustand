'use client';

import { useState } from 'react';
import Link from 'next/link';

import css from './Notes.module.css';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);

  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearchQuery(value);
    setPage(1);
  }, 300);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', page, searchQuery, tag],
    queryFn: () => fetchNotes(searchQuery, page, tag),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError || !data) return <p>Error loading notes.</p>;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          searchQuery={inputValue}
          onChange={(value: string) => {
            setInputValue(value);
            debouncedSearch(value);
          }}
        />

        
          {data.totalPages > 1 && (
            <Pagination
              totalPages={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}

          <Link href="/notes/action/create" className={css.button}>
            Create note +
          </Link>
        
      </header>

      {data.notes.length > 0 && <NoteList notes={data.notes} />}
    </div>
  );
}