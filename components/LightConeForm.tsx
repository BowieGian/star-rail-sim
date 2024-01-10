"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import LvlAscInput from "./LvlAscInput";
import DropdownMenu from "./DropdownMenu";
import BaseStatsDisplay from "./BaseStatsDisplay";
import AbilityDisplay from "./AbilityDisplay";
import { LightConeKey, lightConeKeys, lightConeList } from "@/src/light-cones/data";
import LightCone from "@/src/light-cones/LightCone";
import NumberSlider from "./NumberSlider";
import { ScalingBaseStats } from "@/src/base-stats/BaseStats";

export default function LightConeForm() {
  const [lightConeKey, setLightConeKey] = useState<LightConeKey>("InTheNight");
  const lightCone: MutableRefObject<LightCone> = useRef<LightCone>() as MutableRefObject<LightCone>;
  lightCone.current = lightConeList[lightConeKey];

  const [levelInput, setLevelInput] = useState<string>("1");
  const [ascendable, setAscendable] = useState<boolean>(lightCone.current.ascendable);
  const [maxLevel, setMaxLevel] = useState<number>(lightCone.current.maxLevel);
  const [baseStats, setBaseStats] = useState<Readonly<Record<ScalingBaseStats, number>>>(lightCone.current.baseStats);

  const [superimposition, setSuperimposition] = useState<string>("1");
  const [abilityAttributes, setAbilityAttributes] = useState<readonly number[]>(lightCone.current.abilityAttributes);
  const abilityDescriptions = lightCone.current.abilityDescriptions;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleAscToggle = () => {
    lightCone.current.ascended = !lightCone.current.ascended;
    setMaxLevel(lightCone.current.maxLevel);
    setBaseStats({...lightCone.current.baseStats});
  };

  const updateCharLvl = (level: string) => {
    setLevelInput(level);

    if (!level)
      return;

    lightCone.current.level = parseInt(level);
    setAscendable(lightCone.current.ascendable);
    setMaxLevel(lightCone.current.maxLevel);
    setBaseStats({...lightCone.current.baseStats});
  };

  useEffect(() => {
    lightCone.current = lightConeList[lightConeKey];
    setLevelInput(lightCone.current.level.toString());
    setAscendable(lightCone.current.ascendable);
    setMaxLevel(lightCone.current.maxLevel);
    setBaseStats({...lightCone.current.baseStats});

    setSuperimposition(lightCone.current.superimposition.toString());
  }, [lightConeKey]);

  useEffect(() => {
    lightCone.current.superimposition = parseInt(superimposition);
    setAbilityAttributes([...lightCone.current.abilityAttributes]);
  }, [superimposition, lightCone]);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <DropdownMenu selected={lightConeKey} setSelected={setLightConeKey} list={lightConeKeys}/>
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

      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={superimposition} setStat={setSuperimposition} name="superimposition" label="Superimposition" min={1} max={5}/>
      </div>
      <AbilityDisplay attributes={abilityAttributes} description={abilityDescriptions} label="Basic"/>
    </form>
  );
}
