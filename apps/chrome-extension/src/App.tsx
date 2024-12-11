import type { Component, ParentProps } from "solid-js";
import { onMount, For, createMemo } from "solid-js";
import { MemoryRouter, Route } from "@solidjs/router";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";
import { createTheme, ThemeProvider } from "@suid/material";
import { purple } from "@suid/material/colors";
import CssBaseline from "@suid/material/CssBaseline";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { routes } from "./Routes";
import { theme as themeStore, loadTheme } from "./store/theme-store";

const anonymizer = new Anonymizer();
const anonymizerHandler = new AnonymizerHandler(MainExtensionEventBus, anonymizer);

const Layout: Component<ParentProps> = (props) => {
  return (
    <div>
      <header>
        <Header />
      </header>
      {props.children}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

const App: Component = () => {
  const theme = createMemo(() =>
    createTheme({
      palette: {
        mode: themeStore().darkMode ? "dark" : "light",
        primary: {
          main: purple[themeStore().darkMode ? 200 : 500],
        },
      },
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
    }),
  );

  onMount(() => {
    anonymizerHandler.initialize();
    loadTheme();
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MemoryRouter root={Layout}>
        <For each={routes}>
          {(route) => <Route path={route.path} component={route.component} />}
        </For>
      </MemoryRouter>
    </ThemeProvider>
  );
};

export default App;
