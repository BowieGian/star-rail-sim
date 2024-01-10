import LabelledNumber from "./LabelledNumber";
import { AllBaseStats, ScalingBaseStats, allBaseStatNames, allBaseStats } from "@/src/base-stats/BaseStats";

interface Props {
  baseStats: Readonly<Record<AllBaseStats, number> | Record<ScalingBaseStats, number>>;
}

export default function BaseStatsDisplay(props: Props) {
  const baseStats = props.baseStats as Readonly<Record<AllBaseStats, number>>;

  return (
    allBaseStats.map((stat) => {
      if (stat in baseStats)
        return <LabelledNumber key={stat} num={baseStats[stat].toString()} label={allBaseStatNames[stat]}/>;
    })
  );
}
