import * as fs from "fs";
import Entity from "../Entity";
import { ILinear } from "../Linear";
import BaseStats, { IBaseStatData } from "../BaseStats";

export interface ICharacterData {
  baseStats: IBaseStatData;
  basic: ILinear;
  skill: ILinear;
  ult: ILinear[];
  talent: ILinear[];
}

export default class Character extends Entity {
  private _ascension: number = 0;
  private _critRate: number = .05;
  private _critDamage: number = .5;
  private _breakEffect: number = 0;
  private _healingBoost: number = 0;
  private _maxEnergy: number = NaN; // TODO: Consider adding to constructor
  private _energyRegen: number = 1;
  private _effectHit: number = 0;
  private _effectRes: number = 0;
  private _elementalDmg: number = 0; // TODO: Consider single vs mult element
  private _elementalRes: number = 0;

  constructor(name: string, level: number) {
    let baseStats: BaseStats;

    try {
      const jsonString: string = fs.readFileSync("./app/entities/characters/" + name + ".json", "utf-8");
      const characterData: ICharacterData = JSON.parse(jsonString);
      // console.log(characterData);

      baseStats = new BaseStats(characterData.baseStats);
      // console.log(baseStats);
    } catch (err) { // Catch JSON.parse error
      console.error(err);
      return;
    }

    super(name, level, baseStats);
  }

  /*--------------------------------------------------------------*/
  /* Private Functions                                            */
  /*--------------------------------------------------------------*/

  // Returns the lower ascension phase for the input level
  private ascensionFromLevel(level: number): number {
    if (level > 0 && level <= 20)
      return 0;
    else if (level > 20 && level <= 30)
      return 1;
    else if (level > 30 && level <= 40)
      return 2;
    else if (level > 40 && level <= 50)
      return 3;
    else if (level > 50 && level <= 60)
      return 4;
    else if (level > 60 && level <= 70)
      return 5;
    else if (level > 70 && level <= 80)
      return 6;
    else
      return NaN;
  }

  // Returns true if the level is part of 2 ascension phases
  // (Levels 20, 30, 40, 50, 60, 70)
  private isLevelBetweenAscensions(level: number) {
    if (level >= 20 && level <= 70 && (level % 10 == 0))
      return true;
    return false;
  }

  // Returns true if the level is in the ascension phase
  private isLevelInAscension(level: number, ascension: number): boolean {
    let defaultAscension = this.ascensionFromLevel(level);

    if (ascension == defaultAscension)
      return true;
    if (this.isLevelBetweenAscensions(level) && ascension == defaultAscension + 1)
      return true;
    return false;
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  // Updates the ascension phase, rounding down when 2 phases are valid
  public override set level(value: number) {
    if (value < 1 || value > 80) 
      throw new RangeError("Level must be between 1 and 80");

    this._level = value;
    this._ascension = this.ascensionFromLevel(value);

    ({hp: this._hpBase,
      atk: this._atkBase,
      def: this._defBase,
      spd: this._spdBase} = this.baseStats.calculate(value)); // TODO: value + 8 * ascension?
  }

  public get ascension(): number {
    return this._ascension;
  }

  public set ascension(value: number) {
    if (value < 0 || value > 6) 
      throw new RangeError("Ascension must be in range 0 - 6");

    if (this.isLevelInAscension(this._level, value))
      this._ascension = value;
  }

  public get critRate(): number {
    return this._critRate;
  }

  public set critRate(value: number) {
    if (value < 0) throw new RangeError("Crit Rate cannot be negative");

    this._critRate = value;
  }

  public get critDamage(): number {
    return this._critDamage;
  }

  public set critDamage(value: number) {
    if (value < 0) throw new RangeError("Crit Dmg cannot be negative");

    this._critDamage = value;
  }

  public get breakEffect(): number {
    return this._breakEffect;
  }

  public set breakEffect(value: number) {
    if (value < 0) throw new RangeError("Break Effect cannot be negative");

    this._breakEffect = value;
  }

  public get healingBoost(): number {
    return this._healingBoost;
  }

  public set healingBoost(value: number) {
    if (value < 0) throw new RangeError("Healing Boost cannot be negative");

    this._healingBoost = value;
  }

  public get maxEnergy(): number {
    return this._maxEnergy;
  }

  public set maxEnergy(value: number) {
    if (value < 0) throw new RangeError("Max Energy cannot be negative");

    this._maxEnergy = value;
  }

  public get energyRegen(): number {
    return this._energyRegen;
  }

  public set energyRegen(value: number) {
    if (value < 0) throw new RangeError("Energy Regen cannot be negative");

    this._energyRegen = value;
  }

  public get effectHit(): number {
    return this._effectHit;
  }

  public set effectHit(value: number) {
    if (value < 0) throw new RangeError("Effect Hit cannot be negative");

    this._effectHit = value;
  }

  public get effectRes(): number {
    return this._effectRes;
  }

  public set effectRes(value: number) {
    if (value < 0) throw new RangeError("Effect Res cannot be negative");
    this._effectRes = value;
  }

  public get elementalDmg(): number {
    return this._elementalDmg;
  }

  public set elementalDmg(value: number) {
    if (value < 0) throw new RangeError("Elemental Dmg cannot be negative");

    this._elementalDmg = value;
  }

  public get elementalRes(): number {
    return this._elementalRes;
  }

  public set elementalRes(value: number) {
    if (value < 0) throw new RangeError("Elemental Res cannot be negative");

    this._elementalRes = value;
  }
}