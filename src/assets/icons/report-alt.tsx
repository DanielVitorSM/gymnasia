import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function ReportIconSVG(props: SvgProps) {
  return (
    <Svg
        viewBox="0 0 24 24"
        {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.2 2.4a2.4 2.4 0 00-2.4 2.4v14.4a2.4 2.4 0 002.4 2.4h9.6a2.4 2.4 0 002.4-2.4V8.897a2.4 2.4 0 00-.703-1.697L14.4 3.103a2.4 2.4 0 00-1.697-.703H7.2zm2.4 12a1.2 1.2 0 00-2.4 0V18a1.2 1.2 0 002.4 0v-3.6zm2.4-3.6a1.2 1.2 0 011.2 1.2v6a1.2 1.2 0 11-2.4 0v-6a1.2 1.2 0 011.2-1.2zm4.8-1.2a1.2 1.2 0 00-2.4 0V18a1.2 1.2 0 102.4 0V9.6z"
        />
    </Svg>
  )
}