import Attribute, { IAttribute } from "./Attribute";

const abilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type AbilityTypes = typeof abilityTypes[number];

export type IAbilityData = Record<AbilityTypes, IAbility>

export interface IAbility {
  attributes: IAttribute[];
  description: string[];
}

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Abilities                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores character abilities including the descriptions and levels(TODO)
/   Contains functions that returns data for frontend(TODO: move from Character)
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Abilities {
  private data: Record<AbilityTypes, Array<Attribute>> = {
    basic: new Array<Attribute>,
    skill: new Array<Attribute>,
    ult: new Array<Attribute>,
    talent: new Array<Attribute>
  }

  private descriptions: Record<AbilityTypes, Array<string>> = {
    basic: new Array<string>,
    skill: new Array<string>,
    ult: new Array<string>,
    talent: new Array<string>
  }

  private attributes: Record<AbilityTypes, Array<number>> = {
    basic: new Array<number>,
    skill: new Array<number>,
    ult: new Array<number>,
    talent: new Array<number>
  }

  private levels: Record<AbilityTypes, number> = {
    basic: 1,
    skill: 1,
    ult: 1,
    talent: 1
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(abilityData: IAbilityData) {
    for (let ability of abilityTypes) {
      if (!abilityData[ability].attributes.length)
        throw new Error("Attributes of " + ability + " has no length");

      if (!abilityData[ability].description.length)
        throw new Error("Description of " + ability + " has no length");

      if (abilityData[ability].description.length - abilityData[ability].attributes.length !== 1)
        throw new Error("Description length of " + ability + " is not 1 less than its attribute length");

      for (let i = 0; i < abilityData[ability].attributes.length; i++) {
        this.data[ability].push(new Attribute(abilityData[ability].attributes[i]));
      }

      for (let i = 0; i < abilityData[ability].description.length; i++) {
        this.descriptions[ability].push(abilityData[ability].description[i]);
      }
    }

    this.calculateAll();
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  private calculateAttribute(ability: AbilityTypes): void {
    for (let i = 0; i < this.data[ability].length; i++) {
      this.attributes[ability][i] = this.data[ability][i].calculate(this.levels[ability]);
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
      for (let i = 0; i < this.data[ability].length; i++) {
        console.log("Attribute %d", i);

        let length: number;
        if (ability === "basic") {
          length = 7;
        } else {
          length = 12;
        }

        for (let j = 1; j <= length; j++) {
          console.log(this.data[ability][i].calculate(j));
        }
      }
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public getLevel(ability: AbilityTypes): number {
    return this.levels[ability];
  }

  public setLevel(ability: AbilityTypes, level: number): void {
    if (ability !== "basic") {
      if (level < 0 || level > 12)
        throw new RangeError("Ability level must be between 1-12");
    } else {
      if (level < 0 || level > 7)
        throw new RangeError("Basic level must be between 1-7");
    }

    this.levels[ability] = level;
    this.calculateAttribute(ability);
  }

  public getAttributes(ability: AbilityTypes): ReadonlyArray<number> {
    return this.attributes[ability];
  }

  public getDescriptions(ability: AbilityTypes): ReadonlyArray<string> {
    return this.descriptions[ability];
  }
}
