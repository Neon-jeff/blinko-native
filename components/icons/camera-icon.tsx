import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CameraIcon = (props: SvgProps) => (
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
    <Path d="M5 7h1a2 2 0 0 0 2-2 1 1 0 0 1 1-1h6a1 1 0 0 1 1 1 2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2"></Path>
    <Path d="M9 13a3 3 0 1 0 6 0 3 3 0 0 0-6 0"></Path>
  </Svg>
);

export default CameraIcon;