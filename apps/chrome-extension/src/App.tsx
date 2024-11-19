import { DictionaryManager } from '@anonide/ui-components';
import type { Component } from 'solid-js';
import styles from './App.module.css';

const App: Component = () => {
  return (
    <div class={styles.App}>
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
