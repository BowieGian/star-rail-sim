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

  public calculate(level: number): number {
    return this._base + this._add * (level - 1);
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public set base(value: number) {
    if (value < 0) throw new RangeError("Base cannot be negative");
    this._base = value;
  }

  public set add(value: number) {
    if (value < 0) throw new RangeError("Add cannot be negative");
    this._add = value;
  }
}
