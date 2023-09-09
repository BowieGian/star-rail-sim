import Linear, { ILinear } from "./Linear";

export interface IBaseStatData {
  hp: ILinear;
  atk: ILinear;
  def: ILinear;
  spd: number;
}

export interface IBaseStats {
  hp: number;
  atk: number;
  def: number;
  spd: number;
}

export default class BaseStats {
  private hp: Linear;
  private atk: Linear;
  private def: Linear;
  private spd: number = NaN;

  constructor(input: IBaseStatData) {
    this.hp = new Linear(input.hp);
    this.atk = new Linear(input.atk);
    this.def = new Linear(input.def);
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
