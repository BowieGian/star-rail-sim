import React from "react";

interface Props {
  stat: string;
  setStat: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  label: string;
  min: number;
  max: number;
}

const handleChange = (input: string, props: Props) => {
  const inputNum = Math.round(Number(input));

  if (!input)
    props.setStat(input);
  else if (inputNum < props.min)
    props.setStat(String(props.min));
  else if (inputNum > props.max)
    props.setStat(String(props.max));
  else {
    props.setStat(String(inputNum));
  }
};

export default function StatInput(props: Props) {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block font-sans text-sm font-bold leading-6 text-purple-200"
      >
        {props.label}
      </label>

      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="number"
          name={props.name}
          id={props.name}
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-3
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          font-sans font-bold text-neutral-900 text-right outline-none bg-purple-200
          ring-1 ring-inset ring-neutral-800
          placeholder:text-neutral-400
          focus:ring-2 focus:ring-inset focus:ring-purple-500
          sm:text-sm sm:leading-6"
          placeholder="0"
          value={props.stat}
          min={props.min}
          max={props.max}
          onChange={(e) => handleChange(e.target.value, props)}
        />
      </div>
      <div>
        <input
          type="range"
          name={props.name}
          id={props.name}
          className="block w-full py-1.5
          outline-none accent-purple-200"
          value={props.stat}
          min={props.min}
          max={props.max}
          onChange={(e) => props.setStat(e.target.value)}
        />
      </div>
    </div>
  );
}
