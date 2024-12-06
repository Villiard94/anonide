import { DictionaryItem, getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, Show, createSignal, onMount } from "solid-js";
import { Container } from "@suid/material";
import { DictionaryForm, DictionaryList } from "@anonide/ui-components";
import { getAppState, getSearchTerm, registerSaveHandler, setPendingItem } from "../store/appState";

const DictionaryManager: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const state = getAppState();

  onMount(async () => {
    console.log("on mount");
    const savedItems = await getStoredDictionary();
    if (savedItems) {
      setItems(savedItems);
    }

    // Register save handler
    registerSaveHandler((newItem: DictionaryItem) => {
      const updatedItems = [...items(), newItem];
      setItems(updatedItems);
      saveDictionary(updatedItems);
    });
  });

  const filteredItems = () =>
    items().filter(
      (item) =>
        item.key.toLowerCase().includes(getSearchTerm().toLowerCase()) ||
        item.token.toLowerCase().includes(getSearchTerm().toLowerCase()),
    );

  const handleFormChange = (newItem: DictionaryItem) => {
    setPendingItem(newItem);
  };

  const handleDeleteItem = (index: number) => {
    const currentItems = items();
    const itemToDelete = filteredItems()[index];
    const newItems = currentItems.filter(
      (item) => item.key !== itemToDelete.key || item.token !== itemToDelete.token,
    );
    setItems(newItems);
    saveDictionary(newItems);
  };

  return (
    <Container maxWidth="md">
      <Show
        when={state.currentView === "add-item"}
        fallback={<DictionaryList items={filteredItems()} onDeleteItem={handleDeleteItem} />}
      >
        <DictionaryForm onChange={handleFormChange} />
      </Show>
    </Container>
  );
};

export default DictionaryManager;
