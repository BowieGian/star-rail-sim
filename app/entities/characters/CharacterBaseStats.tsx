import Stat, { IStat } from "../Stat";

const scalingBaseStats = ["hp", "atk", "def"] as const;
type ScalingBaseStats = typeof scalingBaseStats[number];

type Speed = "spd";
interface ISpeedStat {
  value: number;
}

export const allBaseStats = ["hp", "atk", "def", "spd"] as const;
export type AllBaseStats = typeof allBaseStats[number];

export type ICharacterBaseStatData = Record<ScalingBaseStats, IStat> & Record<Speed, ISpeedStat>;

export default class CharacterBaseStats {
  private stats: Record<ScalingBaseStats, Stat> & Record<Speed, ISpeedStat>;

  /*--------------------------------------------------------------*/
  /* Constructor                                                  */
  /*--------------------------------------------------------------*/

  constructor(input: ICharacterBaseStatData) {
    if (input.spd.value <= 0) throw new RangeError("Spd must be positive");

    this.stats = {
      hp: new Stat(input.hp),
      atk: new Stat(input.atk),
      def: new Stat(input.def),
      spd: input.spd
    };
  }

  /*--------------------------------------------------------------*/
  /* Public Functions                                             */
  /*--------------------------------------------------------------*/

  public calculate(level: number, ascension: number): void {
    for (let stat of scalingBaseStats) {
      this.stats[stat].calculate(level, ascension);
    }
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public getStat(stat: AllBaseStats): number {
    return this.stats[stat].value;
  }
}
