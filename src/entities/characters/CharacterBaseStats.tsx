import Stat, { IStat } from "../Stat";

const scalingBaseStats = ["hp", "atk", "def"] as const;
type ScalingBaseStats = typeof scalingBaseStats[number];

type Speed = "spd";
interface ISpeedStat {
  value: number;
}

export const allBaseStats = ["hp", "atk", "def", "spd"] as const;
export type AllBaseStats = typeof allBaseStats[number];

export const allBaseStatNames: Record<AllBaseStats, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD"
};

export type ICharacterBaseStatData = Record<ScalingBaseStats, IStat> & Record<Speed, ISpeedStat>;

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

  constructor(input: ICharacterBaseStatData) {
    if (input.spd.value <= 0) throw new RangeError("Spd must be positive");

    this.stats = {
      hp: new Stat(input.hp),
      atk: new Stat(input.atk),
      def: new Stat(input.def),
      spd: input.spd
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
