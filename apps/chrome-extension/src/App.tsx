import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { DictionaryManager } from "@anonide/ui-components";
import { Typography } from "@suid/material";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";

const anonymizer = new Anonymizer();
const anonymizerHandler = new AnonymizerHandler(MainExtensionEventBus, anonymizer);

const App: Component = () => {
  onMount(() => {
    console.log("App component mounted");

    anonymizerHandler.initialize();
  });

  console.log("App component rendering");

  return (
    <div>
      <header>
        <Typography variant="h1"> Anonide</Typography>
      </header>
      <DictionaryManager />
    </div>
  );
};

export default App;
