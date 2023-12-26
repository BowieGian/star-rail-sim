import DamageOutput from "./DamageOutput";
import { AllBaseStats, allBaseStatNames, allBaseStats } from "@/src/entities/characters/CharacterBaseStats";

interface Props {
  baseStats: Readonly<Record<AllBaseStats, number>>;
}

export default function BaseStatsDisplay(props: Props) {
  return (
    allBaseStats.map(function(stat) {
      return <DamageOutput key={stat} num={props.baseStats[stat].toString()} label={allBaseStatNames[stat]}/>;
    })
  );
}
