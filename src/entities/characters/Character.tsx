import getCharacterData, { CharacterKey } from "./data";
import Entity from "../Entity";
import BaseStats, { ICharacterBaseStatData } from "../../base-stats/BaseStats";
import CharacterAbilities, { IAbilityData } from "./CharacterAbilities";
import { CharacterAbilityTypes } from "../../ability/Ability";
import Ascension from "./Ascension";
import { allBaseStats } from "../../base-stats";

export interface ICharacterData {
  baseStats: ICharacterBaseStatData;
  abilities: IAbilityData;
}

export interface IStatDisplay {
  key: string;
  name: string;
  value: number;
}

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Character                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Simulates a character in Honkai: Star Rail
/   Stores the character's stats/buffs and equipment
/   Calculates the damage the character's abilities will do
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Character extends Entity {
  private asc: Ascension;

  private baseStatData: BaseStats;

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

  private abilities: CharacterAbilities;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(id: string, characterKey: CharacterKey) {
    const characterData: ICharacterData = getCharacterData(characterKey);

    super(id);

    this.baseStatData = new BaseStats(characterData.baseStats, "Character");

    const startingLevel = 1;
    this.asc = new Ascension(startingLevel);
    this.level = startingLevel;

    this.abilities = new CharacterAbilities(characterData.abilities);
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /**
   * To be called after updating base stats and equipping weapons/relics.
   * Updates current stats with new base stats and equipment.
   */
  private updateStats(): void {
    for (const stat of allBaseStats) {
      this._baseStats[stat] = this.baseStatData.getStat(stat);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  // Must override getter along with setter
  // Get function is the same
  public override get level(): number {
    return this._level;
  }

  // Updates the ascension phase, rounding down when 2 phases are valid
  public override set level(value: number) {
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

  public getAbilityLevel(ability: CharacterAbilityTypes): number {
    return this.abilities.getLevel(ability);
  }

  public setAbilityLevel(ability: CharacterAbilityTypes, level: number): void {
    this.abilities.setLevel(ability, level);
  }

  public getAbilityDesc(ability: CharacterAbilityTypes): ReadonlyArray<string> {
    return this.abilities.getDescriptions(ability);
  }

  public getAbilityAttr(ability: CharacterAbilityTypes): ReadonlyArray<number> {
    return this.abilities.getAttributes(ability);
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
