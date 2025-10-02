import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { useState } from 'react';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import SearchOptions from './SearchOptions'; // draggable
import TeamSlots from './TeamSlots'; // droppable
import PokemonAvatar from '../../components/pokemonAvatar';

/*
    TeamBuilder: drag pokemon cards from search options to teamSlot
*/

const TeamBuilder = () => {
    const containers = ['A', 'B', 'C'];
    const items = ['pikachu', 'bulbasaur', 'charmander', 'evee']; // TODO: TEST DRAGGABLE OPTIONS

    // track item in slot
    // Record<K, V>: K = key of object, V = value of key
    const [assignSlot, setAssignSlot] = useState<
        Record<UniqueIdentifier, UniqueIdentifier | null>
    >({
        A: null,
        B: null,
        C: null,
    });

    const [activeItem, setActiveItem] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div>
            <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                {/* Row of droppable slots */}
                <div className="flex justify-center space-x-6 mb-8">
                    {containers.map((id) => (
                        <TeamSlots key={id} id={id}>
                            {assignSlot[id] ? ( // if dragged slot has stuff in it
                                // render the card
                                <SearchOptions id={assignSlot[id]!}>
                                    {<PokemonAvatar name={assignSlot[id]} />}
                                </SearchOptions>
                            ) : (
                                <PokemonAvatar name="null" /> // set to blank slot if not
                            )}
                        </TeamSlots>
                    ))}
                </div>

                {/* Draggable Items */}
                <div className="flex justify-center space-x-4">
                    {items.map((itemId) =>
                        // only render if not assigned to a slot
                        !Object.values(assignSlot).includes(itemId) ? (
                            <SearchOptions key={itemId} id={itemId}>
                                {<PokemonAvatar name={itemId} />}
                            </SearchOptions>
                        ) : null
                    )}
                </div>
            </DndContext>
        </div>
    );

    function handleDragEnd(event: DragEndEvent) {
        const { over, active } = event;

        if (over) {
            // set item into slot it is dragged in
            setAssignSlot((prev) => {
                const newAssignments = { ...prev };

                // if the the dragged car is already in a slot, don't add it
                // Find the slot that contains this draggable
                const slotId = Object.keys(prev).find(
                    (key) => prev[key] === active.id
                );

                if (!slotId) {
                    newAssignments[over.id] = active.id; // add it to slot
                } else {
                    newAssignments[slotId] = null; // remove it from the slot
                    newAssignments[over.id] = active.id; // add it to new slot
                }

                return newAssignments;
            });
        } else {
            setAssignSlot((prev) => {
                const newAssignments = { ...prev }; // prev is previous value of state

                // Find the slot that contains this draggable
                const slotId = Object.keys(prev).find(
                    (key) => prev[key] === active.id
                );

                if (slotId) {
                    newAssignments[slotId] = null; // remove it from the slot
                }

                return newAssignments;
            });
        }
    }
};

export default TeamBuilder;
