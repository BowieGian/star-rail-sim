"use client";

import React, { useEffect, useState } from "react";
import LabelledNumber from "./LabelledNumber";
import NumberSlider from "./NumberSlider";
import NumberSliderPercent from "./NumberSliderPercent";

const parseNumber = (inputNumber: number, decimals: number): string => {
  if (isNaN(inputNumber))
    return("-");
  else
    return(inputNumber.toFixed(decimals));
};

export default function CalcForm() {
  const [charLvl, setCharLvl] = useState<string>("1");
  const [atk, setAtk] = useState<string>("1000");
  const [abilityMult, setAbilityMult] = useState<string>("100");
  const [trgtLvl, setTrgtLvl] = useState<string>("1");

  const [trgtDef, setTrgtDef] = useState<string>("");
  const [defMult, setDefMult] = useState<string>("0.5");
  const [damage, setDamage] = useState<string>("500");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    const trgtDef = 200 + 10 * parseInt(trgtLvl);
    const defMultTemp = (parseInt(charLvl) + 20)/(parseInt(trgtLvl) + 20 + parseInt(charLvl) + 20);
    const dmg = parseInt(atk) * parseInt(abilityMult)/100 * defMultTemp;

    setTrgtDef(parseNumber(trgtDef, 0));
    setDefMult(parseNumber(defMultTemp, 3));
    setDamage(parseNumber(dmg, 0));
  }, [charLvl, atk, abilityMult, trgtLvl]);

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <NumberSlider stat={charLvl} setStat={setCharLvl} name="char-lvl" label="Character Level" min={1} max={80}/>
        <NumberSlider stat={atk} setStat={setAtk} name="atk" label="ATK" min={0} max={5000}/>
        <NumberSliderPercent stat={abilityMult} setStat={setAbilityMult} name="ability-mult" label="Ability Multiplier" min={0} max={1000}/>
        <NumberSlider stat={trgtLvl} setStat={setTrgtLvl} name="target-lvl" label="Enemy Level" min={1} max={80}/>
      </div>
      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <LabelledNumber num={damage} label="Damage"/>
        <LabelledNumber num={trgtDef} label="Enemy Defence"/>
        <LabelledNumber num={defMult} label="Defence Multiplier"/>
      </div>
    </form>
  );
}
