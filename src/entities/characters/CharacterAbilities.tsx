import Ability, { CharacterAbilityTypes, IAbility, characterAbilityTypes } from "../../ability/Ability";

export type IAbilityData = Record<CharacterAbilityTypes, IAbility>

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class CharacterAbilities                                                   /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores character abilities
/   Contains functions that returns data for frontend(TODO: move from Character)
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class CharacterAbilities {
  private _abilities: Record<CharacterAbilityTypes, Ability> = {} as Record<CharacterAbilityTypes, Ability>;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(abilityData: IAbilityData) {
    for (const ability of characterAbilityTypes) {
      this._abilities[ability] = new Ability(ability, abilityData[ability]);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getAbility(ability: CharacterAbilityTypes): Ability {
    return this._abilities[ability];
  }

  public getLevel(ability: CharacterAbilityTypes): number {
    return this._abilities[ability].level;
  }

  public setLevel(ability: CharacterAbilityTypes, level: number): void {
    this._abilities[ability].level = level;
  }

  public getDescriptions(ability: CharacterAbilityTypes): ReadonlyArray<string> {
    return this._abilities[ability].descriptions;
  }

  public getAttributes(ability: CharacterAbilityTypes): ReadonlyArray<number> {
    return this._abilities[ability].attributes;
  }
}
