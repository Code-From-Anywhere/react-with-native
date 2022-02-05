import * as React from "react";
import { View } from "react-native";
import { useTailwind } from "tailwind-rn";
import { wrapInTextIfNeeded } from "../../util/util";
import { AsideType } from "./Aside.type";

const Aside = ({ native, textClassName, className, children }: AsideType) => {
  const tailwind = useTailwind();
  const { style, ...nativeWithoutStyle } = native || {};
  const tailwindStyle = className ? tailwind(className) : {};
  return (
    <View style={[tailwindStyle, style]} {...nativeWithoutStyle}>
      {wrapInTextIfNeeded(children, textClassName)}
    </View>
  );
};

export default Aside;
