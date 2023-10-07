interface Props {
  attributes: readonly number[]
  label: string;
}

export default function AbilityDisplay(props: Props) {
  return (
    <div className="flex flex-col gap-y-1 lg:px-5">
      {props.attributes.map((attribute, index) => {
        return (
          <div key={props.label + index} className="flex justify-between">
            <div className="font-sans text-sm font-bold text-purple-200">
              {props.label} {index}
            </div>

            <div className="font-sans text-sm font-bold text-purple-200">
              {attribute}
            </div>
          </div>
        )
      })}
    </div>
  )
}
