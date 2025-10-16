import axios from 'axios';

export type PokemonBasicInfo = {
    id: string;
    name: string;
    sprites: {
        front_default: string | null;
    };
};

export type GetPokemonPage = {
    pokemon: PokemonBasicInfo;
};

// export type PokemonFullInfo = {};

export const PokemonApi = {
    async fetchPokemonPage(page: number) {
        const { data } = await axios.get(`/api/v1/team/${page}`);
        console.log(data);

        //return pokemon;
        return data;
    },
};
