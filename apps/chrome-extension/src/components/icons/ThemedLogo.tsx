import { AnonideLogo, AnonideLogoProps } from "@anonide/ui-components";

import { Component, createMemo } from "solid-js";
import { purple } from "@suid/material/colors";
import { theme } from "../../store/theme-store";

export interface ThemedLogoProps {
  size: number;
}

export const ThemedLogo: Component<ThemedLogoProps> = (props) => {
  const logoProps = createMemo<AnonideLogoProps>(() => {
    return theme().darkMode
      ? {
          aColor: "#fff",
          asterixColor: "#000",
          barGradientA: "#fff",
          barGradientB: purple[500],
          barGradientC: "#fff",
          size: props.size,
        }
      : {
          aColor: "#000",
          asterixColor: "#fff",
          barGradientA: "#000",
          barGradientB: purple[500],
          barGradientC: "#000",
          size: props.size,
        };
  });
  return <AnonideLogo {...logoProps()} />;
};
