import axios from "axios";
import { Dispatch, SetStateAction } from "react";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export const axiosPokemons = async (
  setPokemons: Dispatch<SetStateAction<Pokemon[]>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  page: number
): Promise<void> => {
  try {
    setPokemons([]);
    setLoading(true);
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`
    );

    const pokemonData = await Promise.all(
      response.data.results.map(async (pokemon: any) => {
        const res = await axios.get(pokemon.url);
        return {
          name: res.data.name,
          image: res.data.sprites.other.dream_world.front_default,
          id: res.data.id,
        };
      })
    );

    setPokemons(pokemonData);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
    setLoading(false);
  }
 
};