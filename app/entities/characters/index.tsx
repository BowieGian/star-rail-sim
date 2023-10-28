import { ICharacterData } from "./Character";
import Serval from "./Serval.json";
import Yanqing from "./Yanqing.json";

export const characterKeys = ["Serval", "Yanqing"] as const;
export type characterKey = typeof characterKeys[number];

const characterData: Record<characterKey, ICharacterData> = {
  Serval,
  Yanqing
} as Record<characterKey, ICharacterData>;

export default function getCharacterData(characterKey: characterKey) {
  return characterData[characterKey];
}
