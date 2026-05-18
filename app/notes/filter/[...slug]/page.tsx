import type { Metadata } from 'next';

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { fetchNotes } from '@/lib/api';

import NotesClient from './Notes.client';

type Props = {
  params: Promise<{ slug?: string[] }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const currentSlug = slug?.[0] ?? 'all';

  const tag = currentSlug === 'all' ? 'All' : currentSlug;

  return {
    title: `Notes filtered by ${tag}`,
    description: `Browse notes filtered by ${tag}`,

    openGraph: {
      title: `Notes filtered by ${tag}`,
      description: `Browse notes filtered by ${tag}`,
      url: `/notes/filter/${currentSlug}`,
      images: [
        'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      ],
    },
  };
}

export default async function NotesFilterPage({ params }: Props) {
  const { slug } = await params;

  const selectedTag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', '', 1, selectedTag],
    queryFn: () => fetchNotes('', 1, selectedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={selectedTag} />
    </HydrationBoundary>
  );
}