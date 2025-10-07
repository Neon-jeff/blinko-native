import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Svg, { SvgFromXml } from 'react-native-svg';

const MenuIcon = () => {
  return (
    <SvgFromXml
      height={24}
      width={24}
      xml={`<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-menu"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 8l16 0" /><path d="M4 16l16 0" /></svg>`}
    />
  );
};

export default MenuIcon;

const styles = StyleSheet.create({});
