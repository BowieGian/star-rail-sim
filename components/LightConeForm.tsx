"use client";

import { MutableRefObject, useEffect, useRef, useState } from "react";
import DropdownMenu from "./DropdownMenu";
import LightCone from "@/src/light-cones/LightCone";
import { LightConeKey, lightConeKeys, lightConeList } from "@/src/light-cones/data";
import LightConeDisplay from "./LightConeDisplay";

export default function LightConeForm() {
  const [lightConeKey, setLightConeKey] = useState<LightConeKey>("InTheNight");
  const lightCone: MutableRefObject<LightCone> = useRef<LightCone>() as MutableRefObject<LightCone>;
  lightCone.current = lightConeList[lightConeKey];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    lightCone.current = lightConeList[lightConeKey];
  }, [lightConeKey]);

  return (
    <form className="mx-auto max-w-6xl" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <DropdownMenu selected={lightConeKey} setSelected={setLightConeKey} list={lightConeKeys}/>
      </div>

      <LightConeDisplay lightCone={lightCone.current}/>
    </form>
  );
}
