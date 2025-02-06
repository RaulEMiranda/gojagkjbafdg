"use client"

import { useState } from "react";

export default function Home() {
  // Cambiar el valor de 'useState' en la rama 'kakaroto'
  const [data, setData] = useState(42);  // Cambié de 9 a 42

  console.log(data);

  return (
    <main className="mb-52">
      {data}
    </main>
  );
}