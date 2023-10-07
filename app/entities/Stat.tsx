export interface IStat {
  base: number;
  add: number;
}

export default class Stat {
  private base: number = 0;
  private add: number = 0;

  constructor(input: IStat) {
    if (input.base < 0) throw new RangeError("Base cannot be negative");
    if (input.add < 0) throw new RangeError("Add cannot be negative");

    this.base = input.base;
    this.add = input.add;
  }

  public calculate(level: number, ascension: number = 0): number {
    let output = this.base + this.add * (level - 1 + 8 * ascension)
    return Math.round((output + Number.EPSILON) * 1e6) / 1e6;
  }
}
