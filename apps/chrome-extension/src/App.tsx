import "@anonide/ui-components/style.css"; // Updated CSS import path

import type { Component } from "solid-js";
import { DictionaryManager } from "@anonide/ui-components";

import styles from "./App.module.css";

const App: Component = () => {
  return (
    <div class={styles.app}>
      <header class={styles.header}>
        <h1>Anonide</h1>
      </header>
      <main>
        <DictionaryManager />
      </main>
    </div>
  );
};

export default App;
