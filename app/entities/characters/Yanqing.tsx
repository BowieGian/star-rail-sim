import Character, { ICharacterData } from "./Character";
import characterData from "./Yanqing.json";

export default class Yanqing extends Character {
  constructor(name: string) {
    super(characterData as ICharacterData, name);
  }
}
