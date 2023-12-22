interface Props {
  name: string;
  min: number;
  max: number;
  lvl: string;
  setLvl: React.Dispatch<React.SetStateAction<string>>;
  handleButton: (e: React.FormEvent) => void;
  disableButton: boolean;
  maxLvlForAsc: number;
}

const handleChange = (input: string, props: Props) => {
  const inputNum = Math.round(Number(input));

  if (!input)
    props.setLvl(input);
  else if (inputNum < props.min)
    props.setLvl(String(props.min));
  else if (inputNum > props.max)
    props.setLvl(String(props.max));
  else {
    props.setLvl(String(inputNum));
  }
};

export default function LvlAscInput(props: Props) {
  return (
    <div>
      <div className="relative flex mt-2 rounded-md shadow-sm">
        <div className="items-center absolute left-0 inset-y-0 pl-3 py-1.5 pointer-events-none">
          <span className="font-sans font-bold text-neutral-900 sm:text-sm">Lv.</span>
        </div>

        <input
          type="number"
          name={props.name}
          id={props.name}
          className="block w-full rounded-l-md border-0 px-3 py-1.5
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
          font-sans font-bold text-neutral-900 text-right outline-none bg-purple-200
          ring-1 ring-inset ring-neutral-800
          placeholder:text-neutral-400
          focus:ring-2 focus:ring-inset focus:ring-purple-500
          sm:text-sm sm:leading-6"
          placeholder={props.min.toString()}
          value={props.lvl}
          min={props.min}
          max={props.max}
          onChange={(e) => handleChange(e.target.value, props)}
        />

        <button onClick={props.handleButton} disabled={props.disableButton}
          className="block w-16 rounded-r-md border-0 px-3 py-1.5
          font-sans font-bold text-neutral-900 text-left outline-none bg-purple-200
          ring-1 ring-inset ring-neutral-800
          sm:text-sm sm:leading-6
          hover:bg-purple-400 active:bg-purple-600
          disabled:bg-neutral-200 disabled:text-neutral-500"
        >
          / {props.maxLvlForAsc}
        </button>
      </div>

      <div>
        <input
          type="range"
          name={props.name}
          id={props.name}
          className="block w-full py-1.5
          outline-none accent-violet-200"
          value={props.lvl}
          min={props.min}
          max={props.max}
          onChange={(e) => props.setLvl(e.target.value)}
        />
      </div>
    </div>
  );
}
