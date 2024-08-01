// TIENDA DE ESTADO GLOBAL USANDO ZUSTAND
// SERA UN LOADING QUE CADA VEX QUE CAMBIA VA A REACCIONAR REACT

import { create } from "zustand";

interface LoadingStore {
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
