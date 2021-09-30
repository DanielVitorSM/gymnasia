import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function UserIconSVG(props: SvgProps) {
  return (
    <Svg
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2a4.505 4.505 0 00-4.5 4.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
        />
    </Svg>
  )
}