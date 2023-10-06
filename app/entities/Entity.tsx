import BaseStats from "./BaseStats";

export default class Entity {
  protected baseStats: BaseStats;

  protected _hpBase: number = NaN;
  protected _atkBase: number = NaN;
  protected _defBase: number = NaN;
  protected _spdBase: number = NaN;

  private _name: string = "";
  protected _level: number = NaN;
  private _hp: number = NaN;
  private _atk: number = NaN;
  private _def: number = NaN;
  private _spd: number = NaN;


  constructor(name: string, baseStats: BaseStats) {
    this.name = name;
    this.baseStats = baseStats;
    this.level = 1;
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

    ({hp: this._hpBase,
      atk: this._atkBase,
      def: this._defBase,
      spd: this._spdBase} = this.baseStats.calculate(value));
  }

  public get hpBase(): number {
    return this._hpBase;
  }

  public get atkBase(): number {
    return this._atkBase;
  }

  public get defBase(): number {
    return this._defBase;
  }

  public get spdBase(): number {
    return this._spdBase;
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
