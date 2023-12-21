'use client';
import React from 'react';

import LvlAscInput from "./LvlAscInput";

import { useEffect, useState } from "react";
import { CharacterKey, characterList, Characters } from "../entities/characters";

export default function LightCone() {
  const [character, setCharacter] = useState<Characters>(() => characterList["Yanqing"]);

  const [charLvl, setCharLvl] = useState<string>("1");
  const [ascendable, setAscendable] = useState<boolean>(true);

  const [maxLvl, setMaxLvl] = useState<number>(character.maxLevel);
  const [ascension, setAscension] = useState<number>(0);
  const [ascended, setAscended] = useState<boolean>(false);

  const handleAscToggle = (e: React.FormEvent) => {
    let value = !ascended;
    setAscended(value);
  }

  return (
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
  )
}