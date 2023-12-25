"use client";

import { useEffect, useState } from "react";
import { IStatDisplay } from "../src/entities/characters/Character";
import DamageOutput from "./DamageOutput";
import LvlAscInput from "./LvlAscInput";
import CharacterSelect from "./CharacterSelect";
import AbilityIO from "./AbilityIO";
import { CharacterKey, characterList, Characters } from "../src/entities/characters/data";

// TODO: Split base stats and abilities to new files
export default function CharacterForm() {
  // Using lazy initial state to only run constructor once
  const [character, setCharacter] = useState<Characters>(() => characterList["Yanqing"]);
  const [characterKey, setCharacterKey] = useState<CharacterKey>("Yanqing");

  const [levelInput, setLevelInput] = useState<string>("1");
  const [stats, setStats] = useState<readonly IStatDisplay[]>(character.baseStatsDisplay);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAscToggle = () => {
    character.ascended = !character.ascended;
    setStats(character.baseStatsDisplay);
  };

  const updateCharLvl = (level: string) => {
    setLevelInput(level);

    if (!level)
      return;

    character.level = parseInt(level);
    setStats(character.baseStatsDisplay);
  };

  useEffect(() => {
    setCharacter(characterList[characterKey]);
  }, [characterKey]);

  useEffect(() => {
    setLevelInput(character.level.toString());
    setStats(character.baseStatsDisplay);
  }, [character]);

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
          disableButton={!character.ascendable}
          maxLvlForAsc={character.maxLevel}
        />
      </div>

      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        {stats.map(function(object) {
          return <DamageOutput key={object.key} num={object.value.toString()} label={object.name}/>;
        })}
      </div>

      <AbilityIO character={character}/>
    </form>
  );
}
