import Stat, { IStat } from "../Stat";

const scalingBaseStats = ["hp", "atk", "def"] as const;
type ScalingBaseStats = typeof scalingBaseStats[number];

type Speed = "spd";

export const allBaseStats = ["hp", "atk", "def", "spd"] as const;
export type AllBaseStats = typeof allBaseStats[number];

export type ICharacterBaseStatData = Record<ScalingBaseStats, IStat> & Record<Speed, number>;

export default class CharacterBaseStats {
  private data: Record<ScalingBaseStats, Stat>;

  private base: Record<AllBaseStats, number> = {
    hp: NaN,
    atk: NaN,
    def: NaN,
    spd: NaN
  };

  /*--------------------------------------------------------------*/
  /* Constructor                                                  */
  /*--------------------------------------------------------------*/

  constructor(input: ICharacterBaseStatData) {
    if (input.spd <= 0) throw new RangeError("Spd must be positive");

    this.data = {
      hp: new Stat(input.hp),
      atk: new Stat(input.atk),
      def: new Stat(input.def)
    };

    this.base.spd = input.spd;
  }

  /*--------------------------------------------------------------*/
  /* Public Functions                                             */
  /*--------------------------------------------------------------*/

  public calculate(level: number, ascension?: number): void {
    for (let stat of scalingBaseStats) {
      this.base[stat] = this.data[stat].calculate(level, ascension);
    }
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public getStat(stat: AllBaseStats): number {
    if (!this.base[stat]) throw new Error("Stats have not been calculated yet");
    return this.base[stat];
  }
}
