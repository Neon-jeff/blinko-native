import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SvgFromXml, SvgProps } from 'react-native-svg';

export const HomeIcon = ({...props}:SvgProps) => {
  return (
    <SvgFromXml
      xml={
        `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="m9.02 2.84-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12ZM12 17.99v-3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
`
      }
      {...props}
    />
  );
};

export const MarketIcon = ({...props}:SvgProps) => {
  return (
    <SvgFromXml
      xml={
        `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
 <path d="M15.9996 8C15.9996 9.06087 15.5782 10.0783 14.828 10.8284C14.0779 11.5786 13.0605 12 11.9996 12C10.9387 12 9.92131 11.5786 9.17116 10.8284C8.42102 10.0783 7.99959 9.06087 7.99959 8M3.63281 7.40138L2.93281 15.8014C2.78243 17.6059 2.70724 18.5082 3.01227 19.2042C3.28027 19.8157 3.74462 20.3204 4.33177 20.6382C5.00006 21 5.90545 21 7.71623 21H16.283C18.0937 21 18.9991 21 19.6674 20.6382C20.2546 20.3204 20.7189 19.8157 20.9869 19.2042C21.2919 18.5082 21.2167 17.6059 21.0664 15.8014L20.3664 7.40138C20.237 5.84875 20.1723 5.07243 19.8285 4.48486C19.5257 3.96744 19.0748 3.5526 18.5341 3.29385C17.92 3 17.141 3 15.583 3L8.41623 3C6.85821 3 6.07921 3 5.4651 3.29384C4.92433 3.5526 4.47349 3.96744 4.17071 4.48486C3.82689 5.07243 3.76219 5.84875 3.63281 7.40138Z" stroke-linecap="round" stroke-linejoin="round"/>
 </svg>

`
      }
      {...props}
    />
  );
};

export const AddIcon = ({...props}:SvgProps) => {
  return (
    <SvgFromXml
      xml={
       `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"  stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" stroke-width="3"  />
</svg>
`
      }
      {...props}
    />
  );
};

export const UsersIcon = ({...props}:SvgProps) => {
  return (
    <SvgFromXml
      xml={
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><path d="M192,120a59.91,59.91,0,0,1,48,24"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M16,144a59.91,59.91,0,0,1,48-24"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="128" cy="144" r="40"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M72,216a65,65,0,0,1,112,0"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M161,80a32,32,0,1,1,31,40"   stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M64,120A32,32,0,1,1,95,80"  stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
`
      }
      {...props}
    />
  );
};

export const MessageIcon = ({...props}:SvgProps) => {
  return (
    <SvgFromXml
      xml={
       `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M8.5 10.5h7M7 18.43h4l4.45 2.96a.997.997 0 0 0 1.55-.83v-2.13c3 0 5-2 5-5v-6c0-3-2-5-5-5H7c-3 0-5 2-5 5v6c0 3 2 5 5 5Z"  stroke-linecap="round" stroke-linejoin="round"></path></svg>
`
      }
      {...props}
    />
  );
};
