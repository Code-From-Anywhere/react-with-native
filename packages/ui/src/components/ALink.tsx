import Link, { LinkProps } from "next/link";
import { A, AType } from "react-with-native";
import { hrefIsOutgoing } from "./ALink.util";

const ALink = ({
  children,
  href,
  target,
  rel,
  linkProps,
  ...otherAProps
}: { linkProps?: LinkProps } & AType) => {
  //overwrites rel and target if href is outgoing in order to enforce good SEO tactics (unless you specify them yourselves)
  [rel, target] =
    href && hrefIsOutgoing(href)
      ? [rel || "nofollow", target || "_blank"]
      : [rel, target];

  return (
    <Link {...linkProps} href={href || "#"} passHref>
      <A {...otherAProps} rel={rel} target={target}>
        {children}
      </A>
    </Link>
  );
};

export default ALink;
