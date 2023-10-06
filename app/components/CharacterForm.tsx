'use client';

import Yanqing from "../entities/characters/Yanqing";

export default function CharacterForm() {
  let yanqing: Yanqing = new Yanqing("Yanqing", 40);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  }
  
  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="font-sans font-bold text-purple-200">
        {yanqing.name} Base Stats<br/>
        HP: {yanqing.hpBase} <br/>
        ATK: {yanqing.atkBase} <br/>
        DEF: {yanqing.defBase} <br/>
        SPD: {yanqing.spdBase}
      </div>
    </form>
  )
}
