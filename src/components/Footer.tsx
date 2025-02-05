"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const links = [
    { name: "Política de Privacidad", href: "/privacy-policy" },
    { name: "Términos y Condiciones", href: "/terms" },
    { name: "Contacto", href: "/contact" },
  ];

  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com", icon: <Facebook size={20} /> },
    { name: "Twitter", href: "https://twitter.com", icon: <Twitter size={20} /> },
    { name: "Instagram", href: "https://instagram.com", icon: <Instagram size={20} /> },
  ];

  return (
    <footer className="bg-cyan-800 text-white text-center p-6 mt-10">
      <div className="container mx-auto space-y-4">
        <p className="text-lg font-semibold">© {year} MyApp. Todos los derechos reservados.</p>

        {/* Enlaces del footer */}
        <div className="flex flex-wrap justify-center space-x-6">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-gray-300">
              {link.name}
            </Link>
          ))}
        </div>

        {/* Redes sociales */}
        <div className="flex justify-center space-x-4 mt-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
