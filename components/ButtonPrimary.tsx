import { ButtonPropType } from "@/util/types"

export default function ButtonPrimary(props: ButtonPropType) {
  return (
    <button
      className={`text-white bg-purple-500 px-3 py-2 rounded-md ${props.buttonClass}`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  )
}
