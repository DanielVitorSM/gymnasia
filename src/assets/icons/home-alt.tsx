import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

export default function HomeIconSVG(props: SvgProps) {
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
        d="M22.183 11.836L12.53 2.189a.748.748 0 00-1.06 0l-9.654 9.647a1.501 1.501 0 001.06 2.562h1.017v6.883c0 .415.335.75.75.75H10.5v-5.25h2.625v5.25h6.232a.75.75 0 00.75-.75v-6.883h1.017a1.502 1.502 0 001.06-2.562z"
      />
    </Svg>
  )
}