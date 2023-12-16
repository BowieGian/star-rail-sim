import getCharacterData, { CharacterKey } from ".";
import Entity from "../Entity";
import CharacterBaseStats, { ICharacterBaseStatData, AllBaseStats, allBaseStats } from "./CharacterBaseStats";
import CharacterAbilities, { IAbilityData } from "./CharacterAbilities";
import { AbilityTypes } from "./Ability";
import Ascension from "./Ascension";

export interface ICharacterData {
  baseStats: ICharacterBaseStatData;
  abilities: IAbilityData;
}

export interface IStatDisplay {
  key: string;
  name: string;
  value: number;
}

const statNames: Record<AllBaseStats, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD"
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
  private asc: Ascension = new Ascension(0);

  private characterBaseStats: CharacterBaseStats;

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

    this.characterBaseStats = new CharacterBaseStats(characterData.baseStats);
    this.level = 1;

    this.abilities = new CharacterAbilities(characterData.abilities);
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  // To be called after updating base stats and equipping weapons/relics
  // Updates current stats with new base stats and equipment
  private updateStats(): void {
    this.baseStats.hp = this.characterBaseStats.getStat("hp");
    this.baseStats.atk = this.characterBaseStats.getStat("atk");
    this.baseStats.def = this.characterBaseStats.getStat("def");
    this.baseStats.spd = this.characterBaseStats.getStat("spd");
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getStats(): ReadonlyArray<IStatDisplay> {
    let output = new Array<IStatDisplay>;

    for (let stat of allBaseStats) {
      let statDisplay: IStatDisplay = {
        key: stat,
        name: statNames[stat],
        value: this.getBaseStat(stat)
      };

      output.push(statDisplay);
    }

    return output;
  }

  /** @example
  /* Returns true if the level is part of 2 ascension phases
   * (Levels 20, 30, 40, 50, 60, 70)
   */
  public isAscendable(level: number): boolean {
    return this.asc.isAscendable(level);
  }

  public isAscended(): boolean {
    return this.asc.isAscended(this.level);
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
    this.asc.updateAscension(value);

    this.characterBaseStats.calculate(this._level, this.asc.getAscension());
    this.updateStats();
  }

  public get maxLevel(): number {
    return this.asc.maxLevel;
  }

  public get ascension(): number {
    return this.asc.getAscension();
  }

  public set ascension(value: number) {
    if (!this.asc.setAscension(value, this._level)) {
      return;
    }

    this.characterBaseStats.calculate(this._level, this.asc.getAscension());
    this.updateStats();
  }

  public getAbilityLevel(ability: AbilityTypes): number {
    return this.abilities.getLevel(ability);
  }

  public setAbilityLevel(ability: AbilityTypes, level: number): void {
    this.abilities.setLevel(ability, level);
  }

  public getAbilityDesc(ability: AbilityTypes): ReadonlyArray<string> {
    return this.abilities.getDescriptions(ability);
  }

  public getAbilityAttr(ability: AbilityTypes): ReadonlyArray<number> {
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
