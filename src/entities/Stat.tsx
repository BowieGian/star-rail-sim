import { StatTypes } from "./BaseStats";

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
  private type: StatTypes;
  private base: number;
  private add: number;
  private _value: number = NaN;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(input: IStat, type: StatTypes) {
    if (input.base < 0) throw new RangeError("Base cannot be negative");
    if (input.add < 0) throw new RangeError("Add cannot be negative");

    this.type = type;
    this.base = input.base;
    this.add = input.add;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public calculate(level: number, ascension: number): void {
    let multiplier = level - 1;

    if (this.type === "Character")
      multiplier += 8 * ascension;
    else if (this.type === "Light Cone") {
      if (ascension >= 1)
        multiplier += 8;

      if (ascension >= 2) {
        ascension--;
        multiplier += 32/3 * ascension;
      }
    } else {
      const _exhaustiveCheck: never = this.type;
      return _exhaustiveCheck;
    }

    const output = this.base + this.add * (multiplier);
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
