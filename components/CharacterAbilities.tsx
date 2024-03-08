import AbilityIO from "./AbilityIO";
import Character from "@/src/entities/characters/Character";
import { characterAbilityTypes } from "@/src/ability/Ability";

interface Props {
  character: Character;
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CharacterAbilities(props: Props) {
  const {character} = props;

  return (
    characterAbilityTypes.map((ability) => {
      return <AbilityIO
        key={ability}
        label={capitalizeFirstLetter(ability)}
        ability={character.getAbility(ability)}
      />;
    })
  );
}
