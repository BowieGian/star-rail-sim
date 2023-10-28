import { CharacterKey, characterKeys } from "../entities/characters";

interface Props {
  characterKey: CharacterKey;
  setCharacterKey: React.Dispatch<React.SetStateAction<CharacterKey>>;
}

export default function CharacterSelect(props: Props) {
  return (
    <select className="block w-full rounded-md shadow-sm px-3 py-1.5
      font-sans font-bold text-neutral-900 outline-none bg-purple-200
      ring-1 ring-inset ring-neutral-800
      focus:ring-2 focus:ring-inset focus:ring-purple-500
      sm:text-sm sm:leading-6"
      value={props.characterKey}
      onChange={(e) => props.setCharacterKey(e.target.value as CharacterKey)}
    >
      {characterKeys.map((characterKey) => (
        <option key={characterKey} value={characterKey} className="font-bold">
          {characterKey}
        </option>
      ))}
    </select>
  )
}
