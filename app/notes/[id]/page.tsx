import type { Metadata } from 'next';

import { fetchNoteById } from '@/lib/api';

import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';

import NoteDetailsClient from './NoteDetails.client';

type DetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: DetailsProps): Promise<Metadata> {
  const { id } = await params;

  const note = await fetchNoteById(id);

  return {
    title: note.title,
    description: note.content.slice(0, 100),

    openGraph: {
      title: note.title,
      description: note.content.slice(0, 100),
      url: `/notes/${id}`,
      images: [
        'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      ],
    },
  };
}

export default async function NoteDetails({
  params,
}: DetailsProps) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}