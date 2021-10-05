import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function ArrowLeftIconSVG(props: SvgProps) {
  return (
    <Svg
      fill="none"
      stroke="#10A37A"
      viewBox="0 0 24 24"
      width={32}
      height={32}
      {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11 5l-7 7 7 7m-7-7h16"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
  )
}