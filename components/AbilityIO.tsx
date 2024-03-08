import { useEffect, useState } from "react";
import AbilityDescription from "./AbilityDescription";
import NumberSlider from "./NumberSlider";
import Ability from "@/src/ability/Ability";

interface Props {
  label: string;
  ability: Ability;
}

export default function AbilityIO(props: Props) {
  const {label, ability} = props;

  const description = ability.descriptions;

  const [abilityLevel, setAbilityLevel] = useState<string>("1");
  const [attributes, setAttributes] = useState<readonly number[]>([...ability.attributes]);

  useEffect(() => {
    setAbilityLevel(ability.level.toString());
  }, [ability]);

  useEffect(() => {
    ability.level = parseInt(abilityLevel);
    setAttributes([...ability.attributes]);
  }, [abilityLevel, ability]);

  return (
    <>
      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={abilityLevel} setStat={setAbilityLevel} name={label + "-lvl"} label={label} min={1} max={ability.maxLevel}/>
      </div>
      <AbilityDescription attributes={attributes} description={description} label={label}/>
    </>
  ); // update setStat to custom hook
}
