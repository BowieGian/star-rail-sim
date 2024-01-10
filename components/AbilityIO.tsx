import { useEffect, useState } from "react";
import AbilityDescription from "./AbilityDescription";
import NumberSlider from "./NumberSlider";

interface Props {
  label: string;
  max: number;
  getLevel: () => number;
  setLevel: (value: number) => void;
  getAttributes: () => readonly number[];
  description: readonly string[];
}

export default function AbilityIO(props: Props) {
  const {label, max, getLevel, setLevel, getAttributes, description} = props;

  const [abilityLevel, setAbilityLevel] = useState<string>("1");
  const [attributes, setAttributes] = useState<readonly number[]>(getAttributes());

  useEffect(() => {
    setAbilityLevel(getLevel().toString());
  }, [getLevel]);

  useEffect(() => {
    setLevel(parseInt(abilityLevel));
    setAttributes([...getAttributes()]);
  }, [abilityLevel, setLevel, getAttributes]);

  return (
    <>
      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={abilityLevel} setStat={setAbilityLevel} name={label + "-lvl"} label={label} min={1} max={max}/>
      </div>
      <AbilityDescription attributes={attributes} description={description} label={label}/>
    </>
  );
}
