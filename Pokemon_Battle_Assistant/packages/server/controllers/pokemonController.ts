import { request, type Request, type Response } from 'express';
import axios, { type AxiosResponse } from 'axios';

type PokemonBasicInfo = {
    id: string;
    name: string;
    sprites: {
        front_default: string | null;
    };
};

type APIResource = {
    name: string;
    url: string;
};

const PAGE_SIZE = 20;

export const getAllPokemon = async (req: Request, res: Response) => {
    const page = Number(req.params.page);
    // is validate input
    if (isNaN(page)) {
        return res.status(400).json({ error: 'Invalid page.' });
    }

    // fetch data from pokemon api
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${page * PAGE_SIZE}`;
    const response = await axios.get(URL);
    const pokemonResource = response.data.results as APIResource[];

    // fetch detailed data with the pokemon url
    const pokemon = [];
    for (let i of pokemonResource) {
        const temp = await axios.get(i.url);

        const {
            id,
            name,
            sprites: { front_default },
        } = temp.data;
        pokemon.push({ id, name, front_default });
    }

    return res.json({
        message: 'Getting all pokemon',
        pokemon,
    });
};

export const getSinglePokemon = async (req: Request, res: Response) => {
    return res.json({ message: 'Getting single pokemon' });
};
