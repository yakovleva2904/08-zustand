import { create } from "zustand";

type NotesStore = {
  search: string;
  page: number;
  isModalOpen: boolean;

  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const useNotesStore = create<NotesStore>((set) => ({
  search: "",
  page: 1,
  isModalOpen: false,

  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
}));