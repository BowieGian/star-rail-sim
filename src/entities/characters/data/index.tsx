import { ICharacterData } from "../Character";
import Serval from "./Serval";
import ServalData from "./Serval.json";
import Yanqing from "./Yanqing";
import YanqingData from "./Yanqing.json";

export const characterKeys = ["Serval", "Yanqing"] as const;
export type CharacterKey = typeof characterKeys[number];

/** Record of all character data */
const characterData: Record<CharacterKey, ICharacterData> = {
  "Serval": ServalData,
  "Yanqing": YanqingData
} as Record<CharacterKey, ICharacterData>;

/** Returns the ICharacterData imported from the json file */
export default function getCharacterData(characterKey: CharacterKey) {
  return characterData[characterKey];
}

/** Storage for the user's characters (Consider a different location?) */
export const characterList = {
  "Serval": new Serval("Serval"),
  "Yanqing": new Yanqing("Yanqing")
};

export type Characters = typeof characterList[CharacterKey];
