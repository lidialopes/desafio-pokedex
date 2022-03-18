import { createContext } from 'react';
import Pokemon from '../model/Pokemon';

export type PokedexContextType = {
    pokedex: Pokemon[],
    setPokedex: (pokemonList: Pokemon[]) => void,
};

const pokedexInitialValue: Pokemon[] = [];

const PokedexContext = createContext({
    pokedex: pokedexInitialValue,
    setPokedex: (pokemonList: Pokemon[]) => {},
});

export default PokedexContext;