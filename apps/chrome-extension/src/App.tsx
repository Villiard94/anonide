import type { Component } from 'solid-js';
import styles from './App.module.css';
import DictionaryManager from './components/DictionaryManager';

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
