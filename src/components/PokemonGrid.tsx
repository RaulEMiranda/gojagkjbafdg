"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { axiosPokemons } from "@/lib/axiosPokemon";

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export default function PokemonGrid() {
  const searchParams = useSearchParams();
  const initialPage = Number(searchParams.get("page")) || 1;
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();

  useEffect(() => {
  
    axiosPokemons(setPokemons, setLoading, page );
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`?page=${newPage}`);
  };

  if (loading) {
    return <p className="text-center mt-8">Cargando Pokémon...</p>;
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl font-bold text-center mb-6">Pokémon Grid</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-6">
          {pokemons.map((pokemon) => (
            <Link href={`pokemons/${pokemon.id}`} key={pokemon.id}>
              <div className="bg-gray-100 p-4 border-2 border-cyan-800 rounded-lg shadow hover:shadow-lg transition transform hover:scale-105">
                <p className="text-lg font-semibold capitalize text-center mb-8">
                  {pokemon.name}
                </p>

                <div className="flex items-center justify-center h-64">
                  <Image
                    src={pokemon.image || "/bob.png"}
                    alt={pokemon.name}
                    width={200}
                    height={200}
                    className="max-h-64"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Pagination className="mt-4">
        <PaginationContent className="space-x-2 flex items-center justify-center">
          {/* Botón Anterior */}
          <PaginationItem>
            <PaginationPrevious
              className={`border rounded px-3 py-1 cursor-pointer ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => page > 1 && handlePageChange(page - 1)}
            />
          </PaginationItem>

          {/* Primera Página */}
          <PaginationItem>
            <PaginationLink
              className={`px-3 py-1 border rounded cursor-pointer ${
                page === 1 ? "bg-cyan-800 text-white" : ""
              }`}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>

          {/* Puntos suspensivos antes de la página actual si necesario */}
          {page > 4 && (
            <PaginationItem>
              <span className="px-3 py-1">...</span>
            </PaginationItem>
          )}

          {/* Páginas cercanas a la actual */}
          {Array.from({ length: 5 }, (_, i) => page - 2 + i)
            .filter((p) => p > 1 && p < 66) // Evita incluir la primera y última página
            .map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  className={`px-3 py-1 border rounded cursor-pointer ${
                    p === page ? "bg-cyan-800 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

          {/* Puntos suspensivos después de la página actual si necesario */}
          {page < 63 && (
            <PaginationItem>
              <span className="px-3 py-1">...</span>
            </PaginationItem>
          )}

          {/* Última Página */}
          <PaginationItem>
            <PaginationLink
              className={`px-3 py-1 border rounded cursor-pointer ${
                page === 66 ? "bg-cyan-800 text-white" : ""
              }`}
              onClick={() => handlePageChange(66)}
            >
              66
            </PaginationLink>
          </PaginationItem>

          {/* Botón Siguiente */}
          <PaginationItem>
            <PaginationNext
              className={`border rounded px-3 py-1 cursor-pointer ${
                page === 66 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => page < 66 && handlePageChange(page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
