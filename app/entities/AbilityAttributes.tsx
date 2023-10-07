import Attribute, { IAttribute } from "./Attribute";

const abilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type AbilityTypes = typeof abilityTypes[number];

export interface IAbilityAttributeData {
  basic: IAttribute[];
  skill: IAttribute[];
  ult: IAttribute[];
  talent: IAttribute[];
}

export interface IAbilityAttributes {
  basic: number[];
  skill: number[];
  ult: number[];
  talent: number[];
}

export default class AbilityAttributes {
  private data = {
    basic: new Array<Attribute>,
    skill: new Array<Attribute>,
    ult: new Array<Attribute>,
    talent: new Array<Attribute>
  }

  private attributes = {
    basic: new Array<number>,
    skill: new Array<number>,
    ult: new Array<number>,
    talent: new Array<number>
  }

  constructor(input: IAbilityAttributeData) {
    let property: keyof IAbilityAttributeData;
    for (property in input) {
      for (let i = 0; i < input[property].length; i++) {
        this.data[property].push(new Attribute(input[property][i]));
      }
    }
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

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public get basic(): ReadonlyArray<number> {
    return this.attributes.basic;
  }

  public get skill(): ReadonlyArray<number> {
    return this.attributes.skill;
  }

  public get ult(): ReadonlyArray<number> {
    return this.attributes.ult;
  }

  public get talent(): ReadonlyArray<number> {
    return this.attributes.talent;
  }
}
