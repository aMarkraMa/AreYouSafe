import { create } from "zustand";

interface Board {
    id: string;
    name: string;
}
type BoardsStoreType = {
    boards: Board[];
    createBoard: (board: Board) => void;
}

export const useKanban = create<BoardsStoreType>((set) => ({
    boards: [],
    createBoard: board => set(state => ({ boards: [...state.boards, board] })),
}));