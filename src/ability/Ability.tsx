import Attribute, { IAttribute } from "./Attribute";

export const characterAbilityTypes = ["basic", "skill", "ult", "talent"] as const;
export type CharacterAbilityTypes = typeof characterAbilityTypes[number];

type AbilityTypes = CharacterAbilityTypes | "light cone";

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
  private _type: AbilityTypes;
  private _level: number = 1;
  private _maxLevel: number;

  private data: Array<Attribute> = new Array<Attribute>;
  private _descriptions: Array<string> = new Array<string>;

  private _attributes: Array<number> = new Array<number>;


  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(type: AbilityTypes, data: IAbility) {
    this._type = type;

    if (!data.attributes.length)
      throw new Error("Attributes has no length");

    if (!data.description.length)
      throw new Error("Description has no length");

    if (data.description.length - data.attributes.length !== 1)
      throw new Error("Description length is not 1 less than its attribute length");

    if (this._type === "light cone")
      this._maxLevel = 5;
    else if (this._type === "basic")
      this._maxLevel = 7;
    else
      this._maxLevel = 12;

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
    console.log(this._type);
    for (let i = 0; i < this.data.length; i++) {
      console.log("Attribute %d", i);

      for (let j = 1; j <= this._maxLevel; j++) {
        console.log(this.data[i].calculate(j));
      }
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public get type(): AbilityTypes {
    return this._type;
  }

  public get level(): number {
    return this._level;
  }

  public set level(value: number) {
    if (value < 0 || value > this._maxLevel)
      throw new RangeError("Ability(" + this._type + ") level must be between 1-" + this._maxLevel);

    this._level = value;
    this.calculateAttribute();
  }

  public get maxLevel(): number {
    return this._maxLevel;
  }

  public get descriptions(): ReadonlyArray<string> {
    return this._descriptions;
  }

  public get attributes(): ReadonlyArray<number> {
    return this._attributes;
  }
}
