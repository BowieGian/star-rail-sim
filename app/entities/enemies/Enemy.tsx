import Entity from "../Entity";

export default class Enemy extends Entity {
  private _toughnessMax: number = NaN;
  // TODO: Add Attack class and add big attacks

  public get toughnessMax(): number {
    return this._toughnessMax;
  }

  public set toughnessMax(value: number) {
    if (value < 1) throw new RangeError("Max Toughness must be greater than 0");

    this._toughnessMax = value;
  }
}
