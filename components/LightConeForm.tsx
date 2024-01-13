"use client";

import { MutableRefObject, useEffect, useMemo, useRef, useState } from "react";
import AbilityIO from "./AbilityIO";
import LvlAscInput from "./LvlAscInput";
import DropdownMenu from "./DropdownMenu";
import BaseStatsDisplay from "./BaseStatsDisplay";
import { ScalingBaseStats } from "@/src/base-stats/BaseStats";
import LightCone from "@/src/light-cones/LightCone";
import { LightConeKey, lightConeKeys, lightConeList } from "@/src/light-cones/data";

export default function LightConeForm() {
  const [lightConeKey, setLightConeKey] = useState<LightConeKey>("InTheNight");
  const lightCone: MutableRefObject<LightCone> = useRef<LightCone>() as MutableRefObject<LightCone>;
  lightCone.current = lightConeList[lightConeKey];

  const [levelInput, setLevelInput] = useState<string>("1");
  const [ascendable, setAscendable] = useState<boolean>(lightCone.current.ascendable);
  const [maxLevel, setMaxLevel] = useState<number>(lightCone.current.maxLevel);
  const [baseStats, setBaseStats] = useState<Readonly<Record<ScalingBaseStats, number>>>(lightCone.current.baseStats);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getSuperimposition = useMemo(() => () => {return lightCone.current.superimposition;}, [lightConeKey]);

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
  }, [lightConeKey]);

  return (
    <form className="mx-auto max-w-6xl" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <DropdownMenu selected={lightConeKey} setSelected={setLightConeKey} list={lightConeKeys}/>
      </div>

      <div className="mx-auto grid gap-y-5 lg:grid-cols-2 lg:gap-x-8">
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

        <AbilityIO
          key="light cone"
          label="Superimposition"
          max={5}
          getLevel={getSuperimposition}
          setLevel={(value: number) => {lightCone.current.superimposition = value;}}
          getAttributes={() => {return lightCone.current.abilityAttributes;}}
          description={lightCone.current.abilityDescriptions}
        />
      </div>
    </form>
  );
}
