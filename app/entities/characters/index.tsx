import { ICharacterData } from "./Character";
import Serval from "./Serval";
import ServalData from "./Serval.json";
import Yanqing from "./Yanqing";
import YanqingData from "./Yanqing.json";

export const characterKeys = ["Serval", "Yanqing"] as const;
export type characterKey = typeof characterKeys[number];

// Record of all character data
const characterData: Record<characterKey, ICharacterData> = {
  "Serval": ServalData,
  "Yanqing": YanqingData
} as Record<characterKey, ICharacterData>;

export default function getCharacterData(characterKey: characterKey) {
  return characterData[characterKey];
}

// Storage for the user's characters
// Consider a different location?
export const characterList = {
  "Serval": new Serval("Serval"),
  "Yanqing": new Yanqing("Yanqing")
}

export type characters = typeof characterList[characterKey];
