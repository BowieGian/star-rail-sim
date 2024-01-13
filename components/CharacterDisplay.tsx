import { useState } from "react";
import BaseStatsDisplay from "./BaseStatsDisplay";
import CharacterAbilities from "./CharacterAbilities";
import LvlAscInput from "./LvlAscInput";
import { AllBaseStats } from "@/src/base-stats/BaseStats";
import Character from "@/src/entities/characters/Character";

interface Props {
  character: Character;
}

export default function CharacterDisplay(props: Props) {
  const {character} = props;

  const [baseStats, setBaseStats] = useState<Readonly<Record<AllBaseStats, number>>>(character.baseStats);

  return (
    <div className="mx-auto grid gap-y-5 lg:grid-cols-2 lg:gap-x-8">
      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <LvlAscInput
          charOrLightCone={character}
          setBaseStats={setBaseStats}
        />
      </div>

      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <BaseStatsDisplay baseStats={baseStats}/>
      </div>

      <CharacterAbilities character={character}/>
    </div>
  );
}
