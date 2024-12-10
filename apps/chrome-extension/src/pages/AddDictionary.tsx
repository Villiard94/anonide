import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, createSignal } from "solid-js";
import { Container, Button, Box } from "@suid/material";
import { DictionaryForm } from "@anonide/ui-components";
import { useNavigate } from "@solidjs/router";
import { DictionaryItem } from "@anonide/models";
import { nanoid } from "nanoid";
import { setPendingItem } from "../store/appState";

const AddDictionary: Component = () => {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = createSignal<DictionaryItem | null>(null);

  const handleFormChange = (newItem: DictionaryItem) => {
    setCurrentItem(newItem);
    setPendingItem(newItem);
  };

  const handleSave = async () => {
    const item = currentItem();
    if (!item || !item.key || !item.token) return;

    if (!item.id) {
      item.id = nanoid();
    }

    const currentItems = (await getStoredDictionary()) || [];
    const updatedItems = [...currentItems, item];
    await saveDictionary(updatedItems);
    navigate("/dictionary");
  };

  return (
    <Container maxWidth="md">
      <DictionaryForm onChange={handleFormChange} />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!currentItem()?.key || !currentItem()?.token}
        >
          Create
        </Button>
      </Box>
    </Container>
  );
};

export default AddDictionary;
