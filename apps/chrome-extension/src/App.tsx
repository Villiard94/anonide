import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";
import { createTheme, ThemeProvider } from "@suid/material";
import { purple } from "@suid/material/colors";
import { Header } from "./components/Header";
import DictionaryManager from "./components/DictionaryManager";

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

const App: Component = () => {
  onMount(() => {
    console.log("App component mounted");
    anonymizerHandler.initialize();
  });

  return (
    <div style={{ width: "500px" }}>
      <ThemeProvider theme={theme}>
        <header>
          <Header />
        </header>
        <DictionaryManager />
      </ThemeProvider>
    </div>
  );
};

export default App;
