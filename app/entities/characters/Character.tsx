import Entity from "../Entity";
import BaseStats, { IBaseStatData } from "../BaseStats";
import AbilityAttributes, { AbilityTypes, IAbilityData } from "../AbilityAttributes";

export interface ICharacterData {
  baseStats: IBaseStatData;
  skills: IAbilityData;
}

export interface IStatDisplay {
  key: string;
  name: string;
  value: number;
}

const statNames = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD"
}

export default class Character extends Entity {
  private _maxLevel: number = 0;
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

  private abilityAttributes: AbilityAttributes;
  private abilityLevels = {
    basic: 1,
    skill: 1,
    ult: 1,
    talent: 1
  }

  constructor(characterData: ICharacterData, name: string) {
    const baseStats = new BaseStats(characterData.baseStats);

    super(name, baseStats);

    this.abilityAttributes = new AbilityAttributes(characterData.skills);
    this.abilityAttributes.calculateAll(this.abilityLevels);
  }

  /*--------------------------------------------------------------*/
  /* Public Functions                                             */
  /*--------------------------------------------------------------*/

  public getStats(): ReadonlyArray<IStatDisplay> {
    let output = new Array<IStatDisplay>;
    let keys = ["hp", "atk", "def", "spd"] as const;

    for (let key of keys) {
      let stat: IStatDisplay = {
        key: key,
        name: statNames[key],
        value: this[key]
      };
      
      output.push(stat);
    }
    
    return output;
  }

  public getBasicAttr(): ReadonlyArray<number> {
    return this.abilityAttributes.basic;
  }

  public getSkillAttr(): ReadonlyArray<number> {
    return this.abilityAttributes.skill;
  }

  public getUltAttr(): ReadonlyArray<number> {
    return this.abilityAttributes.ult;
  }

  public getTalentAttr(): ReadonlyArray<number> {
    return this.abilityAttributes.talent;
  }

  // Returns true if the level is part of 2 ascension phases
  // (Levels 20, 30, 40, 50, 60, 70)
  public isLevelBetweenAscensions(level: number): boolean {
    if (level >= 20 && level <= 70 && (level % 10 == 0))
      return true;
    return false;
  }

  /*--------------------------------------------------------------*/
  /* Private Functions                                            */
  /*--------------------------------------------------------------*/

  // Returns the lower ascension phase for the input level
  private ascensionFromLevel(level: number): number {
    if (level <= 0)
      return NaN;
    else if (level <= 20)
      return 0;
    else if (level <= 30)
      return 1;
    else if (level <= 40)
      return 2;
    else if (level <= 50)
      return 3;
    else if (level <= 60)
      return 4;
    else if (level <= 70)
      return 5;
    else if (level <= 80)
      return 6;
    else
      return NaN;
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

  private maxLvlFromAscension(ascension: number): number {
    const maxLevel = [20, 30, 40, 50, 60, 70, 80];
    return maxLevel[ascension];
  }

  // To be called after updating base stats and equipping weapons/relics
  // Updates current stats with new base stats and equipment
  private updateStats(): void {
    this._hp = this.baseStats.hp;
    this._atk = this.baseStats.atk;
    this._def = this.baseStats.def;
    this._spd = this.baseStats.spd;
  }

  private calculateAbility(abilityType: AbilityTypes): void {
    this.abilityAttributes.calculateAttribute(this.abilityLevels[abilityType], abilityType);
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

    this.baseStats.calculate(this._level, this._ascension);
    this.updateStats();
  }

  public get maxLevel(): number {
    return this._maxLevel;
  }

  public get ascension(): number {
    return this._ascension;
  }

  public set ascension(value: number) {
    if (value < 0 || value > 6) 
      throw new RangeError("Ascension must be in range 0 - 6");

    if (this.isLevelInAscension(this._level, value)) {
      this._ascension = value;

      this._maxLevel = this.maxLvlFromAscension(value);
      this.baseStats.calculate(this._level, this._ascension);
      this.updateStats();
    }
  }

  public set basicLevel(value: number) {
    if (value < 0 || value > 7)
      throw new RangeError("Basic level must be between 1-7");

    this.abilityLevels.basic = value;
    this.calculateAbility("basic");
  }

  public set skillLevel(value: number) {
    if (value < 0 || value > 12)
      throw new RangeError("Skill level must be between 1-12");

    this.abilityLevels.skill = value;
    this.calculateAbility("skill");
  }

  public set ultLevel(value: number) {
    if (value < 0 || value > 12)
      throw new RangeError("Ult level must be between 1-12");

    this.abilityLevels.ult = value;
    this.calculateAbility("ult");
  }

  public set talentLevel(value: number) {
    if (value < 0 || value > 12)
      throw new RangeError("Talent level must be between 1-12");

    this.abilityLevels.talent = value;
    this.calculateAbility("talent");
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
