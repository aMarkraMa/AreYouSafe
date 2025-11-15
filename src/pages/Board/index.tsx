import { useKanban } from "@/stores/useKanban";
export const Board = () => {
    const { boards, createBoard } = useKanban();
    return (
        <div>
            {
                boards.map((board) => (
                    <div key={board.id}>
                        {board.name}
                    </div>
                ))
            }
            <button onClick={() => createBoard({id:`${boards.length+1}`, name: 'Board ' + boards.length})}>Create Board</button>
            </div>
        );
    };