import AbilityIO from "./AbilityIO";
import { Characters } from "@/src/entities/characters/data";
import { characterAbilityTypes } from "@/src/ability/Ability";

interface Props {
  character: Characters;
}

export default function CharacterAbilities(props: Props) {
  const character = props.character;

  return (
    characterAbilityTypes.map((ability) => {
      return <AbilityIO key={ability} character={character} ability={ability}/>;
    })
  );
}
