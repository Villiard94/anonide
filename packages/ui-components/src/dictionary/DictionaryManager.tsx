import { LocalStorageService } from "@anonide/anonymizer";
import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import { DictionaryItem } from "./types";
import DictionaryForm from "./DictionaryForm";
import DictionaryHeader from "./DictionaryHeader";
import DictionaryList from "./DictionaryList";

const storage = new LocalStorageService("dictionary:");
const STORAGE_KEY = "items";

const DictionaryManager: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const [searchTerm, setSearchTerm] = createSignal("");
  const [showForm, setShowForm] = createSignal(false);

  onMount(async () => {
    console.log("on mount");
    const savedItems = await storage.load<DictionaryItem[]>(STORAGE_KEY);
    if (savedItems) {
      setItems(savedItems);
    }
  });

  createEffect(() => {
    console.log("saving item");
    storage.save(STORAGE_KEY, items());
  });

  const filteredItems = () =>
    items().filter(
      (item) =>
        item.key.toLowerCase().includes(searchTerm().toLowerCase()) ||
        item.token.toLowerCase().includes(searchTerm().toLowerCase()),
    );

  const handleAddItem = (newItem: DictionaryItem) => {
    console.log("adding item");
    setItems([...items(), newItem]);
    setShowForm(false);
  };

  const handleDeleteItem = (index: number) => {
    console.log("deleteing item");
    const newItems = [...items()];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <div>
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
