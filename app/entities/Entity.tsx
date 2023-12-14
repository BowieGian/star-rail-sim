import CharacterBaseStats from "./characters/CharacterBaseStats";

export default class Entity {
  protected characterBaseStats: CharacterBaseStats;

  protected _id: string = "";
  protected _level: number = NaN;
  protected _hp: number = NaN;
  protected _atk: number = NaN;
  protected _def: number = NaN;
  protected _spd: number = NaN;


  constructor(id: string, characterBaseStats: CharacterBaseStats) {
    if (!id) throw new Error("The name is invalid");

    this._id = id;
    this.characterBaseStats = characterBaseStats;
    this.level = 1;
    // console.log(this);
  }

  public getAV(): number {
    if (!this._spd) throw new Error("SPD has not been defined yet");

    return 10000 / this._spd;
  }


  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public get id(): string {
    return this._id;
  }

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    if (value < 1 || value > 90) 
      throw new RangeError("Level must be between 1 and 90");

    this._level = value;

    this.characterBaseStats.calculate(value);

    this._hp = this.characterBaseStats.hp;
    this._atk = this.characterBaseStats.atk;
    this._def = this.characterBaseStats.def;
    this._spd = this.characterBaseStats.spd;
  }

  public get hp(): number {
    return this._hp;
  }

  public get atk(): number {
    return this._atk;
  }

  public get def(): number {
    return this._def;
  }

  public get spd(): number {
    return this._spd;
  }
}
