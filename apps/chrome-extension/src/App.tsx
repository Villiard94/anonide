import type { Component, ParentProps } from "solid-js";
import { onMount, For, createMemo, Show } from "solid-js";
import { MemoryRouter, Route } from "@solidjs/router";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";
import { Box, createTheme, ThemeProvider } from "@suid/material";
import CssBaseline from "@suid/material/CssBaseline";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { routes } from "./Routes";
import { theme as themeStore, loadTheme } from "./store/theme-store";
import { getTheme } from "./Theme";

const anonymizer = new Anonymizer();
const anonymizerHandler = new AnonymizerHandler(MainExtensionEventBus, anonymizer);

const Layout: Component<ParentProps> = (props) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <header>
        <Header />
      </header>
      <Box sx={{ overflowY: "auto", flex: 1 }}>{props.children}</Box>
      <footer>
        <Footer />
      </footer>
    </Box>
  );
};

const App: Component = () => {
  const theme = createMemo(() => createTheme(getTheme(themeStore().darkMode ? "dark" : "light")));

  onMount(() => {
    anonymizerHandler.initialize();
    loadTheme();
  });

  return (
    <Show when={theme()} keyed>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MemoryRouter root={Layout}>
          <For each={routes}>
            {(route) => <Route path={route.path} component={route.component} />}
          </For>
        </MemoryRouter>
      </ThemeProvider>
    </Show>
  );
};

export default App;
