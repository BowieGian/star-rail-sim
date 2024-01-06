export type StatTypes = "Character" | "Light Cone";

export const scalingBaseStats = ["hp", "atk", "def"] as const;
export type ScalingBaseStats = typeof scalingBaseStats[number];

export type Speed = "spd";

export const allBaseStats = ["hp", "atk", "def", "spd"] as const;
export type AllBaseStats = typeof allBaseStats[number];

export const allBaseStatNames: Record<AllBaseStats, string> = {
  hp: "HP",
  atk: "ATK",
  def: "DEF",
  spd: "SPD"
};
