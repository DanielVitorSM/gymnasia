import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function BellIconSVG(props: SvgProps) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      {...props}
    >
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.705 3.71l-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42l-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 002.818-2H9.182A2.98 2.98 0 0012 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742A1.99 1.99 0 0012 2a1.99 1.99 0 00-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 003 17v1a1 1 0 001 1h16a1 1 0 001-1v-1a.996.996 0 00-.293-.707L19 14.586z"
        />
    </Svg>
  )
}