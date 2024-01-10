import React from "react";
import { useEffect, useState } from "react";
import NumberSlider from "./NumberSlider";
import AbilityDescription from "./AbilityDescription";
import { Characters } from "../src/entities/characters/data/index";

interface Props {
  character: Characters;
}

export default function CharacterAbilities(props: Props) {
  const character = props.character;

  const [basicLvl, setBasicLvl] = useState<string>("1");
  const [skillLvl, setSkillLvl] = useState<string>("1");
  const [ultLvl, setUltLvl] = useState<string>("1");
  const [talentLvl, setTalentLvl] = useState<string>("1");

  const [basicAttr, setBasicAttr] = useState<readonly number[]>(character.getAbilityAttr("basic"));
  const [skillAttr, setSkillAttr] = useState<readonly number[]>(character.getAbilityAttr("skill"));
  const [ultAttr, setUltAttr] = useState<readonly number[]>(character.getAbilityAttr("ult"));
  const [talentAttr, setTalentAttr] = useState<readonly number[]>(character.getAbilityAttr("talent"));

  const basicDesc = character.getAbilityDesc("basic");
  const skillDesc = character.getAbilityDesc("skill");
  const ultDesc = character.getAbilityDesc("ult");
  const talentDesc = character.getAbilityDesc("talent");

  useEffect(() => {
    setBasicLvl(character.getAbilityLevel("basic").toString());
    setSkillLvl(character.getAbilityLevel("skill").toString());
    setUltLvl(character.getAbilityLevel("ult").toString());
    setTalentLvl(character.getAbilityLevel("talent").toString());
  }, [character]);

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
    <>
      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={basicLvl} setStat={setBasicLvl} name="basic-lvl" label="Basic Level" min={1} max={7}/>
      </div>
      <AbilityDescription attributes={basicAttr} description={basicDesc} label="Basic"/>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={skillLvl} setStat={setSkillLvl} name="skill-lvl" label="Skill Level" min={1} max={12}/>
      </div>
      <AbilityDescription attributes={skillAttr} description={skillDesc} label="Skill"/>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={ultLvl} setStat={setUltLvl} name="ult-lvl" label="Ult Level" min={1} max={12}/>
      </div>
      <AbilityDescription attributes={ultAttr} description={ultDesc} label="Ult"/>

      <div className="flex flex-col gap-y-8 lg:px-5">
        <NumberSlider stat={talentLvl} setStat={setTalentLvl} name="talent-lvl" label="Talent Level" min={1} max={12}/>
      </div>
      <AbilityDescription attributes={talentAttr} description={talentDesc} label="Talent"/>
    </>
  );
}
