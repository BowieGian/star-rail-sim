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
  private abilities: Record<CharacterAbilityTypes, Ability> = {} as Record<CharacterAbilityTypes, Ability>;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(abilityData: IAbilityData) {
    for (const ability of characterAbilityTypes) {
      this.abilities[ability] = new Ability(ability, abilityData[ability]);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getLevel(ability: CharacterAbilityTypes): number {
    return this.abilities[ability].level;
  }

  public setLevel(ability: CharacterAbilityTypes, level: number): void {
    this.abilities[ability].level = level;
  }

  public getName(ability: CharacterAbilityTypes): string {
    return this.abilities[ability].name;
  }

  public getEnergy(ability: CharacterAbilityTypes): number {
    return this.abilities[ability].energy;
  }

  public getToughness(ability: CharacterAbilityTypes): number {
    return this.abilities[ability].toughness;
  }

  public getDescriptions(ability: CharacterAbilityTypes): ReadonlyArray<string> {
    return this.abilities[ability].descriptions;
  }

  public getAttributes(ability: CharacterAbilityTypes): ReadonlyArray<number> {
    return this.abilities[ability].attributes;
  }
}
