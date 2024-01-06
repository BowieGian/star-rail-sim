import { AllBaseStats, ScalingBaseStats, Speed, StatTypes, scalingBaseStats } from ".";
import Stat from "./Stat";

interface ISpeedStat {
  value: number;
}

export type ICharacterBaseStatData = Record<AllBaseStats, number>;
export type ILightConeBaseStatData = Record<ScalingBaseStats, number>;

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class CharacterBaseStats                                                   /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores & calculates the base values of a character's base stats
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class BaseStats {
  private stats: Record<ScalingBaseStats, Stat> & Record<Speed, ISpeedStat | undefined>;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(data: ICharacterBaseStatData | ILightConeBaseStatData, type: StatTypes) {
    if ("spd" in data && type === "character") {
      if (data.spd <= 0) throw new RangeError("Spd must be positive");

      this.stats = {
        hp: new Stat(data.hp, type),
        atk: new Stat(data.atk, type),
        def: new Stat(data.def, type),
        spd: {value: data.spd}
      };
    } else if (!("spd" in data) && type === "light cone") {
      this.stats = {
        hp: new Stat(data.hp, type),
        atk: new Stat(data.atk, type),
        def: new Stat(data.def, type),
        spd: undefined
      };
    } else {
      throw new Error("Base stat data and type mismatch");
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public calculate(level: number, ascension: number): void {
    for (const stat of scalingBaseStats) {
      this.stats[stat].calculate(level, ascension);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getStat(stat: AllBaseStats): number {
    if (!this.stats.spd)
      throw new Error("Light cones do not have spd");

    return this.stats[stat]!.value;
  }
}
