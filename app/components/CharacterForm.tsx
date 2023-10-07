'use client';

import Yanqing from "../entities/characters/Yanqing";
import CharacterData from "./CharacterData";

export default function CharacterForm() {
  let yanqing: Yanqing = new Yanqing("Yanqing");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  }
  
  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <CharacterData character={yanqing}/>
    </form>
  )
}
