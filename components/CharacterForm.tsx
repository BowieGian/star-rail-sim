"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import CharacterDisplay from "./CharacterDisplay";
import { CharacterKey, characterKeys, characterList, Characters } from "../src/entities/characters/data";

export default function CharacterForm() {
  const [characterKey, setCharacterKey] = useState<CharacterKey>("Yanqing");
  const character: MutableRefObject<Characters> = useRef<Characters>() as MutableRefObject<Characters>;
  character.current = characterList[characterKey];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    character.current = characterList[characterKey];
  }, [characterKey]);

  return (
    <form className="mx-auto max-w-6xl" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <DropdownMenu selected={characterKey} setSelected={setCharacterKey} list={characterKeys}/>
      </div>

      <CharacterDisplay character={character.current}/>
    </form>
  );
}
