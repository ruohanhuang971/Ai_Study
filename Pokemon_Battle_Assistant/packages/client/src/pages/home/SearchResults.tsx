import { useQuery } from '@tanstack/react-query';
import { PokemonApi } from '../../components/PokemonApi';
import type { PokemonBasicInfo } from '../../components/PokemonApi';

// const SearchResults = ({
//     id,
//     name,
//     sprites: { front_default },
// }: PokemonBasicInfo) => {
//     return (
//         <div>
//             {id} {name} {front_default}
//         </div>
//     );
// };

type SearchResultsProp = {
    page: number;
};

type PokemonPageProp = {
    pokemon: PokemonBasicInfo[];
};

const SearchResults = ({ page }: SearchResultsProp) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['pokemon'],
        queryFn: () => PokemonApi.fetchPokemonPage(page),
    });

    // const PageData = await PokemonApi.fetchPokemonPage(page);
    if (error) return <p>Something went wrong</p>;
    if (isLoading) return <p>...</p>;

    const { pokemon } = data as PokemonPageProp;
    return (
        <div className="mt-10">
            {pokemon.map((p: PokemonBasicInfo, index: number) => (
                <p key={index}>{p.id}</p>
            ))}
        </div>
    );
};

export default SearchResults;
