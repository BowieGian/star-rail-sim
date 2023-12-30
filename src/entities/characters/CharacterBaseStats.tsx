import { AllBaseStats, ScalingBaseStats, Speed, StatTypes, scalingBaseStats } from "../BaseStats";
import Stat from "../Stat";

interface ISpeedStat {
  value: number;
}

export type ICharacterBaseStatData = Record<AllBaseStats, number>;

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class CharacterBaseStats                                                   /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores & calculates the base values of a character's base stats
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class CharacterBaseStats {
  private stats: Record<ScalingBaseStats, Stat> & Record<Speed, ISpeedStat>;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(input: ICharacterBaseStatData, type: StatTypes) {
    if (input.spd <= 0) throw new RangeError("Spd must be positive");

    this.stats = {
      hp: new Stat(input.hp, type),
      atk: new Stat(input.atk, type),
      def: new Stat(input.def, type),
      spd: {value: input.spd}
    };
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
    return this.stats[stat].value;
  }
}
