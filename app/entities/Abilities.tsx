import Attribute, { IAttribute } from "./Attribute";

const abilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type AbilityTypes = typeof abilityTypes[number];

export type IAbilityData = Record<AbilityTypes, IAbility>

export interface IAbility {
  attributes: IAttribute[];
  description: string[];
}

export default class Abilities {
  private data = {
    basic: new Array<Attribute>,
    skill: new Array<Attribute>,
    ult: new Array<Attribute>,
    talent: new Array<Attribute>
  }

    private descriptions = {
    basic: new Array<string>,
    skill: new Array<string>,
    ult: new Array<string>,
    talent: new Array<string>
  }

  private attributes = {
    basic: new Array<number>,
    skill: new Array<number>,
    ult: new Array<number>,
    talent: new Array<number>
  }

  constructor(abilityData: IAbilityData) {
    abilityTypes.forEach(ability => {
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
  });

    this.calculateAll({basic: 1, skill: 1, ult: 1, talent: 1});
  }

  public calculateAttribute(level: number, ability: AbilityTypes): void {
    for (let i = 0; i < this.data[ability].length; i++) {
      this.attributes[ability][i] = this.data[ability][i].calculate(level);
    }
  }

  public calculateAll(abilityLevels: Record<AbilityTypes, number>): void {
    abilityTypes.forEach(
      ability => this.calculateAttribute(abilityLevels[ability], ability)
    );
  }

  public printAttributes() {
    abilityTypes.forEach(ability => {
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
    });
  }

  public getAttributes(ability: AbilityTypes): ReadonlyArray<number> {
    return this.attributes[ability];
  }

  public getDescriptions(ability: AbilityTypes): ReadonlyArray<string> {
    return this.descriptions[ability];
  }
}
