"use client";

import { useEffect, useState } from "react";
import { IStatDisplay } from "../app/entities/characters/Character";
import DamageOutput from "./DamageOutput";
import LvlAscInput from "./LvlAscInput";
import CharacterSelect from "./CharacterSelect";
import AbilityIO from "./AbilityIO";
import { CharacterKey, characterList, Characters } from "../app/entities/characters";

// TODO: Split base stats and abilities to new files
export default function CharacterForm() {
  // Using lazy initial state to only run constructor once
  const [character, setCharacter] = useState<Characters>(() => characterList["Yanqing"]);
  const [characterKey, setCharacterKey] = useState<CharacterKey>("Yanqing");

  const [charLvl, setCharLvl] = useState<string>("1");
  const [ascendable, setAscendable] = useState<boolean>(true);

  const [maxLvl, setMaxLvl] = useState<number>(character.maxLevel);
  const [ascension, setAscension] = useState<number>(0);
  const [ascended, setAscended] = useState<boolean>(false);

  const [stats, setStats] = useState<readonly IStatDisplay[]>(character.getBaseStatsDisplay());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAscToggle = () => {
    const value = !ascended;
    setAscended(value);
  };

  useEffect(() => {
    setCharacter(characterList[characterKey]);
  }, [characterKey]);

  useEffect(() => {
    const levelString = character.level.toString();

    if (charLvl === levelString && ascension === character.ascension) {
      // Don't need to trigger the lvl/asc useEffect
      setStats(character.getBaseStatsDisplay());
    } else if (charLvl === levelString) {
      // Does not trigger charLvl useEffect
      setMaxLvl(character.maxLevel);
      setAscension(character.ascension);
      setAscended(character.ascended);
    } else {
      setCharLvl(levelString);
    }
  }, [character]);

  useEffect(() => {
    character.level = parseInt(charLvl);
    setAscendable(character.ascendable);

    setMaxLvl(character.maxLevel);
    setAscension(character.ascension);
    setAscended(character.ascended);

    setStats(character.getBaseStatsDisplay());
  }, [charLvl]);

  useEffect(() => {
    character.ascended = ascended;

    setAscension(character.ascension);
    setMaxLvl(character.maxLevel);

    setStats(character.getBaseStatsDisplay());
  }, [ascended]);

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
          lvl={charLvl}
          setLvl={setCharLvl}
          handleButton={handleAscToggle}
          disableButton={!ascendable}
          maxLvlForAsc={maxLvl}
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
