"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import LvlAscInput from "./LvlAscInput";
import CharacterSelect from "./CharacterSelect";
import { CharacterKey, characterList, Characters } from "../src/entities/characters/data";
import BaseStatsDisplay from "./BaseStatsDisplay";
import { AllBaseStats } from "@/src/entities/characters/CharacterBaseStats";

import AbilityDisplay from "./AbilityDisplay";


export default function LightCone() {
  const [lightConeKey, setLightConeKey] = useState<CharacterKey>("Yanqing");
  const lightCone: MutableRefObject<Characters> = useRef<Characters>() as MutableRefObject<Characters>;
  lightCone.current = characterList[lightConeKey];

  const [levelInput, setLevelInput] = useState<string>("1");
  const [ascendable, setAscendable] = useState<boolean>(lightCone.current.ascendable);
  const [maxLevel, setMaxLevel] = useState<number>(lightCone.current.maxLevel);
  const [baseStats, setBaseStats] = useState<Readonly<Record<AllBaseStats, number>>>(lightCone.current.baseStats);

  // dont know what to call it so used basic
  // const [basicAttr, setBasicAttr] = useState<readonly number[]>(lightCone.getAbilityAttr("basic"));
  // const basicDesc = lightCone.getAbilityDesc("basic");

  // temp
  const [basicAttr, setBasicAttr] = useState<readonly number[]>([36, 0.36]);
  const basicDesc = ["Increases the wearer's CRIT DMG by ",
  ". When the wearer uses Ultimate, increases the wearer's Ultimate DMG based on their max energy. Each point of Energy increases the Ultimate DMG by ",
  ", up to 180 points of Energy."]

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAscToggle = () => {
    lightCone.current.ascended = !lightCone.current.ascended;
    setMaxLevel(lightCone.current.maxLevel);
    setBaseStats({...lightCone.current.baseStats});

    // not sure if this is how you do it, doesnt work at first ascension because it starts at 0, prob have to do with basic
    lightCone.current.setAbilityLevel("basic", parseInt(lightCone.current.ascension));
    setBasicAttr([...lightCone.current.getAbilityAttr("basic")]);
  };

  const updateCharLvl = (level: string) => {
    setLevelInput(level);

    if (!level)
      return;

    lightCone.current.level = parseInt(level);
    setAscendable(lightCone.current.ascendable);
    setMaxLevel(lightCone.current.maxLevel);
    setBaseStats({...lightCone.current.baseStats});

    // same as above, not sure if this is how you do it
    lightCone.current.setAbilityLevel("basic", parseInt(lightCone.current.ascension));
    setBasicAttr([...lightCone.current.getAbilityAttr("basic")]);
    // console.log(lightCone.current.ascension)
  };

  useEffect(() => {
    lightCone.current = characterList[lightConeKey];
    setLevelInput(lightCone.current.level.toString());
    setAscendable(lightCone.current.ascendable);
    setMaxLevel(lightCone.current.maxLevel);
    setBaseStats({...lightCone.current.baseStats});
  }, [lightConeKey]);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <CharacterSelect characterKey={lightConeKey} setCharacterKey={setLightConeKey}/>
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

      <AbilityDisplay attributes={basicAttr} description={basicDesc} label="Basic"/>
    </form>
  );
}
