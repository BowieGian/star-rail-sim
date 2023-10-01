import Character, { ICharacterData } from "./Character";
import characterData from "./Yanqing.json";

export default class Yanqing extends Character {
  constructor(name: string, level: number) {
    super(characterData as ICharacterData, name, level);
  }
}
