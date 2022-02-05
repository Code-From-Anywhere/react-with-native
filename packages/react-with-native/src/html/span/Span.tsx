import * as React from "react";
import { joinClassNames } from "../../util/util";
import { SpanType } from "./Span.type";

const Span = ({ native, className, textClassName, ...props }: SpanType) => {
  return (
    <span {...props} className={joinClassNames(className, textClassName)} />
  );
};

export default Span;
