import { useEffect, useState } from "react";
import AbilityDescription from "./AbilityDescription";
import NumberSlider from "./NumberSlider";
import { Characters } from "@/src/entities/characters/data";
import { CharacterAbilityTypes } from "@/src/ability/Ability";

interface Props {
  character: Characters;
  ability: CharacterAbilityTypes;
}

export default function AbilityIO(props: Props) {
  const {character, ability} = props;

  const [maxLevel, setMaxLevel] = useState<number>(1);

  const [abilityLevel, setAbilityLevel] = useState<string>("1");
  const [attributes, setAttributes] = useState<readonly number[]>(character.getAbilityAttr(ability));
  const description = character.getAbilityDesc(ability);

  useEffect(() => {
    if (ability === "basic")
      setMaxLevel(7);
    else
      setMaxLevel(12);
  }, [ability]);

  useEffect(() => {
    setAbilityLevel(character.getAbilityLevel(ability).toString());
  }, [character, ability]);

  useEffect(() => {
    character.setAbilityLevel(ability, parseInt(abilityLevel));
    setAttributes([...character.getAbilityAttr(ability)]);
  }, [abilityLevel, character, ability]);

  return (
    <>
      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={abilityLevel} setStat={setAbilityLevel} name={ability + "-lvl"} label={ability} min={1} max={maxLevel}/>
      </div>
      <AbilityDescription attributes={attributes} description={description} label={ability}/>
    </>
  );
}
