// Lvl: 76 HP: 868 ATK: 660 DEF: 401

import Character from "./Character";

const hpBaseAsc = [121, 285, 394, 503, 613, 722, 831]
const hpPerLvl = 6.1;

const atkBase = [92, 217, 300, 383, 466, 549, 632]
const atkPerLvl = 4.6;

const defBase = [56, 131, 182, 232, 283, 333, 384]
const defPerLvl = 2.8;

const spdBase = 109;

// 3 hits: 50% + 25% + 25%
const basicDmg = [50, 60, 70, 80, 90, 100, 110]

// 4 hits: 25% + 25% + 25% + 25%
// Applies Talent buff(1 turn) after? hits
const skillDmg = [110, 121, 132, 143, 154, 165, 178.75, 192.5, 206.25, 220, 231, 242]

// Applies Ult buff(1 turn) before hits
const ultDmg = [210, 224, 238, 252, 266, 280, 297.5, 315, 332.5, 350, 364, 378]
const ultCD = [30, 32, 34, 36, 38, 40, 42.5, 45, 47.5, 50, 52, 54]
const ultCR = .6;

// 2 hits: 30% + 70%
const talentDmg = [25, 27.5, 30, 32.5, 35, 37.5, 40.625, 43.75, 46.875, 50, 52.5, 55]
const talentFrozen = [25, 27.5, 30, 32.5, 35, 37.5, 40.625, 43.75, 46.875, 50, 52.5, 55]
const talentCR = [15, 15.5, 16, 16.5, 17, 17.5, 18.125, 18.75, 19.375, 20, 20.5, 21]
const talentCD = [15, 16.5, 18, 19.5, 21, 22.5, 24.375, 26.25, 28.125, 30, 31.5, 33]
const talentChance = [50, 51, 52, 53, 54, 55, 56.25, 57.5, 58.75, 60, 61, 62]

export default class Yanqing extends Character {
  constructor(name: string, level: number) {
    super(name, level);

    
  }
}
