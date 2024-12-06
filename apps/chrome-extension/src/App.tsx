import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { DictionaryManager } from "@anonide/ui-components";
import { AnonymizerHandler } from "@anonide/anonymizer-handler";
import { MainExtensionEventBus } from "@anonide/extension-event-bus";
import { Anonymizer } from "@anonide/anonymizer";
import { Header } from "./components/Header";

const anonymizer = new Anonymizer();
const anonymizerHandler = new AnonymizerHandler(MainExtensionEventBus, anonymizer);

const App: Component = () => {
  onMount(() => {
    console.log("App component mounted");

    anonymizerHandler.initialize();
  });

  console.log("App component rendering");

  return (
    <div style={{ width: "500px" }}>
      <header>
        <Header />
      </header>
      <DictionaryManager />
    </div>
  );
};

export default App;
