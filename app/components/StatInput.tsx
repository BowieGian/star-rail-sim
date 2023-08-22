import React from 'react';

interface Props {
  stat: number;
  setStat: React.Dispatch<React.SetStateAction<number>>;
  name: string;
  label: string;
}

const StatInput = (props: Props) => {
  return (
    <div>
      <label
        htmlFor={props.name}
        className="block font-serif text-sm font-light leading-6 text-gray-600"
      >
        {props.label}
      </label>

      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type="number"
          name={props.name}
          id={props.name}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-2
          font-serif text-gray-900 outline-none
          ring-1 ring-inset ring-gray-300
          placeholder:text-gray-400
          focus:ring-2 focus:ring-inset focus:ring-cyan-500
          sm:text-sm sm:leading-6"
          placeholder="0"
          value={props.stat}
          onChange={(e) => props.setStat(Number(e.target.value))}
        />
      </div>
    </div>
  )
}

export default StatInput;
