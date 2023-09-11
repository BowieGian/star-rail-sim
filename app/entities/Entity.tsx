import BaseStats from "./BaseStats";
import Linear from "./Linear";

export default class Entity {
  protected baseStats: BaseStats;

  private _hpBase: number = NaN;
  private _atkBase: number = NaN;
  private _defBase: number = NaN;
  private _spdBase: number = NaN;

  private _name: string = "";
  protected _level: number = NaN;
  private _hp: number = NaN;
  private _atk: number = NaN;
  private _def: number = NaN;
  private _spd: number = NaN;


  constructor(name: string, level: number, baseStats: BaseStats) {
    this.name = name;
    this.baseStats = baseStats;
    this.level = level;
    // console.log(this);
  }

  public getAV(): number {
    if (!this._spd) throw new Error("SPD has not been defined yet");

    return 10000 / this._spd;
  }


  // Getters & Setters
  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    if (!value) throw new Error("The name is invalid");

    this._name = value;
  }

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    if (value < 1 || value > 80) 
      throw new RangeError("Level must be between 1 and 80");

    this._level = value;

    ({hp: this.hpBase,
      atk: this.atkBase,
      def: this.defBase,
      spd: this.spdBase} = this.baseStats.calculate(value));
  }

  public get hpBase(): number {
    return this._hpBase;
  }

  public set hpBase(value: number) {
    if (value < 1) throw new RangeError("Base HP must be greater than 0");

    this._hpBase = value;
  }

  public get atkBase(): number {
    return this._atkBase;
  }

  public set atkBase(value: number) {
  if (value < 1) throw new RangeError("Base ATK must be greater than 0");

  this._atkBase = value;
  }

  public get defBase(): number {
    return this._defBase;
  }

  public set defBase(value: number) {
    if (value < 1) throw new RangeError("Base DEF must be greater than 0");

    this._defBase = value;
  }

  public get spdBase(): number {
    return this._spdBase;
  }

  public set spdBase(value: number) {
    if (value < 1) throw new RangeError("Base SPD must be greater than 0");

    this._spdBase = value;
  }

  public get hp(): number {
    return this._hp;
  }

  public set hp(value: number) {
    if (value < 1) throw new RangeError("HP must be greater than 0");

    this._hp = value;
  }

  public get atk(): number {
    return this._atk;
  }

  public set atk(value: number) {
    if (value < 1) throw new RangeError("ATK must be greater than 0");

    this._atk = value;
  }

  public get def(): number {
    return this._def;
  }
  public set def(value: number) {
    if (value < 1) throw new RangeError("DEF must be greater than 0");

    this._def = value;
  }

  public get spd(): number {
    return this._spd;
  }
  public set spd(value: number) {
    if (value < 1) throw new RangeError("SPD must be greater than 0");

    this._spd = value;
  }
}
