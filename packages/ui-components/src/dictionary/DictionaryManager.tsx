import { Component, createSignal, Show } from 'solid-js';
import DictionaryForm from './DictionaryForm';
import DictionaryHeader from './DictionaryHeader';
import DictionaryList from './DictionaryList';
import styles from './DictionaryManager.module.css';
import { DictionaryItem } from './types';

const DictionaryManager: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [showForm, setShowForm] = createSignal(false);

  const filteredItems = () =>
    items().filter(
      (item) =>
        item.key.toLowerCase().includes(searchTerm().toLowerCase()) ||
        item.token.toLowerCase().includes(searchTerm().toLowerCase())
    );

  const handleAddItem = (newItem: DictionaryItem) => {
    setItems([...items(), newItem]);
    setShowForm(false);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items()];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div class={styles.container}>
      <DictionaryHeader
        searchTerm={searchTerm()}
        showForm={showForm()}
        onSearchChange={setSearchTerm}
        onToggleForm={() => setShowForm(!showForm())}
      />

      <Show when={showForm()}>
        <DictionaryForm onSubmit={handleAddItem} />
      </Show>

      <DictionaryList items={filteredItems()} onDeleteItem={handleDeleteItem} />
    </div>
  );
};

export default DictionaryManager;
