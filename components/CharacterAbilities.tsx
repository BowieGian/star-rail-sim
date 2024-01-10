import AbilityIO from "./AbilityIO";
import Character from "@/src/entities/characters/Character";
import { characterAbilityTypes } from "@/src/ability/Ability";

interface Props {
  character: Character;
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
        label={ability}
        max={max}
        getLevel={() => {return character.getAbilityLevel(ability);}}
        setLevel={(value: number) => character.setAbilityLevel(ability, value)}
        getAttributes={() => character.getAbilityAttr(ability)}
        description={character.getAbilityDesc(ability)}
      />;
    })
  );
}
