import { CharacterKey } from "../src/entities/characters/data";
import { LightConeKey } from "@/src/lightcones";

interface Props<T> {
  selected: T;
  setSelected: React.Dispatch<React.SetStateAction<T>>;
  list: ReadonlyArray<T>;
}

export default function DropdownMenu<T extends CharacterKey | LightConeKey,>(props: Props<T>) {
  return (
    <select className="block w-full rounded-md shadow-sm px-3 py-1.5
      font-sans font-bold text-neutral-900 outline-none bg-purple-200
      ring-1 ring-inset ring-neutral-800
      focus:ring-2 focus:ring-inset focus:ring-purple-500
      sm:text-sm sm:leading-6"
    value={props.selected}
    onChange={(e) => props.setSelected(e.target.value as T)}
    >
      {props.list.map((characterKey) => (
        <option key={characterKey} value={characterKey} className="font-bold">
          {characterKey}
        </option>
      ))}
    </select>
  );
}
