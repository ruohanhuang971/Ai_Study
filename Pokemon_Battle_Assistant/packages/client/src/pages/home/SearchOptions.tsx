import { type ReactNode } from 'react';
import { useDraggable, type UniqueIdentifier } from '@dnd-kit/core';

type DragDropProps = {
    children: ReactNode;
    id: UniqueIdentifier;
};

const SearchOptions = ({ children, id }: DragDropProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div>{children}</div>
        </div>
    );
};

export default SearchOptions;
