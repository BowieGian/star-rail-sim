import { AllBaseStats } from "./BaseStats";

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Entity                                                               /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Parent class of Character and Enemy
/   Stores the basic common attributes
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Entity {
  protected _id: string = "";
  protected _level: number = NaN;

  protected _baseStats: Record<AllBaseStats, number> = {
    hp: NaN,
    atk: NaN,
    def: NaN,
    spd: NaN
  };

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(id: string) {
    if (!id) throw new Error("The ID is invalid");
    this._id = id;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getAV(): number {
    if (!this._baseStats.spd) throw new Error("SPD has not been defined yet or is 0");
    return 10000 / this._baseStats.spd;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public get id(): string {
    return this._id;
  }

  public get level(): number {
    if (!this._level) throw new Error("Level has not been defined yet or is 0");
    return this._level;
  }

  public set level(value: number) {
    if (value < 1 || value > 90)
      throw new RangeError("Level must be between 1 and 90");

    this._level = value;
  }

  public get baseStats(): Readonly<Record<AllBaseStats, number>> {
    return this._baseStats;
  }

  public getBaseStat(stat: AllBaseStats): number {
    if (!this._baseStats[stat]) throw new Error("Base stat has not been defined yet or is 0");
    return this._baseStats[stat];
  }
}
