import Attribute, { IAttribute } from "./Attribute";

const abilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type AbilityTypes = typeof abilityTypes[number];

export interface IAbilityData {
  basic: IAbility;
  skill: IAbility;
  ult: IAbility;
  talent: IAbility;
}

export interface IAbility {
  attributes: IAttribute[];
  description: string[];
}

export default class AbilityAttributes {
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

  constructor(input: IAbilityData) {
    let property: keyof IAbilityData;
    for (property in input) {
      if (!input[property].attributes.length)
        throw new Error("Attributes has no length");

      if (!input[property].description.length)
        throw new Error("Description has no length");

      if (input[property].description.length - input[property].attributes.length !== 1)
        throw new Error("Description length is not 1 less than attribute length");

      for (let i = 0; i < input[property].attributes.length; i++) {
        this.data[property].push(new Attribute(input[property].attributes[i]));
      }

      for (let i = 0; i < input[property].description.length; i++) {
        this.descriptions[property].push(input[property].description[i]);
      }
    }

    this.calculateAll({basic: 1, skill: 1, ult: 1, talent: 1});
  }

  public calculateAttribute(level: number, ability: AbilityTypes): void {
    for (let i = 0; i < this.data[ability].length; i++) {
      this.attributes[ability][i] = this.data[ability][i].calculate(level);
    }
  }

  public calculateAll(
    abilityLevels: {
      basic: number,
      skill: number,
      ult: number,
      talent: number
    }
  ): void {

    abilityTypes.forEach(ability =>
      this.calculateAttribute(abilityLevels[ability], ability));
  }

  private printAttribute(ability: AbilityTypes): void {
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

  public print() {
    abilityTypes.forEach(ability => this.printAttribute(ability));
  }

  public getAttributes(abilityType: AbilityTypes): ReadonlyArray<number> {
    return this.attributes[abilityType];
  }

  public getDescriptions(abilityType: AbilityTypes): ReadonlyArray<string> {
    return this.descriptions[abilityType];
  }
}
