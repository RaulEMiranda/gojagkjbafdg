"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-cyan-800 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo / Home */}
        <Link href="/" className="text-2xl font-bold">
          MyApp
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">
            Inicio
          </Link>
          <Link href="/pokemons" className="hover:text-gray-300">
            Pokémon
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            Acerca de
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-white"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-cyan-700 p-4 space-y-3">
          <Link href="/" className="block hover:text-gray-300" onClick={toggleMenu}>
            Inicio
          </Link>
          <Link href="/pokemons" className="block hover:text-gray-300" onClick={toggleMenu}>
            Pokémon
          </Link>
          <Link href="/about" className="block hover:text-gray-300" onClick={toggleMenu}>
            Acerca de
          </Link>
        </nav>
      )}
    </header>
  );
}
