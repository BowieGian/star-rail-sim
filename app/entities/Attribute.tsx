export interface IAttribute {
  base: number;
  add: number;
  type: "default" | "heal" | "heal%";
}

/*----------------------------------------------------------------*/
/* Class Attribute                                                */
/*----------------------------------------------------------------*/
/* Stores and calculates ability scaling numbers
/* For default, add = level 2 - 1
/* For heal & heal%, add = level 6 - 5
/* TODO: Consider where to store the scaling stat (ATK, HP, DEF...)
/*----------------------------------------------------------------*/
export default class Attribute {
  private _base: number = 0;
  private _add: number = 0;
  private _type: "default" | "heal" | "heal%" = "default";

  constructor(input: IAttribute) {
    this.base = input.base;
    this.add = input.add;
    this.type = input.type;
  }

  public calculate(level: number): number {
    if (level < 1 || level > 12)
      throw new RangeError("Ability level must be between 1-12");

    if (level === 1) return this._base;

    let multiplier: number[];

    if (this._type === "default") {
      multiplier = [1, 1, 1, 1, 1, 1.25, 1.25, 1.25, 1.25, 1, 1];
    } else if (this._type === "heal") {
      multiplier = [2, 1.5, 1.5, 1, 1, .75, .75, .75, .75, .75, .75];
    } else if (this._type === "heal%") {
      multiplier = [1.25, 1.25, 1.25, 1.25, 1, 1, 1, 1, 1, 1, 1];
    } else {
      return NaN;
    }

    let output = this._base;

    for (let i = 0; i < level - 1; i++) {
      output += this._add * multiplier[i];
    }

    return Math.round((output + Number.EPSILON) * 10000) / 10000;
  }

  /*--------------------------------------------------------------*/
  /* Getters & Setters                                            */
  /*--------------------------------------------------------------*/

  private set base(value: number) {
    if (value < 0) throw new RangeError("Base cannot be negative");
    this._base = value;
  }

  private set add(value: number) {
    if (value < 0) throw new RangeError("Add cannot be negative");
    this._add = value;
  }

  private set type(value: "default" | "heal" | "heal%") {
    this._type = value;
  }
}
