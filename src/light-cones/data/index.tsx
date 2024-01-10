import { ILightConeData } from "../LightCone";
import InTheNight from "./InTheNight";
import InTheNightData from "./InTheNight.json";
import TimeWaitsForNoOne from "./TimeWaitsForNoOne";
import TimeWaitsForNoOneData from "./TimeWaitsForNoOne.json";

export const lightConeKeys = ["InTheNight", "TimeWaitsForNoOne"] as const;
export type LightConeKey = typeof lightConeKeys[number];

/** Record of all light cone data */
const lightConeData: Record<LightConeKey, ILightConeData> = {
  "InTheNight": InTheNightData,
  "TimeWaitsForNoOne": TimeWaitsForNoOneData
} as Record<LightConeKey, ILightConeData>;

/** Returns the ILightConeData imported from the json file */
export default function getLightConeData(lightConeKey: LightConeKey) {
  return lightConeData[lightConeKey];
}

/**
 * Storage for the user's lightcones.
 * (Consider a different location?)
 * Copied from character index.
 * Needs to change to hold multiple light cones.
 */
export const lightConeList = {
  "InTheNight": new InTheNight("InTheNight"),
  "TimeWaitsForNoOne": new TimeWaitsForNoOne("TimeWaitsForNoOne")
};

export type LightCones = typeof lightConeList[LightConeKey];
