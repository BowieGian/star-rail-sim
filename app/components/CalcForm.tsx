'use client';

import React, { useState } from 'react';
import StatInput from './StatInput';

const CalcForm = () => {
  const [dmg, setDmg] = useState<number>(0);
  const [dmgBoost, setDmgBoost] = useState<number>(0);
  const [critMult, setCritMult] = useState<number>(0);
  const [defMult, setDefMult] = useState<number>(0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <form className="mx-auto grid max-w-6xl gap-y-5 lg:grid-cols-2 lg:gap-x-8" onSubmit={handleAdd}>
      <div className="flex flex-col gap-y-8 py-5 lg:px-5 lg:py-6">
        <StatInput stat={dmg} setStat={setDmg} name="base_dmg" label="Base DMG"/>
        <StatInput stat={dmgBoost} setStat={setDmgBoost} name="dmg-boost" label="DMG Boost"/>
      </div>
      <div className="flex flex-col gap-y-8 py-5 lg:px-5 lg:py-6">
        <StatInput stat={critMult} setStat={setCritMult} name="crit-multiplier" label="Crit Multiplier"/>
        <StatInput stat={defMult} setStat={setDefMult} name="def-multiplier" label="DEF Multiplier"/>
      </div>
    </form>
  );
}

export default CalcForm;
