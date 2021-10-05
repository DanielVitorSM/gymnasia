import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function CloseIconSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="#D00020"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.59 5L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41 17.59 5z"
      />
    </Svg>
  )
}