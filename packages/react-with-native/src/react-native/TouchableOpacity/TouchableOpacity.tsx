import * as React from "react";
import { joinClassNames } from "../../util/util";
import { TouchableOpacityType } from "./TouchableOpacity.type";

/**
 * button on web, pressable on react-native
 */
const TouchableOpacity = ({
  native,
  textClassName,
  className,
  ...props
}: TouchableOpacityType) => {
  return (
    <button {...props} className={joinClassNames(className, textClassName)} />
  );
};

export default TouchableOpacity;
