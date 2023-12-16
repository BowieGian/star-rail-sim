const ascendableLevels = [20, 30, 40, 50, 60, 70];

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ascension                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores the character's ascension phase
/   Stores a copy of character level to maintain the correct ascension phase
/   Contains helper functions relating ascension to level and max level
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Ascension {
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
      if (this._level <= this.maxLvlFromAscension(i))
        return i;
    }

    return NaN;
  }

  private maxLvlFromAscension(ascension: number): number {
    const maxLevel = [20, 30, 40, 50, 60, 70, 80];
    return maxLevel[ascension];
  }

  /** Returns true if the level is in the ascension phase */
  private isLevelInAscension(ascension: number): boolean {
    let defaultAscension = this.ascensionFromLevel();

    if (ascension == defaultAscension)
      return true;
    if (this.ascendable && ascension == defaultAscension + 1)
      return true;
    return false;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public set level(value: number) {
    this._level = value;
    this._ascendable = ascendableLevels.includes(value);

    if (this.isLevelInAscension(this._ascension)) {
      this._ascended = this.ascensionFromLevel() + 1 === this._ascension;
      return;
    }

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

  /** Sets the ascension phase and returns true if the phase changed */
  private set ascension(value: number) {
    if (value < 0 || value > 6)
      throw new RangeError("Ascension must be in range 0 - 6");

    this._ascension = value;
    this._maxLevel = this.maxLvlFromAscension(value);
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
