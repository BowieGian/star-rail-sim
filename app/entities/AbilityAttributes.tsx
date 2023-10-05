import Attribute, { IAttribute } from "./Attribute";

type AbilityTypes = "basic" | "skill" | "ult" | "talent";

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

    let abilities: AbilityTypes[] = ["basic" , "skill" , "ult" , "talent"];

    abilities.forEach(ability =>
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
    let abilities: AbilityTypes[] = ["basic" , "skill" , "ult" , "talent"];

    abilities.forEach(ability => this.printAttribute(ability));
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  public get basic(): ReadonlyArray<number> {
    let output: ReadonlyArray<number> = this.attributes.basic;
    return output;
  }

  public get skill(): ReadonlyArray<number> {
    let output: ReadonlyArray<number> = this.attributes.skill;
    return output;
  }

  public get ult(): ReadonlyArray<number> {
    let output: ReadonlyArray<number> = this.attributes.ult;
    return output;
  }

  public get talent(): ReadonlyArray<number> {
    let output: ReadonlyArray<number> = this.attributes.talent;
    return output;
  }
}
