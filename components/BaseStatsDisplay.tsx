import { AllBaseStats, allBaseStatNames, allBaseStats } from "@/src/base-stats";
import DamageOutput from "./DamageOutput";

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
