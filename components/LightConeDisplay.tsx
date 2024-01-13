import { useState } from "react";
import AbilityIO from "./AbilityIO";
import BaseStatsDisplay from "./BaseStatsDisplay";
import LvlAscInput from "./LvlAscInput";
import { AllBaseStats } from "@/src/base-stats/BaseStats";
import LightCone from "@/src/light-cones/LightCone";

interface Props {
  lightCone: LightCone;
}

export default function LightConeDisplay(props: Props) {
  const {lightCone} = props;

  const [baseStats, setBaseStats] = useState<Readonly<Record<AllBaseStats, number>>>(lightCone.baseStats);

  const getSuperimposition = () => {return lightCone.superimposition;};

  return (
    <div className="mx-auto grid gap-y-5 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <LvlAscInput
          charOrLightCone={lightCone}
          setBaseStats={setBaseStats}
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
        setLevel={(value: number) => {lightCone.superimposition = value;}}
        getAttributes={() => {return lightCone.abilityAttributes;}}
        description={lightCone.abilityDescriptions}
      />
    </div>
  );
}
