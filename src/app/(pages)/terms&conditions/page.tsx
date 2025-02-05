"use client";
import { useState } from "react";

export default function Electrodomesticos() {
  const [first, setFirst] = useState<boolean>(false);

  return (
    <>
      <button onClick={() => setFirst(!first)}>Toggle</button>
      {first ? <h1>Hello World!</h1> : <h2>Hello World! 2222</h2>}
      <h2>Toggled: {first.toString()}</h2>

      <button onClick={() => setFirst(false)}>Toggle again</button>
    </>
  );
}
