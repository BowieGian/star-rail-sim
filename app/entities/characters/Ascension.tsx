/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ascension                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores the character's ascension phase
/   Stores a copy of character level to maintain the correct ascension phase
/   Contains helper functions relating ascension to level and max level
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Ascension {
  private _level: number;
  private ascension: number = NaN;
  private _maxLevel: number;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(level: number) {
    this._level = level;
    this.setAscension(this.ascensionFromLevel());
    this._maxLevel = this.maxLvlFromAscension(this.ascension);
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
    if (this.isAscendable() && ascension == defaultAscension + 1)
      return true;
    return false;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /** @example
  /* Returns true if the level is part of 2 ascension phases
   * (Levels 20, 30, 40, 50, 60, 70)
   */
  public isAscendable(): boolean {
    if (this._level >= 20 && this._level <= 70 && (this._level % 10 == 0))
      return true;
    return false;
  }

  public isAscended(): boolean {
    return this.ascensionFromLevel() + 1 === this.ascension;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public set level(value: number) {
    this._level = value;
    this.setAscension(this.ascensionFromLevel());
  }

  public getAscension(): number {
    return this.ascension;
  }

  /** Sets the ascension phase and returns true if the phase changed */
  public setAscension(value: number): boolean {
    if (value < 0 || value > 6)
      throw new RangeError("Ascension must be in range 0 - 6");

    if (!this.isLevelInAscension(value)) {
      return false;
    }

    this.ascension = value;
    this._maxLevel = this.maxLvlFromAscension(value);
    return true;
  }

  public get maxLevel(): number {
    return this._maxLevel;
  }
}
