import type { Component, ParentProps } from "solid-js";
import { onMount } from "solid-js";
import { MemoryRouter, Route } from "@solidjs/router";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";
import { createTheme, ThemeProvider } from "@suid/material";
import { purple } from "@suid/material/colors";
import { Header } from "./components/Header";
import Home from "./pages/Home";
import Dictionary from "./pages/Dictionary";
import AddDictionary from "./pages/AddDictionary";

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
      <Route path="/" component={Home} />
      <Route path="/dictionary" component={Dictionary} />
      <Route path="/dictionary/add" component={AddDictionary} />
    </MemoryRouter>
  );
};

export default App;
