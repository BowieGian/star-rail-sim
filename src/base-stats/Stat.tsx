import { StatTypes } from ".";

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

  constructor(baseValue: number, type: StatTypes) {
    if (baseValue < 0) throw new RangeError("Base value cannot be negative");

    this.type = type;
    this.base = baseValue;

    if (type === "Character")
      this.add = baseValue / 20;
    else if (type === "Light Cone")
      this.add = baseValue / 20 * 3;
    else {
      const _exhaustiveCheck: never = type;
      this.add = NaN;
      return _exhaustiveCheck;
    }
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
