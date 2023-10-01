export interface IStat {
  base: number;
  add: number;
}

export default class Stat {
  private _base: number = 0;
  private _add: number = 0;

  constructor(input: IStat) {
    this.base = input.base;
    this.add = input.add;
  }

  public calculate(level: number, ascension: number = 0): number {
    let output = this._base + this._add * (level - 1 + 8 * ascension)
    return Math.round((output + Number.EPSILON) * 1e6) / 1e6;
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  private set base(value: number) {
    if (value < 0) throw new RangeError("Base cannot be negative");
    this._base = value;
  }

  private set add(value: number) {
    if (value < 0) throw new RangeError("Add cannot be negative");
    this._add = value;
  }
}
