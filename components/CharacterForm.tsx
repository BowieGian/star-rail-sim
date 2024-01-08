"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import LvlAscInput from "./LvlAscInput";
import CharacterSelect from "./CharacterSelect";
import AbilityIO from "./AbilityIO";
import { CharacterKey, characterList, Characters } from "../src/entities/characters/data";
import BaseStatsDisplay from "./BaseStatsDisplay";
import { AllBaseStats } from "@/src/base-stats";

export default function CharacterForm() {
  const [characterKey, setCharacterKey] = useState<CharacterKey>("Yanqing");
  const character: MutableRefObject<Characters> = useRef<Characters>() as MutableRefObject<Characters>;
  character.current = characterList[characterKey];

  const [levelInput, setLevelInput] = useState<string>("1");
  const [ascendable, setAscendable] = useState<boolean>(character.current.ascendable);
  const [maxLevel, setMaxLevel] = useState<number>(character.current.maxLevel);
  const [baseStats, setBaseStats] = useState<Readonly<Record<AllBaseStats, number>>>(character.current.baseStats);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAscToggle = () => {
    character.current.ascended = !character.current.ascended;
    setMaxLevel(character.current.maxLevel);
    setBaseStats({...character.current.baseStats});
  };

  const updateCharLvl = (level: string) => {
    setLevelInput(level);

    if (!level)
      return;

    character.current.level = parseInt(level);
    setAscendable(character.current.ascendable);
    setMaxLevel(character.current.maxLevel);
    setBaseStats({...character.current.baseStats});
  };

  useEffect(() => {
    character.current = characterList[characterKey];
    setLevelInput(character.current.level.toString());
    setAscendable(character.current.ascendable);
    setMaxLevel(character.current.maxLevel);
    setBaseStats({...character.current.baseStats});
  }, [characterKey]);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <CharacterSelect characterKey={characterKey} setCharacterKey={setCharacterKey}/>
      </div>

      <div></div>

      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <LvlAscInput
          name="char-lvl"
          min={1}
          max={80}
          level={levelInput}
          updateLevel={updateCharLvl}
          handleButton={handleAscToggle}
          disableButton={!ascendable}
          maxLvlForAsc={maxLevel}
        />
      </div>

      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <BaseStatsDisplay baseStats={baseStats}/>
      </div>

      <AbilityIO character={character.current}/>
    </form>
  );
}
