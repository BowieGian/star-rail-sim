'use client';

import { useEffect, useState } from "react";
import Yanqing from "../entities/characters/Yanqing";
import StatInput from "./StatInput";
import { IStatDisplay } from "../entities/characters/Character";
import DamageOutput from "./DamageOutput";

export default function CharacterForm() {
  let yanqing: Yanqing = new Yanqing("Yanqing");

  const [charLvl, setCharLvl] = useState<string>("1");
  const [basicLvl, setBasicLvl] = useState<string>("1");
  const [skillLvl, setSkillLvl] = useState<string>("1");
  const [ultLvl, setUltLvl] = useState<string>("1");
  const [talentLvl, setTalentLvl] = useState<string>("1");

  const [stats, setStats] = useState<readonly IStatDisplay[]>(yanqing.getStats());

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  }

  useEffect(() => {
    yanqing.level = parseInt(charLvl);
    setStats(yanqing.getStats());
  }, [charLvl])
  
  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <StatInput stat={charLvl} setStat={setCharLvl} name="char-lvl" label="Character Level" min={1} max={80}/>
      </div>

      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        {stats.map(function(object) {
          return <DamageOutput key={object.key} num={object.value.toString()} label={object.name}/>;
        })}
      </div>

      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <StatInput stat={basicLvl} setStat={setBasicLvl} name="basic-lvl" label="Basic Level" min={1} max={7}/>
        <StatInput stat={skillLvl} setStat={setSkillLvl} name="skill-lvl" label="Skill Level" min={1} max={12}/>
        <StatInput stat={ultLvl} setStat={setUltLvl} name="skill-lvl" label="Ult Level" min={1} max={12}/>
        <StatInput stat={talentLvl} setStat={setTalentLvl} name="skill-lvl" label="Talent Level" min={1} max={12}/>
      </div>
    </form>
  )
}
