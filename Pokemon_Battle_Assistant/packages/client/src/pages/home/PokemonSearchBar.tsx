import { useForm, type SubmitHandler } from 'react-hook-form';

type Inputs = {
    pokemonName: string;
};

const PokemonSearchBar = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div className="mt-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* input validation */}
                <input
                    type="search"
                    {...register('pokemonName', { required: true })}
                    placeholder="Search for pokemon..."
                    className="bg-amber-50 border border-amber-400 text-black w-full max-w-md px-4 py-2 rounded-md focus:border-amber-400"
                />
                {/* errors will return when field validation fails  */}
                {errors.pokemonName && (
                    <p className="text-red-700 italic">
                        This field is required
                    </p>
                )}
                <input
                    type="submit"
                    className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-10 py-2 rounded cursor-pointer"
                />
            </form>
        </div>
    );
};

export default PokemonSearchBar;
