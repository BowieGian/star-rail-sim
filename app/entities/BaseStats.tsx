import Stat, { IStat } from "./Linear";

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

  public calculate(level: number): IBaseStats {
    let output: IBaseStats = {
      hp: this.hp.calculate(level),
      atk: this.atk.calculate(level),
      def: this.def.calculate(level),
      spd: this.spd
    }
    return output;
  }
}
