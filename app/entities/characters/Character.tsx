import Entity from "../Entity";
import BaseStats, { IBaseStatData } from "../BaseStats";
import Attribute, { IAttribute } from "../Attribute";

export interface ICharacterData {
  baseStats: IBaseStatData;
  skills: {
    basic: IAttribute[];
    skill: IAttribute[];
    ult: IAttribute[];
    talent: IAttribute[];
  }
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

  private skills: {
    basic: Attribute[];
    skill: Attribute[];
    ult: Attribute[];
    talent: Attribute[];
  } = {
    basic: new Array<Attribute>,
    skill: new Array<Attribute>,
    ult: new Array<Attribute>,
    talent: new Array<Attribute>
  }

  constructor(characterData: ICharacterData, name: string, level: number) {
    const baseStats = new BaseStats(characterData.baseStats);
    // console.log(baseStats);

    super(name, level, baseStats);

    let property: keyof typeof characterData.skills;
    for (property in characterData.skills) {
      for (let i = 0; i < characterData.skills[property].length; i++) {
        this.skills[property].push(new Attribute(characterData.skills[property][i]));
      }
    }

    // console.log(this);

    // this.printSkills();
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

  // Returns true if the level is part of 2 ascension phases
  // (Levels 20, 30, 40, 50, 60, 70)
  private isLevelBetweenAscensions(level: number): boolean {
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

  private printSkills() {
    let property: keyof typeof this.skills;

    for (property in this.skills) {
      console.log(property);
      for (let i = 0; i < this.skills[property].length; i++) {
        console.log("Attribute %d", i);

        let length: number;
        if (property === "basic") {
          length = 7;
        } else {
          length = 12;
        }

        for (let j = 1; j <= length; j++) {
          console.log(this.skills[property][i].calculate(j));
        }
      }
    }
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
      spd: this._spdBase} = this.baseStats.calculate(value, this._ascension));
  }

  public get ascension(): number {
    return this._ascension;
  }

  public set ascension(value: number) {
    if (value < 0 || value > 6) 
      throw new RangeError("Ascension must be in range 0 - 6");

    if (this.isLevelInAscension(this._level, value)) {
      this._ascension = value;
      ({hp: this._hpBase,
        atk: this._atkBase,
        def: this._defBase,
        spd: this._spdBase} = this.baseStats.calculate(this._level, value));
    }
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
