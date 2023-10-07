import Character, { IStatDisplay } from "../entities/characters/Character";

interface Props {
  character: Character;
}

function displayStat(stat: IStatDisplay): JSX.Element {
  return (
    <div key={stat.key} className="flow-root">
      <div className="float-left">
        {stat.name}:
      </div>
      <div className="float-right">
        {stat.value}
      </div>
    </div>
  )
}

export default function CharacterData(props: Props) {
  let character = props.character;
  let stats = character.getStats();
  character.level = 1;

  return (
    <div className="font-sans font-bold text-purple-200">
      {character.name} Base Stats<br/>
      {stats.map(function(object) {
        return displayStat(object);
      })}
    </div>
  )
}
