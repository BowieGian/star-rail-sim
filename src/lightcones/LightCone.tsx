import getLightConeData, { LightConeKey } from ".";
import { ScalingBaseStats, scalingBaseStats } from "../base-stats";
import Ability, { IAbility } from "../ability/Ability";
import Ascension from "../entities/characters/Ascension";
import BaseStats, { ILightConeBaseStatData } from "../base-stats/BaseStats";

export interface ILightConeData {
  baseStats: ILightConeBaseStatData;
  ability: IAbility;
}

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class LightCone                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Simulates a light cone in Honkai: Star Rail
/   Stores the light cone's stats/ability
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class LightCone {
  private _id: string = "";
  private _level: number = NaN;

  private asc: Ascension;

  private baseStatData: BaseStats;
  private _baseStats: Record<ScalingBaseStats, number> = {
    hp: NaN,
    atk: NaN,
    def: NaN
  };

  private ability: Ability;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(id: string, lightConeKey: LightConeKey) {
    if (!id) throw new Error("The ID is invalid");

    this._id = id;

    const lightConeData: ILightConeData = getLightConeData(lightConeKey);
    this.baseStatData = new BaseStats(lightConeData.baseStats, "Light Cone");

    const startingLevel = 1;
    this.asc = new Ascension(startingLevel);
    this.level = startingLevel;

    this.ability = new Ability("light cone", lightConeData.ability);
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /** To be called after updating level and ascension */
  private updateStats(): void {
    for (const stat of scalingBaseStats) {
      this._baseStats[stat] = this.baseStatData.getStat(stat);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public get level(): number {
    return this._level;
  }

  // Updates the ascension phase, rounding down when 2 phases are valid
  public set level(value: number) {
    if (value < 1 || value > 80)
      throw new RangeError("Level must be between 1 and 80");

    this._level = value;
    this.asc.level = value;

    this.baseStatData.calculate(this._level, this.asc.ascension);
    this.updateStats();
  }

  public get ascendable(): boolean {
    return this.asc.ascendable;
  }

  public get maxLevel(): number {
    return this.asc.maxLevel;
  }

  public get ascension(): number {
    return this.asc.ascension;
  }

  public get ascended(): boolean {
    return this.asc.ascended;
  }

  public set ascended(value: boolean) {
    this.asc.ascended = value;

    this.baseStatData.calculate(this._level, this.asc.ascension);
    this.updateStats();
  }

  public getBaseStat(stat: ScalingBaseStats): number {
    if (!this._baseStats[stat]) throw new Error("Base stat has not been defined yet or is 0");
    return this._baseStats[stat];
  }
}
