import type { Component, ParentProps } from "solid-js";
import { onMount, For } from "solid-js";
import { MemoryRouter, Route } from "@solidjs/router";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";
import { createTheme, ThemeProvider } from "@suid/material";
import { purple } from "@suid/material/colors";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { routes } from "./Routes";

const anonymizer = new Anonymizer();
const anonymizerHandler = new AnonymizerHandler(MainExtensionEventBus, anonymizer);

const theme = createTheme({
  palette: {
    primary: {
      main: purple[900],
    },
  },
  components: {},
  shape: {
    borderRadius: 25,
  },
});

const Layout: Component<ParentProps> = (props) => {
  return (
    <div style={{ width: "500px" }}>
      <ThemeProvider theme={theme}>
        <header>
          <Header />
        </header>
        {props.children}
        <footer>
          <Footer />
        </footer>
      </ThemeProvider>
    </div>
  );
};

const App: Component = () => {
  onMount(() => {
    console.log("App component mounted");
    anonymizerHandler.initialize();
  });

  return (
    <MemoryRouter root={Layout}>
      <For each={routes}>{(route) => <Route path={route.path} component={route.component} />}</For>
    </MemoryRouter>
  );
};

export default App;
