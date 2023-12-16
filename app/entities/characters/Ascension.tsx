/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ascension                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores the character's ascension phase
/   Contains helper functions relating ascension to level and max level
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Ascension {
  public value: number;
  public maxLevel: number = NaN;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(value: number) {
    this.value = value;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  /** Returns the lower ascension phase for the input level */
  public ascensionFromLevel(level: number): number {
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

  public maxLvlFromAscension(ascension: number): number {
    const maxLevel = [20, 30, 40, 50, 60, 70, 80];
    return maxLevel[ascension];
  }

  /** Returns true if the level is in the ascension phase */
  public isLevelInAscension(level: number, ascension: number): boolean {
    let defaultAscension = this.ascensionFromLevel(level);

    if (ascension == defaultAscension)
      return true;
    if (this.isLevelBetweenAscensions(level) && ascension == defaultAscension + 1)
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
  public isLevelBetweenAscensions(level: number): boolean {
    if (level >= 20 && level <= 70 && (level % 10 == 0))
      return true;
    return false;
  }

  public isAscended(level: number): boolean {
    return this.ascensionFromLevel(level) + 1 === this.value;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

}
