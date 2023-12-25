interface Props {
  name: string;
  min: number;
  max: number;
  level: string;
  updateLevel: (level: string) => void;
  handleButton: (e: React.FormEvent) => void;
  disableButton: boolean;
  maxLvlForAsc: number;
}

export default function LvlAscInput(props: Props) {
  const handleChange = (input: string) => {
    if (!input) {
      props.updateLevel(input);
      return;
    }

    let inputNum = Math.round(Number(input));

    if (inputNum < props.min)
      inputNum = props.min;
    else if (inputNum > props.max)
      inputNum = props.max;

    props.updateLevel(String(inputNum));
  };

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
          value={props.level}
          min={props.min}
          max={props.max}
          onChange={(e) => handleChange(e.target.value)}
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
          value={props.level}
          min={props.min}
          max={props.max}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </div>
  );
}
