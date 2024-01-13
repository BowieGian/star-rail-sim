import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Character from "@/src/entities/characters/Character";
import LightCone from "@/src/light-cones/LightCone";

interface Props {
  charOrLightCone: Character | LightCone;
  setBaseStats: Dispatch<SetStateAction<Readonly<Record<"hp" | "atk" | "def" | "spd", number>>>>;
}

export default function LvlAscInput(props: Props) {
  const {charOrLightCone, setBaseStats} = props;

  const min = 1;
  const max = 80;

  const [level, setLevelInput] = useState<string>(charOrLightCone.level.toString());
  const [maxLevel, setMaxLevel] = useState<number>(charOrLightCone.maxLevel);
  const [ascendable, setAscendable] = useState<boolean>(charOrLightCone.ascendable);

  useEffect(() => {
    setLevelInput(charOrLightCone.level.toString());
    setMaxLevel(charOrLightCone.maxLevel);
    setAscendable(charOrLightCone.ascendable);
    setBaseStats(charOrLightCone.baseStats);
  }, [charOrLightCone, setBaseStats]);

  const handleAscToggle = () => {
    charOrLightCone.ascended = !charOrLightCone.ascended;
    setMaxLevel(charOrLightCone.maxLevel);
    setBaseStats({...charOrLightCone.baseStats});
  };

  const updateCharLvl = (level: string) => {
    setLevelInput(level);

    if (!level)
      return;

    charOrLightCone.level = parseInt(level);
    setAscendable(charOrLightCone.ascendable);
    setMaxLevel(charOrLightCone.maxLevel);
    setBaseStats({...charOrLightCone.baseStats});
  };

  const inputChange = (input: string) => {
    if (!input) {
      updateCharLvl(input);
      return;
    }

    let inputNum = Math.round(Number(input));

    if (inputNum < min)
      inputNum = min;
    else if (inputNum > max)
      inputNum = max;

    updateCharLvl(String(inputNum));
  };

  return (
    <div>
      <div className="relative flex mt-2 rounded-md shadow-sm">
        <div className="items-center absolute left-0 inset-y-0 pl-3 py-1.5 pointer-events-none">
          <span className="font-sans font-bold text-neutral-900 sm:text-sm">Lv.</span>
        </div>

        <input
          type="number"
          className="block w-full rounded-l-md border-0 px-3 py-1.5
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          font-sans font-bold text-neutral-900 text-right outline-none bg-purple-200
          ring-1 ring-inset ring-neutral-800
          placeholder:text-neutral-400
          focus:ring-2 focus:ring-inset focus:ring-purple-500
          sm:text-sm sm:leading-6"
          placeholder={min.toString()}
          value={level}
          min={min}
          max={max}
          onChange={(e) => inputChange(e.target.value)}
        />

        <button onClick={handleAscToggle} disabled={!ascendable}
          className="block w-16 rounded-r-md border-0 px-3 py-1.5
          font-sans font-bold text-neutral-900 text-left outline-none bg-purple-200
          ring-1 ring-inset ring-neutral-800
          sm:text-sm sm:leading-6
          hover:bg-purple-400 active:bg-purple-600
          disabled:bg-neutral-200 disabled:text-neutral-500"
        >
          / {maxLevel}
        </button>
      </div>

      <div>
        <input
          type="range"
          className="block w-full py-1.5
          outline-none accent-violet-200"
          value={level}
          min={min}
          max={max}
          onChange={(e) => inputChange(e.target.value)}
        />
      </div>
    </div>
  );
}
