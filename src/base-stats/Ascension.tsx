const ascendableLevels = [20, 30, 40, 50, 60, 70];
const maxLevels = [20, 30, 40, 50, 60, 70, 80];

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ascension                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores the character's or light cone's ascension phase
/   Stores a copy of their level to maintain the correct ascension phase
/   Contains helper functions relating ascension to level and max level
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export class Ascension {
  private _level: number = NaN;
  private _ascendable: boolean = false;

  private _maxLevel: number = NaN;
  private _ascension: number = NaN;
  private _ascended: boolean = false;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(level: number) {
    this.level = level;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /** Returns the lower ascension phase for the input level */
  private ascensionFromLevel(): number {
    if (this._level <= 0)
      return NaN;

    for (let i = 0; i <= 6; i++) {
      if (this._level <= maxLevels[i])
        return i;
    }

    return NaN;
  }

  /** Returns true if the ascension valid for the level */
  private isAscensionInLevel(ascension: number): boolean {
    const defaultAscension = this.ascensionFromLevel();

    if (ascension == defaultAscension)
      return true;
    if (this.ascendable && ascension == defaultAscension + 1)
      return true;
    return false;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /** Assumes level is between [1, 80] */
  public set level(value: number) {
    this._level = value;
    this._ascendable = ascendableLevels.includes(value);

    if (this.isAscensionInLevel(this._ascension)) {
      if (!this._ascendable)
        this._ascended = false;
      else
        this._ascended = this.ascensionFromLevel() + 1 === this._ascension;

      return;
    }

    if (!this._ascendable)
      this._ascended = false;

    this.ascension = this.ascensionFromLevel();
  }

  public get ascendable(): boolean {
    return this._ascendable;
  }

  public get maxLevel(): number {
    return this._maxLevel;
  }

  public get ascension(): number {
    return this._ascension;
  }

  private set ascension(value: number) {
    this._ascension = value;
    this._maxLevel = maxLevels[value];
  }

  public get ascended(): boolean {
    return this._ascended;
  }

  public set ascended(value: boolean) {
    if (!this.ascendable)
      return;

    this._ascended = value;

    if (value)
      this.ascension = this.ascensionFromLevel() + 1;
    else
      this.ascension = this.ascensionFromLevel();
  }
}
