import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, createSignal, onMount, Show } from "solid-js";
import { Container, Button, Box } from "@suid/material";
import { DictionaryForm } from "@anonide/ui-components";
import { useNavigate, useParams } from "@solidjs/router";
import { DictionaryItem } from "@anonide/models";
import { setPendingItem } from "../store/appState";

const EditDictionaryItem: Component = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentItem, setCurrentItem] = createSignal<DictionaryItem | undefined>(undefined);

  onMount(async () => {
    const currentItems = (await getStoredDictionary()) || [];
    const item = currentItems.find((x) => x.id === id);
    if (!item) {
      console.error("cannot find item for id", id);
      return;
    }
    setCurrentItem(item);
  });

  const handleFormChange = (newItem: DictionaryItem) => {
    setCurrentItem(newItem);
    setPendingItem(newItem);
  };

  const handleSave = async () => {
    const editedItem = currentItem();
    if (!editedItem || !editedItem.key || !editedItem.token) return;

    const currentItems = (await getStoredDictionary()) || [];
    const item = currentItems.find((x) => x.id === id);
    if (!item) {
      console.error("cannot find item for id", id);
      return;
    }
    Object.assign(item, editedItem);
    await saveDictionary(currentItems);
    navigate("/dictionary");
  };

  return (
    <Container maxWidth="md">
      <Show when={!!currentItem()}>
        <DictionaryForm initialItem={currentItem()} onChange={handleFormChange} />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={!currentItem()?.key || !currentItem()?.token}
          >
            Save
          </Button>
        </Box>
      </Show>
    </Container>
  );
};

export default EditDictionaryItem;
