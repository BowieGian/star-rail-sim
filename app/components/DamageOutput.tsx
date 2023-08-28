import React from 'react';

interface Props {
  num: string;
  label: string;
}

const DamageOutput = (props: Props) => {
  return (
    <div className="flex justify-between">
      <div className="font-sans text-sm font-bold text-purple-200">
        {props.label}
      </div>

      <div className="font-sans text-sm font-bold text-purple-200">
        {props.num}
      </div>
    </div>
  )
}

export default DamageOutput;
