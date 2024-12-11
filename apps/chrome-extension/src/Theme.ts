import { Breakpoint } from "@suid/material";
import { ThemeInput } from "@suid/material/styles/createTheme";
import { purple } from "@suid/material/colors";
import { cloneDeep } from "lodash";

export const themes: { [key: string]: Partial<ThemeInput<Breakpoint>> } = {
  base: {
    components: {
      MuiTextField: {
        defaultProps: {
          variant: "outlined",
        },
      },
    },
    shape: {
      borderRadius: 5,
    },
  },
  dark: {
    palette: {
      mode: "dark",
      primary: {
        main: purple[200],
      },
    },
  },
  light: {
    palette: {
      mode: "light",
      primary: {
        main: purple[500],
      },
    },
    components: {
      MuiAppBar: {
        defaultProps: {
          sx: {
            backgroundColor: "#ffffff", // White background for the AppBar
            color: "#000000", // Black text for contrast
          },
        },
      },
      MuiToolbar: {
        defaultProps: {
          sx: {
            backgroundColor: "#ffffff", // White background for the Toolbar
            color: "#000000", // Black text for Toolbar content
          },
        },
      },
    },
  },
};

export function getTheme(key: keyof typeof themes): Partial<ThemeInput<Breakpoint>> {
  const base = themes["base"];
  const theme = themes[key];
  return Object.assign(cloneDeep(base), cloneDeep(theme));
}
