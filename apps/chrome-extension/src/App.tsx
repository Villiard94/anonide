import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { DictionaryManager } from "@anonide/ui-components";

const App: Component = () => {
  onMount(() => {
    console.log("App component mounted");
  });

  console.log("App component rendering");

  return (
    <div>
      <header>
        <h1>Anonide</h1>
      </header>
      <DictionaryManager />
    </div>
  );
};

export default App;
