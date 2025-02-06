"use client"

import { useState } from "react";

export default function Home() {
  const [data, setData] = useState(9);

  console.log(data);

  return (
    <main className="mb-52">
      {data}
    </main>
  );
}
