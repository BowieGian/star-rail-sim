export interface ILinear {
  base: number;
  add: number;
}

export default class Linear {
  private _base: number = NaN;
  private _add: number = NaN;

  constructor(input: ILinear) {
    this.base = input.base;
    this.add = input.add;
  }

  public calculate(level: number): number {
    return this.base * (level - 1);
  }

  // Getters & Setters
  public get base(): number {
    return this._base;
  }

  public set base(value: number) {
    if (value < 0) throw new RangeError("Base cannot be negative");
    this._base = value;
  }

  public get add(): number {
    return this._add;
  }

  public set add(value: number) {
    if (value < 0) throw new RangeError("Add cannot be negative");
    this._add = value;
  }
}
