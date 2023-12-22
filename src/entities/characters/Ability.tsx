import Attribute, { IAttribute } from "../Attribute";

export const abilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type AbilityTypes = typeof abilityTypes[number];

export interface IAbility {
  attributes: IAttribute[];
  description: string[];
}

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ability                                                              /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores a character ability including the description and level
/   Contains functions that returns data formatted for frontend
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Ability {
  private type: AbilityTypes;
  private _level: number = 1;

  private data: Array<Attribute> = new Array<Attribute>;
  private _descriptions: Array<string> = new Array<string>;

  private _attributes: Array<number> = new Array<number>;


  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(type: AbilityTypes, data: IAbility) {
    this.type = type;

    if (!data.attributes.length)
      throw new Error("Attributes has no length");

    if (!data.description.length)
      throw new Error("Description has no length");

    if (data.description.length - data.attributes.length !== 1)
      throw new Error("Description length is not 1 less than its attribute length");

    for (let i = 0; i < data.attributes.length; i++) {
      this.data.push(new Attribute(data.attributes[i]));
    }

    for (let i = 0; i < data.description.length; i++) {
      this._descriptions.push(data.description[i]);
    }

    this.calculateAttribute();
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  private calculateAttribute(): void {
    for (let i = 0; i < this.data.length; i++) {
      this._attributes[i] = this.data[i].calculate(this.level);
    }
  }

  /** Prints a list of all attributes per level for checking */
  private printAttributes(): void {
    console.log(this.type);
    for (let i = 0; i < this.data.length; i++) {
      console.log("Attribute %d", i);

      let length: number;
      if (this.type === "basic") {
        length = 7;
      } else {
        length = 12;
      }

      for (let j = 1; j <= length; j++) {
        console.log(this.data[i].calculate(j));
      }
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    if (this.type !== "basic") {
      if (value < 0 || value > 12)
        throw new RangeError("Ability level must be between 1-12");
    } else {
      if (value < 0 || value > 7)
        throw new RangeError("Basic level must be between 1-7");
    }

    this._level = value;
    this.calculateAttribute();
  }

  public get descriptions(): ReadonlyArray<string> {
    return this._descriptions;
  }

  public get attributes(): ReadonlyArray<number> {
    return this._attributes;
  }
}
