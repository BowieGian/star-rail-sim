import Entity from "../Entity";

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Enemy                                                                /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Simulates an enemy in Honkai: Star Rail
/   Stores the enemy's stats/buffs
/   Calculates the damage the enemy's abilities will do
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Enemy extends Entity {
  private _toughnessMax: number = NaN;
  // TODO: Add Attack class and add big attacks

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  // constructor(name: string, level: number) {
    
  // }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public get toughnessMax(): number {
    return this._toughnessMax;
  }

  public set toughnessMax(value: number) {
    if (value < 1) throw new RangeError("Max Toughness must be greater than 0");

    this._toughnessMax = value;
  }
}
