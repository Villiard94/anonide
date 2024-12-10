import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, createSignal, onMount } from "solid-js";
import { Container } from "@suid/material";
import { DictionaryList } from "@anonide/ui-components";
import { DictionaryItem } from "@anonide/models";
import { getSearchTerm } from "../store/appState";

const Dictionary: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);

  onMount(async () => {
    const savedItems = await getStoredDictionary();
    if (savedItems) {
      setItems(savedItems);
    }
  });

  const filteredItems = () =>
    items().filter(
      (item) =>
        item.key.toLowerCase().includes(getSearchTerm().toLowerCase()) ||
        item.token.toLowerCase().includes(getSearchTerm().toLowerCase()),
    );

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
      <DictionaryList items={filteredItems()} onDeleteItem={handleDeleteItem} />
    </Container>
  );
};

export default Dictionary;
