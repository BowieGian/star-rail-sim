export interface IStat {
  base: number;
  add: number;
}

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Stat                                                                 /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores & calculates a stat of a character
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Stat {
  private base: number;
  private add: number;
  private _value: number = NaN;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(input: IStat) {
    if (input.base < 0) throw new RangeError("Base cannot be negative");
    if (input.add < 0) throw new RangeError("Add cannot be negative");

    this.base = input.base;
    this.add = input.add;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public calculate(level: number, ascension: number): void {
    let output = this.base + this.add * (level - 1 + 8 * ascension)
    this._value = Math.round((output + Number.EPSILON) * 1e6) / 1e6;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public get value(): number {
    if (Number.isNaN(this._value)) throw new Error("Value has not been calculated");
    return this._value;
  }
}
