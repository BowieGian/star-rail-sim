import Attribute from "../Attribute";
import { IAbility } from "./CharacterAbilities";

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Ability                                                              /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores a character ability including the description and level
/   Contains functions that returns data formatted for frontend
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Ability {
  public data: Array<Attribute> = new Array<Attribute>;
  public descriptions: Array<string> = new Array<string>;
  public attributes: Array<number> = new Array<number>;
  public level: number = 1;

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(input: IAbility) {
    if (!input.attributes.length)
      throw new Error("Attributes has no length");

    if (!input.description.length)
      throw new Error("Description has no length");

    if (input.description.length - input.attributes.length !== 1)
      throw new Error("Description length is not 1 less than its attribute length");

    for (let i = 0; i < input.attributes.length; i++) {
      this.data.push(new Attribute(input.attributes[i]));
    }

    for (let i = 0; i < input.description.length; i++) {
      this.descriptions.push(input.description[i]);
    }
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Getters & Setters                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/


}
