'use client';

import { useEffect, useState } from "react";
import Yanqing from "../entities/characters/Yanqing";
import StatInput from "./StatInput";
import { IStatDisplay } from "../entities/characters/Character";
import DamageOutput from "./DamageOutput";
import AbilityDisplay from "./AbilityDisplay";
import LvlAscInput from "./LvlAscInput";
import CharacterSelect from "./CharacterSelect";
import { CharacterKey, characterList, Characters } from "../entities/characters";

// TODO: Split base stats and abilities to new files
export default function CharacterForm() {
  // Using lazy initial state to only run constructor once
  const [character, setCharacter] = useState<Characters>(() => characterList["Yanqing"]);
  const [characterKey, setCharacterKey] = useState<CharacterKey>("Yanqing");

  const [charLvl, setCharLvl] = useState<string>("1");
  const [ascension, setAscension] = useState<number>(0);
  const [maxLvlForAsc, setMaxLevel] = useState<number>(0);

  const [basicLvl, setBasicLvl] = useState<string>("1");
  const [skillLvl, setSkillLvl] = useState<string>("1");
  const [ultLvl, setUltLvl] = useState<string>("1");
  const [talentLvl, setTalentLvl] = useState<string>("1");

  const [stats, setStats] = useState<readonly IStatDisplay[]>(character.getStats());

  const [basicAttr, setBasicAttr] = useState<readonly number[]>(character.getBasicAttr());
  const [skillAttr, setSkillAttr] = useState<readonly number[]>(character.getSkillAttr());
  const [ultAttr, setUltAttr] = useState<readonly number[]>(character.getUltAttr());
  const [talentAttr, setTalentAttr] = useState<readonly number[]>(character.getTalentAttr());

  const basicDesc = character.basicDesc;
  const skillDesc = character.skillDesc;
  const ultDesc = character.ultDesc;
  const talentDesc = character.talentDesc;

  const [isAscended, setIsAscended] = useState<boolean>(false);
  const [isAscDisabled, setIsAscDisabled] = useState<boolean>(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleAscToggle = (e: React.FormEvent) => {
    let value = !isAscended;
    setIsAscended(value);

    if (value)
      setAscension(ascension + 1);
    else
      setAscension(ascension - 1);
  }

  useEffect(() => {
    setCharacter(characterList[characterKey]);
    setStats(character.getStats());
  }, [characterKey])

  useEffect(() => {
    let level = parseInt(charLvl);

    character.level = level;
    setAscension(character.ascension);
    setStats(character.getStats());

    if (character.isLevelBetweenAscensions(level)) {
      setIsAscDisabled(false);
    } else {
      setIsAscDisabled(true);
      setIsAscended(false);
    }
  }, [charLvl]);

  useEffect(() => {
    character.ascension = ascension;
    setAscension(character.ascension);
    setMaxLevel(character.maxLevel);
    setStats(character.getStats());
  }, [ascension]);

  useEffect(() => {
    character.basicLevel = parseInt(basicLvl);
    setBasicAttr([...character.getBasicAttr()]);
  }, [basicLvl]);

  useEffect(() => {
    character.skillLevel = parseInt(skillLvl);
    setSkillAttr([...character.getSkillAttr()]);
  }, [skillLvl]);

  useEffect(() => {
    character.ultLevel = parseInt(ultLvl);
    setUltAttr([...character.getUltAttr()]);
  }, [ultLvl]);

  useEffect(() => {
    character.talentLevel = parseInt(talentLvl);
    setTalentAttr([...character.getTalentAttr()]);
  }, [talentLvl]);
  
  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        <CharacterSelect characterKey={characterKey} setCharacterKey={setCharacterKey}/>
      </div>

      <div></div>

      <div className="flex flex-col gap-y-8 lg:px-5 lg:py-6">
        <LvlAscInput
          name="char-lvl"
          min={1}
          max={80}
          lvl={charLvl}
          setLvl={setCharLvl}
          handleButton={handleAscToggle}
          disableButton={isAscDisabled}
          maxLvlForAsc={maxLvlForAsc}
        />
      </div>

      <div className="flex flex-col gap-y-1 lg:px-5 lg:py-6">
        {stats.map(function(object) {
          return <DamageOutput key={object.key} num={object.value.toString()} label={object.name}/>;
        })}
      </div>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <StatInput stat={basicLvl} setStat={setBasicLvl} name="basic-lvl" label="Basic Level" min={1} max={7}/>
      </div>
      <AbilityDisplay attributes={basicAttr} description={basicDesc} label="Basic"/>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <StatInput stat={skillLvl} setStat={setSkillLvl} name="skill-lvl" label="Skill Level" min={1} max={12}/>
      </div>
      <AbilityDisplay attributes={skillAttr} description={skillDesc} label="Skill"/>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <StatInput stat={ultLvl} setStat={setUltLvl} name="ult-lvl" label="Ult Level" min={1} max={12}/>
      </div>
      <AbilityDisplay attributes={ultAttr} description={ultDesc} label="Ult"/>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <StatInput stat={talentLvl} setStat={setTalentLvl} name="talent-lvl" label="Talent Level" min={1} max={12}/>
      </div>
      <AbilityDisplay attributes={talentAttr} description={talentDesc} label="Talent"/>
    </form>
  )
}
