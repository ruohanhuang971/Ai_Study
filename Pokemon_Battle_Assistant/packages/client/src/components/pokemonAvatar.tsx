// display a head-shot of the pokemon + name
// to put into slots for team building/display

import type { UniqueIdentifier } from '@dnd-kit/core';

type PokemonAvatarProps = {
    name: UniqueIdentifier;
};

const PokemonAvatar = ({ name }: PokemonAvatarProps) => {
    return (
        <div>
            {/* placeholder square */}
            <div className="w-30 h-30 flex justify-center items-center bg-gray-800 rounded-2xl text-amber-100 font-bold cursor-grab active:cursor-grabbing">
                {name == 'null' ? 'drop here' : name}
            </div>
        </div>
    );
};

export default PokemonAvatar;
