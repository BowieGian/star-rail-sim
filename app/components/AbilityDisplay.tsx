import ToolTip from "./ToolTip";

interface Props {
  attributes: readonly number[]
  description: readonly string[]
  label: string;
}

export default function AbilityDisplay(props: Props) {
  return (
    <div className="lg:px-5 whitespace-pre-line font-sans text-sm font-bold text-purple-200">
      {props.attributes.map((attribute, index) => {
        return (
          <span key={props.label + index}>
            {props.description[index]}
            <ToolTip text={<span className="text-purple-500">{(attribute * 100).toFixed(0)}%</span>}><div>Temp Tip</div></ToolTip>
          </span>
        )
      })}
      {props.description[props.description.length - 1]}
    </div>
  )
}
