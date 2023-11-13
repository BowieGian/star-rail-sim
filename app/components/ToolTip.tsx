import { ReactNode } from "react"

interface Props {
  children: ReactNode
  text: ReactNode
}

export default function ToolTip(props: Props) {
  return (
    <div className="group relative inline-block border-b border-dotted border-white font-sans text-sm font-bold text-purple-500">
      {props.text}

      <span className="invisible delay-150 group-hover:visible group-hover:delay-0">
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 rounded-md
          opacity-0 transition-opacity group-hover:opacity-100
          bg-white text-center whitespace-pre z-10
          after:absolute after:top-full after:left-1/2 after:-translate-x-full after:ml-1
          after:border-4 after:border-solid after:border-transparent after:border-t-white"
        >
          {props.children}
        </span>
      </span>
    </div>
  )
}
