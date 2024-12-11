import { getStoredDictionary, saveDictionary } from "@anonide/anonymizer";
import { Component, createSignal, onMount, Show } from "solid-js";
import { Container } from "@suid/material";
import { DictionaryItemForm, DictionaryItemFormType } from "@anonide/ui-components";
import { useNavigate, useParams } from "@solidjs/router";
import { DictionaryItem } from "@anonide/models";

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

  const handleSubmit = async (values: DictionaryItemFormType) => {
    const currentItems = (await getStoredDictionary()) || [];
    const item = currentItems.find((x) => x.id === id);
    if (!item) {
      console.error("cannot find item for id", id);
      return;
    }
    Object.assign(item, values);
    await saveDictionary(currentItems);
    navigate("/dictionary");
  };

  return (
    <Container maxWidth="md">
      <Show when={!!currentItem()}>
        <DictionaryItemForm initialItem={currentItem()} onSubmit={handleSubmit} />
      </Show>
    </Container>
  );
};

export default EditDictionaryItem;
