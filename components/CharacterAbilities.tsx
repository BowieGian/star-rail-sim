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
      let max: number;

      if (ability === "basic")
        max = 7;
      else
        max = 12;

      return <AbilityIO
        key={ability}
        label={capitalizeFirstLetter(ability)}
        max={max}
        getLevel={() => {return character.getAbilityLevel(ability);}}
        setLevel={(value: number) => character.setAbilityLevel(ability, value)}
        getAttributes={() => character.getAbilityAttr(ability)}
        description={character.getAbilityDesc(ability)}
      />;
    })
  );
}
