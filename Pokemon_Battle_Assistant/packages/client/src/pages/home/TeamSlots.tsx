import { type ReactNode } from 'react';
import { useDroppable } from '@dnd-kit/core';

// Droppable component
type DragDropProps = {
    children: ReactNode;
    id: string;
};

const TeamSlots = ({ children, id }: DragDropProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: id,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
};

export default TeamSlots;
