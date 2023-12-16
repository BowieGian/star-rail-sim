/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ascension                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores the character's ascension phase
/   Contains helper functions relating ascension to level and max level
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Ascension {
  private phase: number;
  private _maxLevel: number;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(value: number) {
    this.phase = value;
    this._maxLevel = this.maxLvlFromAscension(value);
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /** Returns the lower ascension phase for the input level */
  private ascensionFromLevel(level: number): number {
    if (level <= 0)
      return NaN;

    for (let i = 0; i <= 6; i++) {
      if (level <= this.maxLvlFromAscension(i))
        return i;
    }

    return NaN;
  }

  private maxLvlFromAscension(ascension: number): number {
    const maxLevel = [20, 30, 40, 50, 60, 70, 80];
    return maxLevel[ascension];
  }

  /** Returns true if the level is in the ascension phase */
  private isLevelInAscension(level: number, ascension: number): boolean {
    let defaultAscension = this.ascensionFromLevel(level);

    if (ascension == defaultAscension)
      return true;
    if (this.isAscendable(level) && ascension == defaultAscension + 1)
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
  public isAscendable(level: number): boolean {
    if (level >= 20 && level <= 70 && (level % 10 == 0))
      return true;
    return false;
  }

  public isAscended(level: number): boolean {
    return this.ascensionFromLevel(level) + 1 === this.phase;
  }

  public updateAscension(level: number): void {
    this.setAscension(this.ascensionFromLevel(level), level);
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getAscension(): number {
    return this.phase;
  }

  /** Sets the ascension phase and returns true if the phase changed */
  public setAscension(value: number, level: number): boolean {
    if (value < 0 || value > 6)
      throw new RangeError("Ascension must be in range 0 - 6");

    if (!this.isLevelInAscension(level, value)) {
      return false;
    }

    this.phase = value;
    this._maxLevel = this.maxLvlFromAscension(value);
    return true;
  }

  public get maxLevel(): number {
    return this._maxLevel;
  }
}
