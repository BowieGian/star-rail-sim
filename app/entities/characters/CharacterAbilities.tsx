import Ability, { AbilityTypes, IAbility, abilityTypes } from "./Ability";

export type IAbilityData = Record<AbilityTypes, IAbility>

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class CharacterAbilities                                                   /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores character abilities
/   Contains functions that returns data for frontend(TODO: move from Character)
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class CharacterAbilities {
  private abilities: Record<AbilityTypes, Ability> = {} as Record<AbilityTypes, Ability>;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(abilityData: IAbilityData) {
    for (let ability of abilityTypes) {
      this.abilities[ability] = new Ability(ability, abilityData[ability]);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getLevel(ability: AbilityTypes): number {
    return this.abilities[ability].level;
  }

  public setLevel(ability: AbilityTypes, level: number): void {
    this.abilities[ability].level = level;
  }

  public getName(ability: AbilityTypes): string {
    return this.abilities[ability].name;
  }

  public getEnergy(ability: AbilityTypes): number {
    return this.abilities[ability].energy;
  }

  public getToughness(ability: AbilityTypes): number {
    return this.abilities[ability].toughness;
  }

  public getDescriptions(ability: AbilityTypes): ReadonlyArray<string> {
    return this.abilities[ability].descriptions;
  }

  public getAttributes(ability: AbilityTypes): ReadonlyArray<number> {
    return this.abilities[ability].attributes;
  }
}
