import Attribute, { IAttribute } from "../Attribute";
import Ability from "./Ability";

const abilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type AbilityTypes = typeof abilityTypes[number];

export type IAbilityData = Record<AbilityTypes, IAbility>

export interface IAbility {
  attributes: IAttribute[];
  description: string[];
}

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
      this.abilities[ability] = new Ability(abilityData[ability]);
    }

    this.calculateAll();
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  private calculateAttribute(ability: AbilityTypes): void {
    for (let i = 0; i < this.abilities[ability].data.length; i++) {
      this.abilities[ability].attributes[i] = this.abilities[ability].data[i].calculate(this.abilities[ability].level);
    }
  }

  private calculateAll(): void {
    for (let ability of abilityTypes) {
      this.calculateAttribute(ability);
    }
  }

  /** Prints a list of all abilities' attributes per level for checking */
  private printAttributes(): void {
    for (let ability of abilityTypes) {
      console.log(ability);
      for (let i = 0; i < this.abilities[ability].data.length; i++) {
        console.log("Attribute %d", i);

        let length: number;
        if (ability === "basic") {
          length = 7;
        } else {
          length = 12;
        }

        for (let j = 1; j <= length; j++) {
          console.log(this.abilities[ability].data[i].calculate(j));
        }
      }
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getLevel(ability: AbilityTypes): number {
    return this.abilities[ability].level;
  }

  public setLevel(ability: AbilityTypes, level: number): void {
    if (ability !== "basic") {
      if (level < 0 || level > 12)
        throw new RangeError("Ability level must be between 1-12");
    } else {
      if (level < 0 || level > 7)
        throw new RangeError("Basic level must be between 1-7");
    }

    this.abilities[ability].level = level;
    this.calculateAttribute(ability);
  }

  public getAttributes(ability: AbilityTypes): ReadonlyArray<number> {
    return this.abilities[ability].attributes;
  }

  public getDescriptions(ability: AbilityTypes): ReadonlyArray<string> {
    return this.abilities[ability].descriptions;
  }
}
