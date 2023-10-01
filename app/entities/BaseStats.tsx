import Stat, { IStat } from "./Stat";

export interface IBaseStatData {
  hp: IStat;
  atk: IStat;
  def: IStat;
  spd: number;
}

export interface IBaseStats {
  hp: number;
  atk: number;
  def: number;
  spd: number;
}

export default class BaseStats {
  private hp: Stat;
  private atk: Stat;
  private def: Stat;
  private spd: number = NaN;

  constructor(input: IBaseStatData) {
    this.hp = new Stat(input.hp);
    this.atk = new Stat(input.atk);
    this.def = new Stat(input.def);
    this.spd = input.spd;
  }

  public calculate(level: number, ascension?: number): IBaseStats {
    let output: IBaseStats = {
      hp: this.hp.calculate(level, ascension),
      atk: this.atk.calculate(level, ascension),
      def: this.def.calculate(level, ascension),
      spd: this.spd
    }
    return output;
  }
}
