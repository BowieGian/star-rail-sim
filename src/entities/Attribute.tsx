const attributeTypes = ["default", "basic", "dot", "heal", "heal%"] as const;
type AttributeTypes = typeof attributeTypes[number];

export interface IAttribute {
  base: number;
  add: number;
  type: AttributeTypes;
}

/** @example
/*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Class Attribute                                                            /
/ ―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
/   Stores and calculates ability scaling numbers
/   For default, basic & dot, add = (level 2) - (level 1)
/   For heal & heal%, add = (level 6) - (level 5)
/ ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/
export default class Attribute {
  private base: number = 0;
  private add: number = 0;
  private type: AttributeTypes = "default";

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Constructor                                                  /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  constructor(input: IAttribute) {
    if (input.base === undefined) throw new Error("Base is undefined");
    if (input.base < 0) throw new RangeError("Base cannot be negative");

    if (input.add === undefined) throw new Error("Add is undefined");
    if (input.add < 0) throw new RangeError("Add cannot be negative");

    if (!this.isAttributeType(input.type))
      throw new Error(input.type + " is not part of AttributeTypes");

    this.base = input.base;
    this.add = input.add;
    this.type = input.type;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Public Functions                                             /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  public calculate(level: number): number {
    if (this.type === "basic") {
      if (level < 1 || level > 7)
        throw new RangeError("Basic level must be between 1-7");

      return this.base + this.add * (level - 1);
    }

    if (level < 1 || level > 12)
      throw new RangeError("Ability level must be between 1-12");

    let multiplier: number[];

    if (this.type === "default") {
      multiplier = [1, 1, 1, 1, 1, 1.25, 1.25, 1.25, 1.25, 1, 1];
    } else if (this.type === "heal") {
      multiplier = [2, 1.5, 1.5, 1, 1, .75, .75, .75, .75, .75, .75];
    } else if (this.type === "heal%") {
      multiplier = [1.25, 1.25, 1.25, 1.25, 1, 1, 1, 1, 1, 1, 1];
    } else if (this.type === "dot") {
      multiplier = [1, 1, 1, 1, 1.5, 2, 2.5, 3, 3, 1.3, 1.3];
    } else {
      const _exhaustiveCheck: never = this.type;
      return _exhaustiveCheck;
    }

    if (level === 1)
      return this.base;

    let output = this.base;

    for (let i = 0; i < level - 1; i++) {
      output += this.add * multiplier[i];
    }

    return Math.round((output + Number.EPSILON) * 1e6) / 1e6;
  }

  /*―――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――― /
  /   Private Functions                                            /
  / ――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――――*/

  private isAttributeType(type: AttributeTypes): type is AttributeTypes {
    return typeof type === "string" && attributeTypes.includes(type);
  }
}
