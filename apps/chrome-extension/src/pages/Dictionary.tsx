import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, createSignal, onMount } from "solid-js";
import { DictionaryList } from "@anonide/ui-components";
import { DictionaryItem } from "@anonide/models";
import { useNavigate } from "@solidjs/router";
import { getSearchTerm } from "../store/appState";

const Dictionary: Component = () => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const navigator = useNavigate();

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

  const handleDeleteItem = (id: string) => {
    const currentItems = items();
    const itemToDelete = currentItems.find((i) => i.id === id);
    if (!itemToDelete) {
      console.error("Cannot find item to delete", id);
      return;
    }
    const newItems = currentItems.filter(
      (item) => item.key !== itemToDelete.key || item.token !== itemToDelete.token,
    );
    setItems(newItems);
    saveDictionary(newItems);
  };

  const handleEditItem = (id: string) => {
    navigator(`/dictionary/${id}`);
  };

  return (
    <DictionaryList
      items={filteredItems()}
      onDeleteItem={handleDeleteItem}
      onEditItem={handleEditItem}
    />
  );
};

export default Dictionary;
