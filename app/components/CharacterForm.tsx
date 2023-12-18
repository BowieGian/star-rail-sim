'use client';

import { useEffect, useState } from "react";
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
  const [ascendable, setAscendable] = useState<boolean>(true);

  const [maxLvl, setMaxLvl] = useState<number>(character.maxLevel);
  const [ascension, setAscension] = useState<number>(0);
  const [ascended, setAscended] = useState<boolean>(false);

  const [basicLvl, setBasicLvl] = useState<string>("1");
  const [skillLvl, setSkillLvl] = useState<string>("1");
  const [ultLvl, setUltLvl] = useState<string>("1");
  const [talentLvl, setTalentLvl] = useState<string>("1");

  const [stats, setStats] = useState<readonly IStatDisplay[]>(character.getBaseStatsDisplay());

  const [basicAttr, setBasicAttr] = useState<readonly number[]>(character.getAbilityAttr("basic"));
  const [skillAttr, setSkillAttr] = useState<readonly number[]>(character.getAbilityAttr("skill"));
  const [ultAttr, setUltAttr] = useState<readonly number[]>(character.getAbilityAttr("ult"));
  const [talentAttr, setTalentAttr] = useState<readonly number[]>(character.getAbilityAttr("talent"));

  const basicDesc = character.getAbilityDesc("basic");
  const skillDesc = character.getAbilityDesc("skill");
  const ultDesc = character.getAbilityDesc("ult");
  const talentDesc = character.getAbilityDesc("talent");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleAscToggle = (e: React.FormEvent) => {
    let value = !ascended;
    setAscended(value);
  }

  useEffect(() => {
    setCharacter(characterList[characterKey]);
  }, [characterKey])

  useEffect(() => {
    const levelString = character.level.toString();

    if (charLvl === levelString && ascension === character.ascension) {
      // Don't need to trigger the lvl/asc useEffect
      setStats(character.getBaseStatsDisplay());
    } else if (charLvl === levelString) {
      // Does not trigger charLvl useEffect
      setMaxLvl(character.maxLevel);
      setAscension(character.ascension);
      setAscended(character.ascended);
    } else {
      setCharLvl(levelString);
    }

    setBasicLvl(character.getAbilityLevel("basic").toString());
    setSkillLvl(character.getAbilityLevel("skill").toString());
    setUltLvl(character.getAbilityLevel("ult").toString());
    setTalentLvl(character.getAbilityLevel("talent").toString());
  }, [character])

  useEffect(() => {
    character.level = parseInt(charLvl);
    setAscendable(character.ascendable);

    setMaxLvl(character.maxLevel);
    setAscension(character.ascension);
    setAscended(character.ascended);

    setStats(character.getBaseStatsDisplay());
  }, [charLvl]);

  useEffect(() => {
    character.ascended = ascended;

    setAscension(character.ascension);
    setMaxLvl(character.maxLevel);

    setStats(character.getBaseStatsDisplay());
  }, [ascended]);

  useEffect(() => {
    character.setAbilityLevel("basic", parseInt(basicLvl));
    setBasicAttr([...character.getAbilityAttr("basic")]);
  }, [basicLvl, character]);

  useEffect(() => {
    character.setAbilityLevel("skill", parseInt(skillLvl));
    setSkillAttr([...character.getAbilityAttr("skill")]);
  }, [skillLvl, character]);

  useEffect(() => {
    character.setAbilityLevel("ult", parseInt(ultLvl));
    setUltAttr([...character.getAbilityAttr("ult")]);
  }, [ultLvl, character]);

  useEffect(() => {
    character.setAbilityLevel("talent", parseInt(talentLvl));
    setTalentAttr([...character.getAbilityAttr("talent")]);
  }, [talentLvl, character]);

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
          disableButton={!ascendable}
          maxLvlForAsc={maxLvl}
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
