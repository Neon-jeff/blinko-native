import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const AtIcon = (props: SvgProps) => (
  <Svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path stroke="none" d="M0 0h24v24H0z"></Path>
    <Path d="M8 12a4 4 0 1 0 8 0 4 4 0 1 0-8 0"></Path>
    <Path d="M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-5.5 8.28"></Path>
  </Svg>
);

export default AtIcon;