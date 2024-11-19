import { createSignal, Component, For, Show } from 'solid-js';
import styles from './DictionaryManager.module.css';

interface DictionaryItem {
  key: string;
  token: string;
  isRegex: boolean;
  caseSensitive: boolean;
}

const DictionaryManager: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const [searchTerm, setSearchTerm] = createSignal('');
  const [showForm, setShowForm] = createSignal(false);
  const [newItem, setNewItem] = createSignal<DictionaryItem>({
    key: '',
    token: '',
    isRegex: false,
    caseSensitive: false
  });
  
  const filteredItems = () => items().filter(item => 
    item.key.toLowerCase().includes(searchTerm().toLowerCase()) ||
    item.token.toLowerCase().includes(searchTerm().toLowerCase())
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (newItem().key && newItem().token) {
      setItems([...items(), { ...newItem() }]);
      setNewItem({
        key: '',
        token: '',
        isRegex: false,
        caseSensitive: false
      });
      setShowForm(false);
    }
  };

  const handleDeleteItem = (index: number) => {
    const newItems = [...items()];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <input
          type="text"
          placeholder="Search dictionary..."
          value={searchTerm()}
          onInput={(e) => setSearchTerm(e.currentTarget.value)}
          class={styles.searchInput}
        />
        <button 
          onClick={() => setShowForm(!showForm())} 
          class={styles.addButton}
        >
          {showForm() ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      <Show when={showForm()}>
        <form onSubmit={handleSubmit} class={styles.form}>
          <div class={styles.formGroup}>
            <label class={styles.label}>
              Search for:
            </label>
              <input
                type="text"
                value={newItem().key}
                onInput={(e) => setNewItem({ ...newItem(), key: e.currentTarget.value })}
                required
                class={styles.input}
              />
          </div>

          <div class={styles.formGroup}>
            <label class={styles.label}>
              Replace with:
            </label>
              <input
                type="text"
                value={newItem().token}
                onInput={(e) => setNewItem({ ...newItem(), token: e.currentTarget.value })}
                required
                class={styles.input}
              />
          </div>

          <div class={styles.formGroup}>
            <label class={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={newItem().isRegex}
                onChange={(e) => setNewItem({ ...newItem(), isRegex: e.currentTarget.checked })}
              />
              Regular Expression
            </label>
          </div>

          <div class={styles.formGroup}>
            <label class={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={newItem().caseSensitive}
                onChange={(e) => setNewItem({ ...newItem(), caseSensitive: e.currentTarget.checked })}
              />
              Case Sensitive
            </label>
          </div>

          <button type="submit" class={styles.submitButton}>
            Add Dictionary Item
          </button>
        </form>
      </Show>
      
      <div class={styles.list}>
        <Show
          when={filteredItems().length > 0}
          fallback={<div class={styles.emptyState}>No dictionary items found</div>}
        >
          <For each={filteredItems()}>
            {(item, index) => (
              <div class={styles.item}>
                <div class={styles.itemContent}>
                  <div class={styles.itemKey}>
                    <span class={styles.label}>Search for:</span>
                    <span class={styles.value}>{item.key}</span>
                    <Show when={item.isRegex}>
                      <span class={styles.badge}>Regex</span>
                    </Show>
                    <Show when={item.caseSensitive}>
                      <span class={styles.badge}>Case Sensitive</span>
                    </Show>
                  </div>
                  <div class={styles.itemToken}>
                    <span class={styles.label}>Replace with:</span>
                    <span class={styles.value}>{item.token}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteItem(index())} 
                  class={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            )}
          </For>
        </Show>
      </div>
    </div>
  );
};

export default DictionaryManager;
