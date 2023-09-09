import * as fs from "fs";
import Entity from "../Entity";
import Linear, { ILinear } from "../Linear";
import BaseStats, { IBaseStatData } from "../BaseStats";

export interface ICharacterData {
  baseStats: IBaseStatData;
  basic: ILinear;
  skill: ILinear;
  ult: ILinear[];
  talent: ILinear[];
}

export default class Character extends Entity {
  private _critRate: number = 5;

  constructor(name: string, level: number) {
    let baseStats: BaseStats;

    try {
      const jsonString: string = fs.readFileSync("./app/entities/characters/" + name + ".json", "utf-8");
      const characterData: ICharacterData = JSON.parse(jsonString);
      console.log(characterData);

      baseStats = new BaseStats(characterData.baseStats);
      console.log(baseStats);
    } catch (err) {
      console.error(err);
      return;
    }
    
    super(name, level, baseStats);
  }

  public get critRate(): number {
    return this._critRate;
  }

  public set critRate(value: number) {
    if (value < 0) throw new RangeError("Crit Rate cannot be negative");
    
    this._critRate = value;
  }
}
