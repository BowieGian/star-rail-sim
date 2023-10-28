import { characterKeys } from "../entities/characters";

interface Props {
  character: string;
  setCharacter: React.Dispatch<React.SetStateAction<string>>;
}

export default function CharacterSelect(props: Props) {
  return (
    <select className="block w-full rounded-md shadow-sm px-3 py-1.5
      font-sans font-bold text-neutral-900 outline-none bg-purple-200
      ring-1 ring-inset ring-neutral-800
      focus:ring-2 focus:ring-inset focus:ring-purple-500
      sm:text-sm sm:leading-6"
      value={props.character}
      onChange={(e) => props.setCharacter(e.target.value)}
    >
      {characterKeys.map((character) => (
        <option key={character} value={character} className="font-bold">
          {character}
        </option>
      ))}
    </select>
  )
}
