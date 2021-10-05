import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function InfoIconSVG(props: SvgProps) {
  return (
    <Svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
        />
    </Svg>
  )
}