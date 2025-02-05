"use client";

import { Pokemon } from "@/app/types/Pokemon";
import Loader from "@/components/Loader";
import Skeleton from "@/components/Skeleton";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonName() {
  const { pokemonId } = useParams();
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const getPokemon = async () => {
      try {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
        );
        console.log(res.data.types);

        const info = {
          name: res.data.name,
          abilities: res.data.abilities,
          image: [
            `${res.data.sprites.other.dream_world.front_default}`,
            `${res.data.sprites.other.home.front_default}`,
          ],
          types: res.data.types.map((p) => p.type.name),
        };
        setPokemon(info);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
        setLoading(false);
      }
    };

    getPokemon();
  }, []);

  if (loading) {
    return <Loader />;
  }
  function getTypeColor(type: string): string {
    const typeColors: Record<string, string> = {
      fire: "#F08030",
      water: "#6890F0",
      grass: "#78C850",
      electric: "#F8D030",
      ice: "#98D8D8",
      fighting: "#C03028",
      poison: "#A040A0",
      ground: "#E0C068",
      flying: "#A890F0",
      psychic: "#F85888",
      bug: "#A8B820",
      rock: "#B8A038",
      ghost: "#705898",
      dark: "#705848",
      dragon: "#7038F8",
      steel: "#B8B8D0",
      fairy: "#EE99AC",
      normal: "#A8A878",
    };

    return typeColors[type] || "#A8A878"; // Default to normal type color
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {pokemon ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Pokémon Name */}
          <h1 className="text-3xl font-bold text-center capitalize mb-6">
            {pokemon.name}
          </h1>

          {/* Pokémon Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 justify-center items-center justify-center gap-4 mb-6">
            {pokemon.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${pokemon.name} image`}
                className="w-56 h-56 object-contain"
              />
            ))}
          </div>

          {/* Pokémon Types */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Types</h2>
            <div className="flex gap-2 mt-2">
              {pokemon.types.map((type, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full text-white text-sm font-medium capitalize"
                  style={{ backgroundColor: getTypeColor(type) }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          {/* Pokémon Abilities */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Abilities</h2>
            <ul className="list-disc pl-5 space-y-1">
              {pokemon.abilities.map((ability, index) => (
                <li key={index} className="capitalize">
                  {ability.ability.name}{" "}
                  {ability.is_hidden && (
                    <span className="text-sm text-gray-500">(Hidden)</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <Skeleton className="w-full h-48" />
        </div>
      )}
    </div>
  );
}
