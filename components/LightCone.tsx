"use client";

import LvlAscInput from "./LvlAscInput";

import { useState } from "react";
import DamageOutput from "./DamageOutput";
import { Characters } from "../src/entities/characters/data";
import { IStatDisplay } from "../src/entities/characters/Character";

interface Props {
  character: Characters;
}

export default function LightCone(props: Props) {
  const character = props.character;

  const [stats, setStats] = useState<readonly IStatDisplay[]>(character.getBaseStatsDisplay());

  const handleAscToggle = () => {
    character.ascended = !character.ascended;
    setStats(character.getBaseStatsDisplay());
  };

  const updateCharLvl = (level: number) => {
    // Update Light Cone Level
    console.log(level);

    // character.level = level;
    // setStats(character.getBaseStatsDisplay());
  };

  return (
    <>
      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <LvlAscInput
          name="char-lvl"
          min={1}
          max={80}
          updateCharLvl={updateCharLvl}
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
    </>
  );
}
