import Stat, { IStat } from "../Stat";

export interface ICharacterBaseStatData {
  hp: IStat;
  atk: IStat;
  def: IStat;
  spd: number;
}

export default class CharacterBaseStats {
  private data: {
    hp: Stat,
    atk: Stat,
    def: Stat
  }

  private base = {
    hp: NaN,
    atk: NaN,
    def: NaN,
    spd: NaN
  }

  constructor(input: ICharacterBaseStatData) {
    if (input.spd < 0) throw new RangeError("Spd cannot be negative");

    this.data = {
      hp: new Stat(input.hp),
      atk: new Stat(input.atk),
      def: new Stat(input.def)
    }
    this.base.spd = input.spd;
  }

  public calculate(level: number, ascension?: number): void {
    this.base.hp = this.data.hp.calculate(level, ascension);
    this.base.atk = this.data.atk.calculate(level, ascension);
    this.base.def = this.data.def.calculate(level, ascension);
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public get hp(): number {
    return this.base.hp;
  }

  public get atk(): number {
    return this.base.atk;
  }

  public get def(): number {
    return this.base.def;
  }

  public get spd(): number {
    return this.base.spd;
  }
}
