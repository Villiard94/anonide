import type { Component } from "solid-js";
import { onMount } from "solid-js";
import { DictionaryManager } from "@anonide/ui-components";
import { Typography } from "@suid/material";

const App: Component = () => {
  onMount(() => {
    console.log("App component mounted");
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
