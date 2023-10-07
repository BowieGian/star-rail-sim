import Character from "../entities/characters/Character";

interface Props {
  character: Character;
}

export default function CharacterData(props: Props) {
  let character = props.character;
  character.getStats();
  character.level = 1;

  return (
    <div className="font-sans font-bold text-purple-200">
      {character.name} Base Stats<br/>
      HP: {character.hpBase} <br/>
      ATK: {character.atkBase} <br/>
      DEF: {character.defBase} <br/>
      SPD: {character.spdBase}
    </div>
  )
}
