import { DictionaryItem, getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import { Container } from "@suid/material";
import DictionaryForm from "./DictionaryForm";
import DictionaryHeader from "./DictionaryHeader";
import DictionaryList from "./DictionaryList";

export interface DictionaryManagerProps {
  searchTerm: string;
}

const DictionaryManager: Component<DictionaryManagerProps> = (props) => {
  const [items, setItems] = createSignal<DictionaryItem[]>([]);
  const [showForm, setShowForm] = createSignal(false);

  onMount(async () => {
    console.log("on mount");
    const savedItems = await getStoredDictionary();
    if (savedItems) {
      setItems(savedItems);
    }
  });

  createEffect(() => {
    console.log("saving item");
    saveDictionary(items());
  });

  const filteredItems = () =>
    items().filter(
      (item) =>
        item.key.toLowerCase().includes(props.searchTerm.toLowerCase()) ||
        item.token.toLowerCase().includes(props.searchTerm.toLowerCase()),
    );

  const handleAddItem = (newItem: DictionaryItem) => {
    console.log("adding item");
    setItems([...items(), newItem]);
    setShowForm(false);
  };

  const handleDeleteItem = (index: number) => {
    console.log("deleting item");
    const newItems = [...items()];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <DictionaryHeader
        searchTerm=""
        showForm={showForm()}
        onSearchChange={() => {}}
        onToggleForm={() => setShowForm(!showForm())}
      />

      <Show when={showForm()}>
        <DictionaryForm onSubmit={handleAddItem} />
      </Show>

      <DictionaryList items={filteredItems()} onDeleteItem={handleDeleteItem} />
    </Container>
  );
};

export default DictionaryManager;
